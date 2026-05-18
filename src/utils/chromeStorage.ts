import type { IUser } from '../services/auth/auth.types';

type StorageSchema = {
  sessionToken: string;
  user: IUser;
  extState: string;
};

function isAvailable(): boolean {
  return (
    typeof chrome !== 'undefined' &&
    typeof chrome.storage !== 'undefined' &&
    typeof chrome.storage.local !== 'undefined'
  );
}

function get<K extends keyof StorageSchema>(key: K): Promise<StorageSchema[K] | null> {
  if (!isAvailable()) return Promise.resolve(null);
  return new Promise(resolve => {
    chrome.storage.local.get(key, result => {
      resolve((result[key] as StorageSchema[K]) ?? null);
    });
  });
}

function set<K extends keyof StorageSchema>(key: K, value: StorageSchema[K]): Promise<void> {
  if (!isAvailable()) return Promise.resolve();
  return new Promise(resolve => {
    chrome.storage.local.set({ [key]: value }, resolve);
  });
}

function remove(key: keyof StorageSchema): Promise<void> {
  if (!isAvailable()) return Promise.resolve();
  return new Promise(resolve => {
    chrome.storage.local.remove(key, resolve);
  });
}

function clear(...keys: (keyof StorageSchema)[]): Promise<void> {
  if (!isAvailable()) return Promise.resolve();
  return new Promise(resolve => {
    chrome.storage.local.remove(keys as string[], resolve);
  });
}

export const chromeStorage = { get, set, remove, clear, isAvailable };
