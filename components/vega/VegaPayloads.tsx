"use client";

import { useState } from "react";
import { payloads } from "@/lib/vega/payloads-data";
import { vegaData } from "@/lib/vega/data";

export function VegaPayloads() {
  const [selected, setSelected] = useState(0);
  const p = payloads[selected];
  return (
    <section id="cargas" className="section vega-pay" aria-labelledby="vega-pay-title">
      <div className="section-head" data-reveal>
        <p className="eyebrow">CARGAS ÚTILES</p>
        <span className="eyebrow">COMPATIBLES CON VEGA</span>
      </div>
      <h2 id="vega-pay-title" data-reveal>
        Elige la carga
        <br />
        <span className="muted">para tu misión.</span>
      </h2>

      <div className="vega-pay__cards" role="tablist" aria-label="Cargas útiles compatibles">
        {payloads.map((item, i) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`vega-pay-tab-${i}`}
            aria-selected={i === selected}
            aria-controls="vega-pay-panel"
            className={i === selected ? "is-active" : ""}
            onClick={() => setSelected(i)}
          >
            <span className="vega-pay__thumb">
              <img src={item.image} alt="" loading="lazy" decoding="async" />
            </span>
            <span className="vega-pay__n">0{i + 1}</span>
            <span className="vega-pay__name">{item.short}</span>
          </button>
        ))}
      </div>

      <div
        id="vega-pay-panel"
        role="tabpanel"
        aria-labelledby={`vega-pay-tab-${selected}`}
        className="vega-pay__panel"
        key={p.id}
      >
        <div className="vega-pay__image">
          <img src={p.image} alt={p.alt} loading="lazy" decoding="async" />
        </div>
        <div className="vega-pay__info" aria-live="polite">
          <span className="eyebrow">0{selected + 1} / {p.use}</span>
          <h3>{p.label}</h3>
          <p>{p.description}</p>
          <ul>
            {p.chips.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <a className="vega-pay__quote" href={vegaData.contactHref}>
            Cotizar esta configuración <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      <p className="vega-pay__note">Todas las cargas se integran con VEGA hasta 1.5 kg sugeridos. ¿Necesitas otra? Cuéntanos tu misión.</p>
    </section>
  );
}
