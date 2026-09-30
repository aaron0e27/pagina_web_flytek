/** Textos, imágenes y destinos editables de la página principal. */
export const homeCopy = {
  headline: "Ingeniería que eleva tu operación.",
  introduction:
    "Diseñamos e integramos drones industriales para convertir una nueva perspectiva en información útil para tu equipo.",
  company:
    "Somos Flytek Innovations. Una empresa mexicana dedicada al diseño, integración y comercialización de vehículos aéreos no tripulados de grado industrial.",
  email: "info@flytek.com.mx",
  phone: "+52 56 5440 7312",
};
// Solo FÉNIX está disponible. Activa href e image cuando cada página sea reestructurada.
export const platforms: readonly { id: string; name: string; title: string; description: string; image: string | null; href: string | null; available: boolean; features: readonly string[] }[] = [
  {
    id: "fenix",
    name: "FÉNIX",
    title: "Piensa en grande.\nVuela con FÉNIX.",
    description:
      "Explora su diseño, las posibilidades de integración y las cargas útiles para tu operación.",
    image: "/fenix/media/fenix.webp",
    href: "/fenix",
    available: true,
    features: ["Diseño industrial", "Cargas útiles", "Exploración 3D"],
  },
  {
    id: "orion",
    name: "ORION MX",
    title: "Otra perspectiva.\nIncluso en interiores.",
    description:
      "Una plataforma compacta para explorar espacios reducidos y acercarte a los detalles de tu inspección.",
    image: "/orion-mx/orion-hero.webp",
    href: "/orion-mx",
    available: true,
    features: ["Formato compacto", "Inspección", "Uso en interiores"],
  },
  {
    id: "vega",
    name: "VEGA",
    title: "Una plataforma.\nMás posibilidades.",
    description:
      "Diseño plegable y posibilidades de integración para acompañar operaciones en distintos entornos.",
    image: "/vega/images/vega-estudio.png",
    href: "/vega",
    available: true,
    features: ["Estructura plegable", "Sensores", "Interior y exterior"],
  },
] as const;
export const sectors = [
  {
    slug: "seguridad",
    name: "Seguridad",
    title: "Una visión más amplia del entorno.",
    description:
      "Apoya la vigilancia y la observación perimetral con una perspectiva aérea y cargas útiles adaptadas a tu operación.",
    image: "/fenix/media/thermal.webp",
    alt: "Vista térmica para observación del entorno",
    tag: "OBSERVACIÓN / VIGILANCIA",
    detailTitle: "Información aérea para proteger tu operación.",
    detailText:
      "Integra cámaras térmicas, zoom e iluminación para observar áreas amplias, perímetros y puntos de difícil acceso.",
    capabilities: [
      "Vigilancia perimetral",
      "Observación térmica",
      "Apoyo durante incidentes",
      "Transmisión de imagen",
    ],
  },
  {
    slug: "inspeccion",
    name: "Inspección",
    title: "Acércate a los detalles que importan.",
    description:
      "Observa infraestructura desde nuevos ángulos y reúne información visual para apoyar las decisiones de tu equipo técnico.",
    image: "/fenix/media/inspection.webp",
    alt: "Infraestructura para operaciones de inspección",
    tag: "INFRAESTRUCTURA / ANÁLISIS",
    detailTitle: "Inspecciona sin perder de vista el contexto.",
    detailText:
      "Obtén imágenes de estructuras, instalaciones y espacios reducidos mediante una plataforma configurada para cada entorno.",
    capabilities: [
      "Infraestructura industrial",
      "Instalaciones eléctricas",
      "Espacios reducidos",
      "Imagen térmica y zoom",
    ],
  },
  {
    slug: "construccion",
    name: "Construcción",
    title: "Tu proyecto, desde otra perspectiva.",
    description:
      "Documenta el entorno y el avance de obra con imágenes aéreas que ayuden a tu equipo a entender el terreno.",
    image: "/fenix/media/construction.webp",
    alt: "Entorno de construcción visto desde el aire",
    tag: "OBRA / SEGUIMIENTO",
    detailTitle: "Observa el avance completo de tu proyecto.",
    detailText:
      "Registra el terreno, las diferentes etapas de obra y el contexto general del proyecto desde una perspectiva aérea.",
    capabilities: [
      "Seguimiento de obra",
      "Registro visual",
      "Observación del terreno",
      "Documentación periódica",
    ],
  },
] as const;
export const support = [
  {
    title: "Integración a tu medida",
    text: "Partimos de tu operación para definir la plataforma y las cargas útiles que necesita tu equipo.",
  },
  {
    title: "Capacitación para operar",
    text: "Acompañamos a tu equipo en el conocimiento del sistema y su uso en el entorno de trabajo.",
  },
  {
    title: "Soporte en México",
    text: "Refacciones, mantenimiento y acompañamiento técnico nacional para dar continuidad a tu operación.",
  },
];
