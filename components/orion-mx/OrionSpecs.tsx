"use client";

import { useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import { ArrowDown, FileText } from "lucide-react";
import { SPEC_PDF, SPEC_PDF_NAME, specTabs } from "@/lib/orion-mx/specs-data";


export default function OrionSpecs() {
  const [tab, setTab] = useState(0);
  const list = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const current = specTabs[tab];

  const go = (n: number) => {
    const next = (n + specTabs.length) % specTabs.length;
    setTab(next);
    const btn = list.current?.children[next] as HTMLElement | undefined;
    btn?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(tab + 1); (list.current?.children[(tab + 1) % specTabs.length] as HTMLElement).focus(); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(tab - 1); (list.current?.children[(tab - 1 + specTabs.length) % specTabs.length] as HTMLElement).focus(); }
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

  let row = 0;
  return (
    <section className="orion-specs" id="especificaciones" aria-labelledby="specs-title">
      <div className="orion-specs__intro">
        <div className="orion-section-tag orion-section-tag--light"><span>05</span> DATOS TÉCNICOS</div>
        <h2 id="specs-title">La precisión también se mide.</h2>
        <p>Configuración de referencia. Nuestro equipo puede ayudarte a definir la integración adecuada para tu operación.</p>

        <a className="orion-specs__download" href={SPEC_PDF} download={SPEC_PDF_NAME}>
          <span className="orion-specs__doc" aria-hidden="true"><FileText size={22} strokeWidth={1.4} /><i /><i /><i /></span>
          <span className="orion-specs__download-copy">
            <b>Descargar especificaciones</b>
            <small>Ficha técnica ORION MX · PDF · 10 páginas</small>
          </span>
          <span className="orion-specs__download-arrow" aria-hidden="true"><ArrowDown size={18} /></span>
        </a>
      </div>

      <div className="orion-specs__body">

        <div className="orion-specs__tabs" role="tablist" aria-label="Categorías de especificaciones" ref={list} onKeyDown={onKey}>
          {specTabs.map((t, i) => (
            <button key={t.id} role="tab" id={`spec-tab-${t.id}`} aria-selected={i === tab} aria-controls="spec-panel" tabIndex={i === tab ? 0 : -1} className={i === tab ? "is-active" : ""} onClick={() => go(i)} type="button">
              <span>{t.short}</span>{t.label}
            </button>
          ))}
        </div>

        <div id="spec-panel" role="tabpanel" aria-labelledby={`spec-tab-${current.id}`} className="orion-specs__panel" key={current.id} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          {current.sections.map((s, si) => (
            <div className="orion-specs__section" key={si}>
              {s.title && <h3>{s.title}</h3>}
              <dl>
                {s.items.map(([label, value]) => (
                  <div key={label} style={{ ["--r" as string]: row++ }}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
          <p className="orion-specs__hint" aria-hidden="true">← desliza para cambiar de categoría →</p>
        </div>
      </div>
    </section>
  );
}