import { ArrowDown } from "lucide-react";
import { fenixAssets } from "@/lib/fenix/assets";
import { fenixCopy } from "@/lib/fenix/data";
export default function FenixHero() {
  return (
    <section className="hero" id="descripcion">
      <div className="hero-topline">
        <span>{fenixCopy.hero.nomenclature}</span>
      </div>
      <h1>
        <span className="hero-word">FÉNIX</span>
      </h1>
      <div className="hero-product-stage">
        <img
          className="hero-product"
          src={fenixAssets.product}
          alt="FÉNIX: estructura blanca, cuatro brazos y cámara integrada"
          width="1800"
          height="894"
          fetchPriority="high"
        />
      </div>
      <div className="hero-bottom">
        <p>{fenixCopy.hero.headline}</p>
      </div>
      <a className="hero-discover" href="#caracteristicas">
        <span>{fenixCopy.hero.more}</span>
        <ArrowDown size={20} />
      </a>
    </section>
  );
}
