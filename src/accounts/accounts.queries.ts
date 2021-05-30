/** Types generated for queries found in "src/accounts/accounts.sql" */
import { PreparedQuery } from '@pgtyped/query';

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

const loginIR: any = {"name":"Login","params":[{"name":"username","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":58,"b":65,"line":2,"col":39}]}},{"name":"password","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":88,"b":95,"line":2,"col":69}]}}],"usedParamSet":{"username":true,"password":true},"statement":{"body":"SELECT * FROM accounts WHERE username=:username AND password=digest(:password::text, 'sha256')","loc":{"a":19,"b":112,"line":2,"col":0}}};

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

const loginFromTokenIR: any = {"name":"LoginFromToken","params":[{"name":"token","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":234,"b":238,"line":5,"col":88}]}}],"usedParamSet":{"token":true},"statement":{"body":"SELECT DISTINCT a.* FROM accounts a JOIN tokens t ON (a.id=t.account_id) WHERE t.token=:token AND t.revoked_at IS NULL","loc":{"a":146,"b":263,"line":5,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT DISTINCT a.* FROM accounts a JOIN tokens t ON (a.id=t.account_id) WHERE t.token=:token AND t.revoked_at IS NULL
 * ```
 */
export const loginFromToken = new PreparedQuery<ILoginFromTokenParams,ILoginFromTokenResult>(loginFromTokenIR);


