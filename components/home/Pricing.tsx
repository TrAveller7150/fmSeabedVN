'use client'

import RevealAnimation from '@/components/common/RevealAnimation'

function PricingBackground() {
  return (
    <div className="absolute inset-0 blur-[3.35px]">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <img alt="Pricing Background" className="absolute size-full max-w-none object-cover" src="/assets/index/bg_pricing.webp" loading="lazy" />
        <div className="absolute inset-0 bg-[rgba(255,255,255,0.19)]" />
      </div>
    </div>
  );
}

function PricingItem({ platform, price }: { platform: string; price: string }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[300px] shrink-0" data-name="Pricing">
      <div className="flex flex-col items-center justify-center px-[45px] w-full h-full not-italic">
        <div className="flex flex-col justify-center shrink-0 font-['Inter',sans-serif] font-bold text-[56px] text-black leading-[0] tracking-[-1.12px] whitespace-nowrap mb-4">
          <p className="leading-[1.1]">{platform}</p>
        </div>
        <div className="flex flex-col justify-center w-full shrink-0 font-['Inter','Noto_Sans_SC','Noto_Sans_JP',sans-serif] font-light text-[16px] text-[#030303] text-center leading-[0] tracking-[-0.32px]">
          <p className="leading-[1.1] whitespace-pre-wrap">（{price}）</p>
        </div>
      </div>
    </div>
  );
}

function PricingButton({ href }: { href: string }) {
  return (
    <a className="relative w-full h-[52px] bg-[rgba(255,255,255,0.4)] rounded-[12px] shrink-0 cursor-pointer transition-colors hover:bg-[rgba(255,255,255,0.6)]" data-name="Button" href={href} target="_blank" rel="noopener noreferrer">
      <div aria-hidden="true" className="absolute inset-0 border-2 border-solid border-[rgba(0,0,0,0.15)] rounded-[12px] pointer-events-none" />
      <div className="flex flex-row justify-center items-center size-full">
        <div className="flex justify-center items-center size-full px-[16px] py-[12px]">
          <div className="relative flex flex-col justify-center shrink-0 font-['Inter','Noto_Sans_SC','Noto_Sans_JP',sans-serif] font-medium text-[18px] text-black text-left leading-[0] tracking-[-0.09px] whitespace-nowrap not-italic">
            <p className="leading-[1.45]">点击前往</p>
          </div>
        </div>
      </div>
    </a>
  );
}

function PricingCard({ platform, price, href }: { platform: string; price: string; href: string }) {
  return (
    <div className="relative w-[336px] h-[408px] bg-[rgba(255,255,255,0.4)] rounded-[16px] backdrop-blur-sm" data-name="Card">
      <div className="flex flex-col items-start pt-[32px] pb-[24px] px-[24px] w-full h-full rounded-[inherit] overflow-clip">
        <PricingItem platform={platform} price={price} />
        <PricingButton href={href} />
      </div>
      <div aria-hidden="true" className="absolute inset-[-0.25px] border-[0.5px] border-solid border-[rgba(0,0,0,0.1)] rounded-[16.25px] shadow-[0px_0px_4.4px_0px_rgba(0,0,0,0.06),0px_5px_19px_0px_rgba(0,0,0,0.08)] pointer-events-none" />
    </div>
  );
}

function PricingGroup() {
  return (
    <div className="flex flex-col md:flex-row gap-[32px] items-center justify-center relative shrink-0">
      <PricingCard platform="DLsite" price="本体29￥" href="https://www.dlsite.com/home/work/=/product_id/RJ170840.html" />
      <PricingCard platform="Steam" price="本体76￥" href="https://store.steampowered.com/app/583090/SeaBed/" />
      <PricingCard platform="NS" price="本体2200円" href="https://store-jp.nintendo.com/item/software/D70010000017465" />
    </div>
  );
}

function PricingContent() {
  return (
    <div className="flex flex-col items-center justify-center gap-[40px] w-full max-w-[1400px] px-[64px] py-[120px] z-10" data-name="Pricing cards 1">
      <RevealAnimation direction="up" delay={0}>
        <div className="flex flex-col justify-center shrink-0 w-full h-[30px] font-['Inter','Noto_Sans_SC','Noto_Sans_JP',sans-serif] font-medium text-[32px] text-center text-[#fffcfc] leading-[0] tracking-[-0.16px] not-italic mb-8">
          <p className="leading-[1.45] whitespace-pre-wrap drop-shadow-md">购买原作</p>
        </div>
      </RevealAnimation>
      <RevealAnimation direction="up" delay={200}>
        <PricingGroup />
      </RevealAnimation>
    </div>
  );
}

export default function Pricing() {
  return (
    <div className="relative flex justify-center items-center size-full min-h-screen shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] overflow-hidden">
      <PricingBackground />
      <PricingContent />
    </div>
  );
}
