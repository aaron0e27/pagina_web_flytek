"use client";

import { useEffect, useRef, useState } from "react";
import { vegaData } from "@/lib/vega/data";

function Count({ to, decimals = 0, run }: { to: number; decimals?: number; run: boolean }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setV(to); return; }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / 1100);
      setV(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, run]);
  return <>{v.toFixed(decimals)}</>;
}

export function VegaStats() {
  const root = useRef<HTMLElement>(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setRun(true); io.disconnect(); } }, { threshold: 0.4 });
    io.observe(root.current!);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={root} className="section vega-intro" id="caracteristicas" aria-label="VEGA en cifras">
      <div className="vega-intro__copy">
        <p className="eyebrow" data-reveal>01 / VEGA</p>
        <h2 data-title-motion>
          Una plataforma.
          <br />
          <span className="muted">Cada misión.</span>
        </h2>
        <p data-reveal>{vegaData.intro}</p>
        <a href="#contacto" className="text-link">
          Solicitar cotización <span>↘</span>
        </a>
      </div>
      <dl className="vega-intro__stats">
        {vegaData.stats.map((s) => (
          <div key={s.label}>
            <dt>{s.label}</dt>
            <dd>
              <strong><Count to={s.value} decimals={"decimals" in s ? s.decimals : 0} run={run} /></strong>
              <span>{s.unit}</span>
            </dd>
            <small>{s.note}</small>
          </div>
        ))}
      </dl>
    </section>
  );
}
