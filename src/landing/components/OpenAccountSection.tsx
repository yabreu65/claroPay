import Image from "next/image";
import type { OpenAccountContent } from "@/landing/types/landing.types";

type OpenAccountSectionProps = {
  content: OpenAccountContent;
  iconSrc: string;
};

export function OpenAccountSection({ content }: OpenAccountSectionProps) {
  const { title, steps } = content;

  return (
    <section className="relative w-full px-5 pb-[clamp(92px,12vw,220px)]">
      <div className="relative mx-auto w-full max-w-[1180px]">
        <Image
          src="/landing/svg/abri-tu-cuenta.svg"
          alt={title}
          width={667}
          height={389}
          className="h-auto w-full"
          sizes="(min-width: 1280px) 1180px, 92vw"
        />

        <div className="absolute inset-x-[9%] bottom-[18%] z-10 sm:inset-x-[11%] sm:bottom-[19%]">
          <div className="grid grid-cols-2 gap-x-[8%] gap-y-[clamp(0px,0.8vw,10px)]">
            {steps.map((step, index) => (
              <div key={step} className="flex items-baseline gap-[clamp(4px,0.8vw,14px)] whitespace-nowrap">
                <span className="font-amx-bold text-[clamp(10px,2vw,32px)] leading-none text-cp-red">
                  {index + 1}
                </span>
                <span className="font-amx-medium text-[clamp(10px,2vw,32px)] leading-none text-cp-description">
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
