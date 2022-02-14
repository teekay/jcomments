/** Types generated for queries found in "src/shared/comments/comments.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'PostCommentForUrl' parameters type */
export interface IPostCommentForUrlParams {
  accountId: string | null | void;
  email: string | null | void;
  id: string | null | void;
  name: string | null | void;
  pageTitle: string | null | void;
  text: string | null | void;
  url: string | null | void;
  website: string | null | void;
}

/** 'PostCommentForUrl' return type */
export type IPostCommentForUrlResult = void;

/** 'PostCommentForUrl' query type */
export interface IPostCommentForUrlQuery {
  params: IPostCommentForUrlParams;
  result: IPostCommentForUrlResult;
}

const postCommentForUrlIR: any = {"name":"PostCommentForUrl","params":[{"name":"id","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":161,"b":162,"line":2,"col":131}]}},{"name":"accountId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":166,"b":174,"line":2,"col":136}]}},{"name":"url","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":178,"b":180,"line":2,"col":148}]}},{"name":"pageTitle","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":184,"b":192,"line":2,"col":154}]}},{"name":"text","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":196,"b":199,"line":2,"col":166}]}},{"name":"name","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":203,"b":206,"line":2,"col":173}]}},{"name":"email","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":210,"b":214,"line":2,"col":180}]}},{"name":"website","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":218,"b":224,"line":2,"col":188}]}}],"usedParamSet":{"id":true,"accountId":true,"url":true,"pageTitle":true,"text":true,"name":true,"email":true,"website":true},"statement":{"body":"INSERT INTO comments(id, account_id, page_url, page_title, comment, reader_name, reader_email, reader_website, created_at) VALUES(:id, :accountId, :url, :pageTitle, :text, :name, :email, :website, 'now'::timestamp)","loc":{"a":30,"b":243,"line":2,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO comments(id, account_id, page_url, page_title, comment, reader_name, reader_email, reader_website, created_at) VALUES(:id, :accountId, :url, :pageTitle, :text, :name, :email, :website, 'now'::timestamp)
 * ```
 */
export const postCommentForUrl = new PreparedQuery<IPostCommentForUrlParams,IPostCommentForUrlResult>(postCommentForUrlIR);


/** 'PostCommentForUrlWithTimestamp' parameters type */
export interface IPostCommentForUrlWithTimestampParams {
  accountId: string | null | void;
  createdAt: Date | null | void;
  email: string | null | void;
  id: string | null | void;
  name: string | null | void;
  pageTitle: string | null | void;
  text: string | null | void;
  url: string | null | void;
  website: string | null | void;
}

/** 'PostCommentForUrlWithTimestamp' return type */
export type IPostCommentForUrlWithTimestampResult = void;

/** 'PostCommentForUrlWithTimestamp' query type */
export interface IPostCommentForUrlWithTimestampQuery {
  params: IPostCommentForUrlWithTimestampParams;
  result: IPostCommentForUrlWithTimestampResult;
}

const postCommentForUrlWithTimestampIR: any = {"name":"PostCommentForUrlWithTimestamp","params":[{"name":"id","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":421,"b":422,"line":5,"col":131}]}},{"name":"accountId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":426,"b":434,"line":5,"col":136}]}},{"name":"url","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":438,"b":440,"line":5,"col":148}]}},{"name":"pageTitle","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":444,"b":452,"line":5,"col":154}]}},{"name":"text","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":456,"b":459,"line":5,"col":166}]}},{"name":"name","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":463,"b":466,"line":5,"col":173}]}},{"name":"email","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":470,"b":474,"line":5,"col":180}]}},{"name":"website","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":478,"b":484,"line":5,"col":188}]}},{"name":"createdAt","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":488,"b":496,"line":5,"col":198}]}}],"usedParamSet":{"id":true,"accountId":true,"url":true,"pageTitle":true,"text":true,"name":true,"email":true,"website":true,"createdAt":true},"statement":{"body":"INSERT INTO comments(id, account_id, page_url, page_title, comment, reader_name, reader_email, reader_website, created_at) VALUES(:id, :accountId, :url, :pageTitle, :text, :name, :email, :website, :createdAt)","loc":{"a":290,"b":497,"line":5,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO comments(id, account_id, page_url, page_title, comment, reader_name, reader_email, reader_website, created_at) VALUES(:id, :accountId, :url, :pageTitle, :text, :name, :email, :website, :createdAt)
 * ```
 */
export const postCommentForUrlWithTimestamp = new PreparedQuery<IPostCommentForUrlWithTimestampParams,IPostCommentForUrlWithTimestampResult>(postCommentForUrlWithTimestampIR);


/** 'FlagCommentForUrl' parameters type */
export interface IFlagCommentForUrlParams {
  accountId: string | null | void;
  email: string | null | void;
  id: string | null | void;
  name: string | null | void;
  pageTitle: string | null | void;
  text: string | null | void;
  url: string | null | void;
  website: string | null | void;
}

/** 'FlagCommentForUrl' return type */
export type IFlagCommentForUrlResult = void;

/** 'FlagCommentForUrl' query type */
export interface IFlagCommentForUrlQuery {
  params: IFlagCommentForUrlParams;
  result: IFlagCommentForUrlResult;
}

const flagCommentForUrlIR: any = {"name":"FlagCommentForUrl","params":[{"name":"id","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":661,"b":662,"line":8,"col":130}]}},{"name":"accountId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":666,"b":674,"line":8,"col":135}]}},{"name":"url","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":678,"b":680,"line":8,"col":147}]}},{"name":"pageTitle","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":683,"b":691,"line":8,"col":152}]}},{"name":"text","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":695,"b":698,"line":8,"col":164}]}},{"name":"name","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":702,"b":705,"line":8,"col":171}]}},{"name":"email","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":709,"b":713,"line":8,"col":178}]}},{"name":"website","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":717,"b":723,"line":8,"col":186}]}}],"usedParamSet":{"id":true,"accountId":true,"url":true,"pageTitle":true,"text":true,"name":true,"email":true,"website":true},"statement":{"body":"INSERT INTO reviews(id, account_id, page_url, page_title, comment, reader_name, reader_email, reader_website, created_at) VALUES(:id, :accountId, :url,:pageTitle, :text, :name, :email, :website, 'now'::timestamp)","loc":{"a":531,"b":742,"line":8,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO reviews(id, account_id, page_url, page_title, comment, reader_name, reader_email, reader_website, created_at) VALUES(:id, :accountId, :url,:pageTitle, :text, :name, :email, :website, 'now'::timestamp)
 * ```
 */
export const flagCommentForUrl = new PreparedQuery<IFlagCommentForUrlParams,IFlagCommentForUrlResult>(flagCommentForUrlIR);


/** 'FlagCommentForUrlWithTimestamp' parameters type */
export interface IFlagCommentForUrlWithTimestampParams {
  accountId: string | null | void;
  createdAt: Date | null | void;
  email: string | null | void;
  id: string | null | void;
  name: string | null | void;
  pageTitle: string | null | void;
  text: string | null | void;
  url: string | null | void;
  website: string | null | void;
}

/** 'FlagCommentForUrlWithTimestamp' return type */
export type IFlagCommentForUrlWithTimestampResult = void;

/** 'FlagCommentForUrlWithTimestamp' query type */
export interface IFlagCommentForUrlWithTimestampQuery {
  params: IFlagCommentForUrlWithTimestampParams;
  result: IFlagCommentForUrlWithTimestampResult;
}

const flagCommentForUrlWithTimestampIR: any = {"name":"FlagCommentForUrlWithTimestamp","params":[{"name":"id","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":919,"b":920,"line":11,"col":130}]}},{"name":"accountId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":924,"b":932,"line":11,"col":135}]}},{"name":"url","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":936,"b":938,"line":11,"col":147}]}},{"name":"pageTitle","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":941,"b":949,"line":11,"col":152}]}},{"name":"text","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":953,"b":956,"line":11,"col":164}]}},{"name":"name","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":960,"b":963,"line":11,"col":171}]}},{"name":"email","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":967,"b":971,"line":11,"col":178}]}},{"name":"website","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":975,"b":981,"line":11,"col":186}]}},{"name":"createdAt","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":985,"b":993,"line":11,"col":196}]}}],"usedParamSet":{"id":true,"accountId":true,"url":true,"pageTitle":true,"text":true,"name":true,"email":true,"website":true,"createdAt":true},"statement":{"body":"INSERT INTO reviews(id, account_id, page_url, page_title, comment, reader_name, reader_email, reader_website, created_at) VALUES(:id, :accountId, :url,:pageTitle, :text, :name, :email, :website, :createdAt)","loc":{"a":789,"b":994,"line":11,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO reviews(id, account_id, page_url, page_title, comment, reader_name, reader_email, reader_website, created_at) VALUES(:id, :accountId, :url,:pageTitle, :text, :name, :email, :website, :createdAt)
 * ```
 */
export const flagCommentForUrlWithTimestamp = new PreparedQuery<IFlagCommentForUrlWithTimestampParams,IFlagCommentForUrlWithTimestampResult>(flagCommentForUrlWithTimestampIR);


/** 'CommentCountForAccount' parameters type */
export interface ICommentCountForAccountParams {
  accountId: string | null | void;
}

/** 'CommentCountForAccount' return type */
export interface ICommentCountForAccountResult {
  Total: string | null;
}

/** 'CommentCountForAccount' query type */
export interface ICommentCountForAccountQuery {
  params: ICommentCountForAccountParams;
  result: ICommentCountForAccountResult;
}

const commentCountForAccountIR: any = {"name":"CommentCountForAccount","params":[{"name":"accountId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1092,"b":1100,"line":14,"col":59}]}}],"usedParamSet":{"accountId":true},"statement":{"body":"SELECT COUNT(*) as \"Total\" FROM comments WHERE account_id=:accountId","loc":{"a":1033,"b":1100,"line":14,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT COUNT(*) as "Total" FROM comments WHERE account_id=:accountId
 * ```
 */
export const commentCountForAccount = new PreparedQuery<ICommentCountForAccountParams,ICommentCountForAccountResult>(commentCountForAccountIR);


/** 'ReviewCountForAccount' parameters type */
export interface IReviewCountForAccountParams {
  accountId: string | null | void;
}

/** 'ReviewCountForAccount' return type */
export interface IReviewCountForAccountResult {
  Total: string | null;
}

/** 'ReviewCountForAccount' query type */
export interface IReviewCountForAccountQuery {
  params: IReviewCountForAccountParams;
  result: IReviewCountForAccountResult;
}

const reviewCountForAccountIR: any = {"name":"ReviewCountForAccount","params":[{"name":"accountId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1196,"b":1204,"line":17,"col":58}]}}],"usedParamSet":{"accountId":true},"statement":{"body":"SELECT COUNT(*) as \"Total\" FROM reviews WHERE account_id=:accountId","loc":{"a":1138,"b":1204,"line":17,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT COUNT(*) as "Total" FROM reviews WHERE account_id=:accountId
 * ```
 */
export const reviewCountForAccount = new PreparedQuery<IReviewCountForAccountParams,IReviewCountForAccountResult>(reviewCountForAccountIR);


/** 'FindByIdForAccount' parameters type */
export interface IFindByIdForAccountParams {
  accountId: string | null | void;
  id: string | null | void;
}

/** 'FindByIdForAccount' return type */
export interface IFindByIdForAccountResult {
  account_id: string;
  comment: string;
  created_at: Date;
  id: string;
  page_title: string | null;
  page_url: string;
  reader_email: string | null;
  reader_name: string;
  reader_website: string | null;
}

/** 'FindByIdForAccount' query type */
export interface IFindByIdForAccountQuery {
  params: IFindByIdForAccountParams;
  result: IFindByIdForAccountResult;
}

const findByIdForAccountIR: any = {"name":"FindByIdForAccount","params":[{"name":"accountId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1280,"b":1288,"line":20,"col":41}]}},{"name":"id","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1298,"b":1299,"line":20,"col":59}]}}],"usedParamSet":{"accountId":true,"id":true},"statement":{"body":"SELECT * FROM comments WHERE account_id=:accountId AND id=:id","loc":{"a":1239,"b":1299,"line":20,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM comments WHERE account_id=:accountId AND id=:id
 * ```
 */
export const findByIdForAccount = new PreparedQuery<IFindByIdForAccountParams,IFindByIdForAccountResult>(findByIdForAccountIR);


/** 'CommentsForAccount' parameters type */
export interface ICommentsForAccountParams {
  accountId: string | null | void;
}

/** 'CommentsForAccount' return type */
export interface ICommentsForAccountResult {
  account_id: string;
  comment: string;
  created_at: Date;
  id: string;
  page_title: string | null;
  page_url: string;
  reader_email: string | null;
  reader_name: string;
  reader_website: string | null;
}

/** 'CommentsForAccount' query type */
export interface ICommentsForAccountQuery {
  params: ICommentsForAccountParams;
  result: ICommentsForAccountResult;
}

const commentsForAccountIR: any = {"name":"CommentsForAccount","params":[{"name":"accountId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1375,"b":1383,"line":23,"col":41}]}}],"usedParamSet":{"accountId":true},"statement":{"body":"SELECT * FROM comments WHERE account_id=:accountId ORDER BY created_at DESC","loc":{"a":1334,"b":1408,"line":23,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM comments WHERE account_id=:accountId ORDER BY created_at DESC
 * ```
 */
export const commentsForAccount = new PreparedQuery<ICommentsForAccountParams,ICommentsForAccountResult>(commentsForAccountIR);


/** 'CommentsForAccountPaged' parameters type */
export interface ICommentsForAccountPagedParams {
  accountId: string | null | void;
  limit: string | null | void;
  offset: string | null | void;
}

/** 'CommentsForAccountPaged' return type */
export interface ICommentsForAccountPagedResult {
  account_id: string;
  comment: string;
  created_at: Date;
  id: string;
  page_title: string | null;
  page_url: string;
  reader_email: string | null;
  reader_name: string;
  reader_website: string | null;
}

/** 'CommentsForAccountPaged' query type */
export interface ICommentsForAccountPagedQuery {
  params: ICommentsForAccountPagedParams;
  result: ICommentsForAccountPagedResult;
}

const commentsForAccountPagedIR: any = {"name":"CommentsForAccountPaged","params":[{"name":"accountId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1489,"b":1497,"line":26,"col":41}]}},{"name":"limit","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1531,"b":1535,"line":26,"col":83}]}},{"name":"offset","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1545,"b":1550,"line":26,"col":97}]}}],"usedParamSet":{"accountId":true,"limit":true,"offset":true},"statement":{"body":"SELECT * FROM comments WHERE account_id=:accountId ORDER BY created_at DESC LIMIT :limit OFFSET :offset","loc":{"a":1448,"b":1550,"line":26,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM comments WHERE account_id=:accountId ORDER BY created_at DESC LIMIT :limit OFFSET :offset
 * ```
 */
export const commentsForAccountPaged = new PreparedQuery<ICommentsForAccountPagedParams,ICommentsForAccountPagedResult>(commentsForAccountPagedIR);


/** 'FindSpamByIdForAccount' parameters type */
export interface IFindSpamByIdForAccountParams {
  accountId: string | null | void;
  id: string | null | void;
}

/** 'FindSpamByIdForAccount' return type */
export interface IFindSpamByIdForAccountResult {
  account_id: string;
  comment: string;
  created_at: Date;
  id: string;
  page_title: string | null;
  page_url: string;
  reader_email: string | null;
  reader_name: string;
  reader_website: string | null;
}

/** 'FindSpamByIdForAccount' query type */
export interface IFindSpamByIdForAccountQuery {
  params: IFindSpamByIdForAccountParams;
  result: IFindSpamByIdForAccountResult;
}

const findSpamByIdForAccountIR: any = {"name":"FindSpamByIdForAccount","params":[{"name":"accountId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1629,"b":1637,"line":29,"col":40}]}},{"name":"id","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1647,"b":1648,"line":29,"col":58}]}}],"usedParamSet":{"accountId":true,"id":true},"statement":{"body":"SELECT * FROM reviews WHERE account_id=:accountId AND id=:id","loc":{"a":1589,"b":1648,"line":29,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM reviews WHERE account_id=:accountId AND id=:id
 * ```
 */
export const findSpamByIdForAccount = new PreparedQuery<IFindSpamByIdForAccountParams,IFindSpamByIdForAccountResult>(findSpamByIdForAccountIR);


/** 'ReviewsForAccount' parameters type */
export interface IReviewsForAccountParams {
  accountId: string | null | void;
}

/** 'ReviewsForAccount' return type */
export interface IReviewsForAccountResult {
  account_id: string;
  comment: string;
  created_at: Date;
  id: string;
  page_title: string | null;
  page_url: string;
  reader_email: string | null;
  reader_name: string;
  reader_website: string | null;
}

/** 'ReviewsForAccount' query type */
export interface IReviewsForAccountQuery {
  params: IReviewsForAccountParams;
  result: IReviewsForAccountResult;
}

const reviewsForAccountIR: any = {"name":"ReviewsForAccount","params":[{"name":"accountId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1722,"b":1730,"line":32,"col":40}]}}],"usedParamSet":{"accountId":true},"statement":{"body":"SELECT * FROM reviews WHERE account_id=:accountId ORDER BY created_at DESC","loc":{"a":1682,"b":1755,"line":32,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM reviews WHERE account_id=:accountId ORDER BY created_at DESC
 * ```
 */
export const reviewsForAccount = new PreparedQuery<IReviewsForAccountParams,IReviewsForAccountResult>(reviewsForAccountIR);


/** 'ReviewsForAccountPaged' parameters type */
export interface IReviewsForAccountPagedParams {
  accountId: string | null | void;
  limit: string | null | void;
  offset: string | null | void;
}

/** 'ReviewsForAccountPaged' return type */
export interface IReviewsForAccountPagedResult {
  account_id: string;
  comment: string;
  created_at: Date;
  id: string;
  page_title: string | null;
  page_url: string;
  reader_email: string | null;
  reader_name: string;
  reader_website: string | null;
}

/** 'ReviewsForAccountPaged' query type */
export interface IReviewsForAccountPagedQuery {
  params: IReviewsForAccountPagedParams;
  result: IReviewsForAccountPagedResult;
}

const reviewsForAccountPagedIR: any = {"name":"ReviewsForAccountPaged","params":[{"name":"accountId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1834,"b":1842,"line":35,"col":40}]}},{"name":"limit","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1876,"b":1880,"line":35,"col":82}]}},{"name":"offset","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1890,"b":1895,"line":35,"col":96}]}}],"usedParamSet":{"accountId":true,"limit":true,"offset":true},"statement":{"body":"SELECT * FROM reviews WHERE account_id=:accountId ORDER BY created_at DESC LIMIT :limit OFFSET :offset","loc":{"a":1794,"b":1895,"line":35,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM reviews WHERE account_id=:accountId ORDER BY created_at DESC LIMIT :limit OFFSET :offset
 * ```
 */
export const reviewsForAccountPaged = new PreparedQuery<IReviewsForAccountPagedParams,IReviewsForAccountPagedResult>(reviewsForAccountPagedIR);


/** 'CommentsForUrl' parameters type */
export interface ICommentsForUrlParams {
  accountId: string | null | void;
  url: string | null | void;
}

/** 'CommentsForUrl' return type */
export interface ICommentsForUrlResult {
  account_id: string;
  comment: string;
  created_at: Date;
  id: string;
  page_title: string | null;
  page_url: string;
  reader_email: string | null;
  reader_name: string;
  reader_website: string | null;
}

/** 'CommentsForUrl' query type */
export interface ICommentsForUrlQuery {
  params: ICommentsForUrlParams;
  result: ICommentsForUrlResult;
}

const commentsForUrlIR: any = {"name":"CommentsForUrl","params":[{"name":"accountId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1967,"b":1975,"line":38,"col":41}]}},{"name":"url","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1991,"b":1993,"line":38,"col":65}]}}],"usedParamSet":{"accountId":true,"url":true},"statement":{"body":"SELECT * FROM comments WHERE account_id=:accountId AND page_url=:url ORDER BY created_at ASC","loc":{"a":1926,"b":2017,"line":38,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM comments WHERE account_id=:accountId AND page_url=:url ORDER BY created_at ASC
 * ```
 */
export const commentsForUrl = new PreparedQuery<ICommentsForUrlParams,ICommentsForUrlResult>(commentsForUrlIR);


/** 'CommentsForUrlSinceDate' parameters type */
export interface ICommentsForUrlSinceDateParams {
  accountId: string | null | void;
  date: Date | null | void;
  url: string | null | void;
}

/** 'CommentsForUrlSinceDate' return type */
export interface ICommentsForUrlSinceDateResult {
  account_id: string;
  comment: string;
  created_at: Date;
  id: string;
  page_title: string | null;
  page_url: string;
  reader_email: string | null;
  reader_name: string;
  reader_website: string | null;
}

/** 'CommentsForUrlSinceDate' query type */
export interface ICommentsForUrlSinceDateQuery {
  params: ICommentsForUrlSinceDateParams;
  result: ICommentsForUrlSinceDateResult;
}

const commentsForUrlSinceDateIR: any = {"name":"CommentsForUrlSinceDate","params":[{"name":"accountId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":2098,"b":2106,"line":41,"col":41}]}},{"name":"url","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":2122,"b":2124,"line":41,"col":65}]}},{"name":"date","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":2144,"b":2147,"line":41,"col":87}]}}],"usedParamSet":{"accountId":true,"url":true,"date":true},"statement":{"body":"SELECT * FROM comments WHERE account_id=:accountId AND page_url=:url AND created_at > :date ORDER BY created_at ASC","loc":{"a":2057,"b":2171,"line":41,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM comments WHERE account_id=:accountId AND page_url=:url AND created_at > :date ORDER BY created_at ASC
 * ```
 */
export const commentsForUrlSinceDate = new PreparedQuery<ICommentsForUrlSinceDateParams,ICommentsForUrlSinceDateResult>(commentsForUrlSinceDateIR);


/** 'DeleteSingleComment' parameters type */
export interface IDeleteSingleCommentParams {
  id: string | null | void;
}

/** 'DeleteSingleComment' return type */
export type IDeleteSingleCommentResult = void;

/** 'DeleteSingleComment' query type */
export interface IDeleteSingleCommentQuery {
  params: IDeleteSingleCommentParams;
  result: IDeleteSingleCommentResult;
}

const deleteSingleCommentIR: any = {"name":"DeleteSingleComment","params":[{"name":"id","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":2238,"b":2239,"line":44,"col":31}]}}],"usedParamSet":{"id":true},"statement":{"body":"DELETE FROM comments WHERE id=:id","loc":{"a":2207,"b":2239,"line":44,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM comments WHERE id=:id
 * ```
 */
export const deleteSingleComment = new PreparedQuery<IDeleteSingleCommentParams,IDeleteSingleCommentResult>(deleteSingleCommentIR);


/** 'DeleteSingleSpam' parameters type */
export interface IDeleteSingleSpamParams {
  id: string | null | void;
}

/** 'DeleteSingleSpam' return type */
export type IDeleteSingleSpamResult = void;

/** 'DeleteSingleSpam' query type */
export interface IDeleteSingleSpamQuery {
  params: IDeleteSingleSpamParams;
  result: IDeleteSingleSpamResult;
}

const deleteSingleSpamIR: any = {"name":"DeleteSingleSpam","params":[{"name":"id","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":2302,"b":2303,"line":47,"col":30}]}}],"usedParamSet":{"id":true},"statement":{"body":"DELETE FROM reviews WHERE id=:id","loc":{"a":2272,"b":2303,"line":47,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM reviews WHERE id=:id
 * ```
 */
export const deleteSingleSpam = new PreparedQuery<IDeleteSingleSpamParams,IDeleteSingleSpamResult>(deleteSingleSpamIR);


/** 'DeleteAllComments' parameters type */
export interface IDeleteAllCommentsParams {
  accountId: string | null | void;
}

/** 'DeleteAllComments' return type */
export type IDeleteAllCommentsResult = void;

/** 'DeleteAllComments' query type */
export interface IDeleteAllCommentsQuery {
  params: IDeleteAllCommentsParams;
  result: IDeleteAllCommentsResult;
}

const deleteAllCommentsIR: any = {"name":"DeleteAllComments","params":[{"name":"accountId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":2376,"b":2384,"line":50,"col":39}]}}],"usedParamSet":{"accountId":true},"statement":{"body":"DELETE FROM comments WHERE account_id=:accountId","loc":{"a":2337,"b":2384,"line":50,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM comments WHERE account_id=:accountId
 * ```
 */
export const deleteAllComments = new PreparedQuery<IDeleteAllCommentsParams,IDeleteAllCommentsResult>(deleteAllCommentsIR);


/** 'DeleteAllSpam' parameters type */
export interface IDeleteAllSpamParams {
  accountId: string | null | void;
}

/** 'DeleteAllSpam' return type */
export type IDeleteAllSpamResult = void;

/** 'DeleteAllSpam' query type */
export interface IDeleteAllSpamQuery {
  params: IDeleteAllSpamParams;
  result: IDeleteAllSpamResult;
}

const deleteAllSpamIR: any = {"name":"DeleteAllSpam","params":[{"name":"accountId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":2452,"b":2460,"line":53,"col":38}]}}],"usedParamSet":{"accountId":true},"statement":{"body":"DELETE FROM reviews WHERE account_id=:accountId","loc":{"a":2414,"b":2460,"line":53,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM reviews WHERE account_id=:accountId
 * ```
 */
export const deleteAllSpam = new PreparedQuery<IDeleteAllSpamParams,IDeleteAllSpamResult>(deleteAllSpamIR);


