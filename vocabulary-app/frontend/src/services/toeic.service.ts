import { apiClient } from '../lib/api-client';
import { API_ENDPOINTS } from '../constants/api-endpoints';
import type { SubmitToeicDto, ToeicResult } from '../types/vocabulary.types';
import type { ApiResponse } from '../types/api.types';

export const toeicService = {
  submitTest: (dto: SubmitToeicDto) =>
    apiClient.post<ApiResponse<ToeicResult>>(API_ENDPOINTS.LEARNING.TOEIC_SUBMIT, dto),
};
