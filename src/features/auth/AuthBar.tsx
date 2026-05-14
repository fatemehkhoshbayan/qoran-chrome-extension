import { useState } from 'react';
import { useSession } from '../../services/auth/auth.hooks';
import authServices from '../../services/auth/auth.services';

export function AuthBar() {
  const { user, isLoggedIn } = useSession();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin() {
    setIsLoggingIn(true);
    setError(null);
    try {
      await authServices.login();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  }

  async function handleLogout() {
    try {
      await authServices.logout();
    } catch {
      // storage is cleared by authServices.logout() regardless
    }
  }

  if (isLoggedIn && user) {
    return (
      <div className="ml-auto flex items-center gap-3">
        <span className="text-sm font-medium text-slate-600">Salam, {user.first_name}</span>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="ml-auto flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={handleLogin}
        disabled={isLoggingIn}
        className="flex items-center gap-2 rounded-lg border border-emerald-600 bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoggingIn ? (
          <>
            <span
              className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent"
              aria-hidden
            />
            Waiting…
          </>
        ) : (
          'Login with Quran.com'
        )}
      </button>
      {error && <p className="text-xs text-rose-600">{error}</p>}
    </div>
  );
}
