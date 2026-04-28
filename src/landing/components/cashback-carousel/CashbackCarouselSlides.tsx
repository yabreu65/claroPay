import Image from "next/image";
import { useRef, useCallback, type CSSProperties } from "react";
import {
  getSlideClasses,
  getSlideTransform,
} from "@/landing/components/cashback-carousel/cashback-carousel.constants";
import type {
  CashbackCarouselSlidesProps,
} from "@/landing/components/cashback-carousel/cashback-carousel.types";
import { CashbackCarouselDots } from "@/landing/components/cashback-carousel/CashbackCarouselDots";


type CarouselCardProps = {
  frameSrc: string;
  percentage: string;
  label: string;
  subtitleLine1: string;
  subtitleAccent?: string;
  showWordmark?: boolean;
  className?: string;
  style?: CSSProperties;
};

function CarouselCard({
  frameSrc,
  percentage,
  label,
  subtitleLine1,
  subtitleAccent,
  showWordmark,
  className,
  style,
}: CarouselCardProps) {
  return (
    <div className={className} style={style}>
      <Image
        src={frameSrc}
        alt=""
        fill
        className="pointer-events-none object-contain"
        sizes="(min-width: 640px) var(--carousel-card-width), min(68vw, 340px)"
        aria-hidden="true"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <p className="font-amx-black-italic tracking-[-4px] text-[80px] sm:text-[68px] xl:text-[140px] leading-[0.84] text-[#666666]">
          {percentage}
        </p>

        {showWordmark !== false ? (
          <Image
            src="/landing/svg/carousel-cashback.svg"
            alt={label}
            width={252}
            height={53}
            className="h-auto w-[clamp(116px,27vw,170px)] sm:w-[clamp(100px,22vw,300px)]"
          />
        ) : null}

        <p className="mt-1 font-amx-italic text-[clamp(18px,2vw,38px)] uppercase leading-[0.95] text-[#656569]">
          {subtitleLine1}
        </p>

        {subtitleAccent ? (
          <p className="font-amx-black-italic text-[clamp(18px,3.4vw,38px)] uppercase leading-[0.95] text-[#de2626]">
            {subtitleAccent}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function CashbackCarouselSlides({
  items,
  frameSrc,
  slideRoles,
  visibleIndex,
  onDotClick,
  onSwipeNext,
  onSwipePrev,
}: CashbackCarouselSlidesProps) {
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const gestureHandledRef = useRef(false);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (items.length <= 1) return;
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    gestureHandledRef.current = false;
  }, [items.length]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current || items.length <= 1 || gestureHandledRef.current) return;
    
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    
    const SWIPE_THRESHOLD = 40;
    
    if (absDx > SWIPE_THRESHOLD && absDx > absDy) {
      gestureHandledRef.current = true;
      if (dx < 0 && onSwipeNext) {
        onSwipeNext();
      } else if (dx > 0 && onSwipePrev) {
        onSwipePrev();
      }
    }
    
    touchStartRef.current = null;
  }, [items.length, onSwipeNext, onSwipePrev]);

  return (
    <>
      <div
        className="relative h-[var(--carousel-stage-height)] w-full sm:hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {items.map((item, index) => {
          const role = slideRoles[index] ?? "hidden";

          return (
            <article
              key={item.id}
              className="absolute inset-0 flex items-center justify-center"
              aria-hidden={role !== "active"}
            >
              <CarouselCard
                frameSrc={frameSrc}
                percentage={item.percentage}
                label={item.label}
                subtitleLine1={item.subtitleLine1}
                subtitleAccent={item.subtitleAccent}
                showWordmark={item.showWordmark}
                className={`absolute left-1/2 top-[40%] w-[var(--carousel-card-width)] origin-center aspect-[250/200] will-change-transform transition-all duration-[560ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${getSlideClasses(
                  role,
                )}`}
                style={{ transform: getSlideTransform(role) }}
              />
            </article>
          );
        })}
      </div>

      <div className="relative hidden h-[var(--carousel-stage-height)] w-full sm:block">
        {items.map((item, index) => {
          const role = slideRoles[index] ?? "hidden";

          return (
            <article
              key={`desktop-${item.id}`}
              className="absolute inset-0 flex items-center justify-center"
              aria-hidden={role !== "active"}
            >
              <CarouselCard
                frameSrc={frameSrc}
                percentage={item.percentage}
                label={item.label}
                subtitleLine1={item.subtitleLine1}
                subtitleAccent={item.subtitleAccent}
                showWordmark={item.showWordmark}
                className={`absolute left-1/2 top-1/2 w-[var(--carousel-card-width)] origin-center aspect-[230/182] will-change-transform transition-all duration-[560ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${getSlideClasses(
                  role,
                )}`}
                style={{ transform: getSlideTransform(role) }}
              />
            </article>
          );
        })}
      </div>

      <CashbackCarouselDots
        items={items}
        visibleIndex={visibleIndex}
        onDotClick={onDotClick}
        className="relative -top-6 max-[430px]:-top-12 sm:-top-3"
      />
    </>
  );
}
