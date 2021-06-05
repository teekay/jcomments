/** Types generated for queries found in "src/comments/comments.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'PostCommentForUrl' parameters type */
export interface IPostCommentForUrlParams {
  id: string | null | void;
  accountId: string | null | void;
  url: string | null | void;
  text: string | null | void;
  name: string | null | void;
  email: string | null | void;
}

/** 'PostCommentForUrl' return type */
export type IPostCommentForUrlResult = void;

/** 'PostCommentForUrl' query type */
export interface IPostCommentForUrlQuery {
  params: IPostCommentForUrlParams;
  result: IPostCommentForUrlResult;
}

const postCommentForUrlIR: any = {"name":"PostCommentForUrl","params":[{"name":"id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":149,"b":150,"line":2,"col":119}]}},{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":154,"b":162,"line":2,"col":124}]}},{"name":"url","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":166,"b":168,"line":2,"col":136},{"a":194,"b":196,"line":2,"col":164}]}},{"name":"text","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":172,"b":175,"line":2,"col":142}]}},{"name":"name","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":179,"b":182,"line":2,"col":149}]}},{"name":"email","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":186,"b":190,"line":2,"col":156}]}}],"usedParamSet":{"id":true,"accountId":true,"url":true,"text":true,"name":true,"email":true},"statement":{"body":"INSERT INTO comments(id, account_id, page_url, comment, reader_name, reader_email, reader_website, created_at) VALUES(:id, :accountId, :url, :text, :name, :email, :url, 'now'::timestamp)","loc":{"a":30,"b":215,"line":2,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO comments(id, account_id, page_url, comment, reader_name, reader_email, reader_website, created_at) VALUES(:id, :accountId, :url, :text, :name, :email, :url, 'now'::timestamp)
 * ```
 */
export const postCommentForUrl = new PreparedQuery<IPostCommentForUrlParams,IPostCommentForUrlResult>(postCommentForUrlIR);


/** 'PostCommentForUrlWithTimestamp' parameters type */
export interface IPostCommentForUrlWithTimestampParams {
  id: string | null | void;
  accountId: string | null | void;
  url: string | null | void;
  text: string | null | void;
  name: string | null | void;
  email: string | null | void;
  createdAt: Date | null | void;
}

/** 'PostCommentForUrlWithTimestamp' return type */
export type IPostCommentForUrlWithTimestampResult = void;

/** 'PostCommentForUrlWithTimestamp' query type */
export interface IPostCommentForUrlWithTimestampQuery {
  params: IPostCommentForUrlWithTimestampParams;
  result: IPostCommentForUrlWithTimestampResult;
}

const postCommentForUrlWithTimestampIR: any = {"name":"PostCommentForUrlWithTimestamp","params":[{"name":"id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":381,"b":382,"line":5,"col":119}]}},{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":386,"b":394,"line":5,"col":124}]}},{"name":"url","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":398,"b":400,"line":5,"col":136},{"a":426,"b":428,"line":5,"col":164}]}},{"name":"text","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":404,"b":407,"line":5,"col":142}]}},{"name":"name","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":411,"b":414,"line":5,"col":149}]}},{"name":"email","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":418,"b":422,"line":5,"col":156}]}},{"name":"createdAt","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":432,"b":440,"line":5,"col":170}]}}],"usedParamSet":{"id":true,"accountId":true,"url":true,"text":true,"name":true,"email":true,"createdAt":true},"statement":{"body":"INSERT INTO comments(id, account_id, page_url, comment, reader_name, reader_email, reader_website, created_at) VALUES(:id, :accountId, :url, :text, :name, :email, :url, :createdAt)","loc":{"a":262,"b":441,"line":5,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO comments(id, account_id, page_url, comment, reader_name, reader_email, reader_website, created_at) VALUES(:id, :accountId, :url, :text, :name, :email, :url, :createdAt)
 * ```
 */
export const postCommentForUrlWithTimestamp = new PreparedQuery<IPostCommentForUrlWithTimestampParams,IPostCommentForUrlWithTimestampResult>(postCommentForUrlWithTimestampIR);


/** 'FlagCommentForUrl' parameters type */
export interface IFlagCommentForUrlParams {
  id: string | null | void;
  accountId: string | null | void;
  url: string | null | void;
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

const flagCommentForUrlIR: any = {"name":"FlagCommentForUrl","params":[{"name":"id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":593,"b":594,"line":8,"col":118}]}},{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":598,"b":606,"line":8,"col":123}]}},{"name":"url","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":610,"b":612,"line":8,"col":135}]}},{"name":"text","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":616,"b":619,"line":8,"col":141}]}},{"name":"name","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":623,"b":626,"line":8,"col":148}]}},{"name":"email","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":630,"b":634,"line":8,"col":155}]}},{"name":"website","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":638,"b":644,"line":8,"col":163}]}}],"usedParamSet":{"id":true,"accountId":true,"url":true,"text":true,"name":true,"email":true,"website":true},"statement":{"body":"INSERT INTO reviews(id, account_id, page_url, comment, reader_name, reader_email, reader_website, created_at) VALUES(:id, :accountId, :url, :text, :name, :email, :website, 'now'::timestamp)","loc":{"a":475,"b":663,"line":8,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO reviews(id, account_id, page_url, comment, reader_name, reader_email, reader_website, created_at) VALUES(:id, :accountId, :url, :text, :name, :email, :website, 'now'::timestamp)
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

const commentCountForAccountIR: any = {"name":"CommentCountForAccount","params":[{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":761,"b":769,"line":11,"col":59}]}}],"usedParamSet":{"accountId":true},"statement":{"body":"SELECT COUNT(*) as \"Total\" FROM comments WHERE account_id=:accountId","loc":{"a":702,"b":769,"line":11,"col":0}}};

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

const reviewCountForAccountIR: any = {"name":"ReviewCountForAccount","params":[{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":865,"b":873,"line":14,"col":58}]}}],"usedParamSet":{"accountId":true},"statement":{"body":"SELECT COUNT(*) as \"Total\" FROM reviews WHERE account_id=:accountId","loc":{"a":807,"b":873,"line":14,"col":0}}};

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
}

/** 'FindByIdForAccount' query type */
export interface IFindByIdForAccountQuery {
  params: IFindByIdForAccountParams;
  result: IFindByIdForAccountResult;
}

const findByIdForAccountIR: any = {"name":"FindByIdForAccount","params":[{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":949,"b":957,"line":17,"col":41}]}},{"name":"id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":967,"b":968,"line":17,"col":59}]}}],"usedParamSet":{"accountId":true,"id":true},"statement":{"body":"SELECT * FROM comments WHERE account_id=:accountId AND id=:id","loc":{"a":908,"b":968,"line":17,"col":0}}};

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
}

/** 'CommentsForAccount' query type */
export interface ICommentsForAccountQuery {
  params: ICommentsForAccountParams;
  result: ICommentsForAccountResult;
}

const commentsForAccountIR: any = {"name":"CommentsForAccount","params":[{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1044,"b":1052,"line":20,"col":41}]}}],"usedParamSet":{"accountId":true},"statement":{"body":"SELECT * FROM comments WHERE account_id=:accountId ORDER BY created_at DESC","loc":{"a":1003,"b":1077,"line":20,"col":0}}};

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
}

/** 'CommentsForAccountPaged' query type */
export interface ICommentsForAccountPagedQuery {
  params: ICommentsForAccountPagedParams;
  result: ICommentsForAccountPagedResult;
}

const commentsForAccountPagedIR: any = {"name":"CommentsForAccountPaged","params":[{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1158,"b":1166,"line":23,"col":41}]}},{"name":"limit","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1200,"b":1204,"line":23,"col":83}]}},{"name":"offset","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1214,"b":1219,"line":23,"col":97}]}}],"usedParamSet":{"accountId":true,"limit":true,"offset":true},"statement":{"body":"SELECT * FROM comments WHERE account_id=:accountId ORDER BY created_at DESC LIMIT :limit OFFSET :offset","loc":{"a":1117,"b":1219,"line":23,"col":0}}};

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
}

