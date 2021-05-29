import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common'
import { Comment } from './comment.interface'
import { CommentService } from './comment.service'
import { Response } from 'express'

@Controller('comments')
export class CommentsController {

  constructor(private readonly commentsService: CommentService) {}

  @Get(':url')
  async commentsForUrl(@Param() params : { url: string }): Promise<Comment[]> {
    return await this.commentsService.commentsForUrl(params.url)
  }

  @Post()
  async postCommentForUrl(@Body() comment: Comment, @Res() res: Response): Promise<void> {
    if (!comment || !comment.text || !comment.author?.name) {
      res.status(400).end();
      return;
    }
    await this.commentsService.create(comment)
    res.status(HttpStatus.CREATED).send() 
  }
}
