// 数据库连接 - 已迁移到 Supabase
// 此文件保留用于向后兼容，实际使用 lib/db/supabase.ts

// 注意：如果将来需要支持 MySQL，可以在这里添加适配器层
export { supabase as default } from './db/supabase'
