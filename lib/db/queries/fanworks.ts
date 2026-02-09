import { supabase } from '../supabase'

// 二创作品相关查询

export interface FanWork {
  id: number
  cover_image_url: string
  author: string
  category: string
  description: string | null
  source_url: string | null
  created_at: string
  is_published: boolean
}

// 获取已发布的作品列表（分页）
export async function getPublishedFanWorks(page: number = 1, limit: number = 50) {
  const offset = (page - 1) * limit

  const { data, error } = await supabase
    .from('fan_works')
    .select('id, cover_image_url, author, category, description, source_url, created_at')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) throw error

  // 获取总数
  const { count, error: countError } = await supabase
    .from('fan_works')
    .select('*', { count: 'exact', head: true })
    .eq('is_published', true)

  if (countError) throw countError

  return {
    data: data || [],
    total: count || 0,
    page,
    limit,
    totalPages: Math.ceil((count || 0) / limit)
  }
}

// 根据 ID 获取单个作品
export async function getFanWorkById(id: number): Promise<FanWork | null> {
  const { data, error } = await supabase
    .from('fan_works')
    .select('id, cover_image_url, author, category, description, source_url, created_at')
    .eq('id', id)
    .single()

  if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
    throw error
  }

  return data as FanWork | null
}

// 创建新作品
export async function createFanWork(work: {
  cover_image_url: string
  author: string
  category: string
  description: string | null
  source_url: string | null
}): Promise<FanWork> {
  const query = (supabase.from('fan_works') as any).insert({
    ...work,
    is_published: true
  })
  const { data, error } = await query
    .select()
    .single()

  if (error) throw error
  return data as FanWork
}

// 更新作品
export async function updateFanWork(
  id: number,
  updates: {
    cover_image_url?: string
    author?: string
    category?: string
    description?: string | null
    source_url?: string | null
  }
): Promise<FanWork> {
  const query = (supabase.from('fan_works') as any).update(updates)
  const { data, error } = await query
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as FanWork
}

// 删除作品
export async function deleteFanWork(id: number) {
  const { error } = await supabase
    .from('fan_works')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// 获取作品的封面图 URL（用于删除 OSS 图片）
export async function getFanWorkImageUrl(id: number): Promise<string | null> {
  const { data, error } = await supabase
    .from('fan_works')
    .select('cover_image_url')
    .eq('id', id)
    .single()

  if (error && error.code !== 'PGRST116') {
    throw error
  }

  return (data as { cover_image_url: string } | null)?.cover_image_url || null
}
