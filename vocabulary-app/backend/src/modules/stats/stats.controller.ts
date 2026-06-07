import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { StatsService } from './stats.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { GetUser } from '../../common/decorators/get-user.decorator';

@Controller('stats')
@UseGuards(JwtAuthGuard)
export class StatsController {
  constructor(private statsService: StatsService) {}

  @Post('history')
  async createHistory(
    @GetUser('id') userId: string,
    @GetUser('role') userRole: string,
    @Body() dto: CreateHistoryDto,
  ) {
    return this.statsService.createHistory(userId, userRole, dto);
  }

  @Get('history')
  async getHistory(@GetUser('id') userId: string) {
    return this.statsService.getHistory(userId);
  }
}
