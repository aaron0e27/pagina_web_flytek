// Fuente: ficha técnica oficial "Flytek_Orion_Ficha_Tecnica.pdf". Edita aquí la sección 06.
export const SPEC_PDF = "/orion-mx/Flytek_Orion_Ficha_Tecnica.pdf";
export const SPEC_PDF_NAME = "Flytek_Orion_Ficha_Tecnica.pdf";
export const QUOTE_HREF = "mailto:info@flytek.com.mx?subject=Cotizaci%C3%B3n%20ORION";

export type SpecSection = { title?: string; items: [string, string][] };
export type SpecTab = { id: string; label: string; short: string; sections: SpecSection[] };
export const specTabs: SpecTab[] = [
  {
    id: "aeronave",
    label: "Aeronave",
    short: "01",
    sections: [
      {
        items: [
          ["Medidas (hélices desplegadas)", "86 × 86 × 44 cm"],
          ["Peso sin carga (con batería)", "3 kg"],
          ["Carga útil estándar", "300 g"],
          ["Peso con carga útil estándar", "3.3 kg"],
          ["Carga útil máxima sugerida", "500 g"],
          ["Hélices", "15 pulgadas / 381 mm"],
          ["Resistencia al viento", "35 km/h"],
          ["Temperatura de operación", "0 a 40 °C"],
        ],
      },
    ],
  },
  {
    id: "rendimiento",
    label: "Rendimiento",
    short: "02",
    sections: [
      {
        items: [
          ["Velocidad máxima", "72 km/h"],
          ["Autonomía sin carga útil", "50 minutos"],
          ["Autonomía con carga estándar", "30 minutos"],
          ["Alcance del radiocontrol", "10 a 40 km (configurable, sin obstrucción)"],
          ["Frecuencias de radiocontrol", "2.4 y/o 5.8 GHz"],
        ],
      },
    ],
  },
  {
    id: "energia",
    label: "Energía",
    short: "03",
    sections: [
      {
        items: [
          ["Batería", "LiHV"],
          ["Capacidad", "368.4 Wh"],
          ["Transporte", "Estuche de alto impacto"],
        ],
      },
    ],
  },
  {
    id: "navegacion",
    label: "Navegación",
    short: "04",
    sections: [
      {
        items: [
          ["Navegación asistida", "Por GPS"],
          ["Navegación autónoma", "Mediante puntos de control"],
          ["Regreso a casa", "Por pérdida de señal y/o batería baja"],
          ["Evasión de obstáculos", "Sistema personalizable"],
        ],
      },
    ],
  },
];
