import Image from "next/image";
import type { BrandFooterContent } from "@/landing/types/landing.types";

type BrandFooterProps = {
  content: BrandFooterContent;
  logoSrc: string;
};

export function BrandFooter({ content, logoSrc }: BrandFooterProps) {
  return (
    <section className="bg-[#111111] px-5 pt-[clamp(10px,2.3vw,34px)] pb-[clamp(2px,1.3vw,15px)] text-white">
      <div className="mx-auto flex max-w-[1120px] flex-col items-center text-center">
        <Image
          src={logoSrc}
          alt="Claro"
          width={124}
          height={46}
          className="h-auto w-[clamp(82px,9vw,124px)]"
        />
        <p className="max-w-[400px] mx-auto mt-2 font-amx-regular text-[clamp(12px,1vw,16px)] uppercase tracking-[0.2px] text-white">
          {content.disclaimer}
        </p>
      </div>
    </section>
  );
}
