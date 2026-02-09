import { supabase } from '../supabase'

// 管理员相关查询

export interface Admin {
  id: number
  username: string
  password_hash: string
  created_at: string
  updated_at: string
}

// 根据用户名获取管理员
export async function getAdminByUsername(username: string): Promise<{ id: number; password_hash: string } | null> {
  const { data, error } = await supabase
    .from('admins')
    .select('id, password_hash')
    .eq('username', username)
    .single()

  if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
    throw error
  }

  return data as { id: number; password_hash: string } | null
}

// 检查管理员是否存在
export async function adminExists(username: string) {
  const { data, error } = await supabase
    .from('admins')
    .select('id')
    .eq('username', username)
    .single()

  if (error && error.code !== 'PGRST116') {
    throw error
  }

  return data !== null
}

// 创建管理员
export async function createAdmin(username: string, passwordHash: string): Promise<Admin> {
  const query = (supabase.from('admins') as any).insert({
    username,
    password_hash: passwordHash
  })
  const { data, error } = await query
    .select()
    .single()

  if (error) throw error
  return data as Admin
}
