"use client";

import Image from "next/image";
import type { StoreLink } from "@/landing/types/landing.types";
import { useDevicePlatform } from "@/landing/hooks/useDevicePlatform";

type StoreButtonsProps = {
  stores: StoreLink[];
  layout?: "row" | "wrap" | "column" | "column-md";
  size?: "intro" | "final";
};

function getStorePlatform(id: string): "ios" | "android" | "huawei" | null {
  if (id.includes("app-store")) return "ios";
  if (id.includes("app-play")) return "android";
  if (id.includes("app-gallery")) return "huawei";
  return null;
}

export function StoreButtons({
  stores,
  layout = "row",
  size = "intro",
}: StoreButtonsProps) {
  const platform = useDevicePlatform();

  const visibleStores =
    platform === "unknown"
      ? stores
      : stores.filter((store) => {
          const storePlatform = getStorePlatform(store.id);
          return storePlatform === null || storePlatform === platform;
        });

  const containerClass =
    layout === "column"
      ? "flex flex-col items-center justify-center gap-[clamp(8px,1.2vw,16px)]"
      : layout === "column-md"
        ? "flex flex-wrap items-center justify-center gap-x-[clamp(12px,2.6vw,40px)] gap-y-[clamp(8px,1.6vw,18px)] md:flex-col md:gap-[clamp(6px,0.9vw,12px)]"
        : "flex flex-wrap items-center justify-center gap-x-[clamp(12px,2.6vw,40px)] gap-y-[clamp(8px,1.6vw,18px)]";

  const buttonClass = [
    "flex shrink-0 items-center justify-center rounded-full",
    "transition-all duration-[160ms] ease-out hover:scale-[1.03] active:scale-[0.98]",
    "focus:outline-none focus:ring-2 focus:ring-cp-red/50 focus:ring-offset-2",
    size === "final"
      ? "max-[415px]:w-[86px] w-[clamp(96px,22vw,230px)] aspect-[90/29] md:w-[clamp(112px,13vw,184px)]"
      : "w-[clamp(100px,25vw,245px)] aspect-[123/39]",
  ].join(" ");

  return (
    <div className={`${containerClass} transition-opacity duration-300`}>
      {visibleStores.map((store) => (
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
            <span className="font-amx-medium text-xs uppercase text-[#646a73]">
              {store.label}
            </span>
          )}
        </a>
      ))}
    </div>
  );
}
