import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from './auth'

// 认证中间件（用于 API 路由）
export async function requireAuth(request: NextRequest): Promise<{ adminId: number } | null> {
  const sessionId = request.cookies.get('session_id')?.value

  if (!sessionId) {
    return null
  }

  const adminId = await verifySession(sessionId)
  return adminId ? { adminId } : null
}

// 重定向到登录页
export function redirectToLogin() {
  return NextResponse.redirect(new URL('/admin/login', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'))
}
