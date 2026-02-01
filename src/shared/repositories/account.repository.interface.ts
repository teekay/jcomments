import { EmailSettingsParam, SettingsParam } from '../accounts/settings.param'

/**
 * Database record for an account (before mapping to domain object).
 * Includes password hash for authentication purposes.
 */
export interface AccountRecord {
  id: string
  username: string
  email: string
  password: Buffer | string
  created_at: Date
}

/**
 * Repository interface for account operations.
 * Abstracts database-specific implementation details.
 */
export interface IAccountRepository {
  /**
   * Create a new account with hashed password.
   * Also creates default settings records.
   */
  create(
    id: string,
    username: string,
    email: string,
    passwordHash: string,
    createdAt: Date
  ): Promise<void>

  /**
   * Find account by ID.
   */
  findById(id: string): Promise<AccountRecord | undefined>

  /**
   * Find account by username.
   */
  findByUsername(username: string): Promise<AccountRecord | undefined>

  /**
   * Find account by email.
   */
  findByEmail(email: string): Promise<AccountRecord | undefined>

  /**
   * Find account by username OR email.
   */
  findByUsernameOrEmail(username: string, email: string): Promise<AccountRecord | undefined>

  /**
   * Update account's password hash.
   */
  updatePassword(accountId: string, passwordHash: string): Promise<void>

  /**
   * Update account's email address.
   */
  changeEmail(accountId: string, email: string): Promise<void>

  /**
   * Get account settings.
   */
  getSettings(accountId: string): Promise<SettingsParam | undefined>

  /**
   * Get account email settings.
   */
  getEmailSettings(accountId: string): Promise<EmailSettingsParam | undefined>

  /**
   * Update account settings.
   */
  updateSettings(accountId: string, settings: SettingsParam): Promise<void>

  /**
   * Update account email settings.
   */
  updateEmailSettings(accountId: string, settings: EmailSettingsParam): Promise<void>

  /**
   * Close account and delete all related data.
   */
  closeAccount(accountId: string): Promise<void>
}

export const ACCOUNT_REPOSITORY = 'ACCOUNT_REPOSITORY'
