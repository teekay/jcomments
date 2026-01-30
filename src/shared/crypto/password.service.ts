import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { Injectable } from '@nestjs/common'

const BCRYPT_ROUNDS = 12

@Injectable()
export class PasswordService {
  /**
   * Hash a password using bcrypt.
   * @param password Plain text password
   * @returns Bcrypt hash string (includes salt)
   */
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS)
  }

  /**
   * Verify a password against a bcrypt hash.
   * @param password Plain text password to verify
   * @param hash Bcrypt hash to compare against
   * @returns True if password matches
   */
  async verify(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }

  /**
   * Verify a password against a legacy SHA256 hash (for migration).
   * The legacy system used pgcrypto's digest() which produces raw bytes.
   * @param password Plain text password to verify
   * @param hashBuffer SHA256 hash as Buffer (from bytea column)
   * @returns True if password matches
   */
  verifyLegacySha256(password: string, hashBuffer: Buffer): boolean {
    const expectedHash = crypto.createHash('sha256').update(password).digest()
    return crypto.timingSafeEqual(hashBuffer, expectedHash)
  }

  /**
   * Check if a hash is in bcrypt format (starts with $2a$, $2b$, or $2y$).
   * @param hash Hash to check
   * @returns True if hash is bcrypt format
   */
  isBcryptHash(hash: string | Buffer): boolean {
    const hashStr = Buffer.isBuffer(hash) ? hash.toString('utf8') : hash
    return /^\$2[aby]\$\d{2}\$/.test(hashStr)
  }
}
