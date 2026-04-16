import type { LandingContent } from "@/landing/types/landing.types";

export const landingContent: LandingContent = {
  topBar: {
    items: [
      { label: "FAQS", href: "#" },
      { label: "BOTÓN DE BAJA", href: "#" },
      { label: "BOTÓN DE ARREPENTIMIENTO", href: "#" },
      { label: "PORTAL DE DENUNCIAS", href: "#" },
    ],
  },
  hero: {
    title: "TU PLATA CONECTADA",
    subtitle: "La app para pagar, transferir y organizar tu plata todos los días.",
  },
  intro: {
    description:
      "Claro Pay es la billetera virtual que te conecta con los mejores beneficios para vos y tu celu.",
    highlight: "¡Bajate la App y empezá a disfrutar ya!",
  },
  cashback: {
    id: "farmacias",
    kickerStart: "con",
    kickerEnd: "tenés",
    title: "Farmacias",
    badge: "25% OFF",
    description: "Tope mensual de reintegro en compras presenciales y online.",
    carouselItems: [
      {
        id: "farmacias",
        percentage: "50%",
        label: "CA$HBACK",
        subtitleLine1: "EN RECARGAS",
      },
      {
        id: "supermercados",
        percentage: "10%",
        label: "CA$HBACK",
        subtitleLine1: "EN TUS COMPRAS EN",
        subtitleAccent: "TIENDA ONLINE",
        showWordmark: false,
      },
      {
        id: "combustible",
        percentage: "15%",
        label: "CA$HBACK",
        subtitleLine1: "EN EL PAGO DE TU FACTURA",
      },
    ],
  },
  services: {
    title: "PAGÁ TUS SERVICIOS",
    description: "Agendalos para no olvidarte nunca de pagar",
    backgroundIcons: ["Luz", "Gas", "Agua", "Internet"],
    carouselItems: [
      {
        id: "services-paga",
        title: "PAGÁ TUS<br/>SERVICIOS",
        description: "Fácil y rápido. Agendalos para no olvidarte nunca de pagar",
        iconSrc: "/landing/svg/paga.svg",
      },
      {
        id: "services-envia",
        title: "ENVIÁ<br/>DINERO",
        description: "Fácil y rápido desde donde estés",
        iconSrc: "/landing/svg/envia.svg",
      },
      {
        id: "services-inverti",
        title: "INVERTÍ<br/>TU DINERO",
        description: "Genera rendimientos y podés hacer que tu plata crezca",
        iconSrc: "/landing/svg/inverti.svg",
      },
      {
        id: "services-recarga",
        title: "RECARGÁ<br/>LA SUBE",
        description: "Cada vez que necesites",
        iconSrc: "/landing/svg/recarga.svg",
      },
    ],
  },
  openAccount: {
    title: "ABRÍ TU CUENTA GRATUITA",
    steps: [
      "Descargá la app",
      "Validá tu identidad",
      "Completá tus datos",
      "Comenzá a usarla",
    ],
  },
  finalCTA: {
    title: "DESCARGÁ CLARO PAY",
    description: "Conectá tu plata con todo.",
    headlineHtml: "DESCARGÁ CLARO PAY <br /> Y CONECTÁ TU PLATA <br /> CON TODO",
  },
  brandFooter: {
    disclaimer: "TODOS LOS DERECHOS RESERVADOS. CLARO 2024",
  },
  legalFooter: {
    links: [
      "FAQS",
      "LEGAL Y REGULATORIO",
      "AYUDA ATENCION@CLAROPAY.COM.AR",
      "POLÍTICAS DE PRIVACIDAD",
      "DEFENSA DE LAS Y LOS CONSUMIDORES: PARA RECLAMOS INGRESE AQUÍ",
      "CONTRATOS DE ADHESIÓN",
      "LEY N° 24.240 DE DEFENSA DEL CONSUMIDOR.",
      "BOTÓN DE BAJA",
      "BOTÓN DE ARREPENTIMIENTO",
      "INFORMACIÓN AL USUARIO FINANCIERO",
      "CONSEJOS DE SEGURIDAD",
    ],
    copyright:
      "LOS FONDOS DEPOSITADOS EN CUENTAS DE PAGO NO SE CONSTITUYEN DEPÓSITOS EN UNA ENTIDAD FINANCIERA, NI CUENTAN CON NINGUNA DE LAS GARANTÍAS QUE TALES DEPÓSITOS PUEDAN GOZAR DE ACUERDO CON LA LEGISLACIÓN Y REGLAMENTACIÓN APLICABLES EN MATERIA DE DEPÓSITOS EN ENTIDADES FINANCIERAS.",
  },
};
