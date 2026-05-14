import { useEffect, useState } from 'react';
import { chromeStorage } from '../../utils/chromeStorage';
import type { IUser } from './auth.types';

interface ISessionState {
  sessionToken: string | null;
  user: IUser | null;
  isLoggedIn: boolean;
}

export function useSession(): ISessionState {
  const [state, setState] = useState<ISessionState>({
    sessionToken: null,
    user: null,
    isLoggedIn: false,
  });

  useEffect(() => {
    async function loadFromStorage() {
      const [token, user] = await Promise.all([
        chromeStorage.get('sessionToken'),
        chromeStorage.get('user'),
      ]);
      setState({ sessionToken: token, user, isLoggedIn: !!token });
    }

    loadFromStorage();

    function handleChange(changes: { [key: string]: chrome.storage.StorageChange }) {
      if ('sessionToken' in changes || 'user' in changes) {
        loadFromStorage();
      }
    }

    chrome.storage.onChanged.addListener(handleChange);
    return () => chrome.storage.onChanged.removeListener(handleChange);
  }, []);

  return state;
}
