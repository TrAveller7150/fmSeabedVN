import Link from 'next/link'
import Nav from './Nav';

interface HeaderProps {
    className?: string;
}

export default function Header({ className = "fixed top-0 left-0" }: HeaderProps) {
    return (
        <header className={`content-stretch flex items-center justify-between leading-[0] not-italic px-[64px] py-[24px] w-full text-black bg-white/90 backdrop-blur-md border-b border-gray-200 z-50 ${className}`} data-name="Header 1">
            <Link href="/" className="flex flex-[1_0_0] flex-row items-center gap-3 font-['Inter','Noto_Sans_SC','Noto_Sans_JP',sans-serif] font-black justify-start min-h-px min-w-px relative text-[32px] md:text-[56px] tracking-[-1.68px] hover:opacity-80 transition-opacity">
                <img
                    src="/assets/clover-logo.png"
                    alt="四叶草事务所 Logo"
                    className="h-[32px] md:h-[48px] w-auto object-contain"
                />
                <p className="leading-[1.1] whitespace-pre-wrap">四叶草事务所</p>
            </Link>
            <div className="hidden md:block">
                <Nav />
            </div>
        </header>
    );
}
