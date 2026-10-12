// Textos del mapa "05 Tecnología". Los chips usan nombres de la tabla de especificaciones.
export type TechNode = {
  id: string;
  label: string;
  x: number; // posición en % dentro del mapa
  y: number;
  text: string;
  chips: string[];
};

export const techNodes: TechNode[] = [
  {
    id: "navegacion",
    label: "Navegación y control",
    x: 27,
    y: 21,
    text: "El conjunto de navegación y control te permite planear y ejecutar cada misión con la precisión que tu operación necesita.",
    chips: ["Navegación", "Velocidad", "Alcance"],
  },
  {
    id: "comunicacion",
    label: "Comunicación",
    x: 73,
    y: 21,
    text: "La comunicación mantiene a tu equipo conectado con la plataforma durante toda la operación.",
    chips: ["Transmisión", "Alcance"],
  },
  {
    id: "integracion",
    label: "Integración",
    x: 50,
    y: 87,
    text: "Integra las cargas útiles y los sensores que necesites para obtener la información de tu misión.",
    chips: ["Sensores compatibles", "Capacidad de carga"],
  },
];