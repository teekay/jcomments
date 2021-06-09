import _ from 'lodash'
import { Account } from '../accounts/account.interface'
import { AccountParam } from './account.param'
import { AccountService } from './account.service'
import { AkismetService } from '../comments/akismet.service'
import { AuthenticatedGuard } from '../auth/authenticated.guard'
import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common'
import { Logger } from 'nestjs-pino'
import { Request, Response } from 'express'
import { SettingsParam } from './settings.param'
import { TokenService } from './token.service'

@Controller('account')
export class AccountController {

  constructor(private readonly accountService: AccountService,
    private readonly tokenService: TokenService,
    private readonly akismetService: AkismetService,
    private readonly logger: Logger) {}

  @Get('signup')
  signup(@Req() req, @Res() res: Response) {
    if (req.isAuthenticated()) {
      return res.redirect('/dashboard/');
    }
    return res.render('./accounts/views/signup', { 
      layout: 'dashboard',
      csrfToken: req.csrfToken() 
    })
  }

  @Post('signup')
  async doSignup(@Req() req: Request, @Res() res: Response, @Body() accountParam: AccountParam) {
    if (req.isAuthenticated()) {
      return res.redirect('/dashboard/');
    }
    try {
      const {username, password} = accountParam
      await this.accountService.create(username, password)
      const account = await this.accountService.login(username, password)
      if (!account) throw new Error('Could not fetch the account')
      await this.tokenService.create(account)
      req.logIn(account as Express.User, function(err) {
        if (err) {
          res.redirect('/auth/login') // TODO error page
          return
        }
        res.redirect('/dashboard/')
      })
    } catch (e) {
      res.render('./accounts/views/signup-error')
      //res.status(500).end() // TODO error page
    }
  }

  @Get('settings')
  @UseGuards(AuthenticatedGuard)
  async settings(@Req() req, @Res() res: Response) {
    const account = _.get(req, 'user') as Account
    const settings = await this.accountService.settingsFor(account)
    return res.render('./accounts/views/settings', { 
      layout: 'dashboard',
      section: 'Settings',
      csrfToken: req.csrfToken(),
      token: await this.accountService.token(account),
      ...settings
    })
  }

  @Post('settings')
  @UseGuards(AuthenticatedGuard)
  async updateSettings(@Req() req: Request, @Res() res: Response, @Body() settingsParam: SettingsParam) {
    const account = _.get(req, 'user') as Account
    await this.accountService.updateSettings(account, settingsParam)
    return res.redirect('/account/settings')
  }

  @Post('settings/token/refresh')
  @UseGuards(AuthenticatedGuard)
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const account = _.get(req, 'user') as Account
    const token = await this.accountService.token(account)
    if (!token) {
      this.logger.error('No token created')
      res.status(400).end()
      return
    }
    await this.tokenService.revoke(token)
    await this.tokenService.create(account)
    return res.redirect('/account/settings')
  }

  @Post('settings/akismet/verify')
  @UseGuards(AuthenticatedGuard)
  async checkAkismetKey(@Req() req: Request, @Res() res: Response) {
    const account = _.get(req, 'user') as Account
    const settings = await this.accountService.settingsFor(account)
    if (!settings) {
      res.status(400).end()
      return
    }
    const isKeyAnyGood = await this.akismetService.verifyKey(settings)
    const returnCode = _.isUndefined(isKeyAnyGood) ?
      (503) :
      isKeyAnyGood ?
        (200) :
        (403)
    res.status(returnCode).end()
  }
}