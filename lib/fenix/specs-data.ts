// Especificaciones de FÉNIX. Edita aquí la sección de datos técnicos.
// Cuando exista la ficha técnica en PDF, copia el archivo a /public/fenix/ y pon su ruta en SPEC_PDF.
import { fenixSpecs } from "@/lib/fenix/data";

export const SPEC_PDF: string | null = null; // p. ej. "/fenix/Flytek_Fenix_Ficha_Tecnica.pdf"
export const SPEC_PDF_NAME = "Flytek_Fenix_Ficha_Tecnica.pdf";
export const OFFICIAL_HREF = "https://www.flytek.com.mx/fenix_2.php";
export const QUOTE_HREF = "mailto:info@flytek.com.mx?subject=Cotizaci%C3%B3n%20F%C3%89NIX";

export type SpecSection = { title?: string; items: [string, string][] };
export type SpecTab = { id: string; label: string; short: string; sections: SpecSection[] };

const labels = ["Construcción", "Rendimiento", "Navegación", "Payloads"];

export const specTabs: SpecTab[] = fenixSpecs.map((group, i) => ({
  id: ["construccion", "rendimiento", "navegacion", "payloads"][i] ?? `grupo-${i}`,
  label: labels[i] ?? group.name,
  short: String(i + 1).padStart(2, "0"),
  sections: [{ items: group.items as [string, string][] }],
}));
