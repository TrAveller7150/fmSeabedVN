import Hero from '@/components/home/Hero'
import Story from '@/components/home/Story'
import Pricing from '@/components/home/Pricing'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* 第一屏：Hero */}
      <section className="h-screen w-full relative z-30">
        <Hero />
      </section>

      {/* 第二屏：Story (简介) */}
      <section className="min-h-screen w-full relative z-20">
        <Story />
      </section>

      {/* 第三屏：Pricing (购买) */}
      <section className="min-h-screen w-full relative z-10">
        <Pricing />
      </section>
    </div>
  )
}
