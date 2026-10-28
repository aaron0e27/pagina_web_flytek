import { preload } from "react-dom";
import { vegaCopy } from "@/lib/vega/copy";
import SiteHeader from "@/components/shared/SiteHeader";
import { VegaGallery } from "./VegaGallery";
import { VegaHero, VEGA_HERO_IMAGE } from "./VegaHero";
import { VegaSubNav } from "./VegaSubNav";
import { VegaAnimations } from "./VegaAnimations";
import { VegaViewer } from "./VegaViewer";
import { VegaStats } from "./VegaStats";
import { VegaPerformance } from "./VegaPerformance";
import { VegaTechnology } from "./VegaTechnology";
import { VegaPayloads } from "./VegaPayloads";
import { VegaSecurity } from "./VegaSecurity";
import { VegaSpecs } from "./VegaSpecs";
import { VegaService } from "./VegaService";
import SiteFooter from "@/components/shared/SiteFooter";

export default function VegaPage() {
  // La imagen principal empieza a descargarse antes de que React termine de pintar la página.
  preload(VEGA_HERO_IMAGE, { as: "image", fetchPriority: "high" });
  return (
    <>
      <SiteHeader />
      <div className="vega-redesign">
        <a href="#caracteristicas" className="skip-link">
          {vegaCopy.saltar_al_contenido}
        </a>
        <main id="vega-page">
          <VegaSubNav />
          <VegaHero />
          <VegaStats />
          <VegaPerformance />
          <VegaTechnology />
          <VegaViewer />
          <VegaPayloads />
          <VegaSecurity />
          <section className="section vega-field" id="galeria" aria-labelledby="vega-field-title">
            <div className="section-head" data-reveal>
              <p className="eyebrow">VEGA EN CAMPO</p>
              <span className="eyebrow">OPERACIÓN REAL</span>
            </div>
            <h2 id="vega-field-title" data-reveal>
              Así vuela
              <br />
              <span className="muted">VEGA.</span>
            </h2>
            <VegaGallery />
          </section>
          <VegaSpecs />
          <VegaService />
          <VegaAnimations />
        </main>
        <SiteFooter current="vega" product="VEGA · Plataforma aérea multipropósito" backHref="#descripcion" />
      </div>
    </>
  );
}
