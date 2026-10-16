import type { DronePoint } from "@/lib/shared/interactive-drone-scene";

export const orionPoints: DronePoint[] = [
  { id: "camera", name: "Cámara multisensor", position: [0, -0.65, -0.25], direction: [0, 0.2, -4.8], description: "Carga útil 4 en 1: térmica, gran angular, zoom óptico híbrido de 165× y telémetro láser, con seguimiento de objetivos mediante IA." },
  { id: "protection", name: "Hélices de 15 pulgadas", position: [1.2, 0.35, 0.75], direction: [5, 0.3, 0], description: "Hélices de 15 pulgadas (381 mm) para un vuelo estable con hasta 500 g de carga útil sugerida." },
  { id: "sensors", name: "Navegación GPS", position: [0, 0.7, 0.45], direction: [0.8, 1.3, 1], description: "Navegación asistida por GPS, misiones autónomas por puntos de control y regreso a casa si se pierde la señal o baja la batería." },
  { id: "landing", name: "Tren de aterrizaje", position: [-0.50, -0.95, 0.28], direction: [-1.2, 0.2, 1.2], description: "Separa la plataforma del suelo y protege la carga útil durante el despegue y el aterrizaje." },
];

export const orionViews = {
  general: [-3.2, 1.5, -3.2],
  front: [0, 0.2, -4.8],
  top: [0.01, 6.5, -0.01],
  side: [5.0, 0.3, 0],
} as const;
