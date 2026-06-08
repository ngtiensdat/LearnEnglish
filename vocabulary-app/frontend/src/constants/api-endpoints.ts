export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/auth/profile',
  },
  ROOMS: {
    LIST: '/rooms',
    CREATE: '/rooms',
    JOIN: '/rooms/join',
    BY_ID: (id: string) => `/rooms/${id}`,
    DELETE: (id: string) => `/rooms/${id}`,
    VOCAB: (id: string) => `/rooms/${id}/vocab`,
    QUESTIONS: (id: string) => `/rooms/${id}/questions`,
    QUIZ: (id: string) => `/rooms/${id}/quiz`,
  },
  VOCABULARY: {
    CREATE: '/vocabulary',
    DELETE: (id: string) => `/vocabulary/${id}`,
    UPLOAD: '/vocabulary/upload',
    REVIEW: '/vocabulary/review',
  },
  LEARNING: {
    TOEIC_SUBMIT: '/learning/submit-toeic',
    QUIZ_SUBMIT: '/learning/submit-quiz',
  },
  STATS: {
    MY_STATS: '/stats/my',
    HISTORY: '/stats/history',
    RESET: '/stats/reset',
  },
} as const;
