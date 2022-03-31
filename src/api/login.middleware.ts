import _ from 'lodash'
import { Inject, Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { Client } from 'pg'
import { loginFromToken } from './api.queries'
import { Logger } from 'nestjs-pino'

@Injectable()
export class LoginMiddleware implements NestMiddleware {
  constructor(@Inject('PG_CLIENT') private client: Client, private readonly logger: Logger) {}

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const token =
      req.headers['authorization']?.split(': ').pop()?.split(' ').pop() ?? req.body['token'] ?? req.query['token']
    if (!token) {
      res.status(400).end()
      return
    }

    const account = await loginFromToken.run(
      {
        token: token,
      },
      this.client
    )
    if (!account || account.length === 0) {
      this.logger.debug(`Wrong API token supplied`)
      res.status(403).end()
      return
    }

    _.set(req, 'account', account[0])
    next()
  }
}
