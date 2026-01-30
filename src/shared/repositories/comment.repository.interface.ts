/**
 * Database record for a comment.
 */
export interface CommentRecord {
  id: string
  account_id: string
  page_url: string
  page_title: string | null
  comment: string
  reader_name: string
  reader_email: string | null
  reader_website: string | null
  created_at: Date
}

/**
 * Parameters for creating a comment.
 */
export interface CreateCommentParams {
  id: string
  accountId: string
  url: string
  pageTitle: string | null
  text: string
  name: string
  email?: string
  website?: string
  createdAt?: Date
}

/**
 * Sort order for listing comments.
 */
export type CommentSortOrder = 'asc' | 'desc'

/**
 * Repository interface for comment operations.
 */
export interface ICommentRepository {
  /**
   * Insert an approved comment.
   */
  createComment(params: CreateCommentParams): Promise<void>

  /**
   * Insert a flagged comment (for moderation/spam).
   */
  createFlaggedComment(params: CreateCommentParams): Promise<void>

  /**
   * Get comment count for an account.
   */
  countForAccount(accountId: string): Promise<number>

  /**
   * Get flagged/spam comment count for an account.
   */
  countFlaggedForAccount(accountId: string): Promise<number>

  /**
   * Get all comments for an account.
   */
  findAllForAccount(accountId: string): Promise<CommentRecord[]>

  /**
   * Get paged comments for an account.
   */
  findPagedForAccount(
    accountId: string,
    sort: CommentSortOrder,
    limit: number,
    offset: number
  ): Promise<CommentRecord[]>

  /**
   * Get paged flagged/spam comments for an account.
   */
  findPagedFlaggedForAccount(
    accountId: string,
    sort: CommentSortOrder,
    limit: number,
    offset: number
  ): Promise<CommentRecord[]>

  /**
   * Get comments for a specific URL.
   */
  findForUrl(accountId: string, url: string): Promise<CommentRecord[]>

  /**
   * Get comments for a specific URL since a date.
   */
  findForUrlSinceDate(accountId: string, url: string, date: Date): Promise<CommentRecord[]>

  /**
   * Find a comment by ID for an account.
   */
  findById(accountId: string, id: string): Promise<CommentRecord | undefined>

  /**
   * Find a flagged/spam comment by ID for an account.
   */
  findFlaggedById(accountId: string, id: string): Promise<CommentRecord | undefined>

  /**
   * Delete a single comment.
   */
  deleteComment(id: string): Promise<void>

  /**
   * Delete a single flagged/spam comment.
   */
  deleteFlaggedComment(id: string): Promise<void>

  /**
   * Delete all comments for an account.
   */
  deleteAllForAccount(accountId: string): Promise<void>

  /**
   * Delete all flagged/spam comments for an account.
   */
  deleteAllFlaggedForAccount(accountId: string): Promise<void>

  /**
   * Begin a transaction.
   */
  beginTransaction(): Promise<void>

  /**
   * Commit a transaction.
   */
  commitTransaction(): Promise<void>

  /**
   * Rollback a transaction.
   */
  rollbackTransaction(): Promise<void>
}

export const COMMENT_REPOSITORY = 'COMMENT_REPOSITORY'
