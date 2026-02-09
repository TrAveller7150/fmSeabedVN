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
    const adminPath = process.env.ADMIN_SECRET_PATH || '/admin'
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
    const webpack = require('webpack');
    
    // 确保 ali-oss 及其依赖只在服务端使用
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
      
      // 排除 ali-oss 及其依赖，避免在客户端打包
      config.externals = config.externals || [];
      if (Array.isArray(config.externals)) {
        config.externals.push({
          'ali-oss': 'commonjs ali-oss',
          'vm2': 'commonjs vm2',
          'coffee-script': 'commonjs coffee-script',
          'proxy-agent': 'commonjs proxy-agent',
          'pac-proxy-agent': 'commonjs pac-proxy-agent',
          'urllib': 'commonjs urllib',
        });
      } else if (typeof config.externals === 'function') {
        const originalExternals = config.externals;
        config.externals = [
          originalExternals,
          {
            'ali-oss': 'commonjs ali-oss',
            'vm2': 'commonjs vm2',
            'coffee-script': 'commonjs coffee-script',
            'proxy-agent': 'commonjs proxy-agent',
            'pac-proxy-agent': 'commonjs pac-proxy-agent',
            'urllib': 'commonjs urllib',
          },
        ];
      }
    } else {
      // 在服务端构建时，忽略 ali-oss 的可选依赖（这些依赖在运行时不需要）
      config.plugins = config.plugins || [];
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^coffee-script$/,
        })
      );
      
      // 抑制 vm2 的警告（这是 ali-oss 的依赖，不影响功能）
      config.module = config.module || {};
      config.module.exprContextCritical = false;
      config.module.unknownContextCritical = false;
      config.module.wrappedContextCritical = false;
    }
    return config;
  },
};

export default nextConfig;
