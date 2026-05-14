import { axiosGet } from '../../hook/useAxios';
import { chromeStorage } from '../../utils/chromeStorage';
import authEndpoints from './auth.endpoints';
import type { ISession, IUser } from './auth.types';

const POLL_INTERVAL_MS = 1500;
const POLL_MAX_ATTEMPTS = 80;
const API_BASE_URL = import.meta.env.VITE_API_URL as string;

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
}

async function login(): Promise<ISession> {
  const extState = crypto.randomUUID();
  await chromeStorage.set('extState', extState);

  const loginUrl = `${API_BASE_URL}${authEndpoints.login(extState)}`;
  const tab = await chrome.tabs.create({ url: loginUrl });
  const tabId = tab.id;

  return new Promise((resolve, reject) => {
    let attempts = 0;

    const intervalId = setInterval(async () => {
      attempts++;

      try {
        const session = await getSession(extState);
        clearInterval(intervalId);
        await chromeStorage.set('sessionToken', session.sessionToken);
        await chromeStorage.set('user', session.user);
        await chromeStorage.remove('extState');
        if (tabId != null) {
          chrome.tabs.remove(tabId).catch(() => {});
        }
        resolve(session);
      } catch {
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
