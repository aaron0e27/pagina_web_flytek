import { vegaCopy } from "@/lib/vega/copy";
import SiteHeader from "@/components/shared/SiteHeader";
import { SiteFooter } from "./SiteChrome";
import { VegaGallery } from "./VegaGallery";
import { VegaHero } from "./VegaHero";
import { VegaSubNav } from "./VegaSubNav";
import { VegaAnimations } from "./VegaAnimations";
import { VegaViewer } from "./VegaViewer";
import { VegaPayloads } from "./VegaPayloads";
import { VegaStory, VegaSpecs, VegaApplications } from "./VegaStory";
import { vegaData } from "@/lib/vega/data";
export default function VegaPage() {
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
        
        <section className="section features" id="caracteristicas">
          <div className="section-head" data-reveal>
            <p className="eyebrow">{vegaCopy.label_01_conoce_vega}</p>
            <span className="eyebrow">
              {vegaCopy.el_producto_en_primer_plano}
            </span>
          </div>
          <h2 data-title-motion>
            {vegaCopy.una_plataforma}
            <br />
            <span className="muted">{vegaCopy.cada_detalle_a_la_vista}</span>
          </h2>
        </section>
        <VegaGallery />
        <section className="intro section">
          <span className="eyebrow" data-reveal>
            {vegaCopy.observa_gira_descubre}
          </span>
          <h2 data-title-motion>
            {vegaCopy.conoce_vega}
            <br />
            {vegaCopy.desde_todos_los_angulos}
          </h2>
          <p data-reveal>
            {vegaCopy.explora_el_modelo_y_acercate_a_sus_detalles}
          </p>
          <a href="#explorador" className="text-link">
            {vegaCopy.explorar_en_3d}
            <span>↘</span>
          </a>
        </section>
        <VegaViewer />
        <div className="product-motion">
          <span data-title-motion>{vegaCopy.vega_en_detalle}</span>
          <img
            src={vegaData.assets.rear}
            alt="Vista del conjunto de VEGA"
            width="1440"
            height="920"
            loading="lazy"
          />
          <p className="eyebrow">{vegaCopy.de_la_vista_general_al_detalle}</p>
        </div>
        <VegaStory />
        <VegaPayloads />
        <VegaApplications />
        <VegaSpecs />
        <section className="contact section" id="contacto">
          <p className="eyebrow" data-reveal>
            {vegaCopy.el_siguiente_paso_flytek}
          </p>
          <h2 data-reveal>{vegaData.cta.title}</h2>
          <div className="contact-bottom">
            <p>{vegaData.cta.description}</p>
            <a href={vegaData.contactHref} className="button">
              {vegaData.cta.label}
              <span>↗</span>
            </a>
          </div>
        </section>
        <VegaAnimations />
      </main>
      <SiteFooter />
      </div>
    </>
  );
}
