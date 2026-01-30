import { PasswordService } from './password.service'
import crypto from 'crypto'

describe('PasswordService', () => {
  let passwordService: PasswordService

  beforeEach(() => {
    passwordService = new PasswordService()
  })

  describe('hash', () => {
    it('should hash a password', async () => {
      const password = 'mySecurePassword123'
      const hash = await passwordService.hash(password)

      expect(hash).toBeDefined()
      expect(hash).not.toEqual(password)
      expect(hash).toMatch(/^\$2[aby]\$\d{2}\$/)
    })

    it('should produce different hashes for the same password', async () => {
      const password = 'mySecurePassword123'
      const hash1 = await passwordService.hash(password)
      const hash2 = await passwordService.hash(password)

      expect(hash1).not.toEqual(hash2)
    })
  })

  describe('verify', () => {
    it('should verify a correct password', async () => {
      const password = 'mySecurePassword123'
      const hash = await passwordService.hash(password)

      const isValid = await passwordService.verify(password, hash)
      expect(isValid).toBe(true)
    })

    it('should reject an incorrect password', async () => {
      const password = 'mySecurePassword123'
      const hash = await passwordService.hash(password)

      const isValid = await passwordService.verify('wrongPassword', hash)
      expect(isValid).toBe(false)
    })
  })

  describe('verifyLegacySha256', () => {
    it('should verify a correct legacy SHA256 password', () => {
      const password = 'mySecurePassword123'
      const legacyHash = crypto.createHash('sha256').update(password).digest()

      const isValid = passwordService.verifyLegacySha256(password, legacyHash)
      expect(isValid).toBe(true)
    })

    it('should reject an incorrect legacy SHA256 password', () => {
      const password = 'mySecurePassword123'
      const legacyHash = crypto.createHash('sha256').update(password).digest()

      const isValid = passwordService.verifyLegacySha256('wrongPassword', legacyHash)
      expect(isValid).toBe(false)
    })
  })

  describe('isBcryptHash', () => {
    it('should identify bcrypt hashes', async () => {
      const hash = await passwordService.hash('password')

      expect(passwordService.isBcryptHash(hash)).toBe(true)
    })

    it('should identify bcrypt hashes in Buffer format', async () => {
      const hash = await passwordService.hash('password')
      const buffer = Buffer.from(hash, 'utf8')

      expect(passwordService.isBcryptHash(buffer)).toBe(true)
    })

    it('should reject non-bcrypt hashes', () => {
      const sha256Hash = crypto.createHash('sha256').update('password').digest()

      expect(passwordService.isBcryptHash(sha256Hash)).toBe(false)
    })

    it('should reject arbitrary strings', () => {
      expect(passwordService.isBcryptHash('not-a-hash')).toBe(false)
    })
  })
})
