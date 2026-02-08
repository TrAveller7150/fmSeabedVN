import Link from 'next/link'

export default function Nav() {
    return (
        <nav className="capitalize content-stretch flex font-medium gap-[40px] items-center relative shrink-0 text-[16px] text-center tracking-[-0.08px] whitespace-nowrap" data-name="Nav">
            <div className="flex flex-col font-['Inter','Noto_Sans_SC','Noto_Sans_JP',sans-serif] justify-center relative shrink-0">
                <Link href="/fanworks" className="leading-[1.45] cursor-pointer hover:text-blue-500 transition-colors">二创</Link>
            </div>
            <div className="flex flex-col font-['Inter','Noto_Sans_SC','Noto_Sans_JP',sans-serif] justify-center relative shrink-0">
                <Link href="/story-analysis" className="leading-[1.45] cursor-pointer hover:text-blue-500 transition-colors">剧情解析</Link>
            </div>
            <div className="flex flex-col font-['Inter','Noto_Sans_SC','Noto_Sans_JP',sans-serif] justify-center relative shrink-0">
                <Link href="/author" className="leading-[1.45] cursor-pointer hover:text-blue-500 transition-colors">作者相关</Link>
            </div>
            <div className="flex flex-col font-['Inter','Noto_Sans_SC','Noto_Sans_JP',sans-serif] justify-center relative shrink-0">
                <Link href="/pilgrimage" className="leading-[1.45] cursor-pointer hover:text-blue-500 transition-colors">圣地巡礼</Link>
            </div>
            <div className="flex flex-col font-['Inter','Noto_Sans_SC','Noto_Sans_JP',sans-serif] justify-center relative shrink-0">
                <Link href="/resources" className="leading-[1.45] cursor-pointer hover:text-blue-500 transition-colors">资源站</Link>
            </div>
        </nav>
    );
}
