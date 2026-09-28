-- Each topic is stored as one JSON document; `position` sets the order.
CREATE TABLE IF NOT EXISTS topics (
    slug TEXT PRIMARY KEY,
    position INTEGER NOT NULL,
    data TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS topics_position ON topics (position);

-- Failed admin logins per IP, for rate limiting.
CREATE TABLE IF NOT EXISTS login_attempts (
    ip TEXT PRIMARY KEY,
    failures INTEGER NOT NULL DEFAULT 0,
    window_start INTEGER NOT NULL
);
