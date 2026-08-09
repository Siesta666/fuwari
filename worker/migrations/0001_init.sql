-- 访客去重表：同一访客(id)同一天(date)只保留一行
CREATE TABLE IF NOT EXISTS uv (
	id   TEXT NOT NULL,
	date TEXT NOT NULL,
	PRIMARY KEY (id, date)
);

CREATE INDEX IF NOT EXISTS idx_uv_date ON uv(date);
