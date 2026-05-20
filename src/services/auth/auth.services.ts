import axios from 'axios';
import { axiosGet } from '../../hook/useAxios';
import { chromeStorage } from '../../utils/chromeStorage';
import { notifySessionChanged } from './auth.events';
import authEndpoints from './auth.endpoints';
import type { ISession, IUser } from './auth.types';

const POLL_INTERVAL_MS = 1500;
const POLL_MAX_ATTEMPTS = 80;
const API_BASE_URL = import.meta.env.VITE_API_URL as string;
const EXTENSION_SECRET = import.meta.env.VITE_EXTENSION_SECRET as string;

async function getSession(extState: string): Promise<ISession> {
  const response = await axiosGet.get<ISession>(authEndpoints.session(extState));
  return response.data;
}

async function getMe(): Promise<IUser> {
  const response = await axiosGet.get<{ user: IUser }>(authEndpoints.me);
  return response.data.user;
}

async function logout(): Promise<void> {
  await axiosGet.post(authEndpoints.logout);
  await chromeStorage.clear('sessionToken', 'user', 'extState');
  notifySessionChanged(null);

  // Also end the SSO session on oauth2.quran.foundation so the user is
  // properly logged out on quran.com too (same SSO provider).
  const QF_SSO_LOGOUT = 'https://oauth2.quran.foundation/oauth2/sessions/logout';
  const tab = await chrome.tabs.create({ url: QF_SSO_LOGOUT, active: false });
  if (tab.id != null) {
    setTimeout(() => {
      chrome.tabs.remove(tab.id!).catch(() => {});
    }, 3000);
  }
}

async function login(): Promise<ISession> {
  const extState = crypto.randomUUID();
  console.log('[auth] login() started — extState:', extState.slice(0, 8));
  await chromeStorage.set('extState', extState);

  // Browser tab navigations can't send custom headers, so the extension_secret
  // must travel as a query param for this one endpoint.
  const loginUrl =
    `${API_BASE_URL}${authEndpoints.login(extState)}` +
    `&extension_secret=${encodeURIComponent(EXTENSION_SECRET)}`;
  const tab = await chrome.tabs.create({ url: loginUrl });
  const tabId = tab.id;
  console.log('[auth] login tab opened — tabId:', tabId);

  return new Promise((resolve, reject) => {
    let attempts = 0;

    const intervalId = setInterval(async () => {
      attempts++;

      try {
        const session = await getSession(extState);
        console.log(`[auth] poll #${attempts} — response:`, JSON.stringify(session).slice(0, 120));

        // Backend returns 202 { status: 'pending' } while the OAuth callback
        // hasn't completed yet. Only advance when a real sessionToken arrives.
        if (!session.sessionToken) {
          console.log('[auth] session pending, keep polling...');
          return;
        }

        console.log('[auth] session received — storing token + user');
        clearInterval(intervalId);
        // Write to storage first so the data is persisted across extension close/reopen.
        await chromeStorage.set('sessionToken', session.sessionToken);
        await chromeStorage.set('user', session.user);
        await chromeStorage.remove('extState');
        // Then fire the event — payload carries the session so UI updates immediately
        // without a storage re-read.
        notifySessionChanged({ sessionToken: session.sessionToken, user: session.user });
        console.log('[auth] storage saved + notifySessionChanged fired');
        if (tabId != null) {
          chrome.tabs.remove(tabId).catch(() => {});
        }
        resolve(session);
      } catch (err) {
        const status = axios.isAxiosError(err) ? err.response?.status : 'network';
        console.log(`[auth] poll #${attempts} error — status:`, status);
        // 401/403 = extension_secret rejected; fail immediately instead of timing out
        if (axios.isAxiosError(err) && (err.response?.status === 401 || err.response?.status === 403)) {
          clearInterval(intervalId);
          await chromeStorage.remove('extState');
          reject(new Error('Backend rejected the request. Check VITE_EXTENSION_SECRET and that the backend is on the correct branch.'));
          return;
        }
        // 404 or network error = not ready yet, keep polling
        if (attempts >= POLL_MAX_ATTEMPTS) {
          clearInterval(intervalId);
          await chromeStorage.remove('extState');
          reject(new Error('Login timed out. Please try again.'));
        }
      }
    }, POLL_INTERVAL_MS);
  });
}

const authServices = { login, logout, getSession, getMe };

export default authServices;
