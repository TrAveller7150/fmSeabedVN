import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/middleware'
import { deleteImage, uploadImage } from '@/lib/oss-upload'
import * as fanworkQueries from '@/lib/db/queries/fanworks'

// 获取单个作品（需要认证）
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 检查认证
    const auth = await requireAuth(request)
    if (!auth) {
      return NextResponse.json(
        { error: '未授权' },
        { status: 401 }
      )
    }

    const { id: idParam } = await params
    const id = parseInt(idParam)
    if (isNaN(id)) {
      return NextResponse.json(
        { error: '无效的作品 ID' },
        { status: 400 }
      )
    }

    const work = await fanworkQueries.getFanWorkById(id)

    if (!work) {
      return NextResponse.json(
        { error: '作品不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: work })
  } catch (error) {
    console.error('获取作品错误:', error)
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}

// 更新作品（需要认证）
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 检查认证
    const auth = await requireAuth(request)
    if (!auth) {
      return NextResponse.json(
        { error: '未授权' },
        { status: 401 }
      )
    }

    const { id: idParam } = await params
    const id = parseInt(idParam)
    if (isNaN(id)) {
      return NextResponse.json(
        { error: '无效的作品 ID' },
        { status: 400 }
      )
    }

    const formData = await request.formData()
    const author = formData.get('author') as string | null
    const category = formData.get('category') as string | null
    const description = formData.get('description') as string | null
    const sourceUrl = formData.get('source_url') as string | null
    const coverImage = formData.get('cover_image') as File | null

    // 获取当前作品信息
    const currentImageUrl = await fanworkQueries.getFanWorkImageUrl(id)

    if (!currentImageUrl) {
      return NextResponse.json(
        { error: '作品不存在' },
        { status: 404 }
      )
    }

    let imageUrl = currentImageUrl

    // 如果上传了新图片，替换旧图片
    if (coverImage) {
      // 删除旧图片
      await deleteImage(currentImageUrl)
      
      // 上传新图片
      const arrayBuffer = await coverImage.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      imageUrl = await uploadImage(buffer, coverImage.name)
    }

    // 构建更新对象
    const updates: {
      cover_image_url?: string
      author?: string
      category?: string
      description?: string | null
      source_url?: string | null
    } = {}

    if (author !== null) {
      updates.author = author
    }
    if (category !== null) {
      updates.category = category
    }
    if (description !== null) {
      updates.description = description || null
    }
    if (sourceUrl !== null) {
      updates.source_url = sourceUrl || null
    }
    if (coverImage) {
      updates.cover_image_url = imageUrl
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: '没有要更新的字段' },
        { status: 400 }
      )
    }

    // 更新数据库
    await fanworkQueries.updateFanWork(id, updates)

    fanworkQueries.invalidateCategoriesCache()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('更新作品错误:', error)
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}

// 删除作品（需要认证）
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 检查认证
    const auth = await requireAuth(request)
    if (!auth) {
      return NextResponse.json(
        { error: '未授权' },
        { status: 401 }
      )
    }

    // Next.js 15+ 要求 await params
    const { id: idParam } = await params
    const id = parseInt(idParam)
    if (isNaN(id)) {
      return NextResponse.json(
        { error: '无效的作品 ID' },
        { status: 400 }
      )
    }

    // 获取作品信息（用于删除 OSS 图片）
    const imageUrl = await fanworkQueries.getFanWorkImageUrl(id)

    if (imageUrl) {
      // 删除 OSS 中的图片
      await deleteImage(imageUrl)
    }

    // 删除数据库记录
    await fanworkQueries.deleteFanWork(id)

    fanworkQueries.invalidateCategoriesCache()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('删除作品错误:', error)
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}
