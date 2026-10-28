"use client";

import { useEffect, useRef, useState } from "react";
import { orionMetrics } from "@/lib/orion-mx/data";
import { OrionInstrument } from "@/components/orion-mx/OrionInstruments";
import type { OrionPerfMode, OrionPerfSceneAPI } from "@/lib/orion-mx/perf-scene";

const CYCLE_MS = 5200;

function useCountUp(target: number, decimals: number, run: boolean) {
  const [shown, setShown] = useState(target);
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

export default function OrionPerformance() {
  const root = useRef<HTMLDivElement>(null);
  const host = useRef<HTMLDivElement>(null);
  const scene = useRef<OrionPerfSceneAPI | null>(null);
  const [ready, setReady] = useState(false);
  const [index, setIndex] = useState(0);
  const [variant, setVariant] = useState(orionMetrics[0].start ?? 0);
  const [inView, setInView] = useState(false);
  const [auto, setAuto] = useState(true);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [near, setNear] = useState(false);
  const metric = orionMetrics[index];
  const v = metric.variants[variant] ?? metric.variants[0];
  const number = useCountUp(v.value, v.decimals ?? 0, inView);

  useEffect(() => {
    setReduced(matchMedia("(prefers-reduced-motion: reduce)").matches);
    const element = root.current!;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    const ioNear = new IntersectionObserver(([e]) => { if (e.isIntersecting) setNear(true); }, { rootMargin: "1000px 0px" });
    io.observe(element);
    ioNear.observe(element);
    return () => { io.disconnect(); ioNear.disconnect(); };
  }, []);

  useEffect(() => {
    if (!near || scene.current || !host.current) return;
    let cancelled = false;
    void (async () => {
      try {
        const { createOrionPerfScene } = await import("@/lib/orion-mx/perf-scene");
        const api = await createOrionPerfScene(host.current!, {
          reduced: matchMedia("(prefers-reduced-motion: reduce)").matches,
          onReady: () => !cancelled && setReady(true),
          onError: () => undefined,
        });
        if (cancelled) { api.dispose(); return; }
        scene.current = api;
        api.mode(metric.id as OrionPerfMode);
      } catch { /* la sección conserva el espacio mientras el modelo no está disponible */ }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [near]);

  useEffect(() => { scene.current?.mode(metric.id as OrionPerfMode); }, [metric.id]);
  useEffect(() => { scene.current?.active(inView && !document.hidden); }, [inView, ready]);
  useEffect(() => () => { scene.current?.dispose(); scene.current = null; }, []);

  const cycling = auto && !paused && inView && !reduced;
  useEffect(() => {
    if (!cycling) return;
    const t = setTimeout(() => {
      const next = (index + 1) % orionMetrics.length;
      setVariant(orionMetrics[next].start ?? 0);
      setIndex(next);
    }, CYCLE_MS);
    return () => clearTimeout(t);
  }, [cycling, index]);

  const choose = (i: number) => {
    setAuto(false);
    setVariant(orionMetrics[i].start ?? 0);
    setIndex(i);
    if (matchMedia("(max-width: 900px)").matches) {
      const r = root.current?.getBoundingClientRect();
      if (r && (r.top < 70 || r.bottom > innerHeight)) scrollBy({ top: r.top - 70, behavior: "smooth" });
    }
  };

  return (
    <div
      className="orion-perf orion-reveal"
      id="rendimiento"
      ref={root}
      data-metric={metric.id}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="orion-perf__board">
        <div className="orion-perf__stage" aria-hidden="true">
          <div className={`orion-perf__frame${ready ? " is-3d" : ""}`}>
            <div ref={host} className="orion-perf__scene" />
            {/* Los resaltes se montan con la escena para iniciar sus animaciones sincronizados. */}
            {ready && (
              <>
                <span className="orion-perf__ov orion-perf__ov--autonomia"><i /><i /></span>
                <span className="orion-perf__ov orion-perf__ov--alcance"><i /><i /><i /></span>
                <span className="orion-perf__ov orion-perf__ov--viento"><i /><i /><i /></span>
                <span className="orion-perf__ov orion-perf__ov--peso"><i /><i /></span>
                <span className="orion-perf__ov orion-perf__ov--dimensiones"><i /><i /><em>86 cm</em></span>
              </>
            )}
          </div>
        </div>

        <div className="orion-perf__panel" aria-live="polite">
          <div className="orion-perf__gauge"><OrionInstrument id={metric.id} variant={variant} /></div>
          <div className="orion-perf__reading">
            <span className="orion-perf__label">{metric.label}</span>
            <div className="orion-perf__readout">
              {metric.prefix && <small>{metric.prefix}</small>}
              <strong>{number}</strong>
              <span>{metric.unit}</span>
            </div>
            {metric.variants.length > 1 && (
              <div className="orion-perf__variants" role="group" aria-label={`Lectura de ${metric.label}`}>
                {metric.variants.map((o, i) => (
                  <button key={o.label} type="button" aria-pressed={i === variant} className={i === variant ? "is-active" : ""} onClick={() => setVariant(i)}>{o.label}</button>
                ))}
              </div>
            )}
          </div>
          <p className="orion-perf__copy" key={metric.id}>{metric.text}</p>
        </div>
      </div>

      <div className="orion-perf__tabs" role="tablist" aria-label="Métricas de rendimiento">
        {orionMetrics.map((m, i) => {
          const top = m.variants[m.start ?? 0];
          return (
            <button key={m.id} type="button" role="tab" aria-selected={i === index} className={i === index ? "is-active" : ""} onClick={() => choose(i)}>
              <span className="orion-perf__tab-label">{m.label}</span>
              <strong>{m.prefix ? m.prefix + " " : ""}{top.value.toFixed(top.decimals ?? 0)} {m.unit}</strong>
              <i className={cycling && i === index ? "is-running" : ""} aria-hidden="true" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
