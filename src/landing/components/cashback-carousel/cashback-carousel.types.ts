import type { CashbackCarouselItem } from "@/landing/types/landing.types";

export type SlideRole = "active" | "prev" | "next" | "far-prev" | "far-next"|"hidden";

export type CashbackCarouselProps = {
  items: CashbackCarouselItem[];
  frameSrc: string;
};

export type CashbackCarouselSlidesProps = {
  items: CashbackCarouselItem[];
  frameSrc: string;
  slideRoles: SlideRole[];
  visibleIndex: number;
  onDotClick: (index: number) => void;
  onSwipeNext?: () => void;
  onSwipePrev?: () => void;
};

export type CashbackCarouselDotsProps = {
  items: CashbackCarouselItem[];
  visibleIndex: number;
  onDotClick: (index: number) => void;
  className?: string;
};
