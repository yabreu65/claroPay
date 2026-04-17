import Image from "next/image";

type HeroSectionProps = {
  logoSrc: string;
  bannerSrc: string;
};

export function HeroSection({ logoSrc, bannerSrc }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-8 pb-2 sm:pt-[clamp(28px,4.6vw,82px)] sm:pb-[clamp(18px,2.2vw,34px)]">
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="flex justify-end pl-6 pr-8 sm:justify-center sm:px-6">
          <div className="h-[clamp(34px,7vw,110px)]">
            <Image
              src={logoSrc}
              alt="Claro Pay"
              width={340}
              height={70}
              className="h-full w-auto"
              priority
            />
          </div>
        </div>

        <div className="relative mt-3 sm:mt-[clamp(16px,3.2vw,52px)]">
          <Image
            src={bannerSrc}
            alt="Tu plata conectada con todo lo que necesitás"
            width={738}
            height={262}
            className="block h-auto w-full"
            sizes="100vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}
