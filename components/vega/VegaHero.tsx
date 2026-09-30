import { vegaCopy } from "@/lib/vega/copy";
import { vegaData } from "@/lib/vega/data";
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
          src={vegaData.assets.hero}
          alt="VEGA: vista de tres cuartos del modelo original"
          width="1440"
          height="920"
          fetchPriority="high"
        />
      </div>
      <span className="hero-marker">
        ＋<br />
        {vegaCopy.plataforma_vega}
        <br />
        {vegaCopy.vista_general}
      </span>
      <div className="hero-bottom">
        <p>{vegaData.tagline}</p>
        <a className="button" href="#caracteristicas">
          {vegaCopy.conocer_vega}
          <span>↓</span>
        </a>
        <span className="eyebrow">
          {vegaCopy.diseno_tecnologia_integracion}
        </span>
      </div>
      <div className="hero-rule" />
    </section>
  );
}
