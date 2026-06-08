'use client';

import { useAuthStore } from '../store/useAuthStore';
import { useRouter } from 'next/navigation';
import { ROUTES } from '../constants/routes';

/**
 * Wrapper hook around useAuthStore that adds convenience helpers.
 */
export function useAuth() {
  const { token, role, userId, setCredentials, logout } = useAuthStore();
  const router = useRouter();

  const isAuthenticated = !!token;
  const isStudent = role === 'student';
  const isTeacher = role === 'teacher';
  const isAdmin = role === 'admin';

  const handleLogout = () => {
    logout();
    router.push(ROUTES.HOME);
  };

  const redirectIfAuthenticated = () => {
    if (isAuthenticated) {
      router.push(ROUTES.DASHBOARD);
      return true;
    }
    return false;
  };

  const redirectIfUnauthenticated = () => {
    if (!isAuthenticated) {
      router.push(ROUTES.LOGIN);
      return true;
    }
    return false;
  };

  return {
    token,
    role,
    userId,
    isAuthenticated,
    isStudent,
    isTeacher,
    isAdmin,
    setCredentials,
    logout: handleLogout,
    redirectIfAuthenticated,
    redirectIfUnauthenticated,
  };
}
