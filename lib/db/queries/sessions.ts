import { supabase } from '../supabase'

// 会话相关查询

// 创建会话
export async function createSession(sessionId: string, adminId: number, expiresAt: Date): Promise<void> {
  const query = (supabase.from('sessions') as any).insert({
    id: sessionId,
    admin_id: adminId,
    expires_at: expiresAt.toISOString()
  })
  const { error } = await query

  if (error) throw error
}

// 验证会话（返回管理员 ID）
export async function verifySession(sessionId: string): Promise<number | null> {
  const { data, error } = await supabase
    .from('sessions')
    .select('admin_id')
    .eq('id', sessionId)
    .gt('expires_at', new Date().toISOString())
    .single()

  if (error && error.code !== 'PGRST116') {
    throw error
  }

  return (data as { admin_id: number } | null)?.admin_id || null
}

// 删除会话
export async function deleteSession(sessionId: string): Promise<void> {
  const { error } = await supabase
    .from('sessions')
    .delete()
    .eq('id', sessionId)

  if (error) throw error
}
