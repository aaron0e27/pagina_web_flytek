// Fuente: ficha técnica oficial "Flytek_Orion_Ficha_Tecnica.pdf". Edita aquí los textos de las secciones 01 y 05.
export const orionAssets = {
  hero: "/orion-mx/orion-hero.webp",
  top: "/orion-mx/orion-top.webp", // vista superior (fondo transparente)
  front: "/orion-mx/orion-front.webp", // vista frontal (fondo transparente)
  viewA: "/orion-mx/orion-view-a.jpg",
  viewB: "/orion-mx/orion-view-b.jpg",
  model: "/orion-mx/orion_detallado.glb",
} as const;

export const orionIntro =
  "Plataforma aérea compacta con autonomía de hasta 50 minutos, cargas útiles personalizables y funciones de navegación asistida y autónoma.";

// 01 · Tablero de rendimiento. "variants" son las dos lecturas de la ficha (ej. sin carga / con carga estándar).
export type OrionMetric = {
  id: "autonomia" | "alcance" | "velocidad" | "peso";
  label: string;
  prefix?: string;
  unit: string;
  text: string;
  start?: number; // variante que se muestra primero
  variants: { label: string; value: number; decimals?: number }[];
};

export const orionMetrics: OrionMetric[] = [
  {
    id: "autonomia",
    label: "Autonomía",
    prefix: "Hasta",
    unit: "min",
    text: "50 minutos sin carga útil y 30 minutos con la carga estándar de 300 g. Batería LiHV de 368.4 Wh.",
    variants: [
      { label: "Sin carga", value: 50 },
      { label: "Carga estándar", value: 30 },
    ],
  },
  {
    id: "alcance",
    label: "Alcance",
    prefix: "Hasta",
    unit: "km",
    text: "Radiocontrol configurable de 10 a 40 km en espacio sin obstrucción, en frecuencias de 2.4 y/o 5.8 GHz.",
    start: 1,
    variants: [
      { label: "Mínimo", value: 10 },
      { label: "Máximo", value: 40 },
    ],
  },
  {
    id: "velocidad",
    label: "Velocidad",
    prefix: "Máx.",
    unit: "km/h",
    text: "Velocidad máxima de 72 km/h, con resistencia al viento de 35 km/h y temperatura de operación de 0 a 40 °C.",
    variants: [{ label: "Máxima", value: 72 }],
  },
  {
    id: "peso",
    label: "Peso",
    unit: "kg",
    text: "3 kg sin carga (batería incluida) y 3.3 kg con la carga útil estándar de 300 g. Admite hasta 500 g de carga útil sugerida.",
    variants: [
      { label: "Sin carga", value: 3, decimals: 1 },
      { label: "Carga estándar", value: 3.3, decimals: 1 },
    ],
  },
];

// 05 · Cargas útiles compatibles (ficha técnica). Fotos en /public/orion-mx/payloads (cámbialas por las de ORION cuando las tengas).
export const orionPayloads = [
  { id: "multisensor", big: "4 en 1", title: "Cámara multisensor", text: "Térmica, gran angular, zoom óptico híbrido de 165× y telémetro láser, con seguimiento de objetivos mediante IA.", chips: ["Térmica", "Gran angular", "Zoom híbrido 165×", "Telémetro láser", "Seguimiento con IA"], image: "/orion-mx/multisensor.webp", alt: "Cámara multisensor 4 en 1" },
  { id: "zoom", big: "30×", title: "Zoom óptico 30× / 10×", text: "Dos opciones para observar a distancia: 30× para el detalle lejano y 10× para mayor cobertura.", chips: ["Zoom óptico 30×", "Zoom óptico 10×"], image: "/orion-mx/zoom.webp", alt: "Cámara con zoom óptico" },
  { id: "mini4k", big: "4K", title: "Minicámara estabilizada", text: "Cámara 4K estabilizada con zoom digital de 8×, compacta y ligera.", chips: ["Video 4K", "Estabilizada", "Zoom digital 8×"], image: "/orion-mx/ir.webp", alt: "Minicámara 4K estabilizada" },
  { id: "foto", big: "42 MP", title: "Fotogramétrica", text: "Cámara full frame de 42 MP para mapeo, levantamientos y modelos de alta resolución.", chips: ["42 MP", "Full frame"], image: "/orion-mx/fotogrametrica.webp", alt: "Cámara fotogramétrica de 42 MP" },
  { id: "seguridad", big: "SP", title: "Seguridad pública", text: "Opciones para operaciones de seguridad: observación y disuasión desde el aire.", chips: ["Seguimiento automático de objetivos", "Observación nocturna con cámaras térmicas", "Altavoces y luces"], image: "/orion-mx/personalizable.webp", alt: "Altavoz y luces para disuasión" },
] as const;

// 04 · Misiones: para qué se usa ORION y con qué carga útil.
export const orionMissions = [
  { id: "seguridad", kicker: "Seguridad pública", title: "Vigilancia y disuasión", copy: "Seguimiento automático de objetivos, observación nocturna con cámaras térmicas y disuasión con altavoces y luces.", payload: "Multisensor 4 en 1", image: "/orion-mx/orion-hero.webp", alt: "ORION en vuelo", fit: "cover" },
  { id: "infraestructura", kicker: "Infraestructura", title: "Inspección sin exponer a tu personal", copy: "Túneles, puentes y obra civil. Zoom óptico para ver el detalle a distancia y navegación asistida para mantener la posición.", payload: "Zoom 30× / 10×", image: "/orion-mx/orion-tunnel.webp", alt: "ORION volando en un túnel", fit: "cover" },
  { id: "industrial", kicker: "Industria", title: "Equipos de difícil acceso", copy: "Plantas, tuberías y turbinas. Imagen térmica y de alta resolución para detectar fallas a tiempo.", payload: "Multisensor 4 en 1", image: "/orion-mx/orion-turbine.webp", alt: "ORION inspeccionando una turbina", fit: "cover" },
  { id: "mapeo", kicker: "Mapeo", title: "Levantamientos y fotogrametría", copy: "Misiones autónomas por puntos de control con cámara full frame de 42 MP para modelos y planos.", payload: "Fotogramétrica 42 MP", image: "/orion-mx/payloads/fotogrametrica.webp", alt: "Cámara fotogramétrica de 42 MP", fit: "contain" },
] as const;
