import { AuthExceptionFilter } from './auth.exception'
import { Controller, Get, Post, Req, Request, Res, UseFilters, UseGuards } from '@nestjs/common'
import { LocalAuthGuard } from './auth.local.guard'
import { Response } from 'express'

@Controller('auth')
export class AuthController {

  @Get('login')
  loginForm(@Req() req, @Res() res: Response) {
    return res.render('./auth/views/login', { 
      layout: 'dashboard',
      section: 'Sign in',
      loginError: req.flash('login-error'),
      csrfToken: req.csrfToken() 
    })
  }

  @UseGuards(LocalAuthGuard)
  @UseFilters(new AuthExceptionFilter())
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