/**
 * 数据库初始化脚本
 * 运行方式: npx tsx scripts/init-db.ts
 * 或: ts-node scripts/init-db.ts
 */

// 加载环境变量（必须在其他导入之前）
import * as dotenv from 'dotenv'
import * as path from 'path'

// 加载 .env.local 文件
dotenv.config({ path: path.join(__dirname, '../.env.local') })

import pool from '../lib/db'
import { initDefaultAdmin } from '../lib/auth'
import * as fs from 'fs'

async function initDatabase() {
    try {
        console.log('开始初始化数据库...')

        // 读取 SQL 文件
        const sqlPath = path.join(__dirname, '../lib/db-schema.sql')
        const sql = fs.readFileSync(sqlPath, 'utf-8')

        // 执行 SQL（按分号分割，逐个执行）
        const statements = sql
            .split(';')
            .map((s) => s.trim())
            .filter((s) => s.length > 0 && !s.startsWith('--'))

        for (const statement of statements) {
            try {
                await pool.execute(statement)
                console.log('✓ 执行成功:', statement.substring(0, 50) + '...')
            } catch (error: any) {
                // 忽略表已存在的错误
                if (error.code === 'ER_TABLE_EXISTS_ERROR') {
                    console.log('⚠ 表已存在，跳过:', statement.substring(0, 50) + '...')
                } else {
                    console.error('✗ 执行失败:', statement.substring(0, 50) + '...')
                    console.error('错误:', error.message)
                }
            }
        }

        // 初始化默认管理员
        console.log('\n初始化默认管理员账号...')
        await initDefaultAdmin()

        console.log('\n数据库初始化完成！')
        process.exit(0)
    } catch (error) {
        console.error('初始化失败:', error)
        process.exit(1)
    }
}

initDatabase()
