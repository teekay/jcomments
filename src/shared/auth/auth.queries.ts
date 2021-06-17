/** Types generated for queries found in "src/auth/auth.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'ExpirePendingTokens' parameters type */
export interface IExpirePendingTokensParams {
  now: Date | null | void;
  accountId: string | null | void;
}

/** 'ExpirePendingTokens' return type */
export type IExpirePendingTokensResult = void;

/** 'ExpirePendingTokens' query type */
export interface IExpirePendingTokensQuery {
  params: IExpirePendingTokensParams;
  result: IExpirePendingTokensResult;
}

const expirePendingTokensIR: any = {"name":"expirePendingTokens","params":[{"name":"now","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":68,"b":70,"line":2,"col":36}]}},{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":90,"b":98,"line":2,"col":58}]}}],"usedParamSet":{"now":true,"accountId":true},"statement":{"body":"UPDATE password_resets SET used_at=:now WHERE account_id=:accountId AND used_at IS NULL","loc":{"a":32,"b":118,"line":2,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * UPDATE password_resets SET used_at=:now WHERE account_id=:accountId AND used_at IS NULL
 * ```
 */
export const expirePendingTokens = new PreparedQuery<IExpirePendingTokensParams,IExpirePendingTokensResult>(expirePendingTokensIR);


/** 'CreatePasswordResetToken' parameters type */
export interface ICreatePasswordResetTokenParams {
  id: string | null | void;
  accountId: string | null | void;
  token: string | null | void;
  createdAt: Date | null | void;
  expiresAt: Date | null | void;
}

/** 'CreatePasswordResetToken' return type */
export type ICreatePasswordResetTokenResult = void;

/** 'CreatePasswordResetToken' query type */
export interface ICreatePasswordResetTokenQuery {
  params: ICreatePasswordResetTokenParams;
  result: ICreatePasswordResetTokenResult;
}

const createPasswordResetTokenIR: any = {"name":"createPasswordResetToken","params":[{"name":"id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":244,"b":245,"line":5,"col":85}]}},{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":249,"b":257,"line":5,"col":90}]}},{"name":"token","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":261,"b":265,"line":5,"col":102}]}},{"name":"createdAt","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":269,"b":277,"line":5,"col":110}]}},{"name":"expiresAt","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":281,"b":289,"line":5,"col":122}]}}],"usedParamSet":{"id":true,"accountId":true,"token":true,"createdAt":true,"expiresAt":true},"statement":{"body":"INSERT INTO password_resets (id, account_id, token, created_at, expires_at) VALUES (:id, :accountId, :token, :createdAt, :expiresAt)","loc":{"a":159,"b":290,"line":5,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO password_resets (id, account_id, token, created_at, expires_at) VALUES (:id, :accountId, :token, :createdAt, :expiresAt)
 * ```
 */
export const createPasswordResetToken = new PreparedQuery<ICreatePasswordResetTokenParams,ICreatePasswordResetTokenResult>(createPasswordResetTokenIR);


/** 'IsTokenUsable' parameters type */
export interface IIsTokenUsableParams {
  token: string | null | void;
  date: Date | null | void;
}

/** 'IsTokenUsable' return type */
export interface IIsTokenUsableResult {
  id: string;
  account_id: string;
  token: string;
  created_at: Date;
  expires_at: Date;
  used_at: Date | null;
}

/** 'IsTokenUsable' query type */
export interface IIsTokenUsableQuery {
  params: IIsTokenUsableParams;
  result: IIsTokenUsableResult;
}

const isTokenUsableIR: any = {"name":"isTokenUsable","params":[{"name":"token","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":363,"b":367,"line":8,"col":43}]}},{"name":"date","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":407,"b":410,"line":8,"col":87}]}}],"usedParamSet":{"token":true,"date":true},"statement":{"body":"SELECT * FROM password_resets WHERE token=:token AND used_at IS NULL AND expires_at > :date","loc":{"a":320,"b":410,"line":8,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM password_resets WHERE token=:token AND used_at IS NULL AND expires_at > :date
 * ```
 */
export const isTokenUsable = new PreparedQuery<IIsTokenUsableParams,IIsTokenUsableResult>(isTokenUsableIR);


/** 'AccountFromToken' parameters type */
export interface IAccountFromTokenParams {
  token: string | null | void;
}

/** 'AccountFromToken' return type */
export interface IAccountFromTokenResult {
  id: string;
  username: string;
  email: string;
  password: Buffer;
  created_at: Date;
}

/** 'AccountFromToken' query type */
export interface IAccountFromTokenQuery {
  params: IAccountFromTokenParams;
  result: IAccountFromTokenResult;
}

const accountFromTokenIR: any = {"name":"accountFromToken","params":[{"name":"token","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":531,"b":535,"line":11,"col":88}]}}],"usedParamSet":{"token":true},"statement":{"body":"SELECT a.* FROM accounts a JOIN password_resets p ON (a.id=p.account_id) WHERE p.token=:token","loc":{"a":443,"b":535,"line":11,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT a.* FROM accounts a JOIN password_resets p ON (a.id=p.account_id) WHERE p.token=:token
 * ```
 */
export const accountFromToken = new PreparedQuery<IAccountFromTokenParams,IAccountFromTokenResult>(accountFromTokenIR);


/** 'ChangePassword' parameters type */
export interface IChangePasswordParams {
  password: string | null | void;
  accountId: string | null | void;
}

/** 'ChangePassword' return type */
export type IChangePasswordResult = void;

/** 'ChangePassword' query type */
export interface IChangePasswordQuery {
  params: IChangePasswordParams;
  result: IChangePasswordResult;
}

const changePasswordIR: any = {"name":"changePassword","params":[{"name":"password","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":603,"b":610,"line":14,"col":37}]}},{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":639,"b":647,"line":14,"col":73}]}}],"usedParamSet":{"password":true,"accountId":true},"statement":{"body":"UPDATE accounts SET password=digest(:password::text, 'sha256') WHERE id=:accountId","loc":{"a":566,"b":647,"line":14,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * UPDATE accounts SET password=digest(:password::text, 'sha256') WHERE id=:accountId
 * ```
 */
export const changePassword = new PreparedQuery<IChangePasswordParams,IChangePasswordResult>(changePasswordIR);


