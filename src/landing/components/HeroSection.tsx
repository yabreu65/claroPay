import Image from "next/image";

type HeroSectionProps = {
  logoSrc: string;
  bannerSrc: string;
};

export function HeroSection({ logoSrc, bannerSrc }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-8 pb-2 sm:pt-[clamp(28px,4.6vw,82px)] sm:pb-[clamp(18px,2.2vw,34px)]">
      <div className="mx-auto w-full">
        <div className="w-full  flex justify-start">
          <div className="w-[47%] ml-[48%] sm:w-[48%] sm:ml-[44%] lg:w-[45%] lg:ml-[44%]">
            <Image
              src={logoSrc}
              alt="Claro Pay"
              width={640}
              height={70}
              className="h-auto w-full"
              loading="eager"
            />
          </div>
        </div>

        <div className="relative">
          <Image
            src={bannerSrc}
            alt="Tu plata conectada con todo lo que necesitás"
            width={738}
            height={262}
            className="block h-auto w-full"
            sizes="100vw"
            preload
          />
          <div className="absolute top-[55%] max-[380px]:left-[60%] left-[65%] lg:left-[62%] -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="uppercase text-[#de271f] font-amx-black text-[32px] sm:text-[48px] md:text-[54px] lg:text-[64px] xl:text-[85px] 2xl:text-[100px]  leading-none">Tu plata <br/> conectada </h1>
            <p className="text-[#949494] font-amx-medium text-[15px] sm:text-[24px] md:text-[27px] lg:text-[32px] xl:text-[41px] 2xl:text-[50px] leading-none">con todo lo que necesitás</p>
          </div>
        </div>
      </div>
    </section>
  );
}
