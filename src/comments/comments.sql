/* @name PostCommentForUrl */
INSERT INTO comments(id, page_url, comment, reader_name, reader_email, created_at) VALUES(:id, :url, :text, :name, :email, 'now'::timestamp);

/* @name CommentsForUrl */
SELECT page_url, comment, reader_name, reader_email FROM comments WHERE page_url=:url ORDER BY created_at;

/* @name CommentsForUrlSinceDate */
SELECT page_url, comment, reader_name, reader_email FROM comments WHERE page_url=:url AND created_at > :date ORDER BY created_at;