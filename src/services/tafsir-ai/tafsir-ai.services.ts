import { axiosGet } from '../../hook/useAxios';
import tafsirEndpoints from './tafsir-ai.endpoints';
import type { ITafsirRequest, ITafsirResponse } from './tafsir-ai.types';

const tafsirServices = {
  getTafsir: async (payload: ITafsirRequest): Promise<ITafsirResponse> => {
    const response = await axiosGet.post(tafsirEndpoints.tafsir, payload);
    return response.data;
  },
};

export default tafsirServices;
