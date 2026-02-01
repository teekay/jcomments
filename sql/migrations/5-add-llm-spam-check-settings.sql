ALTER TABLE account_settings ADD COLUMN use_llm_check BOOLEAN DEFAULT false;
ALTER TABLE account_settings ADD COLUMN llm_api_key VARCHAR(256);
ALTER TABLE account_settings ADD COLUMN llm_confidence_threshold DECIMAL DEFAULT 0.8;
