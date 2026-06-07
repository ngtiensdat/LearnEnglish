import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { AddQuestionsDto } from './dto/add-questions.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { GetUser } from '../../common/decorators/get-user.decorator';

@Controller('rooms')
@UseGuards(JwtAuthGuard)
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @Get()
  async findAll() {
    return this.roomsService.findAll();
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.teacher, UserRole.admin)
  async create(@GetUser('id') userId: string, @Body() dto: CreateRoomDto) {
    return this.roomsService.create(userId, dto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.teacher, UserRole.admin)
  async delete(@GetUser('id') userId: string, @Param('id') id: string) {
    return this.roomsService.delete(userId, id);
  }

  @Post(':id/questions')
  @UseGuards(RolesGuard)
  @Roles(UserRole.teacher, UserRole.admin)
  async addQuestions(
    @GetUser('id') userId: string,
    @Param('id') id: string,
    @Body() dto: AddQuestionsDto,
  ) {
    return this.roomsService.addQuestions(userId, id, dto);
  }
}
