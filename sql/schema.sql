CREATE EXTENSION pgcrypto;

CREATE TABLE accounts(id CHARACTER(36) NOT NULL PRIMARY KEY, username VARCHAR(1024) NOT NULL, password bytea NOT NULL, created_at TIMESTAMP NOT NULL, UNIQUE(username));

CREATE TABLE tokens(id CHARACTER(36) NOT NULL PRIMARY KEY, account_id CHARACTER(36) NOT NULL REFERENCES accounts(id), token VARCHAR(512) NOT NULL, created_at TIMESTAMP NOT NULL, revoked_at TIMESTAMP DEFAULT NULL);

CREATE TABLE comments(id CHARACTER(36) NOT NULL PRIMARY KEY, account_id CHARACTER(36) NOT NULL REFERENCES accounts(id), page_url VARCHAR(2048) NOT NULL, comment TEXT NOT NULL, reader_name VARCHAR(512) NOT NULL, reader_email VARCHAR(512) DEFAULT NULL, created_at TIMESTAMP NOT NULL);

CREATE TABLE "sessions" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "sessions" ADD CONSTRAINT "sessions_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "sessions" ("expire");
