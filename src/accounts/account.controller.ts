import _ from 'lodash'
import { Account } from '../accounts/account.interface'
import { AuthenticatedGuard } from '../auth/authenticated.guard'
import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common'
import { Request, Response } from 'express'
import { AccountService } from './account.service'
import { TokenService } from './token.service'

@Controller('account')
export class AccountController {

  constructor(private readonly accountService: AccountService,
    private readonly tokenService: TokenService) {}

  @Get('settings')
  @UseGuards(AuthenticatedGuard)
  async settings(@Req() req: Request, @Res() res: Response) {
    const account = _.get(req, 'user') as Account
    return res.render('./accounts/views/settings', { 
      layout: 'dashboard',
      token: await this.accountService.token(account)
    })
  }

  @Post('settings/token/refresh')
  @UseGuards(AuthenticatedGuard)
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const account = _.get(req, 'user') as Account
    const token = await this.accountService.token(account)
    if (!token) {
      res.status(400).end()
      return
    }
    await this.tokenService.revoke(token)
    await this.tokenService.create(account)
    return res.redirect('/account/settings')
  }
}