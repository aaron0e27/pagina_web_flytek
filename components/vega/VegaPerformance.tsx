"use client";

import { useEffect, useRef, useState } from "react";
import { vegaCopy } from "@/lib/vega/copy";
import { vegaData } from "@/lib/vega/data";
import { perfMetrics } from "@/lib/vega/performance-data";
import type { PerfMode, PerfSceneAPI } from "@/lib/vega/perf-scene";

const CYCLE_MS = 5200;
const TICKS = Array.from({ length: 45 }, (_, i) => i);

function useCountUp(target: number, decimals: number, run: boolean) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setShown(target); return; }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / 900);
      setShown(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run]);
  return shown.toFixed(decimals);
}

export function VegaPerformance() {
  const root = useRef<HTMLElement>(null);
  const app = useRef<HTMLDivElement>(null);
  const host = useRef<HTMLDivElement>(null);
  const scene = useRef<PerfSceneAPI | null>(null);
  const [ready, setReady] = useState(false);
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [auto, setAuto] = useState(true); // se detiene si la persona elige una métrica
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const metric = perfMetrics[index];
  const number = useCountUp(metric.value, metric.decimals ?? 0, inView);

  useEffect(() => {
    setReduced(matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = root.current!;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

    // Modelo 3D del dron: se carga cuando la sección entra en pantalla.
  useEffect(() => {
    if (!inView || scene.current || !host.current) return;
    let cancelled = false;
    (async () => {
      try {
        const { createPerfScene } = await import("@/lib/vega/perf-scene");
        const api = await createPerfScene(host.current!, {
          reduced: matchMedia("(prefers-reduced-motion: reduce)").matches,
          onReady: () => !cancelled && setReady(true),
          onError: () => undefined, // si falla se queda la foto
        });
        if (cancelled) { api.dispose(); return; }
        scene.current = api;
        api.mode(metric.id as PerfMode);
        api.active(true);
      } catch { /* se queda la foto */ }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  useEffect(() => { scene.current?.mode(metric.id as PerfMode); }, [metric.id]);
  useEffect(() => { scene.current?.active(inView && !document.hidden); }, [inView]);
  useEffect(() => () => { scene.current?.dispose(); scene.current = null; }, []);
  const cycling = auto && !paused && inView && !reduced;
  useEffect(() => {
    if (!cycling) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % perfMetrics.length), CYCLE_MS);
    return () => clearTimeout(t);
  }, [cycling, index]);

    // En celular, al elegir una métrica se mantiene todo el tablero a la vista.
  const keepInView = () => {
    if (!matchMedia("(max-width: 900px)").matches) return;
    const r = app.current?.getBoundingClientRect();
    if (!r) return;
    const top = 70;
    const bottom = innerHeight - 12;
    if (r.top < top) scrollBy({ top: r.top - top, behavior: "smooth" });
    else if (r.bottom > bottom) scrollBy({ top: Math.min(r.bottom - bottom, r.top - top), behavior: "smooth" });
  };

  const choose = (i: number) => {
    setAuto(false);
    setIndex(i);
    keepInView();
  };

  return (
    <section
      ref={root}
      className="section vega-perf"
      id="rendimiento"
      data-metric={metric.id}
      aria-labelledby="vega-perf-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="section-head">
        <p className="eyebrow">{vegaCopy.label_04_rendimiento}</p>
        <span className="eyebrow">{vegaCopy.datos_tecnicos}</span>
      </div>
      <h2 id="vega-perf-title" data-title-motion>
        {vegaCopy.la_capacidad}
        <br />
        <span className="muted">{vegaCopy.en_perspectiva}</span>
      </h2>

      <div className="vega-perf__app" ref={app}></div>

      <div className="vega-perf__board">
        <div className="vega-perf__stage" aria-hidden="true">
        <div className={`vega-perf__frame${ready ? " is-3d" : ""}`}>
            <img src={vegaData.assets.side} width="1440" height="920" loading="lazy" alt="" />
            <div ref={host} className="vega-perf__scene" />
            {/* Resaltes por métrica: se muestran según data-metric */}
            <span className="vega-perf__ov vega-perf__ov--autonomia"><i /><i /></span>
            <span className="vega-perf__ov vega-perf__ov--viento"><i /><i /><b /><b /><b /></span>
            <span className="vega-perf__ov vega-perf__ov--peso"><i /><i /></span>
            <span className="vega-perf__ov vega-perf__ov--longitud"><i /><em>{perfMetrics[3].value} m</em></span>
          </div>
          <span className="vega-perf__corner vega-perf__corner--a" />
          <span className="vega-perf__corner vega-perf__corner--b" />
        </div>

        <div className="vega-perf__panel" aria-live="polite">
          <div className="vega-perf__gauge">
            <svg viewBox="0 0 240 240" aria-hidden="true">
              <g className="vega-perf__ticks">
                {TICKS.map((t) => (
                  <line key={t} x1="120" y1="14" x2="120" y2={t % 5 === 0 ? 26 : 21} transform={`rotate(${-135 + t * (270 / 44)} 120 120)`} />
                ))}
              </g>
              <circle className="vega-perf__track" cx="120" cy="120" r="88" />
              <circle key={metric.id} className="vega-perf__arc" cx="120" cy="120" r="88" />
            </svg>
            <div className="vega-perf__readout">
              {metric.prefix && <small>{metric.prefix}</small>}
              <strong>{number}</strong>
              <span>{metric.unit}</span>
            </div>
          </div>
          <div className="vega-perf__copy" key={metric.id}>
            <span className="eyebrow">0{index + 1} / {metric.label}</span>
            <p>{metric.text}</p>
            <span className="vega-perf__note">Según configuración</span>
          </div>
        </div>
      </div>

      <div className="vega-perf__tabs" role="tablist" aria-label="Métricas de rendimiento">
        {perfMetrics.map((m, i) => (
          <button
            key={m.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            className={i === index ? "is-active" : ""}
            onClick={() => choose(i)}
          >
            <span className="vega-perf__tab-index">0{i + 1}</span>
            <span className="vega-perf__tab-label">{m.label}</span>
            <strong>{m.prefix ? m.prefix + " " : ""}{m.value.toFixed(m.decimals ?? 0)} {m.unit}</strong>
            <i className={cycling && i === index ? "is-running" : ""} aria-hidden="true" />
          </button>
        ))}
      </div>
    </section>
  );
}