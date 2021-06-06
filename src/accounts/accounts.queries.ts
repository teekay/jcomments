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


/** 'InitialAccountSettings' parameters type */
export interface IInitialAccountSettingsParams {
  id: string | null | void;
  accountId: string | null | void;
}

/** 'InitialAccountSettings' return type */
export type IInitialAccountSettingsResult = void;

/** 'InitialAccountSettings' query type */
export interface IInitialAccountSettingsQuery {
  params: IInitialAccountSettingsParams;
  result: IInitialAccountSettingsResult;
}

const initialAccountSettingsIR: any = {"name":"initialAccountSettings","params":[{"name":"id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":237,"b":238,"line":5,"col":53}]}},{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":242,"b":250,"line":5,"col":58}]}}],"usedParamSet":{"id":true,"accountId":true},"statement":{"body":"INSERT INTO account_settings(id, account_id) VALUES(:id, :accountId)","loc":{"a":184,"b":251,"line":5,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO account_settings(id, account_id) VALUES(:id, :accountId)
 * ```
 */
export const initialAccountSettings = new PreparedQuery<IInitialAccountSettingsParams,IInitialAccountSettingsResult>(initialAccountSettingsIR);


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

const loginIR: any = {"name":"Login","params":[{"name":"username","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":312,"b":319,"line":8,"col":39}]}},{"name":"password","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":342,"b":349,"line":8,"col":69}]}}],"usedParamSet":{"username":true,"password":true},"statement":{"body":"SELECT * FROM accounts WHERE username=:username AND password=digest(:password::text, 'sha256')","loc":{"a":273,"b":366,"line":8,"col":0}}};

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

const findByIdIR: any = {"name":"findById","params":[{"name":"id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":424,"b":425,"line":11,"col":33}]}}],"usedParamSet":{"id":true},"statement":{"body":"SELECT * FROM accounts WHERE id=:id","loc":{"a":391,"b":425,"line":11,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM accounts WHERE id=:id
 * ```
 */
export const findById = new PreparedQuery<IFindByIdParams,IFindByIdResult>(findByIdIR);


/** 'FindByUsername' parameters type */
export interface IFindByUsernameParams {
  username: string | null | void;
}

/** 'FindByUsername' return type */
export interface IFindByUsernameResult {
  id: string;
  username: string;
  password: Buffer;
  created_at: Date;
}

/** 'FindByUsername' query type */
export interface IFindByUsernameQuery {
  params: IFindByUsernameParams;
  result: IFindByUsernameResult;
}

const findByUsernameIR: any = {"name":"findByUsername","params":[{"name":"username","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":495,"b":502,"line":14,"col":39}]}}],"usedParamSet":{"username":true},"statement":{"body":"SELECT * FROM accounts WHERE username=:username","loc":{"a":456,"b":502,"line":14,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM accounts WHERE username=:username
 * ```
 */
export const findByUsername = new PreparedQuery<IFindByUsernameParams,IFindByUsernameResult>(findByUsernameIR);


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

const loginFromTokenIR: any = {"name":"LoginFromToken","params":[{"name":"token","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":621,"b":625,"line":17,"col":88}]}}],"usedParamSet":{"token":true},"statement":{"body":"SELECT DISTINCT a.* FROM accounts a JOIN tokens t ON (a.id=t.account_id) WHERE t.token=:token AND t.revoked_at IS NULL","loc":{"a":533,"b":650,"line":17,"col":0}}};

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

const createTokenIR: any = {"name":"CreateToken","params":[{"name":"id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":742,"b":743,"line":20,"col":64}]}},{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":747,"b":755,"line":20,"col":69}]}},{"name":"token","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":759,"b":763,"line":20,"col":81}]}},{"name":"createdAt","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":767,"b":775,"line":20,"col":89}]}}],"usedParamSet":{"id":true,"accountId":true,"token":true,"createdAt":true},"statement":{"body":"INSERT INTO tokens (id, account_id, token, created_at) VALUES (:id, :accountId, :token, :createdAt)","loc":{"a":678,"b":776,"line":20,"col":0}}};

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

const revokeTokenIR: any = {"name":"RevokeToken","params":[{"name":"revokedAt","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":834,"b":842,"line":23,"col":30}]}},{"name":"token","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":857,"b":861,"line":23,"col":53}]}}],"usedParamSet":{"revokedAt":true,"token":true},"statement":{"body":"UPDATE tokens SET revoked_at=:revokedAt WHERE token=:token","loc":{"a":804,"b":861,"line":23,"col":0}}};

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

const findTokenIR: any = {"name":"findToken","params":[{"name":"token","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":921,"b":925,"line":26,"col":34}]}}],"usedParamSet":{"token":true},"statement":{"body":"SELECT * FROM tokens WHERE token=:token","loc":{"a":887,"b":925,"line":26,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM tokens WHERE token=:token
 * ```
 */
export const findToken = new PreparedQuery<IFindTokenParams,IFindTokenResult>(findTokenIR);


/** 'FindCurrentToken' parameters type */
export interface IFindCurrentTokenParams {
  accountId: string | null | void;
}

/** 'FindCurrentToken' return type */
export interface IFindCurrentTokenResult {
  id: string;
  account_id: string;
  token: string;
  created_at: Date;
  revoked_at: Date | null;
}

/** 'FindCurrentToken' query type */
export interface IFindCurrentTokenQuery {
  params: IFindCurrentTokenParams;
  result: IFindCurrentTokenResult;
}

const findCurrentTokenIR: any = {"name":"findCurrentToken","params":[{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":997,"b":1005,"line":29,"col":39}]}}],"usedParamSet":{"accountId":true},"statement":{"body":"SELECT * FROM tokens WHERE account_id=:accountId AND revoked_at IS NULL","loc":{"a":958,"b":1028,"line":29,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM tokens WHERE account_id=:accountId AND revoked_at IS NULL
 * ```
 */
export const findCurrentToken = new PreparedQuery<IFindCurrentTokenParams,IFindCurrentTokenResult>(findCurrentTokenIR);


/** 'AccountSettings' parameters type */
export interface IAccountSettingsParams {
  accountId: string | null | void;
}

/** 'AccountSettings' return type */
export interface IAccountSettingsResult {
  id: string;
  account_id: string;
  blog_url: string | null;
  akismet_key: string | null;
  use_akismet: boolean | null;
}

/** 'AccountSettings' query type */
export interface IAccountSettingsQuery {
  params: IAccountSettingsParams;
  result: IAccountSettingsResult;
}

const accountSettingsIR: any = {"name":"accountSettings","params":[{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1109,"b":1117,"line":32,"col":49}]}}],"usedParamSet":{"accountId":true},"statement":{"body":"SELECT * FROM account_settings WHERE account_id=:accountId","loc":{"a":1060,"b":1117,"line":32,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM account_settings WHERE account_id=:accountId
 * ```
 */
export const accountSettings = new PreparedQuery<IAccountSettingsParams,IAccountSettingsResult>(accountSettingsIR);


/** 'UpdateSettings' parameters type */
export interface IUpdateSettingsParams {
  blogUrl: string | null | void;
  useAkismet: boolean | null | void;
  akismetKey: string | null | void;
  accountId: string | null | void;
}

/** 'UpdateSettings' return type */
export type IUpdateSettingsResult = void;

/** 'UpdateSettings' query type */
export interface IUpdateSettingsQuery {
  params: IUpdateSettingsParams;
  result: IUpdateSettingsResult;
}

const updateSettingsIR: any = {"name":"updateSettings","params":[{"name":"blogUrl","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1186,"b":1192,"line":35,"col":38}]}},{"name":"useAkismet","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1208,"b":1217,"line":35,"col":60}]}},{"name":"akismetKey","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1233,"b":1242,"line":35,"col":85}]}},{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1262,"b":1270,"line":35,"col":114}]}}],"usedParamSet":{"blogUrl":true,"useAkismet":true,"akismetKey":true,"accountId":true},"statement":{"body":"UPDATE account_settings SET blog_url=:blogUrl, use_akismet=:useAkismet, akismet_key=:akismetKey WHERE account_id=:accountId","loc":{"a":1148,"b":1270,"line":35,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * UPDATE account_settings SET blog_url=:blogUrl, use_akismet=:useAkismet, akismet_key=:akismetKey WHERE account_id=:accountId
 * ```
 */
export const updateSettings = new PreparedQuery<IUpdateSettingsParams,IUpdateSettingsResult>(updateSettingsIR);


