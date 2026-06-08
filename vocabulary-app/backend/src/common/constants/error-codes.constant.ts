/**
 * Business domain error codes for structured error responses.
 * Frontend can check these codes to display appropriate messages.
 */
export const ERROR_CODES = {
  // Auth
  INVALID_CREDENTIALS: 'AUTH_001',
  UNAUTHORIZED: 'AUTH_002',
  TOKEN_EXPIRED: 'AUTH_003',
  FORBIDDEN: 'AUTH_004',

  // Rooms
  ROOM_NOT_FOUND: 'ROOM_001',
  ROOM_WRONG_PASSWORD: 'ROOM_002',
  ROOM_ALREADY_MEMBER: 'ROOM_003',
  ROOM_FORBIDDEN: 'ROOM_004',

  // Vocabulary
  VOCAB_NOT_FOUND: 'VOCAB_001',
  VOCAB_UPLOAD_FAILED: 'VOCAB_002',

  // Learning
  TEST_NOT_FOUND: 'LEARN_001',
  INVALID_ANSWERS: 'LEARN_002',

  // General
  NOT_FOUND: 'GEN_001',
  INTERNAL_ERROR: 'GEN_002',
  BAD_REQUEST: 'GEN_003',
  VALIDATION_ERROR: 'GEN_004',
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];
