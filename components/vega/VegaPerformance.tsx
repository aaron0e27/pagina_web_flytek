"use client";

import { useEffect, useRef, useState } from "react";
import { vegaCopy } from "@/lib/vega/copy";
import { vegaData } from "@/lib/vega/data";
import { perfMetrics } from "@/lib/vega/performance-data";
import { VegaInstrument } from "@/components/vega/VegaInstruments";
import type { PerfMode, PerfSceneAPI } from "@/lib/vega/perf-scene";

const CYCLE_MS = 5200;

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
  const [near, setNear] = useState(false); // la escena 3D empieza a cargar antes de llegar
  const [auto, setAuto] = useState(true); // se detiene si la persona elige una métrica
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [variant, setVariant] = useState(0);
  const metric = perfMetrics[index];
  const v = metric.variants?.[variant] ?? metric;
  const number = useCountUp(v.value, v.decimals ?? 0, inView);

  useEffect(() => {
    setReduced(matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = root.current!;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    const ioNear = new IntersectionObserver(([e]) => { if (e.isIntersecting) setNear(true); }, { rootMargin: "1000px 0px" });
    ioNear.observe(el);
    return () => { io.disconnect(); ioNear.disconnect(); };
  }, []);

  // Modelo 3D del dron: se carga cuando la sección entra en pantalla.
  useEffect(() => {
    if (!near || scene.current || !host.current) return;
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
      } catch { /* se queda la foto */ }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [near]);

  useEffect(() => { scene.current?.mode(metric.id as PerfMode); }, [metric.id]);
  useEffect(() => { scene.current?.active(inView && !document.hidden); }, [inView, ready]);
  useEffect(() => () => { scene.current?.dispose(); scene.current = null; }, []);

  const cycling = auto && !paused && inView && !reduced;
  useEffect(() => {
    if (!cycling) return;
    const t = setTimeout(() => { setVariant(0); setIndex((i) => (i + 1) % perfMetrics.length); }, CYCLE_MS);
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
    setVariant(0);
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
        <p className="eyebrow">03 / RENDIMIENTO</p>
        <span className="eyebrow">{vegaCopy.datos_tecnicos}</span>
      </div>
      <h2 id="vega-perf-title" data-title-motion>
        {vegaCopy.la_capacidad}
        <br />
        <span className="muted">{vegaCopy.en_perspectiva}</span>
      </h2>

      <div className="vega-perf__app" ref={app}>
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
          <div className="vega-perf__top">
            <div className="vega-perf__gauge" data-instrument={metric.id}>
              <VegaInstrument id={metric.id} variant={variant} />
            </div>
            <div className="vega-perf__reading">
              <span className="vega-perf__label">0{index + 1} / {metric.label}</span>
              <div className="vega-perf__readout">
                {v.prefix && <small>{v.prefix}</small>}
                <strong>{number}</strong>
                <span>{metric.unit}</span>
              </div>
              {metric.variants && (
                <div className="vega-perf__variants" role="group" aria-label={`Variante de ${metric.label}`}>
                  {metric.variants.map((o, i) => (
                    <button key={o.label} type="button" aria-pressed={i === variant} className={i === variant ? "is-active" : ""} onClick={() => setVariant(i)}>
                      {o.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <p className="vega-perf__copy" key={metric.id}>{metric.text}</p>
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
      </div>
    </section>
  );
}
