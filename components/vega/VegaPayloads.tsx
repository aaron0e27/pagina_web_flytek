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
            alt={"Vista de VEGA para " + p.label + "; payload aún no definido"}
            width="1440"
            height="920"
            loading="lazy"
          />
          <svg
            viewBox="0 0 100 64"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d={`M ${p.anchor[0]} ${p.anchor[1] * 0.64} L 74 49 L 95 49`}
            />
            <circle cx={p.anchor[0]} cy={p.anchor[1] * 0.64} r=".8" />
          </svg>
          <span className="integration-label">
            {vegaCopy.integracion}
            <br />
            {vegaCopy.por_definir}
          </span>
        </div>
      </div>
    </section>
  );
}
