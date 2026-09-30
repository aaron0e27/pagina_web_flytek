import type { Metadata } from "next";
import VegaPage from "@/components/vega/VegaPage";
import "@/styles/vega.css";

export const metadata: Metadata = {
  title: "VEGA | Flytek Innovations",
  description: "Conoce VEGA: estructura plegable, integración de cargas útiles y exploración interactiva de su modelo 3D.",
};
export default function Page() { return <VegaPage />;}
