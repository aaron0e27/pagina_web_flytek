import { ArrowUpRight, MoveHorizontal } from "lucide-react";
import { fenixAssets } from "@/lib/fenix/assets";
import { fenixKeyStats as stats } from "@/lib/fenix/data";
export default function FenixStats() {
  return (
    <section className="key-stats wrap" id="caracteristicas" aria-label="Características clave">
      <div className="stats-heading">
        <span className="section-index" data-motion="tech">
          CARACTERÍSTICAS CLAVE
        </span>
        <span>
          FÉNIX <ArrowUpRight size={16} />
        </span>
      </div>
      <div className="stats-mosaic">
        <article className="stat-endurance" data-motion="image">
          <img
            src={fenixAssets.studio}
            alt="Detalle de FÉNIX en composición de estudio"
            width="1672"
            height="941"
            loading="lazy"
          />
          <div className="stat-content">
            <span className="stat-label">{stats.endurance.label}</span>
            <strong data-motion="tech">
              {stats.endurance.value}
              <small>{stats.endurance.unit}</small>
            </strong>
            <p>{stats.endurance.detail}</p>
          </div>
        </article>
        <article className="stat-wind" data-motion="image">
          <div className="stat-content">
            <span className="stat-label">{stats.wind.label}</span>
            <strong data-motion="tech">
              {stats.wind.value}
              <small>{stats.wind.unit}</small>
            </strong>
            <p>{stats.wind.detail}</p>
          </div>
          <img
            src={fenixAssets.product}
            alt="FÉNIX, vista de la plataforma"
            width="1800"
            height="894"
            loading="lazy"
          />
        </article>
        <article className="stat-weight">
          <span className="stat-label">{stats.weight.label}</span>
          <strong data-motion="tech">
            {stats.weight.value}
            <small>{stats.weight.unit}</small>
          </strong>
          <span className="stat-rule" data-motion="line" aria-hidden="true" />
        </article>
        <article className="stat-length">
          <span className="stat-label">{stats.length.label}</span>
          <strong data-motion="tech">
            {stats.length.value}
            <small>{stats.length.unit}</small>
          </strong>
          <MoveHorizontal size={70} strokeWidth={1} aria-hidden="true" />
        </article>
      </div>
    </section>
  );
}
