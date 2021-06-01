import { Controller, Get, Post, Render, Request, UseGuards } from '@nestjs/common'
import { LocalAuthGuard } from './auth.local.guard';

@Controller('auth')
export class AuthController {

  @Get('/login')
  @Render('./auth/views/login')
  loginForm() {
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    // TODO set cookie etc
    return req.user;
  }
}