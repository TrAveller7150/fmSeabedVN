import bcrypt from 'bcryptjs'
import pool from './db'
import { randomBytes } from 'crypto'

// 密码加密
export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10)
}

// 验证密码
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
}

// 生成 Session ID
export function generateSessionId(): string {
    return randomBytes(32).toString('hex')
}

// 创建 Session
export async function createSession(adminId: number): Promise<string> {
    const sessionId = generateSessionId()
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 天后过期

    await pool.execute(
        'INSERT INTO sessions (id, admin_id, expires_at) VALUES (?, ?, ?)',
        [sessionId, adminId, expiresAt]
    )

    return sessionId
}

// 验证 Session
export async function verifySession(sessionId: string): Promise<number | null> {
    const [rows] = await pool.execute<Array<{ admin_id: number }>>(
        'SELECT admin_id FROM sessions WHERE id = ? AND expires_at > NOW()',
        [sessionId]
    )

    if (Array.isArray(rows) && rows.length > 0) {
        return rows[0].admin_id
    }

    return null
}

// 删除 Session
export async function deleteSession(sessionId: string): Promise<void> {
    await pool.execute('DELETE FROM sessions WHERE id = ?', [sessionId])
}

// 初始化默认管理员账号（如果不存在）
export async function initDefaultAdmin(): Promise<void> {
    const [rows] = await pool.execute<Array<{ id: number }>>(
        'SELECT id FROM admins WHERE username = ?',
        ['traveller']
    )

    if (Array.isArray(rows) && rows.length === 0) {
        const passwordHash = await hashPassword('CIAspy667#7150')
        await pool.execute(
            'INSERT INTO admins (username, password_hash) VALUES (?, ?)',
            ['traveller', passwordHash]
        )
        console.log('默认管理员账号已创建: traveller')
    }
}
