import { Client } from 'pg'
import { Inject, Injectable } from '@nestjs/common'
import { IAuthRepository } from '../auth.repository.interface'
import { AccountRecord } from '../account.repository.interface'
import {
  expirePendingTokens,
  createPasswordResetToken,
  isTokenUsable,
  accountFromToken,
} from '../../auth/auth.queries'
import { loginFromToken } from '../../../api/api.queries'

@Injectable()
export class PostgresAuthRepository implements IAuthRepository {
  constructor(@Inject('PG_CLIENT') private client: Client) {}

  async expirePendingTokens(accountId: string, now: Date): Promise<void> {
    await expirePendingTokens.run({ accountId, now }, this.client)
  }

  async createPasswordResetToken(
    id: string,
    accountId: string,
    token: string,
    createdAt: Date,
    expiresAt: Date
  ): Promise<void> {
    await createPasswordResetToken.run(
      { id, accountId, token, createdAt, expiresAt },
      this.client
    )
  }

  async isTokenUsable(token: string, date: Date): Promise<boolean> {
    const t = await isTokenUsable.run({ token, date }, this.client)
    return t.length === 1
  }

  async accountFromToken(token: string): Promise<AccountRecord | undefined> {
    const a = await accountFromToken.run({ token }, this.client)
    if (a.length !== 1) return undefined
    return this.toRecord(a[0])
  }

  async accountFromLoginToken(token: string): Promise<AccountRecord | undefined> {
    const accounts = await loginFromToken.run({ token }, this.client)
    if (accounts.length !== 1) return undefined
    return this.toRecord(accounts[0])
  }

  private toRecord(row: {
    id: string
    username: string
    email: string
    password: Buffer
    created_at: Date
  }): AccountRecord {
    return {
      id: row.id,
      username: row.username,
      email: row.email,
      password: row.password,
      created_at: row.created_at,
    }
  }
}
