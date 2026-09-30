import { vegaCopy } from "@/lib/vega/copy";
import { vegaData, PENDING, specificationValues } from "@/lib/vega/data";
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
      <section className="section performance" id="rendimiento">
        <div className="section-head">
          <p className="eyebrow">{vegaCopy.label_04_rendimiento}</p>
          <span className="eyebrow">{vegaCopy.datos_tecnicos}</span>
        </div>
        <h2 data-title-motion>
          {vegaCopy.la_capacidad}
          <br />
          <span className="muted">{vegaCopy.en_perspectiva}</span>
        </h2>
        <div className="performance-stage">
          <img
            src={vegaData.assets.side}
            width="1440"
            height="920"
            loading="lazy"
            alt="Vista de VEGA para consultar su rendimiento"
          />
          <div className="performance-lines" aria-hidden="true" />
        </div>
        <div className="stats">
          {vegaData.stats.map((s, i) => (
            <div key={s.label} data-reveal>
              <span className="eyebrow">
                0{i + 1} / {s.label}
              </span>
              <p>{s.value}</p>
              <span className="pending">Según configuración</span>
            </div>
          ))}
        </div>
      </section>
      <section className="section technology" id="tecnologia">
        <div className="tech-heading">
          <p className="eyebrow">{vegaCopy.label_05_tecnologia}</p>
          <h2 data-reveal>
            {vegaCopy.una_vision}
            <br />
            {vegaCopy.del_sistema}
          </h2>
          <p>Configura VEGA a partir de la información que necesitas obtener.</p>
        </div>
        <div className="tech-diagram">
          <div className="tech-center">
            <span>{vegaCopy.vega_2}</span>
            <small>{vegaCopy.plataforma}</small>
          </div>
          {vegaData.technology.map((t, i) => (
            <div className="tech-row" key={t.label} data-reveal>
              <span className="tech-dot" />
              <span className="eyebrow">0{i + 1}</span>
              <div>
                <h3>{t.label}</h3>
                <p className="pending">{t.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
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
      <div className="application-mosaic">
        {vegaData.applications.map((a, i) => (
          <article key={a.title} data-reveal>
            <span className="eyebrow">
              0{i + 1}
              {vegaCopy.vega_3}
            </span>
            <img
              src={a.image}
              alt={a.title + ": imagen ilustrativa de la aplicación"}
              loading="lazy"
              width="1440"
              height="920"
            />
            <div>
              <h3>{a.title}</h3>
              <p className="pending">{a.description}</p>
              {a.sectorHref ? (
                <a href={a.sectorHref} className="text-link">
                  {vegaCopy.ver_sector}
                </a>
              ) : (
                <span className="sector-pending">
                  {vegaCopy.sector_por_definir}
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
export function VegaSpecs() {
  return (
    <section className="section specs-section" id="especificaciones">
      <div className="specs-title">
        <p className="eyebrow">{vegaCopy.label_08_especificaciones}</p>
        <h2>{vegaCopy.vega_2}</h2>
        <h3>
          {vegaCopy.especificaciones}
          <br />
          {vegaCopy.tecnicas}
        </h3>
        <p>{vegaCopy.informacion_tecnica_pendiente_de_validacion}</p>
      </div>
      <div className="specs-list">
        {vegaData.specs.map((group) => (
          <div key={group.title} data-reveal>
            <h3>{group.title}</h3>
            <dl>
              {group.rows.map((label) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{specificationValues[label] ?? PENDING}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </section>
  );
}
