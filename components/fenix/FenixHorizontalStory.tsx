import { ArrowDown, ArrowRight, Radio, Signal, Battery, Navigation, Plus } from "lucide-react";
import { fenixAssets } from "@/lib/fenix/assets";
import { fenixStory as story, fenixKeyStats as stats } from "@/lib/fenix/data";
function PanelFooter({ label, index }: { label: string; index: number }) {
  return (
    <div className="panel-footer">
      <span>{label}</span>
      <span className="chapter-track" aria-hidden="true">
        <i style={{ transform: "scaleX(" + index / 4 + ")" }} />
      </span>
      <span>
        {String(index).padStart(2, "0")} / 04{" "}
        {index === 4 ? <ArrowDown size={16} /> : <ArrowRight size={16} />}
      </span>
    </div>
  );
}
export default function FenixHorizontalStory() {
  return (
    <div className="engineering" aria-label="Ingeniería de FÉNIX">
      <div className="engineering-track">
        <section className="engineering-panel design-panel" id="diseno" tabIndex={-1}>
          <div className="panel-copy">
            <span className="section-index" data-motion="tech">
              {story.design.label}
            </span>
            <h2 data-motion="text">
              {story.design.title[0]}
              <br />
              {story.design.title[1]}
            </h2>
            <p>{story.design.description}</p>
            <div className="material-data" data-motion="tech">
              <span>{story.design.detail}</span>
              <strong>
                {story.design.material[0]}
                <br />
                {story.design.material[1]}
              </strong>
              <i className="editorial-rule" data-motion="line" />
            </div>
          </div>
          <div className="design-photo">
            <img
              src={fenixAssets.product}
              alt="Detalle de la estructura y elementos de aterrizaje de FÉNIX"
              width="1800"
              height="894"
              loading="lazy"
            />
            <span className="detail-label">
              <Plus size={14} /> ESTRUCTURA Y CONSTRUCCIÓN
            </span>
          </div>
          <PanelFooter label="INGENIERÍA FÉNIX" index={1} />
        </section>
        <section className="engineering-panel performance-panel" id="rendimiento" tabIndex={-1}>
          <div className="performance-image" data-motion="image">
            <img
              src={fenixAssets.studio}
              alt="FÉNIX de frente en composición de estudio"
              width="1672"
              height="941"
              loading="lazy"
            />
          </div>
          <div className="panel-copy">
            <span className="section-index" data-motion="tech">
              {story.performance.label}
            </span>
            <h2 data-motion="text">
              {story.performance.title[0]}
              <br />
              {story.performance.title[1]}
            </h2>
            <div className="performance-numbers">
              {[stats.endurance, stats.wind].map((stat) => (
                <div key={stat.unit}>
                  <span className="editorial-rule" data-motion="line" />
                  <strong data-motion="tech">
                    {stat.value}
                    <small>{stat.unit}</small>
                  </strong>
                  <p>{stat.detail}</p>
                </div>
              ))}
            </div>
          </div>
          <PanelFooter label={story.performance.note} index={2} />
        </section>
        <section className="engineering-panel navigation-panel" id="tecnologia" tabIndex={-1}>
          <div className="panel-copy">
            <span className="section-index" data-motion="tech">
              {story.navigation.label}
            </span>
            <h2 data-motion="text">
              {story.navigation.title[0]}
              <br />
              {story.navigation.title[1]}
            </h2>
            <p>{story.navigation.description}</p>
            <div className="feature-lines">
              {story.navigation.features.map((item, index) => (
                <div key={item.title}>
                  <i className="feature-divider" data-motion="line" />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>
                    <strong>{item.title}</strong>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="navigation-visual">
            <img
              src={fenixAssets.product}
              alt="FÉNIX con cámara estabilizada"
              width="1800"
              height="894"
              loading="lazy"
            />
            <span className="nav-callout callout-one" data-motion="tech">
              CONTROL DE VUELO <i />
            </span>
            <span className="nav-callout callout-two" data-motion="tech">
              <i /> ESTABILIZACIÓN DE IMAGEN
            </span>
          </div>
          <PanelFooter label="TECNOLOGÍA FÉNIX" index={3} />
        </section>
        <section className="engineering-panel control-panel" id="control" tabIndex={-1}>
          <div className="control-top">
            <span className="section-index" data-motion="tech">
              {story.control.label}
            </span>
            <h2 data-motion="text">
              {story.control.title[0]}
              <br />
              {story.control.title[1]}
            </h2>
            <p>{story.control.description}</p>
          </div>
          <div className="connection-diagram">
            <div className="connection-drone">
              <img src={fenixAssets.product} alt="FÉNIX" width="1800" height="894" loading="lazy" />
              <span>PLATAFORMA AÉREA</span>
            </div>
            <div className="connection-path">
              <Radio size={24} />
              <span>{story.control.range}</span>
              <small>{story.control.conditions}</small>
              <div className="signal-rail" aria-hidden="true">
                <i className="signal-packet" />
              </div>
            </div>
            <div className="station">
              <div className="station-header">
                <span>ESTACIÓN DE CONTROL</span>
                <Signal size={16} />
              </div>
              <div className="station-content">
                <div className="station-reticle" aria-hidden="true">
                  <Plus size={25} strokeWidth={1} />
                </div>
                <p>
                  Información de vuelo
                  <br />a la vista.
                </p>
              </div>
              <div className="telemetry-labels">
                <span>
                  <Navigation size={13} /> Distancia
                </span>
                <span>
                  <Signal size={13} /> Señal
                </span>
                <span>
                  <Battery size={13} /> Batería
                </span>
              </div>
              <small>Representación de interfaz</small>
            </div>
          </div>
          <PanelFooter label="CONTROL Y COMUNICACIÓN EN TIEMPO REAL" index={4} />
        </section>
      </div>
    </div>
  );
}
