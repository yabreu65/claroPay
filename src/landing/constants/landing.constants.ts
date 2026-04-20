import type { StoreLink } from "@/landing/types/landing.types";

export const LANDING_ASSETS = {
  backgroundBase: "/landing/images/C.Pay _ Actualización Landing•fondo.jpg",
  backgroundOverlay: "/landing/svg/fondoBg-2.svg",
  heroLogo: "/landing/svg/logo.svg",
  heroBannerComplete: "/landing/images/hero-banner-completo.png",
  logo: "/landing/svg/logo.svg",
  brandLogo: "/landing/svg/claro-logo.svg",
  carouselItemFrame: "/landing/svg/carousel-items.svg",
  servicesIcon: "/landing/svg/logo.svg",
  openAccountIcon: "/landing/svg/logo.svg",
  ctaPhone: "/landing/svg/phone.svg",
} as const;

export const STORE_LINKS: StoreLink[] = [
  {
    id: "app-store",
    label: "App Store",
    helper: "Descargala en",
    href: "#app-store",
    badgeSrc: "/landing/svg/app-store.svg",
  },
  {
    id: "app-play",
    label: "Google Play",
    helper: "Conseguila en",
    href: "#app-play",
    badgeSrc: "/landing/svg/app-play.svg",
  },
  {
    id: "app-gallery",
    label: "AppGallery",
    helper: "Disponible en",
    href: "#app-gallery",
    badgeSrc: "/landing/svg/app-gallery.svg",
  },
];

export const STORE_LINKS_FINAL_CTA: StoreLink[] = [
  {
    id: "app-store-1",
    label: "App Store",
    helper: "Descargala en",
    href: "#app-store",
    badgeSrc: "/landing/svg/app-store-1.svg",
  },
  {
    id: "app-play-1",
    label: "Google Play",
    helper: "Conseguila en",
    href: "#app-play",
    badgeSrc: "/landing/svg/app-play-1.svg",
  },
  {
    id: "app-gallery-1",
    label: "AppGallery",
    helper: "Disponible en",
    href: "#app-gallery",
    badgeSrc: "/landing/svg/app-gallery-1.svg",
  },
];
