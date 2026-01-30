import { Client } from 'pg'
import { Inject, Injectable } from '@nestjs/common'
import { ITokenRepository, TokenRecord } from '../token.repository.interface'
import {
  createToken,
  findToken,
  findCurrentToken,
  findAllValidTokens,
  revokeToken,
  deleteTokens,
} from '../../accounts/accounts.queries'

@Injectable()
export class PostgresTokenRepository implements ITokenRepository {
  constructor(@Inject('PG_CLIENT') private client: Client) {}

  async create(id: string, accountId: string, token: string, createdAt: Date): Promise<void> {
    await createToken.run({ id, accountId, token, createdAt }, this.client)
  }

  async findByToken(token: string): Promise<TokenRecord | undefined> {
    const tokens = await findToken.run({ token }, this.client)
    if (tokens.length === 0) return undefined
    return this.toRecord(tokens[0])
  }

  async findCurrentToken(accountId: string): Promise<TokenRecord | undefined> {
    const tokens = await findCurrentToken.run({ accountId }, this.client)
    if (tokens.length === 0) return undefined
    return this.toRecord(tokens[0])
  }

  async findAllValidTokens(accountId: string): Promise<TokenRecord[]> {
    const tokens = await findAllValidTokens.run({ accountId }, this.client)
    return tokens.map(this.toRecord)
  }

  async revoke(token: string, revokedAt: Date): Promise<void> {
    await revokeToken.run({ token, revokedAt }, this.client)
  }

  async deleteForAccount(accountId: string): Promise<void> {
    await deleteTokens.run({ accountId }, this.client)
  }

  private toRecord(row: {
    id: string
    account_id: string
    token: string
    created_at: Date
    revoked_at: Date | null
  }): TokenRecord {
    return {
      id: row.id,
      account_id: row.account_id,
      token: row.token,
      created_at: row.created_at,
      revoked_at: row.revoked_at,
    }
  }
}
