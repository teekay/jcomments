import { Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common'
import { LocalAuthGuard } from './auth.local.guard'
import { Response } from 'express'

@Controller('auth')
export class AuthController {

  @Get('login')
  loginForm(@Res() res: Response) {
    return res.render('./auth/views/login', { layout: 'dashboard' })
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Res() res: Response) {
    res.redirect('/dashboard/')
  }

  @Get('logout')
  logout(@Request() req, @Res() res: Response) {
    req.logout()
    res.redirect('/auth/login')
  }
}