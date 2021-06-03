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

const postCommentForUrlIR: any = {"name":"PostCommentForUrl","params":[{"name":"id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":133,"b":134,"line":2,"col":103}]}},{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":138,"b":146,"line":2,"col":108}]}},{"name":"url","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":150,"b":152,"line":2,"col":120}]}},{"name":"text","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":156,"b":159,"line":2,"col":126}]}},{"name":"name","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":163,"b":166,"line":2,"col":133}]}},{"name":"email","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":170,"b":174,"line":2,"col":140}]}}],"usedParamSet":{"id":true,"accountId":true,"url":true,"text":true,"name":true,"email":true},"statement":{"body":"INSERT INTO comments(id, account_id, page_url, comment, reader_name, reader_email, created_at) VALUES(:id, :accountId, :url, :text, :name, :email, 'now'::timestamp)","loc":{"a":30,"b":193,"line":2,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO comments(id, account_id, page_url, comment, reader_name, reader_email, created_at) VALUES(:id, :accountId, :url, :text, :name, :email, 'now'::timestamp)
 * ```
 */
export const postCommentForUrl = new PreparedQuery<IPostCommentForUrlParams,IPostCommentForUrlResult>(postCommentForUrlIR);


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

const commentCountForAccountIR: any = {"name":"CommentCountForAccount","params":[{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":291,"b":299,"line":5,"col":59}]}}],"usedParamSet":{"accountId":true},"statement":{"body":"SELECT COUNT(*) as \"Total\" FROM comments WHERE account_id=:accountId","loc":{"a":232,"b":299,"line":5,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT COUNT(*) as "Total" FROM comments WHERE account_id=:accountId
 * ```
 */
export const commentCountForAccount = new PreparedQuery<ICommentCountForAccountParams,ICommentCountForAccountResult>(commentCountForAccountIR);


/** 'CommentsForAccount' parameters type */
export interface ICommentsForAccountParams {
  accountId: string | null | void;
}

/** 'CommentsForAccount' return type */
export interface ICommentsForAccountResult {
  page_url: string;
  comment: string;
  reader_name: string;
  reader_email: string | null;
  created_at: Date;
}

/** 'CommentsForAccount' query type */
export interface ICommentsForAccountQuery {
  params: ICommentsForAccountParams;
  result: ICommentsForAccountResult;
}

const commentsForAccountIR: any = {"name":"CommentsForAccount","params":[{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":430,"b":438,"line":8,"col":96}]}}],"usedParamSet":{"accountId":true},"statement":{"body":"SELECT page_url, comment, reader_name, reader_email, created_at FROM comments WHERE account_id=:accountId ORDER BY created_at DESC","loc":{"a":334,"b":463,"line":8,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT page_url, comment, reader_name, reader_email, created_at FROM comments WHERE account_id=:accountId ORDER BY created_at DESC
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
  page_url: string;
  comment: string;
  reader_name: string;
  reader_email: string | null;
  created_at: Date;
}

/** 'CommentsForAccountPaged' query type */
export interface ICommentsForAccountPagedQuery {
  params: ICommentsForAccountPagedParams;
  result: ICommentsForAccountPagedResult;
}

const commentsForAccountPagedIR: any = {"name":"CommentsForAccountPaged","params":[{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":599,"b":607,"line":11,"col":96}]}},{"name":"limit","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":641,"b":645,"line":11,"col":138}]}},{"name":"offset","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":655,"b":660,"line":11,"col":152}]}}],"usedParamSet":{"accountId":true,"limit":true,"offset":true},"statement":{"body":"SELECT page_url, comment, reader_name, reader_email, created_at FROM comments WHERE account_id=:accountId ORDER BY created_at DESC LIMIT :limit OFFSET :offset","loc":{"a":503,"b":660,"line":11,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT page_url, comment, reader_name, reader_email, created_at FROM comments WHERE account_id=:accountId ORDER BY created_at DESC LIMIT :limit OFFSET :offset
 * ```
 */
export const commentsForAccountPaged = new PreparedQuery<ICommentsForAccountPagedParams,ICommentsForAccountPagedResult>(commentsForAccountPagedIR);


/** 'CommentsForUrl' parameters type */
export interface ICommentsForUrlParams {
  accountId: string | null | void;
  url: string | null | void;
}

/** 'CommentsForUrl' return type */
export interface ICommentsForUrlResult {
  page_url: string;
  comment: string;
  reader_name: string;
  reader_email: string | null;
  created_at: Date;
}

/** 'CommentsForUrl' query type */
export interface ICommentsForUrlQuery {
  params: ICommentsForUrlParams;
  result: ICommentsForUrlResult;
}

const commentsForUrlIR: any = {"name":"CommentsForUrl","params":[{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":787,"b":795,"line":14,"col":96}]}},{"name":"url","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":811,"b":813,"line":14,"col":120}]}}],"usedParamSet":{"accountId":true,"url":true},"statement":{"body":"SELECT page_url, comment, reader_name, reader_email, created_at FROM comments WHERE account_id=:accountId AND page_url=:url ORDER BY created_at","loc":{"a":691,"b":833,"line":14,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT page_url, comment, reader_name, reader_email, created_at FROM comments WHERE account_id=:accountId AND page_url=:url ORDER BY created_at
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
  page_url: string;
  comment: string;
  reader_name: string;
  reader_email: string | null;
  created_at: Date;
}

/** 'CommentsForUrlSinceDate' query type */
export interface ICommentsForUrlSinceDateQuery {
  params: ICommentsForUrlSinceDateParams;
  result: ICommentsForUrlSinceDateResult;
}

const commentsForUrlSinceDateIR: any = {"name":"CommentsForUrlSinceDate","params":[{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":969,"b":977,"line":17,"col":96}]}},{"name":"url","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":993,"b":995,"line":17,"col":120}]}},{"name":"date","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1015,"b":1018,"line":17,"col":142}]}}],"usedParamSet":{"accountId":true,"url":true,"date":true},"statement":{"body":"SELECT page_url, comment, reader_name, reader_email, created_at FROM comments WHERE account_id=:accountId AND page_url=:url AND created_at > :date ORDER BY created_at","loc":{"a":873,"b":1038,"line":17,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT page_url, comment, reader_name, reader_email, created_at FROM comments WHERE account_id=:accountId AND page_url=:url AND created_at > :date ORDER BY created_at
 * ```
 */
export const commentsForUrlSinceDate = new PreparedQuery<ICommentsForUrlSinceDateParams,ICommentsForUrlSinceDateResult>(commentsForUrlSinceDateIR);


