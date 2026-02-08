import OSS from 'ali-oss'

// 创建 OSS 客户端
// 注意：这是配置模板，实际使用时需要从环境变量读取
const ossClient = new OSS({
  region: process.env.OSS_REGION || 'oss-cn-beijing',
  accessKeyId: process.env.OSS_ACCESS_KEY_ID || '',
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET || '',
  bucket: process.env.OSS_BUCKET || 'seabed-images',
})

export { ossClient }

// 上传函数（后续实现）
export async function uploadImage(file: File, path: string): Promise<string> {
  // TODO: 实现上传逻辑
  // const buffer = await file.arrayBuffer()
  // const result = await ossClient.put(path, Buffer.from(buffer))
  // return result.url
  throw new Error('Not implemented')
}

// 删除函数（后续实现）
export async function deleteImage(path: string): Promise<void> {
  // TODO: 实现删除逻辑
  // await ossClient.delete(path)
  throw new Error('Not implemented')
}
