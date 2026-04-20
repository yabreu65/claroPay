import Image from "next/image";
import type { BrandFooterContent } from "@/landing/types/landing.types";

type BrandFooterProps = {
  content: BrandFooterContent;
  logoSrc: string;
};

export function BrandFooter({ content, logoSrc }: BrandFooterProps) {
  return (
    <section className="bg-[#1d1d1b] px-5 py-1 sm:py-2 text-white">
      <div className="mx-auto flex max-w-[1120px] flex-col items-center text-center">
        <Image
          src={logoSrc}
          alt="Claro"
          width={124}
          height={46}
          className="h-auto w-[20%] sm:w-[15%] md:w-[10%]  xl:w-[12%]"
        />
        <p className="max-w-[400px] mx-auto mt-2 font-amx-regular text-[clamp(12px,1vw,16px)] uppercase tracking-[0.2px] text-white">
          {content.disclaimer}
        </p>
      </div>
    </section>
  );
}
