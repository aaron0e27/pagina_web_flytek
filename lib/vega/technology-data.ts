// Sección "04 Navegación": todo viene de la ficha técnica.
export type NavStep = {
  id: "gps" | "ruta" | "enlace" | "regreso";
  title: string;
  summary: string;
  text: string;
  chips: string[];
};

export const navSteps: NavStep[] = [
  {
    id: "gps",
    title: "Navegación asistida por GPS",
    summary: "Vuelo estable y preciso con ayuda satelital.",
    text: "El GPS mantiene a VEGA estable en el aire y facilita cada maniobra, incluso con viento de hasta 35 km/h.",
    chips: ["GPS", "Hasta 72 km/h"],
  },
  {
    id: "ruta",
    title: "Ruta autónoma por puntos",
    summary: "Programa la misión y deja que VEGA la recorra.",
    text: "Define puntos de control y VEGA sigue la ruta por sí sola. Puede sumar un sistema de evasión de obstáculos personalizable.",
    chips: ["Puntos de control", "Evasión de obstáculos (opcional)"],
  },
  {
    id: "enlace",
    title: "Alcance de radiocontrol",
    summary: "De 10 a 40 km, configurable.",
    text: "El alcance se configura de 10 a 40 km en espacio sin obstrucción, con frecuencias de 2.4 y/o 5.8 GHz.",
    chips: ["10 a 40 km", "2.4 GHz", "5.8 GHz"],
  },
  {
    id: "regreso",
    title: "Regreso a casa",
    summary: "Si falla la señal o la batería, vuelve sola.",
    text: "Ante pérdida de señal o batería baja, VEGA regresa automáticamente a su punto de despegue.",
    chips: ["Pérdida de señal", "Batería baja"],
  },
];
