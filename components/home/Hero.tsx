'use client'

import { useEffect } from 'react'
import Image from 'next/image'

export default function Hero() {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleHeroImageLoad = () => {
    document.body.style.overflow = ''
  }

  return (
    <div className="content-stretch flex flex-col items-center justify-end px-[32px] py-[120px] relative w-full h-screen min-h-[600px] overflow-hidden" data-name="Hero 1">
      <Image
        alt="Background"
        src="/assets/index/bg2.jpg"
        fill
        priority
        fetchPriority="high"
        className="object-cover pointer-events-none"
        sizes="100vw"
        onLoad={handleHeroImageLoad}
      />
      <div className="relative shrink-0 w-[80%] max-w-[600px] mb-[10vh] mx-auto z-10" data-name="title(1) 1">
        <Image
          alt="Seabed Title"
          src="/assets/index/title(1).png"
          width={600}
          height={200}
          priority
          fetchPriority="high"
          className="w-full h-auto object-contain pointer-events-none mx-auto"
          sizes="(max-width: 768px) 80vw, 600px"
        />
      </div>
    </div>
  )
}
