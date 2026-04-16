import Image from "next/image";
import { StoreButtons } from "@/landing/components/StoreButtons";
import type { FinalCTAContent, StoreLink } from "@/landing/types/landing.types";

type FinalCTASectionProps = {
  content: FinalCTAContent;
  stores: StoreLink[];
  phoneMockupSrc: string;
};

export function FinalCTASection({ stores, phoneMockupSrc }: FinalCTASectionProps) {
  return (
    <section className="relative pb-0">
      {/* MOBILE / TABLET NARROW */}
      <div className="md:hidden">
        <div className="relative ml-auto flex min-h-[clamp(112px,26vw,198px)] w-full items-center justify-center overflow-hidden bg-[#757575] px-4">
          <Image
            src={phoneMockupSrc}
            alt="Descargá Claro Pay y conectá tu plata con todo"
            width={352}
            height={109}
            className="h-auto w-[min(86vw,680px)] object-contain"
            sizes="86vw"
          />
        </div>

        <div className="relative z-10 w-[89%] rounded-r-[999px] bg-[#de2626] py-[clamp(7px,2vw,16px)] pl-[clamp(10px,3vw,28px)] pr-[clamp(14px,5vw,52px)]">
          <StoreButtons stores={stores} variant="light" layout="row" size="final" />
        </div>
      </div>

      {/* DESKTOP >= 768 */}
      <div className="hidden md:block">
        <div className="relative min-h-[clamp(220px,22vw,340px)] bg-[#757575]">
          <div className="absolute left-0 top-1/2 z-20 flex min-h-[clamp(190px,19vw,290px)] w-[31%] -translate-y-1/2 items-center justify-center rounded-r-[999px] bg-[#de2626] px-[clamp(12px,2vw,42px)] py-[clamp(14px,2vw,34px)]">
            <StoreButtons stores={stores} variant="light" layout="column" size="final" />
          </div>

          <div className="mx-auto flex min-h-[clamp(220px,22vw,340px)] w-full max-w-[1440px] items-center justify-end px-[clamp(24px,4vw,78px)]">
            <Image
              src={phoneMockupSrc}
              alt="Descargá Claro Pay y conectá tu plata con todo"
              width={352}
              height={109}
              className="h-auto w-[clamp(420px,55vw,860px)] object-contain"
              sizes="(min-width: 1280px) 860px, 55vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
