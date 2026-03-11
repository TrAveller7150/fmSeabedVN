'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import RevealAnimation from '@/components/common/RevealAnimation'

interface HeroProps {
  onReady?: () => void
}

export default function Hero({ onReady }: HeroProps) {
  const loadedCount = useRef(0)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleImageLoad = () => {
    loadedCount.current += 1
    if (loadedCount.current >= 2) {
      onReady?.()
    }
  }

  return (
    <div className="content-stretch flex flex-col items-center justify-end px-[20px] py-[60px] sm:px-[24px] sm:py-[80px] md:px-[32px] md:py-[100px] relative w-full h-screen min-h-[600px] overflow-hidden" data-name="Hero 1">
      <Image
        alt="Background"
        src="/assets/index/bg2.webp"
        fill
        priority
        fetchPriority="high"
        className="object-cover pointer-events-none"
        sizes="100vw"
        onLoad={handleImageLoad}
      />
      <RevealAnimation direction="up" delay={200} distance={100}>
        <div className="relative shrink-0 w-[92%] max-w-[880px] mb-[4vh] mx-auto z-10" data-name="title(1) 1">
          {/* 使用原生 img 以保留图片真实宽高比，避免 next/image 的 width/height 强制比例导致缩小 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Seabed Title"
            src="/assets/index/title(1).webp"
            fetchPriority="high"
            loading="eager"
            className="w-full h-auto object-contain pointer-events-none mx-auto"
            onLoad={handleImageLoad}
          />
        </div>
      </RevealAnimation>
    </div>
  )
}
