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
};

export default nextConfig;
