import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { LearningService } from './learning.service';
import { JoinRoomDto } from './dto/join-room.dto';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
import { SubmitToeicDto } from './dto/submit-toeic.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { GetUser } from '../../common/decorators/get-user.decorator';

@Controller('learning')
@UseGuards(JwtAuthGuard)
export class LearningController {
  constructor(private learningService: LearningService) {}

  @Post('join')
  @UseGuards(RolesGuard)
  @Roles(UserRole.student)
  async joinRoom(@Body() dto: JoinRoomDto) {
    return this.learningService.joinRoom(dto);
  }

  @Post('submit')
  @UseGuards(RolesGuard)
  @Roles(UserRole.student)
  async submitQuiz(@GetUser('id') userId: string, @Body() dto: SubmitQuizDto) {
    return this.learningService.submitQuiz(userId, dto);
  }

  @Post('toeic/submit')
  async submitToeic(@GetUser('id') userId: string, @Body() dto: SubmitToeicDto) {
    return this.learningService.submitToeic(userId, dto);
  }

  @Get('toeic/results')
  async getToeicResults(@GetUser('id') userId: string) {
    return this.learningService.getToeicResults(userId);
  }
}
