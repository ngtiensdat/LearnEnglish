import { LOCAL_STORAGE_KEYS } from '../constants/app.constants';

/**
 * Safe localStorage getItem — returns null on SSR or error.
 */
export function getStorage(key: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

/**
 * Safe localStorage setItem — no-op on SSR or error.
 */
export function setStorage(key: string, value: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Ignore quota errors
  }
}

/**
 * Safe localStorage removeItem — no-op on SSR or error.
 */
export function removeStorage(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Ignore errors
  }
}

/**
 * Clear all auth-related storage keys.
 */
export function clearAuthStorage(): void {
  removeStorage(LOCAL_STORAGE_KEYS.TOKEN);
  removeStorage(LOCAL_STORAGE_KEYS.ROLE);
  removeStorage(LOCAL_STORAGE_KEYS.USER_ID);
}
