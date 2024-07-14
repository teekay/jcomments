/** Types generated for queries found in "src/shared/accounts/accounts.sql" */
import { PreparedQuery } from '@pgtyped/runtime'

/** 'Signup' parameters type */
export interface ISignupParams {
  createdAt: Date | null | void
  email: string | null | void
  id: string | null | void
  password: string | null | void
  username: string | null | void
}

/** 'Signup' return type */
export type ISignupResult = void

/** 'Signup' query type */
export interface ISignupQuery {
  params: ISignupParams
  result: ISignupResult
}

const signupIR: any = {
  usedParamSet: { id: true, username: true, email: true, password: true, createdAt: true },
  params: [
    { name: 'id', required: false, transform: { type: 'scalar' }, locs: [{ a: 72, b: 74 }] },
    { name: 'username', required: false, transform: { type: 'scalar' }, locs: [{ a: 77, b: 85 }] },
    { name: 'email', required: false, transform: { type: 'scalar' }, locs: [{ a: 88, b: 93 }] },
    { name: 'password', required: false, transform: { type: 'scalar' }, locs: [{ a: 103, b: 111 }] },
    { name: 'createdAt', required: false, transform: { type: 'scalar' }, locs: [{ a: 131, b: 140 }] },
  ],
  statement:
    "INSERT INTO accounts (id, username, email, password, created_at) VALUES(:id, :username, :email, digest(:password::text, 'sha256'), :createdAt)",
}

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO accounts (id, username, email, password, created_at) VALUES(:id, :username, :email, digest(:password::text, 'sha256'), :createdAt)
 * ```
 */
export const signup = new PreparedQuery<ISignupParams, ISignupResult>(signupIR)

/** 'InitialAccountSettings' parameters type */
export interface IInitialAccountSettingsParams {
  accountId: string | null | void
  id: string | null | void
}

/** 'InitialAccountSettings' return type */
export type IInitialAccountSettingsResult = void

/** 'InitialAccountSettings' query type */
export interface IInitialAccountSettingsQuery {
  params: IInitialAccountSettingsParams
  result: IInitialAccountSettingsResult
}

const initialAccountSettingsIR: any = {
  usedParamSet: { id: true, accountId: true },
  params: [
    { name: 'id', required: false, transform: { type: 'scalar' }, locs: [{ a: 52, b: 54 }] },
    { name: 'accountId', required: false, transform: { type: 'scalar' }, locs: [{ a: 57, b: 66 }] },
  ],
  statement: 'INSERT INTO account_settings(id, account_id) VALUES(:id, :accountId)',
}

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO account_settings(id, account_id) VALUES(:id, :accountId)
 * ```
 */
export const initialAccountSettings = new PreparedQuery<IInitialAccountSettingsParams, IInitialAccountSettingsResult>(
  initialAccountSettingsIR
)

/** 'InitialAccountEmailSettings' parameters type */
export interface IInitialAccountEmailSettingsParams {
  accountId: string | null | void
  id: string | null | void
}

/** 'InitialAccountEmailSettings' return type */
export type IInitialAccountEmailSettingsResult = void

/** 'InitialAccountEmailSettings' query type */
export interface IInitialAccountEmailSettingsQuery {
  params: IInitialAccountEmailSettingsParams
  result: IInitialAccountEmailSettingsResult
}

