import { useMutation } from '@tanstack/react-query';
import QuestionAnsweringAiServices from './QuestionAnsweringAi.services';
import type { IAiAnswerRequest, IAiAnswerResponse } from './QuestionAnsweringAi.types';

export function useQuestionAnsweringAi() {
  const { mutate, data, isPending, error, isSuccess, isError } = useMutation<
    IAiAnswerResponse,
    Error,
    IAiAnswerRequest
  >({
    mutationFn: payload => QuestionAnsweringAiServices.getAIAnswer(payload),
  });

  return {
    generateAiAnswer: mutate,
    explanation: data,
    isPending,
    error,
    isSuccess,
    isError,
  };
}
