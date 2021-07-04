/** Types generated for queries found in "src/shared/accounts/accounts.sql" */
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

const createTokenIR: any = {"name":"CreateToken","params":[{"name":"id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":794,"b":795,"line":23,"col":64}]}},{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":799,"b":807,"line":23,"col":69}]}},{"name":"token","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":811,"b":815,"line":23,"col":81}]}},{"name":"createdAt","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":819,"b":827,"line":23,"col":89}]}}],"usedParamSet":{"id":true,"accountId":true,"token":true,"createdAt":true},"statement":{"body":"INSERT INTO tokens (id, account_id, token, created_at) VALUES (:id, :accountId, :token, :createdAt)","loc":{"a":730,"b":828,"line":23,"col":0}}};

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

const revokeTokenIR: any = {"name":"RevokeToken","params":[{"name":"revokedAt","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":886,"b":894,"line":26,"col":30}]}},{"name":"token","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":909,"b":913,"line":26,"col":53}]}}],"usedParamSet":{"revokedAt":true,"token":true},"statement":{"body":"UPDATE tokens SET revoked_at=:revokedAt WHERE token=:token","loc":{"a":856,"b":913,"line":26,"col":0}}};

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

const findTokenIR: any = {"name":"findToken","params":[{"name":"token","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":973,"b":977,"line":29,"col":34}]}}],"usedParamSet":{"token":true},"statement":{"body":"SELECT * FROM tokens WHERE token=:token","loc":{"a":939,"b":977,"line":29,"col":0}}};

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

const findCurrentTokenIR: any = {"name":"findCurrentToken","params":[{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1049,"b":1057,"line":32,"col":39}]}}],"usedParamSet":{"accountId":true},"statement":{"body":"SELECT * FROM tokens WHERE account_id=:accountId AND revoked_at IS NULL","loc":{"a":1010,"b":1080,"line":32,"col":0}}};

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
  require_moderation: boolean;
}

/** 'AccountSettings' query type */
export interface IAccountSettingsQuery {
  params: IAccountSettingsParams;
  result: IAccountSettingsResult;
}

const accountSettingsIR: any = {"name":"accountSettings","params":[{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1161,"b":1169,"line":35,"col":49}]}}],"usedParamSet":{"accountId":true},"statement":{"body":"SELECT * FROM account_settings WHERE account_id=:accountId","loc":{"a":1112,"b":1169,"line":35,"col":0}}};

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

