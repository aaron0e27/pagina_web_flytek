/** Copies de ejemplo y esquema representativo: validar zona de integración con Flytek. */
export const payloads = [
  {
    id: "thermal",
    integrationLabel: "INTEGRACIÓN / SENSOR TÉRMICO",
    target: [45, 54],
    mobileTarget: [45, 60],
    mobileConnectorPath: "M 79 73 L 65 73 L 45 60",
    connectorPath: "M 79 73 L 65 73 L 45 54",
    name: "Térmica",
    title: "Ve más allá de lo visible.",
    description:
      "Sensores térmicos radiométricos para incorporar información térmica a tu operación.",
    image: "payload-thermal",
    label: "Sensor térmico",
  },
  {
    id: "zoom",
    integrationLabel: "INTEGRACIÓN / ZOOM ÓPTICO",
    target: [45, 54],
    mobileTarget: [45, 60],
    mobileConnectorPath: "M 79 73 L 65 73 L 45 60",
    connectorPath: "M 79 73 L 65 73 L 45 54",
    name: "Zoom óptico",
    title: "La distancia cambia. El detalle permanece.",
    description:
      "Cámaras con zoom óptico de hasta 18X, de acuerdo con la configuración publicada por Flytek.",
    image: "payload-zoom",
    label: "Cámara con zoom",
  },
  {
    id: "dual",
    integrationLabel: "INTEGRACIÓN / CÁMARA DUAL",
    target: [45, 54],
    mobileTarget: [45, 60],
    mobileConnectorPath: "M 79 73 L 65 73 L 45 60",
    connectorPath: "M 79 73 L 65 73 L 45 54",
    name: "Dual",
    title: "Dos perspectivas. Una plataforma.",
    description:
      "Integración de cámara dual con opción térmica e infrarroja, definida para cada proyecto.",
    image: "payload-dual",
    label: "Integración dual",
  },
  {
    id: "custom",
    integrationLabel: "INTEGRACIÓN / A MEDIDA",
    target: [44, 40],
    mobileTarget: [44, 50],
    mobileConnectorPath: "M 79 73 L 65 73 L 44 50",
    connectorPath: "M 79 73 L 65 73 L 44 40",
    name: "A medida",
    title: "Tu operación define el equipo.",
    description:
      "Cámaras multiespectrales, iluminación, megáfonos y sistemas personalizados. Flytek evalúa cada integración contigo.",
    image: null,
    label: "Integración personalizada",
  },
];
