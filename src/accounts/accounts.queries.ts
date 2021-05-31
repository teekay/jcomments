/** Types generated for queries found in "src/accounts/accounts.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'Signup' parameters type */
export interface ISignupParams {
  id: string | null | void;
  username: string | null | void;
  password: string | null | void;
  createdAt: Date | null | void;
}

/** 'Signup' return type */
export type ISignupResult = void;

/** 'Signup' query type */
export interface ISignupQuery {
  params: ISignupParams;
  result: ISignupResult;
}

const signupIR: any = {"name":"Signup","params":[{"name":"id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":85,"b":86,"line":2,"col":66}]}},{"name":"username","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":90,"b":97,"line":2,"col":71}]}},{"name":"password","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":108,"b":115,"line":2,"col":89}]}},{"name":"createdAt","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":136,"b":144,"line":2,"col":117}]}}],"usedParamSet":{"id":true,"username":true,"password":true,"createdAt":true},"statement":{"body":"INSERT INTO accounts (id, username, password, created_at) VALUES(:id, :username, digest(:password::text, 'sha256'), :createdAt)","loc":{"a":19,"b":145,"line":2,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO accounts (id, username, password, created_at) VALUES(:id, :username, digest(:password::text, 'sha256'), :createdAt)
 * ```
 */
export const signup = new PreparedQuery<ISignupParams,ISignupResult>(signupIR);


/** 'Login' parameters type */
export interface ILoginParams {
  username: string | null | void;
  password: string | null | void;
}

/** 'Login' return type */
export interface ILoginResult {
  id: string;
  username: string;
  password: Buffer;
  created_at: Date;
}

/** 'Login' query type */
export interface ILoginQuery {
  params: ILoginParams;
  result: ILoginResult;
}

const loginIR: any = {"name":"Login","params":[{"name":"username","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":206,"b":213,"line":5,"col":39}]}},{"name":"password","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":236,"b":243,"line":5,"col":69}]}}],"usedParamSet":{"username":true,"password":true},"statement":{"body":"SELECT * FROM accounts WHERE username=:username AND password=digest(:password::text, 'sha256')","loc":{"a":167,"b":260,"line":5,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM accounts WHERE username=:username AND password=digest(:password::text, 'sha256')
 * ```
 */
export const login = new PreparedQuery<ILoginParams,ILoginResult>(loginIR);


/** 'LoginFromToken' parameters type */
export interface ILoginFromTokenParams {
  token: string | null | void;
}

/** 'LoginFromToken' return type */
export interface ILoginFromTokenResult {
  id: string;
  username: string;
  password: Buffer;
  created_at: Date;
}

/** 'LoginFromToken' query type */
export interface ILoginFromTokenQuery {
  params: ILoginFromTokenParams;
  result: ILoginFromTokenResult;
}

const loginFromTokenIR: any = {"name":"LoginFromToken","params":[{"name":"token","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":379,"b":383,"line":8,"col":88}]}}],"usedParamSet":{"token":true},"statement":{"body":"SELECT DISTINCT a.* FROM accounts a JOIN tokens t ON (a.id=t.account_id) WHERE t.token=:token AND t.revoked_at IS NULL","loc":{"a":291,"b":408,"line":8,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT DISTINCT a.* FROM accounts a JOIN tokens t ON (a.id=t.account_id) WHERE t.token=:token AND t.revoked_at IS NULL
 * ```
 */
export const loginFromToken = new PreparedQuery<ILoginFromTokenParams,ILoginFromTokenResult>(loginFromTokenIR);


