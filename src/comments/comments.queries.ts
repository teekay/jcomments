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

const postCommentForUrlIR: any = {"name":"PostCommentForUrl","params":[{"name":"id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":134,"b":135,"line":2,"col":103}]}},{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":139,"b":147,"line":2,"col":108}]}},{"name":"url","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":151,"b":153,"line":2,"col":120}]}},{"name":"text","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":157,"b":160,"line":2,"col":126}]}},{"name":"name","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":164,"b":167,"line":2,"col":133}]}},{"name":"email","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":171,"b":175,"line":2,"col":140}]}}],"usedParamSet":{"id":true,"accountId":true,"url":true,"text":true,"name":true,"email":true},"statement":{"body":"INSERT INTO comments(id, account_id, page_url, comment, reader_name, reader_email, created_at) VALUES(:id, :accountId, :url, :text, :name, :email, 'now'::timestamp)","loc":{"a":31,"b":194,"line":2,"col":0}}};

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

const commentsForUrlIR: any = {"name":"CommentsForUrl","params":[{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":324,"b":332,"line":5,"col":96}]}},{"name":"url","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":348,"b":350,"line":5,"col":120}]}}],"usedParamSet":{"accountId":true,"url":true},"statement":{"body":"SELECT page_url, comment, reader_name, reader_email, created_at FROM comments WHERE account_id=:accountId AND page_url=:url ORDER BY created_at","loc":{"a":228,"b":370,"line":5,"col":0}}};

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

const commentsForUrlSinceDateIR: any = {"name":"CommentsForUrlSinceDate","params":[{"name":"accountId","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":509,"b":517,"line":8,"col":96}]}},{"name":"url","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":533,"b":535,"line":8,"col":120}]}},{"name":"date","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":555,"b":558,"line":8,"col":142}]}}],"usedParamSet":{"accountId":true,"url":true,"date":true},"statement":{"body":"SELECT page_url, comment, reader_name, reader_email, created_at FROM comments WHERE account_id=:accountId AND page_url=:url AND created_at > :date ORDER BY created_at","loc":{"a":413,"b":578,"line":8,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT page_url, comment, reader_name, reader_email, created_at FROM comments WHERE account_id=:accountId AND page_url=:url AND created_at > :date ORDER BY created_at
 * ```
 */
export const commentsForUrlSinceDate = new PreparedQuery<ICommentsForUrlSinceDateParams,ICommentsForUrlSinceDateResult>(commentsForUrlSinceDateIR);


