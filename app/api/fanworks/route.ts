import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'
import { requireAuth } from '@/lib/middleware'
import { uploadImage, deleteImage } from '@/lib/oss-upload'

// 获取二创作品列表（公开接口，不需要认证）
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
        const limit = Math.max(1, Math.min(100, parseInt(searchParams.get('limit') || '50'))) // 限制在 1-100 之间
        const offset = (page - 1) * limit

        // 使用模板字符串，因为 limit 和 offset 是安全的整数
        const [rows] = await pool.query<Array<{
            id: number
            cover_image_url: string
            author: string
            category: string
            description: string | null
            source_url: string | null
            created_at: Date
        }>>(
            `SELECT id, cover_image_url, author, category, description, source_url, created_at 
       FROM fan_works 
       WHERE is_published = TRUE 
       ORDER BY created_at DESC 
       LIMIT ${limit} OFFSET ${offset}`
        )

        const [countRows] = await pool.execute<Array<{ count: number }>>(
            'SELECT COUNT(*) as count FROM fan_works WHERE is_published = TRUE'
        )

        const total = Array.isArray(countRows) && countRows.length > 0 ? countRows[0].count : 0

        return NextResponse.json({
            data: rows || [],
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        })
    } catch (error) {
        console.error('获取作品列表错误:', error)
        return NextResponse.json(
            { error: '服务器错误' },
            { status: 500 }
        )
    }
}

// 添加二创作品（需要认证）
export async function POST(request: NextRequest) {
    try {
        // 检查认证
        const auth = await requireAuth(request)
        if (!auth) {
            return NextResponse.json(
                { error: '未授权' },
                { status: 401 }
            )
        }

        const formData = await request.formData()
        const author = formData.get('author') as string
        const category = formData.get('category') as string
        const description = formData.get('description') as string | null
        const sourceUrl = formData.get('source_url') as string | null
        const coverImage = formData.get('cover_image') as File | null

        // 验证必填字段
        if (!author || !category || !coverImage) {
            return NextResponse.json(
                { error: '作者、类别和封面图不能为空' },
                { status: 400 }
            )
        }

        // 上传封面图到 OSS
        const arrayBuffer = await coverImage.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        const imageUrl = await uploadImage(buffer, coverImage.name)

        // 插入数据库
        const [result] = await pool.execute(
            `INSERT INTO fan_works (cover_image_url, author, category, description, source_url) 
       VALUES (?, ?, ?, ?, ?)`,
            [imageUrl, author, category, description || null, sourceUrl || null]
        ) as any

        return NextResponse.json({
            success: true,
            id: result?.insertId || null,
        })
    } catch (error) {
        console.error('添加作品错误:', error)
        return NextResponse.json(
            { error: '服务器错误' },
            { status: 500 }
        )
    }
}
