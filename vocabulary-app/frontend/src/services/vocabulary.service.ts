import { apiClient } from '../lib/api-client';
import { API_ENDPOINTS } from '../constants/api-endpoints';
import type { Vocabulary, CreateVocabDto } from '../types/vocabulary.types';
import type { ApiResponse } from '../types/api.types';

export const vocabularyService = {
  getByRoom: (roomId: string) =>
    apiClient.get<ApiResponse<Vocabulary[]>>(API_ENDPOINTS.ROOMS.VOCAB(roomId)),

  create: (dto: CreateVocabDto) =>
    apiClient.post<ApiResponse<Vocabulary>>(API_ENDPOINTS.VOCABULARY.CREATE, dto),

  delete: (id: string) =>
    apiClient.delete<ApiResponse<void>>(API_ENDPOINTS.VOCABULARY.DELETE(id)),

  upload: (roomId: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('roomId', roomId);
    return apiClient.post<ApiResponse<{ count: number }>>(
      API_ENDPOINTS.VOCABULARY.UPLOAD,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
  },

  review: (wordId: string, rating: number) =>
    apiClient.post<ApiResponse<void>>(API_ENDPOINTS.VOCABULARY.REVIEW, { wordId, rating }),
};
