import type { Metadata } from 'next'
import AuthorContent from '@/components/author/AuthorContent'

export const metadata: Metadata = {
  title: '关于作者',
  description: '一些关于seabed开发的幕后小故事',
  keywords: [
    'Seabed 作者',
    'Seabed 制作人',
  ],
  openGraph: {
    title: '关于作者 | 四叶草事务所',
    description: '了解 Seabed 游戏的作者信息和创作背景。',
    type: 'website',
  },
}

export default function Author() {
  return <AuthorContent />
}
