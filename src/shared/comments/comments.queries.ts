/** Types generated for queries found in "src/shared/comments/comments.sql" */
import { PreparedQuery } from '@pgtyped/runtime'

/** 'PostCommentForUrl' parameters type */
export interface IPostCommentForUrlParams {
  accountId: string | null | void
  email: string | null | void
  id: string | null | void
  name: string | null | void
  pageTitle: string | null | void
  text: string | null | void
  url: string | null | void
  website: string | null | void
}

/** 'PostCommentForUrl' return type */
export type IPostCommentForUrlResult = void

/** 'PostCommentForUrl' query type */
export interface IPostCommentForUrlQuery {
  params: IPostCommentForUrlParams
  result: IPostCommentForUrlResult
}

const postCommentForUrlIR: any = {
  usedParamSet: {
    id: true,
    accountId: true,
    url: true,
    pageTitle: true,
    text: true,
    name: true,
    email: true,
    website: true,
  },
  params: [
    { name: 'id', required: false, transform: { type: 'scalar' }, locs: [{ a: 130, b: 132 }] },
    { name: 'accountId', required: false, transform: { type: 'scalar' }, locs: [{ a: 135, b: 144 }] },
    { name: 'url', required: false, transform: { type: 'scalar' }, locs: [{ a: 147, b: 150 }] },
    { name: 'pageTitle', required: false, transform: { type: 'scalar' }, locs: [{ a: 153, b: 162 }] },
    { name: 'text', required: false, transform: { type: 'scalar' }, locs: [{ a: 165, b: 169 }] },
    { name: 'name', required: false, transform: { type: 'scalar' }, locs: [{ a: 172, b: 176 }] },
    { name: 'email', required: false, transform: { type: 'scalar' }, locs: [{ a: 179, b: 184 }] },
    { name: 'website', required: false, transform: { type: 'scalar' }, locs: [{ a: 187, b: 194 }] },
  ],
  statement:
    "INSERT INTO comments(id, account_id, page_url, page_title, comment, reader_name, reader_email, reader_website, created_at) VALUES(:id, :accountId, :url, :pageTitle, :text, :name, :email, :website, 'now'::timestamp)",
}

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO comments(id, account_id, page_url, page_title, comment, reader_name, reader_email, reader_website, created_at) VALUES(:id, :accountId, :url, :pageTitle, :text, :name, :email, :website, 'now'::timestamp)
 * ```
 */
export const postCommentForUrl = new PreparedQuery<IPostCommentForUrlParams, IPostCommentForUrlResult>(
  postCommentForUrlIR
)

/** 'PostCommentForUrlWithTimestamp' parameters type */
export interface IPostCommentForUrlWithTimestampParams {
  accountId: string | null | void
  createdAt: Date | null | void
  email: string | null | void
  id: string | null | void
  name: string | null | void
  pageTitle: string | null | void
  text: string | null | void
  url: string | null | void
  website: string | null | void
}

/** 'PostCommentForUrlWithTimestamp' return type */
export type IPostCommentForUrlWithTimestampResult = void

/** 'PostCommentForUrlWithTimestamp' query type */
export interface IPostCommentForUrlWithTimestampQuery {
  params: IPostCommentForUrlWithTimestampParams
  result: IPostCommentForUrlWithTimestampResult
}

const postCommentForUrlWithTimestampIR: any = {
  usedParamSet: {
    id: true,
    accountId: true,
    url: true,
    pageTitle: true,
    text: true,
    name: true,
    email: true,
    website: true,
    createdAt: true,
  },
  params: [
    { name: 'id', required: false, transform: { type: 'scalar' }, locs: [{ a: 130, b: 132 }] },
    { name: 'accountId', required: false, transform: { type: 'scalar' }, locs: [{ a: 135, b: 144 }] },
    { name: 'url', required: false, transform: { type: 'scalar' }, locs: [{ a: 147, b: 150 }] },
    { name: 'pageTitle', required: false, transform: { type: 'scalar' }, locs: [{ a: 153, b: 162 }] },
    { name: 'text', required: false, transform: { type: 'scalar' }, locs: [{ a: 165, b: 169 }] },
    { name: 'name', required: false, transform: { type: 'scalar' }, locs: [{ a: 172, b: 176 }] },
    { name: 'email', required: false, transform: { type: 'scalar' }, locs: [{ a: 179, b: 184 }] },
    { name: 'website', required: false, transform: { type: 'scalar' }, locs: [{ a: 187, b: 194 }] },
    { name: 'createdAt', required: false, transform: { type: 'scalar' }, locs: [{ a: 197, b: 206 }] },
  ],
  statement:
    'INSERT INTO comments(id, account_id, page_url, page_title, comment, reader_name, reader_email, reader_website, created_at) VALUES(:id, :accountId, :url, :pageTitle, :text, :name, :email, :website, :createdAt)',
}

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO comments(id, account_id, page_url, page_title, comment, reader_name, reader_email, reader_website, created_at) VALUES(:id, :accountId, :url, :pageTitle, :text, :name, :email, :website, :createdAt)
 * ```
 */
