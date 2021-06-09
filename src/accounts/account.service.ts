import { Account } from './account.interface'
import { accountSettings, findById, findByUsername, findCurrentToken, findUserByEmailOrUsername, IFindByIdResult, initialAccountSettings, login, signup, updateSettings } from './accounts.queries'
import { Client } from 'pg'
import { Inject, Injectable } from '@nestjs/common'
import { SettingsParam } from './settings.param'
import { Token } from './token.interface'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class AccountService {
  constructor(@Inject('PG_CLIENT') private client: Client) {}

  async create(username: string, email: string, password: string): Promise<void> {
    const existing = await this.findByUsername(username)
    if (existing) {
      throw new Error(`${username} already exists`)
    }
    const accountId = uuidv4()
    await signup.run({ id: accountId, username, email, password, createdAt: new Date() }, this.client)
    await initialAccountSettings.run({id: uuidv4(), accountId}, this.client)
  }

  async login(username: string, password: string): Promise<Account | undefined> {
    const a = await login.run({ username, password }, this.client)
    return a.length === 1 
      ? {
        id: a[0].id,
        username: a[0].username,
        email: a[0].email,
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
    return this.recordToAccount(accounts[0])
    
  }

  async findByUsername(username: string): Promise<Account | undefined> {
    const accounts = await findByUsername.run({username}, this.client)
    if (accounts.length === 0) return;
    return this.recordToAccount(accounts[0])
  }

  async findByUsernameOrEmail(usernameOrEmail: string): Promise<Account | undefined> {
    const accounts = await findUserByEmailOrUsername.run({username: usernameOrEmail}, this.client)
    if (accounts.length !== 1) return;
    return this.recordToAccount(accounts[0])
  }

  async token(account: Account): Promise<Token | undefined> {
    const t = await findCurrentToken.run({ accountId: account.id }, this.client)
    if (t.length === 0) return;
    
    const { created_at, ...base } = t[0]
    const token = {
      account,
      createdAt: created_at,
      ... base
    }
    return token
  }

  async settingsFor(account: Account): Promise<SettingsParam | undefined> {
    const s = await accountSettings.run({accountId: account.id}, this.client)
    if (s.length === 0) return
    return {
      useAkismet: s[0].use_akismet ?? false,
      akismetKey: s[0].akismet_key ?? '',
      blogUrl: s[0].blog_url ?? ''
    }
  }

  async updateSettings(account: Account, settings: SettingsParam): Promise<void> {
    await updateSettings.run({accountId: account.id, ...settings}, this.client)
  }

  private recordToAccount(a: IFindByIdResult): Account {
    return {
      id: a.id,
      username: a.username,
      email: a.email,
      password: a.password.toString(),
      createdAt: a.created_at
    }
  }
}
