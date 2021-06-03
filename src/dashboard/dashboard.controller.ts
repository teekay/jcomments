import _ from 'lodash'
import { Account } from '../accounts/account.interface'
import { AuthenticatedGuard } from '../auth/authenticated.guard'
import { CommentService } from '../comments/comment.service'
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { Request, Response } from 'express'

@Controller('dashboard')
export class DashboardController {

  constructor(private readonly commentService: CommentService) {}

  @Get()
  @UseGuards(AuthenticatedGuard)
  async dashboard(@Req() req: Request, @Res() res: Response) {
    const account = _.get(req, 'user') as Account
    const page = +(req.query['page'] ?? 1)
    const size = +(req.query['size'] ?? 2)
    const count = await this.commentService.commentCountForAccount(account)
    const pages = _.range(1, Math.ceil(count / size) + 1)
    const comments = await this.commentService.commentsForAccountPaged(account, size, page)
    return res.render('./dashboard/views/index', { 
      layout: 'dashboard',
      comments, count, page, pages,
      onFirstPage: page === 1,
      onLastPage: page >= (_.last(pages) ?? 0),
      prevPage: page - 1,
      nextPage: page + 1
    })
  }
}
