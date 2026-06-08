import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { AddQuestionsDto } from './dto/add-questions.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.room.findMany({
      select: {
        id: true,
        name: true,
        showScore: true,
        createdAt: true,
      },
    });
  }

  async create(userId: string, dto: CreateRoomDto) {
    const existing = await this.prisma.room.findUnique({
      where: { name: dto.name.trim() },
    });
    if (existing) {
      throw new BadRequestException('Tên phòng đã tồn tại');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const room = await this.prisma.room.create({
      data: {
        name: dto.name.trim(),
        password: hashedPassword,
        createdBy: userId,
        showScore: dto.showScore !== undefined ? dto.showScore : true,
      },
      select: {
        id: true,
        name: true,
        showScore: true,
        createdAt: true,
      },
    });

    return {
      message: 'Tạo phòng thành công',
      room,
    };
  }

  async delete(userId: string, roomId: string) {
    const room = await this.prisma.room.findUnique({
      where: { id: roomId },
    });
    if (!room) {
      throw new NotFoundException('Không tìm thấy phòng');
    }

    if (room.createdBy !== userId) {
      throw new ForbiddenException('Không phải chủ phòng');
    }

    // Cascade delete questions via Prisma model relation constraint (onDelete: Cascade)
    await this.prisma.room.delete({
      where: { id: roomId },
    });

    return { message: 'Xóa thành công' };
  }

  async addQuestions(userId: string, roomId: string, dto: AddQuestionsDto) {
    const room = await this.prisma.room.findUnique({
      where: { id: roomId },
    });
    if (!room) {
      throw new NotFoundException('Phòng không tồn tại');
    }

    if (room.createdBy !== userId) {
      throw new ForbiddenException('Không phải chủ phòng');
    }

    const { questions } = dto;
    
    // Create all questions under this room
    await this.prisma.$transaction(
      questions.map((q) =>
        this.prisma.question.create({
          data: {
            content: q.content,
            options: q.options,
            correctAnswer: q.correctAnswer,
            roomId: roomId,
          },
        }),
      ),
    );

    return { message: 'Thêm câu hỏi thành công' };
  }
}
