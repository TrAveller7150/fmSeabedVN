# 四叶草事务所 · Seabed 粉丝站

由粉丝建立的、非营利性质的 [Seabed](https://store.steampowered.com/app/404480/Seabed/) 游戏粉丝站。

---

## 技术栈

- **框架**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI**: React 19、TypeScript、Tailwind CSS 4
- **数据**: [Supabase](https://supabase.com/) (PostgreSQL)
- **存储**: 阿里云 OSS
- **认证**: 自建 Session（bcrypt + Cookie）

---

## 功能概览

| 模块       | 说明 |
|------------|------|
| 首页       | Hero、游戏简介、购买入口、Footer |
| 二创作品   | 列表展示，按类型筛选、按时间排序；「画」类支持全图预览 |
| 剧情解析   | 剧情相关文章搬运 |
| 作者相关   | 作者与幕后信息 |
| 圣地巡礼   | 圣地巡礼内容 |
| 资源站     | 游戏相关资源（解包、音乐等） |
| 管理后台   | 需 URL 令牌 + 登录；二创的增删改、封面图上传 |

---

## 本地开发

### 1. 安装依赖

```bash
npm install
```

### 2. 环境变量

在项目根目录创建 `.env.local`，参考下列变量（按需填写）：

```env
# 站点
NEXT_PUBLIC_SITE_URL=https://seabedvn.cn

# Supabase（必填）
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=your_anon_key

# 管理后台（可选，生产环境建议设置）
ADMIN_SECRET_PATH=/admin          # 后台路径，访问需带 token
ADMIN_ACCESS_TOKEN=your_secret    # 访问 /admin?token=xxx 的令牌
DEFAULT_ADMIN_USERNAME=admin      # 首次创建的管理员用户名
DEFAULT_ADMIN_PASSWORD=changeme   # 首次创建的管理员密码（生产务必修改）

# 阿里云 OSS（二创封面上传，管理后台使用）
OSS_REGION=oss-cn-xxx
OSS_ACCESS_KEY_ID=xxx
OSS_ACCESS_KEY_SECRET=xxx
OSS_BUCKET=your-bucket-name
```

前端用到的变量（若管理端需在浏览器里拼后台链接，可配）：

- `NEXT_PUBLIC_ADMIN_PATH`、`NEXT_PUBLIC_ADMIN_ACCESS_TOKEN`（可选）

### 3. 数据库初始化

在 Supabase 项目的 SQL Editor 中执行：

```bash
# 表结构见项目内
lib/db-schema-supabase.sql
```

执行后会有 `fan_works`、`admins`、`sessions` 等表及索引。

### 4. 启动

```bash
npm run dev
```

浏览器访问 [http://localhost:3000](http://localhost:3000)。

- 管理后台：`http://localhost:3000/admin?token=你的ADMIN_ACCESS_TOKEN`（未配置 token 时可能 404）

---

## 脚本说明

| 命令           | 说明 |
|----------------|------|
| `npm run dev`  | 开发模式（Webpack） |
| `npm run build`| 生产构建 |
| `npm run start`| 生产模式启动 |
| `npm run lint` | 运行 ESLint |

---

## 项目结构（简要）

```
seabed-next/
├── app/
│   ├── layout.tsx          # 根布局、SEO、首屏图 preload
│   ├── page.tsx            # 首页
│   ├── fanworks/           # 二创列表
│   ├── story-analysis/     # 剧情解析
│   ├── author/             # 作者相关
│   ├── pilgrimage/         # 圣地巡礼
│   ├── resources/          # 资源站
│   ├── login/              # 管理端登录
│   ├── admin/              # 管理后台（含 fanworks 管理）
│   └── api/                # API：auth、fanworks CRUD
├── components/
│   ├── layouts/            # MainLayout
│   ├── common/             # Header、Footer、Nav、RevealAnimation
│   ├── home/               # Hero、Story、Pricing
│   └── fanworks/           # FanWorksList、筛选与全图预览
├── lib/
│   ├── db/                 # Supabase 客户端与 fanworks/admins/sessions 查询
│   ├── auth.ts             # 密码与 Session 逻辑
│   ├── oss-upload.ts       # 阿里云 OSS 上传/删除
│   └── middleware.ts       # 请求认证
├── middleware.ts           # 路由层：后台路径与 token 校验
└── lib/db-schema-supabase.sql  # 数据库表结构
```

---

## 部署与生产

- 构建：`npm run build`
- 运行：`npm run start`
- 生产环境请务必设置强 `ADMIN_ACCESS_TOKEN` 与 `DEFAULT_ADMIN_PASSWORD`，并保证 Supabase、OSS 相关变量正确。
- 后台路径通过 `ADMIN_SECRET_PATH` 与 `ADMIN_ACCESS_TOKEN` 隐藏，未带正确 token 的访问会返回 404。

---

## 致谢与版权

- 本站为粉丝向、非营利项目；游戏《Seabed》版权归原作者所有。
- 本站由 TrAveller7150 制作与维护。
