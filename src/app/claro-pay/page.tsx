import Image from "next/image";
import {
  BrandFooter,
  CashbackSection,
  FinalCTASection,
  HeroSection,
  IntroSection,
  LegalFooter,
  OpenAccountSection,
  ServicesSection,
  TopBar,
} from "@/landing/components";
import { LANDING_ASSETS, STORE_LINKS, STORE_LINKS_FINAL_CTA } from "@/landing/constants/landing.constants";
import { landingContent } from "@/landing/data/landingContent";

export default function ClaroPayPage() {
  return (
    <div className="relative isolate overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <Image
          src={LANDING_ASSETS.backgroundBase}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <Image
          src={LANDING_ASSETS.backgroundOverlay}
          alt=""
          fill
          className="object-cover opacity-80"
          sizes="100vw"
          priority
        />
      </div>

      <div className="relative z-10">
        <TopBar content={landingContent.topBar} />

        <main>
          <HeroSection
            logoSrc={LANDING_ASSETS.heroLogo}
            bannerSrc={LANDING_ASSETS.heroBannerComplete}
          />

          <IntroSection content={landingContent.intro} stores={STORE_LINKS} />

          <CashbackSection
            content={landingContent.cashback}
            logoSrc={LANDING_ASSETS.logo}
            carouselItemFrameSrc={LANDING_ASSETS.carouselItemFrame}
          />

          <ServicesSection
            content={landingContent.services}
            servicesIconSrc={LANDING_ASSETS.servicesIcon}
          />

          <OpenAccountSection
            content={landingContent.openAccount}
            iconSrc={LANDING_ASSETS.openAccountIcon}
          />

          <FinalCTASection
            content={landingContent.finalCTA}
            stores={STORE_LINKS_FINAL_CTA}
            phoneMockupSrc={LANDING_ASSETS.ctaPhone}
          />
        </main>

        <BrandFooter content={landingContent.brandFooter} logoSrc={LANDING_ASSETS.brandLogo} />
        <LegalFooter content={landingContent.legalFooter} />
      </div>
    </div>
  );
}
