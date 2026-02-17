import { useQuery } from '@tanstack/react-query';
import type { IVerse } from './verse.types';
import verseServices from './verse.services';
import QueryKeys from '../enums';

export function useVerse(verseKey?: string) {
  const { isPending, data, error, refetch } = useQuery<{ verse: IVerse }>({
    queryKey: [QueryKeys.VERSE, verseKey || 'random'],
    queryFn: () => verseServices.getVerse(verseKey),
    placeholderData: previousData => previousData,
    staleTime: verseKey ? Infinity : 0,
  });

  return { isPending, data: data?.verse, error, refetch };
}
