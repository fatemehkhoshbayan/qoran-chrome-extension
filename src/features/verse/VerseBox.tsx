import { TriangleAlert } from 'lucide-react';
import { useSession } from '../../services/auth/auth.hooks';
import authServices from '../../services/auth/auth.services';
import { useVerse } from '../../services/verse/verse.hooks';
import { Box, Button } from '../../ui';
import VerseCard from './VerseCard';
import { TafsirBox } from '../tafsir/TafsirBox';

export default function VerseBox({ verseKey }: { verseKey: string }) {
  const { isLoggedIn } = useSession();
  const { data: verse, isPending, error } = useVerse(verseKey);
  const tafsirVerseKey = verseKey || verse?.verse_key || '';

  return (
    <Box className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-2 py-2 text-center">
          {error && (
            <div className="flex flex-col items-center justify-center gap-8 py-20 text-center">
              <TriangleAlert className="h-10 w-10 text-amber-400" aria-hidden />
              <p className="max-w-[220px] text-base text-slate-600">
                We couldn't load the verse. Check your connection and try again.
              </p>
              <Button
                onClick={() => window.location.reload()}
                text="Try Again"
                className="bg-emerald-600! px-4 py-2 text-base text-white hover:bg-emerald-700!"
              />
            </div>
          )}

          {isPending && (
            <div>
              {/* Chapter Badge */}
              <div className="flex shrink-0 animate-pulse justify-center">
                <span className="rounded-full bg-emerald-50 px-5 py-2 text-xs font-semibold tracking-[0.15em] text-emerald-700 uppercase">
                  {'Loading…'}
                </span>
              </div>

              <p className="animate-pulse py-10 text-base text-slate-500">Seeking verse…</p>
            </div>
          )}

          {verse && (
            <div className="flex flex-col gap-1">
              {/* Chapter Badge */}
              <div className="flex shrink-0 justify-center py-3">
                <span className="rounded-full bg-emerald-50 px-5 py-2 text-xs font-semibold tracking-[0.15em] text-emerald-700 uppercase">
                  {verse?.chapter_name ? `${verse.chapter_name}` : '…'}
                </span>
              </div>
              <VerseCard
                verse={verse}
                isLoggedIn={isLoggedIn}
                onFavoriteGuest={() => authServices.login().catch(() => {})}
              />
            </div>
          )}
        </div>
        {verse && <TafsirBox key={tafsirVerseKey} verse={verse} />}
      </div>
    </Box>
  );
}
