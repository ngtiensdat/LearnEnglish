import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { JoinRoomDto } from './dto/join-room.dto';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
import { SubmitToeicDto } from './dto/submit-toeic.dto';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LearningService {
  constructor(private prisma: PrismaService) {}

  async joinRoom(dto: JoinRoomDto) {
    const room = await this.prisma.room.findUnique({
      where: { name: dto.name },
      include: { questions: true },
    });
    if (!room) {
      throw new NotFoundException('Không tìm thấy phòng học');
    }

    const isMatch = await bcrypt.compare(dto.password, room.password);
    if (!isMatch) {
      throw new UnauthorizedException('Mật khẩu phòng học không đúng');
    }

    return {
      room: {
        id: room.id,
        questions: room.questions,
        showScore: room.showScore,
      },
    };
  }

  async submitQuiz(userId: string, dto: SubmitQuizDto) {
    const { roomId, answers } = dto;
    const room = await this.prisma.room.findUnique({
      where: { id: roomId },
      include: { questions: true },
    });
    if (!room) {
      throw new NotFoundException('Không tìm thấy phòng học');
    }

    let score = 0;
    answers.forEach((a) => {
      const q = room.questions.find((q) => q.id === a.questionId);
      if (q && a.selectedAnswer === q.correctAnswer) {
        score++;
      }
    });

    await this.prisma.studentAnswer.create({
      data: {
        roomId,
        studentId: userId,
        answers: answers as any, // Cast to any to store as Json
        score,
      },
    });

    return {
      score: room.showScore ? score : 'Hidden',
    };
  }

  async submitToeic(userId: string, dto: SubmitToeicDto) {
    const { testId, part, answers } = dto;
    const toeicDir = path.join(__dirname, '../../data/toeic');

    let testData: { title: string; questions: any[] } = { title: '', questions: [] };

    if (part === 'full') {
      const parts = ['part1', 'part2', 'part3', 'part4', 'part5', 'part6', 'part7'];
      let allQuestions: any[] = [];

      for (const p of parts) {
        const filePath = path.join(toeicDir, `test${testId}`, `${p}.json`);
        if (fs.existsSync(filePath)) {
          const fileContent = fs.readFileSync(filePath, 'utf8');
          const fileData = JSON.parse(fileContent);
          if (fileData.questions && Array.isArray(fileData.questions)) {
            allQuestions = allQuestions.concat(fileData.questions);
          }
        }
      }

      if (allQuestions.length === 0) {
        throw new NotFoundException('Không tìm thấy dữ liệu đề thi TOEIC');
      }

      testData = {
        title: `TOEIC Test ${testId} - Full Test`,
        questions: allQuestions,
      };
    } else {
      const filePath = path.join(toeicDir, `test${testId}`, `${part}.json`);
      if (!fs.existsSync(filePath)) {
        throw new NotFoundException('Không tìm thấy phần đề thi tương ứng');
      }
      const fileContent = fs.readFileSync(filePath, 'utf8');
      testData = JSON.parse(fileContent);
    }

    let correct = 0;
    const answerDetail = answers.map((ans) => {
      const q = testData.questions.find((x) => x.id == ans.id);
      const correctAnswer = q ? q.answer : null;
      const isCorrect = correctAnswer === ans.selected;
      if (isCorrect) correct++;
      return {
        questionId: ans.id,
        selectedAnswer: ans.selected,
        correctAnswer,
        isCorrect,
      };
    });

    await this.prisma.toeicResult.create({
      data: {
        userId,
        testId,
        part,
        answers: answerDetail as any,
        score: correct,
        total: testData.questions.length,
      },
    });

    return {
      message: 'Nộp bài thành công',
      score: correct,
      total: testData.questions.length,
      correctDetail: answerDetail,
    };
  }

  async getToeicResults(userId: string) {
    return this.prisma.toeicResult.findMany({
      where: { userId },
      orderBy: { completedAt: 'desc' },
    });
  }
}