/** 'FindSpamByIdForAccount' query type */
export interface IFindSpamByIdForAccountQuery {
  params: IFindSpamByIdForAccountParams;
  result: IFindSpamByIdForAccountResult;
}

const findSpamByIdForAccountIR: any = {"name":"FindSpamByIdForAccount","params":[{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1298,"b":1306,"line":26,"col":40}]}},{"name":"id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1316,"b":1317,"line":26,"col":58}]}}],"usedParamSet":{"accountId":true,"id":true},"statement":{"body":"SELECT * FROM reviews WHERE account_id=:accountId AND id=:id","loc":{"a":1258,"b":1317,"line":26,"col":0}}};

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
}

/** 'ReviewsForAccount' query type */
export interface IReviewsForAccountQuery {
  params: IReviewsForAccountParams;
  result: IReviewsForAccountResult;
}

const reviewsForAccountIR: any = {"name":"ReviewsForAccount","params":[{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1391,"b":1399,"line":29,"col":40}]}}],"usedParamSet":{"accountId":true},"statement":{"body":"SELECT * FROM reviews WHERE account_id=:accountId ORDER BY created_at DESC","loc":{"a":1351,"b":1424,"line":29,"col":0}}};

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
}

/** 'ReviewsForAccountPaged' query type */
export interface IReviewsForAccountPagedQuery {
  params: IReviewsForAccountPagedParams;
  result: IReviewsForAccountPagedResult;
}

