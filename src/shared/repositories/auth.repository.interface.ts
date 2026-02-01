import { AccountRecord } from './account.repository.interface'

/**
 * Database record for a password reset token.
 */
export interface PasswordResetRecord {
  id: string
  account_id: string
  token: string
  created_at: Date
  expires_at: Date
  used_at: Date | null
}

/**
 * Repository interface for authentication operations.
 */
export interface IAuthRepository {
  /**
   * Expire all pending password reset tokens for an account.
   */
  expirePendingTokens(accountId: string, now: Date): Promise<void>

  /**
   * Create a new password reset token.
   */
  createPasswordResetToken(
    id: string,
    accountId: string,
    token: string,
    createdAt: Date,
    expiresAt: Date
  ): Promise<void>

  /**
   * Check if a password reset token is usable (not used, not expired).
   */
  isTokenUsable(token: string, date: Date): Promise<boolean>

  /**
   * Get the account associated with a password reset token.
   */
  accountFromToken(token: string): Promise<AccountRecord | undefined>

  /**
   * Find account by login token (for API access).
   */
  accountFromLoginToken(token: string): Promise<AccountRecord | undefined>
}

export const AUTH_REPOSITORY = 'AUTH_REPOSITORY'
