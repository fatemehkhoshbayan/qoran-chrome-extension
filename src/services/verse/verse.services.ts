import { axiosGet } from '../../hook/useAxios';
import verseEndpoints from './verse.endpoints';
import type { IVerse } from './verse.types';

const verseServices = {
  getVerse: async (verseKey?: string): Promise<{ verse: IVerse }> => {
    const endpoint = verseKey ? verseEndpoints.verse_by_key(verseKey) : verseEndpoints.random;
    const response = await axiosGet.get(endpoint);

    return response.data;
  },
};

export default verseServices;