const initialAccountEmailSettingsIR: any = {
  usedParamSet: { id: true, accountId: true },
  params: [
    { name: 'id', required: false, transform: { type: 'scalar' }, locs: [{ a: 58, b: 60 }] },
    { name: 'accountId', required: false, transform: { type: 'scalar' }, locs: [{ a: 63, b: 72 }] },
  ],
  statement: 'INSERT INTO account_email_settings(id, account_id) VALUES(:id, :accountId)',
}

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO account_email_settings(id, account_id) VALUES(:id, :accountId)
 * ```
 */
export const initialAccountEmailSettings = new PreparedQuery<
  IInitialAccountEmailSettingsParams,
  IInitialAccountEmailSettingsResult
>(initialAccountEmailSettingsIR)

/** 'Login' parameters type */
export interface ILoginParams {
  password: string | null | void
  username: string | null | void
}

/** 'Login' return type */
export interface ILoginResult {
  created_at: Date
  email: string
  id: string
  password: Buffer
  username: string
}

/** 'Login' query type */
export interface ILoginQuery {
  params: ILoginParams
  result: ILoginResult
}

const loginIR: any = {
  usedParamSet: { username: true, password: true },
  params: [
    { name: 'username', required: false, transform: { type: 'scalar' }, locs: [{ a: 38, b: 46 }] },
    { name: 'password', required: false, transform: { type: 'scalar' }, locs: [{ a: 68, b: 76 }] },
  ],
  statement: "SELECT * FROM accounts WHERE username=:username AND password=digest(:password::text, 'sha256')",
}

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM accounts WHERE username=:username AND password=digest(:password::text, 'sha256')
 * ```
 */
export const login = new PreparedQuery<ILoginParams, ILoginResult>(loginIR)

/** 'FindById' parameters type */
export interface IFindByIdParams {
  id: string | null | void
}

/** 'FindById' return type */
export interface IFindByIdResult {
  created_at: Date
  email: string
  id: string
  password: Buffer
  username: string
}

/** 'FindById' query type */
export interface IFindByIdQuery {
  params: IFindByIdParams
  result: IFindByIdResult
}

const findByIdIR: any = {
  usedParamSet: { id: true },
  params: [{ name: 'id', required: false, transform: { type: 'scalar' }, locs: [{ a: 32, b: 34 }] }],
  statement: 'SELECT * FROM accounts WHERE id=:id',
}

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM accounts WHERE id=:id
 * ```
 */
export const findById = new PreparedQuery<IFindByIdParams, IFindByIdResult>(findByIdIR)

/** 'FindByUsername' parameters type */
export interface IFindByUsernameParams {
  username: string | null | void
}

/** 'FindByUsername' return type */
export interface IFindByUsernameResult {
  created_at: Date
  email: string
  id: string
  password: Buffer
  username: string
}

/** 'FindByUsername' query type */
export interface IFindByUsernameQuery {
  params: IFindByUsernameParams
  result: IFindByUsernameResult
}

const findByUsernameIR: any = {
  usedParamSet: { username: true },
  params: [{ name: 'username', required: false, transform: { type: 'scalar' }, locs: [{ a: 38, b: 46 }] }],
  statement: 'SELECT * FROM accounts WHERE username=:username',
}

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM accounts WHERE username=:username
 * ```
 */
export const findByUsername = new PreparedQuery<IFindByUsernameParams, IFindByUsernameResult>(findByUsernameIR)

/** 'FindByEmail' parameters type */
export interface IFindByEmailParams {
  email: string | null | void
}

/** 'FindByEmail' return type */
export interface IFindByEmailResult {
  created_at: Date
  email: string
  id: string
  password: Buffer
  username: string
}

/** 'FindByEmail' query type */
export interface IFindByEmailQuery {
  params: IFindByEmailParams
  result: IFindByEmailResult
}

