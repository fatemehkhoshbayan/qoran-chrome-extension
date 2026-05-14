const bookmarksEndpoints = {
  list: '/user/bookmarks',
  add: '/user/bookmarks',
  remove: (id: string) => `/user/bookmarks/${id}`,
};

export default bookmarksEndpoints;
