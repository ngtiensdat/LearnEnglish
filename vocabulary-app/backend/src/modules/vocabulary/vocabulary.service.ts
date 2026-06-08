import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateVocabDto } from './dto/create-vocab.dto';
import { ReviewVocabDto } from './dto/review-vocab.dto';

@Injectable()
export class VocabularyService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateVocabDto) {
    const room = await this.prisma.room.findUnique({
      where: { id: dto.roomId },
    });
    if (!room) {
      throw new NotFoundException('Không tìm thấy phòng');
    }

    return this.prisma.vocabulary.create({
      data: {
        word: dto.word,
        meaning: dto.meaning,
        example: dto.example,
        roomId: dto.roomId,
        creator: userId,
      },
    });
  }

  async delete(vocabId: string, userId: string, role: string) {
    const vocab = await this.prisma.vocabulary.findUnique({
      where: { id: vocabId },
    });
    if (!vocab) {
      throw new NotFoundException('Không tìm thấy từ vựng');
    }

    if (role !== 'admin' && vocab.creator !== userId) {
      throw new ForbiddenException('Bạn không có quyền xóa từ vựng này');
    }

    await this.prisma.vocabulary.delete({
      where: { id: vocabId },
    });

    return { message: 'Xóa từ vựng thành công' };
  }

  async findAllByRoom(roomId: string) {
    const room = await this.prisma.room.findUnique({
      where: { id: roomId },
    });
    if (!room) {
      throw new NotFoundException('Không tìm thấy phòng');
    }

    return this.prisma.vocabulary.findMany({
      where: { roomId },
    });
  }

  async reviewVocab(userId: string, dto: ReviewVocabDto) {
    const vocab = await this.prisma.vocabulary.findUnique({
      where: { id: dto.vocabId },
    });
    if (!vocab) {
      throw new NotFoundException('Không tìm thấy từ vựng');
    }

    if (vocab.creator !== userId) {
      throw new ForbiddenException('Bạn không có quyền ôn tập từ vựng này');
    }

    const rating = dto.rating;
    let repetitions = vocab.repetitions;
    let easeFactor = vocab.easeFactor;
    let interval = vocab.interval;

    // SuperMemo-2 Spaced Repetition Scheduling
    if (rating >= 3) {
      if (repetitions === 0) {
        interval = 1;
      } else if (repetitions === 1) {
        interval = 6;
      } else {
        interval = Math.round(interval * easeFactor);
      }
      repetitions++;
    } else {
      repetitions = 0;
      interval = 1;
    }

    // Update ease factor: EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
    easeFactor = easeFactor + (0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02));
    easeFactor = Math.max(1.3, easeFactor);

    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + interval);

    return this.prisma.vocabulary.update({
      where: { id: dto.vocabId },
      data: {
        repetitions,
        easeFactor,
        interval,
        nextReview,
      },
    });
  }
}
