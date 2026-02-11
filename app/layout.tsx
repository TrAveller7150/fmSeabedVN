import type { Metadata } from "next";
import "./globals.css";
import MainLayout from "@/components/layouts/MainLayout";

// 网站基础信息
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://seabedvn.cn';
const siteName = '四叶草事务所';
const siteDescription = '由粉丝建立的，非盈利性质的，游戏 Seabed 的粉丝站。';

export const metadata: Metadata = {
  // 基础 SEO 信息
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    'Seabed',
    'Seabed 游戏',
    'seabedvn',
    '四叶草事务所',
    'Seabed 粉丝站',
    'seabed',
    'SeabedVN',
    'seabed game',
  ],
  authors: [{ name: '四叶草事务所' }],
  creator: '四叶草事务所',

  // 其他元信息
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': 0,
      'max-image-preview': 'standard',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
