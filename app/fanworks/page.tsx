import type { Metadata } from 'next'
import FanWorksList from '@/components/fanworks/FanWorksList'

export const metadata: Metadata = {
  title: '二创作品',
  description: '浏览 Seabed 游戏的粉丝创作作品，包括同人图、同人文等精彩内容。四叶草事务所收集并展示优秀的粉丝创作。',
  keywords: [
    'Seabed 二创',
    'Seabed 同人',
    'Seabed 粉丝作品',
    'Seabed 同人图',
    'Seabed 同人文',
    '游戏同人',
    '视觉小说同人',
  ],
  openGraph: {
    title: '二创作品 | 四叶草事务所',
    description: '浏览 Seabed 游戏的粉丝创作作品，包括同人图、同人文等精彩内容。',
    type: 'website',
  },
}

export default function FanWorks() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto">
        <div className="py-[80px] px-[64px]">
          <FanWorksList />
        </div>
      </div>
    </div>
  )
}
