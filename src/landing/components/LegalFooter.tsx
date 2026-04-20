import type { LegalFooterContent } from "@/landing/types/landing.types";

type LegalFooterProps = {
  content: LegalFooterContent;
};

export function LegalFooter({ content }: LegalFooterProps) {
  const consumerDefenseLinkIndex = content.links.findIndex((link) => link.includes("INGRESE AQUÍ"));
  const splitIndex =
    consumerDefenseLinkIndex >= 0 ? consumerDefenseLinkIndex + 1 : Math.ceil(content.links.length / 2);
  const columns = [content.links.slice(0, splitIndex), content.links.slice(splitIndex)];

  return (
    <footer className="w-full overflow-hidden bg-[#3c3c3b] px-5 pb-[clamp(24px,3vw,46px)] pt-[clamp(28px,4vw,72px)] text-white">
      <div className="w-full flex flex-col items-center justify-center sm:mx-auto sm:w-full ">
        <div className="max-sm:max-w-[250px] sm:max-w-[950px] mx-auto grid  gap-8 sm:grid-cols-2 sm:gap-[clamp(80px,18vw,180px)]">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex min-w-0 flex-col gap-[clamp(6px,0.8vw,12px)]">
              {column.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="block w-full max-w-full min-w-0 whitespace-normal break-all font-amx-medium text-[clamp(12px,1.1vw,14px)] uppercase leading-[1.15] tracking-[0.08em] text-white/80 transition-colors duration-[160ms] ease-out [overflow-wrap:anywhere] hover:text-white sm:break-words sm:tracking-[0.13em]"
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className=" max-w-[1100px] mt-[clamp(22px,3vw,44px)] w-full min-w-0 space-y-3 font-myriad text-[clamp(5px,1.5vw,12px)] uppercase leading-[1.45] tracking-[0.03em] text-white/70 sm:tracking-[0.05em]">
          {content.disclaimers.map((disclaimer) => (
            <p key={disclaimer} className="w-full max-w-full">
              {disclaimer}
            </p>
          ))}
        </div>
      </div>
    </footer>
  );
}
