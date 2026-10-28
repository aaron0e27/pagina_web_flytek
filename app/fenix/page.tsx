import type { Metadata } from "next";
import FenixTopNav from "@/components/fenix/FenixTopNav";
import FenixSubNav from "@/components/fenix/FenixSubNav";
import FenixHero from "@/components/fenix/FenixHero";
import FenixStats from "@/components/fenix/FenixStats";
import FenixIntro from "@/components/fenix/FenixIntro";
import Fenix3DViewer from "@/components/fenix/Fenix3DViewer";
import FenixDroneEntrance from "@/components/fenix/FenixDroneEntrance";
import FenixHorizontalStory from "@/components/fenix/FenixHorizontalStory";
import FenixPayloads from "@/components/fenix/FenixPayloads";
import FenixSpecs from "@/components/fenix/FenixSpecs";
import FenixSupport from "@/components/fenix/FenixSupport";
import SiteFooter from "@/components/shared/SiteFooter";
import FenixAnimations from "@/components/fenix/FenixAnimations";
import "@/styles/fenix.css";

export const metadata: Metadata = {
  title: "FÉNIX | Flytek Innovations",
  description:
    "Diseño, ingeniería y posibilidades de integración de la plataforma aérea FÉNIX de Flytek Innovations.",
};

export default function FenixPage() {
  return (
    <div className="fenix-page">
      <FenixAnimations />
      <a className="skip" href="#descripcion">
        Saltar al contenido
      </a>
      <FenixTopNav />
      <FenixSubNav />
      <main>
        <FenixHero />
        <FenixStats />
        <FenixIntro />
        <FenixHorizontalStory />
        <FenixDroneEntrance />
        <Fenix3DViewer />
        <FenixPayloads />
        <FenixSpecs />
        <FenixSupport />
      </main>
      <SiteFooter current="fenix" product="FÉNIX · Plataforma aérea industrial" backHref="#descripcion" />
    </div>
  );
}
