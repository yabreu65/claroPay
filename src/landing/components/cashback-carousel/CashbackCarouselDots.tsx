import type { CashbackCarouselDotsProps } from "@/landing/components/cashback-carousel/cashback-carousel.types";

export function CashbackCarouselDots({
  items,
  visibleIndex,
  onDotClick,
}: CashbackCarouselDotsProps) {
  return (
    <div className="flex justify-center gap-[clamp(7px,1vw,14px)]">
      {items.map((item, index) => {
        const isActive = index === visibleIndex;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onDotClick(index)}
            className={`relative h-8 w-8 rounded-full transition-all duration-[220ms] ease-out before:absolute before:left-1/2 before:top-1/2 before:h-3.5 before:w-3.5 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full ${
              isActive 
                ? "scale-110 before:bg-[#de2626]" 
                : "hover:scale-105 before:border before:border-white/70 before:bg-white/40 hover:before:bg-white/70"
            }`}
            aria-label={`Ir al item ${index + 1}`}
          />
        );
      })}
    </div>
  );
}
