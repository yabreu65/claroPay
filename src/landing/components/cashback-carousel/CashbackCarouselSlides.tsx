import Image from "next/image";
import { useLayoutEffect, useRef, type CSSProperties } from "react";
import {
  getSlideClasses,
  getSlideTransform,
} from "@/landing/components/cashback-carousel/cashback-carousel.constants";
import type {
  CashbackCarouselSlidesProps,
  SlideRole,
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

const getItemByRole = (
  role: SlideRole,
  items: CashbackCarouselSlidesProps["items"],
  slideRoles: SlideRole[],
) => {
  const idx = slideRoles.findIndex((r) => r === role);
  if (idx < 0) return undefined;
  return items[idx];
};

export function CashbackCarouselSlides({
  items,
  frameSrc,
  slideRoles,
  visibleIndex,
  onDotClick,
}: CashbackCarouselSlidesProps) {
  const desktopCardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const prevRectsRef = useRef<Record<string, DOMRect>>({});
  const hasInitializedRef = useRef(false);

  useLayoutEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia("(min-width: 640px)").matches) {
      prevRectsRef.current = {};
      hasInitializedRef.current = false;
      return;
    }

    const nextRects: Record<string, DOMRect> = {};

    Object.entries(desktopCardRefs.current).forEach(([id, node]) => {
      if (!node) return;
      const rect = node.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      nextRects[id] = rect;
    });

    if (!hasInitializedRef.current) {
      hasInitializedRef.current = true;
      prevRectsRef.current = nextRects;
      return;
    }

    Object.entries(desktopCardRefs.current).forEach(([id, node]) => {
      if (!node) return;
      const rect = node.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const prevRect = prevRectsRef.current[id];
      if (!prevRect) {
        node.style.transition = "opacity 300ms ease, transform 300ms ease";
        node.style.opacity = "0";
        node.style.transform = "translateX(-30px)";
        node.getBoundingClientRect();
        requestAnimationFrame(() => {
          node.style.transition = "opacity 700ms ease, transform 700ms ease";
          node.style.opacity = "1";
          node.style.transform = "translateX(0)";
        });
        return;
      }

      const dx = prevRect.left - rect.left;
      if (Math.abs(dx) < 0.5) return;

      node.style.transition = "none";
      node.style.transform = `translateX(${dx}px)`;
      node.getBoundingClientRect();

      requestAnimationFrame(() => {
        node.style.transition = "transform 700ms ease";
        node.style.transform = "translateX(0)";
      });
    });

    prevRectsRef.current = nextRects;
  }, [slideRoles]);

  const prevItem = getItemByRole("prev", items, slideRoles);
  const activeItem = getItemByRole("active", items, slideRoles) ?? items[0];
  const nextItem = getItemByRole("next", items, slideRoles);

  return (
    <>
      <div className="relative h-[var(--carousel-stage-height)] w-full sm:hidden">
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
                className={`absolute left-1/2 top-[40%] w-[var(--carousel-card-width)] origin-center aspect-[250/200] transition-all duration-[700ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] ${getSlideClasses(
                  role,
                )}`}
                style={{ transform: getSlideTransform(role) }}
              />
            </article>
          );
        })}
      </div>

      <div className="hidden h-[var(--carousel-stage-height)] w-full items-center justify-between px-0 sm:flex">
        {prevItem ? (
          <div className="z-20 flex h-full shrink-0 items-center justify-start">
            <div
              ref={(node) => {
                desktopCardRefs.current[prevItem.id] = node;
              }}
            >
              <CarouselCard
                frameSrc={frameSrc}
                percentage={prevItem.percentage}
                label={prevItem.label}
                subtitleLine1={prevItem.subtitleLine1}
                subtitleAccent={prevItem.subtitleAccent}
                showWordmark={prevItem.showWordmark}
                className="relative w-[calc(var(--carousel-card-width)*0.86)] origin-center aspect-[230/182] opacity-70"
              />
            </div>
          </div>
        ) : (
          <div className="w-[calc(var(--carousel-card-width)*0.86)]" aria-hidden="true" />
        )}

        {activeItem ? (
          <div className="z-20 flex h-full shrink-0 items-center justify-center">
            <div
              ref={(node) => {
                desktopCardRefs.current[activeItem.id] = node;
              }}
            >
              <CarouselCard
                frameSrc={frameSrc}
                percentage={activeItem.percentage}
                label={activeItem.label}
                subtitleLine1={activeItem.subtitleLine1}
                subtitleAccent={activeItem.subtitleAccent}
                showWordmark={activeItem.showWordmark}
                className="relative w-[var(--carousel-card-width)] origin-center aspect-[230/182]"
              />
            </div>
          </div>
        ) : null}

        {nextItem ? (
          <div className="z-10 flex h-full shrink-0 items-center justify-end">
            <div
              ref={(node) => {
                desktopCardRefs.current[nextItem.id] = node;
              }}
            >
              <CarouselCard
                frameSrc={frameSrc}
                percentage={nextItem.percentage}
                label={nextItem.label}
                subtitleLine1={nextItem.subtitleLine1}
                subtitleAccent={nextItem.subtitleAccent}
                showWordmark={nextItem.showWordmark}
                className="relative w-[calc(var(--carousel-card-width)*0.86)] origin-center aspect-[230/182] opacity-70"
              />
            </div>
          </div>
        ) : (
          <div className="w-[calc(var(--carousel-card-width)*0.86)]" aria-hidden="true" />
        )}
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
