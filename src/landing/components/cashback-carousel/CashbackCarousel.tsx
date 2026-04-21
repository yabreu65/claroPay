"use client";

import { useEffect, useMemo, useState } from "react";
import type {
  CashbackCarouselProps,
  SlideRole,
} from "@/landing/components/cashback-carousel/cashback-carousel.types";
import { CashbackCarouselSlides } from "@/landing/components/cashback-carousel/CashbackCarouselSlides";

export function CashbackCarousel({ items, frameSrc }: CashbackCarouselProps) {
  const [activeStep, setActiveStep] = useState(0);

  const visibleIndex =
    items.length === 0
      ? 0
      : ((activeStep % items.length) + items.length) % items.length;

  useEffect(() => {
    if (items.length <= 1) return;

    const interval = window.setInterval(() => {
      setActiveStep((prev) => prev + 1);
    }, 3000);

    return () => window.clearInterval(interval);
  }, [items.length]);

  const slideRoles = useMemo<SlideRole[]>(() => {
    return items.map((_, index) => {
      const diff = (index - visibleIndex + items.length) % items.length;

      if (diff === 0) return "active";
      if (diff === 1) return "next";
      if (diff === items.length - 1) return "prev";
      if (diff === 2) return "far-next";
      if (diff === items.length - 2) return "far-prev";
      return "hidden";
    });
  }, [items, visibleIndex]);
  
  if (items.length === 0) return null;

  const goToDot = (targetIndex: number) => {
    const current = visibleIndex;
    const forwardSteps = (targetIndex - current + items.length) % items.length;
    if (forwardSteps === 0) return;
    setActiveStep((prev) => prev + forwardSteps);
  };

  const goNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const goPrev = () => {
    setActiveStep((prev) => prev - 1);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center [--carousel-card-width:clamp(240px,68vw,340px)] [--carousel-stage-height:clamp(240px,56vw,360px)] max-[430px]:[--carousel-offset:240px] [--carousel-offset:270px] sm:[--carousel-offset:clamp(210px,48vw,520px)] sm:[--carousel-card-width:clamp(230px,31vw,430px)] sm:[--carousel-stage-height:clamp(210px,30vw,520px)]">
      <CashbackCarouselSlides
        items={items}
        frameSrc={frameSrc}
        slideRoles={slideRoles}
        visibleIndex={visibleIndex}
        onDotClick={goToDot}
        onSwipeNext={goNext}
        onSwipePrev={goPrev}
      />
    </div>
  );
}
