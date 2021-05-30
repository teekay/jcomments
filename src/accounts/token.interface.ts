import { Account } from './account.interface'

/**
 * Describes a token that the implementing party will use
 * to fetch comments for a resource (URL) that's associated
 * with their account.
 */
export interface Token {
  account: Account
  token: string
  createdAt: Date
  revokedAt?: Date
}
