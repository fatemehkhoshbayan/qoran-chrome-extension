import { axiosGet } from '../../hook/useAxios';
import questionAnsweringAiEndpoints from './QuestionAnsweringAi.endpoints';
import type { IAiAnswerRequest, IAiAnswerResponse } from './QuestionAnsweringAi.types';

const QuestionAnsweringAiServices = {
  getAIAnswer: async (payload: IAiAnswerRequest): Promise<IAiAnswerResponse> => {
    const response = await axiosGet.post(questionAnsweringAiEndpoints.answerAi, payload);
    return response.data;
  },
};

export default QuestionAnsweringAiServices;
