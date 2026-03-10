import type { Metadata } from 'next'
import FanWorksList from '@/components/fanworks/FanWorksList'

export const metadata: Metadata = {
  title: '二创作品',
  description: 'seabed相关同人作品搬运，不定期更新',
  keywords: [
    'Seabed 二创',
    'Seabed 同人',
    'Seabed 粉丝作品',
    'Seabed 同人图',
  ],
  openGraph: {
    title: '二创作品 | 四叶草事务所',
    description: 'seabed相关同人作品搬运，不定期更新',
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
