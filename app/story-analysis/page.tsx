import type { Metadata } from 'next'
import StoryAnalysisContent from '@/components/story-analysis/StoryAnalysisContent'

export const metadata: Metadata = {
  title: '剧情解析',
  description: '分享有关seabed剧情解析的好文',
  keywords: [
    'Seabed 剧情',
    'Seabed 解析',
    'Seabed 剧情分析',
  ],
  openGraph: {
    title: '剧情解析 | 四叶草事务所',
    description: '分享有关seabed剧情解析的好文',
    type: 'website',
  },
}

export default function StoryAnalysis() {
  return <StoryAnalysisContent />
}
