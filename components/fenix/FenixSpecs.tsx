"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import { ArrowUpRight, FileText } from "lucide-react";
import { fenixSpecs as groups } from "@/lib/fenix/data";
import "@/styles/fenix-specs.css";



/** Texto que aparece letra por letra al entrar en pantalla (cada palabra se mantiene unida). */
function Letters({ text, from = 0 }: { text: string; from?: number }) {
  let n = from;
  return (
    <>
      {text.split(" ").map((word, w) => (
        <span key={w} className="fenix-specs__word" aria-hidden="true">
          {word.split("").map((ch, i) => (
            <span key={i} className="fenix-specs__ch" style={{ ["--i" as string]: n++ }}>{ch}</span>
          ))}
          {" "}
        </span>
      ))}
    </>
  );
}

export default function FenixSpecs() {
  const root = useRef<HTMLElement>(null);
  const [tab, setTab] = useState(0);
  const [seen, setSeen] = useState(false);
  const list = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const group = groups[tab];

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        setSeen(e.isIntersecting);
      },
      { threshold: 0.25 },
    );
    io.observe(root.current!);
    return () => io.disconnect();
  }, []);

  const go = (n: number) => {
    const next = (n + groups.length) % groups.length;
    setTab(next);
    (list.current?.children[next] as HTMLElement | undefined)?.scrollIntoView({ block: "nearest", inline: "center", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
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
    <section ref={root} className={"fenix-specs" + (seen ? " is-in" : "")} id="especificaciones" aria-labelledby="fenix-specs-title">
      <div className="fenix-specs__intro">
        <span className="fenix-specs__tag">FÉNIX EN DETALLE</span>
        <h2 id="fenix-specs-title" className="fenix-specs__scroll-title" aria-label="Especificaciones técnicas.">
          <Letters text={l1} />
          <br />
          <Letters text={l2} from={l1.length} />
        </h2>
        <p>Datos publicados por Flytek.<br />La configuración final se define contigo.</p>

        <a className="fenix-specs__download" href="https://www.flytek.com.mx/fenix_2.php" target="_blank" rel="noreferrer">
          <span className="fenix-specs__doc" aria-hidden="true"><FileText size={22} strokeWidth={1.4} /><i /><i /><i /></span>
          <span className="fenix-specs__download-copy">
            <b>Consultar fuente oficial</b>
          </span>
          <span className="fenix-specs__download-arrow" aria-hidden="true"><ArrowUpRight size={18} /></span>
        </a>
      </div>

      <div className="fenix-specs__body">
        <div className="fenix-specs__tabs" role="tablist" aria-label="Categorías de especificaciones" ref={list} onKeyDown={onKey}>
          {groups.map((g, i) => (
            <button
              key={g.name}
              type="button"
              role="tab"
              id={`fenix-spec-tab-${i}`}
              aria-selected={i === tab}
              aria-controls="fenix-spec-panel"
              tabIndex={i === tab ? 0 : -1}
              className={i === tab ? "is-active" : ""}
              onClick={() => go(i)}
            >
              <span>0{i + 1}</span>
              {g.name}
            </button>
          ))}
        </div>

        <div
          id="fenix-spec-panel"
          tabIndex={0}
          role="tabpanel"
          aria-labelledby={`fenix-spec-tab-${tab}`}
          className="fenix-specs__panel"
          key={group.name}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <dl>
            {group.items.map(([label, value], i) => (
              <div key={label} style={{ ["--r" as string]: i }}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <p className="fenix-specs__hint" aria-hidden="true">← desliza para cambiar de categoría →</p>
        </div>
      </div>
    </section>
  );
}
