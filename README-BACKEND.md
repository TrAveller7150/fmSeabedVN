# 后端功能说明

## 功能概述

1. **二创作品管理**
   - 添加作品（封面图、作者、类别、简介、源地址）
   - 查看作品列表
   - 删除作品
   - 图片自动上传到阿里云 OSS

2. **管理员认证**
   - 登录/登出功能
   - Session 管理（7天有效期）
   - 密码加密存储（bcrypt）
   - 默认账号：`traveller` / `CIAspy667#7150`

## 数据库初始化

### 1. 创建数据库

在 MySQL 中创建数据库：

```sql
CREATE DATABASE seabed_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. 执行 SQL 脚本

方式一：直接执行 SQL 文件
```bash
mysql -u your_username -p seabed_db < lib/db-schema.sql
```

方式二：使用 Node.js 脚本（推荐）
```bash
# 安装 tsx（如果还没有）
npm install -D tsx

# 运行初始化脚本
npx tsx scripts/init-db.ts
```

### 3. 配置环境变量

复制 `.env.example` 为 `.env.local` 并填写配置：

```env
# 数据库配置
DB_HOST=your-mysql-host
DB_PORT=3306
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=seabed_db

# 阿里云 OSS 配置
OSS_REGION=oss-cn-beijing
OSS_ACCESS_KEY_ID=your-access-key-id
OSS_ACCESS_KEY_SECRET=your-access-key-secret
OSS_BUCKET=seabed-images

# 应用配置
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NODE_ENV=development
```

## API 路由

### 认证相关

- `POST /api/auth/login` - 登录
- `POST /api/auth/logout` - 登出
- `GET /api/auth/check` - 检查登录状态

### 二创作品相关

- `GET /api/fanworks` - 获取作品列表（公开）
  - 查询参数：`page`, `limit`
- `POST /api/fanworks` - 添加作品（需要认证）
  - FormData: `author`, `category`, `description`, `source_url`, `cover_image`
- `GET /api/fanworks/[id]` - 获取单个作品详情（需要认证）
- `PUT /api/fanworks/[id]` - 更新作品（需要认证）
  - FormData: `author`, `category`, `description`, `source_url`, `cover_image`（可选，不传则保留原图）
- `DELETE /api/fanworks/[id]` - 删除作品（需要认证）

## 管理后台页面

- `/admin/login` - 登录页面
- `/admin` - 管理后台主页（需要登录）
- `/admin/fanworks` - 二创作品管理页面（需要登录）

## 安全特性

1. **密码加密**：使用 bcrypt 加密存储
2. **Session 管理**：基于数据库的 Session，7天自动过期
3. **HTTP-only Cookie**：防止 XSS 攻击
4. **生产环境 Secure Cookie**：HTTPS 环境下自动启用
5. **路由保护**：管理后台路由自动验证登录状态

## 部署注意事项

1. **环境变量**：确保生产环境正确配置所有环境变量
2. **数据库连接**：确保数据库允许远程连接（如果数据库在远程）
3. **OSS 配置**：确保 OSS 存储桶已创建，并配置正确的 CORS 策略
4. **域名配置**：`admin.seabedvn.cn` 需要配置 DNS 指向你的服务器
5. **HTTPS**：生产环境必须使用 HTTPS（EdgeOne Pages 会自动配置）
6. **管理后台安全**：已实现随机路径 + 访问令牌双重保护，详见 `ADMIN-SECURITY.md`

## 默认管理员账号

- 用户名：`traveller`
- 密码：`CIAspy667#7150`

**重要**：首次部署后，请立即修改默认密码！
