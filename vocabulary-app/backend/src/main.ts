import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Enable cookieParser
  app.use(cookieParser());

  // Enable validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Enable global interceptor
  app.useGlobalInterceptors(new TransformInterceptor());

  // Enable global exception filter
  app.useGlobalFilters(new AllExceptionsFilter());

  // Dynamic CORS configuration matching FOOD-AI
  app.enableCors({
    origin: (origin, callback) => {
      const frontendUrl = configService.get<string>('FRONTEND_URL') || 'http://localhost:3000';
      const allowedOrigins = [frontendUrl, 'http://127.0.0.1:3000'];

      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        origin.startsWith('http://localhost:') ||
        origin.startsWith('http://127.0.0.1:') ||
        /^http:\/\/192\.168\.\d+\.\d+(:\d+)?$/.test(origin) ||
        /^http:\/\/10\.\d+\.\d+\.\d+(:\d+)?$/.test(origin) ||
        /^http:\/\/172\.(1[6-9]|2\d|3[01])\.\d+\.\d+(:\d+)?$/.test(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
  });

  const port = configService.get<number>('PORT') || 3010;
  await app.listen(port);
  logger.log(`--- BACKEND ĐÃ SẴN SÀNG TRÊN CỔNG: ${port} ---`);
}
bootstrap();
