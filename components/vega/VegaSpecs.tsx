"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import { ArrowDown, FileText } from "lucide-react";
import { vegaData, SPEC_PDF, SPEC_PDF_NAME } from "@/lib/vega/data";

const groups = vegaData.specs;

/** Texto que aparece letra por letra al entrar en pantalla (cada palabra se mantiene unida). */
function Letters({ text, from = 0 }: { text: string; from?: number }) {
  let n = from;
  return (
    <>
      {text.split(" ").map((word, w) => (
        <span key={w} className="vega-ospecs__word" aria-hidden="true">
          {word.split("").map((ch, i) => (
            <span key={i} className="vega-ospecs__ch" style={{ ["--i" as string]: n++ }}>{ch}</span>
          ))}
          {" "}
        </span>
      ))}
    </>
  );
}

export function VegaSpecs() {
  const root = useRef<HTMLElement>(null);
  const [tab, setTab] = useState(0);
  const [seen, setSeen] = useState(false);
  const list = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const group = groups[tab];

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(root.current!);
    return () => io.disconnect();
  }, []);

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

  const l1 = "Especificaciones";
  const l2 = "técnicas.";

  return (
    <section ref={root} className={"vega-ospecs" + (seen ? " is-in" : "")} id="especificaciones" aria-labelledby="vega-specs-title">
      <div className="vega-ospecs__intro">
        <div className="vega-ospecs__tag"><span>07</span> DATOS TÉCNICOS</div>
        <h2 id="vega-specs-title" aria-label="Especificaciones técnicas.">
          <Letters text={l1} />
          <br />
          <Letters text={l2} from={l1.length} />
        </h2>
        <p>Datos de la ficha técnica oficial de VEGA. Nuestro equipo puede ayudarte a definir la configuración adecuada para tu operación.</p>

        <a className="vega-ospecs__download" href={SPEC_PDF} download={SPEC_PDF_NAME}>
          <span className="vega-ospecs__doc" aria-hidden="true"><FileText size={22} strokeWidth={1.4} /><i /><i /><i /></span>
          <span className="vega-ospecs__download-copy">
            <b>Descargar ficha técnica</b>
            <small>Ficha técnica VEGA · PDF</small>
          </span>
          <span className="vega-ospecs__download-arrow" aria-hidden="true"><ArrowDown size={18} /></span>
        </a>
      </div>

      <div className="vega-ospecs__body">
        <div className="vega-ospecs__tabs" role="tablist" aria-label="Categorías de especificaciones" ref={list} onKeyDown={onKey}>
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
          className="vega-ospecs__panel"
          key={group.title}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <dl>
            {group.rows.map(([label, value], i) => (
              <div key={label} style={{ ["--r" as string]: i }}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <p className="vega-ospecs__hint" aria-hidden="true">← desliza para cambiar de categoría →</p>
        </div>
      </div>
    </section>
  );
}
