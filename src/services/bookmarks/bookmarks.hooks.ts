import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import QueryKeys from '../enums';
import bookmarksServices from './bookmarks.services';
import type { IAddBookmarkPayload, IBookmark } from './bookmarks.types';

export function useBookmarks(isLoggedIn: boolean) {
  const { data, isPending, error } = useQuery<IBookmark[]>({
    queryKey: [QueryKeys.BOOKMARKS],
    queryFn: bookmarksServices.listBookmarks,
    enabled: isLoggedIn,
    staleTime: 5 * 60 * 1000,
  });

  return { bookmarks: data ?? [], isPending, error };
}

export function useAddBookmark() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation<IBookmark, Error, IAddBookmarkPayload>({
    mutationFn: bookmarksServices.addBookmark,
    onSuccess: newBookmark => {
      queryClient.setQueryData<IBookmark[]>([QueryKeys.BOOKMARKS], previous => {
        if (!previous) return [newBookmark];
        const exists = previous.some(
          b => b.key === newBookmark.key && b.verseNumber === newBookmark.verseNumber,
        );
        return exists ? previous : [...previous, newBookmark];
      });
    },
  });

  return { addBookmark: mutate, isPending };
}

export function useRemoveBookmark() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation<void, Error, string>({
    mutationFn: bookmarksServices.removeBookmark,
    onSuccess: (_, removedId) => {
      queryClient.setQueryData<IBookmark[]>([QueryKeys.BOOKMARKS], previous => {
        if (!previous) return [];
        return previous.filter(b => b.id !== removedId);
      });
    },
  });

  return { removeBookmark: mutate, isPending };
}
