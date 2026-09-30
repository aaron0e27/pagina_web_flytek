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
import FenixContact from "@/components/fenix/FenixContact";
import FenixFooter from "@/components/fenix/FenixFooter";
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
        <Fenix3DViewer />
        <FenixDroneEntrance />
        <FenixHorizontalStory />
        <FenixPayloads />
        <FenixSpecs />
        <FenixSupport />
        <FenixContact />
      </main>
      <FenixFooter />
    </div>
  );
}