export const postCommentForUrlWithTimestamp = new PreparedQuery<
  IPostCommentForUrlWithTimestampParams,
  IPostCommentForUrlWithTimestampResult
>(postCommentForUrlWithTimestampIR)

/** 'FlagCommentForUrl' parameters type */
export interface IFlagCommentForUrlParams {
  accountId: string | null | void
  email: string | null | void
  id: string | null | void
  name: string | null | void
  pageTitle: string | null | void
  text: string | null | void
  url: string | null | void
  website: string | null | void
}

/** 'FlagCommentForUrl' return type */
export type IFlagCommentForUrlResult = void

/** 'FlagCommentForUrl' query type */
export interface IFlagCommentForUrlQuery {
  params: IFlagCommentForUrlParams
  result: IFlagCommentForUrlResult
}

const flagCommentForUrlIR: any = {
  usedParamSet: {
    id: true,
    accountId: true,
    url: true,
    pageTitle: true,
    text: true,
    name: true,
    email: true,
    website: true,
  },
  params: [
    { name: 'id', required: false, transform: { type: 'scalar' }, locs: [{ a: 129, b: 131 }] },
    { name: 'accountId', required: false, transform: { type: 'scalar' }, locs: [{ a: 134, b: 143 }] },
    { name: 'url', required: false, transform: { type: 'scalar' }, locs: [{ a: 146, b: 149 }] },
    { name: 'pageTitle', required: false, transform: { type: 'scalar' }, locs: [{ a: 151, b: 160 }] },
    { name: 'text', required: false, transform: { type: 'scalar' }, locs: [{ a: 163, b: 167 }] },
    { name: 'name', required: false, transform: { type: 'scalar' }, locs: [{ a: 170, b: 174 }] },
    { name: 'email', required: false, transform: { type: 'scalar' }, locs: [{ a: 177, b: 182 }] },
    { name: 'website', required: false, transform: { type: 'scalar' }, locs: [{ a: 185, b: 192 }] },
  ],
  statement:
    "INSERT INTO reviews(id, account_id, page_url, page_title, comment, reader_name, reader_email, reader_website, created_at) VALUES(:id, :accountId, :url,:pageTitle, :text, :name, :email, :website, 'now'::timestamp)",
}

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO reviews(id, account_id, page_url, page_title, comment, reader_name, reader_email, reader_website, created_at) VALUES(:id, :accountId, :url,:pageTitle, :text, :name, :email, :website, 'now'::timestamp)
 * ```
 */
export const flagCommentForUrl = new PreparedQuery<IFlagCommentForUrlParams, IFlagCommentForUrlResult>(
  flagCommentForUrlIR
)

/** 'FlagCommentForUrlWithTimestamp' parameters type */
export interface IFlagCommentForUrlWithTimestampParams {
  accountId: string | null | void
  createdAt: Date | null | void
  email: string | null | void
  id: string | null | void
  name: string | null | void
  pageTitle: string | null | void
  text: string | null | void
  url: string | null | void
  website: string | null | void
}

/** 'FlagCommentForUrlWithTimestamp' return type */
export type IFlagCommentForUrlWithTimestampResult = void

/** 'FlagCommentForUrlWithTimestamp' query type */
export interface IFlagCommentForUrlWithTimestampQuery {
  params: IFlagCommentForUrlWithTimestampParams
  result: IFlagCommentForUrlWithTimestampResult
}

const flagCommentForUrlWithTimestampIR: any = {
  usedParamSet: {
    id: true,
    accountId: true,
    url: true,
    pageTitle: true,
    text: true,
    name: true,
    email: true,
    website: true,
    createdAt: true,
  },
  params: [
    { name: 'id', required: false, transform: { type: 'scalar' }, locs: [{ a: 129, b: 131 }] },
    { name: 'accountId', required: false, transform: { type: 'scalar' }, locs: [{ a: 134, b: 143 }] },
    { name: 'url', required: false, transform: { type: 'scalar' }, locs: [{ a: 146, b: 149 }] },
    { name: 'pageTitle', required: false, transform: { type: 'scalar' }, locs: [{ a: 151, b: 160 }] },
    { name: 'text', required: false, transform: { type: 'scalar' }, locs: [{ a: 163, b: 167 }] },
    { name: 'name', required: false, transform: { type: 'scalar' }, locs: [{ a: 170, b: 174 }] },
    { name: 'email', required: false, transform: { type: 'scalar' }, locs: [{ a: 177, b: 182 }] },
    { name: 'website', required: false, transform: { type: 'scalar' }, locs: [{ a: 185, b: 192 }] },
    { name: 'createdAt', required: false, transform: { type: 'scalar' }, locs: [{ a: 195, b: 204 }] },
  ],
  statement:
    'INSERT INTO reviews(id, account_id, page_url, page_title, comment, reader_name, reader_email, reader_website, created_at) VALUES(:id, :accountId, :url,:pageTitle, :text, :name, :email, :website, :createdAt)',
}

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO reviews(id, account_id, page_url, page_title, comment, reader_name, reader_email, reader_website, created_at) VALUES(:id, :accountId, :url,:pageTitle, :text, :name, :email, :website, :createdAt)
 * ```
 */
