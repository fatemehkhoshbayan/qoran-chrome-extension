export interface IAiAnswerRequest {
  chapter_name: string;
  verseKey: string;
  text: string;
  tafsirHtml: string;
  question: string;
}

export interface IAiAnswerResponse {
  explanation: string;
  modelUsed: string;
  generatedAt: string;
}
