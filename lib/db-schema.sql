-- 数据库表结构

-- 二创作品表
CREATE TABLE IF NOT EXISTS `fan_works` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `cover_image_url` VARCHAR(500) NOT NULL COMMENT '封面图 URL（OSS）',
  `author` VARCHAR(100) NOT NULL COMMENT '作者信息',
  `category` VARCHAR(50) NOT NULL COMMENT '作品类别（画/视频/其他）',
  `description` TEXT COMMENT '作品简介',
  `source_url` VARCHAR(500) COMMENT '源地址（内嵌在封面图中）',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_published` BOOLEAN DEFAULT TRUE COMMENT '是否发布',
  INDEX `idx_created_at` (`created_at`),
  INDEX `idx_is_published` (`is_published`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='二创作品表';

-- 管理员表
CREATE TABLE IF NOT EXISTS `admins` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) UNIQUE NOT NULL COMMENT '用户名',
  `password_hash` VARCHAR(255) NOT NULL COMMENT '密码哈希',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX `idx_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='管理员表';

-- 会话表（用于存储登录 session）
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` VARCHAR(255) PRIMARY KEY COMMENT 'Session ID',
  `admin_id` INT NOT NULL COMMENT '管理员 ID',
  `expires_at` TIMESTAMP NOT NULL COMMENT '过期时间',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  FOREIGN KEY (`admin_id`) REFERENCES `admins`(`id`) ON DELETE CASCADE,
  INDEX `idx_expires_at` (`expires_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='会话表';
