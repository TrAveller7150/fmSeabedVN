import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'
import { requireAuth } from '@/lib/middleware'
import { deleteImage, uploadImage } from '@/lib/oss-upload'

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

    const [rows] = await pool.query<Array<{
      id: number
      cover_image_url: string
      author: string
      category: string
      description: string | null
      source_url: string | null
      created_at: Date
    }>>(
      'SELECT id, cover_image_url, author, category, description, source_url, created_at FROM fan_works WHERE id = ?',
      [id]
    )

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json(
        { error: '作品不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: rows[0] })
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
    const [currentRows] = await pool.query<Array<{
      cover_image_url: string
    }>>(
      'SELECT cover_image_url FROM fan_works WHERE id = ?',
      [id]
    )

    if (!Array.isArray(currentRows) || currentRows.length === 0) {
      return NextResponse.json(
        { error: '作品不存在' },
        { status: 404 }
      )
    }

    let imageUrl = currentRows[0].cover_image_url

    // 如果上传了新图片，替换旧图片
    if (coverImage) {
      // 删除旧图片
      await deleteImage(currentRows[0].cover_image_url)
      
      // 上传新图片
      const arrayBuffer = await coverImage.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      imageUrl = await uploadImage(buffer, coverImage.name)
    }

    // 构建更新字段
    const updateFields: string[] = []
    const updateValues: any[] = []

    if (author !== null) {
      updateFields.push('author = ?')
      updateValues.push(author)
    }
    if (category !== null) {
      updateFields.push('category = ?')
      updateValues.push(category)
    }
    if (description !== null) {
      updateFields.push('description = ?')
      updateValues.push(description || null)
    }
    if (sourceUrl !== null) {
      updateFields.push('source_url = ?')
      updateValues.push(sourceUrl || null)
    }
    if (coverImage) {
      updateFields.push('cover_image_url = ?')
      updateValues.push(imageUrl)
    }

    if (updateFields.length === 0) {
      return NextResponse.json(
        { error: '没有要更新的字段' },
        { status: 400 }
      )
    }

    updateValues.push(id)

    // 更新数据库
    await pool.execute(
      `UPDATE fan_works SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    )

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
    const [rows] = await pool.query<Array<{ cover_image_url: string }>>(
      'SELECT cover_image_url FROM fan_works WHERE id = ?',
      [id]
    )

    if (Array.isArray(rows) && rows.length > 0) {
      // 删除 OSS 中的图片
      await deleteImage(rows[0].cover_image_url)
    }

    // 删除数据库记录
    await pool.execute('DELETE FROM fan_works WHERE id = ?', [id])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('删除作品错误:', error)
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}
