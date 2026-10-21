"use client";

import { useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import { ArrowDown, ArrowUpRight, ExternalLink, FileText } from "lucide-react";
import "@/styles/drone-specs.css";
import { OFFICIAL_HREF, QUOTE_HREF, SPEC_PDF, SPEC_PDF_NAME, specTabs } from "@/lib/fenix/specs-data";

export default function FenixSpecs() {
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
    <section className="dspec" id="especificaciones" aria-labelledby="fenix-specs-title">
      <div className="dspec__intro">
        <div className="dspec-tag dspec-tag--light"><span>FT</span> DATOS TÉCNICOS</div>
        <h2 id="fenix-specs-title">La precisión también se mide.</h2>
        <p>Datos publicados por Flytek. La configuración final de tu FÉNIX se define contigo, de acuerdo con tu operación.</p>

        <div className="dspec__actions">
          {SPEC_PDF ? (
            <a className="dspec__download" href={SPEC_PDF} download={SPEC_PDF_NAME}>
              <span className="dspec__doc" aria-hidden="true"><FileText size={22} strokeWidth={1.4} /><i /><i /><i /></span>
              <span className="dspec__download-copy">
                <b>Descargar especificaciones</b>
                <small>Ficha técnica FÉNIX · PDF</small>
              </span>
              <span className="dspec__download-arrow" aria-hidden="true"><ArrowDown size={18} /></span>
            </a>
          ) : (
            <a className="dspec__download" href={OFFICIAL_HREF} target="_blank" rel="noreferrer">
              <span className="dspec__doc" aria-hidden="true"><FileText size={22} strokeWidth={1.4} /><i /><i /><i /></span>
              <span className="dspec__download-copy">
                <b>Consultar ficha oficial</b>
                <small>FÉNIX · flytek.com.mx</small>
              </span>
              <span className="dspec__download-arrow" aria-hidden="true"><ExternalLink size={17} /></span>
            </a>
          )}
          <a className="dspec__quote" href={QUOTE_HREF}>Solicitar cotización <ArrowUpRight size={16} /></a>
        </div>
      </div>

      <div className="dspec__body">
        <div className="dspec__tabs" role="tablist" aria-label="Categorías de especificaciones" ref={list} onKeyDown={onKey}>
          {specTabs.map((t, i) => (
            <button key={t.id} role="tab" id={`fenix-spec-tab-${t.id}`} aria-selected={i === tab} aria-controls="fenix-spec-panel" tabIndex={i === tab ? 0 : -1} className={i === tab ? "is-active" : ""} onClick={() => go(i)} type="button">
              <span>{t.short}</span>{t.label}
            </button>
          ))}
        </div>

        <div id="fenix-spec-panel" role="tabpanel" aria-labelledby={`fenix-spec-tab-${current.id}`} className="dspec__panel" key={current.id} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          {current.sections.map((s, si) => (
            <div className="dspec__section" key={si}>
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
          <p className="dspec__hint" aria-hidden="true">← desliza para cambiar de categoría →</p>
        </div>
      </div>
    </section>
  );
}
