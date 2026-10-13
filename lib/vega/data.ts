/** Datos de VEGA tomados de la ficha técnica oficial (Flytek_Vega_Ficha_Tecnica.pdf). */
export const SPEC_PDF = "/vega/Flytek_Vega_Ficha_Tecnica.pdf";
export const SPEC_PDF_NAME = "Flytek_Vega_Ficha_Tecnica.pdf";

export const vegaData = {
  name: "VEGA",
  tagline: "Plataforma aérea multipropósito. Hasta 90 minutos de vuelo.",
  intro:
    "VEGA combina gran autonomía, cargas útiles personalizables y navegación asistida o autónoma para que una sola plataforma resuelva distintas misiones, desde inspección hasta seguridad pública.",
  contactHref: "mailto:info@flytek.com.mx?subject=Cotizacion%20VEGA",
  contactSecurityHref: "mailto:info@flytek.com.mx?subject=VEGA%20para%20seguridad%20publica",
  nav: [
    ["descripcion", "Descripción"],
    ["explorador", "Explorar 3D"],
    ["rendimiento", "Rendimiento"],
    ["tecnologia", "Navegación"],
    ["payloads", "Cargas útiles"],
    ["seguridad-publica", "Seguridad pública"],
    ["especificaciones", "Especificaciones"],
    ["contacto", "Contacto"],
  ],
  assets: {
    model: "/vega/models/vega.glb",
    hero: "/vega/images/vega-estudio.webp",
    side: "/vega/images/vega-lateral.webp",
  },
  // Franja de datos clave (value es número para la animación de conteo)
  stats: [
    { value: 90, unit: "min", label: "Autonomía máxima", note: "sin carga útil" },
    { value: 40, unit: "km", label: "Alcance de radiocontrol", note: "configurable de 10 a 40 km" },
    { value: 35, unit: "km/h", label: "Resistencia al viento", note: "operación estable" },
    { value: 1.5, unit: "kg", label: "Carga útil máxima", note: "sugerida", decimals: 1 },
  ],
  specs: [
    {
      title: "Aeronave",
      rows: [
        ["Dimensiones (hélices desplegadas)", "1.23 × 1.23 × 0.51 m"],
        ["Peso sin carga (con batería)", "6 kg"],
        ["Peso con carga útil estándar", "6.5 kg"],
        ["Hélices", "22 pulgadas / 558.8 mm"],
      ],
    },
    {
      title: "Rendimiento",
      rows: [
        ["Autonomía máxima sin carga", "1 h 30 min"],
        ["Autonomía con carga estándar", "1 h"],
        ["Velocidad máxima", "72 km/h"],
        ["Resistencia al viento", "35 km/h"],
        ["Temperatura de operación", "0 a 40 °C"],
      ],
    },
    {
      title: "Control y enlace",
      rows: [
        ["Alcance del radiocontrol", "10 a 40 km (configurable, sin obstrucción)"],
        ["Frecuencias", "2.4 y/o 5.8 GHz"],
        ["Navegación", "Asistida por GPS y autónoma por puntos de control"],
        ["Seguridad", "Regreso a casa por pérdida de señal o batería baja"],
      ],
    },
    {
      title: "Carga y energía",
      rows: [
        ["Carga útil estándar", "500 g"],
        ["Carga útil máxima sugerida", "1.5 kg"],
        ["Batería", "LiHV / 798 Wh"],
        ["Transporte", "Estuche de alto impacto"],
      ],
    },
  ],
  cta: {
    title: "Configura VEGA para tu operación",
    description: "Cuéntanos tu misión y te ayudamos a elegir la carga útil ideal. Integración, capacitación y soporte nacional incluidos.",
    label: "SOLICITAR COTIZACIÓN",
    secondary: "DESCARGAR FICHA TÉCNICA",
  },
} as const;
