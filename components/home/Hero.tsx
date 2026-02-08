export default function Hero() {
  return (
    <div className="content-stretch flex flex-col items-center justify-end px-[32px] py-[120px] relative w-full h-screen min-h-[600px] overflow-hidden" data-name="Hero 1">
      <img alt="Background" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src="/assets/index/bg2.jpg" />
      <div className="relative shrink-0 w-[80%] max-w-[600px] mb-[10vh]" data-name="title(1) 1">
        <img alt="Seabed Title" className="w-full h-auto object-contain pointer-events-none" src="/assets/index/title(1).png" />
      </div>
    </div>
  );
}
