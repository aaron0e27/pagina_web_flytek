import { vegaCopy } from "@/lib/vega/copy";
import { VegaApplicationsCollage } from "./VegaApplicationsCollage";
import { VegaPerformance } from "./VegaPerformance";
import { VegaTechnology } from "./VegaTechnology";
import { vegaData } from "@/lib/vega/data";
export function VegaStory() {
  return (
    <>
      <section className="section design-section" id="diseno">
        <div className="design-copy">
          <p className="eyebrow">{vegaCopy.label_03_diseno_y_construccion}</p>
          <h2 data-reveal>
            {vegaCopy.de_cerca}
            <br />
            {vegaCopy.sin_perder}
            <br />
            {vegaCopy.el_conjunto}
          </h2>
          <p>Una estructura plegable y distintas posibilidades de integración para acompañarte en interiores y exteriores.</p>
          <span className="eyebrow">
            {vegaCopy.vega_detalle_de_la_estructura}
          </span>
        </div>
        <div className="design-image" data-reveal>
          <img
            src={vegaData.assets.detail}
            alt="Detalle de la estructura del modelo VEGA"
            width="1440"
            height="920"
            loading="lazy"
          />
          <span className="detail-callout">
            {vegaCopy.label_01_detalle_por_definir}
          </span>
        </div>
      </section>

      <VegaPerformance />
      <VegaTechnology />
    </>
  );
}
export function VegaApplications() {
      return (
      <section className="section applications" id="aplicaciones">
      <div className="section-head" data-reveal>
        <p className="eyebrow">{vegaCopy.label_07_aplicaciones}</p>
        <span className="eyebrow">{vegaCopy.producto_operacion}</span>
      </div>
      <h2 data-reveal>{vegaCopy.el_siguiente_contexto}</h2>
      <p className="pending">
        {vegaCopy.aplicaciones_sectores_y_fotografias_de_operacion_por_definir}
      </p>
      <VegaApplicationsCollage />
    </section>
    );
  }
  
