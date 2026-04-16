"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { ServicesCarouselItem } from "@/landing/types/landing.types";

type ServicesRadialCarouselProps = {
  items: ServicesCarouselItem[];
  fallbackIconSrc: string;
};

const AUTO_PLAY_MS = 3200;
const mod = (n: number, m: number) => ((n % m) + m) % m;

type SlotKey = "active" | "topLeft" | "topCenter" | "topRight";

type SlotStyle = {
  left: string;
  top: string;
  width: string;
  height: string;
  opacity: number;
  zIndex: number;
  scale: number;
  ring?: boolean;
};

const SLOT_STYLES: Record<SlotKey, SlotStyle> = {
  active: {
    left: "50%",
    top: "var(--active-top)",
    width: "var(--active-size)",
    height: "var(--active-size)",
    opacity: 1,
    zIndex: 40,
    scale: 1,
    ring: true,
  },
  topLeft: {
    left: "calc(50% - var(--orbit-offset-x))",
    top: "var(--orbit-top)",
    width: "var(--orbit-size)",
    height: "var(--orbit-size)",
    opacity: 0.4,
    zIndex: 24,
    scale: 1,
  },
  topCenter: {
    left: "50%",
    top: "var(--orbit-center-top)",
    width: "var(--orbit-size)",
    height: "var(--orbit-size)",
    opacity: 0.2,
    zIndex: 18,
    scale: 1,
  },
  topRight: {
    left: "calc(50% + var(--orbit-offset-x))",
    top: "var(--orbit-top)",
    width: "var(--orbit-size)",
    height: "var(--orbit-size)",
    opacity: 0.4,
    zIndex: 24,
    scale: 1,
  },
};

