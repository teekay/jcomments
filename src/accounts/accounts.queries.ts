/** Types generated for queries found in "src/accounts/accounts.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'Signup' parameters type */
export interface ISignupParams {
  id: string | null | void;
  username: string | null | void;
  email: string | null | void;
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

const signupIR: any = {"name":"Signup","params":[{"name":"id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":92,"b":93,"line":2,"col":73}]}},{"name":"username","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":97,"b":104,"line":2,"col":78}]}},{"name":"email","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":108,"b":112,"line":2,"col":89}]}},{"name":"password","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":123,"b":130,"line":2,"col":104}]}},{"name":"createdAt","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":151,"b":159,"line":2,"col":132}]}}],"usedParamSet":{"id":true,"username":true,"email":true,"password":true,"createdAt":true},"statement":{"body":"INSERT INTO accounts (id, username, email, password, created_at) VALUES(:id, :username, :email, digest(:password::text, 'sha256'), :createdAt)","loc":{"a":19,"b":160,"line":2,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO accounts (id, username, email, password, created_at) VALUES(:id, :username, :email, digest(:password::text, 'sha256'), :createdAt)
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

const initialAccountSettingsIR: any = {"name":"initialAccountSettings","params":[{"name":"id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":252,"b":253,"line":5,"col":53}]}},{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":257,"b":265,"line":5,"col":58}]}}],"usedParamSet":{"id":true,"accountId":true},"statement":{"body":"INSERT INTO account_settings(id, account_id) VALUES(:id, :accountId)","loc":{"a":199,"b":266,"line":5,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO account_settings(id, account_id) VALUES(:id, :accountId)
 * ```
 */
export const initialAccountSettings = new PreparedQuery<IInitialAccountSettingsParams,IInitialAccountSettingsResult>(initialAccountSettingsIR);


/** 'InitialAccountEmailSettings' parameters type */
export interface IInitialAccountEmailSettingsParams {
  id: string | null | void;
  accountId: string | null | void;
}

/** 'InitialAccountEmailSettings' return type */
export type IInitialAccountEmailSettingsResult = void;

/** 'InitialAccountEmailSettings' query type */
export interface IInitialAccountEmailSettingsQuery {
  params: IInitialAccountEmailSettingsParams;
  result: IInitialAccountEmailSettingsResult;
}

const initialAccountEmailSettingsIR: any = {"name":"initialAccountEmailSettings","params":[{"name":"id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":369,"b":370,"line":8,"col":59}]}},{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":374,"b":382,"line":8,"col":64}]}}],"usedParamSet":{"id":true,"accountId":true},"statement":{"body":"INSERT INTO account_email_settings(id, account_id) VALUES(:id, :accountId)","loc":{"a":310,"b":383,"line":8,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO account_email_settings(id, account_id) VALUES(:id, :accountId)
 * ```
 */
export const initialAccountEmailSettings = new PreparedQuery<IInitialAccountEmailSettingsParams,IInitialAccountEmailSettingsResult>(initialAccountEmailSettingsIR);


/** 'Login' parameters type */
export interface ILoginParams {
  username: string | null | void;
  password: string | null | void;
}

/** 'Login' return type */
export interface ILoginResult {
  id: string;
  username: string;
  email: string;
  password: Buffer;
  created_at: Date;
}

/** 'Login' query type */
export interface ILoginQuery {
  params: ILoginParams;
  result: ILoginResult;
}

const loginIR: any = {"name":"Login","params":[{"name":"username","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":444,"b":451,"line":11,"col":39}]}},{"name":"password","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":474,"b":481,"line":11,"col":69}]}}],"usedParamSet":{"username":true,"password":true},"statement":{"body":"SELECT * FROM accounts WHERE username=:username AND password=digest(:password::text, 'sha256')","loc":{"a":405,"b":498,"line":11,"col":0}}};

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
  email: string;
  password: Buffer;
  created_at: Date;
}

/** 'FindById' query type */
export interface IFindByIdQuery {
  params: IFindByIdParams;
  result: IFindByIdResult;
}

const findByIdIR: any = {"name":"findById","params":[{"name":"id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":556,"b":557,"line":14,"col":33}]}}],"usedParamSet":{"id":true},"statement":{"body":"SELECT * FROM accounts WHERE id=:id","loc":{"a":523,"b":557,"line":14,"col":0}}};

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
  email: string;
  password: Buffer;
  created_at: Date;
}

/** 'FindByUsername' query type */
export interface IFindByUsernameQuery {
  params: IFindByUsernameParams;
  result: IFindByUsernameResult;
}

