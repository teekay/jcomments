/* @name expirePendingTokens */
UPDATE password_resets SET used_at=:now WHERE account_id=:accountId AND used_at IS NULL;

/* @name createPasswordResetToken */
INSERT INTO password_resets (id, account_id, token, created_at, expires_at) VALUES (:id, :accountId, :token, :createdAt, :expiresAt);

/* @name isTokenUsable */
SELECT * FROM password_resets WHERE token=:token AND used_at IS NULL AND expires_at > :date;

/* @name accountFromToken */
SELECT a.* FROM accounts a JOIN password_resets p ON (a.id=p.account_id) WHERE p.token=:token;

/* @name changePassword */
UPDATE accounts SET password=digest(:password::text, 'sha256') WHERE id=:accountId;