const accountEmailSettingsIR: any = {"name":"accountEmailSettings","params":[{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1261,"b":1269,"line":38,"col":55}]}}],"usedParamSet":{"accountId":true},"statement":{"body":"SELECT * FROM account_email_settings WHERE account_id=:accountId","loc":{"a":1206,"b":1269,"line":38,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM account_email_settings WHERE account_id=:accountId
 * ```
 */
export const accountEmailSettings = new PreparedQuery<IAccountEmailSettingsParams,IAccountEmailSettingsResult>(accountEmailSettingsIR);


/** 'UpdateSettings' parameters type */
export interface IUpdateSettingsParams {
  requireModeration: boolean | null | void;
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

const updateSettingsIR: any = {"name":"updateSettings","params":[{"name":"requireModeration","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1348,"b":1364,"line":41,"col":48}]}},{"name":"blogUrl","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1377,"b":1383,"line":41,"col":77}]}},{"name":"useAkismet","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1399,"b":1408,"line":41,"col":99}]}},{"name":"akismetKey","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1424,"b":1433,"line":41,"col":124}]}},{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1453,"b":1461,"line":41,"col":153}]}}],"usedParamSet":{"requireModeration":true,"blogUrl":true,"useAkismet":true,"akismetKey":true,"accountId":true},"statement":{"body":"UPDATE account_settings SET require_moderation=:requireModeration, blog_url=:blogUrl, use_akismet=:useAkismet, akismet_key=:akismetKey WHERE account_id=:accountId","loc":{"a":1300,"b":1461,"line":41,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * UPDATE account_settings SET require_moderation=:requireModeration, blog_url=:blogUrl, use_akismet=:useAkismet, akismet_key=:akismetKey WHERE account_id=:accountId
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

const updateEmailSettingsIR: any = {"name":"updateEmailSettings","params":[{"name":"notifyOnComments","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1551,"b":1566,"line":44,"col":54}]}},{"name":"sendCommentsDigest","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1591,"b":1608,"line":44,"col":94}]}},{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1628,"b":1636,"line":44,"col":131}]}}],"usedParamSet":{"notifyOnComments":true,"sendCommentsDigest":true,"accountId":true},"statement":{"body":"UPDATE account_email_settings SET notify_on_comments=:notifyOnComments, send_comments_digest=:sendCommentsDigest WHERE account_id=:accountId","loc":{"a":1497,"b":1636,"line":44,"col":0}}};

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

const findUserByEmailOrUsernameIR: any = {"name":"findUserByEmailOrUsername","params":[{"name":"username","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1717,"b":1724,"line":47,"col":39}]}},{"name":"email","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1736,"b":1740,"line":47,"col":58}]}}],"usedParamSet":{"username":true,"email":true},"statement":{"body":"SELECT * FROM accounts WHERE username=:username OR email=:email","loc":{"a":1678,"b":1740,"line":47,"col":0}}};

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

const changeAccountEmailIR: any = {"name":"changeAccountEmail","params":[{"name":"email","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1802,"b":1806,"line":50,"col":27}]}},{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1818,"b":1826,"line":50,"col":43}]}}],"usedParamSet":{"email":true,"accountId":true},"statement":{"body":"UPDATE accounts SET email=:email WHERE id=:accountId","loc":{"a":1775,"b":1826,"line":50,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * UPDATE accounts SET email=:email WHERE id=:accountId
 * ```
 */
export const changeAccountEmail = new PreparedQuery<IChangeAccountEmailParams,IChangeAccountEmailResult>(changeAccountEmailIR);


/** 'DeleteSettings' parameters type */
export interface IDeleteSettingsParams {
  accountId: string | null | void;
}

/** 'DeleteSettings' return type */
export type IDeleteSettingsResult = void;

/** 'DeleteSettings' query type */
export interface IDeleteSettingsQuery {
  params: IDeleteSettingsParams;
  result: IDeleteSettingsResult;
}

const deleteSettingsIR: any = {"name":"deleteSettings","params":[{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1904,"b":1912,"line":53,"col":47}]}}],"usedParamSet":{"accountId":true},"statement":{"body":"DELETE FROM account_settings WHERE account_id=:accountId","loc":{"a":1857,"b":1912,"line":53,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM account_settings WHERE account_id=:accountId
 * ```
 */
export const deleteSettings = new PreparedQuery<IDeleteSettingsParams,IDeleteSettingsResult>(deleteSettingsIR);


/** 'DeleteEmailSettings' parameters type */
export interface IDeleteEmailSettingsParams {
  accountId: string | null | void;
}

/** 'DeleteEmailSettings' return type */
export type IDeleteEmailSettingsResult = void;

/** 'DeleteEmailSettings' query type */
export interface IDeleteEmailSettingsQuery {
  params: IDeleteEmailSettingsParams;
  result: IDeleteEmailSettingsResult;
}

const deleteEmailSettingsIR: any = {"name":"deleteEmailSettings","params":[{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":2001,"b":2009,"line":56,"col":53}]}}],"usedParamSet":{"accountId":true},"statement":{"body":"DELETE FROM account_email_settings WHERE account_id=:accountId","loc":{"a":1948,"b":2009,"line":56,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM account_email_settings WHERE account_id=:accountId
 * ```
 */
export const deleteEmailSettings = new PreparedQuery<IDeleteEmailSettingsParams,IDeleteEmailSettingsResult>(deleteEmailSettingsIR);


/** 'DeleteTokens' parameters type */
export interface IDeleteTokensParams {
  accountId: string | null | void;
}

/** 'DeleteTokens' return type */
export type IDeleteTokensResult = void;

/** 'DeleteTokens' query type */
export interface IDeleteTokensQuery {
  params: IDeleteTokensParams;
  result: IDeleteTokensResult;
}

const deleteTokensIR: any = {"name":"deleteTokens","params":[{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":2075,"b":2083,"line":59,"col":37}]}}],"usedParamSet":{"accountId":true},"statement":{"body":"DELETE FROM tokens WHERE account_id=:accountId","loc":{"a":2038,"b":2083,"line":59,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM tokens WHERE account_id=:accountId
 * ```
 */
export const deleteTokens = new PreparedQuery<IDeleteTokensParams,IDeleteTokensResult>(deleteTokensIR);


/** 'CloseAccount' parameters type */
export interface ICloseAccountParams {
  accountId: string | null | void;
}

/** 'CloseAccount' return type */
export type ICloseAccountResult = void;

/** 'CloseAccount' query type */
export interface ICloseAccountQuery {
  params: ICloseAccountParams;
  result: ICloseAccountResult;
}

const closeAccountIR: any = {"name":"closeAccount","params":[{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":2143,"b":2151,"line":62,"col":31}]}}],"usedParamSet":{"accountId":true},"statement":{"body":"DELETE FROM accounts WHERE id=:accountId","loc":{"a":2112,"b":2151,"line":62,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM accounts WHERE id=:accountId
 * ```
 */
export const closeAccount = new PreparedQuery<ICloseAccountParams,ICloseAccountResult>(closeAccountIR);