const findByEmailIR: any = {
  usedParamSet: { email: true },
  params: [{ name: 'email', required: false, transform: { type: 'scalar' }, locs: [{ a: 35, b: 40 }] }],
  statement: 'SELECT * FROM accounts WHERE email=:email',
}

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM accounts WHERE email=:email
 * ```
 */
export const findByEmail = new PreparedQuery<IFindByEmailParams, IFindByEmailResult>(findByEmailIR)

/** 'CreateToken' parameters type */
export interface ICreateTokenParams {
  accountId: string | null | void
  createdAt: Date | null | void
  id: string | null | void
  token: string | null | void
}

/** 'CreateToken' return type */
export type ICreateTokenResult = void

/** 'CreateToken' query type */
export interface ICreateTokenQuery {
  params: ICreateTokenParams
  result: ICreateTokenResult
}

const createTokenIR: any = {
  usedParamSet: { id: true, accountId: true, token: true, createdAt: true },
  params: [
    { name: 'id', required: false, transform: { type: 'scalar' }, locs: [{ a: 63, b: 65 }] },
    { name: 'accountId', required: false, transform: { type: 'scalar' }, locs: [{ a: 68, b: 77 }] },
    { name: 'token', required: false, transform: { type: 'scalar' }, locs: [{ a: 80, b: 85 }] },
    { name: 'createdAt', required: false, transform: { type: 'scalar' }, locs: [{ a: 88, b: 97 }] },
  ],
  statement: 'INSERT INTO tokens (id, account_id, token, created_at) VALUES (:id, :accountId, :token, :createdAt)',
}

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO tokens (id, account_id, token, created_at) VALUES (:id, :accountId, :token, :createdAt)
 * ```
 */
export const createToken = new PreparedQuery<ICreateTokenParams, ICreateTokenResult>(createTokenIR)

/** 'RevokeToken' parameters type */
export interface IRevokeTokenParams {
  revokedAt: Date | null | void
  token: string | null | void
}

/** 'RevokeToken' return type */
export type IRevokeTokenResult = void

/** 'RevokeToken' query type */
export interface IRevokeTokenQuery {
  params: IRevokeTokenParams
  result: IRevokeTokenResult
}

const revokeTokenIR: any = {
  usedParamSet: { revokedAt: true, token: true },
  params: [
    { name: 'revokedAt', required: false, transform: { type: 'scalar' }, locs: [{ a: 29, b: 38 }] },
    { name: 'token', required: false, transform: { type: 'scalar' }, locs: [{ a: 52, b: 57 }] },
  ],
  statement: 'UPDATE tokens SET revoked_at=:revokedAt WHERE token=:token',
}

/**
 * Query generated from SQL:
 * ```
 * UPDATE tokens SET revoked_at=:revokedAt WHERE token=:token
 * ```
 */
export const revokeToken = new PreparedQuery<IRevokeTokenParams, IRevokeTokenResult>(revokeTokenIR)

/** 'FindToken' parameters type */
export interface IFindTokenParams {
  token: string | null | void
}

/** 'FindToken' return type */
export interface IFindTokenResult {
  account_id: string
  created_at: Date
  id: string
  revoked_at: Date | null
  token: string
}

/** 'FindToken' query type */
export interface IFindTokenQuery {
  params: IFindTokenParams
  result: IFindTokenResult
}

const findTokenIR: any = {
  usedParamSet: { token: true },
  params: [{ name: 'token', required: false, transform: { type: 'scalar' }, locs: [{ a: 33, b: 38 }] }],
  statement: 'SELECT * FROM tokens WHERE token=:token',
}

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM tokens WHERE token=:token
 * ```
 */
export const findToken = new PreparedQuery<IFindTokenParams, IFindTokenResult>(findTokenIR)

/** 'FindCurrentToken' parameters type */
export interface IFindCurrentTokenParams {
  accountId: string | null | void
}

/** 'FindCurrentToken' return type */
export interface IFindCurrentTokenResult {
  account_id: string
  created_at: Date
  id: string
  revoked_at: Date | null
  token: string
}

/** 'FindCurrentToken' query type */
export interface IFindCurrentTokenQuery {
  params: IFindCurrentTokenParams
  result: IFindCurrentTokenResult
}

const findCurrentTokenIR: any = {
  usedParamSet: { accountId: true },
  params: [{ name: 'accountId', required: false, transform: { type: 'scalar' }, locs: [{ a: 38, b: 47 }] }],
  statement: 'SELECT * FROM tokens WHERE account_id=:accountId AND revoked_at IS NULL',
}

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM tokens WHERE account_id=:accountId AND revoked_at IS NULL
 * ```
 */
