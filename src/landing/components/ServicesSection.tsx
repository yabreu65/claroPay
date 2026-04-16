import { ServicesRadialCarousel } from "@/landing/components/ServicesRadialCarousel";
import type { ServicesContent } from "@/landing/types/landing.types";

type ServicesSectionProps = {
  content: ServicesContent;
  servicesIconSrc: string;
};

export function ServicesSection({
  content,
  servicesIconSrc,
}: ServicesSectionProps) {
  return (
    <section className="px-5 pb-[clamp(78px,12vw,230px)]">
      <ServicesRadialCarousel
        items={content.carouselItems}
        fallbackIconSrc={servicesIconSrc}
      />
    </section>
  );
}
