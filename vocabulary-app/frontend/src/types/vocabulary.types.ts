export interface Vocabulary {
  id: string;
  word: string;
  meaning: string;
  example?: string;
  roomId: string;
}

export interface CreateVocabDto {
  word: string;
  meaning: string;
  example?: string;
  roomId: string;
}

export interface ToeicTest {
  id: string;
  title: string;
  duration: number;
  parts: ToeicPart[];
}

export interface ToeicPart {
  partNumber: number;
  questions: ToeicQuestion[];
}

export interface ToeicQuestion {
  id: number;
  question?: string;
  options: string[];
  correctAnswer?: string;
  audio?: string;
  image?: string;
}

export interface SubmitToeicDto {
  testId: string;
  part: number;
  answers: Record<number, string>;
}

export interface ToeicResult {
  score: number;
  total: number;
  correctCount: number;
}
