/**
 * Database record for a token.
 */
export interface TokenRecord {
  id: string
  account_id: string
  token: string
  created_at: Date
  revoked_at: Date | null
}

/**
 * Repository interface for token operations.
 */
export interface ITokenRepository {
  /**
   * Create a new token.
   */
  create(id: string, accountId: string, token: string, createdAt: Date): Promise<void>

  /**
   * Find token by its value.
   */
  findByToken(token: string): Promise<TokenRecord | undefined>

  /**
   * Find the current (most recent non-revoked) token for an account.
   */
  findCurrentToken(accountId: string): Promise<TokenRecord | undefined>

  /**
   * Find all valid (non-revoked) tokens for an account.
   */
  findAllValidTokens(accountId: string): Promise<TokenRecord[]>

  /**
   * Revoke a token.
   */
  revoke(token: string, revokedAt: Date): Promise<void>

  /**
   * Delete all tokens for an account.
   */
  deleteForAccount(accountId: string): Promise<void>
}

export const TOKEN_REPOSITORY = 'TOKEN_REPOSITORY'
