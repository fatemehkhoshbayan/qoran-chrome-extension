export interface ITafsirRequest {
  verseKey: string;
  text: string;
}

export interface ITafsirResponse {
  explanation: string;
  modelUsed: string;
  generatedAt: string;
}
