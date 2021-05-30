/* @name PostCommentForUrl */
INSERT INTO comments(id, account_id, page_url, comment, reader_name, reader_email, created_at) VALUES(:id, :accountId, :url, :text, :name, :email, 'now'::timestamp);

/* @name CommentsForUrl */
SELECT page_url, comment, reader_name, reader_email, created_at FROM comments WHERE account_id=:accountId AND page_url=:url ORDER BY created_at;

/* @name CommentsForUrlSinceDate */
SELECT page_url, comment, reader_name, reader_email, created_at FROM comments WHERE account_id=:accountId AND page_url=:url AND created_at > :date ORDER BY created_at;