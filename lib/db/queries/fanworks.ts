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

const ALL_CATEGORIES = '全部'
const OTHER_CATEGORY = '其他'

export type FanWorksSortOrder = 'newest' | 'oldest'

// 获取已发布的作品列表（分页，支持按类型筛选与按时间排序）
// 优化：列表查询与 count 并行，减少总等待时间
export async function getPublishedFanWorks(
  page: number = 1,
  limit: number = 50,
  category?: string,
  sortOrder: FanWorksSortOrder = 'newest'
) {
  const offset = (page - 1) * limit
  const filterCategory = category?.trim() && category !== ALL_CATEGORIES ? category : undefined
  const ascending = sortOrder === 'oldest'

  let listQuery = supabase
    .from('fan_works')
    .select('id, cover_image_url, author, category, description, source_url, created_at')
    .eq('is_published', true)

  if (filterCategory) {
    listQuery = listQuery.eq('category', filterCategory)
  }

  let countQuery = supabase
    .from('fan_works')
    .select('*', { count: 'exact', head: true })
    .eq('is_published', true)

  if (filterCategory) {
    countQuery = countQuery.eq('category', filterCategory)
  }

  const [listResult, countResult] = await Promise.all([
    listQuery.order('created_at', { ascending }).range(offset, offset + limit - 1),
    countQuery,
  ])

  const { data, error } = listResult
  if (error) throw error

  const { count, error: countError } = countResult
  if (countError) throw countError

  return {
    data: data || [],
    total: count || 0,
    page,
    limit,
    totalPages: Math.ceil((count || 0) / limit)
  }
}

// 分类列表缓存（避免每次请求全表拉取 category）
const CATEGORIES_CACHE_TTL_MS = 5 * 60 * 1000 // 5 分钟
let categoriesCache: { data: string[]; expiresAt: number } | null = null

export function invalidateCategoriesCache(): void {
  categoriesCache = null
}

// 获取所有已出现过的分类（用于筛选选项），并固定包含「其他」
// 优化：内存缓存，减少全表扫描频率；增删改作品后需调用 invalidateCategoriesCache
export async function getDistinctCategories(): Promise<string[]> {
  const now = Date.now()
  if (categoriesCache && categoriesCache.expiresAt > now) {
    return categoriesCache.data
  }

  const { data, error } = await supabase
    .from('fan_works')
    .select('category')
    .eq('is_published', true)

  if (error) throw error

  const set = new Set<string>()
  ;(data || []).forEach((row: { category: string | null }) => {
    const c = row.category?.trim()
    if (c) set.add(c)
  })
  if (!set.has(OTHER_CATEGORY)) set.add(OTHER_CATEGORY)

  const list = Array.from(set).sort((a, b) => a.localeCompare(b, 'zh-CN'))
  categoriesCache = { data: list, expiresAt: now + CATEGORIES_CACHE_TTL_MS }
  return list
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
