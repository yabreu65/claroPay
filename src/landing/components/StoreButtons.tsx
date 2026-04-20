import Image from "next/image";
import type { StoreLink } from "@/landing/types/landing.types";

type StoreButtonsProps = {
  stores: StoreLink[];
  compact?: boolean;
  variant?: "dark" | "light";
  layout?: "row" | "wrap" | "column" | "column-md";
  size?: "intro" | "final";
};

export function StoreButtons({
  stores,
  compact = false,
  variant = "dark",
  layout = "row",
  size = "intro",
}: StoreButtonsProps) {
  const containerClass = layout === "column"
    ? "flex flex-col items-center justify-center gap-[clamp(8px,1.2vw,16px)]"
    : layout === "column-md"
      ? "flex flex-wrap items-center justify-center gap-x-[clamp(12px,2.6vw,40px)] gap-y-[clamp(8px,1.6vw,18px)] md:flex-col md:gap-[clamp(6px,0.9vw,12px)]"
    : layout === "wrap"
      ? "flex flex-wrap items-center justify-center gap-x-[clamp(12px,2.6vw,40px)] gap-y-[clamp(8px,1.6vw,18px)]"
      : "flex flex-wrap items-center justify-center gap-x-[clamp(12px,2.6vw,40px)] gap-y-[clamp(8px,1.6vw,18px)]";

  if (variant === "light") {
    const buttonClass = [
      "flex shrink-0 items-center justify-center rounded-full",
      "transition-all duration-[160ms] ease-out hover:scale-[1.03] active:scale-[0.98]",
      "focus:outline-none focus:ring-2 focus:ring-cp-red/50 focus:ring-offset-2",
      size === "final"
        ? "max-[415px]:w-[86px] w-[clamp(96px,22vw,230px)] aspect-[90/29] md:w-[clamp(112px,13vw,184px)]"
        : "w-[clamp(100px,25vw,245px)] aspect-[123/39]",
    ].join(" ");

    return (
      <div className={containerClass}>
        {stores.map((store) => (
          <a key={store.id} href={store.href} className={buttonClass}>
            {store.badgeSrc ? (
              <Image
                src={store.badgeSrc}
                alt={store.label}
                width={size === "final" ? 180 : 246}
                height={size === "final" ? 58 : 78}
                className="block h-full w-full object-contain"
              />
            ) : (
              <span className="font-amx-medium text-xs uppercase text-[#646a73]">{store.label}</span>
            )}
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      {stores.map((store) => (
        <a
          key={store.id}
          href={store.href}
          className={`rounded-2xl border border-white/15 bg-cp-black px-4 text-white transition-all duration-[160ms] ease-out hover:border-white/25 hover:bg-white/10 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-cp-red/50 focus:ring-offset-2 focus:ring-offset-cp-black ${
            compact ? "h-12 min-w-[124px] py-1.5" : "h-14 min-w-[146px] py-2"
          }`}
        >
          <span className="block font-amx-medium text-[10px] uppercase tracking-[0.14em] text-white/70">
           {store.helper}
          </span>
          <span className="block font-amx-bold text-base leading-tight">wwww{store.label}</span>
        </a>
      ))}
    </div>
  );
}
