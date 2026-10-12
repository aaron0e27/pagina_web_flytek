"use client";

import { useEffect, useRef, useState } from "react";
import { Minus, Plus, RotateCcw } from "lucide-react";
import { vegaCopy } from "@/lib/vega/copy";
import { vegaData } from "@/lib/vega/data";
import { vegaPoints } from "@/lib/vega/viewer-data";
import type { VegaSceneAPI } from "@/lib/vega/viewer-scene";

const views = [
  ["general", "General"],
  ["front", "Frontal"],
  ["top", "Superior"],
  ["side", "Lateral"],
] as const;

export function VegaViewer() {
  const section = useRef<HTMLElement>(null);
  const host = useRef<HTMLDivElement>(null);
  const scene = useRef<VegaSceneAPI | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [attempt, setAttempt] = useState(0);
  const [view, setView] = useState<(typeof views)[number][0]>("general");
  const [selected, setSelected] = useState<string | null>(null);
  const point = vegaPoints.find((p) => p.id === selected);

  useEffect(() => {
    const element = host.current;
    const root = section.current;
    if (!element || !root) return;
    let disposed = false;
    let visible = false;
    let started = false;
    const start = async () => {
      if (started) return;
      started = true;
      setError(false);
      try {
        const { createVegaScene } = await import("@/lib/vega/viewer-scene");
        if (disposed) return;
        const api = await createVegaScene(element, {
          reduced: matchMedia("(prefers-reduced-motion: reduce)").matches,
          onReady: () => !disposed && setReady(true),
          onError: () => !disposed && setError(true),
          onFocus: (id) => !disposed && (setSelected(id), setView("general")),
          onProgress: (p) => !disposed && setProgress(p),
        });
        if (disposed) api.dispose();
        else {
          scene.current = api;
          api.active(visible && !document.hidden);
        }
      } catch {
        if (!disposed) setError(true);
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) void start();
        scene.current?.active(visible && !document.hidden);
      },
      { rootMargin: "300px 0px" },
    );
    const onVisibility = () => scene.current?.active(visible && !document.hidden);
    observer.observe(root);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      disposed = true;
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      scene.current?.dispose();
      scene.current = null;
    };
  }, [attempt]);

  const reset = () => {
    scene.current?.view("general");
    setView("general");
    setSelected(null);
  };
  const retry = () => {
    scene.current?.dispose();
    scene.current = null;
    setReady(false);
    setProgress(0);
    setAttempt((n) => n + 1);
  };
  const off = !ready || error;

  return (
    <section ref={section} className="section vega-3d" id="explorador" aria-labelledby="vega-3d-title">
      <div className="section-head">
        <p className="eyebrow">{vegaCopy.label_02_explorador_interactivo}</p>
        <span className="eyebrow">Arrastra, gira y revisa la estructura.</span>
      </div>
      <h2 id="vega-3d-title">{vegaCopy.tu_punto_de_vista}</h2>

      <div className="vega-3d-shell">
        <div ref={host} className="vega-3d-scene" tabIndex={0}>
          {(!ready || error) && (
            <div className="vega-3d-fallback" role="status" aria-live="polite">
              <img src={vegaData.assets.hero} alt="" width="1440" height="920" />
              <span className="vega-3d-orbit" aria-hidden="true" />
              <p>
                {error
                  ? "El visor 3D no está disponible en este dispositivo."
                  : `Cargando modelo 3D… ${Math.round(progress)}%`}
              </p>
              {error && <button type="button" onClick={retry}>Reintentar carga</button>}
            </div>
          )}
        </div>

        <div className="vega-3d-badge">
          <span>MODELO WEB</span>
          <strong>VEGA</strong>
        </div>

        <div className="vega-3d-views" role="group" aria-label="Vistas del modelo">
          {views.map(([id, label]) => (
            <button
              key={id}
              type="button"
              disabled={off}
              aria-pressed={view === id}
              onClick={() => {
                scene.current?.view(id);
                setView(id);
                setSelected(null);
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="vega-3d-zoom">
          <button type="button" aria-label="Acercar modelo" disabled={off} onClick={() => scene.current?.zoom(0.82)}><Plus /></button>
          <button type="button" aria-label="Alejar modelo" disabled={off} onClick={() => scene.current?.zoom(1.2)}><Minus /></button>
          <button type="button" aria-label="Restablecer vista" disabled={off} onClick={reset}><RotateCcw /></button>
        </div>

        <p className="vega-3d-help">ARRASTRA PARA GIRAR · UTILIZA LOS BOTONES PARA ACERCAR</p>

        <div className="vega-3d-parts" aria-label="Componentes de VEGA">
          {vegaPoints.map((p) => (
            <button
              key={p.id}
              type="button"
              disabled={off}
              aria-pressed={selected === p.id}
              onClick={() => scene.current?.focus(p.id)}
            >
              <span>+</span>
              {p.name}
            </button>
          ))}
        </div>

        {point && (
          <aside className="vega-3d-info" aria-live="polite">
            <span>COMPONENTE VEGA</span>
            <h3>{point.name}</h3>
            <p>{point.description}</p>
            <button type="button" onClick={reset}>
              Volver a vista general <RotateCcw size={14} />
            </button>
          </aside>
        )}
      </div>

      <p className="vega-3d-note">
        Selecciona los puntos <strong>+</strong> para conocer cada componente y acercarte a esa zona.
      </p>
      <div className="sr-only">
        <p>{vegaCopy.tambien_puedes_explorar_vega_usando_los_botones_de}</p>
      </div>
    </section>
  );
}