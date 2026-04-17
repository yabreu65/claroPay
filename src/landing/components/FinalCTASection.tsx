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
    <section className="relative pb-0">
      <div>
        <div className="relative flex rounded-l-[70px] min-h-[clamp(120px,28vw,260px)] w-[90%] ml-auto pl-[clamp(26px,8vw,116px)] items-center  bg-[#757575]  max-[380px]:px-4">
          <Image
            src={phoneMockupSrc}
            alt="Descargá Claro Pay y conectá tu plata con todo"
            width={128}
            height={154}
            className="relative z-10 h-auto -mt-[20px] w-[clamp(100px,25vw,230px)] shrink-0 -translate-y-1 max-[389px]:-translate-x-1  -translate-x-4 object-contain sm:-translate-y-3"
            sizes="(min-width: 1280px) 230px, 25vw"
          />

          <h2 className="relative z-10  max-w-[min(58vw,760px)] font-amx-bold text-[clamp(22px,5vw,58px)] text-center italic leading-[0.98] tracking-[-0.045em] text-white">
            {headlineLines.map((line) => (
              <span key={line} className="block whitespace-nowrap">
                {line}
              </span>
            ))}
          </h2>
        </div>

        <div className="relative z-10 w-[89%] rounded-r-[999px] bg-[#de2626] py-[clamp(24px,3.2vw,26px)] pl-[clamp(10px,3vw,28px)] pr-[clamp(14px,5vw,52px)]">
          <StoreButtons stores={stores} variant="light" layout="row" size="final" />
        </div>
      </div>
    </section>
  );
}
