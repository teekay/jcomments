import _ from 'lodash'
import { Account } from '../../shared/accounts/account.interface'
import { AuthenticatedGuard } from '../../shared/auth/authenticated.guard'
import { Body, Controller, Get, Post, Req, Res, UseFilters, UseGuards } from '@nestjs/common'
import { CommentService } from '../../shared/comments/comment.service'
import { Identifiable } from './identifiable.param'
import { Logger } from "nestjs-pino";
import moment from 'moment'
import { Request, Response } from 'express'
import { SessionExpiredFilter } from '../../shared/auth/auth.exception'

@Controller('dashboard')
@UseFilters(new SessionExpiredFilter())
export class DashboardController {

  constructor(private readonly commentService: CommentService,
    private readonly logger: Logger) {}

  @Get()
  @UseGuards(AuthenticatedGuard)
  async dashboard(@Req() req, @Res() res: Response): Promise<void> {
    const account = _.get(req, 'user') as Account
    const page = +(req.query['page'] ?? 1)
    const size = +(req.query['size'] ?? 10)
    const commentCount = await this.commentService.commentCountForAccount(account)
    const reviewCount = await this.commentService.reviewCountForAccount(account)
    const pages = _.range(1, Math.ceil(commentCount / size) + 1)
    const comments = (await this.commentService.commentsForAccountPaged(account, size, page)).map(c => {
      return {
        ...c,
        relativePostedAt: moment(c.postedAt).fromNow()
      }
    })
    return res.render('./dashboard/views/index', { 
      layout: 'dashboard',
      csrfToken: req.csrfToken(),
      section: 'Dashboard',
      comments, commentCount, reviewCount, page, pages,
      importError: req.flash('import-error'),
      onFirstPage: page === 1,
      onLastPage: page >= (_.last(pages) ?? 0),
      prevPage: page - 1,
      nextPage: page + 1
    })
  }

  @Get('review')
  @UseGuards(AuthenticatedGuard)
  async review(@Req() req, @Res() res: Response): Promise<void> {
    const account = _.get(req, 'user') as Account
    const page = +(req.query['page'] ?? 1)
    const size = +(req.query['size'] ?? 10)
    const commentCount = await this.commentService.commentCountForAccount(account)
    const reviewCount = await this.commentService.reviewCountForAccount(account)
    const pages = _.range(1, Math.ceil(reviewCount / size) + 1)
    const comments = (await this.commentService.reviewsForAccountPaged(account, size, page)).map(c => {
      return {
        ...c,
        relativePostedAt: moment(c.postedAt).fromNow()
      }
    })
    return res.render('./dashboard/views/review', { 
      layout: 'dashboard',
      csrfToken: req.csrfToken(),
      section: 'Dashboard',
      comments, commentCount, reviewCount, page, pages,
      onFirstPage: page === 1,
      onLastPage: page >= (_.last(pages) ?? 0),
      prevPage: page - 1,
      nextPage: page + 1
    })
  }

  @Post('comment/delete')
  @UseGuards(AuthenticatedGuard)
  async deleteSingleComment(@Req() req: Request, @Res() res: Response,
    @Body() id: Identifiable): Promise<void> {
    const account = _.get(req, 'user') as Account
    const comment = await this.commentService.findById(account, id.id)
    if (!comment) {
      // this includes situations when the comment would belong to a different account
      return res.status(404).end()
    }
    await this.commentService.deleteSingle(comment)
    return res.status(201).end()
  }
  
  @Post('spam/delete')
  @UseGuards(AuthenticatedGuard)
  async deleteSpamComment(@Req() req: Request, @Res() res: Response,
    @Body() id: Identifiable): Promise<void> {
    const account = _.get(req, 'user') as Account
    const comment = await this.commentService.findSpamById(account, id.id)
    if (!comment) {
      // this includes situations when the comment would belong to a different account
      this.logger.warn(`Comment ${id.id} not found for account ${account.id}`)
      return res.status(404).end()
    }
    await this.commentService.deleteSingleSpam(comment)
    return res.status(201).end()
  }
  
  @Post('spam/unmark')
  @UseGuards(AuthenticatedGuard)
  async notSpam(@Req() req: Request, @Res() res: Response,
    @Body() id: Identifiable): Promise<void> {
    const account = _.get(req, 'user') as Account
    const comment = await this.commentService.findSpamById(account, id.id)
    if (!comment) {
      // this includes situations when the comment would belong to a different account
      return res.status(404).end()
    }
    await this.commentService.markCommentNotSpam(comment)
    return res.status(201).end()
  }
  
}
