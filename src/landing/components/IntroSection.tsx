import { StoreButtons } from "@/landing/components/StoreButtons";
import type { IntroContent, StoreLink } from "@/landing/types/landing.types";

type IntroSectionProps = {
  content: IntroContent;
  stores: StoreLink[];
};

export function IntroSection({ content, stores }: IntroSectionProps) {
  return (
    <section className="px-4 pt-5 pb-[clamp(22px,5vw,64px)] sm:pt-[clamp(42px,0vw,210px)]">
      <div className="mx-auto max-w-[980px]">
        <p className="text-center font-amx-medium text-[clamp(18px,4vw,42px)] leading-[1.18] tracking-[-0.015em] text-[#4d4d4d]">
          {content.description}
        </p>
        <p className="mt-[clamp(18px,3vw,60px)] text-center font-amx-bold text-[clamp(20px,3vw,50px)] leading-[1.05] tracking-[-0.02em] text-[#4d4d4d]">
          {content.highlight}
        </p>
        <div className="mt-[clamp(14px,3.4vw,54px)] flex min-h-[clamp(44px,10vw,98px)] items-center justify-center">
          <StoreButtons stores={stores} variant="light" layout="row" size="intro" />
        </div>
      </div>
    </section>
  );
}
