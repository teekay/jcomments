import _ from 'lodash'
import { Account } from '../accounts/account.interface'
import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res } from '@nestjs/common'
import { Comment, CommentBase } from './comment.interface'
import { CommentService } from './comment.service'
import { Request, Response } from 'express'

@Controller('comments')
export class CommentsController {

  constructor(private readonly commentsService: CommentService) {}

  @Get(':url')
  async commentsForUrl(@Req() req: Request, @Param() params : { url: string }): Promise<CommentBase[]> {
    return await this.commentsService.commentsForUrl(_.get(req, 'account') as Account, params.url)
  }

  @Post()
  async postCommentForUrl(@Req() req: Request, @Body() comment: Comment, @Res() res: Response): Promise<void> {
    if (!comment || !comment.text || !comment.author?.name) {
      res.status(400).end();
      return;
    }
    await this.commentsService.create(_.get(req, 'account') as Account, comment)
    res.status(HttpStatus.CREATED).send() 
  }
}
