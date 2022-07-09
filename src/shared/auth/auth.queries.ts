/** Types generated for queries found in "src/shared/auth/auth.sql" */
import { PreparedQuery } from '@pgtyped/query'

/** 'ExpirePendingTokens' parameters type */
export interface IExpirePendingTokensParams {
  accountId: string | null | void
  now: Date | null | void
}

/** 'ExpirePendingTokens' return type */
export type IExpirePendingTokensResult = void

/** 'ExpirePendingTokens' query type */
export interface IExpirePendingTokensQuery {
  params: IExpirePendingTokensParams
  result: IExpirePendingTokensResult
}

const expirePendingTokensIR: any = {
  usedParamSet: { now: true, accountId: true },
  params: [
    { name: 'now', required: false, transform: { type: 'scalar' }, locs: [{ a: 35, b: 38 }] },
    { name: 'accountId', required: false, transform: { type: 'scalar' }, locs: [{ a: 57, b: 66 }] },
  ],
  statement: 'UPDATE password_resets SET used_at=:now WHERE account_id=:accountId AND used_at IS NULL',
}

/**
 * Query generated from SQL:
 * ```
 * UPDATE password_resets SET used_at=:now WHERE account_id=:accountId AND used_at IS NULL
 * ```
 */
export const expirePendingTokens = new PreparedQuery<IExpirePendingTokensParams, IExpirePendingTokensResult>(
  expirePendingTokensIR
)

/** 'CreatePasswordResetToken' parameters type */
export interface ICreatePasswordResetTokenParams {
  accountId: string | null | void
  createdAt: Date | null | void
  expiresAt: Date | null | void
  id: string | null | void
  token: string | null | void
}

/** 'CreatePasswordResetToken' return type */
export type ICreatePasswordResetTokenResult = void

/** 'CreatePasswordResetToken' query type */
export interface ICreatePasswordResetTokenQuery {
  params: ICreatePasswordResetTokenParams
  result: ICreatePasswordResetTokenResult
}

const createPasswordResetTokenIR: any = {
  usedParamSet: { id: true, accountId: true, token: true, createdAt: true, expiresAt: true },
  params: [
    { name: 'id', required: false, transform: { type: 'scalar' }, locs: [{ a: 84, b: 86 }] },
    { name: 'accountId', required: false, transform: { type: 'scalar' }, locs: [{ a: 89, b: 98 }] },
    { name: 'token', required: false, transform: { type: 'scalar' }, locs: [{ a: 101, b: 106 }] },
    { name: 'createdAt', required: false, transform: { type: 'scalar' }, locs: [{ a: 109, b: 118 }] },
    { name: 'expiresAt', required: false, transform: { type: 'scalar' }, locs: [{ a: 121, b: 130 }] },
  ],
  statement:
    'INSERT INTO password_resets (id, account_id, token, created_at, expires_at) VALUES (:id, :accountId, :token, :createdAt, :expiresAt)',
}

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO password_resets (id, account_id, token, created_at, expires_at) VALUES (:id, :accountId, :token, :createdAt, :expiresAt)
 * ```
 */
export const createPasswordResetToken = new PreparedQuery<
  ICreatePasswordResetTokenParams,
  ICreatePasswordResetTokenResult
>(createPasswordResetTokenIR)

/** 'IsTokenUsable' parameters type */
export interface IIsTokenUsableParams {
  date: Date | null | void
  token: string | null | void
}

/** 'IsTokenUsable' return type */
export interface IIsTokenUsableResult {
  account_id: string
  created_at: Date
  expires_at: Date
  id: string
  token: string
  used_at: Date | null
}

/** 'IsTokenUsable' query type */
export interface IIsTokenUsableQuery {
  params: IIsTokenUsableParams
  result: IIsTokenUsableResult
}

const isTokenUsableIR: any = {
  usedParamSet: { token: true, date: true },
  params: [
    { name: 'token', required: false, transform: { type: 'scalar' }, locs: [{ a: 42, b: 47 }] },
    { name: 'date', required: false, transform: { type: 'scalar' }, locs: [{ a: 86, b: 90 }] },
  ],
  statement: 'SELECT * FROM password_resets WHERE token=:token AND used_at IS NULL AND expires_at > :date',
}

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM password_resets WHERE token=:token AND used_at IS NULL AND expires_at > :date
 * ```
 */
export const isTokenUsable = new PreparedQuery<IIsTokenUsableParams, IIsTokenUsableResult>(isTokenUsableIR)

/** 'AccountFromToken' parameters type */
export interface IAccountFromTokenParams {
  token: string | null | void
}

/** 'AccountFromToken' return type */
export interface IAccountFromTokenResult {
  created_at: Date
  email: string
  id: string
  password: Buffer
  username: string
}

/** 'AccountFromToken' query type */
export interface IAccountFromTokenQuery {
  params: IAccountFromTokenParams
  result: IAccountFromTokenResult
}

const accountFromTokenIR: any = {
  usedParamSet: { token: true },
  params: [{ name: 'token', required: false, transform: { type: 'scalar' }, locs: [{ a: 87, b: 92 }] }],
  statement: 'SELECT a.* FROM accounts a JOIN password_resets p ON (a.id=p.account_id) WHERE p.token=:token',
}

/**
 * Query generated from SQL:
 * ```
 * SELECT a.* FROM accounts a JOIN password_resets p ON (a.id=p.account_id) WHERE p.token=:token
 * ```
 */
export const accountFromToken = new PreparedQuery<IAccountFromTokenParams, IAccountFromTokenResult>(accountFromTokenIR)

/** 'ChangePassword' parameters type */
export interface IChangePasswordParams {
  accountId: string | null | void
  password: string | null | void
}

/** 'ChangePassword' return type */
export type IChangePasswordResult = void

/** 'ChangePassword' query type */
export interface IChangePasswordQuery {
  params: IChangePasswordParams
  result: IChangePasswordResult
}

const changePasswordIR: any = {
  usedParamSet: { password: true, accountId: true },
  params: [
    { name: 'password', required: false, transform: { type: 'scalar' }, locs: [{ a: 36, b: 44 }] },
    { name: 'accountId', required: false, transform: { type: 'scalar' }, locs: [{ a: 72, b: 81 }] },
  ],
  statement: "UPDATE accounts SET password=digest(:password::text, 'sha256') WHERE id=:accountId",
}

/**
 * Query generated from SQL:
 * ```
 * UPDATE accounts SET password=digest(:password::text, 'sha256') WHERE id=:accountId
 * ```
 */
export const changePassword = new PreparedQuery<IChangePasswordParams, IChangePasswordResult>(changePasswordIR)
