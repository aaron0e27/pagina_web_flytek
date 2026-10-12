/** Only the product name and supplied asset are confirmed. Editorial copy is provisional. */
import { vegaApplications } from "./reference-data";
export const PENDING = "Consultar según configuración.";
export const specificationValues: Record<string,string> = { Dimensiones: "Longitud de referencia: 1.5 m", Peso: "8 kg de referencia", Autonomía: "Hasta 45 min, según configuración", "Resistencia al viento": "36 km/h de referencia" };
export const vegaData = {
  name: "VEGA",
  tagline: "Versátil por diseño. Listo para tu misión.",
  description: PENDING,
  contactHref: "mailto:info@flytek.com.mx?subject=Informacion%20sobre%20VEGA",
  nav: [
    ["descripcion", "Descripción"],
    ["caracteristicas", "Características"],
    ["diseno", "Diseño"],
    ["rendimiento", "Rendimiento"],
    ["tecnologia", "Tecnología"],
    ["payloads", "Payloads"],
    ["aplicaciones", "Aplicaciones"],
    ["especificaciones", "Especificaciones"],
    ["contacto", "Contacto"],
  ],
  assets: {
    model: "/vega/models/vega.glb",
    hero: "/vega/images/vega-estudio.png",
    detail: "/vega/images/vega-detalle.png",
    top: "/vega/images/vega-superior.png",
    rear: "/vega/images/vega-posterior.png",
    side: "/vega/images/vega-lateral.png",
  },
  stats: [
    { label: "Autonomía de referencia", value: "45 min" },
    { label: "Resistencia al viento", value: "36 km/h" },
    { label: "Peso de referencia", value: "8 kg" },
  ],
  features: [
    {
      title: "Diseño y construcción",
      description: "Una estructura plegable y distintas posibilidades de integración para tu operación.",
      image: "/vega/images/vega-detalle.png",
      label: "01 / DETALLE DEL MODELO",
    },
    {
      title: "Perspectiva completa",
      description: "Explora la plataforma desde distintos ángulos y define con Flytek la configuración de tu equipo.",
      image: "/vega/images/vega-superior.png",
      label: "02 / VISTA SUPERIOR",
    },
  ],
  technology: [
    { label: "Navegación y control", description: PENDING },
    { label: "Comunicación", description: PENDING },
    { label: "Integración", description: PENDING },
  ],
  specs: [
    { title: "Plataforma", rows: ["Dimensiones", "Peso", "Materiales"] },
    {
      title: "Rendimiento",
      rows: ["Autonomía", "Velocidad", "Alcance", "Capacidad de carga"],
    },
    {
      title: "Entorno operativo",
      rows: [
        "Resistencia al viento",
        "Temperatura de operación",
        "Grado de protección",
      ],
    },
    {
      title: "Sistemas",
      rows: ["Navegación", "Transmisión", "Sensores compatibles"],
    },
  ],
  applications: vegaApplications.map(a => ({ title: a.title, description: a.text, image: a.image, sectorHref: "/#sectores" })),
  cta: {
    title: "¿VEGA puede integrarse a tu operación?",
    description: "Integración, capacitación y soporte nacional para acompañar a tu equipo.",
    label: "HABLEMOS",
  },
} as const;

