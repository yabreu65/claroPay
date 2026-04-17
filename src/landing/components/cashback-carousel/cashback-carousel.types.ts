import type { CashbackCarouselItem } from "@/landing/types/landing.types";

export type SlideRole = "active" | "prev" | "next" | "hidden";

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
};

export type CashbackCarouselDotsProps = {
  items: CashbackCarouselItem[];
  visibleIndex: number;
  onDotClick: (index: number) => void;
  className?: string;
};
