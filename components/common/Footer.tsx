function CompanyInfo() {
    return (
        <div className="relative flex items-center shrink-0 w-[100px] content-stretch" data-name="Company">
            <div className="relative flex flex-col justify-center shrink-0 w-[360px] font-['Inter','Noto_Sans_SC','Noto_Sans_JP',sans-serif] font-semibold text-[24px] text-black leading-[0] tracking-[-0.48px] not-italic">
                <p className="leading-[1.45] whitespace-pre-wrap">本站由TrAveller7150姬情制作</p>
            </div>
        </div>
    );
}

function ContactInfo() {
    return (
        <div className="relative flex flex-col items-start gap-[8px] w-full shrink-0 content-stretch" data-name="Text">
            <CompanyInfo />
            <div className="relative flex flex-col justify-center min-w-full w-[min-content] shrink-0 font-['Inter',sans-serif] font-medium text-[16px] text-[rgba(0,0,0,0.55)] leading-[0] tracking-[-0.08px] not-italic">
                <p className="leading-[1.45] whitespace-pre-wrap">Contact: 1427998531@qq.com</p>
            </div>
        </div>
    );
}

function FooterLeftContent() {
    return (
        <div className="relative flex flex-col items-start flex-[1_0_0] min-w-px min-h-px content-stretch" data-name="Content">
            <ContactInfo />
        </div>
    );
}

function FooterColumnHeader({ title }: { title: string }) {
    return (
        <div className="relative flex items-start w-full pb-[16px] shrink-0 content-stretch" data-name="Header">
            <div className="relative flex flex-col justify-center shrink-0 font-['Inter','Noto_Sans_SC','Noto_Sans_JP',sans-serif] font-semibold text-[16px] text-black leading-[0] tracking-[-0.08px] whitespace-nowrap not-italic">
                <p className="leading-[1.45]">{title}</p>
            </div>
        </div>
    );
}

function FooterLink({ text, href }: { text: string; href: string }) {
    return (
        <a className="relative flex flex-col justify-center w-full shrink-0 font-['Inter',sans-serif] font-medium text-[16px] text-[rgba(0,0,0,0.55)] leading-[0] tracking-[-0.08px] not-italic hover:text-blue-500 transition-colors" href={href} target="_blank" rel="noopener noreferrer">
            <p className="cursor-pointer leading-[1.45] whitespace-pre-wrap">{text}</p>
        </a>
    );
}

function OfficialColumn() {
    return (
        <nav className="relative flex flex-col justify-center items-start gap-[8px] w-[130px] shrink-0 content-stretch" data-name="Column 1">
            <FooterColumnHeader title="官方网站" />
            <FooterLink text="X" href="https://x.com/seabed_cm" />
            <FooterLink text="Fruitbat Factory" href="https://fruitbatfactory.com/" />
        </nav>
    );
}

function CommunityColumn() {
    return (
        <nav className="relative flex flex-col justify-center items-start gap-[8px] w-[130px] shrink-0 content-stretch" data-name="Column 2">
            <FooterColumnHeader title="同好交流" />
            <FooterLink text="百度贴吧" href="https://tieba.baidu.com/f?kw=seabed" />
            <FooterLink text="百合会" href="https://www.yamibo.com/" />
            <FooterLink text="Bangumi" href="https://bangumi.tv/subject/226956" />
        </nav>
    );
}

function FooterNav() {
    return (
        <div className="relative flex items-start gap-[40px] shrink-0 content-stretch" data-name="Nav">
            <OfficialColumn />
            <CommunityColumn />
        </div>
    );
}

function FooterContainer() {
    return (
        <div className="relative flex items-start gap-[120px] flex-[1_0_0] min-w-px min-h-px py-[80px] content-stretch" data-name="Container">
            <div aria-hidden="true" className="absolute inset-0 border-t border-solid border-[rgba(0,0,0,0.1)] pointer-events-none" />
            <FooterLeftContent />
            <FooterNav />
        </div>
    );
}

export default function Footer() {
    return (
        <footer className="relative flex justify-center items-center size-full px-[64px] bg-gray-50 content-stretch" data-name="Footer 1">
            <FooterContainer />
        </footer>
    );
}
