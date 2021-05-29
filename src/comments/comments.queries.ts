/** Types generated for queries found in "src/comments/comments.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'PostCommentForUrl' parameters type */
export interface IPostCommentForUrlParams {
  id: string | null | void;
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

const postCommentForUrlIR: any = {"name":"PostCommentForUrl","params":[{"name":"id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":122,"b":123,"line":2,"col":91}]}},{"name":"url","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":127,"b":129,"line":2,"col":96}]}},{"name":"text","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":133,"b":136,"line":2,"col":102}]}},{"name":"name","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":140,"b":143,"line":2,"col":109}]}},{"name":"email","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":147,"b":151,"line":2,"col":116}]}}],"usedParamSet":{"id":true,"url":true,"text":true,"name":true,"email":true},"statement":{"body":"INSERT INTO comments(id, page_url, comment, reader_name, reader_email, created_at) VALUES(:id, :url, :text, :name, :email, 'now'::timestamp)","loc":{"a":31,"b":170,"line":2,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO comments(id, page_url, comment, reader_name, reader_email, created_at) VALUES(:id, :url, :text, :name, :email, 'now'::timestamp)
 * ```
 */
export const postCommentForUrl = new PreparedQuery<IPostCommentForUrlParams,IPostCommentForUrlResult>(postCommentForUrlIR);


/** 'CommentsForUrl' parameters type */
export interface ICommentsForUrlParams {
  url: string | null | void;
}

/** 'CommentsForUrl' return type */
export interface ICommentsForUrlResult {
  page_url: string;
  comment: string;
  reader_name: string;
  reader_email: string | null;
}

/** 'CommentsForUrl' query type */
export interface ICommentsForUrlQuery {
  params: ICommentsForUrlParams;
  result: ICommentsForUrlResult;
}

const commentsForUrlIR: any = {"name":"CommentsForUrl","params":[{"name":"url","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":286,"b":288,"line":5,"col":82}]}}],"usedParamSet":{"url":true},"statement":{"body":"SELECT page_url, comment, reader_name, reader_email FROM comments WHERE page_url=:url ORDER BY created_at","loc":{"a":204,"b":308,"line":5,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT page_url, comment, reader_name, reader_email FROM comments WHERE page_url=:url ORDER BY created_at
 * ```
 */
export const commentsForUrl = new PreparedQuery<ICommentsForUrlParams,ICommentsForUrlResult>(commentsForUrlIR);


/** 'CommentsForUrlSinceDate' parameters type */
export interface ICommentsForUrlSinceDateParams {
  url: string | null | void;
  date: Date | null | void;
}

/** 'CommentsForUrlSinceDate' return type */
export interface ICommentsForUrlSinceDateResult {
  page_url: string;
  comment: string;
  reader_name: string;
  reader_email: string | null;
}

/** 'CommentsForUrlSinceDate' query type */
export interface ICommentsForUrlSinceDateQuery {
  params: ICommentsForUrlSinceDateParams;
  result: ICommentsForUrlSinceDateResult;
}

const commentsForUrlSinceDateIR: any = {"name":"CommentsForUrlSinceDate","params":[{"name":"url","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":433,"b":435,"line":8,"col":82}]}},{"name":"date","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":455,"b":458,"line":8,"col":104}]}}],"usedParamSet":{"url":true,"date":true},"statement":{"body":"SELECT page_url, comment, reader_name, reader_email FROM comments WHERE page_url=:url AND created_at > :date ORDER BY created_at","loc":{"a":351,"b":478,"line":8,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT page_url, comment, reader_name, reader_email FROM comments WHERE page_url=:url AND created_at > :date ORDER BY created_at
 * ```
 */
export const commentsForUrlSinceDate = new PreparedQuery<ICommentsForUrlSinceDateParams,ICommentsForUrlSinceDateResult>(commentsForUrlSinceDateIR);


