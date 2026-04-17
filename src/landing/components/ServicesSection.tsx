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
    <section className="px-5 pb-12">
      <ServicesRadialCarousel
        items={content.carouselItems}
        fallbackIconSrc={servicesIconSrc}
      />
    </section>
  );
}
