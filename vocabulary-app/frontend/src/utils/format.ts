/**
 * Format a date string to a human-readable format.
 */
export function formatDate(dateStr: string | null | undefined, locale = 'vi-VN'): string {
  if (!dateStr) return '—';
  try {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

/**
 * Format a score as a percentage string.
 */
export function formatScore(correct: number, total: number): string {
  if (total === 0) return '0%';
  return `${Math.round((correct / total) * 100)}%`;
}

/**
 * Truncate a string to a max length with ellipsis.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength)}...`;
}

/**
 * Capitalize the first letter of a string.
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