export const flagCommentForUrlWithTimestamp = new PreparedQuery<
  IFlagCommentForUrlWithTimestampParams,
  IFlagCommentForUrlWithTimestampResult
>(flagCommentForUrlWithTimestampIR)

/** 'CommentCountForAccount' parameters type */
export interface ICommentCountForAccountParams {
  accountId: string | null | void
}

/** 'CommentCountForAccount' return type */
export interface ICommentCountForAccountResult {
  Total: string | null
}

/** 'CommentCountForAccount' query type */
export interface ICommentCountForAccountQuery {
  params: ICommentCountForAccountParams
  result: ICommentCountForAccountResult
}

const commentCountForAccountIR: any = {
  usedParamSet: { accountId: true },
  params: [{ name: 'accountId', required: false, transform: { type: 'scalar' }, locs: [{ a: 58, b: 67 }] }],
  statement: 'SELECT COUNT(*) as "Total" FROM comments WHERE account_id=:accountId',
}

/**
 * Query generated from SQL:
 * ```
 * SELECT COUNT(*) as "Total" FROM comments WHERE account_id=:accountId
 * ```
 */
export const commentCountForAccount = new PreparedQuery<ICommentCountForAccountParams, ICommentCountForAccountResult>(
  commentCountForAccountIR
)

/** 'ReviewCountForAccount' parameters type */
export interface IReviewCountForAccountParams {
  accountId: string | null | void
}

/** 'ReviewCountForAccount' return type */
export interface IReviewCountForAccountResult {
  Total: string | null
}

/** 'ReviewCountForAccount' query type */
export interface IReviewCountForAccountQuery {
  params: IReviewCountForAccountParams
  result: IReviewCountForAccountResult
}

