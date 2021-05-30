/* @name Login */
SELECT * FROM accounts WHERE username=:username AND password=digest(:password::text, 'sha256');

/* @name LoginFromToken */
SELECT DISTINCT a.* FROM accounts a JOIN tokens t ON (a.id=t.account_id) WHERE t.token=:token AND t.revoked_at IS NULL;