/**
 * DateHelper — utility class for common date formatting operations.
 */
export class DateHelper {
  /**
   * Returns the current date as an ISO string.
   */
  static now(): string {
    return new Date().toISOString();
  }

  /**
   * Returns a date N days from now.
   */
  static daysFromNow(days: number): Date {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  }

  /**
   * Formats a date to a locale-friendly string.
   */
  static format(date: Date | string, locale = 'vi-VN'): string {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(date));
  }

  /**
   * Returns true if date is in the past.
   */
  static isPast(date: Date | string): boolean {
    return new Date(date) < new Date();
  }
}
