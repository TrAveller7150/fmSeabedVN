import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/middleware'
import { uploadImage, deleteImage } from '@/lib/oss-upload'
import * as fanworkQueries from '@/lib/db/queries/fanworks'

// 获取二创作品列表（公开接口，不需要认证；支持 category、sort 检索）
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
        const limit = Math.max(1, Math.min(100, parseInt(searchParams.get('limit') || '50')))
        const category = searchParams.get('category') ?? undefined
        const sort = (searchParams.get('sort') === 'oldest' ? 'oldest' : 'newest') as 'newest' | 'oldest'

        const [result, categories] = await Promise.all([
            fanworkQueries.getPublishedFanWorks(page, limit, category, sort),
            fanworkQueries.getDistinctCategories(),
        ])

        return NextResponse.json({
            data: result.data,
            categories,
            pagination: {
                page: result.page,
                limit: result.limit,
                total: result.total,
                totalPages: result.totalPages,
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
        const result = await fanworkQueries.createFanWork({
            cover_image_url: imageUrl,
            author,
            category,
            description: description || null,
            source_url: sourceUrl || null,
        })

        fanworkQueries.invalidateCategoriesCache()

        return NextResponse.json({
            success: true,
            id: result.id,
        })
    } catch (error) {
        console.error('添加作品错误:', error)
        return NextResponse.json(
            { error: '服务器错误' },
            { status: 500 }
        )
    }
}
