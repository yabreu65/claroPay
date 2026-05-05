"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import type { ServicesCarouselItem } from "@/landing/types/landing.types";

type ServicesRadialCarouselProps = {
  items: ServicesCarouselItem[];
  fallbackIconSrc: string;
};

// ── Timing constants ──────────────────────────────────────────────
const IDLE_DURATION_MS = 2600;
const FADE_DURATION_MS = 400;
const CYCLE_DURATION_MS = IDLE_DURATION_MS + FADE_DURATION_MS + FADE_DURATION_MS + 200; // 3600

const mod = (n: number, m: number) => ((n % m) + m) % m;

// ── Slot styles for the radial orbit ──────────────────────────────
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

// ── Text transition state ─────────────────────────────────────────
type TextState = "idle" | "fadeOut" | "swap" | "fadeIn";

export function ServicesRadialCarousel({
  items,
  fallbackIconSrc,
}: ServicesRadialCarouselProps) {
  const safeItems = items.slice(0, 4);
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayedTextIndex, setDisplayedTextIndex] = useState(0);
  const [textState, setTextState] = useState<TextState>("idle");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isHoverPaused, setIsHoverPaused] = useState(false);
  const [isInteractionPaused, setIsInteractionPaused] = useState(false);
  const [isUserAnnouncing, setIsUserAnnouncing] = useState(false);
  const [iconSrcById, setIconSrcById] = useState<Record<string, string>>({});

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const normalizedActiveIndex = safeItems.length
    ? mod(activeIndex, safeItems.length)
    : 0;
  const normalizedDisplayedTextIndex = safeItems.length
    ? mod(displayedTextIndex, safeItems.length)
    : 0;
  const isPaused = isHoverPaused || isInteractionPaused;

  // ── Helpers to clear timers ─────────────────────────────────────
  const clearAllTimers = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  // ── Text animation sequence ─────────────────────────────────────
  const runTextSequence = useCallback(
    (nextActiveIndex: number) => {
      if (prefersReducedMotion) {
        setActiveIndex(nextActiveIndex);
        setDisplayedTextIndex(nextActiveIndex);
        setTextState("idle");
        return;
      }

      // Phase 1: fade out (starts at ~2600ms of cycle)
      setTextState("fadeOut");

      // Phase 2: rotate image at 3000ms
      const rotateTimer = setTimeout(() => {
        setActiveIndex(nextActiveIndex);
      }, FADE_DURATION_MS);

      // Phase 3: swap text content + prepare for fade-in
      const swapTimer = setTimeout(() => {
        setDisplayedTextIndex(nextActiveIndex);
        setTextState("swap");

        // Force reflow then fade in
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setTextState("fadeIn");
          });
        });
      }, FADE_DURATION_MS + 50);

      // Phase 4: back to idle
      const idleTimer = setTimeout(() => {
        setTextState("idle");
      }, FADE_DURATION_MS * 2 + 100);

      timersRef.current.push(rotateTimer, swapTimer, idleTimer);
    },
    [prefersReducedMotion]
  );

  // ── Autoplay ────────────────────────────────────────────────────
  const startAutoplay = useCallback(() => {
    if (safeItems.length <= 1 || isPaused || prefersReducedMotion) return;

    clearAllTimers();

    let currentIndex = normalizedActiveIndex;

    // First cycle: wait full idle period then sequence
    const firstDelay = IDLE_DURATION_MS;

    const firstTimer = setTimeout(() => {
      currentIndex = (currentIndex + 1) % safeItems.length;
      runTextSequence(currentIndex);
    }, firstDelay);

    timersRef.current.push(firstTimer);

    // Subsequent cycles
    intervalRef.current = setInterval(() => {
      currentIndex = (currentIndex + 1) % safeItems.length;
      runTextSequence(currentIndex);
    }, CYCLE_DURATION_MS);
  }, [
    safeItems.length,
    isPaused,
    prefersReducedMotion,
    normalizedActiveIndex,
    clearAllTimers,
    runTextSequence,
  ]);

  useEffect(() => {
    startAutoplay();
    return clearAllTimers;
  }, [startAutoplay, clearAllTimers]);

  // ── Reduced motion detection ────────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  // ── Screen reader announcement ──────────────────────────────────
  useEffect(() => {
    if (!isUserAnnouncing) return;
    const timer = setTimeout(() => setIsUserAnnouncing(false), 1400);
    return () => clearTimeout(timer);
  }, [isUserAnnouncing]);

  // ── Interaction handlers ────────────────────────────────────────
  const handleSelect = useCallback(
    (index: number) => {
      if (index === normalizedActiveIndex) return;

      clearAllTimers();
      setIsUserAnnouncing(true);
      runTextSequence(index);

      // Restart autoplay after full cycle
      if (!prefersReducedMotion && safeItems.length > 1) {
        const restartTimer = setTimeout(() => {
          startAutoplay();
        }, CYCLE_DURATION_MS + 200);
        timersRef.current.push(restartTimer);
      }
    },
    [
      normalizedActiveIndex,
      clearAllTimers,
      runTextSequence,
      prefersReducedMotion,
      safeItems.length,
      startAutoplay,
    ]
  );

  const handleIconError = (id: string) => {
    setIconSrcById((prev) => {
      if (prev[id] === fallbackIconSrc) return prev;
      return { ...prev, [id]: fallbackIconSrc };
    });
  };

  // ── Positioned items for the radial layout ──────────────────────
  const positionedItems = useMemo(() => {
    const total = safeItems.length;
    const visibleSlots: SlotKey[] = [
      "active",
      "topLeft",
      "topCenter",
      "topRight",
    ];

    if (total <= 4) {
      return safeItems.map((item, index) => {
        const rel = mod(index - normalizedActiveIndex, total);
        let slotKey: SlotKey = "topRight";
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
      return {
        index,
        item: safeItems[index],
        slot: SLOT_STYLES[slotKey],
        isActive: step === 0,
      };
    });
  }, [safeItems, normalizedActiveIndex]);

  const activeItem = safeItems[normalizedDisplayedTextIndex];

  if (!safeItems.length) return null;

  // ── Text transition classes ─────────────────────────────────────
  const textBaseClass =
    "transition-all duration-[400ms] ease-out";
  const textVisibleClass = "opacity-100 translate-y-0";
  const textHiddenClass = "opacity-0";
  const textExitY = "-translate-y-2";
  const textEnterY = "translate-y-2";

  const textTransitionClasses =
    textState === "idle" || textState === "fadeIn"
      ? `${textBaseClass} ${textVisibleClass}`
      : textState === "fadeOut"
        ? `${textBaseClass} ${textHiddenClass} ${textExitY}`
        : textState === "swap"
          ? `${textHiddenClass} ${textEnterY} !transition-none`
          : `${textBaseClass} ${textVisibleClass}`;

  return (
    <div
      className="relative z-10 w-full mt-10 sm:mt-20 lg:mt-10 xl:mt-12 2xl:mt-20 [--orbit-size:32vw] [--active-size:40vw] [--orbit-offset-x:25vw] sm:[--orbit-size:27vw] sm:[--active-size:35vw] sm:[--orbit-offset-x:20vw] md:[--orbit-size:25vw] md:[--active-size:30vw] lg:[--orbit-size:20vw] lg:[--active-size:25vw] lg:[--orbit-offset-x:15vw] xl:[--orbit-size:15vw] xl:[--active-size:20vw] xl:[--orbit-offset-x:11vw] 2xl:[--orbit-size:12vw] 2xl:[--active-size:15vw] 2xl:[--orbit-offset-x:8vw] [--active-top:66%] [--orbit-top:44%] [--orbit-center-top:22%] sm:[--orbit-center-top:20%]"
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
        {/* Orbit stage */}
        <div className="relative h-[350px] sm:h-[470px] lg:h-[560px]">
          {positionedItems.map(({ index, item, slot, isActive }) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelect(index)}
              className="absolute transition-[left,top,width,height,opacity,transform] ease-in-out"
              style={{
                left: slot.left,
                top: slot.top,
                width: slot.width,
                height: slot.height,
                opacity: slot.opacity,
                zIndex: slot.zIndex,
                transitionDuration: prefersReducedMotion
                  ? "0ms"
                  : `${FADE_DURATION_MS}ms`,
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
                    src={
                      iconSrcById[item.id] || item.iconSrc || fallbackIconSrc
                    }
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

        {/* Text with smooth transitions */}
        <div
          className="mt-[clamp(4px,1vw,14px)] flex min-h-[clamp(128px,16vw,220px)] flex-col justify-start text-center"
          aria-live={isUserAnnouncing ? "polite" : "off"}
        >
          <h2
            className={`font-amx-black text-[clamp(34px,4.8vw,68px)] uppercase leading-[0.87] tracking-[-0.03em] text-cp-red ${textTransitionClasses}`}
            dangerouslySetInnerHTML={{ __html: activeItem.title }}
          />

          <p
            className={`mx-auto mt-[clamp(8px,1.2vw,18px)] max-w-[28ch] text-center font-amx-medium text-[clamp(20px,2.6vw,38px)] leading-[1.18] tracking-normal text-cp-description ${textTransitionClasses}`}
          >
            {activeItem.description}
          </p>
        </div>
      </div>
    </div>
  );
}
