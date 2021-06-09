import { Injectable } from "@nestjs/common"
import { Logger } from "nestjs-pino"
import nodemailer from 'nodemailer'
import mg from 'nodemailer-mailgun-transport'

@Injectable()
export class SendMailService {
  private apiKey: string
  private domain: string
  private nodemailerMailgun

  constructor(private readonly logger: Logger) {
    // TODO externalize the config to something like 'ConfigService' or whatever
    this.apiKey = process.env['MAILGUN_API_KEY'] ?? ''
    this.domain = process.env['MAILGUN_DOMAIN'] ?? ''
    this.nodemailerMailgun = nodemailer.createTransport(mg({
      auth: {
        api_key: this.apiKey,
        domain: this.domain
      }
    }))
  }

  send(from: string, to: string | string[], subject: string, html?: string, text?: string): void {
    this.nodemailerMailgun.sendMail({
      from,
      to, // An array if you have multiple recipients.
      subject,
      html,
      //You can use "text:" to send plain-text content. It's oldschool!
      text
    }, (err, info) => {
      if (err) {
        this.logger.warn(`Error: ${err}`)
      }
      else {
        this.logger.debug(`Response: ${JSON.stringify(info)}`)
      }
    });
  }

}