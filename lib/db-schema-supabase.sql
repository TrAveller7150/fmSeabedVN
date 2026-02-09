-- Supabase (PostgreSQL) 数据库表结构
-- 在 Supabase Dashboard 的 SQL Editor 中执行此脚本

-- 二创作品表
CREATE TABLE IF NOT EXISTS fan_works (
  id SERIAL PRIMARY KEY,
  cover_image_url VARCHAR(500) NOT NULL,
  author VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  description TEXT,
  source_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  is_published BOOLEAN DEFAULT TRUE
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_fan_works_created_at ON fan_works(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_fan_works_is_published ON fan_works(is_published);

-- 创建 updated_at 自动更新触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_fan_works_updated_at BEFORE UPDATE ON fan_works
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 管理员表
CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_admins_username ON admins(username);

CREATE TRIGGER update_admins_updated_at BEFORE UPDATE ON admins
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 会话表
CREATE TABLE IF NOT EXISTS sessions (
  id VARCHAR(255) PRIMARY KEY,
  admin_id INTEGER NOT NULL REFERENCES admins(id) ON DELETE CASCADE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_sessions_admin_id ON sessions(admin_id);

-- 启用 Row Level Security (RLS) - 可选，根据需要配置
-- ALTER TABLE fan_works ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- 如果需要允许匿名用户读取已发布的作品，可以创建策略：
-- CREATE POLICY "Allow public read access to published fan works"
--   ON fan_works FOR SELECT
--   USING (is_published = true);
