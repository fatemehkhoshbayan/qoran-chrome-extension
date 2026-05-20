import { axiosGet } from '@/hook/useAxios';
import bookmarksEndpoints from './bookmarks.endpoints';
import type { IAddBookmarkPayload, IBookmark, IBookmarksResponse } from './bookmarks.types';

const bookmarksServices = {
  listBookmarks: async (): Promise<IBookmark[]> => {
    const response = await axiosGet.get<IBookmarksResponse>(bookmarksEndpoints.list);
    return response.data.bookmarks;
  },

  addBookmark: async (payload: IAddBookmarkPayload): Promise<IBookmark> => {
    const response = await axiosGet.post<IBookmark>(bookmarksEndpoints.add, payload);
    return response.data;
  },

  removeBookmark: async (id: string): Promise<void> => {
    await axiosGet.delete(bookmarksEndpoints.remove(id));
  },
};

export default bookmarksServices;
