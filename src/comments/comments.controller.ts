import _ from 'lodash'
import { Account } from '../accounts/account.interface'
import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res } from '@nestjs/common'
import { CommentBase, CommentDto } from './comment.interface'
import { CommentService } from './comment.service'
import { Request, Response } from 'express'
//import { Logger } from 'nestjs-pino'

@Controller('comments')
export class CommentsController {

  constructor(private readonly commentsService: CommentService) {}

  @Get(':url')
  async commentsForUrl(@Req() req: Request, @Param() params : { url: string }): Promise<CommentBase[]> {
    return await this.commentsService.commentsForUrl(_.get(req, 'account') as Account, params.url)
  }

  @Post()
  async postCommentForUrl(@Req() req: Request, @Body() comment: CommentDto,
    @Res() res: Response): Promise<void> {
    const account = _.get(req, 'account') as Account
    await this.commentsService.create(account, {
      ... comment,
      postedAt: new Date()
    }, req.ip)
    res.status(HttpStatus.CREATED).send() 
  }
}
