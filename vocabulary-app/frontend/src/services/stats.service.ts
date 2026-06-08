import { apiClient } from '../lib/api-client';
import { API_ENDPOINTS } from '../constants/api-endpoints';
import type { ApiResponse } from '../types/api.types';

export interface StudentStats {
  streak: number;
  weeklyHours: number;
  completedLessons: number;
  accuracy: number;
  lastStudied: string | null;
  progressHistory: number[];
  quizHistory: Array<{ date: string; score: number; total: number; roomName: string }>;
  studiedTopics: string[];
}

export const statsService = {
  getMyStats: () =>
    apiClient.get<ApiResponse<StudentStats>>(API_ENDPOINTS.STATS.MY_STATS),

  reset: () =>
    apiClient.delete<ApiResponse<void>>(API_ENDPOINTS.STATS.RESET),
};
