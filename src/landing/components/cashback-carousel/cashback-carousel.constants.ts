import type { CSSProperties } from "react";
import type { SlideRole } from "@/landing/components/cashback-carousel/cashback-carousel.types";

export const carouselVars = {
  "--carousel-card-width": "clamp(230px, 56vw, 520px)",
  "--carousel-stage-height": "clamp(270px, 50vw, 640px)",
} as CSSProperties;

export const getSlideClasses = (role: SlideRole) => {
  switch (role) {
    case "active":
      return "z-20 opacity-100";
    case "prev":
      return "z-10 opacity-65";
    case "next":
      return "z-10 opacity-65";
    default:
      return "pointer-events-none z-0 opacity-0";
  }
};

export const getSlideTransform = (role: SlideRole) => {
  switch (role) {
    case "active":
      return "translate(-50%, -50%) scale(1)";
    case "prev":
      return "translate(calc(-50% - var(--carousel-offset)), -50%) scale(0.86)";
    case "next":
      return "translate(calc(-50% + var(--carousel-offset)), -50%) scale(0.86)";
    default:
      return "translate(-50%, -50%) scale(0.74)";
  }
};
