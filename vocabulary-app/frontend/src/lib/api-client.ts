import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

export const apiClient = axios.create({
  baseURL: 'http://localhost:3010',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach bearer token
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor to unwrap data & handle validation errors
apiClient.interceptors.response.use(
  (response) => {
    // If backend formatted the response, unwrap and return it
    if (response.data && response.data.success !== undefined) {
      return response.data; // Contains { success, data, meta, errors }
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    // Return structured error payload or generic message
    return Promise.reject(error.response?.data?.errors || error.response?.data || error.message);
  },
);
export default apiClient;
