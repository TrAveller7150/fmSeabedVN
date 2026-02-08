interface ResourceCardProps {
    title: string;
    description: React.ReactNode;
    image: string;
    link: string;
}

function ResourceCard({ title, description, image, link }: ResourceCardProps) {
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
                                <div className="content-stretch flex flex-col gap-[8px] items-center leading-[0] not-italic relative shrink-0 text-center w-full" data-name="Content">
                                    <div className="flex flex-col font-['Inter','Noto_Sans_SC','Noto_Sans_JP',sans-serif] font-semibold justify-center relative shrink-0 text-[24px] text-black tracking-[-0.48px] w-full">
                                        <h5 className="block leading-[1.45] whitespace-pre-wrap">{title}</h5>
                                    </div>
                                    <div className="flex flex-col font-['Inter','Noto_Sans_SC','Noto_Sans_JP',sans-serif] font-medium justify-center leading-[1.4] relative shrink-0 text-[18px] text-[rgba(0,0,0,0.55)] tracking-[-0.09px] w-full whitespace-pre-wrap">
                                        {description}
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
                <h1 className="block leading-[1.1] whitespace-pre-wrap">资源站</h1>
            </div>
        </div>
    );
}

export default function ResourcesContent() {
    return (
        <article className="bg-[#f5f9fa] min-h-screen w-full flex flex-col items-center pb-20">
            <PageTitle />
            <ul className="content-stretch flex flex-col md:flex-row gap-[32px] items-start justify-center px-[20px] md:px-[64px] relative size-full max-w-[1400px]" data-name="Feature cards">
                <li className="h-auto md:h-[499px] relative shrink-0 w-full md:w-[363px]">
                    <ResourceCard
                        title="音乐电台"
                        description={<p className="leading-[1.4] whitespace-pre-wrap">网易云博客，包括所有Bgm以及4个DLC的mp3格式</p>}
                        image="/assets/resources/ev7.png"
                        link="https://music.163.com/djradio?id=960908663&uct2=U2FsdGVkX1+HeDL7orqdNZsFBp0xE8GqPoWHDKrSl6M="
                    />
                </li>
                <li className="h-auto md:h-[499px] relative shrink-0 w-full md:w-[363px]">
                    <ResourceCard
                        title="解包文件"
                        description={
                            <>
                                <p className="mb-0">包括学习版，解包文件，民间汉化等</p>
                                <p>解压密码:seabed</p>
                            </>
                        }
                        image="/assets/resources/ev2.png"
                        link="https://pan.baidu.com/s/1wKsnUzjVEcTq4HEQdUSEMw?pwd=tksc"
                    />
                </li>
                <li className="h-auto md:h-[499px] relative shrink-0 w-full md:w-[363px]">
                    <ResourceCard
                        title="文本"
                        description={<p className="leading-[1.4] whitespace-pre-wrap">txt格式，包括中英文本</p>}
                        image="/assets/resources/ev94.png"
                        link="https://pan.baidu.com/s/1DHwR2EuYktNuAjy_5tQrnQ?pwd=tksc"
                    />
                </li>
            </ul>
        </article>
    );
}
