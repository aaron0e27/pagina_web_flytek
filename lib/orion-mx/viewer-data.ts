import type { DronePoint } from "@/lib/shared/interactive-drone-scene";

export const orionPoints: DronePoint[] = [
  { id: "camera", name: "Cámara estabilizada", position: [0, -0.65, -0.25], direction: [0, 0.2, -4.8], description: "Estabilizador de video de 3 ejes y cámara 4K con zoom digital x165: más detalle sin acercarte de más." },
  { id: "protection", name: "Protección de propelas", position: [1.2, 0.35, 0.75], direction: [5, 0.3, 0], description: "Los protectores ayudan a resguardar las hélices al operar cerca de estructuras, muros y espacios reducidos." },
  { id: "sensors", name: "Sensores de navegación", position: [0, 0.7, 0.45], direction: [0.8, 1.3, 1], description: "Hasta 8 sensores LiDAR evitan obstáculos, aun en total oscuridad, con detección de 0.5 a 8 m." },
  { id: "landing", name: "Tren de aterrizaje", position: [-0.50, -0.95, 0.28], direction: [-1.2, 0.2, 1.2], description: "El tren de aterrizaje separa la plataforma del suelo y protege sus componentes durante el despegue y el aterrizaje." },
];

export const orionViews = {
  general: [-3.2, 1.5, -3.2],
  front: [0, 0.2, -4.8],
  top: [0.01, 6.5, -0.01],
  side: [5.0, 0.3, 0],
} as const;
