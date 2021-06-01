import { Account } from './account.interface'
import { Client } from 'pg'
import { Inject, Injectable } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'
import { findById, login, signup } from './accounts.queries'

@Injectable()
export class AccountService {
  constructor(@Inject('PG_CLIENT') private client: Client) {}

  async create(username: string, password: string): Promise<void> {
    await signup.run({ id: uuidv4(), username, password, createdAt: new Date() }, this.client)
  }

  async login(username: string, password: string): Promise<Account | undefined> {
    const a = await login.run({ username, password }, this.client)
    return a.length === 1 
      ? {
        id: a[0].id,
        username: a[0].username,
        password: a[0].password.toString(),
        createdAt: a[0].created_at
      }
      : undefined
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
