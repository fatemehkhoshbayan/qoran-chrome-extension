import React, { useMemo, useState } from 'react';
import { useQuestionAnsweringAi } from '../../services/QuestionAnsweringAi/QuestionAnsweringAi.hooks';
import type { IVerse } from '../../services/verse/verse.types';

interface Props {
  verse: IVerse;
}

export const TafsirBox: React.FC<Props> = ({ verse }) => {
  const { generateAiAnswer, explanation, isPending, isSuccess, isError, error } =
    useQuestionAnsweringAi();
  const [activeMode, setActiveMode] = useState<'idle' | 'ask' | 'tafsir'>('idle');
  const [question, setQuestion] = useState('');
  const [lastQuestion, setLastQuestion] = useState('');
  const [showFullTafsir, setShowFullTafsir] = useState(false);

  const tafsirHtml = verse.tafsir?.text ?? '';
  const tafsirText = useMemo(() => {
    if (!tafsirHtml) {
      return '';
    }

    if (typeof window === 'undefined') {
      return tafsirHtml
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    }

    const parser = new DOMParser();
    const parsed = parser.parseFromString(tafsirHtml, 'text/html');
    return parsed.body.textContent?.replace(/\s+/g, ' ').trim() ?? '';
  }, [tafsirHtml]);

  const words = tafsirText.split(' ').filter(Boolean);
  const hasMoreTafsir = words.length > 7;
  const tafsirPreview = words.slice(0, 7).join(' ');

  const handleAction = (questionText: string) => {
    const sanitizedQuestion = questionText.trim();
    if (!sanitizedQuestion) {
      return;
    }

    generateAiAnswer({
      chapter_name: verse.chapter_name,
      verseKey: verse.verse_key,
      text: verse.text_uthmani,
      tafsirHtml,
      question: sanitizedQuestion,
    });

    setLastQuestion(sanitizedQuestion);
    setQuestion('');
  };

  const showTafsir = () => {
    setActiveMode('tafsir');
  };

  const errorMessage =
    error?.message?.toLowerCase().includes('503') ||
    error?.message?.toLowerCase().includes('service unavailable')
      ? 'AI service is busy right now. Please try again in a few seconds.'
      : 'Could not generate tafsir right now. Please try again.';

  return (
    <div className="shrink-0 border-t border-slate-200/90 bg-slate-50/90 px-4 py-4 text-left sm:px-6 sm:py-5">
      <div className="space-y-3">
        {activeMode === 'idle' ? (
          <>
            <button
              type="button"
              className="w-full rounded-xl border border-emerald-600 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-emerald-200 hover:bg-emerald-50/60 hover:text-emerald-900"
              onClick={showTafsir}
            >
              Show Tafsir
            </button>
            <button
              type="button"
              onClick={() => setActiveMode('ask')}
              className="w-full rounded-xl border border-emerald-600 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-emerald-200 hover:bg-emerald-50/60 hover:text-emerald-900"
            >
              <span className="mr-2" aria-hidden>
                ✨
              </span>
              Ask AI a question
            </button>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveMode('tafsir')}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-600 bg-white text-sm text-slate-700 shadow-sm transition-colors hover:border-emerald-200 hover:bg-emerald-50/60 hover:text-emerald-900"
              aria-label="Show tafsir"
              title="Show tafsir"
            >
              📖
            </button>
            <button
              type="button"
              onClick={() => setActiveMode('ask')}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-600 bg-white text-sm text-slate-700 shadow-sm transition-colors hover:border-emerald-200 hover:bg-emerald-50/60 hover:text-emerald-900"
              aria-label="Ask AI"
              title="Ask AI"
            >
              ✨
            </button>
          </div>
        )}

        {activeMode === 'ask' && (
          <form
            className="flex items-center gap-2"
            onSubmit={event => {
              event.preventDefault();
              handleAction(question);
            }}
          >
            <input
              type="text"
              value={question}
              onChange={event => setQuestion(event.target.value)}
              placeholder="Ask AI a question"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 rounded-lg border border-emerald-600 bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={!question.trim() || isPending}
            >
              Ask
            </button>
          </form>
        )}

        {activeMode === 'tafsir' && tafsirHtml && (
          <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
            <h4 className="text-md mb-2 font-semibold text-emerald-700 uppercase">Verse tafsir</h4>
            {!showFullTafsir ? (
              <p className="text-sm leading-relaxed text-slate-700">
                {tafsirPreview}
                {hasMoreTafsir ? '...' : ''}
              </p>
            ) : (
              <div
                className="prose prose-sm max-w-none text-slate-700"
                dangerouslySetInnerHTML={{ __html: tafsirHtml }}
              />
            )}
            {hasMoreTafsir && (
              <button
                type="button"
                onClick={() => setShowFullTafsir(previous => !previous)}
                className="mt-3 text-sm font-medium text-emerald-700 hover:text-emerald-900"
              >
                {showFullTafsir ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>
        )}

        {activeMode === 'tafsir' && !tafsirHtml && (
          <div className="rounded-xl border border-slate-200/80 bg-white p-4 text-sm text-slate-600 shadow-sm sm:p-5">
            Tafsir is not available for this verse.
          </div>
        )}
      </div>

      {isPending && (
        <div className="mt-3 flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white px-4 py-3 text-sm text-slate-600">
          <div
            className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent"
            aria-hidden
          />
          <span className="italic">Reflecting on the verse...</span>
        </div>
      )}

      {isError && !isPending && (
        <div className="mt-3 space-y-3 rounded-xl border border-rose-200 bg-rose-50/70 p-4 shadow-sm sm:p-5">
          <div>
            <h4 className="text-md mb-1 font-semibold text-rose-700">AI tafsir unavailable</h4>
            <p className="text-sm leading-relaxed text-rose-700/90">{errorMessage}</p>
          </div>
          <button
            type="button"
            onClick={() => handleAction(lastQuestion)}
            className="w-full rounded-lg border border-rose-300 bg-white px-4 py-2 text-sm font-medium text-rose-700 transition-colors hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={!lastQuestion}
          >
            Try again
          </button>
        </div>
      )}

      {isSuccess && explanation && (
        <div className="mt-3">
          <div className="animate-in fade-in slide-in-from-bottom-1 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm duration-300 sm:p-5">
            <h4 className="text-md mb-2 font-semibold text-emerald-700 uppercase">AI tafsir</h4>
            <p className="text-sm leading-relaxed text-slate-700">{explanation.explanation}</p>
          </div>
          <p className="justify-center p-2 text-center text-xs text-slate-500">
            This AI can't be trusted, use it with caution.
          </p>
        </div>
      )}
    </div>
  );
};
