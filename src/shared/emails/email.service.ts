import { CommentDto } from '../comments/comment.interface'
import { Email } from './email.interface'
import handlebars from 'handlebars'
import { Injectable } from '@nestjs/common'
import { readFileSync } from 'fs'

@Injectable()
export class EmailService {
  passwordResetEmail(link: string): Email {
    const htmlTemplate = handlebars.compile(readFileSync(`${__dirname}/views/password-reset/html.hbs`).toString())
    const textTemplate = handlebars.compile(readFileSync(`${__dirname}/views/password-reset/text.hbs`).toString())
    return {
      subject: 'Reset your password',
      html: htmlTemplate({ link }),
      text: textTemplate({ link }),
    }
  }

  notifyOnSingleComment(comment: CommentDto, link: string): Email {
    const htmlTemplate = handlebars.compile(readFileSync(`${__dirname}/views/comments/single/html.hbs`).toString())
    const textTemplate = handlebars.compile(readFileSync(`${__dirname}/views/comments/single/text.hbs`).toString())
    return {
      subject: 'A new comment came in to your JamComments',
      html: htmlTemplate({ comment, link }),
      text: textTemplate({ comment, link }),
    }
  }
}
