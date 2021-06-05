/* @name Signup */
INSERT INTO accounts (id, username, password, created_at) VALUES(:id, :username, digest(:password::text, 'sha256'), :createdAt);

/* @name initialAccountSettings */
INSERT INTO account_settings(id, account_id) VALUES(:id, :accountId);

/* @name Login */
SELECT * FROM accounts WHERE username=:username AND password=digest(:password::text, 'sha256');

/* @name findById */
SELECT * FROM accounts WHERE id=:id;

/* @name findByUsername */
SELECT * FROM accounts WHERE username=:username;

/* @name LoginFromToken */
SELECT DISTINCT a.* FROM accounts a JOIN tokens t ON (a.id=t.account_id) WHERE t.token=:token AND t.revoked_at IS NULL;

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

/* @name updateSettings */
UPDATE account_settings SET blog_url=:blogUrl, use_akismet=:useAkismet, akismet_key=:akismetKey WHERE account_id=:accountId;