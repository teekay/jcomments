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

const signupIR: any = {"name":"Signup","params":[{"name":"id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":86,"b":87,"line":2,"col":66}]}},{"name":"username","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":91,"b":98,"line":2,"col":71}]}},{"name":"password","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":109,"b":116,"line":2,"col":89}]}},{"name":"createdAt","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":137,"b":145,"line":2,"col":117}]}}],"usedParamSet":{"id":true,"username":true,"password":true,"createdAt":true},"statement":{"body":"INSERT INTO accounts (id, username, password, created_at) VALUES(:id, :username, digest(:password::text, 'sha256'), :createdAt)","loc":{"a":20,"b":146,"line":2,"col":0}}};

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

const loginIR: any = {"name":"Login","params":[{"name":"username","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":210,"b":217,"line":5,"col":39}]}},{"name":"password","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":240,"b":247,"line":5,"col":69}]}}],"usedParamSet":{"username":true,"password":true},"statement":{"body":"SELECT * FROM accounts WHERE username=:username AND password=digest(:password::text, 'sha256')","loc":{"a":171,"b":264,"line":5,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM accounts WHERE username=:username AND password=digest(:password::text, 'sha256')
 * ```
 */
export const login = new PreparedQuery<ILoginParams,ILoginResult>(loginIR);


/** 'FindById' parameters type */
export interface IFindByIdParams {
  id: string | null | void;
}

/** 'FindById' return type */
export interface IFindByIdResult {
  id: string;
  username: string;
  password: Buffer;
  created_at: Date;
}

/** 'FindById' query type */
export interface IFindByIdQuery {
  params: IFindByIdParams;
  result: IFindByIdResult;
}

const findByIdIR: any = {"name":"findById","params":[{"name":"id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":325,"b":326,"line":8,"col":33}]}}],"usedParamSet":{"id":true},"statement":{"body":"SELECT * FROM accounts WHERE id=:id","loc":{"a":292,"b":326,"line":8,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM accounts WHERE id=:id
 * ```
 */
export const findById = new PreparedQuery<IFindByIdParams,IFindByIdResult>(findByIdIR);


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

const loginFromTokenIR: any = {"name":"LoginFromToken","params":[{"name":"token","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":448,"b":452,"line":11,"col":88}]}}],"usedParamSet":{"token":true},"statement":{"body":"SELECT DISTINCT a.* FROM accounts a JOIN tokens t ON (a.id=t.account_id) WHERE t.token=:token AND t.revoked_at IS NULL","loc":{"a":360,"b":477,"line":11,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT DISTINCT a.* FROM accounts a JOIN tokens t ON (a.id=t.account_id) WHERE t.token=:token AND t.revoked_at IS NULL
 * ```
 */
export const loginFromToken = new PreparedQuery<ILoginFromTokenParams,ILoginFromTokenResult>(loginFromTokenIR);


/** 'CreateToken' parameters type */
export interface ICreateTokenParams {
  id: string | null | void;
  accountId: string | null | void;
  token: string | null | void;
  createdAt: Date | null | void;
}

/** 'CreateToken' return type */
export type ICreateTokenResult = void;

/** 'CreateToken' query type */
export interface ICreateTokenQuery {
  params: ICreateTokenParams;
  result: ICreateTokenResult;
}

const createTokenIR: any = {"name":"CreateToken","params":[{"name":"id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":572,"b":573,"line":14,"col":64}]}},{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":577,"b":585,"line":14,"col":69}]}},{"name":"token","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":589,"b":593,"line":14,"col":81}]}},{"name":"createdAt","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":597,"b":605,"line":14,"col":89}]}}],"usedParamSet":{"id":true,"accountId":true,"token":true,"createdAt":true},"statement":{"body":"INSERT INTO tokens (id, account_id, token, created_at) VALUES (:id, :accountId, :token, :createdAt)","loc":{"a":508,"b":606,"line":14,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO tokens (id, account_id, token, created_at) VALUES (:id, :accountId, :token, :createdAt)
 * ```
 */
export const createToken = new PreparedQuery<ICreateTokenParams,ICreateTokenResult>(createTokenIR);


/** 'RevokeToken' parameters type */
export interface IRevokeTokenParams {
  revokedAt: Date | null | void;
  token: string | null | void;
}

/** 'RevokeToken' return type */
export type IRevokeTokenResult = void;

/** 'RevokeToken' query type */
export interface IRevokeTokenQuery {
  params: IRevokeTokenParams;
  result: IRevokeTokenResult;
}

const revokeTokenIR: any = {"name":"RevokeToken","params":[{"name":"revokedAt","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":667,"b":675,"line":17,"col":30}]}},{"name":"token","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":690,"b":694,"line":17,"col":53}]}}],"usedParamSet":{"revokedAt":true,"token":true},"statement":{"body":"UPDATE tokens SET revoked_at=:revokedAt WHERE token=:token","loc":{"a":637,"b":694,"line":17,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * UPDATE tokens SET revoked_at=:revokedAt WHERE token=:token
 * ```
 */
export const revokeToken = new PreparedQuery<IRevokeTokenParams,IRevokeTokenResult>(revokeTokenIR);


/** 'FindToken' parameters type */
export interface IFindTokenParams {
  token: string | null | void;
}

/** 'FindToken' return type */
export interface IFindTokenResult {
  id: string;
  account_id: string;
  token: string;
  created_at: Date;
  revoked_at: Date | null;
}

/** 'FindToken' query type */
export interface IFindTokenQuery {
  params: IFindTokenParams;
  result: IFindTokenResult;
}

const findTokenIR: any = {"name":"findToken","params":[{"name":"token","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":757,"b":761,"line":20,"col":34}]}}],"usedParamSet":{"token":true},"statement":{"body":"SELECT * FROM tokens WHERE token=:token","loc":{"a":723,"b":761,"line":20,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM tokens WHERE token=:token
 * ```
 */
export const findToken = new PreparedQuery<IFindTokenParams,IFindTokenResult>(findTokenIR);


