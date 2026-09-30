import { fenixAssets } from "@/lib/fenix/assets";
import { fenixCopy } from "@/lib/fenix/data";
export default function FenixIntro() {
  return (
    <section className="intro" aria-labelledby="intro-title">
      <div className="intro-composition wrap">
        <div className="section-heading">
          <span className="section-index" data-motion="tech">
            {fenixCopy.intro.label}
          </span>
          <h2 id="intro-title" data-motion="text">
            {fenixCopy.intro.title}
          </h2>
        </div>
        <div className="intro-visual" data-motion="product">
          <img
            src={fenixAssets.product}
            alt="Vista frontal de FÉNIX integrada en la composición"
            width="1800"
            height="894"
            loading="lazy"
          />
        </div>
        <div className="intro-copy">
          <span className="editorial-rule" data-motion="line" aria-hidden="true" />
          <p>
            {fenixCopy.intro.description} <strong>{fenixCopy.intro.emphasis}</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
