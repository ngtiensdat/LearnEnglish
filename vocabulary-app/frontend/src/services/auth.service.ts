import { apiClient } from '../lib/api-client';
import { API_ENDPOINTS } from '../constants/api-endpoints';
import type { LoginDto, RegisterDto, AuthResponse } from '../types/auth.types';
import type { ApiResponse } from '../types/api.types';

export const authService = {
  login: (dto: LoginDto) =>
    apiClient.post<ApiResponse<AuthResponse>>(API_ENDPOINTS.AUTH.LOGIN, dto),

  register: (dto: RegisterDto) =>
    apiClient.post<ApiResponse<AuthResponse>>(API_ENDPOINTS.AUTH.REGISTER, dto),

  getProfile: () =>
    apiClient.get<ApiResponse<{ id: string; email: string; username: string; role: string }>>(
      API_ENDPOINTS.AUTH.PROFILE
    ),
};
