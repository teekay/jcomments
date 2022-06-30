import _ from 'lodash'
import { Account, AccountEmailDto } from '../shared/accounts/account.interface'
import { AccountParam } from '../shared/accounts/account.param'
import { AccountService } from '../shared/accounts/account.service'
import { AkismetService } from '../shared/comments/akismet.service'
import { AuthenticatedGuard } from '../shared/auth/authenticated.guard'
import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { CommentService, SortOrder } from '../shared/comments/comment.service'
import { EmailSettingsParam, SettingsParam } from '../shared/accounts/settings.param'
import { FileInterceptor } from '@nestjs/platform-express'
import { Logger } from 'nestjs-pino'
import moment from 'moment'
import PgBoss from 'pg-boss'
import { Request, Response } from 'express'
import { SessionExpiredFilter } from '../shared/auth/auth.exception'
import { TokenService } from '../shared/accounts/token.service'

@Controller('account')
@UseFilters(new SessionExpiredFilter())
export class AccountController {
  constructor(
    @Inject('PG_BOSS') private readonly jobQueue: PgBoss,
    private readonly accountService: AccountService,
    private readonly tokenService: TokenService,
    private readonly akismetService: AkismetService,
    private readonly commentService: CommentService,
    private readonly logger: Logger
  ) {}

  @Get('signup')
  signup(@Req() req, @Res() res: Response): void {
    if (req.isAuthenticated()) {
      return res.redirect('/dashboard/')
    }
    return res.render('../shared/accounts/views/signup', {
      layout: 'dashboard',
      section: 'Sign up',
      csrfToken: req.csrfToken(),
    })
  }

  @Post('signup')
  async doSignup(@Req() req: Request, @Res() res: Response, @Body() accountParam: AccountParam): Promise<void> {
    if (req.isAuthenticated()) {
      return res.redirect('/dashboard/')
    }
    try {
      const { username, email, password } = accountParam
      await this.accountService.create(username, email, password)
      const account = await this.accountService.login(username, password)
      if (!account) throw new Error('Could not fetch the account')
      await this.tokenService.create(account)
      req.logIn(account as Express.User, function () {
        res.redirect('/dashboard/')
      })
    } catch (e) {
      this.logger.error(e)
      res.status(500).render('../shared/accounts/views/signup-error')
    }
  }

  @Get('settings')
  @UseGuards(AuthenticatedGuard)
  async settings(@Req() req, @Res() res: Response): Promise<void> {
    const account = _.get(req, 'user') as Account
    const settings = await this.accountService.settingsFor(account)
    const emailSettings = await this.accountService.emailSettingsFor(account)
    return res.render('../shared/accounts/views/settings', {
      layout: 'dashboard',
      section: 'Settings',
      csrfToken: req.csrfToken(),
      token: await this.accountService.token(account),
      account,
      changeEmailError: req.flash('change-email-error'),
      ...settings,
      ...emailSettings,
    })
  }

  @Post('settings')
  @UseGuards(AuthenticatedGuard)
  async updateSettings(@Req() req: Request, @Res() res: Response, @Body() settingsParam: SettingsParam): Promise<void> {
    const account = _.get(req, 'user') as Account
    this.logger.debug('Payload: %s', 'AccountController::updateSettings', JSON.stringify(settingsParam))
    await this.accountService.updateSettings(account, settingsParam)
    return res.redirect('/account/settings')
  }

  @Post('email/change')
  @UseGuards(AuthenticatedGuard)
  async changeEmail(@Req() req, @Res() res: Response, @Body() form: AccountEmailDto): Promise<void> {
    const account = _.get(req, 'user') as Account

    try {
      await this.accountService.changeEmail(account, form.email)
      const accountWithNewEmail = await this.accountService.findById(account.id)
      req.logIn(accountWithNewEmail as Express.User, function () {
        res.redirect('/account/settings')
      })
      return
    } catch (oops) {
      req.flash('change-email-error', 'This email already belongs to someone else. Please choose another')
    }
    return res.redirect('/account/settings')
  }

  @Post('email/settings')
  @UseGuards(AuthenticatedGuard)
  async updateEmailSettings(
    @Req() req: Request,
    @Res() res: Response,
    @Body() settingsParam: EmailSettingsParam
  ): Promise<void> {
    const account = _.get(req, 'user') as Account
    await this.accountService.updateEmailSettings(account, settingsParam)
    return res.redirect('/account/settings')
  }

  @Post('settings/token/refresh')
  @UseGuards(AuthenticatedGuard)
  async refreshToken(@Req() req: Request, @Res() res: Response): Promise<Response> {
    const account = _.get(req, 'user') as Account
    const token = await this.accountService.token(account)
    if (!token) {
      this.logger.error('No token found, none revoked')
      return res.status(400).json({ error: 'Could not reissue API token' })
    }

    await this.tokenService.revoke(token)
    await this.tokenService.create(account)
    return res.status(201).json({
      token: (await this.accountService.token(account))?.token,
    })
  }

  @Post('settings/akismet/verify')
  @UseGuards(AuthenticatedGuard)
  async checkAkismetKey(@Req() req: Request, @Res() res: Response): Promise<void> {
    const account = _.get(req, 'user') as Account
    const settings = await this.accountService.settingsFor(account)
    if (!settings) {
      res.status(400).end()
      return
    }
    const isKeyAnyGood = await this.akismetService.verifyKey(settings)
    const returnCode = _.isUndefined(isKeyAnyGood) ? 503 : isKeyAnyGood ? 200 : 403
    res.status(returnCode).end()
  }

  @Post('import')
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(FileInterceptor('importjson'))
  async import(@Req() req, @Res() res: Response, @UploadedFile() file): Promise<void> {
    const account = _.get(req, 'user') as Account
    try {
      const json = JSON.parse(file.buffer.toString())
      await this.commentService.import(account, json)
    } catch (parseError) {
      this.logger.warn(parseError)
      req.flash('import-error', 'There was an error parsing the JSON')
    }
    return res.redirect('/dashboard')
  }

  @Get('export')
  @UseGuards(AuthenticatedGuard)
  async export(@Req() req, @Res() res: Response): Promise<Response> {
    const account = _.get(req, 'user') as Account
    const allComments = await this.commentService.commentsForAccount(account, SortOrder.Asc)
    res.setHeader('Content-Type', 'application/json')
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${moment().format('YYYY-MM-DD-HH-ss')}_${account.username}_comments.json`
    )
    return res.json(
      allComments.map((c) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...rest } = c
        return rest
      })
    )
  }

  @Post('close')
  @UseGuards(AuthenticatedGuard)
  async close(@Req() req, @Res() res: Response): Promise<void> {
    // TODO delete in a queue
    const account = _.get(req, 'user') as Account
    this.jobQueue.publish('notify-on-account-closing', { accountId: account.id })
    res.redirect('/auth/logout')
  }
}
