"use client";

import { useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import { vegaCopy } from "@/lib/vega/copy";
import { vegaData, PENDING, specificationValues } from "@/lib/vega/data";

const groups = vegaData.specs;

export function VegaSpecs() {
  const [tab, setTab] = useState(0);
  const list = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const group = groups[tab];
  const known = group.rows.filter((r) => specificationValues[r]).length;

  const go = (n: number) => {
    const next = (n + groups.length) % groups.length;
    setTab(next);
    (list.current?.children[next] as HTMLElement | undefined)?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (tab + (e.key === "ArrowRight" ? 1 : -1) + groups.length) % groups.length;
    go(next);
    (list.current?.children[next] as HTMLElement).focus();
  };
  const onTouchStart = (e: TouchEvent) => { touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };
  const onTouchEnd = (e: TouchEvent) => {
    const s = touch.current;
    touch.current = null;
    if (!s) return;
    const dx = e.changedTouches[0].clientX - s.x;
    const dy = e.changedTouches[0].clientY - s.y;
    if (Math.abs(dx) > 56 && Math.abs(dx) > Math.abs(dy) * 1.6) go(tab + (dx < 0 ? 1 : -1));
  };

  return (
    <section className="section vega-specs" id="especificaciones" aria-labelledby="vega-specs-title">
      <div className="vega-specs__intro">
        <p className="eyebrow">{vegaCopy.label_08_especificaciones}</p>
        <h2 id="vega-specs-title">{vegaCopy.vega_2}</h2>
        <h3>
          {vegaCopy.especificaciones}
          <br />
          {vegaCopy.tecnicas}
        </h3>
        <p className="vega-specs__note">{vegaCopy.informacion_tecnica_pendiente_de_validacion}</p>
        <a className="vega-specs__cta" href={vegaData.contactHref}>
          <span>
            <b>¿Necesitas la configuración exacta?</b>
            <small>Un asesor de Flytek te ayuda a definirla.</small>
          </span>
          <i aria-hidden="true">↗</i>
        </a>
      </div>

      <div className="vega-specs__body">
        <div className="vega-specs__tabs" role="tablist" aria-label="Categorías de especificaciones" ref={list} onKeyDown={onKey}>
          {groups.map((g, i) => (
            <button
              key={g.title}
              type="button"
              role="tab"
              id={`vega-spec-tab-${i}`}
              aria-selected={i === tab}
              aria-controls="vega-spec-panel"
              tabIndex={i === tab ? 0 : -1}
              className={i === tab ? "is-active" : ""}
              onClick={() => go(i)}
            >
              <span>0{i + 1}</span>
              {g.title}
            </button>
          ))}
        </div>

        <div
          id="vega-spec-panel"
          role="tabpanel"
          aria-labelledby={`vega-spec-tab-${tab}`}
          className="vega-specs__panel"
          key={group.title}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="vega-specs__meter" aria-label={`${known} de ${group.rows.length} valores de referencia`}>
            <div>
              {group.rows.map((r, i) => (
                <i key={r} className={specificationValues[r] ? "is-on" : ""} style={{ ["--r" as string]: i }} />
              ))}
            </div>
            <span>{known} de {group.rows.length} con valor de referencia</span>
          </div>
          <dl>
            {group.rows.map((label, i) => {
              const value = specificationValues[label];
              return (
                <div key={label} style={{ ["--r" as string]: i }} className={value ? "has-value" : ""}>
                  <dt>{label}</dt>
                  <dd className={value ? "" : "is-pending"}>{value ?? "Según configuración"}</dd>
                </div>
              );
            })}
          </dl>
          <p className="vega-specs__hint" aria-hidden="true">← desliza para cambiar de categoría →</p>
          <span className="sr-only">{PENDING}</span>
        </div>
      </div>
    </section>
  );
}