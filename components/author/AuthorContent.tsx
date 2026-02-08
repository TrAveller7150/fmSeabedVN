// 图片路径已更新为 /assets/
function PageTitle() {
    return (
        <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Header">
            <div className="flex flex-col font-['Inter','Noto_Sans_SC','Noto_Sans_JP',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[32px] md:text-[64px] text-black text-center tracking-[-1.92px] w-full max-w-[800px] px-4">
                <h1 className="block leading-[1.1] whitespace-pre-wrap">Seabed背后的故事</h1>
            </div>
        </div>
    );
}

function AuthorHeader() {
    return (
        <header className="relative shrink-0 w-full" data-name="Header">
            <div className="flex flex-col items-center justify-center size-full">
                <div className="content-stretch flex flex-col items-center justify-center py-[60px] md:py-[80px] relative w-full">
                    <PageTitle />
                </div>
            </div>
        </header>
    );
}

function IllustrationSection() {
    return (
        <section className="relative shrink-0 w-full" data-name="Image">
            <div className="flex flex-row justify-center size-full">
                <div className="content-stretch flex items-start justify-center pb-[40px] px-[20px] md:px-[240px] relative w-full">
                    <div className="flex-[1_0_0] h-[300px] md:h-[533.333px] min-h-px min-w-px relative rounded-[16px] overflow-hidden shadow-md" data-name="Image">
                        <img alt="An illustrative sketch of a flower" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src="/assets/author/menu_nochap.png" />
                    </div>
                </div>
            </div>
        </section>
    );
}

function OriginParagraph() {
    return (
        <div className="content-stretch flex flex-col gap-[16px] items-start leading-[0] not-italic relative shrink-0 w-full" data-name="Paragraph">
            <div className="flex flex-col font-['Inter','Noto_Sans_SC','Noto_Sans_JP',sans-serif] font-semibold justify-center relative shrink-0 text-[28px] md:text-[40px] text-black tracking-[-0.8px] w-full">
                <h2 className="leading-[1.2] whitespace-pre-wrap">游戏的起源</h2>
            </div>
            <div className="flex flex-col font-['Inter','Noto_Sans_SC','Noto_Sans_JP',sans-serif] font-medium justify-center relative shrink-0 text-[16px] md:text-[20px] text-[rgba(0,0,0,0.6)] tracking-[-0.1px] w-full">
                <p className="leading-[1.6] whitespace-pre-wrap text-justify">
                    《Seabed》的创作始于 hide38 在工作之余创作的以贵呼和佐知子为主角的百合四格漫画。这些零散的片段被分享给了住在附近的友人 AKIRA，一位热爱动画与游戏的创作者。AKIRA 被角色的设计与她们之间独特的对话所吸引。虽然漫画只描绘了日常片段，却让他感受到一种"无言的往事回忆"般的氛围，并好奇角色背后的故事。
                    <br /><br />
                    一次不经意的交流中，AKIRA 向 hide38 询问了更多角色细节，这促使 hide38 决定将零散的剧情整合，并邀请 AKIRA 共同创作《Seabed》。就这样，一段始于工作间隙的创作，在两位创作者的对话中，逐渐汇聚成这部长达47万字，有关遗忘，回忆与爱的视觉小说。
                </p>
            </div>
        </div>
    );
}

function OriginTextSection() {
    return (
        <section className="relative shrink-0 w-full" data-name="Text block 1">
            <div className="flex flex-row justify-center size-full">
                <div className="content-stretch flex items-start justify-center px-[20px] md:px-[240px] py-[40px] md:py-[80px] relative w-full">
                    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Wrapper">
                        <OriginParagraph />
                    </div>
                </div>
            </div>
        </section>
    );
}

function ComicGroup() {
    return (
        <div className="flex flex-col md:flex-row gap-[20px] items-center justify-center relative shrink-0 w-full">
            <div className="h-[250px] md:h-[417px] w-full md:w-[262px] relative rounded-lg overflow-hidden shadow-sm">
                <img alt="Comic 1" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src="/assets/author/manga1.jpg" />
            </div>
            <div className="h-[250px] md:h-[417px] w-full md:w-[262px] relative rounded-lg overflow-hidden shadow-sm">
                <img alt="Comic 2" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src="/assets/author/manga2.jpg" />
            </div>
            <div className="h-[250px] md:h-[417px] w-full md:w-[262px] relative rounded-lg overflow-hidden shadow-sm">
                <img alt="Comic 3" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src="/assets/author/manga3.jpg" />
            </div>
        </div>
    );
}

function ComicSection() {
    return (
        <section className="relative shrink-0 w-full" data-name="Quote">
            <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
                <div className="content-stretch flex flex-col items-center justify-center leading-[0] px-[20px] md:px-[210px] py-px relative w-full gap-4">
                    <ComicGroup />
                    <a className="flex flex-col font-['Inter','Noto_Sans_SC','Noto_Sans_JP',sans-serif] font-normal h-[28px] justify-center not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.75)] text-center tracking-[-0.32px] w-full hover:text-blue-500 transition-colors" href="https://www.pixiv.net/users/51430" target="_blank" rel="noopener noreferrer">
                        <p className="cursor-pointer leading-[1.23] whitespace-pre-wrap">早期的四格漫画 (Pixiv)</p>
                    </a>
                </div>
            </div>
        </section>
    );
}

