import React from 'react';
import { useTafsir } from '../../services/tafsir-ai/tafsir-ai.hooks';

interface Props {
  verseKey: string;
  text: string;
}

export const TafsirBox: React.FC<Props> = ({ verseKey, text }) => {
  const { generateTafsir, explanation, isPending, isSuccess, isError, error } = useTafsir();

  const handleAction = () => {
    generateTafsir({ verseKey, text });
  };

  const errorMessage =
    error?.message?.toLowerCase().includes('503') ||
    error?.message?.toLowerCase().includes('service unavailable')
      ? 'AI service is busy right now. Please try again in a few seconds.'
      : 'Could not generate tafsir right now. Please try again.';

  return (
    <div className="shrink-0 border-t border-slate-200/90 bg-slate-50/90 px-4 py-4 text-left sm:px-6 sm:py-5">
      {!isSuccess && !isError && !isPending && (
        <button
          type="button"
          onClick={handleAction}
          className="w-full rounded-xl border border-emerald-600 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-emerald-200 hover:bg-emerald-50/60 hover:text-emerald-900"
        >
          <span className="mr-2" aria-hidden>
            ✨
          </span>
          Get AI explanation
        </button>
      )}

      {isPending && (
        <div className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white px-4 py-3 text-sm text-slate-600">
          <div
            className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent"
            aria-hidden
          />
          <span className="italic">Reflecting on the verse…</span>
        </div>
      )}

      {isError && !isPending && (
        <div className="space-y-3 rounded-xl border border-rose-200 bg-rose-50/70 p-4 shadow-sm sm:p-5">
          <div>
            <h4 className="text-md mb-1 font-semibold text-rose-700">AI tafsir unavailable</h4>
            <p className="text-sm leading-relaxed text-rose-700/90">{errorMessage}</p>
          </div>
          <button
            type="button"
            onClick={handleAction}
            className="w-full rounded-lg border border-rose-300 bg-white px-4 py-2 text-sm font-medium text-rose-700 transition-colors hover:bg-rose-100"
          >
            Try again
          </button>
        </div>
      )}

      {isSuccess && explanation && (
        <>
          <div className="animate-in fade-in slide-in-from-bottom-1 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm duration-300 sm:p-5">
            <h4 className="text-md mb-2 font-semibold text-emerald-700 uppercase">AI tafsir</h4>
            <p className="text-sm leading-relaxed text-slate-700">{explanation.explanation}</p>
          </div>
          <p className="justify-center text-center text-xs text-slate-500">
            This AI can't be trusted, use it with caution.
          </p>
        </>
      )}
    </div>
  );
};
