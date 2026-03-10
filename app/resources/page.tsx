import type { Metadata } from 'next'
import ResourcesContent from '@/components/resources/ResourcesContent'

export const metadata: Metadata = {
  title: '资源站',
  description: 'Seabed 游戏相关资源分享，包括游戏解包文件、音乐等。',
  keywords: [
    'Seabed 资源',
    'Seabed 音乐',
  ],
  openGraph: {
    title: '资源站 | 四叶草事务所',
    description: 'Seabed 游戏相关资源分享，包括游戏解包文件、音乐等。',
    type: 'website',
  },
}

export default function Resources() {
  return <ResourcesContent />
}