export const findCurrentToken = new PreparedQuery<IFindCurrentTokenParams, IFindCurrentTokenResult>(findCurrentTokenIR)

/** 'AccountSettings' parameters type */
export interface IAccountSettingsParams {
  accountId: string | null | void
}

/** 'AccountSettings' return type */
export interface IAccountSettingsResult {
  account_id: string
  akismet_key: string | null
  blog_url: string | null
  id: string
  require_moderation: boolean
  use_akismet: boolean | null
}

/** 'AccountSettings' query type */
export interface IAccountSettingsQuery {
  params: IAccountSettingsParams
  result: IAccountSettingsResult
}

const accountSettingsIR: any = {
  usedParamSet: { accountId: true },
  params: [{ name: 'accountId', required: false, transform: { type: 'scalar' }, locs: [{ a: 48, b: 57 }] }],
  statement: 'SELECT * FROM account_settings WHERE account_id=:accountId',
}

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM account_settings WHERE account_id=:accountId
 * ```
 */
export const accountSettings = new PreparedQuery<IAccountSettingsParams, IAccountSettingsResult>(accountSettingsIR)

/** 'AccountEmailSettings' parameters type */
export interface IAccountEmailSettingsParams {
  accountId: string | null | void
}

/** 'AccountEmailSettings' return type */
export interface IAccountEmailSettingsResult {
  account_id: string
  id: string
  notify_on_comments: boolean | null
  send_comments_digest: boolean | null
}

/** 'AccountEmailSettings' query type */
export interface IAccountEmailSettingsQuery {
  params: IAccountEmailSettingsParams
  result: IAccountEmailSettingsResult
}

const accountEmailSettingsIR: any = {
  usedParamSet: { accountId: true },
  params: [{ name: 'accountId', required: false, transform: { type: 'scalar' }, locs: [{ a: 54, b: 63 }] }],
  statement: 'SELECT * FROM account_email_settings WHERE account_id=:accountId',
}

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM account_email_settings WHERE account_id=:accountId
 * ```
 */
export const accountEmailSettings = new PreparedQuery<IAccountEmailSettingsParams, IAccountEmailSettingsResult>(
  accountEmailSettingsIR
)

/** 'UpdateSettings' parameters type */
export interface IUpdateSettingsParams {
  accountId: string | null | void
  akismetKey: string | null | void
  blogUrl: string | null | void
  requireModeration: boolean | null | void
  useAkismet: boolean | null | void
}

/** 'UpdateSettings' return type */
export type IUpdateSettingsResult = void

/** 'UpdateSettings' query type */
export interface IUpdateSettingsQuery {
  params: IUpdateSettingsParams
  result: IUpdateSettingsResult
}

const updateSettingsIR: any = {
  usedParamSet: { requireModeration: true, blogUrl: true, useAkismet: true, akismetKey: true, accountId: true },
  params: [
    { name: 'requireModeration', required: false, transform: { type: 'scalar' }, locs: [{ a: 47, b: 64 }] },
    { name: 'blogUrl', required: false, transform: { type: 'scalar' }, locs: [{ a: 76, b: 83 }] },
    { name: 'useAkismet', required: false, transform: { type: 'scalar' }, locs: [{ a: 98, b: 108 }] },
    { name: 'akismetKey', required: false, transform: { type: 'scalar' }, locs: [{ a: 123, b: 133 }] },
    { name: 'accountId', required: false, transform: { type: 'scalar' }, locs: [{ a: 152, b: 161 }] },
  ],
  statement:
    'UPDATE account_settings SET require_moderation=:requireModeration, blog_url=:blogUrl, use_akismet=:useAkismet, akismet_key=:akismetKey WHERE account_id=:accountId',
}

/**
 * Query generated from SQL:
 * ```
 * UPDATE account_settings SET require_moderation=:requireModeration, blog_url=:blogUrl, use_akismet=:useAkismet, akismet_key=:akismetKey WHERE account_id=:accountId
 * ```
 */
