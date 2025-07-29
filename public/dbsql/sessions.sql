
CREATE TABLE IF NOT EXISTS sessions (
  session_id VARCHAR(255) NOT NULL PRIMARY KEY, -- 会话 ID，必须唯一
  expires INT(11) UNSIGNED,                    -- 会话过期时间，UNIX 时间戳
  data MEDIUMTEXT                              -- 存储会话数据
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 添加索引以提高性能
CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions (expires);