const findByUsernameIR: any = {"name":"findByUsername","params":[{"name":"username","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":627,"b":634,"line":17,"col":39}]}}],"usedParamSet":{"username":true},"statement":{"body":"SELECT * FROM accounts WHERE username=:username","loc":{"a":588,"b":634,"line":17,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM accounts WHERE username=:username
 * ```
 */
export const findByUsername = new PreparedQuery<IFindByUsernameParams,IFindByUsernameResult>(findByUsernameIR);


/** 'FindByEmail' parameters type */
export interface IFindByEmailParams {
  email: string | null | void;
}

/** 'FindByEmail' return type */
export interface IFindByEmailResult {
  id: string;
  username: string;
  email: string;
  password: Buffer;
  created_at: Date;
}

/** 'FindByEmail' query type */
export interface IFindByEmailQuery {
  params: IFindByEmailParams;
  result: IFindByEmailResult;
}

const findByEmailIR: any = {"name":"findByEmail","params":[{"name":"email","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":698,"b":702,"line":20,"col":36}]}}],"usedParamSet":{"email":true},"statement":{"body":"SELECT * FROM accounts WHERE email=:email","loc":{"a":662,"b":702,"line":20,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM accounts WHERE email=:email
 * ```
 */
export const findByEmail = new PreparedQuery<IFindByEmailParams,IFindByEmailResult>(findByEmailIR);


/** 'LoginFromToken' parameters type */
export interface ILoginFromTokenParams {
  token: string | null | void;
}

/** 'LoginFromToken' return type */
export interface ILoginFromTokenResult {
  id: string;
  username: string;
  email: string;
  password: Buffer;
  created_at: Date;
}

/** 'LoginFromToken' query type */
export interface ILoginFromTokenQuery {
  params: ILoginFromTokenParams;
  result: ILoginFromTokenResult;
}

const loginFromTokenIR: any = {"name":"LoginFromToken","params":[{"name":"token","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":821,"b":825,"line":23,"col":88}]}}],"usedParamSet":{"token":true},"statement":{"body":"SELECT DISTINCT a.* FROM accounts a JOIN tokens t ON (a.id=t.account_id) WHERE t.token=:token AND t.revoked_at IS NULL","loc":{"a":733,"b":850,"line":23,"col":0}}};

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

const createTokenIR: any = {"name":"CreateToken","params":[{"name":"id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":942,"b":943,"line":26,"col":64}]}},{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":947,"b":955,"line":26,"col":69}]}},{"name":"token","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":959,"b":963,"line":26,"col":81}]}},{"name":"createdAt","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":967,"b":975,"line":26,"col":89}]}}],"usedParamSet":{"id":true,"accountId":true,"token":true,"createdAt":true},"statement":{"body":"INSERT INTO tokens (id, account_id, token, created_at) VALUES (:id, :accountId, :token, :createdAt)","loc":{"a":878,"b":976,"line":26,"col":0}}};

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

const revokeTokenIR: any = {"name":"RevokeToken","params":[{"name":"revokedAt","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1034,"b":1042,"line":29,"col":30}]}},{"name":"token","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1057,"b":1061,"line":29,"col":53}]}}],"usedParamSet":{"revokedAt":true,"token":true},"statement":{"body":"UPDATE tokens SET revoked_at=:revokedAt WHERE token=:token","loc":{"a":1004,"b":1061,"line":29,"col":0}}};

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

const findTokenIR: any = {"name":"findToken","params":[{"name":"token","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1121,"b":1125,"line":32,"col":34}]}}],"usedParamSet":{"token":true},"statement":{"body":"SELECT * FROM tokens WHERE token=:token","loc":{"a":1087,"b":1125,"line":32,"col":0}}};

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

const findCurrentTokenIR: any = {"name":"findCurrentToken","params":[{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1197,"b":1205,"line":35,"col":39}]}}],"usedParamSet":{"accountId":true},"statement":{"body":"SELECT * FROM tokens WHERE account_id=:accountId AND revoked_at IS NULL","loc":{"a":1158,"b":1228,"line":35,"col":0}}};

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

