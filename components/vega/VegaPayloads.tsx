"use client";
import { vegaCopy } from "@/lib/vega/copy";

import { useState } from "react";
import { payloads } from "@/lib/vega/viewer-data";
export function VegaPayloads() {
  const [selected, setSelected] = useState(0);
  const p = payloads[selected];
  return (
    <section id="payloads" className="section payload-section">
      <div className="section-head" data-reveal>
        <p className="eyebrow">{vegaCopy.label_06_payloads_e_integracion}</p>
        <span className="eyebrow">{vegaCopy.configuracion_por_definir}</span>
      </div>
      <h2 data-reveal>
        {vegaCopy.un_punto_de_partida}
        <br />
        <span className="muted">{vegaCopy.tu_configuracion}</span>
      </h2>
      <div className="payload-layout">
        <div className="payload-select">
          <p className="eyebrow">{vegaCopy.explora_la_integracion}</p>
          <div role="group" aria-label="Opciones de payload provisionales">
            {payloads.map((item, i) => (
              <button
                key={item.id}
                aria-pressed={selected === i}
                onClick={() => setSelected(i)}
              >
                <span>0{i + 1}</span>
                {item.label}
                <span>↗</span>
              </button>
            ))}
          </div>
          <div className="payload-description" aria-live="polite">
            <h3>{p.label}</h3>
            <p className="pending">{p.description}</p>
            <small>
              {
                vegaCopy.compatibilidad_y_ubicacion_de_integracion_pendientes_de_confirmar
              }
            </small>
          </div>
        </div>
        <div className="payload-visual">
          <img
            key={p.image}
            src={p.image}
            alt={p.alt}
            width="1440"
            height="920"
            loading="lazy"
            decoding="async"
            style={{ objectFit: p.fit, objectPosition: p.position }}
          />
        </div>
      </div>
    </section>
  );
}
