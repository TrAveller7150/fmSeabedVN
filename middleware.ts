import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl
  const sessionId = request.cookies.get('session_id')?.value

  // 获取管理后台安全配置
  const adminPath = process.env.ADMIN_SECRET_PATH || '/admin'
  const adminToken = process.env.ADMIN_ACCESS_TOKEN || ''
  const pathWithoutSlash = adminPath.replace(/^\//, '') // 移除开头的 /
  
  // 检查是否是管理后台路径（包括登录页面）
  // 注意：middleware 在 rewrites 之前执行，所以这里检查原始路径
  const isSecretAdminPath = pathname.startsWith(`/${pathWithoutSlash}/`) || pathname === `/${pathWithoutSlash}`
  const isSecretLoginPath = pathname === `/${pathWithoutSlash}/login`
  const isAdminRoute = pathname.startsWith('/admin')
  const isLoginRoute = pathname === '/login'
  
  // 如果访问的是随机路径的管理后台或登录页，需要验证 token
  if (isSecretAdminPath || isSecretLoginPath) {
    // 检查访问令牌
    const token = searchParams.get('token')
    
    if (token !== adminToken) {
      // 返回 404，不暴露管理后台存在
      return NextResponse.rewrite(new URL('/404', request.url))
    }
  }
  
  // 如果是登录路由（经过 rewrites 后的），也需要验证 token
  if (isLoginRoute) {
    const token = searchParams.get('token')
    if (token !== adminToken) {
      // 返回 404，不暴露管理后台存在
      return NextResponse.rewrite(new URL('/404', request.url))
    }
  }
  
  // 如果是管理后台路由（经过 rewrites 后的），检查登录状态
  if (isAdminRoute) {
    if (!sessionId) {
      // 重定向到登录页，保留 token 参数
      const token = searchParams.get('token') || adminToken
      return NextResponse.redirect(new URL(`/login?token=${token}`, request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/login',
    '/:path*', // 匹配所有路径以检查管理后台路径（包括随机路径）
  ],
}
