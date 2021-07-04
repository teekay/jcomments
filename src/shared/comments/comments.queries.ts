/** Types generated for queries found in "src/shared/comments/comments.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'PostCommentForUrl' parameters type */
export interface IPostCommentForUrlParams {
  id: string | null | void;
  accountId: string | null | void;
  url: string | null | void;
  pageTitle: string | null | void;
  text: string | null | void;
  name: string | null | void;
  email: string | null | void;
  website: string | null | void;
}

/** 'PostCommentForUrl' return type */
export type IPostCommentForUrlResult = void;

/** 'PostCommentForUrl' query type */
export interface IPostCommentForUrlQuery {
  params: IPostCommentForUrlParams;
  result: IPostCommentForUrlResult;
}

const postCommentForUrlIR: any = {"name":"PostCommentForUrl","params":[{"name":"id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":161,"b":162,"line":2,"col":131}]}},{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":166,"b":174,"line":2,"col":136}]}},{"name":"url","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":178,"b":180,"line":2,"col":148}]}},{"name":"pageTitle","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":184,"b":192,"line":2,"col":154}]}},{"name":"text","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":196,"b":199,"line":2,"col":166}]}},{"name":"name","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":203,"b":206,"line":2,"col":173}]}},{"name":"email","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":210,"b":214,"line":2,"col":180}]}},{"name":"website","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":218,"b":224,"line":2,"col":188}]}}],"usedParamSet":{"id":true,"accountId":true,"url":true,"pageTitle":true,"text":true,"name":true,"email":true,"website":true},"statement":{"body":"INSERT INTO comments(id, account_id, page_url, page_title, comment, reader_name, reader_email, reader_website, created_at) VALUES(:id, :accountId, :url, :pageTitle, :text, :name, :email, :website, 'now'::timestamp)","loc":{"a":30,"b":243,"line":2,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO comments(id, account_id, page_url, page_title, comment, reader_name, reader_email, reader_website, created_at) VALUES(:id, :accountId, :url, :pageTitle, :text, :name, :email, :website, 'now'::timestamp)
 * ```
 */
export const postCommentForUrl = new PreparedQuery<IPostCommentForUrlParams,IPostCommentForUrlResult>(postCommentForUrlIR);


/** 'PostCommentForUrlWithTimestamp' parameters type */
export interface IPostCommentForUrlWithTimestampParams {
  id: string | null | void;
  accountId: string | null | void;
  url: string | null | void;
  pageTitle: string | null | void;
  text: string | null | void;
  name: string | null | void;
  email: string | null | void;
  website: string | null | void;
  createdAt: Date | null | void;
}

/** 'PostCommentForUrlWithTimestamp' return type */
export type IPostCommentForUrlWithTimestampResult = void;

/** 'PostCommentForUrlWithTimestamp' query type */
export interface IPostCommentForUrlWithTimestampQuery {
  params: IPostCommentForUrlWithTimestampParams;
  result: IPostCommentForUrlWithTimestampResult;
}

const postCommentForUrlWithTimestampIR: any = {"name":"PostCommentForUrlWithTimestamp","params":[{"name":"id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":421,"b":422,"line":5,"col":131}]}},{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":426,"b":434,"line":5,"col":136}]}},{"name":"url","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":438,"b":440,"line":5,"col":148}]}},{"name":"pageTitle","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":444,"b":452,"line":5,"col":154}]}},{"name":"text","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":456,"b":459,"line":5,"col":166}]}},{"name":"name","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":463,"b":466,"line":5,"col":173}]}},{"name":"email","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":470,"b":474,"line":5,"col":180}]}},{"name":"website","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":478,"b":484,"line":5,"col":188}]}},{"name":"createdAt","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":488,"b":496,"line":5,"col":198}]}}],"usedParamSet":{"id":true,"accountId":true,"url":true,"pageTitle":true,"text":true,"name":true,"email":true,"website":true,"createdAt":true},"statement":{"body":"INSERT INTO comments(id, account_id, page_url, page_title, comment, reader_name, reader_email, reader_website, created_at) VALUES(:id, :accountId, :url, :pageTitle, :text, :name, :email, :website, :createdAt)","loc":{"a":290,"b":497,"line":5,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO comments(id, account_id, page_url, page_title, comment, reader_name, reader_email, reader_website, created_at) VALUES(:id, :accountId, :url, :pageTitle, :text, :name, :email, :website, :createdAt)
 * ```
 */
export const postCommentForUrlWithTimestamp = new PreparedQuery<IPostCommentForUrlWithTimestampParams,IPostCommentForUrlWithTimestampResult>(postCommentForUrlWithTimestampIR);


/** 'FlagCommentForUrl' parameters type */
export interface IFlagCommentForUrlParams {
  id: string | null | void;
  accountId: string | null | void;
  url: string | null | void;
  pageTitle: string | null | void;
  text: string | null | void;
  name: string | null | void;
  email: string | null | void;
  website: string | null | void;
}

/** 'FlagCommentForUrl' return type */
export type IFlagCommentForUrlResult = void;

/** 'FlagCommentForUrl' query type */
export interface IFlagCommentForUrlQuery {
  params: IFlagCommentForUrlParams;
  result: IFlagCommentForUrlResult;
}

const flagCommentForUrlIR: any = {"name":"FlagCommentForUrl","params":[{"name":"id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":661,"b":662,"line":8,"col":130}]}},{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":666,"b":674,"line":8,"col":135}]}},{"name":"url","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":678,"b":680,"line":8,"col":147}]}},{"name":"pageTitle","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":683,"b":691,"line":8,"col":152}]}},{"name":"text","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":695,"b":698,"line":8,"col":164}]}},{"name":"name","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":702,"b":705,"line":8,"col":171}]}},{"name":"email","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":709,"b":713,"line":8,"col":178}]}},{"name":"website","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":717,"b":723,"line":8,"col":186}]}}],"usedParamSet":{"id":true,"accountId":true,"url":true,"pageTitle":true,"text":true,"name":true,"email":true,"website":true},"statement":{"body":"INSERT INTO reviews(id, account_id, page_url, page_title, comment, reader_name, reader_email, reader_website, created_at) VALUES(:id, :accountId, :url,:pageTitle, :text, :name, :email, :website, 'now'::timestamp)","loc":{"a":531,"b":742,"line":8,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO reviews(id, account_id, page_url, page_title, comment, reader_name, reader_email, reader_website, created_at) VALUES(:id, :accountId, :url,:pageTitle, :text, :name, :email, :website, 'now'::timestamp)
 * ```
 */
export const flagCommentForUrl = new PreparedQuery<IFlagCommentForUrlParams,IFlagCommentForUrlResult>(flagCommentForUrlIR);


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

const commentCountForAccountIR: any = {"name":"CommentCountForAccount","params":[{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":840,"b":848,"line":11,"col":59}]}}],"usedParamSet":{"accountId":true},"statement":{"body":"SELECT COUNT(*) as \"Total\" FROM comments WHERE account_id=:accountId","loc":{"a":781,"b":848,"line":11,"col":0}}};

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

const reviewCountForAccountIR: any = {"name":"ReviewCountForAccount","params":[{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":944,"b":952,"line":14,"col":58}]}}],"usedParamSet":{"accountId":true},"statement":{"body":"SELECT COUNT(*) as \"Total\" FROM reviews WHERE account_id=:accountId","loc":{"a":886,"b":952,"line":14,"col":0}}};

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
  id: string;
  account_id: string;
  page_url: string;
  comment: string;
  reader_name: string;
  reader_email: string | null;
  reader_website: string | null;
  created_at: Date;
  page_title: string | null;
}

/** 'FindByIdForAccount' query type */
export interface IFindByIdForAccountQuery {
  params: IFindByIdForAccountParams;
  result: IFindByIdForAccountResult;
}

const findByIdForAccountIR: any = {"name":"FindByIdForAccount","params":[{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1028,"b":1036,"line":17,"col":41}]}},{"name":"id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1046,"b":1047,"line":17,"col":59}]}}],"usedParamSet":{"accountId":true,"id":true},"statement":{"body":"SELECT * FROM comments WHERE account_id=:accountId AND id=:id","loc":{"a":987,"b":1047,"line":17,"col":0}}};

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
  id: string;
  account_id: string;
  page_url: string;
  comment: string;
  reader_name: string;
  reader_email: string | null;
  reader_website: string | null;
  created_at: Date;
  page_title: string | null;
}

/** 'CommentsForAccount' query type */
export interface ICommentsForAccountQuery {
  params: ICommentsForAccountParams;
  result: ICommentsForAccountResult;
}

const commentsForAccountIR: any = {"name":"CommentsForAccount","params":[{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1123,"b":1131,"line":20,"col":41}]}}],"usedParamSet":{"accountId":true},"statement":{"body":"SELECT * FROM comments WHERE account_id=:accountId ORDER BY created_at DESC","loc":{"a":1082,"b":1156,"line":20,"col":0}}};

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
  id: string;
  account_id: string;
  page_url: string;
  comment: string;
  reader_name: string;
  reader_email: string | null;
  reader_website: string | null;
  created_at: Date;
  page_title: string | null;
}

/** 'CommentsForAccountPaged' query type */
export interface ICommentsForAccountPagedQuery {
  params: ICommentsForAccountPagedParams;
  result: ICommentsForAccountPagedResult;
}

const commentsForAccountPagedIR: any = {"name":"CommentsForAccountPaged","params":[{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1237,"b":1245,"line":23,"col":41}]}},{"name":"limit","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1279,"b":1283,"line":23,"col":83}]}},{"name":"offset","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1293,"b":1298,"line":23,"col":97}]}}],"usedParamSet":{"accountId":true,"limit":true,"offset":true},"statement":{"body":"SELECT * FROM comments WHERE account_id=:accountId ORDER BY created_at DESC LIMIT :limit OFFSET :offset","loc":{"a":1196,"b":1298,"line":23,"col":0}}};

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
  id: string;
  account_id: string;
  page_url: string;
  comment: string;
  reader_name: string;
  reader_email: string | null;
  reader_website: string | null;
  created_at: Date;
  page_title: string | null;
}

/** 'FindSpamByIdForAccount' query type */
export interface IFindSpamByIdForAccountQuery {
  params: IFindSpamByIdForAccountParams;
  result: IFindSpamByIdForAccountResult;
}

const findSpamByIdForAccountIR: any = {"name":"FindSpamByIdForAccount","params":[{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1377,"b":1385,"line":26,"col":40}]}},{"name":"id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1395,"b":1396,"line":26,"col":58}]}}],"usedParamSet":{"accountId":true,"id":true},"statement":{"body":"SELECT * FROM reviews WHERE account_id=:accountId AND id=:id","loc":{"a":1337,"b":1396,"line":26,"col":0}}};

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
  id: string;
  account_id: string;
  page_url: string;
  comment: string;
  reader_name: string;
  reader_email: string | null;
  reader_website: string | null;
  created_at: Date;
  page_title: string | null;
}

/** 'ReviewsForAccount' query type */
export interface IReviewsForAccountQuery {
  params: IReviewsForAccountParams;
  result: IReviewsForAccountResult;
}

const reviewsForAccountIR: any = {"name":"ReviewsForAccount","params":[{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1470,"b":1478,"line":29,"col":40}]}}],"usedParamSet":{"accountId":true},"statement":{"body":"SELECT * FROM reviews WHERE account_id=:accountId ORDER BY created_at DESC","loc":{"a":1430,"b":1503,"line":29,"col":0}}};

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
  id: string;
  account_id: string;
  page_url: string;
  comment: string;
  reader_name: string;
  reader_email: string | null;
  reader_website: string | null;
  created_at: Date;
  page_title: string | null;
}

/** 'ReviewsForAccountPaged' query type */
export interface IReviewsForAccountPagedQuery {
  params: IReviewsForAccountPagedParams;
  result: IReviewsForAccountPagedResult;
}

const reviewsForAccountPagedIR: any = {"name":"ReviewsForAccountPaged","params":[{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1582,"b":1590,"line":32,"col":40}]}},{"name":"limit","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1624,"b":1628,"line":32,"col":82}]}},{"name":"offset","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1638,"b":1643,"line":32,"col":96}]}}],"usedParamSet":{"accountId":true,"limit":true,"offset":true},"statement":{"body":"SELECT * FROM reviews WHERE account_id=:accountId ORDER BY created_at DESC LIMIT :limit OFFSET :offset","loc":{"a":1542,"b":1643,"line":32,"col":0}}};

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
  id: string;
  account_id: string;
  page_url: string;
  comment: string;
  reader_name: string;
  reader_email: string | null;
  reader_website: string | null;
  created_at: Date;
  page_title: string | null;
}

/** 'CommentsForUrl' query type */
export interface ICommentsForUrlQuery {
  params: ICommentsForUrlParams;
  result: ICommentsForUrlResult;
}

const commentsForUrlIR: any = {"name":"CommentsForUrl","params":[{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1715,"b":1723,"line":35,"col":41}]}},{"name":"url","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1739,"b":1741,"line":35,"col":65}]}}],"usedParamSet":{"accountId":true,"url":true},"statement":{"body":"SELECT * FROM comments WHERE account_id=:accountId AND page_url=:url ORDER BY created_at ASC","loc":{"a":1674,"b":1765,"line":35,"col":0}}};

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
  url: string | null | void;
  date: Date | null | void;
}

/** 'CommentsForUrlSinceDate' return type */
export interface ICommentsForUrlSinceDateResult {
  id: string;
  account_id: string;
  page_url: string;
  comment: string;
  reader_name: string;
  reader_email: string | null;
  reader_website: string | null;
  created_at: Date;
  page_title: string | null;
}

/** 'CommentsForUrlSinceDate' query type */
export interface ICommentsForUrlSinceDateQuery {
  params: ICommentsForUrlSinceDateParams;
  result: ICommentsForUrlSinceDateResult;
}

const commentsForUrlSinceDateIR: any = {"name":"CommentsForUrlSinceDate","params":[{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1846,"b":1854,"line":38,"col":41}]}},{"name":"url","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1870,"b":1872,"line":38,"col":65}]}},{"name":"date","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1892,"b":1895,"line":38,"col":87}]}}],"usedParamSet":{"accountId":true,"url":true,"date":true},"statement":{"body":"SELECT * FROM comments WHERE account_id=:accountId AND page_url=:url AND created_at > :date ORDER BY created_at ASC","loc":{"a":1805,"b":1919,"line":38,"col":0}}};

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

const deleteSingleCommentIR: any = {"name":"DeleteSingleComment","params":[{"name":"id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1986,"b":1987,"line":41,"col":31}]}}],"usedParamSet":{"id":true},"statement":{"body":"DELETE FROM comments WHERE id=:id","loc":{"a":1955,"b":1987,"line":41,"col":0}}};

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

const deleteSingleSpamIR: any = {"name":"DeleteSingleSpam","params":[{"name":"id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":2050,"b":2051,"line":44,"col":30}]}}],"usedParamSet":{"id":true},"statement":{"body":"DELETE FROM reviews WHERE id=:id","loc":{"a":2020,"b":2051,"line":44,"col":0}}};

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

const deleteAllCommentsIR: any = {"name":"DeleteAllComments","params":[{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":2124,"b":2132,"line":47,"col":39}]}}],"usedParamSet":{"accountId":true},"statement":{"body":"DELETE FROM comments WHERE account_id=:accountId","loc":{"a":2085,"b":2132,"line":47,"col":0}}};

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

const deleteAllSpamIR: any = {"name":"DeleteAllSpam","params":[{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":2200,"b":2208,"line":50,"col":38}]}}],"usedParamSet":{"accountId":true},"statement":{"body":"DELETE FROM reviews WHERE account_id=:accountId","loc":{"a":2162,"b":2208,"line":50,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM reviews WHERE account_id=:accountId
 * ```
 */
export const deleteAllSpam = new PreparedQuery<IDeleteAllSpamParams,IDeleteAllSpamResult>(deleteAllSpamIR);


