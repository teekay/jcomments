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

const commentsForUrlIR: any = {"name":"CommentsForUrl","params":[{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":320,"b":328,"line":5,"col":96}]}},{"name":"url","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":344,"b":346,"line":5,"col":120}]}}],"usedParamSet":{"accountId":true,"url":true},"statement":{"body":"SELECT page_url, comment, reader_name, reader_email, created_at FROM comments WHERE account_id=:accountId AND page_url=:url ORDER BY created_at","loc":{"a":224,"b":366,"line":5,"col":0}}};

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

const commentsForUrlSinceDateIR: any = {"name":"CommentsForUrlSinceDate","params":[{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":502,"b":510,"line":8,"col":96}]}},{"name":"url","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":526,"b":528,"line":8,"col":120}]}},{"name":"date","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":548,"b":551,"line":8,"col":142}]}}],"usedParamSet":{"accountId":true,"url":true,"date":true},"statement":{"body":"SELECT page_url, comment, reader_name, reader_email, created_at FROM comments WHERE account_id=:accountId AND page_url=:url AND created_at > :date ORDER BY created_at","loc":{"a":406,"b":571,"line":8,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT page_url, comment, reader_name, reader_email, created_at FROM comments WHERE account_id=:accountId AND page_url=:url AND created_at > :date ORDER BY created_at
 * ```
 */
export const commentsForUrlSinceDate = new PreparedQuery<ICommentsForUrlSinceDateParams,ICommentsForUrlSinceDateResult>(commentsForUrlSinceDateIR);


