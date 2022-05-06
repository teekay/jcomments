/* @name PostCommentForUrl */
INSERT INTO comments(id, account_id, page_url, page_title, comment, reader_name, reader_email, reader_website, created_at) VALUES(:id, :accountId, :url, :pageTitle, :text, :name, :email, :website, 'now'::timestamp);

/* @name PostCommentForUrlWithTimestamp */
INSERT INTO comments(id, account_id, page_url, page_title, comment, reader_name, reader_email, reader_website, created_at) VALUES(:id, :accountId, :url, :pageTitle, :text, :name, :email, :website, :createdAt);

/* @name FlagCommentForUrl */
INSERT INTO reviews(id, account_id, page_url, page_title, comment, reader_name, reader_email, reader_website, created_at) VALUES(:id, :accountId, :url,:pageTitle, :text, :name, :email, :website, 'now'::timestamp);

/* @name FlagCommentForUrlWithTimestamp */
INSERT INTO reviews(id, account_id, page_url, page_title, comment, reader_name, reader_email, reader_website, created_at) VALUES(:id, :accountId, :url,:pageTitle, :text, :name, :email, :website, :createdAt);

/* @name CommentCountForAccount */
SELECT COUNT(*) as "Total" FROM comments WHERE account_id=:accountId;

/* @name ReviewCountForAccount */
SELECT COUNT(*) as "Total" FROM reviews WHERE account_id=:accountId;

/* @name FindByIdForAccount */
SELECT * FROM comments WHERE account_id=:accountId AND id=:id;

/* @name CommentsForAccount */
SELECT * FROM comments WHERE account_id=:accountId ORDER BY created_at DESC;

/* @name CommentsForAccountPaged */
SELECT * FROM comments WHERE account_id=:accountId ORDER BY (CASE WHEN :asc = true THEN created_at END) ASC, created_at DESC LIMIT :limit OFFSET :offset;

/* @name FindSpamByIdForAccount */
SELECT * FROM reviews WHERE account_id=:accountId AND id=:id;

/* @name ReviewsForAccount */
SELECT * FROM reviews WHERE account_id=:accountId ORDER BY created_at DESC;

/* @name ReviewsForAccountPaged */
SELECT * FROM reviews WHERE account_id=:accountId ORDER BY (CASE WHEN :asc = true THEN created_at END) ASC, created_at DESC LIMIT :limit OFFSET :offset;

/* @name CommentsForUrl */
SELECT * FROM comments WHERE account_id=:accountId AND page_url=:url ORDER BY created_at ASC;

/* @name CommentsForUrlSinceDate */
SELECT * FROM comments WHERE account_id=:accountId AND page_url=:url AND created_at > :date ORDER BY created_at ASC;

/* @name DeleteSingleComment */
DELETE FROM comments WHERE id=:id;

/* @name DeleteSingleSpam */
DELETE FROM reviews WHERE id=:id;

/* @name DeleteAllComments */
DELETE FROM comments WHERE account_id=:accountId;

/* @name DeleteAllSpam */
DELETE FROM reviews WHERE account_id=:accountId;

