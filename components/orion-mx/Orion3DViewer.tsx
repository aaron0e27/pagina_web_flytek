"use client";

import { useEffect, useRef, useState } from "react";
import { Minus, Plus, RotateCcw } from "lucide-react";
import type { InteractiveDroneSceneAPI } from "@/lib/orion-mx/interactive-scene";
import { orionPoints } from "@/lib/orion-mx/viewer-data";


const views = [
  ["general", "General"],
  ["front", "Frontal"],
  ["top", "Superior"],
  ["side", "Lateral"],
] as const;

export default function Orion3DViewer() {
  const host = useRef<HTMLDivElement>(null);
  const scene = useRef<InteractiveDroneSceneAPI | null>(null);
  const [interactive, setInteractive] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);
  const [view, setView] = useState<(typeof views)[number][0]>("general");
  const [selected, setSelected] = useState<string | null>(null);
  const selectedPoint = orionPoints.find((point) => point.id === selected);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let disposed = false;
    let visible = false;
    let started = false;
    const start = async () => {
      if (started) return;
      started = true;
      try {
        const { createOrionScene } = await import("@/lib/orion-mx/drone-scene");
        if (disposed) return;
        const api = await createOrionScene(element, {
          reduced: matchMedia("(prefers-reduced-motion: reduce)").matches,
          onReady: () => !disposed && setReady(true),
          onError: () => !disposed && setError(true),
          onFocus: (id) => !disposed && setSelected(id),
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
    void start();
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) void start();
        scene.current?.active(visible && !document.hidden);
      },
      { rootMargin: "120px" },
    );
    const visibility = () => scene.current?.active(visible && !document.hidden);
    observer.observe(element);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      disposed = true;
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      scene.current?.dispose();
      scene.current = null;
    };
  }, []);


  const reset = () => {
    scene.current?.view("general");
    setView("general");
    setSelected(null);
  };

  return (
    <section className="orion-3d wrap" id="explorar-3d" aria-labelledby="orion-3d-title">
      <div className="orion-section-head">
        <span>02 / EXPLORACIÓN 3D</span>
        <p>Arrastra, gira y revisa la estructura.</p>
      </div>
      <div className="orion-3d-heading" data-orion-reveal>
        <h2 id="orion-3d-title">
          ORION desde
          <br />
          <em>cada ángulo.</em>
        </h2>
        <p>
          El modelo tridimensional de ORION, presentado con iluminación y movimiento interactivo.
        </p>
      </div>
      <div className="orion-3d-shell">
        <div ref={host} className="orion-3d-scene" tabIndex={0}>
          {(!ready || error) && (
            <div className="orion-3d-fallback" role="status" aria-live="polite">
              <span className="model-loading-orbit" aria-hidden="true" />
              <p>
                {error
                  ? "El visor 3D no está disponible en este dispositivo."
                  : "Cargando modelo 3D…"}
              </p>
            </div>
          )}
        </div>
        <div className="orion-3d-badge">
          <span>MODELO WEB</span>
          <strong>ORION MX</strong>
        </div>
        <div className="orion-3d-views" aria-label="Vistas del modelo">
          {views.map(([id, label]) => (
            <button
              key={id}
              disabled={!ready || error}
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
        <div className="orion-3d-zoom">
          <button
            aria-label="Acercar modelo"
            disabled={!ready || error}
            onClick={() => scene.current?.zoom(0.82)}
          >
            <Plus />
          </button>
          <button
            aria-label="Alejar modelo"
            disabled={!ready || error}
            onClick={() => scene.current?.zoom(1.2)}
          >
            <Minus />
          </button>
          <button aria-label="Restablecer vista" disabled={!ready || error} onClick={reset}>
            <RotateCcw />
          </button>
        </div>
        <p className="orion-3d-help">ARRASTRA PARA GIRAR · UTILIZA LOS BOTONES PARA ACERCAR</p>
        <div className="drone-component-list" aria-label="Componentes de ORION">
          {orionPoints.map((point) => (
            <button
            key={point.id}
            type="button"
            aria-pressed={selected === point.id}
            onClick={() => {
            scene.current?.focus(point.id);
        setSelected(point.id);
      }}
    >
      <span>+</span>
      {point.name}
    </button>
  ))}
</div>
        {selectedPoint && (
          <aside className="drone-hotspot-info" aria-live="polite">
            <span>COMPONENTE ORION</span>
            <h3>{selectedPoint.name}</h3>
            <p>{selectedPoint.description}</p>
            <button onClick={reset}>Volver a vista general <RotateCcw size={14} /></button>
          </aside>
        )}
      </div>
      <p className="orion-model-note">
        Selecciona los puntos <strong>+</strong> para conocer cada componente y acercarte a esa zona.
      </p>
    </section>
  );
}
