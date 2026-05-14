import axios from 'axios';
import { makeUseAxios } from 'axios-hooks';
import { chromeStorage } from '../utils/chromeStorage';

declare module 'axios' {
  export interface AxiosRequestConfig {
    _retry?: boolean;
  }
}

const baseURL = import.meta.env.VITE_API_URL;
const extensionSecret = import.meta.env.VITE_EXTENSION_SECRET;

console.log('🔧 Axios Config:', { baseURL, extensionSecret: extensionSecret ? '***' : 'MISSING' });

axios.defaults.baseURL = baseURL;

export const axiosGet = axios.create({
  baseURL: baseURL,
  method: 'GET',
  headers: { extension_secret: extensionSecret },
});

axiosGet.interceptors.request.use(async config => {
  const token = await chromeStorage.get('sessionToken');
  if (token) {
    config.headers['x-session-token'] = token;
  }
  return config;
});

export const useAxiosGet = makeUseAxios({
  cache: false,
  axios: axiosGet,
});
