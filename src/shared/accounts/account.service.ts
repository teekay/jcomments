import { Account } from './account.interface'
import { Inject, Injectable } from '@nestjs/common'
import { EmailSettingsParam, SettingsParam } from './settings.param'
import { Token } from './token.interface'
import { v4 as uuidv4 } from 'uuid'
import {
  ACCOUNT_REPOSITORY,
  IAccountRepository,
  AccountRecord,
} from '../repositories/account.repository.interface'
import {
  TOKEN_REPOSITORY,
  ITokenRepository,
} from '../repositories/token.repository.interface'
import { PasswordService } from '../crypto/password.service'

@Injectable()
export class AccountService {
  constructor(
    @Inject(ACCOUNT_REPOSITORY) private accountRepo: IAccountRepository,
    @Inject(TOKEN_REPOSITORY) private tokenRepo: ITokenRepository,
    private passwordService: PasswordService
  ) {}

  async create(username: string, email: string, password: string): Promise<void> {
    const existing = await this.findByUsernameOrEmail(username)
    if (existing) {
      throw new Error(`${username} or email already exist`)
    }
    const accountId = uuidv4()
    const passwordHash = await this.passwordService.hash(password)
    await this.accountRepo.create(accountId, username, email, passwordHash, new Date())
  }

  async login(username: string, password: string): Promise<Account | undefined> {
    const record = await this.accountRepo.findByUsername(username)
    if (!record) return undefined

    // Check if this is a bcrypt hash or legacy SHA256
    const isBcrypt = this.passwordService.isBcryptHash(record.password)

    let passwordValid: boolean
    if (isBcrypt) {
      const hashStr = Buffer.isBuffer(record.password)
        ? record.password.toString('utf8')
        : record.password
      passwordValid = await this.passwordService.verify(password, hashStr)
    } else {
      // Legacy SHA256 hash (stored as bytea/Buffer in Postgres)
      const hashBuffer = Buffer.isBuffer(record.password)
        ? record.password
        : Buffer.from(record.password, 'hex')
      passwordValid = this.passwordService.verifyLegacySha256(password, hashBuffer)

      // Auto-migrate to bcrypt on successful login
      if (passwordValid) {
        const newHash = await this.passwordService.hash(password)
        await this.accountRepo.updatePassword(record.id, newHash)
      }
    }

    if (!passwordValid) return undefined

    return this.recordToAccount(record)
  }

  async findById(id: string): Promise<Account | undefined> {
    const record = await this.accountRepo.findById(id)
    if (!record) return undefined
    return this.recordToAccount(record)
  }

  async findByUsername(username: string): Promise<Account | undefined> {
    const record = await this.accountRepo.findByUsername(username)
    if (!record) return undefined
    return this.recordToAccount(record)
  }

  async findByUsernameOrEmail(usernameOrEmail: string): Promise<Account | undefined> {
    const record = await this.accountRepo.findByUsernameOrEmail(
      usernameOrEmail.trim(),
      usernameOrEmail.toLowerCase().trim()
    )
    if (!record) return undefined
    return this.recordToAccount(record)
  }

  async lastToken(account: Account): Promise<Token | undefined> {
    const record = await this.tokenRepo.findCurrentToken(account.id)
    if (!record) return undefined

    return {
      account,
      token: record.token,
      createdAt: record.created_at,
      revokedAt: record.revoked_at,
    }
  }

  async settingsFor(account: Account): Promise<SettingsParam | undefined> {
    return this.accountRepo.getSettings(account.id)
  }

  async emailSettingsFor(account: Account): Promise<EmailSettingsParam | undefined> {
    return this.accountRepo.getEmailSettings(account.id)
  }

  async updateSettings(account: Account, settings: SettingsParam): Promise<void> {
    await this.accountRepo.updateSettings(account.id, settings)
  }

  async updateEmailSettings(account: Account, settings: EmailSettingsParam): Promise<void> {
    await this.accountRepo.updateEmailSettings(account.id, settings)
  }

  async changeEmail(account: Account, emailParam: string): Promise<void> {
    const email = emailParam.toLowerCase().trim()
    const existing = await this.accountRepo.findByEmail(email)
    if (existing) {
      throw new Error('Email already exists')
    }
    await this.accountRepo.changeEmail(account.id, email)
  }

  async closeAccount(account: Account): Promise<void> {
    await this.accountRepo.closeAccount(account.id)
  }

  private recordToAccount(record: AccountRecord): Account {
    return {
      id: record.id,
      username: record.username,
      email: record.email,
      createdAt: record.created_at,
    }
  }
}
