import { apiClient } from '../lib/api-client';
import { API_ENDPOINTS } from '../constants/api-endpoints';
import type { Room, CreateRoomDto, JoinRoomDto, QuizAnswer, QuizResult } from '../types/room.types';
import type { ApiResponse } from '../types/api.types';

export const roomsService = {
  list: () =>
    apiClient.get<ApiResponse<Room[]>>(API_ENDPOINTS.ROOMS.LIST),

  create: (dto: CreateRoomDto) =>
    apiClient.post<ApiResponse<Room>>(API_ENDPOINTS.ROOMS.CREATE, dto),

  join: (dto: JoinRoomDto) =>
    apiClient.post<ApiResponse<Room>>(API_ENDPOINTS.ROOMS.JOIN, dto),

  delete: (id: string) =>
    apiClient.delete<ApiResponse<void>>(API_ENDPOINTS.ROOMS.DELETE(id)),

  getQuestions: (id: string, password: string) =>
    apiClient.post<ApiResponse<unknown[]>>(API_ENDPOINTS.ROOMS.QUIZ(id), { password }),

  addQuestions: (id: string, questions: unknown[]) =>
    apiClient.post<ApiResponse<void>>(API_ENDPOINTS.ROOMS.QUESTIONS(id), { questions }),
};

export const quizService = {
  submitAnswers: (roomId: string, answers: QuizAnswer[]) =>
    apiClient.post<ApiResponse<QuizResult>>(API_ENDPOINTS.LEARNING.QUIZ_SUBMIT, {
      roomId,
      answers,
    }),
};
