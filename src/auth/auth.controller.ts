import { AuthenticatedGuard } from './authenticated.guard'
import { Controller, Get, Post, Render, Request, Res, UseGuards } from '@nestjs/common'
import { LocalAuthGuard } from './auth.local.guard'
import { Response } from 'express'

@Controller('auth')
export class AuthController {

  @Get('login')
  @Render('./auth/views/login')
  loginForm() {
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Res() res: Response) {
    res.redirect('/auth/check')
  }

  @UseGuards(AuthenticatedGuard)
  @Get('check')
  async check() {
    return 'You are in!'
  }

  @Get('logout')
  logout(@Request() req, @Res() res: Response) {
    req.logout();
    res.redirect('/auth/login');
  }
}