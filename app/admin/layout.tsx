import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { verifySession } from '@/lib/auth'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 注意：登录页面有自己的 layout，不会执行到这里
  // middleware 已经处理了登录页面的放行
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('session_id')?.value

  // 获取管理后台路径配置
  const adminPath = process.env.ADMIN_SECRET_PATH || '/admin'
  const loginPath = `${adminPath}/login`

  if (!sessionId) {
    redirect(loginPath)
  }

  const adminId = await verifySession(sessionId)
  if (!adminId) {
    redirect(loginPath)
  }

  return <>{children}</>
}
