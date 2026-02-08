import mysql from 'mysql2/promise'

// 创建连接池
// 注意：这是配置模板，实际使用时需要从环境变量读取
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'seabed_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4',
})

export default pool

// 使用示例（后续实现）：
// const [rows] = await pool.execute('SELECT * FROM fan_works WHERE is_published = ?', [true])