export function ServicesRadialCarousel({
  items,
  fallbackIconSrc,
}: ServicesRadialCarouselProps) {
  const safeItems = items.slice(0, 4);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isHoverPaused, setIsHoverPaused] = useState(false);
  const [isInteractionPaused, setIsInteractionPaused] = useState(false);
  const [isUserAnnouncing, setIsUserAnnouncing] = useState(false);
  const [iconSrcById, setIconSrcById] = useState<Record<string, string>>({});

  const normalizedActiveIndex = safeItems.length ? mod(activeIndex, safeItems.length) : 0;
  const isPaused = isHoverPaused || isInteractionPaused;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (!isUserAnnouncing) return;

    const timer = window.setTimeout(() => {
      setIsUserAnnouncing(false);
    }, 1400);

    return () => window.clearTimeout(timer);
  }, [isUserAnnouncing]);

  useEffect(() => {
    if (safeItems.length <= 1 || isPaused || prefersReducedMotion) return;

    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % safeItems.length);
      setIsUserAnnouncing(false);
    }, AUTO_PLAY_MS);

    return () => window.clearInterval(interval);
  }, [safeItems.length, isPaused, prefersReducedMotion]);

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    setIsUserAnnouncing(true);
  };

  const handleIconError = (id: string) => {
    setIconSrcById((prev) => {
      if (prev[id] === fallbackIconSrc) return prev;
      return { ...prev, [id]: fallbackIconSrc };
    });
  };

  const positionedItems = useMemo(() => {
    const total = safeItems.length;
    const visibleSlots: SlotKey[] = ["active", "topLeft", "topCenter", "topRight"];

    if (total <= 4) {
      return safeItems.map((item, index) => {
        const rel = mod(index - normalizedActiveIndex, total);

        let slotKey: SlotKey = "topRight";

        // SENTIDO HORARIO REAL:
        // active -> topLeft -> topCenter -> topRight -> active
        if (rel === 0) slotKey = "active";
        else if (rel === total - 1) slotKey = "topLeft";
        else if (rel === total - 2) slotKey = "topCenter";
        else if (rel === total - 3) slotKey = "topRight";

        return {
          index,
          item,
          slot: SLOT_STYLES[slotKey],
          isActive: rel === 0,
        };
      });
    }

    return visibleSlots.map((slotKey, step) => {
      const index = mod(normalizedActiveIndex - step, total);
      const item = safeItems[index];

      return {
        index,
        item,
        slot: SLOT_STYLES[slotKey],
        isActive: step === 0,
      };
    });
  }, [safeItems, normalizedActiveIndex]);

  const activeItem = safeItems[normalizedActiveIndex];

  if (!safeItems.length) return null;

  return (
    <div
      className="relative z-10 w-full [--orbit-size:120px] [--active-size:154px] [--orbit-offset-x:94px] [--active-top:66%] [--orbit-top:44%] [--orbit-center-top:22%] sm:[--orbit-size:clamp(150px,19vw,250px)] sm:[--active-size:clamp(190px,24vw,330px)] sm:[--orbit-offset-x:15vw] sm:[--active-top:65%] sm:[--orbit-top:41%] sm:[--orbit-center-top:14%] md:[--orbit-center-top:17%] lg:[--orbit-center-top:11%] lg:[--orbit-size:clamp(190px,16vw,260px)] lg:[--active-size:clamp(250px,22vw,360px)] 2xl:[--orbit-size:260px] 2xl:[--active-size:360px] 2xl:[--orbit-offset-x:205px] 2xl:[--active-top:64%] 2xl:[--orbit-top:37%] 2xl:[--orbit-center-top:1%]"
      onMouseEnter={() => setIsHoverPaused(true)}
      onMouseLeave={() => setIsHoverPaused(false)}
      onFocusCapture={() => setIsInteractionPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsInteractionPaused(false);
        }
      }}
      onTouchStart={() => setIsInteractionPaused(true)}
      onTouchEnd={() => setIsInteractionPaused(false)}
      onTouchCancel={() => setIsInteractionPaused(false)}
    >
      <div className="mx-auto flex w-full max-w-[720px] flex-col">
        <div className="relative h-[350px] sm:h-[470px] lg:h-[560px]">
          {positionedItems.map(({ index, item, slot, isActive }) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelect(index)}
              className={`absolute transition-[left,top,width,height,opacity,transform] ease-in-out ${
                prefersReducedMotion ? "duration-0" : "duration-[900ms]"
              }`}
              style={{
                left: slot.left,
                top: slot.top,
                width: slot.width,
                height: slot.height,
                opacity: slot.opacity,
                zIndex: slot.zIndex,
                transform: `translate(-50%, -50%) scale(${slot.scale})`,
              }}
              aria-label={`Ver ${item.title}`}
              aria-pressed={isActive}
            >
              <div
                className={[
                  "relative flex h-full w-full items-center justify-center rounded-full bg-white",
                  "border border-black/10",
                  "shadow-[0_12px_24px_rgba(0,0,0,0.16)]",
                  slot.ring ? "ring-2 ring-cp-red/35" : "",
                ].join(" ")}
              >
                <div className="relative w-full h-full flex items-center justify-center rounded-full">
                  <Image
                    src={iconSrcById[item.id] || item.iconSrc || fallbackIconSrc}
                    alt={item.title}
                    fill
                    className="object-contain scale-[0.5] transition-transform duration-300"
                    sizes="(min-width: 768px) 246px, (min-width: 640px) 220px, 160px"
                    onError={() => handleIconError(item.id)}
                  />
                </div>
              </div>
            </button>
          ))}
        </div>

        <div
          className="mt-[clamp(4px,1vw,14px)] flex min-h-[clamp(128px,16vw,220px)] flex-col justify-start text-center"
          aria-live={isUserAnnouncing ? "polite" : "off"}
          key={activeItem.id}
        >
          <h2 
            className="font-amx-black text-[clamp(34px,4.8vw,68px)] uppercase leading-[0.87] tracking-[-0.03em] text-cp-red transition-all duration-[320ms] ease-out"
            dangerouslySetInnerHTML={{ __html: activeItem.title }}
          />

          <p className="mx-auto mt-[clamp(8px,1.2vw,18px)] max-w-[28ch] text-center font-amx-medium text-[clamp(20px,2.6vw,38px)] leading-[1.18] tracking-normal text-cp-description transition-all duration-[320ms] ease-out">
            {activeItem.description}
          </p>
        </div>
      </div>
    </div>
  );
}
