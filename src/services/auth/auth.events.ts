import type { IUser } from './auth.types';

const EVENT = 'qf:session-changed';

export type SessionPayload = { sessionToken: string; user: IUser } | null;

// Module-level cache so the axios interceptor can read the token
// synchronously without a chrome.storage round-trip.
let _cachedToken: string | null = null;

export function getCachedToken(): string | null {
  return _cachedToken;
}

/** Warm the cache from storage on page reload without dispatching the UI event. */
export function warmTokenCache(token: string | null): void {
  _cachedToken = token;
}

export function notifySessionChanged(session: SessionPayload): void {
  _cachedToken = session?.sessionToken ?? null;
  window.dispatchEvent(new CustomEvent<SessionPayload>(EVENT, { detail: session }));
}

export function onSessionChanged(
  handler: (session: SessionPayload) => void,
): () => void {
  const listener = (e: Event) =>
    handler((e as CustomEvent<SessionPayload>).detail);
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}
