import { AuthExceptionFilter } from './auth.exception'
import { AuthService } from './auth.service'
import { Body, Controller, Get, Param, Post, Req, Request, Res, UseFilters, UseGuards } from '@nestjs/common'
import { LocalAuthGuard } from './auth.local.guard'
import { Logger } from 'nestjs-pino'
import { Response } from 'express'

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService,
    private readonly logger: Logger) {}

  @Get('login')
  loginForm(@Req() req, @Res() res: Response): void {
    if (req.isAuthenticated()) {
      return res.redirect('/dashboard/');
    }

    return res.render('./auth/views/login', { 
      layout: 'dashboard',
      section: 'Sign in',
      loginError: req.flash('login-error'),
      csrfToken: req.csrfToken() 
    })
  }

  @UseGuards(LocalAuthGuard)
  @UseFilters(AuthExceptionFilter)
  @Post('login')
  async login(@Res() res: Response): Promise<void> {
    res.redirect('/dashboard/')
  }

  @Get('logout')
  logout(@Request() req, @Res() res: Response): void {
    req.logout()
    res.redirect('/auth/login')
  }

  @Get('forgot-password')
  showForgotPassword(@Req() req, @Res() res: Response): void {
    return res.render('./auth/views/forgot-password', { 
      layout: 'dashboard',
      section: 'Forgot your password?',
      csrfToken: req.csrfToken() 
    })
  }

  @Post('forgot-password')
  async initiatePasswordReset(@Body() forWhom: { username: string }, @Res() res: Response): Promise<void> {
    await this.authService.initiatePasswordReset( forWhom.username )
    res.redirect('/auth/forgot-password/wait')
  }

  @Get('forgot-password/wait')
  afterForgotPassword(@Res() res: Response): void {
    res.render('./auth/views/forgot-password-wait', {
      layout: 'dashboard',
      section: 'Check your email',
    })
  }

  @Get('reset-password/:token')
  async verifyPasswordReset(@Req() req, @Res() res: Response, @Param() params: { token: string }): Promise<void> {
    const isTokenOk = await this.authService.isTokenValid(params.token, new Date())
    if (!isTokenOk) {
      res.status(403).render('./auth/views/reset-password-token-ko', {
        section: 'Error resetting password'
      })
      return
    }

    res.render('./auth/views/reset-password', {
      layout: 'dashboard',
      title: 'New password',
      token: params.token,
      csrfToken: req.csrfToken() 
    })
  }

  @Post('reset-password')
  async changePassword(@Res() res: Response, @Body() params: { token: string, password: string }): Promise<void> {
    const isTokenOk = await this.authService.isTokenValid(params.token, new Date())
    if (!isTokenOk) {
      res.status(403).render('./auth/views/reset-password-token-ko', {
        section: 'Error resetting password'
      })
      return
    }
    try {
      await this.authService.completePasswordReset(params.token, params.password)
      return res.redirect('/auth/login')  
    } catch (oops) {
      this.logger.warn(oops)
      res.status(500).render('./auth/views/reset-password-token-ko', {
        section: 'Error resetting password'
      })
    }
  }
}