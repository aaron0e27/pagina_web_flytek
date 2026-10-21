  import { ArrowDown } from "lucide-react";
  import { vegaCopy } from "@/lib/vega/copy";
  export const VEGA_HERO_IMAGE = "/vega/images/vega-portada-cutout.webp";
  export function VegaHero() {
    return (
      <section className="hero" id="descripcion" aria-labelledby="vega-title">
        <h1 id="vega-title">{vegaCopy.vega_2}</h1>
        <div className="hero-stage">
          <div className="orbit" />
          <img className="hero-product" src={VEGA_HERO_IMAGE} alt="Dron VEGA, vista frontal" width="1700" height="840" fetchPriority="high" />
        </div>
        <div className="hero-copy"><p>Plataforma aérea multipropósito.<br />Hasta 90 minutos de vuelo.</p></div>
        <a className="hero-more" href="#explorador"><span>CONOCER MÁS</span><ArrowDown size={20} /></a>
        <div className="hero-rule" />
      </section>
    );
  }