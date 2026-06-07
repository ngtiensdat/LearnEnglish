import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateHistoryDto } from './dto/create-history.dto';

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

  async createHistory(userId: string, userRole: string, dto: CreateHistoryDto) {
    return this.prisma.history.create({
      data: {
        userId,
        type: userRole,
        action: dto.action,
        roomId: dto.roomId,
        details: dto.details,
      },
    });
  }

  async getHistory(userId: string) {
    // Note: To match the React client's populate('roomId') if it were used, 
    // but the frontend actually just accesses item.action and item.details.
    const history = await this.prisma.history.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return { history };
  }
}
