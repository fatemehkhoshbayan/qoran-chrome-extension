import { useState } from 'react';
import Layout from './layouts/Layout';
import { useVerse } from './services/verse/verse.hooks';
import { Box, Button } from './ui';
import { chapterVerseCount } from './constant';
import VerseCard from './features/verse/VerseCard';
import { TafsirBox } from './features/tafsir/TafsirBox';

function App() {
  const [verseKey, setVerseKey] = useState<string>('');
  const { data: verse, isPending, error } = useVerse(verseKey);
  const tafsirVerseKey = verseKey || verse?.verse_key || '';

  const OnChangeVerse = (action: 'next' | 'prev') => {
    const currentChapter = verse?.chapter_id;
    const currentVerseNum = verse?.verse_number;

    if (!currentChapter || !currentVerseNum) return;

    let nextChapter = currentChapter;
    let nextVerse = currentVerseNum;

    const maxInChapter = chapterVerseCount[nextChapter];

    if (action === 'next') {
      if (nextVerse < maxInChapter) {
        nextVerse++;
      } else if (nextChapter < 114) {
        nextChapter++;
        nextVerse = 1;
      }
    } else {
      if (nextVerse > 1) {
        nextVerse--;
      } else if (nextChapter > 1) {
        nextChapter--;
        nextVerse = chapterVerseCount[nextChapter];
      }
    }

    setVerseKey(`${nextChapter}:${nextVerse}`);
  };

  return (
    <Layout>
      <div className="flex flex-1 flex-col gap-5 overflow-hidden">
        <Box className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-2 py-2 text-center">
              {error && (
                <div className="flex flex-col items-center justify-center gap-8 py-20 text-center">
                  <span className="text-4xl opacity-80">⚠️</span>
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
                  <VerseCard verse={verse} />
                </div>
              )}
            </div>
            {verse && <TafsirBox key={tafsirVerseKey} verse={verse} />}
          </div>
        </Box>

        {/* Navigation Controls */}
        <div className="flex shrink-0 gap-3">
          <Button
            text="prev"
            onClick={() => OnChangeVerse('prev')}
            disabled={verseKey === '1:1'}
            className={verseKey === '1:1' ? 'cursor-not-allowed opacity-30' : ''}
          />
          {/* <Button text="play" /> */}
          <Button
            text="next"
            disabled={verseKey === '114:6'}
            onClick={() => OnChangeVerse('next')}
            className={verseKey === '1:1' ? 'cursor-not-allowed opacity-30' : ''}
          />
        </div>
      </div>
    </Layout>
  );
}

export default App;
