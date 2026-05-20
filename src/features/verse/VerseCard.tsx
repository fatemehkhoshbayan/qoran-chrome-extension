import { useState } from 'react';
import { Heart } from 'lucide-react';
import {
  useAddBookmark,
  useBookmarks,
  useRemoveBookmark,
} from '@/services/bookmarks/bookmarks.hooks';
import type { IVerse } from '@/services/verse/verse.types';

interface IVerseCardProps {
  verse: IVerse;
  isLoggedIn: boolean;
  onFavoriteGuest?: () => void;
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
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleHeartClick}
          disabled={isAdding || isRemoving}
          aria-label={isFavorited ? 'Remove from favorites' : 'Save to favorites'}
          title={isFavorited ? 'Remove from favorites' : 'Save to favorites'}
          className={`rounded-full p-2 transition-all duration-200 hover:scale-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 ${
            isFavorited ? 'text-rose-500 hover:text-rose-600' : 'text-slate-300 hover:text-rose-400'
          }`}
        >
          <Heart
            size={20}
            aria-hidden
            className={isFavorited ? 'fill-current' : ''}
          />
        </button>

        <div className="flex items-center gap-2">
          <span className="font-arabic flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-base font-semibold text-slate-600">
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
