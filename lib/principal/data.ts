/** Textos, imágenes y destinos editables de la página principal. */
export const homeCopy = {
  headline: "Ingeniería que eleva tu operación.",
  introduction:
    "Flytek Innovations S. de R. L. de C.V. es la empresa dedicada al diseño, integración y comercialización de vehículos aéreos no tripulados de grado industrial también conocidos como drones.",
  company:
    "Somos una empresa mexicana que ofrece drones de grado industrial para vigilancia, inspección, seguridad perimetral, tareas de búsqueda y rescate entre muchas más, estas tareas se llevan a cabo de manera óptima debido a las configuraciones, programación y payloads (cargas útiles) que podemos instalar en los drones.",
  email: "info@flytek.com.mx",
  phone: "+52 56 5440 7312",
};
// Solo FÉNIX está disponible. Activa href e image cuando cada página sea reestructurada.
export const platforms: readonly { id: string; name: string; title: string; description: string; image: string | null; href: string | null; available: boolean; features: readonly string[] }[] = [
  {
    id: "fenix",
    name: "FÉNIX",
    title: "Magno en todo sentido.",
    description:
      "El drone para la industria",
    image: "/fenix/media/fenix.webp",
    href: "/fenix",
    available: true,
    features: ["Diseño industrial", "Cargas útiles", "Uso en interiores"],
  },
  {
    id: "orion",
    name: "ORION MX",
    title: "El drone para la inspección.",
    description:
      "Trabajo Inteligente en espacio compacto.",
    image: "/orion-mx/orion-hero.webp",
    href: "/orion-mx",
    available: true,
    features: ["Formato compacto", "Inspección", "Flexible"],
  },
  {
    id: "vega",
    name: "VEGA",
    title: "El drone que necesitas.",
    description:
      "Versátil y robusto para el trabajo.",
    image: "/vega/images/vega-estudio.png",
    href: "/vega",
    available: true,
    features: ["Estructura plegable", "Delivery", "Uso en exteriores"],
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
