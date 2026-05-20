const authEndpoints = {
  login: (state: string) => `/auth/quran/login?state=${state}`,
  session: (extState: string) => `/auth/quran/session/${extState}`,
  me: '/auth/quran/me',
  logout: '/auth/quran/logout',
};

export default authEndpoints;