const accountSettingsIR: any = {"name":"accountSettings","params":[{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1309,"b":1317,"line":38,"col":49}]}}],"usedParamSet":{"accountId":true},"statement":{"body":"SELECT * FROM account_settings WHERE account_id=:accountId","loc":{"a":1260,"b":1317,"line":38,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM account_settings WHERE account_id=:accountId
 * ```
 */
export const accountSettings = new PreparedQuery<IAccountSettingsParams,IAccountSettingsResult>(accountSettingsIR);


/** 'AccountEmailSettings' parameters type */
export interface IAccountEmailSettingsParams {
  accountId: string | null | void;
}

/** 'AccountEmailSettings' return type */
export interface IAccountEmailSettingsResult {
  id: string;
  account_id: string;
  notify_on_comments: boolean | null;
  send_comments_digest: boolean | null;
}

/** 'AccountEmailSettings' query type */
export interface IAccountEmailSettingsQuery {
  params: IAccountEmailSettingsParams;
  result: IAccountEmailSettingsResult;
}

const accountEmailSettingsIR: any = {"name":"accountEmailSettings","params":[{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1409,"b":1417,"line":41,"col":55}]}}],"usedParamSet":{"accountId":true},"statement":{"body":"SELECT * FROM account_email_settings WHERE account_id=:accountId","loc":{"a":1354,"b":1417,"line":41,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM account_email_settings WHERE account_id=:accountId
 * ```
 */
export const accountEmailSettings = new PreparedQuery<IAccountEmailSettingsParams,IAccountEmailSettingsResult>(accountEmailSettingsIR);


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

const updateSettingsIR: any = {"name":"updateSettings","params":[{"name":"blogUrl","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1486,"b":1492,"line":44,"col":38}]}},{"name":"useAkismet","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1508,"b":1517,"line":44,"col":60}]}},{"name":"akismetKey","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1533,"b":1542,"line":44,"col":85}]}},{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1562,"b":1570,"line":44,"col":114}]}}],"usedParamSet":{"blogUrl":true,"useAkismet":true,"akismetKey":true,"accountId":true},"statement":{"body":"UPDATE account_settings SET blog_url=:blogUrl, use_akismet=:useAkismet, akismet_key=:akismetKey WHERE account_id=:accountId","loc":{"a":1448,"b":1570,"line":44,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * UPDATE account_settings SET blog_url=:blogUrl, use_akismet=:useAkismet, akismet_key=:akismetKey WHERE account_id=:accountId
 * ```
 */
export const updateSettings = new PreparedQuery<IUpdateSettingsParams,IUpdateSettingsResult>(updateSettingsIR);


/** 'UpdateEmailSettings' parameters type */
export interface IUpdateEmailSettingsParams {
  notifyOnComments: boolean | null | void;
  sendCommentsDigest: boolean | null | void;
  accountId: string | null | void;
}

/** 'UpdateEmailSettings' return type */
export type IUpdateEmailSettingsResult = void;

/** 'UpdateEmailSettings' query type */
export interface IUpdateEmailSettingsQuery {
  params: IUpdateEmailSettingsParams;
  result: IUpdateEmailSettingsResult;
}

const updateEmailSettingsIR: any = {"name":"updateEmailSettings","params":[{"name":"notifyOnComments","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1660,"b":1675,"line":47,"col":54}]}},{"name":"sendCommentsDigest","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1700,"b":1717,"line":47,"col":94}]}},{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1737,"b":1745,"line":47,"col":131}]}}],"usedParamSet":{"notifyOnComments":true,"sendCommentsDigest":true,"accountId":true},"statement":{"body":"UPDATE account_email_settings SET notify_on_comments=:notifyOnComments, send_comments_digest=:sendCommentsDigest WHERE account_id=:accountId","loc":{"a":1606,"b":1745,"line":47,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * UPDATE account_email_settings SET notify_on_comments=:notifyOnComments, send_comments_digest=:sendCommentsDigest WHERE account_id=:accountId
 * ```
 */
export const updateEmailSettings = new PreparedQuery<IUpdateEmailSettingsParams,IUpdateEmailSettingsResult>(updateEmailSettingsIR);


/** 'FindUserByEmailOrUsername' parameters type */
export interface IFindUserByEmailOrUsernameParams {
  username: string | null | void;
  email: string | null | void;
}

/** 'FindUserByEmailOrUsername' return type */
export interface IFindUserByEmailOrUsernameResult {
  id: string;
  username: string;
  email: string;
  password: Buffer;
  created_at: Date;
}

/** 'FindUserByEmailOrUsername' query type */
export interface IFindUserByEmailOrUsernameQuery {
  params: IFindUserByEmailOrUsernameParams;
  result: IFindUserByEmailOrUsernameResult;
}

const findUserByEmailOrUsernameIR: any = {"name":"findUserByEmailOrUsername","params":[{"name":"username","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1826,"b":1833,"line":50,"col":39}]}},{"name":"email","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1845,"b":1849,"line":50,"col":58}]}}],"usedParamSet":{"username":true,"email":true},"statement":{"body":"SELECT * FROM accounts WHERE username=:username OR email=:email","loc":{"a":1787,"b":1849,"line":50,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM accounts WHERE username=:username OR email=:email
 * ```
 */
export const findUserByEmailOrUsername = new PreparedQuery<IFindUserByEmailOrUsernameParams,IFindUserByEmailOrUsernameResult>(findUserByEmailOrUsernameIR);


/** 'ChangeAccountEmail' parameters type */
export interface IChangeAccountEmailParams {
  email: string | null | void;
  accountId: string | null | void;
}

/** 'ChangeAccountEmail' return type */
export type IChangeAccountEmailResult = void;

/** 'ChangeAccountEmail' query type */
export interface IChangeAccountEmailQuery {
  params: IChangeAccountEmailParams;
  result: IChangeAccountEmailResult;
}

const changeAccountEmailIR: any = {"name":"changeAccountEmail","params":[{"name":"email","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1911,"b":1915,"line":53,"col":27}]}},{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1927,"b":1935,"line":53,"col":43}]}}],"usedParamSet":{"email":true,"accountId":true},"statement":{"body":"UPDATE accounts SET email=:email WHERE id=:accountId","loc":{"a":1884,"b":1935,"line":53,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * UPDATE accounts SET email=:email WHERE id=:accountId
 * ```
 */
export const changeAccountEmail = new PreparedQuery<IChangeAccountEmailParams,IChangeAccountEmailResult>(changeAccountEmailIR);


