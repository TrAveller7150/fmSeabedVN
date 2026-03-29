'use client'
// 作品类别与数据库一致：画 / 视频 / 其他

import { useState, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'

const SORT_OPTIONS = [
    { value: 'newest', label: '最新优先' },
    { value: 'oldest', label: '最早优先' },
] as const
type SortValue = (typeof SORT_OPTIONS)[number]['value']
const ALL_TYPES = '全部'
const PAINT_CATEGORY = '画' // 该类别在预览图左下角显示「看大图」按钮
const INITIAL_PAGE_SIZE = 5   // 首屏先请求条数，快速展示
const FULL_DATA_LIMIT = 100  // 后台拉取全量条数

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
    category?: string;
    onPreviewImage?: (url: string) => void;
}

function ExpandIcon() {
    return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
    )
}

function WorkRow({ author, type, description, image, imageAlt = "", link, reverse = false, category, onPreviewImage }: WorkRowProps) {
    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.1,
    });

    const align = reverse ? 'left' : 'right';
    const isPaint = category === PAINT_CATEGORY;

    const content = (
        <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
            <div className="flex flex-[1_0_0] flex-col h-full items-start justify-center min-h-px min-w-px relative content-stretch" data-name="Content">
                <WorkInfo author={author} type={type} description={description} align={align} />
            </div>
        </div>
    );

    const imgNode = (
        <img
            alt={imageAlt}
            className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full"
            src={image}
            onError={(e) => {
                console.error('图片加载失败:', image)
                e.currentTarget.src = '/assets/fanworks/fanwork.jpg'
            }}
        />
    );

    const imageSlot = (
        <div className="flex-[1_0_0] h-[432px] min-h-px min-w-px relative" data-name="Image">
            {link ? (
                <a className="absolute inset-0 group block" href={link} target="_blank" rel="noopener noreferrer" role="presentation">
                    <figure aria-hidden="true" className="block cursor-pointer rounded-[16px] shadow-[0px_4px_4px_1px_rgba(0,0,0,0.64)] transition-shadow duration-300 hover:shadow-[0px_8px_16px_2px_rgba(0,0,0,0.7)] size-full overflow-hidden">
                        {imgNode}
                    </figure>
                </a>
            ) : (
                <div className="absolute inset-0 rounded-[16px] shadow-[0px_4px_4px_1px_rgba(0,0,0,0.64)] transition-shadow duration-300 hover:shadow-[0px_8px_16px_2px_rgba(0,0,0,0.7)] overflow-hidden" role="presentation">
                    {imgNode}
                </div>
            )}
            {isPaint && onPreviewImage && (
                <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); onPreviewImage(image); }}
                    className="absolute bottom-3 left-3 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center shadow-lg transition-colors"
                    aria-label="查看全图"
                >
                    <ExpandIcon />
                </button>
            )}
        </div>
    );

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
                            {imageSlot}
                            {content}
                        </>
                    ) : (
                        <>
                            {content}
                            {imageSlot}
                        </>
                    )}
                </div>
            </div>
        </li>
    );
}

interface FanWork {
    id: number;
    cover_image_url: string;
    author: string;
    category: string;
    description: string | null;
    source_url: string | null;
    created_at: string;
}

function FullImageOverlay({ imageUrl, onClose }: { imageUrl: string | null; onClose: () => void }) {
    if (!imageUrl) return null
    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label="查看全图"
        >
            <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="关闭"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div
                className="relative max-w-[95vw] max-h-[95vh] w-full h-full flex items-center justify-center p-4"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={imageUrl}
                    alt="全图预览"
                    className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
                    onError={(e) => { e.currentTarget.src = '/assets/fanworks/fanwork.jpg' }}
                />
            </div>
        </div>
    )
}

