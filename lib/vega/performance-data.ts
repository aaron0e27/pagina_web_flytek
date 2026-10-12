// Valores de referencia de VEGA (mismos que "specificationValues" en lib/vega/data.ts).
export type PerfMetric = {
  id: "autonomia" | "viento" | "peso" | "longitud";
  label: string;
  prefix?: string;
  value: number;
  decimals?: number;
  unit: string;
  text: string;
};

export const perfMetrics: PerfMetric[] = [
  {
    id: "autonomia",
    label: "Autonomía",
    prefix: "Hasta",
    value: 45,
    unit: "min",
    text: "Tiempo de vuelo de referencia. Puede variar según la carga útil y las condiciones de la operación.",
  },
  {
    id: "viento",
    label: "Resistencia al viento",
    value: 36,
    unit: "km/h",
    text: "Estabilidad de referencia frente a ráfagas para mantener una operación segura en exteriores.",
  },
  {
    id: "peso",
    label: "Peso",
    value: 8,
    unit: "kg",
    text: "Peso de referencia de la plataforma. Cambia según la configuración y las cargas útiles integradas.",
  },
  {
    id: "longitud",
    label: "Longitud",
    value: 1.5,
    decimals: 1,
    unit: "m",
    text: "Longitud de referencia con la estructura desplegada. Su diseño plegable facilita el transporte.",
  },
];