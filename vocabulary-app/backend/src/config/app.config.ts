import { registerAs } from '@nestjs/config';

/**
 * app.config.ts — centralized configuration factory.
 * Loads and validates all environment variables in one place.
 *
 * Usage: inject ConfigService and use configService.get<AppConfig>('app')
 */
export interface AppConfig {
  port: number;
  nodeEnv: string;
  jwtSecret: string;
  jwtExpiresIn: string;
  frontendUrl: string;
  databaseUrl: string;
}

export const appConfig = registerAs('app', (): AppConfig => ({
  port: parseInt(process.env.PORT ?? '3010', 10),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  jwtSecret: process.env.JWT_SECRET ?? 'changeme-secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
  frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:3000',
  databaseUrl: process.env.DATABASE_URL ?? '',
}));
