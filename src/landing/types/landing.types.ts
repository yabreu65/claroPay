export type StoreLink = {
  id: string;
  label: string;
  helper: string;
  href: string;
  badgeSrc?: string;
};

export type TopBarContent = {
  items: {
    label: string;
    href: string;
  }[];
};

export type HeroContent = {
  title: string;
  subtitle: string;
};

export type IntroContent = {
  description: string;
  highlight: string;
};

export type CashbackSlide = {
  id: string;
  kickerStart: string;
  kickerEnd: string;
  title: string;
  badge: string;
  description: string;
  carouselItems: CashbackCarouselItem[];
};

export type CashbackCarouselItem = {
  id: string;
  percentage: string;
  label: string;
  subtitleLine1: string;
  subtitleAccent?: string;
  showWordmark?: boolean;
};

export type ServicesContent = {
  title: string;
  description: string;
  backgroundIcons: string[];
  carouselItems: ServicesCarouselItem[];
};

export type ServicesCarouselItem = {
  id: string;
  title: string;
  description: string;
  iconSrc: string;
};

export type OpenAccountContent = {
  title: string;
  steps: string[];
};

export type FinalCTAContent = {
  title: string;
  description: string;
  headlineHtml: string;
};

export type BrandFooterContent = {
  disclaimer: string;
};

export type LegalFooterContent = {
  links: string[];
  copyright: string;
};

export type LandingContent = {
  topBar: TopBarContent;
  hero: HeroContent;
  intro: IntroContent;
  cashback: CashbackSlide;
  services: ServicesContent;
  openAccount: OpenAccountContent;
  finalCTA: FinalCTAContent;
  brandFooter: BrandFooterContent;
  legalFooter: LegalFooterContent;
};
