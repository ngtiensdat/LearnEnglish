export interface Room {
  id: string;
  name: string;
  teacherId: string;
  displayScore: boolean;
  createdAt: string;
  membersCount?: number;
}

export interface CreateRoomDto {
  name: string;
  password: string;
  displayScore: boolean;
}

export interface JoinRoomDto {
  roomId: string;
  password: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: 'A' | 'B' | 'C' | 'D';
}

export interface QuizAnswer {
  questionId: string;
  selectedOption: 'A' | 'B' | 'C' | 'D';
}

export interface QuizResult {
  score: number;
  total: number;
  percentage: number;
}
