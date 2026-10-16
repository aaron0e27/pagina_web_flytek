import type { Metadata } from "next";
import OrionPage from "@/components/orion-mx/OrionPage";
import "@/styles/orion.css";

export const metadata: Metadata = {
  title: "ORION | Flytek Innovations",
  description: "Plataforma aérea multipropósito de Flytek: hasta 50 minutos de vuelo, alcance de hasta 40 km y cargas útiles personalizables.",
};

export default function Page() {
  return <OrionPage />;
}
