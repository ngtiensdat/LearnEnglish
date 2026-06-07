import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './database/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { VocabularyModule } from './modules/vocabulary/vocabulary.module';
import { LearningModule } from './modules/learning/learning.module';
import { StatsModule } from './modules/stats/stats.module';
import { NotificationsModule } from './modules/notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    RoomsModule,
    VocabularyModule,
    LearningModule,
    StatsModule,
    NotificationsModule,
  ],
})
export class AppModule {}
