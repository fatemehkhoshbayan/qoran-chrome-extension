import type { IVerse } from '../../services/verse/verse.types';

interface IVerseCardProps {
  verse: IVerse;
}

function VerseCard({ verse }: IVerseCardProps) {
  const arabicVerseNumber = verse?.verse_number?.toLocaleString('ar-EG');

  return (
    <div className="flex max-w-md flex-col gap-5">
      <p className="font-arabic text-2xl leading-loose text-slate-800 sm:text-3xl" dir="rtl">
        {verse?.text_uthmani}
        {''}
        {arabicVerseNumber}
      </p>
      <div className="mx-auto h-1 w-25 rounded-full bg-slate-200" />
      <p className="text-sm leading-relaxed text-slate-500 italic">
        "{verse?.translations?.[0]?.text}"
      </p>
    </div>
  );
}

export default VerseCard;
