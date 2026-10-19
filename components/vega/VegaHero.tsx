import { vegaCopy } from "@/lib/vega/copy";
import { vegaData } from "@/lib/vega/data";

export const VEGA_HERO_IMAGE = "/vega/images/vega-portada-cutout.webp";
export function VegaHero() {
  return (
    <section className="hero" id="descripcion" aria-labelledby="vega-title">
      <div className="hero-top">
        <span>{vegaCopy.flytek_plataformas}</span>
        <span>{vegaCopy.label_01_vega}</span>
      </div>
      <h1 id="vega-title">{vegaCopy.vega_2}</h1>
      <div className="hero-stage">
        <div className="orbit" />
        <img
          className="hero-product"
          src={VEGA_HERO_IMAGE}
          alt="Dron VEGA, vista frontal"
          width="1700"
          height="840"
          fetchPriority="high"
        />
      </div>
      <div className="hero-bottom">
        <p>{vegaData.tagline}</p>
        <span className="eyebrow">
          {vegaCopy.diseno_tecnologia_integracion}
        </span>
      </div>
      <div className="hero-rule" />
    </section>
  );
}
