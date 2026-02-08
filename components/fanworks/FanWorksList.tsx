'use client'

import { useInView } from 'react-intersection-observer'

interface WorkInfoProps {
    author: string;
    type: string;
    description: string;
    align?: 'left' | 'right';
}

function WorkInfo({ author, type, description, align = 'right' }: WorkInfoProps) {
    return (
        <div className={`relative flex flex-col gap-[7px] items-start leading-[0] not-italic shrink-0 ${align === 'left' ? 'text-left' : 'text-right'} w-full content-stretch`} data-name="Text">
            <div className="flex flex-col justify-center relative shrink-0 text-[36px] text-black tracking-[-0.72px] w-full font-['Inter','Noto_Sans_SC','Noto_Sans_JP',sans-serif] font-bold">
                <h4 className="block leading-[1.2] whitespace-pre-wrap">作者：{author}</h4>
            </div>
            <div className="flex flex-col h-[25px] justify-center relative shrink-0 text-[14px] text-black tracking-[-0.28px] w-full font-['Inter','Noto_Sans_SC','Noto_Sans_JP',sans-serif] font-bold">
                <p className="leading-[1.2] whitespace-pre-wrap">作品类型：{type}</p>
            </div>
            <div className="flex flex-col justify-center relative shrink-0 text-[18px] text-[rgba(0,0,0,0.55)] tracking-[-0.09px] w-full font-['Inter',sans-serif] font-medium">
                <p className="leading-[1.45] whitespace-pre-wrap">{description}</p>
            </div>
        </div>
    );
}

interface WorkRowProps {
    author: string;
    type: string;
    description: string;
    image: string;
    imageAlt?: string;
    link?: string;
    reverse?: boolean;
}

function WorkRow({ author, type, description, image, imageAlt = "", link, reverse = false }: WorkRowProps) {
    const { ref, inView } = useInView({
        triggerOnce: false, // replay=yes，允许重复触发
        threshold: 0.1,
    });

    // 如果图片在右 (reverse=false)，文字在左，文字靠右对齐 (align='right')
    // 如果图片在左 (reverse=true)，文字在右，文字靠左对齐 (align='left')
    const align = reverse ? 'left' : 'right';

    const content = (
        <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
            <div className="flex flex-[1_0_0] flex-col h-full items-start justify-center min-h-px min-w-px relative content-stretch" data-name="Content">
                <WorkInfo author={author} type={type} description={description} align={align} />
            </div>
        </div>
    );

    const imageElement = (
        <div className="flex-[1_0_0] h-[432px] min-h-px min-w-px relative rounded-[16px] shadow-[0px_4px_4px_1px_rgba(0,0,0,0.64)]" data-name="Image" role="presentation">
            <img alt={imageAlt} className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={image} />
        </div>
    );

    const imageLink = link ? (
        <a className="flex-[1_0_0] h-[432px] min-h-px min-w-px relative" href={link} target="_blank" rel="noopener noreferrer" role="presentation">
            <figure aria-hidden="true" className="block cursor-pointer rounded-[16px] shadow-[0px_4px_4px_1px_rgba(0,0,0,0.64)] size-full" data-name="Image">
                <img alt={imageAlt} className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={image} />
            </figure>
        </a>
    ) : imageElement;

    return (
        <li
            ref={ref}
            className="relative shrink-0 w-full"
            data-name="Row"
            style={{
                opacity: inView ? 1 : 0,
                transition: 'opacity 600ms ease-out',
            }}
        >
            <div className="flex flex-row items-center justify-center size-full">
                <div className="flex gap-[64px] items-center justify-center pb-[40px] pt-[120px] px-[64px] relative w-full content-stretch">
                    {reverse ? (
                        <>
                            {imageLink}
                            {content}
                        </>
                    ) : (
                        <>
                            {content}
                            {imageLink}
                        </>
                    )}
                </div>
            </div>
        </li>
    );
}

export default function FanWorksList() {
    return (
        <ul className="flex flex-col items-center justify-center relative size-full content-stretch py-[40px]" data-name="Feature 1">
            {/* 第1行：右（文字在左，图片在右）-> 文字靠右对齐 */}
            <WorkRow
                author="夕原@u_br2"
                type="画"
                description="this is a brief context describing the picture"
                image="/assets/fanworks/fanwork.jpg"
                imageAlt="夕原@u_br2 的作品"
                reverse={false}
            />
            {/* 第2行：左（图片在左，文字在右）-> 文字靠左对齐 */}
            <WorkRow
                author="XXXX"
                type="MAD.AMV"
                description="this is a brief context describing the picture"
                image="/assets/fanworks/xshell.png"
                imageAlt="XXXX 的 MAD.AMV 作品"
                link="https://www.bilibili.com/video/BV14s4y1z7Ze"
                reverse={true}
            />
        </ul>
    );
}
