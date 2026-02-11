import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  // 获取网站 URL
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://seabedvn.cn'
  
  // 获取管理后台路径（从环境变量读取，如果没有则使用默认值）
  const adminPath = process.env.ADMIN_SECRET_PATH || '/admin'
  const pathWithoutSlash = adminPath.replace(/^\//, '') // 移除开头的 /
  
  return {
    rules: [
      {
        userAgent: '*', // 适用于所有搜索引擎爬虫
        allow: '/', // 允许抓取根目录
        disallow: [
          '/admin',                    // 屏蔽管理后台
          '/admin/*',                  // 屏蔽管理后台所有子页面
          '/login',                    // 屏蔽登录页面
          '/api',                      // 屏蔽所有 API 接口
          '/api/*',                    // 屏蔽所有 API 子路径
          `/${pathWithoutSlash}`,      // 屏蔽随机管理路径（如果设置了 ADMIN_SECRET_PATH）
          `/${pathWithoutSlash}/*`,    // 屏蔽随机管理路径的所有子页面
          `/${pathWithoutSlash}/login`, // 屏蔽随机管理路径的登录页面
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`, // 指向网站地图（稍后创建）
  }
}
