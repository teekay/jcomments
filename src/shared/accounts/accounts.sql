/* @name Signup */
INSERT INTO accounts (id, username, email, password, created_at) VALUES(:id, :username, :email, digest(:password::text, 'sha256'), :createdAt);

/* @name initialAccountSettings */
INSERT INTO account_settings(id, account_id) VALUES(:id, :accountId);

/* @name initialAccountEmailSettings */
INSERT INTO account_email_settings(id, account_id) VALUES(:id, :accountId);

/* @name Login */
SELECT * FROM accounts WHERE username=:username AND password=digest(:password::text, 'sha256');

/* @name findById */
SELECT * FROM accounts WHERE id=:id;

/* @name findByUsername */
SELECT * FROM accounts WHERE username=:username;

/* @name findByEmail */
SELECT * FROM accounts WHERE email=:email;

/* @name CreateToken */
INSERT INTO tokens (id, account_id, token, created_at) VALUES (:id, :accountId, :token, :createdAt);

/* @name RevokeToken */
UPDATE tokens SET revoked_at=:revokedAt WHERE token=:token;

/* @name findToken */
SELECT * FROM tokens WHERE token=:token;

/* @name findCurrentToken */
SELECT * FROM tokens WHERE account_id=:accountId AND revoked_at IS NULL;

/* @name accountSettings */
SELECT * FROM account_settings WHERE account_id=:accountId;

/* @name accountEmailSettings */
SELECT * FROM account_email_settings WHERE account_id=:accountId;

/* @name updateSettings */
UPDATE account_settings SET require_moderation=:requireModeration, blog_url=:blogUrl, use_akismet=:useAkismet, akismet_key=:akismetKey WHERE account_id=:accountId;

/* @name updateEmailSettings */
UPDATE account_email_settings SET notify_on_comments=:notifyOnComments, send_comments_digest=:sendCommentsDigest WHERE account_id=:accountId;

/* @name findUserByEmailOrUsername */
SELECT * FROM accounts WHERE username=:username OR email=:email;

/* @name changeAccountEmail */
UPDATE accounts SET email=:email WHERE id=:accountId;