const reviewCountForAccountIR: any = {
  usedParamSet: { accountId: true },
  params: [{ name: 'accountId', required: false, transform: { type: 'scalar' }, locs: [{ a: 57, b: 66 }] }],
  statement: 'SELECT COUNT(*) as "Total" FROM reviews WHERE account_id=:accountId',
}

/**
 * Query generated from SQL:
 * ```
 * SELECT COUNT(*) as "Total" FROM reviews WHERE account_id=:accountId
 * ```
 */
export const reviewCountForAccount = new PreparedQuery<IReviewCountForAccountParams, IReviewCountForAccountResult>(
  reviewCountForAccountIR
)

/** 'FindByIdForAccount' parameters type */
export interface IFindByIdForAccountParams {
  accountId: string | null | void
  id: string | null | void
}

/** 'FindByIdForAccount' return type */
export interface IFindByIdForAccountResult {
  account_id: string
  comment: string
  created_at: Date
  id: string
  page_title: string | null
  page_url: string
  reader_email: string | null
  reader_name: string
  reader_website: string | null
}

/** 'FindByIdForAccount' query type */
export interface IFindByIdForAccountQuery {
  params: IFindByIdForAccountParams
  result: IFindByIdForAccountResult
}

const findByIdForAccountIR: any = {
  usedParamSet: { accountId: true, id: true },
  params: [
    { name: 'accountId', required: false, transform: { type: 'scalar' }, locs: [{ a: 40, b: 49 }] },
    { name: 'id', required: false, transform: { type: 'scalar' }, locs: [{ a: 58, b: 60 }] },
  ],
  statement: 'SELECT * FROM comments WHERE account_id=:accountId AND id=:id',
}

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM comments WHERE account_id=:accountId AND id=:id
 * ```
 */
export const findByIdForAccount = new PreparedQuery<IFindByIdForAccountParams, IFindByIdForAccountResult>(
  findByIdForAccountIR
)

/** 'CommentsForAccount' parameters type */
export interface ICommentsForAccountParams {
  accountId: string | null | void
}

/** 'CommentsForAccount' return type */
export interface ICommentsForAccountResult {
  account_id: string
  comment: string
  created_at: Date
  id: string
  page_title: string | null
  page_url: string
  reader_email: string | null
  reader_name: string
  reader_website: string | null
}

/** 'CommentsForAccount' query type */
export interface ICommentsForAccountQuery {
  params: ICommentsForAccountParams
  result: ICommentsForAccountResult
}

const commentsForAccountIR: any = {
  usedParamSet: { accountId: true },
  params: [{ name: 'accountId', required: false, transform: { type: 'scalar' }, locs: [{ a: 40, b: 49 }] }],
  statement: 'SELECT * FROM comments WHERE account_id=:accountId ORDER BY created_at DESC',
}

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM comments WHERE account_id=:accountId ORDER BY created_at DESC
 * ```
 */
export const commentsForAccount = new PreparedQuery<ICommentsForAccountParams, ICommentsForAccountResult>(
  commentsForAccountIR
)

/** 'CommentsForAccountPaged' parameters type */
export interface ICommentsForAccountPagedParams {
  accountId: string | null | void
  asc: boolean | null | void
  limit: string | null | void
  offset: string | null | void
}

/** 'CommentsForAccountPaged' return type */
export interface ICommentsForAccountPagedResult {
  account_id: string
  comment: string
  created_at: Date
  id: string
  page_title: string | null
  page_url: string
  reader_email: string | null
  reader_name: string
  reader_website: string | null
}

/** 'CommentsForAccountPaged' query type */
export interface ICommentsForAccountPagedQuery {
  params: ICommentsForAccountPagedParams
  result: ICommentsForAccountPagedResult
}

