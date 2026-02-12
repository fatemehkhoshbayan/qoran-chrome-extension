import axios from 'axios';
import { makeUseAxios } from 'axios-hooks';

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

export const useAxiosGet = makeUseAxios({
  cache: false,
  axios: axiosGet,
});
