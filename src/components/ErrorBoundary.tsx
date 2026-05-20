import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { TriangleAlert } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: '' };

  static getDerivedStateFromError(error: unknown): State {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return { hasError: true, message };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 p-8 text-center">
          <TriangleAlert className="h-10 w-10 text-amber-400" aria-hidden />
          <h2 className="text-base font-semibold text-slate-700">Something went wrong</h2>
          <p className="max-w-xs text-sm text-slate-500">{this.state.message}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-xl bg-slate-800 px-5 py-2.5 text-sm font-semibold text-amber-100 transition-colors hover:bg-slate-900 active:scale-95"
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