const commentsForAccountPagedIR: any = {
  usedParamSet: { accountId: true, asc: true, limit: true, offset: true },
  params: [
    { name: 'accountId', required: false, transform: { type: 'scalar' }, locs: [{ a: 40, b: 49 }] },
    { name: 'asc', required: false, transform: { type: 'scalar' }, locs: [{ a: 71, b: 74 }] },
    { name: 'limit', required: false, transform: { type: 'scalar' }, locs: [{ a: 131, b: 136 }] },
    { name: 'offset', required: false, transform: { type: 'scalar' }, locs: [{ a: 145, b: 151 }] },
  ],
  statement:
    'SELECT * FROM comments WHERE account_id=:accountId ORDER BY (CASE WHEN :asc = true THEN created_at END) ASC, created_at DESC LIMIT :limit OFFSET :offset',
}

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM comments WHERE account_id=:accountId ORDER BY (CASE WHEN :asc = true THEN created_at END) ASC, created_at DESC LIMIT :limit OFFSET :offset
 * ```
 */
export const commentsForAccountPaged = new PreparedQuery<
  ICommentsForAccountPagedParams,
  ICommentsForAccountPagedResult
>(commentsForAccountPagedIR)

/** 'FindSpamByIdForAccount' parameters type */
export interface IFindSpamByIdForAccountParams {
  accountId: string | null | void
  id: string | null | void
}

/** 'FindSpamByIdForAccount' return type */
export interface IFindSpamByIdForAccountResult {
  account_id: string
  comment: string
  created_at: Date
  id: string
  page_title: string | null
  page_url: string
  reader_email: string | null
  reader_name: string
  reader_website: string | null
}

/** 'FindSpamByIdForAccount' query type */
export interface IFindSpamByIdForAccountQuery {
  params: IFindSpamByIdForAccountParams
  result: IFindSpamByIdForAccountResult
}

const findSpamByIdForAccountIR: any = {
  usedParamSet: { accountId: true, id: true },
  params: [
    { name: 'accountId', required: false, transform: { type: 'scalar' }, locs: [{ a: 39, b: 48 }] },
    { name: 'id', required: false, transform: { type: 'scalar' }, locs: [{ a: 57, b: 59 }] },
  ],
  statement: 'SELECT * FROM reviews WHERE account_id=:accountId AND id=:id',
}

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM reviews WHERE account_id=:accountId AND id=:id
 * ```
 */
export const findSpamByIdForAccount = new PreparedQuery<IFindSpamByIdForAccountParams, IFindSpamByIdForAccountResult>(
  findSpamByIdForAccountIR
)

/** 'ReviewsForAccount' parameters type */
export interface IReviewsForAccountParams {
  accountId: string | null | void
}

/** 'ReviewsForAccount' return type */
export interface IReviewsForAccountResult {
  account_id: string
  comment: string
  created_at: Date
  id: string
  page_title: string | null
  page_url: string
  reader_email: string | null
  reader_name: string
  reader_website: string | null
}

/** 'ReviewsForAccount' query type */
export interface IReviewsForAccountQuery {
  params: IReviewsForAccountParams
  result: IReviewsForAccountResult
}

