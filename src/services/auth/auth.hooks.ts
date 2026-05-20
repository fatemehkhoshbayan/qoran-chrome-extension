import { useEffect, useRef, useState } from 'react';
import { chromeStorage } from '@/utils/chromeStorage';
import { onSessionChanged, warmTokenCache } from './auth.events';
import authServices from './auth.services';
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
  // Prevent duplicate validation across multiple hook instances on the same page.
  const validated = useRef(false);

  useEffect(() => {
    // On mount: restore from storage (handles page reload / extension restart).
    // warmTokenCache seeds the in-memory cache so the axios interceptor has the
    // token immediately, without dispatching a UI event to other hook instances.
    async function loadFromStorage() {
      const [token, user] = await Promise.all([
        chromeStorage.get('sessionToken'),
        chromeStorage.get('user'),
      ]);
      warmTokenCache(token);
      setState({ sessionToken: token, user, isLoggedIn: !!token });

      // Validate the restored token against the backend once per page load.
      // If the 30-day Redis session has expired the backend returns 401, which
      // the response interceptor in useAxios.ts catches — it fires
      // notifySessionChanged(null) and wipes storage automatically.
      if (token && !validated.current) {
        validated.current = true;
        authServices.getMe().catch(() => {
          // 401 is handled by the axios interceptor; other errors are ignored.
        });
      }
    }

    loadFromStorage();

    // Primary: event payload carries session data directly — no storage round-trip,
    // no race condition. login() fires with { sessionToken, user }; logout() fires null.
    const unsubscribe = onSessionChanged(session => {
      if (session) {
        setState({ sessionToken: session.sessionToken, user: session.user, isLoggedIn: true });
      } else {
        setState({ sessionToken: null, user: null, isLoggedIn: false });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return state;
}
