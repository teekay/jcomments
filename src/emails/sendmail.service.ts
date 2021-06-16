import { ConfigService } from "../config/config.service"
import { Injectable } from "@nestjs/common"
import { Logger } from "nestjs-pino"
import mg from 'nodemailer-mailgun-transport'
import nodemailer from 'nodemailer'

@Injectable()
export class SendMailService {
  private nodemailerMailgun: nodemailer.Transporter

  constructor(private readonly configService: ConfigService,
    private readonly logger: Logger) {
    this.nodemailerMailgun = nodemailer.createTransport(mg(this.configService.mailgunAuth()))
  }

  async send(from: string, to: string | string[], subject: string, html?: string, text?: string): Promise<void> {
    try {
      const info = await this.nodemailerMailgun.sendMail({
        from,
        to, // An array if you have multiple recipients.
        subject,
        html,
        text  // plain-text version
      });
      this.logger.debug(`Mailgun response: ${JSON.stringify(info)}`)  
    } catch (err) {
      this.logger.warn(`Mailgun error: ${err}`)
    }
  }

}