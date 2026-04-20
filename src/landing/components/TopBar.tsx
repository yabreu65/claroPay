import Link from "next/link";
import type { TopBarContent } from "@/landing/types/landing.types";

type TopBarProps = {
  content: TopBarContent;
};

export function TopBar({ content }: TopBarProps) {
  return (
    <header className="pt-2 pb-1 md:pt-4 md:pb-2  2xl:pt-6 2xl:pb-3 Sw-full bg-[#231f20]">
      <nav
        aria-label="Enlaces rápidos"
        className="mx-auto flex h-full w-full items-center justify-center overflow-x-auto whitespace-nowrap px-3 text-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {content.items.map((item, index) =>
          item.href === "#" ? (
            <span
              key={`${item.label}-${index}`}
              className="inline-flex items-center font-amx-regular text-[clamp(6px,1.35vw,20px)] uppercase leading-none tracking-[0.08em] text-[#ffffff]"
            >
              {index > 0 ? (
                <span className="mx-[clamp(5px,1.2vw,18px)] text-white" aria-hidden="true">
                  |
                </span>
              ) : null}
              {item.label}
            </span>
          ) : (
            <Link
              key={`${item.label}-${index}`}
              href={item.href}
              className="inline-flex items-center font-amx-regular text-[clamp(8px,1.35vw,20px)] uppercase leading-none tracking-[0.08em] text-white"
            >
              {index > 0 ? (
                <span className="mx-[clamp(5px,1.2vw,18px)] text-white" aria-hidden="true">
                  |
                </span>
              ) : null}
              {item.label}
            </Link>
          ),
        )}
      </nav>
    </header>
  );
}
