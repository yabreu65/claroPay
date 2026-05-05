import Image from "next/image";
import { StoreButtons } from "@/landing/components/StoreButtons";
import type { FinalCTAContent, StoreLink } from "@/landing/types/landing.types";

type FinalCTASectionProps = {
  content: FinalCTAContent;
  stores: StoreLink[];
  phoneMockupSrc: string;
};

export function FinalCTASection({ content, stores, phoneMockupSrc }: FinalCTASectionProps) {
  const headlineLines = content.headlineHtml
    .split(/<br\s*\/?>/i)
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <section className="relative pb-14">
      <div className="md:flex md:w-full ">
        <div className="relative flex w-[90%] md:w-[72%] md:py-2 items-center rounded-l-[999px] bg-[#757575] pl-[clamp(26px,8vw,116px)] ml-auto max-[380px]:px-4 md:order-2 md:ml-auto  md:pl-0 md:pr-[clamp(24px,6vw,96px)]">
          <Image
            src={phoneMockupSrc}
            alt="Descargá Claro Pay y conectá tu plata con todo"
            width={128}
            height={154}
            className="relative z-10 h-auto -mt-[20px] w-[clamp(100px,25vw,230px)] shrink-0 -translate-x-8 -translate-y-1 object-contain max-[389px]:-translate-x-3 sm:-translate-y-3  md:-mt-[clamp(28px,4vw,48px)] md:w-[clamp(116px,16vw,230px)] md:translate-x-3 md:translate-y-0"
            sizes="(min-width: 768px) 16vw, 25vw"
          />

          <h2 className="relative z-20 max-w-[min(58vw,760px)] text-center font-amx-bold max-[415px]:text-[19px] text-[clamp(22px,5vw,58px)] italic leading-[0.98] tracking-[-0.045em] text-white md:flex-1 md:text-[clamp(26px,3.8vw,58px)]">
            {headlineLines.map((line) => (
              <span key={line} className="block whitespace-nowrap">
                {line}
              </span>
            ))}
          </h2>
        </div>

        <div className="relative md:absolute z-30 w-[89%] rounded-r-[999px] bg-[#de2626] py-[24px] md:py-4 pl-[clamp(10px,3vw,28px)] pr-[clamp(14px,5vw,52px)] md:order-1 md:flex md:w-[30%] md:shrink-0 md:items-center md:justify-center md:self-stretch  md:pl-[clamp(28px,4vw,64px)] md:pr-[clamp(44px,5vw,82px)]">
          <StoreButtons stores={stores} layout="column-md" size="final" />
        </div>
      </div>
    </section>
  );
}
