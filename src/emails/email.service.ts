import { readFileSync } from 'fs'
import handlebars from 'handlebars'
import { Injectable } from "@nestjs/common";

@Injectable()
export class EmailService {
  passwordResetEmail(link: string): Email {
    const htmlTemplate = handlebars.compile(readFileSync(`${__dirname}/views/password-reset/html.hbs`).toString())
    const textTemplate = handlebars.compile(readFileSync(`${__dirname}/views/password-reset/text.hbs`).toString())
    return {
      subject: 'Reset your password',
      html: htmlTemplate({ link }), text: textTemplate({ link })
    }
  }
}

export class Email {
  subject!: string
  html?: string
  text?: string
}