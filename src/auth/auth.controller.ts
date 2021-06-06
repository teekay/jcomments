import { Controller, Get, Post, Req, Request, Res, UseGuards } from '@nestjs/common'
import { LocalAuthGuard } from './auth.local.guard'
import { Response } from 'express'

@Controller('auth')
export class AuthController {

  @Get('login')
  loginForm(@Req() req, @Res() res: Response) {
    return res.render('./auth/views/login', { 
      layout: 'dashboard',
      section: 'Sign in',
      csrfToken: req.csrfToken() })
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