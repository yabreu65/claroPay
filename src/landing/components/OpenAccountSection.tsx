import Image from "next/image";
import type { OpenAccountContent } from "@/landing/types/landing.types";

type OpenAccountSectionProps = {
  content: OpenAccountContent;
  iconSrc: string;
};

export function OpenAccountSection({ content }: OpenAccountSectionProps) {
  const { steps } = content;

  return (
    <section className="relative w-full max-sm:pb-[32px] sm:py-[48px] 2xl:py-32">
      <div className="relative mx-auto  w-full lg:max-w-[900px] ">
        <Image
          src="/landing/svg/abri-tu-cuenta-2.svg"
          alt="abri tu cuenta"
          width={820}
          height={478}
          className=" w-full"
          sizes="(min-width: 1280px) 1180px, 92vw"
        />

        <div className="absolute flex flex-col  justify-between gap-4 w-[65%] left-1/2 -translate-x-[60%] top-[47%] lg:top-[44%] lg:translate-y-[-50%] -translate-y-1/2">
          <div className="flex items-center justify-center top-0 gap-6 lg:gap-8 mb-3">
            <div className="w-12 sm:w-[64px] md:w-[80px] ">
              <Image
                src="/landing/svg/telefono+.svg"
                alt="telefono+"
                width={48}
                height={48}
                className="w-full h-auto"
              />
            </div>
            <div className="uppercase text-[#de271f] lg:mt-8">
              <h1 className="font-amx-black max-[400px]:text-[24px] text-[28px] sm:text-[58px] leading-none  md:leading-11 tracking-tighter">
                ABRÍ TU CUENTA <br /> GRATUITA{" "}
              </h1>
              <p className="font-amx-medium max-[400px]:text-sm text-base sm:text-xl xl:text-[34px]">EN SIMPLES PASOS:</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-[30%] lg:gap-x-[40%] gap-y-[clamp(24px,0,46px)] top">
            {steps.map((step, index) => (
              <div
                key={step}
                className="flex items-baseline gap-[clamp(4px,1vw,14px)] whitespace-nowrap"
              >
                <span className="font-amx-bold text-[clamp(18px,4vw,35px)] leading-none text-cp-red">
                  {index + 1}
                </span>
                <span className="font-amx-regular text-[clamp(18px,4vw,35px)] tracking-[-1px] leading-0 md:leading-12 text-cp-description">
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
