/** Fotos reales de VEGA en campo. Agrega más objetos a `items` y se acomodan solos. */
export const galleryData = {
  instruction: "Pasa el cursor o toca una imagen para abrirla.",
  items: [
    { id: "vuelo", label: "En vuelo", detail: "OPERACIÓN / ALTURA", image: "/vega/images/vega1.jpeg", position: "35% 30%", alt: "VEGA en vuelo frente a una ladera rocosa y un valle al atardecer" },
    { id: "tierra", label: "En tierra", detail: "PLATAFORMA / CONTROL", image: "/vega/images/vega2.jpeg", position: "50% 55%", alt: "VEGA sobre terreno de grava junto a su control remoto" },
    { id: "mision", label: "En misión", detail: "MOVIMIENTO / INFRAESTRUCTURA", image: "/vega/images/vega3.jpeg", position: "50% 50%", alt: "VEGA en operación sobre terreno de campo" },
    { id: "atardecer", label: "En campo", detail: "SITIO / ATARDECER", image: "/vega/images/vega4.jpeg", position: "50% 62%", alt: "VEGA en tierra con una torre y una camioneta al fondo" },
    { id: "frontal", label: "Vista frontal", detail: "ESTRUCTURA / CONJUNTO", image: "/vega/images/vega5.jpeg", position: "50% 55%", alt: "Vista frontal de VEGA con su control remoto al frente" },
  ],
} as const;