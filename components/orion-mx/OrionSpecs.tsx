"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import { ArrowDown, ArrowUpRight, FileText } from "lucide-react";
import { QUOTE_HREF, SPEC_PDF, SPEC_PDF_NAME, specTabs } from "@/lib/orion-mx/specs-data";

function Letters({ text, from = 0 }: { text: string; from?: number }) {
  let n = from;
  return (
    <>
      {text.split(" ").map((word, wordIndex) => (
        <span key={wordIndex} className="orion-specs__word" aria-hidden="true">
          {word.split("").map((character, characterIndex) => (
            <span key={characterIndex} className="orion-specs__ch" style={{ ["--i" as string]: n++ }}>{character}</span>
          ))}
          {" "}
        </span>
      ))}
    </>
  );
}

export default function OrionSpecs() {
  const root = useRef<HTMLElement>(null);
  const [tab, setTab] = useState(0);
  const [seen, setSeen] = useState(false);
  const list = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const current = specTabs[tab];

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      setSeen(entry.isIntersecting);
    }, { threshold: 0.25 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

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
    <section ref={root} className={"orion-specs" + (seen ? " is-in" : "")} id="especificaciones" aria-labelledby="specs-title">
      <div className="orion-specs__intro">
        <div className="orion-section-tag orion-section-tag--light">DATOS TÉCNICOS</div>
        <h2 id="specs-title" aria-label="La precisión también se mide.">
          <Letters text="La precisión" />
          <br />
          <Letters text="también se mide." from={11} />
        </h2>
        <p>Datos de la ficha técnica oficial. Nuestro equipo puede ayudarte a definir la integración adecuada para tu operación.</p>

        <div className="orion-specs__actions">
          <a className="orion-specs__download" href={SPEC_PDF} download={SPEC_PDF_NAME}>
            <span className="orion-specs__doc" aria-hidden="true"><FileText size={22} strokeWidth={1.4} /><i /><i /><i /></span>
            <span className="orion-specs__download-copy">
              <b>Descargar especificaciones</b>
              <small>Ficha técnica ORION MX · PDF · 1 página</small>
            </span>
            <span className="orion-specs__download-arrow" aria-hidden="true"><ArrowDown size={18} /></span>
          </a>
          <a className="orion-specs__quote" href={QUOTE_HREF}>Solicitar cotización <ArrowUpRight size={16} /></a>
        </div>
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