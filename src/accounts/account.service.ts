import { Account } from './account.interface'
import { Client } from 'pg'
import { Inject, Injectable } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'
import { findById, signup } from './accounts.queries'

@Injectable()
export class AccountService {
  constructor(@Inject('PG_CLIENT') private client: Client) {}

  async create(username: string, password: string): Promise<void> {
    await signup.run({ id: uuidv4(), username, password, createdAt: new Date() }, this.client)
  }

  async findById(id: string): Promise<Account | undefined> {
    const accounts = await findById.run({id}, this.client)
    if (accounts.length !== 1) {
      return
    }
    const a = accounts[0]
    return {
      id: a.id,
      username: a.username,
      password: a.password.toString(),
      createdAt: a.created_at
    }
  }

}
