import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { GetUser } from '../../common/decorators/get-user.decorator';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post(['register', 'auth/register'])
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post(['login', 'auth/login'])
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get(['me', 'auth/me'])
  @UseGuards(JwtAuthGuard)
  async getMe(@GetUser('id') userId: string) {
    return this.authService.getMe(userId);
  }
}
