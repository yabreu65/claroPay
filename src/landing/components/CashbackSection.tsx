import Image from "next/image";
import { CashbackCarousel } from "@/landing/components/cashback-carousel";
import type { CashbackSlide } from "@/landing/types/landing.types";

type CashbackSectionProps = {
  content: CashbackSlide;
  carouselItemFrameSrc: string;
  logoSrc: string;
};

export function CashbackSection({
  content,
  carouselItemFrameSrc,
  logoSrc,
}: CashbackSectionProps) {
  return (
    <section className="relative w-full px-0 pb-[clamp(86px,12vw,210px)]">
      <div className="relative mx-auto h-[clamp(590px,120vw,960px)] w-full max-w-[1440px] overflow-hidden sm:h-[clamp(760px,67vw,970px)]">
        <Image
          src="/landing/svg/carousel-bg.svg"
          alt=""
          fill
          className="object-cover object-center sm:hidden"
          sizes="100vw"
          aria-hidden="true"
        />
        <Image
          src="/landing/images/carousel-bg-desktop-1.png"
          alt=""
          fill
          className="hidden object-cover object-center sm:block"
          sizes="100vw"
          aria-hidden="true"
        />

        <div className="absolute inset-x-0 top-[9%] z-10 flex flex-col items-center px-4 sm:top-[8%]">
          <div className="flex items-end justify-center">
            <p className="mb-[clamp(2px,0.3vw,5px)] mr-[clamp(4px,0.9vw,12px)] font-amx-black-italic text-[clamp(17px,3.4vw,42px)] uppercase leading-none tracking-[-0.04em] text-[#4d4d4d]">
              {content.kickerStart}
            </p>
            <Image
              src={logoSrc}
              alt="Claro Pay"
              width={340}
              height={70}
              className="h-auto w-[clamp(138px,24vw,330px)] object-contain"
              priority
            />
            <p className="mb-[clamp(2px,0.3vw,5px)] ml-[clamp(3px,0.7vw,10px)] font-amx-black-italic text-[clamp(17px,3.4vw,42px)] uppercase leading-none tracking-[-0.04em] text-[#4d4d4d]">
              {content.kickerEnd}
            </p>
          </div>

          <Image
            src="/landing/svg/carousel-cashback.svg"
            alt="Cashback"
            width={252}
            height={53}
            className="mt-[clamp(6px,1.4vw,20px)] h-auto w-[clamp(250px,46vw,660px)]"
            priority
          />

          <div className="mt-[clamp(24px,4vw,62px)] w-full">
            <CashbackCarousel items={content.carouselItems} frameSrc={carouselItemFrameSrc} />
          </div>
        </div>
      </div>
    </section>
  );
}
