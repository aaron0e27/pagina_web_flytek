
export type XYZ = [number, number, number];
/** Display-space positions after model normalization. Hotspot locations are illustrative, not verified components. */
export const viewerData = {
  orientation: [0, 0, 0] as XYZ,
  normalizedSize: 6,
  views: [
    { id: "general", label: "General", position: [4.5, 3.2, 5.8] as XYZ },
    { id: "front", label: "Frontal", position: [0, 1, 8.5] as XYZ },
    { id: "back", label: "Posterior", position: [0, 1, -8.5] as XYZ },
    { id: "side", label: "Lateral", position: [8.5, 1, 0] as XYZ },
    { id: "top", label: "Superior", position: [0, 11, 0.01] as XYZ },
    { id: "bottom", label: "Inferior", position: [0, -11, 0.01] as XYZ },
  ],
  hotspots: [
    {
    id: "central-body",
    label: "Estructura central",
    shortLabel: "CUERPO",
    description:
      "La estructura central concentra los principales sistemas de la plataforma y distribuye el peso entre sus brazos.",
    position: [0, 0.6, 0] as XYZ,
  },
  {
    id: "propulsion",
    label: "Sistema de propulsión",
    shortLabel: "PROPULSIÓN",
    description:
      "El conjunto de brazos, motores y hélices proporciona estabilidad y respuesta durante las maniobras de vuelo.",
    position: [1.35, 0.4, 1.3] as XYZ,
  },
  {
    id: "payload",
    label: "Zona de carga útil",
    shortLabel: "CARGA ÚTIL",
    description:
      "La zona inferior permite integrar cámaras, sensores y otras cargas útiles según las necesidades de cada operación.",
    position: [0, -0.65, 0.35] as XYZ,
  }, 
  ],
};
type PayloadItem = {
  id: string;
  label: string;
  description: string;
  image: string;
  alt: string;
  fit: "cover" | "contain";
  position: string;
};
export const payloads : PayloadItem[] = [
  {
    id: "medicion",
    label: "Medición precisa",
    description: "Sensores térmicos radiométricos, cámaras multiespectrales y unidades de medición especiales para obtener mediciones con excelente precisión sin importar el medio.",
    image: "/vega/images/PayloadTermica.jpg",
    alt: "Medición precisa con sensores térmicos radiométricos",
    fit: "cover",
    position: "50% 50%",
  },
  {
    id: "imagen",
    label: "Imagen estable",
    description: "Estabilizador de video en dos o tres ejes que permite cualquier ángulo de visión, para tener siempre la mejor perspectiva en inspección y vigilancia.",
    image: "/vega/images/camara.png",
    alt: "Imagen estabilizada durante la operación",
    fit: "cover",
    position: "50% 50%",
  },
  {
    id: "inspeccion",
    label: "Inspecciona con mayor seguridad y eficiencia",
    description: "Cámara térmica con sensor radiométrico para valores de temperatura precisos de ±5 °C, acompañada de una cámara Full HD para no perder ningún detalle.",
    image: "/vega/images/Payload43n1.jpg",
    alt: "Inspección con cámara térmica y cámara Full HD",
    fit: "cover",
    position: "50% 50%",
  },
  {
    id: "entrega",
    label: "Entrega de carga",
    description: "Sistema de entrega de carga con control remoto, para transportar y soltar paquetes de manera segura y eficiente.",
    image: "/vega/images/payloadGas.jpg",
    alt: "Entrega de carga con control remoto",
    fit: "cover",
    position: "50% 50%",
  },
  {
    id: "mantenimiento",
    label: "Mantenimiento",
    description: "Sistema de mantenimiento con control remoto, para realizar tareas de mantenimiento de manera segura y eficiente.",
    image: "/vega/images/PayloadOblicual.jpg",
    alt: "Mantenimiento con control remoto",
    fit: "cover",
    position: "50% 50%",
  }
];