"use client";

import { useScrollReveal } from "@/landing/components/_hooks/useScrollReveal";
import type { BrandFooterContent } from "@/landing/types/landing.types";

type BrandFooterProps = {
  content: BrandFooterContent;
  logoSrc: string;
};

export function BrandFooter({ content }: BrandFooterProps) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      className={`bg-[#111111] px-5 py-[clamp(18px,2.3vw,34px)] text-white transition-all duration-[280ms] ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="mx-auto flex max-w-[1120px] flex-col items-center text-center">
        <p className="font-amx-bold text-[clamp(24px,3.8vw,58px)] leading-none tracking-[-0.02em] text-white">
          Claro<span className="text-[0.72em]">´</span>
        </p>
        <p className="mt-2 font-amx-regular text-[clamp(10px,1vw,16px)] uppercase tracking-[0.12em] text-white/70">
          {content.disclaimer}
        </p>
      </div>
    </section>
  );
}
