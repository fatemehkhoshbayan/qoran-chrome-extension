import { useQuery } from '@tanstack/react-query';
import type { IVerse } from './verse.types';
import verseServices from './verse.services';
import QueryKeys from '../enums';

export function useFetchRandomVerse() {
  const { isPending, data, error, refetch } = useQuery<{ verse: IVerse }>({
    queryKey: [QueryKeys.GET_RANDOM_VERSE],
    queryFn: () => verseServices.getRandomVerse(),
  });

  console.log('📊 Query state:', { isPending, hasData: !!data, error: error?.message });

  return { isPending, data: data?.verse, error, refetch };
}
