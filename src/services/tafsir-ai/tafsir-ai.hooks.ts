import { useMutation } from '@tanstack/react-query';
import tafsirServices from './tafsir-ai.services';
import type { ITafsirRequest, ITafsirResponse } from './tafsir-ai.types';

export function useTafsir() {
  const { mutate, data, isPending, error, isSuccess } = useMutation<
    ITafsirResponse,
    Error,
    ITafsirRequest
  >({
    mutationFn: payload => tafsirServices.getTafsir(payload),
  });

  return {
    generateTafsir: mutate,
    explanation: data,
    isPending,
    error,
    isSuccess,
  };
}
