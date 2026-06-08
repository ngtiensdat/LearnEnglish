export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  email: string;
  username: string;
  role: UserRole;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  username: string;
  password: string;
  role: UserRole;
}

export interface AuthResponse {
  token: string;
  role: UserRole;
  userId: string;
}

export interface AuthState {
  token: string | null;
  role: string | null;
  userId: string | null;
  isAuthenticated: boolean;
}
