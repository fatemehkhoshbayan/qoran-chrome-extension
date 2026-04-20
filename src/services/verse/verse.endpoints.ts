const verseEndpoints = {
  random: '/quran/random-verse',
  verse_by_key: (verseKey: string) => `/quran/verses/${verseKey}`,
};

export default verseEndpoints;
