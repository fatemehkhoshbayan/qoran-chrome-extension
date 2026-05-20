import { Button } from '../../ui';
import { chapterVerseCount } from '../../constant';
import { useVerse } from '../../services/verse/verse.hooks';

interface NavigationControlsProps {
  verseKey: string;
  setVerseKey: (verseKey: string) => void;
}

export default function NavigationControls({ verseKey, setVerseKey }: NavigationControlsProps) {
    const { data: verse } = useVerse(verseKey);
    
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
    <>
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
          className={verseKey === '114:6' ? 'cursor-not-allowed opacity-30' : ''}
        />
      </div>
    </>
  );
}