const reviewsForAccountPagedIR: any = {"name":"ReviewsForAccountPaged","params":[{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1503,"b":1511,"line":32,"col":40}]}},{"name":"limit","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1545,"b":1549,"line":32,"col":82}]}},{"name":"offset","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1559,"b":1564,"line":32,"col":96}]}}],"usedParamSet":{"accountId":true,"limit":true,"offset":true},"statement":{"body":"SELECT * FROM reviews WHERE account_id=:accountId ORDER BY created_at DESC LIMIT :limit OFFSET :offset","loc":{"a":1463,"b":1564,"line":32,"col":0}}};

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
}

/** 'CommentsForUrl' query type */
export interface ICommentsForUrlQuery {
  params: ICommentsForUrlParams;
  result: ICommentsForUrlResult;
}

const commentsForUrlIR: any = {"name":"CommentsForUrl","params":[{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1636,"b":1644,"line":35,"col":41}]}},{"name":"url","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1660,"b":1662,"line":35,"col":65}]}}],"usedParamSet":{"accountId":true,"url":true},"statement":{"body":"SELECT * FROM comments WHERE account_id=:accountId AND page_url=:url ORDER BY created_at","loc":{"a":1595,"b":1682,"line":35,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM comments WHERE account_id=:accountId AND page_url=:url ORDER BY created_at
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
}

/** 'CommentsForUrlSinceDate' query type */
export interface ICommentsForUrlSinceDateQuery {
  params: ICommentsForUrlSinceDateParams;
  result: ICommentsForUrlSinceDateResult;
}

const commentsForUrlSinceDateIR: any = {"name":"CommentsForUrlSinceDate","params":[{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1763,"b":1771,"line":38,"col":41}]}},{"name":"url","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1787,"b":1789,"line":38,"col":65}]}},{"name":"date","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1809,"b":1812,"line":38,"col":87}]}}],"usedParamSet":{"accountId":true,"url":true,"date":true},"statement":{"body":"SELECT * FROM comments WHERE account_id=:accountId AND page_url=:url AND created_at > :date ORDER BY created_at","loc":{"a":1722,"b":1832,"line":38,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM comments WHERE account_id=:accountId AND page_url=:url AND created_at > :date ORDER BY created_at
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

const deleteSingleCommentIR: any = {"name":"DeleteSingleComment","params":[{"name":"id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1899,"b":1900,"line":41,"col":31}]}}],"usedParamSet":{"id":true},"statement":{"body":"DELETE FROM comments WHERE id=:id","loc":{"a":1868,"b":1900,"line":41,"col":0}}};

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

const deleteSingleSpamIR: any = {"name":"DeleteSingleSpam","params":[{"name":"id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1963,"b":1964,"line":44,"col":30}]}}],"usedParamSet":{"id":true},"statement":{"body":"DELETE FROM reviews WHERE id=:id","loc":{"a":1933,"b":1964,"line":44,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM reviews WHERE id=:id
 * ```
 */
export const deleteSingleSpam = new PreparedQuery<IDeleteSingleSpamParams,IDeleteSingleSpamResult>(deleteSingleSpamIR);


