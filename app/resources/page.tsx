import type { Metadata } from 'next'
import ResourcesContent from '@/components/resources/ResourcesContent'

export const metadata: Metadata = {
  title: '资源站',
  description: 'Seabed 游戏相关资源下载，包括游戏截图、壁纸、音乐等。四叶草事务所提供丰富的游戏资源。',
  keywords: [
    'Seabed 资源',
    'Seabed 下载',
    'Seabed 壁纸',
    'Seabed 截图',
    'Seabed 音乐',
    '游戏资源',
    '视觉小说资源',
  ],
  openGraph: {
    title: '资源站 | 四叶草事务所',
    description: 'Seabed 游戏相关资源下载，包括游戏截图、壁纸、音乐等。',
    type: 'website',
  },
}

export default function Resources() {
  return <ResourcesContent />
}
