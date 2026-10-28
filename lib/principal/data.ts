/** Textos, imágenes y destinos editables de la página principal. */
export const homeCopy = {
  headline: "Ingeniería que eleva tu operación.",
  introduction:
    "Flytek Innovations S. de R. L. de C.V. es la empresa dedicada al diseño, integración y comercialización de vehículos aéreos no tripulados de grado industrial también conocidos como drones.",
  company:
    "Somos la empresa mexicana que ofrece drones de grado industrial para vigilancia, inspección, seguridad perimetral, tareas de búsqueda y rescate entre muchas más, estas tareas se llevan a cabo de manera óptima debido a las configuraciones, programación y payloads (cargas útiles) que podemos instalar en los drones.",
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
    name: "ORION ",
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
    image: "/vega/images/vega-portada-cutout.webp",
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
    position: "center",
    alt: "Vista térmica para observación del entorno",
    tag: "SEGURIDAD",
    detailTitle: "Información aérea para proteger tu operación.",
    detailText:
      "Integra cámaras térmicas, zoom e iluminación para observar áreas amplias, perímetros y puntos de difícil acceso.",
    capabilities: [
      "Vigilancia Perimetral",
      "Observación térmica",
      "Busqueda y Rescate",
      "Patrullaje",
    ],
  },
  {
    slug: "inspeccion",
    name: "Inspección",
    title: "Acércate a los detalles que importan.",
    description:
      "Realiza inspecciones eficientes, detalladas y precisas, sin exponer a tu equipo técnico a riesgos no necesarios a zonas de acceso complicado.",
    image: "/fenix/media/inspection.webp",
    position: "center",
    alt: "Infraestructura para operaciones de inspección",
    tag: "INFRAESTRUCTURA",
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
      "Optimiza la logística y genera mapas ortomosaicos y nubes de puntos con precisión centimétrica en menos tiempo. Captura, procesa y analiza los datos de tu obra.",
    image: "/home/sectors/12.jpg",
    position: "0% 40%",
    alt: "Entorno de construcción visto desde el aire",
    tag: "OBRA ",
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

export const sectorDetails = [
  {
    slug: "seguridad",
    name: "Seguridad",
    title:
      "Actúa rápido y eficientemente ante cualquier situación con video y supervisión en tiempo real.",
    summary:
      "Ya sea seguridad perimetral, detectar una intrusión o realizar vigilancia, los drones Flytek pueden integrar cámaras térmicas, infrarrojas, megáfonos y sistemas de disuasión.",
    capabilityImage: "/home/sectors/8.jpg",
    capabilityAlt: "Complejo industrial operando al anochecer",
    capabilityPosition: "center",
    proofs: [
      {
        title: "Resistencia",
        text: "La estructura del drone está diseñada y manufacturada con materiales de grado aeroespacial, además de ser analizada y simulada bajo esfuerzos y cargas que aseguran el mejor rendimiento.",
      },
      {
        title: "Electrónica",
        text: "La electrónica ha sido diseñada para ofrecer seguridad y fiabilidad. Los sistemas con redundancia respaldan el vuelo ante distintas condiciones medioambientales.",
      },
      {
        title: "Transmisión",
        text: "Realiza vigilancia perimetral y rondas sin arriesgar a tu personal. Integra cámaras térmicas, infrarrojas, megáfonos y sistemas de disuasión según el sector y la autoridad.",
      },
    ],
    applicationIntro:
      "Observación, respuesta y documentación aérea para distintos escenarios de seguridad.",
    applications: [
      {
        title: "Patrullaje",
        text: "Amplía la cobertura de vigilancia, recorre perímetros y documenta eventos desde una perspectiva aérea.",
        image: "/home/sectors/10.jpg",
      },
      {
        title: "Observa de noche",
        text: "Mantén visibilidad en condiciones de baja iluminación mediante cámaras térmicas e infrarrojas.",
        image: "/home/sectors/security-night.jpg",
      },
      {
        title: "Recreación de escenas",
        text: "Registra el entorno desde el aire para apoyar la documentación y el análisis de una escena.",
        image: "/home/sectors/2.jpg",
      },
      {
        title: "Búsqueda y rescate",
        text: "Localiza vidas en situación de riesgo, incluso en ambientes de humo denso o con flora abundante.",
        image: "/home/sectors/security-rescue.jpg",
      },
    ],
    drones: [
      {
        context: "Para vigilancia profesional",
        name: "FÉNIX",
        href: "/fenix",
        text: "Con su gran tamaño y potencia, es una herramienta profesional para trabajo preciso, confiable y seguro.",
        image: "/home/sectors/fenix.jpg",
        specs: [
          ["Configuración", "Hexacóptero"],
          ["Cámara", "Infrarroja / térmica"],
          ["Accesorio", "Estación de control de alto impacto"],
        ],
      },
    ],
  },
  {
    slug: "inspeccion",
    name: "Inspección",
    title: "Datos precisos con un proceso eficiente aplicado a su infraestructura.",
    summary:
      "Realiza inspecciones eficientes, detalladas y precisas sin exponer a las personas a riesgos innecesarios en zonas de acceso complicado.",
    capabilityImage: "/home/sectors/6.jpg",
    capabilityAlt: "Vista amplia del interior de una planta industrial",
    capabilityPosition: "center",
    proofs: [
      { title: "Eficiencia", text: "Reduce los tiempos de inspección hasta en un 70%." },
      {
        title: "Imprescindible",
        text: "Analiza todos los puntos críticos de interés e inspecciona lugares de difícil acceso.",
      },
      {
        title: "Conveniente",
        text: "Mantén a tus colaboradores en un área segura mientras el drone realiza la inspección.",
      },
    ],
    applicationIntro:
      "Inspecciones visuales y térmicas para conocer el estado real de distintos activos.",
    applications: [
      {
        title: "Infraestructura en general",
        text: "Llega más rápido y observa a detalle el desgaste de cualquier estructura de interés.",
        image: "/home/sectors/7.jpg",
      },
      {
        title: "Antenas de telecomunicaciones",
        text: "Analiza la estructura y detecta anomalías, desgaste o fallas en menos tiempo mediante datos y vistas reales.",
        image: "/home/sectors/1.jpg",
      },
      {
        title: "Infraestructura interior",
        text: "Revisa testigos en estructuras de plantas o maquinaria ubicada en el interior de tu sector.",
        image: "/home/sectors/3.jpg",
      },
      {
        title: "Energía solar y eólica",
        text: "Inspecciona campos fotovoltaicos y detecta desgaste en paletas eólicas mediante cámaras térmicas o zoom óptico.",
        image: "/home/sectors/17.jpg",
      },
    ],
    drones: [
      {
        context: "Para interiores",
        name: "ORION",
        href: "/orion-mx",
        text: "Compacto, potente e inteligente: un equipo para inspecciones minuciosas en interiores y exteriores.",
        image: "/home/sectors/orion.jpg",
        specs: [
          ["Configuración", "Cuadricóptero"],
          ["Cámara", "Térmica"],
          ["Accesorio", "Evasión de obstáculos"],
        ],
      },
      {
        context: "Para interiores y exteriores",
        name: "VEGA",
        href: "/vega",
        text: "Versátil y robusto para operaciones simples o complejas que requieren resultados precisos.",
        image: "/home/sectors/vega.jpg",
        specs: [
          ["Configuración", "Cuadricóptero"],
          ["Cámara", "Térmica"],
          ["Accesorio", "Evasión de obstáculos"],
        ],
      },
    ],
  },
  {
    slug: "construccion",
    name: "Construcción",
    title: "Mapea con precisión y hasta en 70% menos tiempo.",
    summary:
      "Optimiza la logística y genera ortomosaicos y nubes de puntos con precisión centimétrica en menos tiempo. Captura, procesa y analiza los datos de tu obra.",
    capabilityImage: "/home/sectors/12.jpg",
    capabilityAlt: "Supervisión profesional de una obra en construcción",
    capabilityPosition: "left center",
    proofs: [
      {
        title: "Resistencia",
        text: "La estructura del drone está diseñada y manufacturada con materiales de grado aeroespacial, además de ser analizada y simulada bajo esfuerzos y cargas.",
      },
      {
        title: "Electrónica",
        text: "La electrónica ha sido diseñada para ser segura y fiable; los sistemas con redundancia respaldan el vuelo ante distintas condiciones medioambientales.",
      },
      {
        title: "Exacto",
        text: "Con RTK obtén precisión centimétrica en tus levantamientos o apóyate en puntos de control mediante un sistema de estación total.",
      },
    ],
    applicationIntro:
      "Información visual y espacial para planear, medir y comunicar el avance de una obra.",
    applications: [
      {
        title: "Seguimiento de obra",
        text: "Mejora la logística y entrega reportes de avance en tiempo. Detecta atrasos o fallas de coordinación en una etapa temprana.",
        image: "/home/sectors/11.jpg",
      },
      {
        title: "Fotogrametría con drones Flytek",
        text: "Mapea en menos tiempo, obtén datos con precisión centimétrica y reduce el riesgo para tu personal mediante captura aérea.",
        image: "/home/sectors/18.jpg",
      },
    ],
    drones: [
      {
        context: "Para extensiones mayores a 150 Ha",
        name: "FÉNIX",
        href: "/fenix",
        text: "Con su gran tamaño y potencia, es una herramienta profesional para trabajo preciso, confiable y seguro.",
        image: "/home/sectors/fenix.jpg",
        specs: [
          ["Configuración", "Hexa o cuadricóptero"],
          ["Cámara", "Mapeo en alta resolución"],
          ["Accesorio", "Geolocalización RTK"],
        ],
      },
      {
        context: "Para extensiones menores a 149 Ha",
        name: "VEGA",
        href: "/vega",
        text: "Versátil y robusto para operaciones simples o complejas que requieren resultados precisos.",
        image: "/home/sectors/vega.jpg",
        specs: [
          ["Configuración", "Hexa o cuadricóptero"],
          ["Cámara", "Mapeo en alta resolución"],
          ["Accesorio", "Geolocalización RTK"],
        ],
      },
    ],
  },
] as const;

export const sectorBenefits = [
  { label: "Reducción de costos", icon: "/home/sectors/icon-cost.svg" },
  { label: "Mejor logística", icon: "/home/sectors/icon-logistics.svg" },
  { label: "Menor tiempo de respuesta", icon: "/home/sectors/icon-time.svg" },
  { label: "Optimización de recursos", icon: "/home/sectors/icon-resources.svg" },
  { label: "Fiabilidad técnica", icon: "/home/sectors/icon-reliability.svg" },
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
