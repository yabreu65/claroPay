import Image from "next/image";
import type { OpenAccountContent } from "@/landing/types/landing.types";

type OpenAccountSectionProps = {
  content: OpenAccountContent;
  iconSrc: string;
};

export function OpenAccountSection({ content }: OpenAccountSectionProps) {
  const { steps } = content;

  return (
    <section className="relative w-full px-1 pb-12">
      <div className="relative mx-auto w-full max-w-[1180px]">
        <Image
          src="/landing/images/abri-tu-cuenta.png"
          alt="abri tu cuenta"
          width={820}
          height={478}
          className="h-auto w-full"
          sizes="(min-width: 1280px) 1180px, 92vw"
        />

        <div className="absolute w-[65%] left-1/2 -translate-x-1/2 top-[65%] -translate-y-[20%]">
          <div className="grid grid-cols-2 gap-x-[50%] gap-y-2 top">
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