function CreatorParagraph() {
    return (
        <div className="content-stretch flex flex-col gap-[16px] items-start not-italic relative shrink-0 w-full" data-name="Paragraph">
            <div className="flex flex-col font-['Inter','Noto_Sans_SC','Noto_Sans_JP',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[28px] md:text-[40px] text-black tracking-[-0.8px] w-full">
                <h2 className="leading-[1.2] whitespace-pre-wrap">幕后的创作者们与近况</h2>
            </div>
            <div className="flex flex-col font-['Inter','Noto_Sans_SC','Noto_Sans_JP',sans-serif] font-medium justify-center leading-[1.6] relative shrink-0 text-[16px] md:text-[20px] text-[rgba(0,0,0,0.6)] tracking-[-0.1px] w-full whitespace-pre-wrap text-justify gap-4">
                <p className="mb-0">根据访谈与推文的分析得知，《seabed》最早期原创团队总共有三人，负责插图绘画 / 剧本创作（大概算主创）的 hide38，负责游戏编程 / 美术布局的 Akira，以及负责虚拟背景图制作的 puku。目前 hide38 仍活跃在 X (Twitter) 与 DLsite 上进行游戏创作，目前正在开发的 flowerwitch 是一款以怪物娘为主角，含百合 (futa注意)，以及各种奇怪元素的黄油。</p>
                <p>对于新的视觉小说，作者在和一个网友回复的过程中透露，在做完这一作之后，大概率会创作一个动作游戏和小说结合的冒险类游戏，让我们拭目以待吧。</p>
            </div>
        </div>
    );
}

function CreatorTextSection() {
    return (
        <section className="relative shrink-0 w-full" data-name="Text block 2">
            <div className="flex flex-row justify-center size-full">
                <div className="content-stretch flex items-start justify-center px-[20px] md:px-[240px] py-[40px] md:py-[80px] relative w-full">
                    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Wrapper">
                        <CreatorParagraph />
                    </div>
                </div>
            </div>
        </section>
    );
}

function NewGameScreenshotSection() {
    return (
        <section className="relative shrink-0 w-full" data-name="Quote">
            <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
                <div className="content-stretch flex flex-col items-center justify-center leading-[0] px-[20px] md:px-[210px] py-px relative w-full gap-4">
                    <div className="relative shrink-0 w-full max-w-[860px]">
                        <div className="relative rounded-[14px] w-full pt-[48.5%] shadow-md bg-gray-200 overflow-hidden">
                            <img alt="New Game Screenshot" className="absolute inset-0 w-full h-full object-cover pointer-events-none" src="/assets/author/image-800.jpg" />
                        </div>
                    </div>
                    <div className="flex flex-col font-['Inter','Noto_Sans_SC','Noto_Sans_JP',sans-serif] font-normal h-[28px] justify-center not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.75)] text-center tracking-[-0.32px] w-full">
                        <p className="leading-[1.23] whitespace-pre-wrap">新作截图</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ReferenceLinks() {
    return (
        <div className="content-stretch flex flex-col items-center md:items-start leading-[0] not-italic relative shrink-0 text-[16px] text-black tracking-[-0.32px] w-full max-w-[860px] py-12 px-4 gap-2">
            <div className="flex flex-col font-['Inter','Noto_Sans_SC','Noto_Sans_JP',sans-serif] font-bold h-[49px] justify-center relative shrink-0 w-full md:w-auto text-center md:text-left">
                <h3 className="leading-[1.23] whitespace-pre-wrap text-xl">参考文献</h3>
            </div>
            <a className="flex flex-col font-['Inter','Noto_Sans_SC','Noto_Sans_JP',sans-serif] font-normal justify-center relative shrink-0 w-full hover:text-blue-600 transition-colors py-1" href="https://www.bilibili.com/read/cv13995680" target="_blank" rel="noopener noreferrer">
                <ul className="list-inside md:list-disc md:ms-[24px]">
                    <li className="whitespace-pre-wrap">
                        <span className="cursor-pointer leading-[1.5]">（个人渣翻）百合视觉小说《Seabed》制作组访谈</span>
                    </li>
                </ul>
            </a>
            <a className="flex flex-col font-['Inter','Noto_Sans_SC','Noto_Sans_JP',sans-serif] font-normal justify-center relative shrink-0 w-full hover:text-blue-600 transition-colors py-1" href="https://x.com/flowerfairy_cm" target="_blank" rel="noopener noreferrer">
                <ul className="list-inside md:list-disc md:ms-[24px]">
                    <li className="whitespace-pre-wrap">
                        <span className="cursor-pointer leading-[1.5]">hide38个人账号</span>
                    </li>
                </ul>
            </a>
            <a className="flex flex-col font-['Inter','Noto_Sans_SC','Noto_Sans_JP',sans-serif] font-normal justify-center relative shrink-0 w-full hover:text-blue-600 transition-colors py-1" href="https://tieba.baidu.com/p/9730244063" target="_blank" rel="noopener noreferrer">
                <ul className="list-inside md:list-disc md:ms-[24px]">
                    <li className="whitespace-pre-wrap">
                        <span className="cursor-pointer leading-[1.5]">楼主本人关于作者的答疑帖，以及吧友有想要楼主问作者的问题收集</span>
                    </li>
                </ul>
            </a>
        </div>
    );
}

export default function AuthorContent() {
    return (
        <article className="bg-[#f5f9fa] content-stretch flex flex-col items-center relative size-full min-h-screen pb-12" data-name="Container">
            <AuthorHeader />
            <IllustrationSection />
            <OriginTextSection />
            <ComicSection />
            <CreatorTextSection />
            <NewGameScreenshotSection />
            <ReferenceLinks />
        </article>
    );
}
