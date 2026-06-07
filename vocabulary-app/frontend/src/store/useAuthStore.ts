import { create } from 'zustand';

interface AuthState {
  token: string | null;
  role: string | null;
  userId: string | null;
  setCredentials: (token: string, role: string, userId: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // Safely check for localStorage in client-side context
  const getSafeLocalStorage = (key: string): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  };

  return {
    token: getSafeLocalStorage('token'),
    role: getSafeLocalStorage('role'),
    userId: getSafeLocalStorage('userId'),
    setCredentials: (token, role, userId) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('userId', userId);
      }
      set({ token, role, userId });
    },
    logout: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userId');
      }
      set({ token: null, role: null, userId: null });
    },
  };
});
