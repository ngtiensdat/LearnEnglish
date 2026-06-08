import { z } from 'zod';

export const createRoomSchema = z.object({
  name: z.string().min(3, 'Room name must be at least 3 characters').max(100),
  password: z.string().min(4, 'Password must be at least 4 characters'),
  displayScore: z.boolean().default(false),
});

export const joinRoomSchema = z.object({
  roomId: z.string().min(1, 'Room ID is required'),
  password: z.string().min(1, 'Password is required'),
});

export const createVocabSchema = z.object({
  word: z.string().min(1, 'Word is required').max(200),
  meaning: z.string().min(1, 'Meaning is required').max(500),
  example: z.string().max(1000).optional(),
  roomId: z.string().min(1, 'Room ID is required'),
});

export type CreateRoomFormData = z.infer<typeof createRoomSchema>;
export type JoinRoomFormData = z.infer<typeof joinRoomSchema>;
export type CreateVocabFormData = z.infer<typeof createVocabSchema>;
