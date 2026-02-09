import bcrypt from 'bcryptjs'
import { randomBytes } from 'crypto'
import * as sessionQueries from './db/queries/sessions'
import * as adminQueries from './db/queries/admins'

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

    await sessionQueries.createSession(sessionId, adminId, expiresAt)
    return sessionId
}

// 验证 Session
export async function verifySession(sessionId: string): Promise<number | null> {
    return await sessionQueries.verifySession(sessionId)
}

// 删除 Session
export async function deleteSession(sessionId: string): Promise<void> {
    await sessionQueries.deleteSession(sessionId)
}

// 初始化默认管理员账号（如果不存在）
export async function initDefaultAdmin(): Promise<void> {
    const defaultUsername = process.env.DEFAULT_ADMIN_USERNAME || 'admin'
    const exists = await adminQueries.adminExists(defaultUsername)

    if (!exists) {
        // 从环境变量读取默认管理员信息，如果没有则使用占位符（仅用于开发环境）
        const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'changeme'

        if (defaultPassword === 'changeme') {
            console.warn('警告: 使用默认密码 "changeme"，请在生产环境中设置 DEFAULT_ADMIN_PASSWORD 环境变量')
        }

        const passwordHash = await hashPassword(defaultPassword)
        await adminQueries.createAdmin(defaultUsername, passwordHash)
        console.log(`默认管理员账号已创建: ${defaultUsername}`)
    }
}