export const updateSettings = new PreparedQuery<IUpdateSettingsParams, IUpdateSettingsResult>(updateSettingsIR)

/** 'UpdateEmailSettings' parameters type */
export interface IUpdateEmailSettingsParams {
  accountId: string | null | void
  notifyOnComments: boolean | null | void
  sendCommentsDigest: boolean | null | void
}

/** 'UpdateEmailSettings' return type */
export type IUpdateEmailSettingsResult = void

/** 'UpdateEmailSettings' query type */
export interface IUpdateEmailSettingsQuery {
  params: IUpdateEmailSettingsParams
  result: IUpdateEmailSettingsResult
}

const updateEmailSettingsIR: any = {
  usedParamSet: { notifyOnComments: true, sendCommentsDigest: true, accountId: true },
  params: [
    { name: 'notifyOnComments', required: false, transform: { type: 'scalar' }, locs: [{ a: 53, b: 69 }] },
    { name: 'sendCommentsDigest', required: false, transform: { type: 'scalar' }, locs: [{ a: 93, b: 111 }] },
    { name: 'accountId', required: false, transform: { type: 'scalar' }, locs: [{ a: 130, b: 139 }] },
  ],
  statement:
    'UPDATE account_email_settings SET notify_on_comments=:notifyOnComments, send_comments_digest=:sendCommentsDigest WHERE account_id=:accountId',
}

/**
 * Query generated from SQL:
 * ```
 * UPDATE account_email_settings SET notify_on_comments=:notifyOnComments, send_comments_digest=:sendCommentsDigest WHERE account_id=:accountId
 * ```
 */
export const updateEmailSettings = new PreparedQuery<IUpdateEmailSettingsParams, IUpdateEmailSettingsResult>(
  updateEmailSettingsIR
)

/** 'FindUserByEmailOrUsername' parameters type */
export interface IFindUserByEmailOrUsernameParams {
  email: string | null | void
  username: string | null | void
}

/** 'FindUserByEmailOrUsername' return type */
export interface IFindUserByEmailOrUsernameResult {
  created_at: Date
  email: string
  id: string
  password: Buffer
  username: string
}

/** 'FindUserByEmailOrUsername' query type */
export interface IFindUserByEmailOrUsernameQuery {
  params: IFindUserByEmailOrUsernameParams
  result: IFindUserByEmailOrUsernameResult
}

const findUserByEmailOrUsernameIR: any = {
  usedParamSet: { username: true, email: true },
  params: [
    { name: 'username', required: false, transform: { type: 'scalar' }, locs: [{ a: 38, b: 46 }] },
    { name: 'email', required: false, transform: { type: 'scalar' }, locs: [{ a: 57, b: 62 }] },
  ],
  statement: 'SELECT * FROM accounts WHERE username=:username OR email=:email',
}

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM accounts WHERE username=:username OR email=:email
 * ```
 */
export const findUserByEmailOrUsername = new PreparedQuery<
  IFindUserByEmailOrUsernameParams,
  IFindUserByEmailOrUsernameResult
>(findUserByEmailOrUsernameIR)

/** 'ChangeAccountEmail' parameters type */
export interface IChangeAccountEmailParams {
  accountId: string | null | void
  email: string | null | void
}

/** 'ChangeAccountEmail' return type */
export type IChangeAccountEmailResult = void

/** 'ChangeAccountEmail' query type */
export interface IChangeAccountEmailQuery {
  params: IChangeAccountEmailParams
  result: IChangeAccountEmailResult
}

const changeAccountEmailIR: any = {
  usedParamSet: { email: true, accountId: true },
  params: [
    { name: 'email', required: false, transform: { type: 'scalar' }, locs: [{ a: 26, b: 31 }] },
    { name: 'accountId', required: false, transform: { type: 'scalar' }, locs: [{ a: 42, b: 51 }] },
  ],
  statement: 'UPDATE accounts SET email=:email WHERE id=:accountId',
}

/**
 * Query generated from SQL:
 * ```
 * UPDATE accounts SET email=:email WHERE id=:accountId
 * ```
 */
export const changeAccountEmail = new PreparedQuery<IChangeAccountEmailParams, IChangeAccountEmailResult>(
  changeAccountEmailIR
)

/** 'DeleteSettings' parameters type */
export interface IDeleteSettingsParams {
  accountId: string | null | void
}

/** 'DeleteSettings' return type */
export type IDeleteSettingsResult = void

/** 'DeleteSettings' query type */
export interface IDeleteSettingsQuery {
  params: IDeleteSettingsParams
  result: IDeleteSettingsResult
}

const deleteSettingsIR: any = {
  usedParamSet: { accountId: true },
  params: [{ name: 'accountId', required: false, transform: { type: 'scalar' }, locs: [{ a: 46, b: 55 }] }],
  statement: 'DELETE FROM account_settings WHERE account_id=:accountId',
}

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM account_settings WHERE account_id=:accountId
 * ```
 */
