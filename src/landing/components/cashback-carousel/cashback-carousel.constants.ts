import type { CSSProperties } from "react";
import type { SlideRole } from "@/landing/components/cashback-carousel/cashback-carousel.types";

export const carouselVars = {
  "--carousel-card-width": "clamp(230px, 56vw, 520px)",
  "--carousel-stage-height": "clamp(270px, 50vw, 640px)",
} as CSSProperties;

export const getSlideClasses = (role: SlideRole) => {
  switch (role) {
    case "active":
      return "z-30 opacity-100";
    case "prev":
      return "z-20 opacity-80";
    case "next":
      return "z-20 opacity-80";
    case "far-prev":
      return "z-10 opacity-0 sm:opacity-55";
    case "far-next":
      return "z-10 opacity-0 sm:opacity-55";
    default:
      return "pointer-events-none z-0 opacity-0";
  }
};

export const getSlideTransform = (role: SlideRole) => {
  switch (role) {
    case "active":
      return "translate(-50%, -50%) scale(1)";
    case "prev":
      return "translate(calc(-50% - var(--carousel-offset)), -50%) scale(0.9)";
    case "next":
      return "translate(calc(-50% + var(--carousel-offset)), -50%) scale(0.9)";
    case "far-prev":
      return "translate(calc(-50% - (var(--carousel-offset) * 2)), -50%) scale(0.8)";
    case "far-next":
      return "translate(calc(-50% + (var(--carousel-offset) * 2)), -50%) scale(0.8)";
    default:
      return "translate(-50%, -50%) scale(0.74)";
  }
};
