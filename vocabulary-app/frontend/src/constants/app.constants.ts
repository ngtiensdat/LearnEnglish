export const APP_CONFIG = {
  APP_NAME: 'Learn English',
  APP_TAGLINE: 'Master TOEIC with AI-Powered Practice',
} as const;

export const THEME = {
  DARK: 'dark',
  LIGHT: 'light',
  SYSTEM: 'system',
} as const;

export const FONT_SIZE = {
  SM: 'sm',
  BASE: 'base',
  LG: 'lg',
} as const;

export const FONT_SIZE_VALUES: Record<string, string> = {
  sm: '14px',
  base: '16px',
  lg: '18px',
};

export const LANGUAGE = {
  VI: 'vi',
  EN: 'en',
} as const;

export const LOCAL_STORAGE_KEYS = {
  TOKEN: 'token',
  ROLE: 'role',
  USER_ID: 'userId',
  THEME: 'theme',
  FONT_SIZE: 'font-size',
  SOUND_ENABLED: 'sound_enabled',
  LANGUAGE: 'language',
} as const;

export const VOUCHER_CODES = ['FREE100', 'DISCOUNT50', 'LEARN2026'] as const;

export const SOUND_CONFIG = {
  FREQUENCY_START: 900,
  FREQUENCY_END: 150,
  GAIN_START: 0.04,
  GAIN_END: 0.001,
  DURATION: 0.08,
  OSC_TYPE: 'sine' as OscillatorType,
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
} as const;
