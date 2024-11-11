import _ from 'lodash'
import { Account } from '../shared/accounts/account.interface'
import { AccountService } from '../shared/accounts/account.service'
import { Body, Delete, Controller, Get, HttpStatus, Inject, Post, Req, Res, Param } from '@nestjs/common'
import { CommentDto, CommentWithId } from '../shared/comments/comment.interface'
import { CommentCreatedResult, CommentService, SortOrder } from '../shared/comments/comment.service'
import { ContentFilteringService } from '../shared/comments/content-filtering-service'
import { Logger } from 'nestjs-pino'
import moment from 'moment'
import { Request, Response } from 'express'
import { CommentInFormat } from '../shared/comments/formatted-comment'
import { PgBossQueue } from '../shared/queue/pgboss/pg-boss-queue'

@Controller('comments')
export class CommentsController {
  constructor(
    @Inject(PgBossQueue) private readonly jobQueue: PgBossQueue,
    private readonly accountService: AccountService,
    private readonly commentsService: CommentService,
    private readonly contentFilteringService: ContentFilteringService,
    private readonly logger: Logger
  ) {}

  @Get()
  async comments(@Req() req: Request): Promise<CommentWithId[]> {
    const url = req.query['url']
    if (!url || !_.isString(url)) {
      return this.commentsForAccount(req)
    }

    return await this.commentsForUrl(req, url)
  }

  private async commentsForAccount(req: Request) {
    const allComments = await this.commentsService.commentsForAccount(_.get(req, 'account') as Account, SortOrder.Asc)
    return this.formattedForContentType(allComments, this.formatFromRequest(req))
  }

  private async commentsForUrl(req: Request, url: string): Promise<CommentWithId[]> {
    const since = req.query['since'] as string
    const fromDate = req.query['fromDate'] as string
    const maybeDate = moment(fromDate)
    this.logger.log(`Comments for ${url}`)
    return this.formattedForContentType(
      await this.commentsService.commentsForUrl(_.get(req, 'account') as Account, url, {
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
      req.ip ?? ''
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

    const commentEntity = await this.commentsService.findById(account, result as string)
    if (!commentEntity) {
      this.logger.warn(`Comment ${result} not found - cannot send email notification`)
  
      return
    }

    try {
      const emailSettings = await this.accountService.emailSettingsFor(account)
      if (emailSettings?.notifyOnComments) {
        // notify
        this.logger.log('Scheduling an email notification about a new comment')
        this.jobQueue.publish({ account, comment: commentEntity })
      }
    } catch (oops) {
      this.logger.warn(`Trouble scheduling email notification: ${(oops as Error)?.message}`)
    }
  }

  @Delete(':commentId')
  async deleteComment(@Param('commentId') commentId: string, @Res() res: Response): Promise<void> {
    // TODO add HMAC auth as we'll call this from the CLI
    this.logger.log(`Deleting comment ${commentId}`)
    await this.commentsService.deleteSingleById(commentId)
    res.status(HttpStatus.OK).send()
  }
}
