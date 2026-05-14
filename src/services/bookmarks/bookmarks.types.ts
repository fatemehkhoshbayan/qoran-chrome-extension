export interface IBookmark {
  id: string;
  key: number;
  verseNumber: number;
}

export interface IAddBookmarkPayload {
  key: number;
  verseNumber: number;
}

export interface IBookmarksResponse {
  bookmarks: IBookmark[];
}
