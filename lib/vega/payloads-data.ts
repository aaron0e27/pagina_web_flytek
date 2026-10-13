/** Cargas útiles compatibles (ficha técnica de VEGA). */
export type Payload = {
  id: string;
  short: string; // nombre corto para la tarjeta
  label: string;
  description: string;
  chips: string[];
  use: string;
  image: string;
  alt: string;
};

export const payloads: Payload[] = [
  {
    id: "multisensor",
    short: "Multisensor 4 en 1",
    label: "Cámara multisensor 4 en 1",
    description:
      "Térmica, gran angular, zoom óptico híbrido y telémetro láser en una sola cámara, con seguimiento de objetivos mediante IA.",
    chips: ["Térmica", "Gran angular", "Zoom híbrido 165×", "Telémetro láser", "Seguimiento con IA"],
    use: "Seguimiento automático de objetivos",
    image: "/vega/images/multisensor.webp",
    alt: "Cámara multisensor 4 en 1 de VEGA",
  },
  {
    id: "zoom",
    short: "Zoom 30× / 10×",
    label: "Cámaras con zoom óptico",
    description:
      "Dos opciones de zoom óptico para observar a distancia: 30× para el detalle lejano y 10× para mayor cobertura.",
    chips: ["Zoom óptico 30×", "Zoom óptico 10×"],
    use: "Inspección y observación a distancia",
    image: "/vega/images/zoom.webp",
    alt: "Cámara con zoom óptico para VEGA",
  },
  {
    id: "ir",
    short: "Infrarroja 12×",
    label: "Cámara IR con zoom óptico 12×",
    description: "Visión infrarroja con zoom óptico de 12× para observar cuando la luz no alcanza.",
    chips: ["Infrarroja", "Zoom óptico 12×"],
    use: "Observación en baja luz",
    image: "/vega/images/ir.webp",
    alt: "Cámara infrarroja con zoom óptico de 12×",
  },
  {
    id: "fotogrametrica",
    short: "Fotogramétrica 42 MP",
    label: "Cámara fotogramétrica full frame",
    description: "Captura de 42 MP en formato full frame para generar mapas y modelos con el máximo detalle.",
    chips: ["42 MP", "Full frame"],
    use: "Mapeo y fotogrametría",
    image: "/vega/images/fotogrametrica.webp",
    alt: "Cámara fotogramétrica full frame de 42 MP",
  },
  {
    id: "personalizable",
    short: "Personalizable",
    label: "Carga útil personalizable",
    description:
      "Integra la carga que tu misión necesita, como altavoces y luces para disuasión. Hasta 1.5 kg de carga útil máxima sugerida.",
    chips: ["Hasta 1.5 kg", "Altavoces", "Luces"],
    use: "Disuasión y misiones a la medida",
    image: "/vega/images/personalizable.webp",
    alt: "Carga útil personalizable con altavoz y luces",
  },
];
