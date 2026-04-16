"use client";

import { useEffect, useMemo, useState } from "react";
import { carouselVars } from "@/landing/components/cashback-carousel/cashback-carousel.constants";
import type {
  CashbackCarouselProps,
  SlideRole,
} from "@/landing/components/cashback-carousel/cashback-carousel.types";
import { CashbackCarouselSlides } from "@/landing/components/cashback-carousel/CashbackCarouselSlides";
import { CashbackCarouselDots } from "@/landing/components/cashback-carousel/CashbackCarouselDots";

export function CashbackCarousel({ items, frameSrc }: CashbackCarouselProps) {
  const [activeStep, setActiveStep] = useState(0);

  const visibleIndex =
    items.length === 0 ? 0 : ((activeStep % items.length) + items.length) % items.length;

  useEffect(() => {
    if (items.length <= 1) return;

    const interval = window.setInterval(() => {
      setActiveStep((prev) => prev + 1);
    }, 3000);

    return () => window.clearInterval(interval);
  }, [items.length]);

  const slideRoles = useMemo<SlideRole[]>(() => {
    return items.map((_, index) => {
      if (index === visibleIndex) return "active";
      if (index === (visibleIndex - 1 + items.length) % items.length) return "prev";
      if (index === (visibleIndex + 1) % items.length) return "next";
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

  return (
    <div
      className="w-full flex flex-col items-center justify-center [--carousel-offset:clamp(210px,48vw,520px)]"
      style={carouselVars}
    >
      <CashbackCarouselSlides items={items} frameSrc={frameSrc} slideRoles={slideRoles} />
      <CashbackCarouselDots
        items={items}
        visibleIndex={visibleIndex}
        onDotClick={goToDot}
      />
    </div>
  );
}
