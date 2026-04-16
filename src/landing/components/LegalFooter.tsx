"use client";

import { useScrollReveal } from "@/landing/components/_hooks/useScrollReveal";
import type { LegalFooterContent } from "@/landing/types/landing.types";

type LegalFooterProps = {
  content: LegalFooterContent;
};

export function LegalFooter({ content }: LegalFooterProps) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const splitIndex = Math.ceil(content.links.length / 2);
  const columns = [content.links.slice(0, splitIndex), content.links.slice(splitIndex)];

  return (
    <footer
      ref={ref}
      className={`bg-[#303030] px-5 pb-[clamp(24px,3vw,46px)] pt-[clamp(28px,4vw,72px)] text-white transition-all duration-[280ms] ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="mx-auto max-w-[1120px]">
        <div className="grid gap-8 sm:grid-cols-2 sm:gap-[clamp(80px,18vw,360px)]">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-[clamp(6px,0.8vw,12px)]">
              {column.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="font-amx-medium text-[clamp(12px,1.1vw,18px)] uppercase leading-[1.15] tracking-[0.13em] text-white/80 transition-colors duration-[160ms] ease-out hover:text-white"
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-[clamp(28px,4vw,64px)] space-y-3 font-myriad text-[clamp(8px,0.7vw,11px)] uppercase leading-[1.4] tracking-[0.05em] text-white/55">
          <p>CLARO PAY SE LIMITA A OFRECER SERVICIOS DE PAGO Y NO SE ENCUENTRA AUTORIZADO A OPERAR COMO ENTIDAD FINANCIERA POR EL BCRA.</p>
          <p>{content.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
