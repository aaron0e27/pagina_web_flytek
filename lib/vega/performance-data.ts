// Valores de la ficha técnica de VEGA.
export type PerfMetric = {
  id: "autonomia" | "viento" | "peso" | "longitud";
  label: string;
  prefix?: string;
  value: number;
  decimals?: number;
  unit: string;
  text: string;
  note: string;
  variants?: { label: string; value: number; decimals?: number; prefix?: string }[];
};

export const perfMetrics: PerfMetric[] = [
  {
    id: "autonomia",
    label: "Autonomía",
    prefix: "Hasta",
    value: 90,
    unit: "min",
    text: "90 minutos sin carga útil y 1 hora con la carga estándar de 500 g. Batería LiHV de 798 Wh.",
    note: "1 h 30 min sin carga · 1 h con carga estándar",
    variants: [
      { label: "Sin carga", value: 90, prefix: "Hasta" },
      { label: "Carga estándar", value: 60, prefix: "Hasta" },
    ],
  },
  {
    id: "viento",
    label: "Resistencia al viento",
    value: 35,
    unit: "km/h",
    text: "Estabilidad frente a ráfagas de hasta 35 km/h, con velocidad máxima de 72 km/h y operación de 0 a 40 °C.",
    note: "Velocidad máxima 72 km/h",
  },
  {
    id: "peso",
    label: "Peso",
    value: 6,
    unit: "kg",
    text: "6 kg sin carga (batería incluida) y 6.5 kg con la carga útil estándar. Admite hasta 1.5 kg de carga útil sugerida.",
    note: "6.5 kg con carga estándar",
    variants: [
      { label: "Sin carga", value: 6, decimals: 1 },
      { label: "Carga estándar", value: 6.5, decimals: 1 },
    ],
  },
  {
    id: "longitud",
    label: "Dimensiones",
    value: 1.23,
    decimals: 2,
    unit: "m",
    text: "1.23 × 1.23 × 0.51 m con las hélices de 22 pulgadas desplegadas. Viaja en un estuche de alto impacto.",
    note: "1.23 × 1.23 × 0.51 m",
    variants: [
      { label: "Largo y ancho", value: 1.23, decimals: 2 },
      { label: "Alto", value: 0.51, decimals: 2 },
    ],
  },
];
