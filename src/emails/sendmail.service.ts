import { ConfigService } from "../config/config.service"
import { Injectable } from "@nestjs/common"
import { Logger } from "nestjs-pino"
import mg from 'nodemailer-mailgun-transport'
import nodemailer from 'nodemailer'

@Injectable()
export class SendMailService {
  private nodemailerMailgun

  constructor(private readonly configService: ConfigService,
    private readonly logger: Logger) {
    this.nodemailerMailgun = nodemailer.createTransport(mg(this.configService.mailgunAuth()))
  }

  send(from: string, to: string | string[], subject: string, html?: string, text?: string): void {
    this.nodemailerMailgun.sendMail({
      from,
      to, // An array if you have multiple recipients.
      subject,
      html,
      text  // plain-text version
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