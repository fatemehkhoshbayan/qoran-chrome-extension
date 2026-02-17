const verseEndpoints = {
  random: '/random-verse',
  verse_by_key: (verseKey: string) => `/verses/${verseKey}`,
};

export default verseEndpoints;
