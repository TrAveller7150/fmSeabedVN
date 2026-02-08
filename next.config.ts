import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.oss-*.aliyuncs.com', // 阿里云 OSS
      },
      {
        protocol: 'https',
        hostname: '*.aliyuncs.com', // 阿里云 OSS 自定义域名
      },
    ],
  },
  async rewrites() {
    const adminPath = process.env.ADMIN_SECRET_PATH || '/5b7768811528673b'
    const pathWithoutSlash = adminPath.replace(/^\//, '') // 移除开头的 /
    
    return [
      {
        source: `/${pathWithoutSlash}/login`,
        destination: '/login',
      },
      {
        source: `/${pathWithoutSlash}`,
        destination: '/admin',
      },
      {
        source: `/${pathWithoutSlash}/:path*`,
        destination: '/admin/:path*',
      },
    ]
  },
  webpack: (config, { isServer }) => {
    // 确保 ali-oss 及其依赖只在服务端使用
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

export default nextConfig;
