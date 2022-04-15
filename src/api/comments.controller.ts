import _ from 'lodash'
import { Account } from '../shared/accounts/account.interface'
import { AccountService } from '../shared/accounts/account.service'
import { Body, Controller, Get, HttpStatus, Inject, Param, Post, Req, Res } from '@nestjs/common'
import { CommentDto, CommentWithId } from '../shared/comments/comment.interface'
import { CommentCreatedResult, CommentService, SortOrder } from '../shared/comments/comment.service'
import { ContentFilteringService } from '../shared/comments/content-filtering-service'
import { Logger } from 'nestjs-pino'
import moment from 'moment'
import { Request, Response } from 'express'
import { CommentInFormat } from '../shared/comments/formatted-comment'
import { Queue } from '../shared/queue/queue.interface'

@Controller('comments')
export class CommentsController {
  constructor(
    @Inject(Queue) private readonly jobQueue: Queue,
    private readonly accountService: AccountService,
    private readonly commentsService: CommentService,
    private readonly contentFilteringService: ContentFilteringService,
    private readonly logger: Logger,
  ) {}

  @Get()
  async comments(@Req() req: Request): Promise<CommentWithId[]> {
    const allComments = await this.commentsService.commentsForAccount(_.get(req, 'account') as Account, SortOrder.Asc)
    return this.formattedForContentType(allComments, this.formatFromRequest(req))
  }

  @Get(':url')
  async commentsForUrl(@Req() req: Request, @Param() params: { url: string }): Promise<CommentWithId[]> {
    const since = req.query['since'] as string
    const fromDate = req.query['fromDate'] as string
    const maybeDate = moment(fromDate)
    return this.formattedForContentType(
      await this.commentsService.commentsForUrl(_.get(req, 'account') as Account, params.url, {
        afterId: since,
        fromDate: fromDate && maybeDate.isValid() ? maybeDate.toDate() : undefined,
      }),
      this.formatFromRequest(req)
    )
  }

  private formatFromRequest(req: Request): string {
    return (req.query['format'] ?? '').toString().toLowerCase()
  }

  private formattedForContentType(comments: CommentWithId[], format?: string): CommentWithId[] {
    return comments.map((c) => new CommentInFormat(c, this.contentFilteringService).toFormat(format)) as CommentWithId[]
  }

  @Post()
  async postCommentForUrl(@Req() req: Request, @Body() comment: CommentDto, @Res() res: Response): Promise<void> {
    const account = _.get(req, 'account') as Account
    const result = await this.commentsService.create(
      account,
      {
        ...comment,
        postedAt: moment().utc().toDate(),
      },
      req.ip
    )

    if (req.headers['content-type'] !== 'application/json') {
      // assuming the request comes from the web page -> redirect back
      res.redirect(comment.postUrl)
    } else {
      res.status(HttpStatus.CREATED).send()
    }

    if (result === CommentCreatedResult.Flagged) {
      // no email notification for spam
      return
    }

    try {
      const emailSettings = await this.accountService.emailSettingsFor(account)
      if (emailSettings?.notifyOnComments) {
        // notify
        this.logger.debug('Scheduling an email notification about a new comment')
        this.jobQueue.publish({ account, comment })
      }
    } catch (oops) {
      this.logger.warn(`Trouble scheduling email notification: ${(oops as Error)?.message}`)
    }
  }
}
