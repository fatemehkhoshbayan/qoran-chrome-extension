import axios from 'axios';
import { makeUseAxios } from 'axios-hooks';
import { chromeStorage } from '../utils/chromeStorage';
import { getCachedToken, notifySessionChanged } from '../services/auth/auth.events';

declare module 'axios' {
  export interface AxiosRequestConfig {
    _retry?: boolean;
  }
}

const baseURL = import.meta.env.VITE_API_URL;
const extensionSecret = import.meta.env.VITE_EXTENSION_SECRET;

axios.defaults.baseURL = baseURL;

export const axiosGet = axios.create({
  baseURL: baseURL,
  method: 'GET',
  headers: { extension_secret: extensionSecret },
});

// Attach session token to every request.
axiosGet.interceptors.request.use(async config => {
  // Prefer in-memory cache (set immediately on login/logout event).
  // Fall back to chrome.storage for the first request after a page reload
  // before the event has fired.
  const token = getCachedToken() ?? await chromeStorage.get('sessionToken');
  if (token) {
    config.headers['x-session-token'] = token;
  }
  return config;
});

// Handle expired / revoked sessions globally.
// Any 401 on a request that carried x-session-token means the backend session
// is gone (expired after 30 days, or revoked). Clear local state so the UI
// drops back to the "Login" button immediately.
axiosGet.interceptors.response.use(
  response => response,
  async error => {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 401 &&
      error.config?.headers?.['x-session-token']
    ) {
      notifySessionChanged(null);
      chromeStorage.clear('sessionToken', 'user', 'extState');
    }
    return Promise.reject(error);
  },
);

export const useAxiosGet = makeUseAxios({
  cache: false,
  axios: axiosGet,
});