function FilterBar({
    categories,
    selectedCategory,
    onCategoryChange,
    sortValue,
    onSortChange,
    resultCount,
}: {
    categories: string[];
    selectedCategory: string;
    onCategoryChange: (v: string) => void;
    sortValue: SortValue;
    onSortChange: (v: SortValue) => void;
    resultCount: number;
}) {
    return (
        <div className="sticky top-0 z-10 bg-gray-50/95 backdrop-blur-sm border-b border-gray-200 -mx-[64px] px-[64px] pb-5 pt-2 mb-2">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 font-['Inter','Noto_Sans_SC','Noto_Sans_JP',sans-serif]">
                <div className="flex items-center gap-2">
                    <span className="text-[14px] text-black/55 font-medium tracking-[-0.07px]">类型</span>
                    <div className="flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={() => onCategoryChange(ALL_TYPES)}
                            className={`px-3 py-1.5 rounded-lg text-[14px] font-medium tracking-[-0.07px] transition-colors ${selectedCategory === ALL_TYPES ? 'bg-black text-white' : 'bg-white text-black/75 border border-gray-200 hover:border-gray-300 hover:text-black'}`}
                        >
                            {ALL_TYPES}
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => onCategoryChange(cat)}
                                className={`px-3 py-1.5 rounded-lg text-[14px] font-medium tracking-[-0.07px] transition-colors ${selectedCategory === cat ? 'bg-black text-white' : 'bg-white text-black/75 border border-gray-200 hover:border-gray-300 hover:text-black'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[14px] text-black/55 font-medium tracking-[-0.07px]">排序</span>
                    <div className="flex rounded-lg border border-gray-200 bg-white p-0.5">
                        {SORT_OPTIONS.map((opt) => (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => onSortChange(opt.value)}
                                className={`px-3 py-1.5 rounded-md text-[14px] font-medium tracking-[-0.07px] transition-colors ${sortValue === opt.value ? 'bg-gray-900 text-white' : 'text-black/75 hover:text-black'}`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>
                <span className="text-[14px] text-black/45 ml-auto">
                    共 {resultCount} 件
                </span>
            </div>
        </div>
    );
}

export default function FanWorksList() {
    const [initialWorks, setInitialWorks] = useState<FanWork[]>([]);
    const [fullWorks, setFullWorks] = useState<FanWork[] | null>(null);
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [categoryFilter, setCategoryFilter] = useState(ALL_TYPES);
    const [sortOrder, setSortOrder] = useState<SortValue>('newest');
    const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

    // 首次加载：先请求少量数据快速展示，同时后台请求全量；之后筛选/排序在前端完成，切换即时
    useEffect(() => {
        let cancelled = false;

        const paramsFirst = new URLSearchParams({ limit: String(INITIAL_PAGE_SIZE), sort: 'newest' });
        fetch(`/api/fanworks?${paramsFirst.toString()}`)
            .then((res) => res.json())
            .then((json) => {
                if (!cancelled) {
                    setInitialWorks(json.data || []);
                    setCategories(json.categories || []);
                    setLoading(false);
                }
            })
            .catch((err) => { if (!cancelled) console.error('加载作品失败:', err); setLoading(false); });

        const paramsFull = new URLSearchParams({ limit: String(FULL_DATA_LIMIT), sort: 'newest' });
        fetch(`/api/fanworks?${paramsFull.toString()}`)
            .then((res) => res.json())
            .then((json) => {
                if (!cancelled) setFullWorks(json.data || []);
            })
            .catch((err) => { if (!cancelled) console.error('加载全量作品失败:', err); });

        return () => { cancelled = true; };
    }, []);

    useEffect(() => {
        if (previewImageUrl) {
            document.body.style.overflow = 'hidden';
            return () => { document.body.style.overflow = ''; };
        }
    }, [previewImageUrl]);

    const displayedWorks = useMemo(() => {
        const source = fullWorks !== null ? fullWorks : initialWorks;
        let list = source;
        if (categoryFilter !== ALL_TYPES) {
            list = list.filter((w) => (w.category?.trim() || '') === categoryFilter);
        }
        const asc = sortOrder === 'oldest';
        return [...list].sort((a, b) => {
            const tA = new Date(a.created_at).getTime();
            const tB = new Date(b.created_at).getTime();
            return asc ? tA - tB : tB - tA;
        });
    }, [fullWorks, initialWorks, categoryFilter, sortOrder]);

    const isEmpty = displayedWorks.length === 0;
    const isFilteredEmpty = isEmpty && categoryFilter !== ALL_TYPES;

    return (
        <div className="w-full">
            {loading && initialWorks.length === 0 ? (
                <div className="flex items-center justify-center py-20">
                    <div className="text-gray-600 font-['Inter','Noto_Sans_SC',sans-serif] flex items-baseline">
                        <span>加载中</span>
                        <span className="inline-flex" aria-hidden>
                            {[0, 1, 2].map((i) => (
                                <span
                                    key={i}
                                    className="animate-[loading-dots_1.2s_ease-in-out_infinite]"
                                    style={{ animationDelay: `${i * 0.2}s` }}
                                >
                                    .
                                </span>
                            ))}
                        </span>
                    </div>
                </div>
            ) : (
                <>
                    <FilterBar
                        categories={categories}
                        selectedCategory={categoryFilter}
                        onCategoryChange={setCategoryFilter}
                        sortValue={sortOrder}
                        onSortChange={setSortOrder}
                        resultCount={displayedWorks.length}
                    />
                    {isEmpty ? (
                        <div className="py-16 text-center text-black/55 font-['Inter','Noto_Sans_SC',sans-serif] text-[16px]">
                            {isFilteredEmpty ? '当前筛选条件下暂无作品' : '暂无作品'}
                        </div>
                    ) : (
                        <ul className="flex flex-col items-center justify-center relative size-full content-stretch py-[40px]" data-name="Feature 1">
                            {displayedWorks.map((work, index) => (
                                <WorkRow
                                    key={work.id}
                                    author={work.author}
                                    type={work.category}
                                    description={work.description || '暂无简介'}
                                    image={work.cover_image_url}
                                    imageAlt={`${work.author} 的 ${work.category} 作品`}
                                    link={work.source_url || undefined}
                                    reverse={index % 2 === 1}
                                    category={work.category}
                                    onPreviewImage={setPreviewImageUrl}
                                />
                            ))}
                        </ul>
                    )}
                </>
            )}
            <FullImageOverlay imageUrl={previewImageUrl} onClose={() => setPreviewImageUrl(null)} />
        </div>
    );
}
