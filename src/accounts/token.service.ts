import { Account } from './account.interface'
import { Client } from 'pg'
import { Inject, Injectable } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'
import { createToken, findById, findToken, revokeToken } from './accounts.queries'
import { Token } from './token.interface'

@Injectable()
export class TokenService {
  constructor(@Inject('PG_CLIENT') private client: Client) {}

  async findById(token: string): Promise<Token | undefined> {
    const tokens = await findToken.run({ token }, this.client)
    if (tokens.length !== 1) return;
    const t = tokens[0]
    const accounts = await findById.run({ id: t.account_id }, this.client)
    if (accounts.length !== 1) throw new Error("Reference integrity error")
    const a = accounts[0]
    return {
      account: {
        id: a.id,
        username: a.username,
        email: a.email,
        password: a.password.toString(),
        createdAt: a.created_at
      },
      token: t.token,
      createdAt: t.created_at,
      revokedAt: t.revoked_at
    }
  }

  async create(account: Account): Promise<void> {
    await createToken.run({ id: uuidv4(), accountId: account.id, token: uuidv4(), createdAt: new Date() }, this.client)
  }

  async revoke(token: Token): Promise<void> {
    await revokeToken.run({ token: token.token, revokedAt: new Date() }, this.client)
  }

}
