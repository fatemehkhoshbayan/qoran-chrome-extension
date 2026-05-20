import { useState } from 'react';
import {
  useAddBookmark,
  useBookmarks,
  useRemoveBookmark,
} from '../../services/bookmarks/bookmarks.hooks';
import type { IVerse } from '../../services/verse/verse.types';

interface IVerseCardProps {
  verse: IVerse;
  isLoggedIn: boolean;
  onFavoriteGuest?: () => void;
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function VerseCard({ verse, isLoggedIn, onFavoriteGuest }: IVerseCardProps) {
  const arabicVerseNumber = verse?.verse_number?.toLocaleString('ar-EG');
  const [showGuestPrompt, setShowGuestPrompt] = useState(false);

  const { bookmarks } = useBookmarks(isLoggedIn);
  const { addBookmark, isPending: isAdding } = useAddBookmark();
  const { removeBookmark, isPending: isRemoving } = useRemoveBookmark();

  const favoritedBookmark = bookmarks.find(
    b => b.key === verse.chapter_id && b.verseNumber === verse.verse_number,
  );
  const isFavorited = Boolean(favoritedBookmark);

  function handleHeartClick() {
    if (!isLoggedIn) {
      setShowGuestPrompt(true);
      onFavoriteGuest?.();
      return;
    }
    if (isFavorited && favoritedBookmark) {
      removeBookmark(favoritedBookmark.id);
    } else {
      addBookmark({ key: verse.chapter_id, verseNumber: verse.verse_number });
    }
  }

  return (
    <div className="flex max-w-md flex-col gap-6">

      {/* Verse number row + heart */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleHeartClick}
          disabled={isAdding || isRemoving}
          aria-label={isFavorited ? 'Remove from favorites' : 'Save to favorites'}
          title={isFavorited ? 'Remove from favorites' : 'Save to favorites'}
          className={`rounded-full p-2 transition-all duration-200 hover:scale-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 ${
            isFavorited
              ? 'text-rose-500 hover:text-rose-600'
              : 'text-slate-300 hover:text-rose-400'
          }`}
        >
          <HeartIcon filled={isFavorited} />
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium tracking-wide text-slate-400 uppercase">Verse</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 font-arabic text-base font-semibold text-slate-600">
            {arabicVerseNumber}
          </span>
        </div>
      </div>

      {/* Arabic text */}
      <p className="font-arabic text-2xl leading-loose text-slate-800 sm:text-3xl" dir="rtl">
        {verse?.text_uthmani}
      </p>

      {showGuestPrompt && !isLoggedIn && (
        <p className="text-xs text-slate-400 italic">Sign in to save favorites.</p>
      )}

      {/* Divider */}
      <div className="mx-auto h-px w-16 rounded-full bg-slate-200" />

      {/* Translation */}
      <p className="text-sm leading-relaxed text-slate-500 italic">
        "{verse?.translations?.[0]?.text}"
      </p>
    </div>
  );
}

export default VerseCard;