const reviewsForAccountIR: any = {
  usedParamSet: { accountId: true },
  params: [{ name: 'accountId', required: false, transform: { type: 'scalar' }, locs: [{ a: 39, b: 48 }] }],
  statement: 'SELECT * FROM reviews WHERE account_id=:accountId ORDER BY created_at DESC',
}

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM reviews WHERE account_id=:accountId ORDER BY created_at DESC
 * ```
 */
export const reviewsForAccount = new PreparedQuery<IReviewsForAccountParams, IReviewsForAccountResult>(
  reviewsForAccountIR
)

/** 'ReviewsForAccountPaged' parameters type */
export interface IReviewsForAccountPagedParams {
  accountId: string | null | void
  asc: boolean | null | void
  limit: string | null | void
  offset: string | null | void
}

/** 'ReviewsForAccountPaged' return type */
export interface IReviewsForAccountPagedResult {
  account_id: string
  comment: string
  created_at: Date
  id: string
  page_title: string | null
  page_url: string
  reader_email: string | null
  reader_name: string
  reader_website: string | null
}

/** 'ReviewsForAccountPaged' query type */
export interface IReviewsForAccountPagedQuery {
  params: IReviewsForAccountPagedParams
  result: IReviewsForAccountPagedResult
}

const reviewsForAccountPagedIR: any = {
  usedParamSet: { accountId: true, asc: true, limit: true, offset: true },
  params: [
    { name: 'accountId', required: false, transform: { type: 'scalar' }, locs: [{ a: 39, b: 48 }] },
    { name: 'asc', required: false, transform: { type: 'scalar' }, locs: [{ a: 70, b: 73 }] },
    { name: 'limit', required: false, transform: { type: 'scalar' }, locs: [{ a: 130, b: 135 }] },
    { name: 'offset', required: false, transform: { type: 'scalar' }, locs: [{ a: 144, b: 150 }] },
  ],
  statement:
    'SELECT * FROM reviews WHERE account_id=:accountId ORDER BY (CASE WHEN :asc = true THEN created_at END) ASC, created_at DESC LIMIT :limit OFFSET :offset',
}

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM reviews WHERE account_id=:accountId ORDER BY (CASE WHEN :asc = true THEN created_at END) ASC, created_at DESC LIMIT :limit OFFSET :offset
 * ```
 */
export const reviewsForAccountPaged = new PreparedQuery<IReviewsForAccountPagedParams, IReviewsForAccountPagedResult>(
  reviewsForAccountPagedIR
)

/** 'CommentsForUrl' parameters type */
export interface ICommentsForUrlParams {
  accountId: string | null | void
  url: string | null | void
}

/** 'CommentsForUrl' return type */
export interface ICommentsForUrlResult {
  account_id: string
  comment: string
  created_at: Date
  id: string
  page_title: string | null
  page_url: string
  reader_email: string | null
  reader_name: string
  reader_website: string | null
}

/** 'CommentsForUrl' query type */
export interface ICommentsForUrlQuery {
  params: ICommentsForUrlParams
  result: ICommentsForUrlResult
}

const commentsForUrlIR: any = {
  usedParamSet: { accountId: true, url: true },
  params: [
    { name: 'accountId', required: false, transform: { type: 'scalar' }, locs: [{ a: 40, b: 49 }] },
    { name: 'url', required: false, transform: { type: 'scalar' }, locs: [{ a: 64, b: 67 }] },
  ],
  statement: 'SELECT * FROM comments WHERE account_id=:accountId AND page_url=:url ORDER BY created_at ASC',
}

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM comments WHERE account_id=:accountId AND page_url=:url ORDER BY created_at ASC
 * ```
 */
export const commentsForUrl = new PreparedQuery<ICommentsForUrlParams, ICommentsForUrlResult>(commentsForUrlIR)

/** 'CommentsForUrlSinceDate' parameters type */
export interface ICommentsForUrlSinceDateParams {
  accountId: string | null | void
  date: Date | null | void
  url: string | null | void
}

/** 'CommentsForUrlSinceDate' return type */
export interface ICommentsForUrlSinceDateResult {
  account_id: string
  comment: string
  created_at: Date
  id: string
  page_title: string | null
  page_url: string
  reader_email: string | null
  reader_name: string
  reader_website: string | null
}

/** 'CommentsForUrlSinceDate' query type */
export interface ICommentsForUrlSinceDateQuery {
  params: ICommentsForUrlSinceDateParams
  result: ICommentsForUrlSinceDateResult
}

const commentsForUrlSinceDateIR: any = {
  usedParamSet: { accountId: true, url: true, date: true },
  params: [
    { name: 'accountId', required: false, transform: { type: 'scalar' }, locs: [{ a: 40, b: 49 }] },
    { name: 'url', required: false, transform: { type: 'scalar' }, locs: [{ a: 64, b: 67 }] },
    { name: 'date', required: false, transform: { type: 'scalar' }, locs: [{ a: 86, b: 90 }] },
  ],
  statement:
    'SELECT * FROM comments WHERE account_id=:accountId AND page_url=:url AND created_at > :date ORDER BY created_at ASC',
}

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM comments WHERE account_id=:accountId AND page_url=:url AND created_at > :date ORDER BY created_at ASC
 * ```
 */
