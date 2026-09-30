export const views = [
  ["general", "General"],
  ["top", "Superior"],
  ["bottom", "Inferior"],
  ["front", "Frontal"],
  ["back", "Posterior"],
  ["left", "Izquierda"],
  ["right", "Derecha"],
];
export const pointInfo: Record<string, [string, string]> = {
  motor: ["Motores", "Explora la disposición del sistema de propulsión de FÉNIX."],
  structure: [
    "Estructura",
    "La estructura distribuye las cargas de la plataforma y protege sus sistemas principales.",
  ],
  navigation: [
    "Navegación",
    "La información oficial de FÉNIX describe más de 20 sensores y un sistema de control avanzado.",
  ],
  payload: [
    "Payload",
    "Sensores y cargas útiles se integran según las necesidades técnicas del proyecto.",
  ],
  landing: [
    "Tren de aterrizaje",
    "El conjunto inferior protege la plataforma y sus integraciones durante el contacto con tierra.",
  ],
};

/** Placeholder scene coordinates. Tune these values when swapping the official GLB. */
export type ViewerPoint = {
  id: string;
  name: string;
  position: [number, number, number];
  text: string;
};
export const points: ViewerPoint[] = [
  {
    id: "motor",
    name: "Motores",
    position: [1.78, 0.4, 1.28],
    text: "Sistema de propulsión de FÉNIX.",
  },
  {
    id: "structure",
    name: "Estructura",
    position: [-0.42, 0.3, 0.3],
    text: "FÉNIX está construido en fibra de carbono, según la información oficial.",
  },
  {
    id: "navigation",
    name: "Navegación",
    position: [0.25, 0.76, -0.32],
    text: "La plataforma oficial incorpora más de 20 sensores y un sistema de control avanzado.",
  },
  {
    id: "payload",
    name: "Payload",
    position: [0, -0.64, 0.6],
    text: "La integración final se define según los requerimientos técnicos de cada proyecto.",
  },
  {
    id: "landing",
    name: "Tren de aterrizaje",
    position: [-0.8, -1.04, 0.8],
    text: "Conjunto inferior de apoyo y protección de la plataforma.",
  },
];

export const viewerConfig = {
  normalizedSize: 6,
  modelScale: 1,
  modelOffset: [0, 0, 0] as [number, number, number],
  cameraViews: {
    general: [5, 2.6, 6.7],
    top: [0, 8, 0.01],
    bottom: [0, -8, 0.01],
    front: [0, 1, 8],
    back: [0, 1, -8],
    left: [-8, 1, 0],
    right: [8, 1, 0],
  } as Record<string, [number, number, number]>,
  focusDistance: 4.5,
  mobileFocusDistance: 6,
  // Useful angles for each component, including selection from an overhead view.
  focusDirections: {
    motor: [2, 1.6, 3],
    structure: [3, 2, 4],
    navigation: [1, 3, 3],
    payload: [1, -0.3, 3],
    landing: [2, 0.1, 3],
  } as Record<string, [number, number, number]>,
  lights: { hemisphere: 2.5, key: 4, fill: 2, exposure: 1.2 },
  rotorPrefix: "Rotor_",
  // Optional GLB node names; unknown geometry falls back to the closest visible mesh.
  highlightNodes: {
    motor: ["Motor 3", "Motor hub 3"],
    structure: ["Fuselage", "Lower structure"],
    navigation: ["Navigation unit", "Navigation mast"],
    payload: ["Payload camera", "Camera lens", "Gimbal"],
    landing: ["Landing strut", "Landing skid"],
  } as Record<string, string[]>,
};
