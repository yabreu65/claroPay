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
    <section className="relative w-full px-0 pb-0">
      <div className="relative mx-auto w-full 2xl:max-w-[1580px]">
        <Image
          src="/landing/svg/carousel-bg.svg"
          alt=""
          width={1000}
          height={500}
          className="w-full object-cover h-auto sm:hidden"
        />
        <Image
          src="/landing/images/carousel-bg-desktop-1.png"
          alt=""
          width={1000}
          height={500}
          className="hidden w-full object-cover sm:block"
          fetchPriority="high"
        />

        <div className="absolute  inset-x-0 top-[6%] z-10 flex flex-col items-center px-4 sm:px-0 sm:top-[8%]">
          <div className="flex items-end justify-center mt-2">
            <p className="mb-[clamp(2px,0vw,5px)] mr-[clamp(4px,0.9vw,12px)] font-amx-black-italic text-[clamp(17px,3.4vw,42px)] uppercase leading-none tracking-[-0.04em] text-[#4d4d4d]">
              {content.kickerStart}
            </p>
            <Image
              src={logoSrc}
              alt="Claro Pay"
              width={340}
              height={70}
              className="h-auto w-[clamp(138px,20vw,330px)] sm:mb-1 object-contain"
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
            className="mt-[clamp(6px,0vw,20px)] h-auto w-[clamp(250px,40vw,660px)]"
          />

          <div className="w-full max-[430px]:mt-2 mt-6 sm:-mt-2">
            <CashbackCarousel
              items={content.carouselItems}
              frameSrc={carouselItemFrameSrc}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
