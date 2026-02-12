import { axiosGet } from '../../hook/useAxios';
import verseEndpoints from './verse.endpoints';
import type { IVerse } from './verse.types';

const verseServices = {
  getRandomVerse: async (): Promise<{ verse: IVerse }> => {
    const url = verseEndpoints.random;
    console.log('🌐 Fetching random verse from:', url);
    try {
      const response = await axiosGet.get(url);
      console.log('✅ Verse response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching verse:', error);
      throw error;
    }
  },
};

export default verseServices;
