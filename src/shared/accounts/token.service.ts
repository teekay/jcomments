import { Account } from './account.interface'
import { Inject, Injectable } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'
import { Token } from './token.interface'
import {
  TOKEN_REPOSITORY,
  ITokenRepository,
} from '../repositories/token.repository.interface'
import {
  ACCOUNT_REPOSITORY,
  IAccountRepository,
} from '../repositories/account.repository.interface'

@Injectable()
export class TokenService {
  constructor(
    @Inject(TOKEN_REPOSITORY) private tokenRepo: ITokenRepository,
    @Inject(ACCOUNT_REPOSITORY) private accountRepo: IAccountRepository
  ) {}

  async findById(token: string): Promise<Token | undefined> {
    const tokenRecord = await this.tokenRepo.findByToken(token)
    if (!tokenRecord) return undefined

    const accountRecord = await this.accountRepo.findById(tokenRecord.account_id)
    if (!accountRecord) throw new Error('Reference integrity error')

    return {
      account: {
        id: accountRecord.id,
        username: accountRecord.username,
        email: accountRecord.email,
        createdAt: accountRecord.created_at,
      },
      token: tokenRecord.token,
      createdAt: tokenRecord.created_at,
      revokedAt: tokenRecord.revoked_at,
    }
  }

  async create(account: Account): Promise<void> {
    await this.tokenRepo.create(uuidv4(), account.id, uuidv4(), new Date())
  }

  async revoke(token: Token): Promise<void> {
    await this.tokenRepo.revoke(token.token, new Date())
  }
}
