// Fuente: ficha técnica oficial "Orion_v2" (PDF). Edita aquí para actualizar la sección 05.
export const SPEC_PDF = "/orion-mx/ORION-MX-Ficha-Tecnica.pdf";
export const SPEC_PDF_NAME = "ORION-MX-Ficha-Tecnica.pdf";

export type SpecKpi = { value: number; suffix: string; label: string; note: string };
export const specKpis: SpecKpi[] = [
  { value: 25, suffix: "min", label: "Autonomía", note: "Batería Li-ion 8000 mAh" },
  { value: 8, suffix: "LiDAR", label: "Evasión", note: "Obstáculos de 0.5 a 8 m" },
  { value: 15, suffix: "km", label: "Transmisión", note: "Radio-control 2.4 GHz" },
  { value: 1980, suffix: "g", label: "Peso", note: "Cuadricóptero compacto" },
];

export type SpecSection = { title?: string; items: [string, string][] };
export type SpecTab = { id: string; label: string; short: string; sections: SpecSection[] };
export const specTabs: SpecTab[] = [
  {
    id: "drone",
    label: "Plataforma",
    short: "01",
    sections: [
      {
        items: [
          ["Configuración", "Cuadricóptero"],
          ["Dimensiones", "420 × 420 × 260 mm"],
          ["Peso", "1,980 g"],
          ["Motores", "Brushless"],
          ["Propelas", "13 pulgadas"],
          ["Ángulos", "Pitch, Roll máx. 45°"],
          ["Detección de obstáculos", "De 0.5 m a 8 m"],
          ["Sensores", "IMU, flujo óptico, barómetro, LiDAR, compass y magnetómetro"],
          ["Materiales", "Fibra de carbono, aluminio y nylon"],
          ["Frecuencia de operación", "2.4 GHz"],
        ],
      },
    ],
  },
  {
    id: "bateria",
    label: "Batería",
    short: "02",
    sections: [
      {
        items: [
          ["Capacidad", "8000 mAh"],
          ["Voltaje", "22.2 V"],
          ["Tipo", "Li-ion"],
          ["Tiempo de carga", "50 minutos"],
          ["Autonomía", "25 minutos"],
        ],
      },
    ],
  },
  {
    id: "camaras",
    label: "Cámaras",
    short: "03",
    sections: [
      {
        title: "Ángulo amplio",
        items: [
          ["Sensor", "48 MP"],
          ["Foto / video", "JPG / MP4"],
          ["Resolución de video", "3840 × 2160"],
          ["Almacenamiento", "Memoria SD"],
        ],
      },
      {
        title: "Tele cámara",
        items: [
          ["Sensor", "48 MP"],
          ["Resolución de video", "3840 × 2160"],
          ["Almacenamiento", "Memoria SD"],
        ],
      },
      {
        title: "Cámara térmica",
        items: [
          ["Sensor", "Térmico radiométrico"],
          ["Resolución de video", "640 × 512"],
          ["Ángulo", "33°"],
          ["Almacenamiento", "Memoria SD"],
        ],
      },
    ],
  },
  {
    id: "control",
    label: "Control",
    short: "04",
    sections: [
      {
        title: "Estación de control",
        items: [
          ["Tipo", "Radio-control"],
          ["Frecuencia de operación", "2.4 GHz"],
          ["Distancia de transmisión", "Hasta 15 km"],
          ["Peso", "850 g"],
          ["Puertos", "HDMI, USB-A, USB-C, SIM y SD"],
          ["Display", "5.5 pulgadas"],
        ],
      },
      { title: "Case de transporte", items: [["Dimensiones", "580 × 520 × 260 mm"]] },
    ],
  },
];