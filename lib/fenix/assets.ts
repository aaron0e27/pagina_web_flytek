/**
 * Todos estos archivos están incluidos: no se descargan assets externos en runtime.
 * Reemplaza las rutas para integrar tus propios recursos.
 * El modelo 3D de FÉNIX se mantiene local para evitar dependencias externas en runtime.
 */
export const fenixAssets = {
  logo: "/fenix/media/logo.webp",
  product: "/fenix/media/fenix.webp",
  front: "/fenix/media/front.webp",
  studio: "/fenix/media/studio.webp",
  construction: "/fenix/media/construction.webp",
  inspection: "/fenix/media/inspection.webp",
  thermal: "/fenix/media/thermal.webp",
  video: "/fenix/media/hero.mp4",
  model: "/fenix/media/fenix.glb",
  placeholder: "/fenix/media/placeholder.svg",
} as const;

export function payloadAsset(name: string): string {
  const images: Record<string, string> = {
    "payload-thermal": "/fenix/media/payload-thermal.webp",
    "payload-dual": "/fenix/media/payload-dual.webp",
    "payload-zoom": "/fenix/media/payload-zoom.webp",
  };
  return images[name] || fenixAssets.placeholder;
}
