//import { Account } from '../accounts/account.interface'
import { Client } from 'pg'
import { Inject, Injectable } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'
import { signup } from './accounts.queries'

@Injectable()
export class AccountService {
  constructor(@Inject('PG_CLIENT') private client: Client) {}

  async create(username: string, password: string): Promise<void> {
    await signup.run({ id: uuidv4(), username, password, createdAt: new Date() }, this.client)
  }
}
