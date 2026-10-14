import { preload } from "react-dom";
import { vegaCopy } from "@/lib/vega/copy";
import SiteHeader from "@/components/shared/SiteHeader";
import { SiteFooter } from "./SiteChrome";
import { VegaGallery } from "./VegaGallery";
import { VegaHero } from "./VegaHero";
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
import { vegaData, SPEC_PDF, SPEC_PDF_NAME } from "@/lib/vega/data";

export default function VegaPage() {
  // La imagen principal empieza a descargarse antes de que React termine de pintar la página.
  preload(vegaData.assets.hero, { as: "image", fetchPriority: "high" });
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
          <VegaViewer />
          <VegaPerformance />
          <VegaTechnology />
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
          <section className="contact section" id="contacto">
            <p className="eyebrow" data-reveal>
              08 / CONTACTO
            </p>
            <h2 data-reveal>{vegaData.cta.title}</h2>
            <div className="contact-bottom">
              <p>{vegaData.cta.description}</p>
              <div className="contact-actions">
                <a href={vegaData.contactHref} className="button">
                  {vegaData.cta.label}
                  <span>↗</span>
                </a>
                <a href={SPEC_PDF} download={SPEC_PDF_NAME} className="button button--ghost">
                  {vegaData.cta.secondary}
                  <span>↓</span>
                </a>
              </div>
            </div>
            <p className="contact-lines">
              <a href={`tel:${vegaData.phones[0].replace(/\s/g, "")}`}>{vegaData.phones[0]}</a>
              <a href={`tel:${vegaData.phones[1].replace(/\s/g, "")}`}>{vegaData.phones[1]}</a>
              <a href={`mailto:${vegaData.email}`}>{vegaData.email}</a>
            </p>
          </section>
          <VegaAnimations />
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