export const deleteSettings = new PreparedQuery<IDeleteSettingsParams, IDeleteSettingsResult>(deleteSettingsIR)

/** 'DeleteEmailSettings' parameters type */
export interface IDeleteEmailSettingsParams {
  accountId: string | null | void
}

/** 'DeleteEmailSettings' return type */
export type IDeleteEmailSettingsResult = void

/** 'DeleteEmailSettings' query type */
export interface IDeleteEmailSettingsQuery {
  params: IDeleteEmailSettingsParams
  result: IDeleteEmailSettingsResult
}

const deleteEmailSettingsIR: any = {
  usedParamSet: { accountId: true },
  params: [{ name: 'accountId', required: false, transform: { type: 'scalar' }, locs: [{ a: 52, b: 61 }] }],
  statement: 'DELETE FROM account_email_settings WHERE account_id=:accountId',
}

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM account_email_settings WHERE account_id=:accountId
 * ```
 */
export const deleteEmailSettings = new PreparedQuery<IDeleteEmailSettingsParams, IDeleteEmailSettingsResult>(
  deleteEmailSettingsIR
)

/** 'DeleteTokens' parameters type */
export interface IDeleteTokensParams {
  accountId: string | null | void
}

/** 'DeleteTokens' return type */
export type IDeleteTokensResult = void

/** 'DeleteTokens' query type */
export interface IDeleteTokensQuery {
  params: IDeleteTokensParams
  result: IDeleteTokensResult
}

const deleteTokensIR: any = {
  usedParamSet: { accountId: true },
  params: [{ name: 'accountId', required: false, transform: { type: 'scalar' }, locs: [{ a: 36, b: 45 }] }],
  statement: 'DELETE FROM tokens WHERE account_id=:accountId',
}

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM tokens WHERE account_id=:accountId
 * ```
 */
export const deleteTokens = new PreparedQuery<IDeleteTokensParams, IDeleteTokensResult>(deleteTokensIR)

/** 'CloseAccount' parameters type */
export interface ICloseAccountParams {
  accountId: string | null | void
}

/** 'CloseAccount' return type */
export type ICloseAccountResult = void

/** 'CloseAccount' query type */
export interface ICloseAccountQuery {
  params: ICloseAccountParams
  result: ICloseAccountResult
}

const closeAccountIR: any = {
  usedParamSet: { accountId: true },
  params: [{ name: 'accountId', required: false, transform: { type: 'scalar' }, locs: [{ a: 30, b: 39 }] }],
  statement: 'DELETE FROM accounts WHERE id=:accountId',
}

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM accounts WHERE id=:accountId
 * ```
 */
export const closeAccount = new PreparedQuery<ICloseAccountParams, ICloseAccountResult>(closeAccountIR)
