-- SQLite schema for JComments
-- Equivalent to PostgreSQL migrations 1-4

-- Accounts table
CREATE TABLE IF NOT EXISTS accounts (
  id TEXT NOT NULL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  created_at TEXT NOT NULL
);

-- Account settings
CREATE TABLE IF NOT EXISTS account_settings (
  id TEXT NOT NULL PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(id),
  blog_url TEXT,
  akismet_key TEXT,
  use_akismet INTEGER DEFAULT 0,
  require_moderation INTEGER NOT NULL DEFAULT 0,
  use_llm_check INTEGER DEFAULT 0,
  llm_api_key TEXT,
  llm_confidence_threshold REAL DEFAULT 0.8
);

-- Account email settings
CREATE TABLE IF NOT EXISTS account_email_settings (
  id TEXT NOT NULL PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(id),
  notify_on_comments INTEGER DEFAULT 0,
  send_comments_digest INTEGER DEFAULT 0
);

-- API tokens
CREATE TABLE IF NOT EXISTS tokens (
  id TEXT NOT NULL PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(id),
  token TEXT NOT NULL,
  created_at TEXT NOT NULL,
  revoked_at TEXT DEFAULT NULL
);

-- Approved comments
CREATE TABLE IF NOT EXISTS comments (
  id TEXT NOT NULL PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(id),
  page_url TEXT NOT NULL,
  page_title TEXT DEFAULT NULL,
  comment TEXT NOT NULL,
  reader_name TEXT NOT NULL,
  reader_email TEXT DEFAULT NULL,
  reader_website TEXT DEFAULT NULL,
  created_at TEXT NOT NULL
);

-- Flagged/spam comments (reviews)
CREATE TABLE IF NOT EXISTS reviews (
  id TEXT NOT NULL PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(id),
  page_url TEXT NOT NULL,
  page_title TEXT DEFAULT NULL,
  comment TEXT NOT NULL,
  reader_name TEXT NOT NULL,
  reader_email TEXT DEFAULT NULL,
  reader_website TEXT DEFAULT NULL,
  created_at TEXT NOT NULL
);

-- Password reset tokens
CREATE TABLE IF NOT EXISTS password_resets (
  id TEXT NOT NULL PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(id),
  token TEXT NOT NULL,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  used_at TEXT DEFAULT NULL
);

-- Sessions (for express-session)
CREATE TABLE IF NOT EXISTS sessions (
  sid TEXT NOT NULL PRIMARY KEY,
  sess TEXT NOT NULL,
  expire TEXT NOT NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_comments_account_id ON comments(account_id);
CREATE INDEX IF NOT EXISTS idx_comments_page_url ON comments(account_id, page_url);
CREATE INDEX IF NOT EXISTS idx_reviews_account_id ON reviews(account_id);
CREATE INDEX IF NOT EXISTS idx_tokens_account_id ON tokens(account_id);
CREATE INDEX IF NOT EXISTS idx_tokens_token ON tokens(token);
CREATE INDEX IF NOT EXISTS idx_password_resets_token ON password_resets(token);
CREATE INDEX IF NOT EXISTS idx_sessions_expire ON sessions(expire);
