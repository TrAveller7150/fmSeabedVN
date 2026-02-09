declare module 'ali-oss' {
  interface PutObjectOptions {
    headers?: Record<string, string>
    acl?: string
  }

  interface PutObjectResult {
    url: string
    name: string
    res: {
      status: number
      statusCode: number
      headers: Record<string, string>
    }
  }

  class OSS {
    constructor(config: {
      region: string
      accessKeyId: string
      accessKeySecret: string
      bucket: string
    })

    put(name: string, file: Buffer, options?: PutObjectOptions): Promise<PutObjectResult>
    delete(name: string): Promise<void>
  }

  export = OSS
}
