import { Injectable } from "@nestjs/common"

@Injectable()
export class ConfigService {
  private readonly Mailgun: MailgunConfig
  private readonly isSecure: boolean
  private readonly hostName: string
  private readonly port: number

  constructor() {
    this.Mailgun = {
      apiKey: process.env['MAILGUN_API_KEY'] ?? '',
      domain: process.env['MAILGUN_DOMAIN'] ?? '',
      sender: process.env['MAILGUN_SENDER'] ?? ''
    }

    this.isSecure = (process.env['IS_SECURE'] ?? '').toLowerCase() === 'true'
      ? true
      : false;
    this.hostName = process.env['HOST'] ?? ''
    this.port = +(process.env['WEB_PORT_PUBLIC'] ?? 80)
  }

  validateOrThrow(): void {
    if (this.hostName === '') {
      throw new Error("HOST env var is not set")
    }

    if (this.Mailgun.apiKey === '' || this.Mailgun.domain === '' || this.Mailgun.sender === '') {
      throw new Error("Mailgun env vars MAILGUN_API_KEY, MAILGUN_DOMAIN, MAILGUN_SENDER are not set")
    }
  }

  scheme(): string {
    return this.isSecure ? 'https://' : 'http://'
  }

  hostname(): string {
    return this.hostName
  }

  portIfNot80(): string {
    return this.port === 80 ? '' : `:${this.port}`
  }

  adminUrl(): string {
    return `${this.scheme()}${this.hostname()}${this.portIfNot80()}`
  }

  mailgunAuth(): MailgunAuth {
    return {
      auth: {
        api_key: this.Mailgun.apiKey,
        domain: this.Mailgun.domain
      }
    }
  }

  mailgunSender(): string {
    return this.Mailgun.sender
  }
}

interface MailgunConfig {
  apiKey: string
  domain: string
  sender: string
}

export interface MailgunAuth {
  auth: {
    api_key: string
    domain: string  
  }
}

