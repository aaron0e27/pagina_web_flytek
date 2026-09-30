
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
export const payloads = [
  {
    id: "a",
    label: "Imagen y observación",
    description: "Cámara térmica, zoom óptico o cámara dual: distintas perspectivas según la información que necesitas capturar.",
    image: "/vega/images/vega-estudio.png",
    anchor: [52, 52] as [number, number],
  },
  {
    id: "b",
    label: "Análisis del entorno",
    description: "Consulta la integración de una cámara multiespectral y el flujo de captura apropiado para tu proyecto.",
    image: "/vega/images/vega-superior.png",
    anchor: [50, 50] as [number, number],
  },
  {
    id: "c",
    label: "Apoyo a la operación",
    description: "Iluminación y megáfono como opciones de integración. Sensores anticolisión y vuelo nocturno sujetos a configuración.",
    image: "/vega/images/vega-detalle.png",
    anchor: [50, 54] as [number, number],
  },
];
