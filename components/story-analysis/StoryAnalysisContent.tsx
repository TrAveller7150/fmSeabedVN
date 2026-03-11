interface AnalysisCardProps {
    title: string;
    description: string;
    image: string;
    link: string;
}

function AnalysisCard({ title, description, image, link }: AnalysisCardProps) {
    return (
        <article className="bg-white block cursor-pointer rounded-[16px] size-full hover:shadow-lg transition-shadow duration-300 group" data-name="Card">
            <a className="block size-full" href={link} target="_blank" rel="noopener noreferrer">
                <div className="content-stretch flex flex-col items-start justify-center overflow-hidden relative rounded-[16px] size-full isolate">
                    <div aria-hidden="true" className="h-[240px] relative shrink-0 w-full overflow-hidden" data-name="Image" role="presentation">
                        <img alt={title} className="absolute inset-0 max-w-none object-cover pointer-events-none size-full rounded-t-[16px] transition-transform duration-500 group-hover:scale-105" src={image} />
                    </div>
                    <div className="h-[255px] relative shrink-0 w-full" data-name="Body">
                        <div className="flex flex-col items-center size-full">
                            <div className="content-stretch flex flex-col items-center p-[24px] relative size-full">
                                <div className="content-stretch flex flex-col gap-[8px] items-center leading-[0] not-italic relative shrink-0 text-left w-full" data-name="Content">
                                    <div className="flex flex-col font-['Inter','Noto_Sans_SC','Noto_Sans_JP',sans-serif] font-semibold justify-center relative shrink-0 text-[24px] text-black tracking-[-0.48px] w-full">
                                        <h5 className="block leading-[1.45] whitespace-pre-wrap">{title}</h5>
                                    </div>
                                    <div className="flex flex-col font-['Inter','Noto_Sans_SC','Noto_Sans_JP',sans-serif] font-medium justify-center relative shrink-0 text-[18px] text-[rgba(0,0,0,0.55)] tracking-[-0.09px] w-full">
                                        <p className="leading-[1.4] whitespace-pre-wrap">{description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.02),0px_6px_12px_0px_rgba(0,0,0,0.03)]" />
            </a>
        </article>
    );
}

function PageTitle() {
    return (
        <div className="content-stretch flex flex-col items-center relative shrink-0 py-[60px] md:py-[80px]" data-name="Header">
            <div className="flex flex-col font-['Inter','Noto_Sans_SC','Noto_Sans_JP',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[32px] md:text-[64px] text-black text-center tracking-[-1.92px] w-full max-w-[800px] px-4">
                <h1 className="block leading-[1.1] whitespace-pre-wrap">剧情解析</h1>
            </div>
        </div>
    );
}

export default function StoryAnalysisContent() {
    return (
        <article className="bg-[#f5f9fa] min-h-screen w-full flex flex-col items-center pb-20">
            <PageTitle />
            <ul className="content-stretch flex flex-col md:flex-row gap-[32px] items-start justify-center px-[20px] md:px-[64px] relative size-full max-w-[1400px]" data-name="Feature cards">
                <li className="h-auto md:h-[499px] relative shrink-0 w-full md:w-[363px]">
                    <AnalysisCard
                        title="百合悬疑神作？一口气讲不完《SeaBed》剧情【第一至三章】"
                        description="较为详尽的视频解析，会每一章地进行讲解，很适合有点忘了剧情之后重温"
                        image="/assets/analysis/ev16.webp"
                        link="https://www.bilibili.com/video/BV1TpbEzHE67"
                    />
                </li>
                <li className="h-auto md:h-[499px] relative shrink-0 w-full md:w-[363px]">
                    <AnalysisCard
                        title="Everything has a meaning——《seabed》深入解析"
                        description="一篇非常详细的长文，包括了写作技法分析，剧情分析，时间线梳理，地点考据等"
                        image="/assets/analysis/ev12.webp"
                        link="https://bbs.yamibo.com/thread-522847-1-1.html"
                    />
                </li>
                <li className="h-auto md:h-[499px] relative shrink-0 w-full md:w-[363px]">
                    <AnalysisCard
                        title="seabed剧情部分解析（转自no1234shame567）"
                        description="对于七重身份的解析很有意思，让人看到另一个世界"
                        image="/assets/analysis/ev30_1.webp"
                        link="https://tieba.baidu.com/p/7367140170"
                    />
                </li>
            </ul>
        </article>
    );
}
