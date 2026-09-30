/** Cuatro patrones compartidos. El scroll se orquesta en FenixAnimations. */
export const fenixMotion = {
  micro: 0.22,
  text: 0.8,
  image: 1,
  tech: 0.7,
  camera: 0.9,
  ascent: 4.2,
  ease: "power3.out",
  scrub: 0.65,
} as const;

export const PRODUCT_SCROLL_EVENT = "fenix:product-scroll";
export const PRODUCT_REPLAY_EVENT = "fenix:product-replay";
