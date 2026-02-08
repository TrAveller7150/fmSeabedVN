function MapEmbed() {
    return (
        <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 pt-[80px] pb-12">
            <div className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 bg-white">
                <iframe
                    src="https://www.anitabi.cn/map?bangumiId=226956"
                    className="absolute inset-0 w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                    title="Seabed Pilgrimage Map"
                />
            </div>
            <div className="mt-4 text-center text-sm text-gray-400">
                <p>数据来源：Anitabi.cn</p>
            </div>
        </div>
    );
}

function RelatedMaterials() {
    return (
        <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 pb-12">
            <div className="content-stretch flex flex-col font-normal items-start leading-[0] not-italic py-[25px] relative size-full text-black">
                <div className="flex flex-col font-['Inter','Noto_Sans_SC','Noto_Sans_JP',sans-serif] justify-center relative shrink-0 text-[36px] whitespace-nowrap mb-6">
                    <p className="leading-[normal] font-bold">相关资料</p>
                </div>
                <a className="flex flex-col font-['Inter','Noto_Sans_SC','Noto_Sans_JP',sans-serif] min-h-[45px] justify-center relative shrink-0 text-[20px] md:text-[24px] w-full hover:text-blue-600 transition-colors" href="https://tieba.baidu.com/p/9927517950" target="_blank" rel="noopener noreferrer">
                    <ul className="list-inside">
                        <li className="list-disc ms-[12px] md:ms-[36px] whitespace-pre-wrap">
                            <span className="cursor-pointer leading-[1.5]">更多的圣地巡礼考据</span>
                        </li>
                    </ul>
                </a>
                <a className="flex flex-col font-['Inter','Noto_Sans_SC','Noto_Sans_JP',sans-serif] min-h-[45px] justify-center relative shrink-0 text-[20px] md:text-[24px] w-full hover:text-blue-600 transition-colors" href="https://note.com/yasuharu_are/m/mb42d3a6b1e79" target="_blank" rel="noopener noreferrer">
                    <ul className="list-inside">
                        <li className="list-disc ms-[12px] md:ms-[36px] whitespace-pre-wrap">
                            <span className="cursor-pointer leading-[1.5]">{`『SeaBed』聖地巡礼記`}</span>
                        </li>
                    </ul>
                </a>
                <a className="flex flex-col font-['Inter','Noto_Sans_SC','Noto_Sans_JP',sans-serif] min-h-[45px] justify-center relative shrink-0 text-[20px] md:text-[24px] w-full hover:text-blue-600 transition-colors" href="https://bbs.yamibo.com/thread-522847-1-1.html" target="_blank" rel="noopener noreferrer">
                    <ul className="list-inside">
                        <li className="list-disc ms-[12px] md:ms-[36px] whitespace-pre-wrap">
                            <span className="cursor-pointer leading-[1.5]">Everything has a meaning——《seabed》深入解析</span>
                        </li>
                    </ul>
                </a>
            </div>
        </div>
    );
}

export default function PilgrimageContent() {
    return (
        <article className="bg-[#f5f9fa] min-h-screen w-full flex flex-col items-center">
            <MapEmbed />
            <RelatedMaterials />
        </article>
    );
}
