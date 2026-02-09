// 延迟加载 OSS 客户端，确保只在服务端使用
// 类型定义在 types/ali-oss.d.ts
type OSSClient = {
  put(name: string, file: Buffer, options?: {
    headers?: Record<string, string>
    acl?: string
  }): Promise<{
    url: string
    name: string
    res: {
      status: number
      statusCode: number
      headers: Record<string, string>
    }
  }>
  delete(name: string): Promise<void>
}

let ossClient: OSSClient | null = null

function getOSSClient(): OSSClient {
  if (typeof window !== 'undefined') {
    throw new Error('OSS client can only be used on the server side')
  }

  if (!ossClient) {
    // 动态导入，避免在客户端打包
    // @ts-ignore - ali-oss 没有类型定义，但运行时可用
    const OSSModule = require('ali-oss')
    // ali-oss 的 CommonJS 导出方式
    const OSS = OSSModule.default || OSSModule
    ossClient = new OSS({
      region: process.env.OSS_REGION!,
      accessKeyId: process.env.OSS_ACCESS_KEY_ID!,
      accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET!,
      bucket: process.env.OSS_BUCKET!,
    }) as OSSClient
  }

  return ossClient
}

// 上传图片到 OSS
export async function uploadImage(buffer: Buffer, filename: string): Promise<string> {
  const client = getOSSClient()
  const path = `fanworks/${Date.now()}-${filename}`
  const result = await client.put(path, buffer, {
    headers: {
      'Content-Type': getContentType(filename),
    },
    // 设置文件为公共读，允许公开访问
    acl: 'public-read',
  })

  // 确保返回完整的 URL
  let imageUrl = result.url
  if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
    // 如果返回的是相对路径，构建完整 URL
    const bucket = process.env.OSS_BUCKET!
    const region = process.env.OSS_REGION!
    imageUrl = `https://${bucket}.${region}.aliyuncs.com/${path}`
  }

  return imageUrl
}

// 删除 OSS 中的图片
export async function deleteImage(url: string): Promise<void> {
  try {
    const client = getOSSClient()
    // 从完整 URL 中提取路径
    const urlObj = new URL(url)
    const path = urlObj.pathname.substring(1) // 移除开头的 /
    await client.delete(path)
  } catch (error) {
    console.error('删除 OSS 图片失败:', error)
    // 不抛出错误，允许继续执行
  }
}

// 根据文件名获取 Content-Type
function getContentType(filename: string): string {
  const ext = filename.toLowerCase().split('.').pop()
  const types: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
  }
  return types[ext || ''] || 'image/jpeg'
}
