import type { IUser } from '../services/auth/auth.types';

type StorageSchema = {
  sessionToken: string;
  user: IUser;
  extState: string;
};

function get<K extends keyof StorageSchema>(key: K): Promise<StorageSchema[K] | null> {
  return new Promise(resolve => {
    chrome.storage.local.get(key, result => {
      resolve((result[key] as StorageSchema[K]) ?? null);
    });
  });
}

function set<K extends keyof StorageSchema>(key: K, value: StorageSchema[K]): Promise<void> {
  return new Promise(resolve => {
    chrome.storage.local.set({ [key]: value }, resolve);
  });
}

function remove(key: keyof StorageSchema): Promise<void> {
  return new Promise(resolve => {
    chrome.storage.local.remove(key, resolve);
  });
}

function clear(...keys: (keyof StorageSchema)[]): Promise<void> {
  return new Promise(resolve => {
    chrome.storage.local.remove(keys as string[], resolve);
  });
}

export const chromeStorage = { get, set, remove, clear };
