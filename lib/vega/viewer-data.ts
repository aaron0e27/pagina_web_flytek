export type XYZ = [number, number, number];

/* ===== Visor 3D con el mismo formato de ORION ===== */
export type VegaPoint = {
  id: string;
  name: string;
  position: XYZ;
  direction: XYZ;
  description: string;
};

// Posiciones de cámara (el modelo se normaliza a ~3.6 unidades, igual que ORION).
export const vegaViews = {
  general: [2.7, 1.9, 3.5],
  front: [0, 0.6, 5.1],
  top: [0.01, 6.6, 0.01],
  side: [5.1, 0.6, 0],
} as const;

// Puntos ilustrativos: ajusta position/direction al probar con el modelo real.
export const vegaPoints: VegaPoint[] = [
  {
    id: "central-body",
    name: "Estructura central",
    position: [0, 0.36, 0],
    direction: [1, 0.8, 1.2],
    description:
      "La estructura central concentra los principales sistemas de la plataforma y distribuye el peso entre sus brazos.",
  },
  {
    id: "propulsion",
    name: "Sistema de propulsión",
    position: [0.81, 0.24, 0.78],
    direction: [1, 0.5, 1],
    description:
      "El conjunto de brazos, motores y hélices proporciona estabilidad y respuesta durante las maniobras de vuelo.",
  },
  {
    id: "payload",
    name: "Zona de carga útil",
    position: [0, -0.39, 0.21],
    direction: [0, -0.4, 1.2],
    description:
      "La zona inferior permite integrar cámaras, sensores y otras cargas útiles según las necesidades de cada operación.",
  },
];