export const commentsForUrlSinceDate = new PreparedQuery<
  ICommentsForUrlSinceDateParams,
  ICommentsForUrlSinceDateResult
>(commentsForUrlSinceDateIR)

/** 'DeleteSingleComment' parameters type */
export interface IDeleteSingleCommentParams {
  id: string | null | void
}

/** 'DeleteSingleComment' return type */
export type IDeleteSingleCommentResult = void

/** 'DeleteSingleComment' query type */
export interface IDeleteSingleCommentQuery {
  params: IDeleteSingleCommentParams
  result: IDeleteSingleCommentResult
}

const deleteSingleCommentIR: any = {
  usedParamSet: { id: true },
  params: [{ name: 'id', required: false, transform: { type: 'scalar' }, locs: [{ a: 30, b: 32 }] }],
  statement: 'DELETE FROM comments WHERE id=:id',
}

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM comments WHERE id=:id
 * ```
 */
export const deleteSingleComment = new PreparedQuery<IDeleteSingleCommentParams, IDeleteSingleCommentResult>(
  deleteSingleCommentIR
)

/** 'DeleteSingleSpam' parameters type */
export interface IDeleteSingleSpamParams {
  id: string | null | void
}

/** 'DeleteSingleSpam' return type */
export type IDeleteSingleSpamResult = void

/** 'DeleteSingleSpam' query type */
export interface IDeleteSingleSpamQuery {
  params: IDeleteSingleSpamParams
  result: IDeleteSingleSpamResult
}

const deleteSingleSpamIR: any = {
  usedParamSet: { id: true },
  params: [{ name: 'id', required: false, transform: { type: 'scalar' }, locs: [{ a: 29, b: 31 }] }],
  statement: 'DELETE FROM reviews WHERE id=:id',
}

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM reviews WHERE id=:id
 * ```
 */
export const deleteSingleSpam = new PreparedQuery<IDeleteSingleSpamParams, IDeleteSingleSpamResult>(deleteSingleSpamIR)

/** 'DeleteAllComments' parameters type */
export interface IDeleteAllCommentsParams {
  accountId: string | null | void
}

/** 'DeleteAllComments' return type */
export type IDeleteAllCommentsResult = void

/** 'DeleteAllComments' query type */
export interface IDeleteAllCommentsQuery {
  params: IDeleteAllCommentsParams
  result: IDeleteAllCommentsResult
}

const deleteAllCommentsIR: any = {
  usedParamSet: { accountId: true },
  params: [{ name: 'accountId', required: false, transform: { type: 'scalar' }, locs: [{ a: 38, b: 47 }] }],
  statement: 'DELETE FROM comments WHERE account_id=:accountId',
}

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM comments WHERE account_id=:accountId
 * ```
 */
export const deleteAllComments = new PreparedQuery<IDeleteAllCommentsParams, IDeleteAllCommentsResult>(
  deleteAllCommentsIR
)

/** 'DeleteAllSpam' parameters type */
export interface IDeleteAllSpamParams {
  accountId: string | null | void
}

/** 'DeleteAllSpam' return type */
export type IDeleteAllSpamResult = void

/** 'DeleteAllSpam' query type */
export interface IDeleteAllSpamQuery {
  params: IDeleteAllSpamParams
  result: IDeleteAllSpamResult
}

const deleteAllSpamIR: any = {
  usedParamSet: { accountId: true },
  params: [{ name: 'accountId', required: false, transform: { type: 'scalar' }, locs: [{ a: 37, b: 46 }] }],
  statement: 'DELETE FROM reviews WHERE account_id=:accountId',
}

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM reviews WHERE account_id=:accountId
 * ```
 */
export const deleteAllSpam = new PreparedQuery<IDeleteAllSpamParams, IDeleteAllSpamResult>(deleteAllSpamIR)
