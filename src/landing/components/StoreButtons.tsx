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
  const isColumn = layout === "column" || layout === "column-md";
  const containerClass = isColumn
    ? "flex flex-col items-center justify-center gap-[clamp(8px,1.2vw,16px)]"
    : layout === "wrap"
      ? "flex flex-wrap items-center justify-center gap-x-[clamp(8px,2vw,36px)] gap-y-2"
      : "flex flex-wrap items-center justify-center gap-x-[clamp(8px,2vw,36px)] gap-y-2";

  if (variant === "light") {
    const buttonClass = [
      "flex shrink-0 items-center justify-center rounded-full",
      "transition-all duration-[160ms] ease-out hover:scale-[1.03] active:scale-[0.98]",
      "focus:outline-none focus:ring-2 focus:ring-cp-red/50 focus:ring-offset-2",
      size === "final"
        ? "h-[clamp(30px,7vw,55px)] w-[clamp(88px,23vw,230px)]"
        : "h-[clamp(31px,4.2vw,60px)] w-[clamp(88px,17vw,245px)]",
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
                className="h-full w-full object-cover"
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
