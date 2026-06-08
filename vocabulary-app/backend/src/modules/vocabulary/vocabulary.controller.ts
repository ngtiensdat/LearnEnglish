import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { VocabularyService } from './vocabulary.service';
import { CreateVocabDto } from './dto/create-vocab.dto';
import { ReviewVocabDto } from './dto/review-vocab.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { GetUser } from '../../common/decorators/get-user.decorator';

@Controller('vocab')
@UseGuards(JwtAuthGuard)
export class VocabularyController {
  constructor(private vocabularyService: VocabularyService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.student, UserRole.teacher, UserRole.admin)
  async create(@GetUser('id') userId: string, @Body() dto: CreateVocabDto) {
    return this.vocabularyService.create(userId, dto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.admin, UserRole.teacher)
  async delete(
    @GetUser('id') userId: string,
    @GetUser('role') role: UserRole,
    @Param('id') id: string,
  ) {
    return this.vocabularyService.delete(id, userId, role);
  }

  @Get('list/:roomId')
  @UseGuards(RolesGuard)
  @Roles(UserRole.admin)
  async findListByRoom(@Param('roomId') roomId: string) {
    return this.vocabularyService.findAllByRoom(roomId);
  }

  @Get('room/:roomId')
  @UseGuards(RolesGuard)
  @Roles(UserRole.student, UserRole.teacher, UserRole.admin)
  async findByRoom(@Param('roomId') roomId: string) {
    return this.vocabularyService.findAllByRoom(roomId);
  }

  @Post('review')
  async review(@GetUser('id') userId: string, @Body() dto: ReviewVocabDto) {
    return this.vocabularyService.reviewVocab(userId, dto);
  }
}
