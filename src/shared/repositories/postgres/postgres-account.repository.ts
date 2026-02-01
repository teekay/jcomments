import { Client } from 'pg'
import { Inject, Injectable } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'
import {
  IAccountRepository,
  AccountRecord,
} from '../account.repository.interface'
import { EmailSettingsParam, SettingsParam } from '../../accounts/settings.param'
import {
  signup,
  findById,
  findByUsername,
  findByEmail,
  findUserByEmailOrUsername,
  changeAccountEmail,
  accountSettings,
  accountEmailSettings,
  updateSettings,
  updateEmailSettings,
  deleteSettings,
  deleteEmailSettings,
  deleteTokens,
  closeAccount,
  initialAccountSettings,
  initialAccountEmailSettings,
} from '../../accounts/accounts.queries'
import { changePassword } from '../../auth/auth.queries'

@Injectable()
export class PostgresAccountRepository implements IAccountRepository {
  constructor(@Inject('PG_CLIENT') private client: Client) {}

  async create(
    id: string,
    username: string,
    email: string,
    passwordHash: string,
    createdAt: Date
  ): Promise<void> {
    await signup.run({ id, username, email, passwordHash, createdAt }, this.client)
    await initialAccountSettings.run({ id: uuidv4(), accountId: id }, this.client)
    await initialAccountEmailSettings.run({ id: uuidv4(), accountId: id }, this.client)
  }

  async findById(id: string): Promise<AccountRecord | undefined> {
    const accounts = await findById.run({ id }, this.client)
    if (accounts.length !== 1) return undefined
    return this.toRecord(accounts[0])
  }

  async findByUsername(username: string): Promise<AccountRecord | undefined> {
    const accounts = await findByUsername.run({ username }, this.client)
    if (accounts.length === 0) return undefined
    return this.toRecord(accounts[0])
  }

  async findByEmail(email: string): Promise<AccountRecord | undefined> {
    const accounts = await findByEmail.run({ email }, this.client)
    if (accounts.length === 0) return undefined
    return this.toRecord(accounts[0])
  }

  async findByUsernameOrEmail(username: string, email: string): Promise<AccountRecord | undefined> {
    const accounts = await findUserByEmailOrUsername.run({ username, email }, this.client)
    if (accounts.length !== 1) return undefined
    return this.toRecord(accounts[0])
  }

  async updatePassword(accountId: string, passwordHash: string): Promise<void> {
    await changePassword.run({ accountId, passwordHash }, this.client)
  }

  async changeEmail(accountId: string, email: string): Promise<void> {
    await changeAccountEmail.run({ accountId, email }, this.client)
  }

  async getSettings(accountId: string): Promise<SettingsParam | undefined> {
    const s = await accountSettings.run({ accountId }, this.client)
    if (s.length === 0) return undefined
    return {
      requireModeration: s[0].require_moderation ?? false,
      useAkismet: s[0].use_akismet ?? false,
      akismetKey: s[0].akismet_key ?? '',
      blogUrl: s[0].blog_url ?? '',
      useLlmCheck: s[0].use_llm_check ?? false,
      llmApiKey: s[0].llm_api_key ?? '',
      llmConfidenceThreshold: parseFloat(s[0].llm_confidence_threshold ?? '0.8'),
    }
  }

  async getEmailSettings(accountId: string): Promise<EmailSettingsParam | undefined> {
    const s = await accountEmailSettings.run({ accountId }, this.client)
    if (s.length === 0) return undefined
    return {
      notifyOnComments: s[0].notify_on_comments ?? false,
      sendCommentsDigest: s[0].send_comments_digest ?? false,
    }
  }

  async updateSettings(accountId: string, settings: SettingsParam): Promise<void> {
    await updateSettings.run(
      {
        accountId,
        requireModeration: settings.requireModeration ?? false,
        useAkismet: settings.useAkismet ?? false,
        akismetKey: settings.akismetKey,
        blogUrl: settings.blogUrl,
        useLlmCheck: settings.useLlmCheck ?? false,
        llmApiKey: settings.llmApiKey,
        llmConfidenceThreshold: settings.llmConfidenceThreshold ?? 0.8,
      },
      this.client
    )
  }

  async updateEmailSettings(accountId: string, settings: EmailSettingsParam): Promise<void> {
    await updateEmailSettings.run({ accountId, ...settings }, this.client)
  }

  async closeAccount(accountId: string): Promise<void> {
    await deleteSettings.run({ accountId }, this.client)
    await deleteEmailSettings.run({ accountId }, this.client)
    await deleteTokens.run({ accountId }, this.client)
    await closeAccount.run({ accountId }, this.client)
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
