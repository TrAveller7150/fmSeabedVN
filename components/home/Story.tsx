'use client'

import RevealAnimation from '@/components/common/RevealAnimation'

function StoryBackground() {
  return (
    <div className="absolute blur-[3.35px] content-stretch flex flex-col inset-[0_4px_-23px_0] items-start opacity-82 size-full">
      <div className="h-full relative shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0 w-full">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <img alt="Story Background" className="absolute max-w-none object-cover size-full" src="/assets/index/bg_story.png" loading="lazy" />
          <div className="absolute bg-[rgba(255,248,248,0.07)] inset-0" />
        </div>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="bg-[rgba(255,255,255,0.63)] content-stretch flex flex-col h-auto min-h-[628px] items-start justify-between not-italic px-[50px] py-[40px] relative shrink-0 w-[600px] rounded-lg backdrop-blur-sm" data-name="Text">
      <RevealAnimation direction="up" delay={0}>
        <div className="flex flex-col font-['Inter',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[56px] text-black tracking-[-1.12px] whitespace-nowrap mb-8">
          <h2 className="block leading-[1.1]">STORY</h2>
        </div>
      </RevealAnimation>
      <RevealAnimation direction="up" delay={200}>
        <div className="flex flex-col font-['Inter','Noto_Sans_SC','Noto_Sans_JP',sans-serif] font-medium justify-center leading-[1.45] min-w-full relative shrink-0 text-[18px] text-[rgba(0,0,0,0.55)] tracking-[-0.09px] whitespace-pre-wrap gap-6">
          <p className="mb-0">
            精神科医生楢崎在心理诊所研究人类遗忘的机制。
            <br aria-hidden="true" />
            人为什么会遗忘？是否存在不忘记重要事物的方法？
            <br aria-hidden="true" />
            在深入探索某位患者的内心深处时，她最终抵达了幽深的海底。
          </p>
          <p className="mb-0">
            在东京开设事务所的设计师佐知子，如同被某种执念驱使，不断创作。
            <br aria-hidden="true" />
            她无视同事的关心，一心投入工作，直至精神濒临崩溃，甚至开始看到过去恋人的幻影。
            <br aria-hidden="true" />
            追随着恋人的痕迹，她找到了一条幽暗漫长的隧道。
          </p>
          <p className="mb-0">
            住在疗养院的贵呼，始终无法想起自己是如何与青梅竹马的同性恋人分开的。
            <br aria-hidden="true" />
            在与一位酷似恋人的女性相遇后，她逐渐找回了失落的记忆。
            <br aria-hidden="true" />
            她不断开启尘封的回忆之门，最终走入了一间冰冷而寂静的房间。
          </p>
          <p>
            在各自的目标驱使下，三人踏上追寻过去的旅程。
            <br aria-hidden="true" />
            三段故事在静谧而平淡的日常中缓缓展开，最终汇聚至同一个终点……
          </p>
        </div>
      </RevealAnimation>
    </div>
  );
}

function StoryContentWrapper() {
  return (
    <div className="content-stretch flex flex-col items-start justify-end py-[40px] relative shrink-0 z-10" data-name="Content">
      <Text />
    </div>
  );
}

function ImageContainer() {
  return (
    <div className="content-stretch flex flex-col h-full items-center justify-center py-[64px] relative shrink-0 w-full md:w-[50%] z-10" data-name="Image container">
      <RevealAnimation direction="down" delay={100}>
        <div className="flex flex-col font-['Inter','Noto_Sans_SC','Noto_Sans_JP',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#ddf4ff] text-[24px] text-right tracking-[-0.12px] w-full max-w-[620px]">
          <p className="leading-[1.8] whitespace-pre-wrap drop-shadow-md">
            逝去的时光，如同沉入无尽深海的碎片。
            <br aria-hidden="true" />
            偶尔浮现的过往景色与气息，亦如泡沫般摇曳消散。
          </p>
        </div>
      </RevealAnimation>
    </div>
  );
}

function StoryLayout() {
  return (
    <section className="relative content-stretch flex flex-col md:flex-row gap-[64px] items-center justify-center px-[64px] py-[100px] w-full max-w-[1440px] mx-auto" data-name="Hero 1">
      <StoryContentWrapper />
      <ImageContainer />
    </section>
  );
}

export default function Story() {
  return (
    <div className="relative shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] size-full min-h-screen flex items-center justify-center overflow-hidden">
      <StoryBackground />
      <StoryLayout />
    </div>
  );
}
