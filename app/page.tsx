'use client'

import { useState, useEffect, useRef } from 'react'
import Hero from '@/components/home/Hero'
import Story from '@/components/home/Story'
import Pricing from '@/components/home/Pricing'
import Footer from '@/components/common/Footer'

const FADE_DURATION_MS = 500
const MAX_WAIT_MS = 6000

export default function Home() {
  const [isHomeReady, setIsHomeReady] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const readyCalled = useRef(false)
  const fadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const safetyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleHeroReady = () => {
    if (readyCalled.current) return
    readyCalled.current = true
    if (safetyTimeoutRef.current) {
      clearTimeout(safetyTimeoutRef.current)
      safetyTimeoutRef.current = null
    }
    document.body.style.overflow = ''
    setFadeOut(true)
    fadeTimeoutRef.current = setTimeout(() => {
      setIsHomeReady(true)
      fadeTimeoutRef.current = null
    }, FADE_DURATION_MS)
  }

  useEffect(() => {
    safetyTimeoutRef.current = setTimeout(handleHeroReady, MAX_WAIT_MS)
    return () => {
      if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current)
    }
  }, [])

  return (
    <>
      {!isHomeReady && (
        <div
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-b from-black via-black to-[#0a0a12] transition-opacity duration-500 ease-out ${
            fadeOut ? 'opacity-0' : 'opacity-100'
          }`}
          aria-live="polite"
          aria-label="页面加载中"
        >
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,#1e3a5f,transparent)]" />
          <p className="font-['Inter','Noto_Sans_SC','Noto_Sans_JP',sans-serif] text-[1.25rem] md:text-[1.5rem] text-[#93c5fd] tracking-wide flex items-baseline">
            <span>正在潜入深海</span>
            <span className="inline-flex" aria-hidden>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <span
                  key={i}
                  className="animate-[loading-dots_1.2s_ease-in-out_infinite]"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  .
                </span>
              ))}
            </span>
          </p>
        </div>
      )}

      <div className="min-h-screen bg-white">
        <section className="h-screen w-full relative z-30">
          <Hero onReady={handleHeroReady} />
        </section>

        {/* 首屏就绪后再挂载下方区块，避免与 Hero 争抢请求；下方图片异步加载 */}
        {isHomeReady && (
          <>
            <section className="min-h-screen w-full relative z-20">
              <Story />
            </section>
            <section className="min-h-screen w-full relative z-10">
              <Pricing />
            </section>
            <section className="w-full relative z-0">
              <Footer />
            </section>
          </>
        )}
      </div>
    </>
  )
}
