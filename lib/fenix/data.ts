import { fenixAssets } from "./assets";

/** COPY EDITABLE: los títulos y textos de ejemplo esperan validación de Flytek.
 * Los tres placeholders expresos se conservan hasta recibir contenido final.
 * Las especificaciones publicadas se mantienen al final de este archivo. */
export const fenixCopy = {
  hero: {
    nomenclature: "[INFORMACIÓN A DETALLAR]",
    headline: "[FRASE PRINCIPAL FÉNIX]",
    more: "CONOCER MÁS",
  },
  intro: {
    label: "CONOCE FÉNIX",
    title: "[TÍTULO EDITORIAL]",
    description:
      "Una plataforma aérea de Flytek Innovations, concebida para el trabajo profesional. Estructura en fibra de carbono, tecnología de vuelo y posibilidades de integración que parten de una misma idea:",
    emphasis: "el equipo debe responder a tu operación.",
  },
  viewer: {
    title: ["Cada ángulo.", "Cada detalle."],
    description: ["Explora la plataforma en 3D.", "Acércate a su ingeniería."],
  },
  entrance: { label: "DEL DISEÑO AL MOVIMIENTO", title: ["Precisión.", "En cada movimiento."] },
  payloads: {
    title: ["Tu misión.", "Tu FÉNIX."],
    description: ["Una misma plataforma.", "Diferentes posibilidades de integración."],
    note: "Flytek personaliza cada equipo para tu proyecto.",
  },
  applications: {
    title: ["FÉNIX", "en operación."],
    description: ["Una plataforma profesional.", "Aplicaciones en campo."],
  },
  support: { label: "RESPALDO FLYTEK", title: ["Detrás de FÉNIX,", "un equipo contigo."] },
  contact: {
    label: "EL SIGUIENTE PASO",
    title: ["Hablemos", "de tu operación"],
    description: [
      "Cada proyecto empieza con una necesidad.",
      "Definamos juntos el FÉNIX que requiere tu equipo.",
    ],
    email: "info@flytek.com.mx",
    phone: "+52 56 5440 7312",
    phoneHref: "tel:+525654407312",
  },
};

export const fenixKeyStats = {
  endurance: {
    value: "45",
    unit: "MIN",
    label: "Autonomía",
    detail: "Hasta 45 minutos de autonomía",
  },
  wind: { value: "40", unit: "KM/H", label: "Resistencia al viento", detail: "Hasta 40 km/h" },
  weight: { value: "8", unit: "KG", label: "Peso de la plataforma" },
  length: { value: "1.5", unit: "M", label: "Longitud" },
};

export const fenixStory = {
  design: {
    label: "DISEÑO Y CONSTRUCCIÓN",
    title: ["Diseñado alrededor", "de la operación."],
    description:
      "El producto, desde su estructura. Fibra de carbono y una plataforma preparada para integrar los requerimientos de cada proyecto.",
    material: ["Fibra de", "carbono."],
    detail: "ESTRUCTURA FÉNIX",
  },
  performance: {
    label: "RENDIMIENTO DE VUELO",
    title: ["Tiempo para hacer", "más en cada misión."],
    note: "RENDIMIENTO SUJETO A CONDICIONES DE OPERACIÓN",
  },
  navigation: {
    label: "NAVEGACIÓN Y SEGURIDAD",
    title: ["Tecnología que", "acompaña tu vuelo."],
    description:
      "Más de 20 sensores y un sistema de control avanzado, de acuerdo con la información oficial de FÉNIX.",
    features: [
      { title: "Control de vuelo", text: "Sistema avanzado para vuelo autónomo." },
      { title: "Estabilización en tres ejes", text: "Imagen estable durante la operación." },
    ],
  },
  control: {
    label: "TRANSMISIÓN Y CONTROL",
    title: ["Conectado a lo", "que está pasando."],
    description:
      "Imagen en alta resolución y telemetría para mantener presente el estado de tu equipo.",
    range: "HASTA 10 KM",
    conditions: "En campo abierto",
  },
};

/** Imágenes y copies de aplicaciones provisionales. Mantener este mosaico. */
export const fenixApplications = [
  {
    id: "supervision",
    label: "SEGURIDAD Y SUPERVISIÓN",
    title: "Supervisión desde el aire.",
    text: "Información visual para supervisar tu operación.",
    image: fenixAssets.inspection,
    alt: "Operador junto a infraestructura eléctrica, recurso provisional publicado por Flytek",
  },
  {
    id: "levantamientos",
    label: "LEVANTAMIENTOS",
    title: "El terreno, en contexto.",
    text: "Captura de información para proyectos de construcción.",
    image: fenixAssets.construction,
    alt: "Profesionales en construcción, recurso provisional publicado por Flytek",
  },
  {
    id: "inspeccion",
    label: "INSPECCIÓN",
    title: "Ver para comprender.",
    text: "Información térmica e imagen estabilizada.",
    image: fenixAssets.thermal,
    alt: "Imagen térmica industrial de referencia",
  },
];

/** El espacio fotográfico es provisional; sustituir image y alt con material oficial. */
export const fenixSupport = [
  {
    title: "Capacitación",
    text: "Conoce tu equipo en la zona de trabajo, con acompañamiento de Flytek.",
    image: fenixAssets.inspection,
    alt: "Recurso provisional de operación en campo para la sección de capacitación",
    pending: false,
  },
  {
    title: "Mantenimiento",
    text: "Atención para mantener tu plataforma en condiciones de operación.",
    image: fenixAssets.placeholder,
    alt: "Imagen de mantenimiento pendiente de Flytek",
    pending: true,
  },
  {
    title: "Soporte nacional",
    text: "Respaldo técnico de Flytek en México para acompañar el uso de tu equipo.",
    image: fenixAssets.construction,
    alt: "Recurso provisional de equipo en campo para la sección de soporte",
    pending: false,
  },
];

export const fenixNavigation = [
  ["descripcion", "Descripción"],
  ["caracteristicas", "Características"],
  ["diseno", "Diseño"],
  ["rendimiento", "Rendimiento"],
  ["tecnologia", "Tecnología"],
  ["payloads", "Payloads"],
  ["especificaciones", "Especificaciones"],
];

export const fenixSpecs = [
  {
    name: "Dimensiones y construcción",
    items: [
      ["Longitud", "1.5 m"],
      ["Peso", "8 kg"],
      ["Material", "Fibra de carbono"],
    ],
  },
  {
    name: "Rendimiento",
    items: [
      ["Autonomía", "Hasta 45 minutos"],
      ["Resistencia al viento", "Hasta 40 km/h"],
      ["Temperatura de operación", "Hasta 40 °C"],
      ["Uso exterior", "Resistente a la lluvia y al polvo"],
      ["Operación nocturna", "Disponible"],
    ],
  },
  {
    name: "Navegación y transmisión",
    items: [
      ["Sistema de vuelo", "Más de 20 sensores y control avanzado"],
      ["Estabilización de video", "Tres ejes"],
      ["Transmisión de imagen", "Alta resolución"],
      ["Alcance publicado", "10 km en campo abierto"],
      ["Telemetría", "Distancia, señal y batería"],
    ],
  },
  {
    name: "Payloads e integración",
    items: [
      ["Cámaras", "Térmica, zoom óptico, dual y multiespectral"],
      ["Zoom óptico", "Hasta 18X"],
      ["Otros sistemas", "Megáfono e iluminación"],
      ["Personalización", "De acuerdo con cada proyecto"],
    ],
  },
];
