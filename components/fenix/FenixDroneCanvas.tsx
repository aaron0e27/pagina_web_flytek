"use client";
import { useEffect, useRef, useState } from "react";
import { RotateCcw, Plus, Minus, Pause, Play } from "lucide-react";
import type { SceneAPI } from "@/lib/fenix/drone-scene";
import { fenixAssets } from "@/lib/fenix/assets";
import { PRODUCT_SCROLL_EVENT, PRODUCT_REPLAY_EVENT } from "@/lib/fenix/motion";
import { views, pointInfo, points } from "@/lib/fenix/viewer-data";
export default function FenixDroneCanvas({ arrival = false }: { arrival?: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const api = useRef<SceneAPI | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [view, setView] = useState("general");
  const [motionPaused, setMotionPaused] = useState(false);
  useEffect(() => {
    let disposed = false,
      inView = false,
      started = false;
    const el = host.current!;
    let progress = 0.5;
    const scroll = (event: Event) => {
      progress = (event as CustomEvent<number>).detail;
      api.current?.progress(progress);
    };
    const replay = () => api.current?.replay();
    if (arrival) {
      el.addEventListener(PRODUCT_SCROLL_EVENT, scroll);
      el.addEventListener(PRODUCT_REPLAY_EVENT, replay);
    }
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const start = async () => {
      if (started) return;
      started = true;
      try {
        const { createScene } = await import("@/lib/fenix/drone-scene");
        if (disposed) return;
        const scene = await createScene(el, {
          arrival,
          reduced: reduced.matches,
          onReady: () => !disposed && setReady(true),
          onError: () => !disposed && setError(true),
          onFocus: (id) => {
            setSelected(id);
            setView("");
          },
        });
        if (disposed) scene.dispose();
        else {
          api.current = scene;
          scene.progress(progress);
          scene.active(inView && !document.hidden);
        }
      } catch {
        if (!disposed) setError(true);
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) void start();
        api.current?.active(inView && !document.hidden);
      },
      { rootMargin: "1200px 0px" },
    );
    observer.observe(el);
    const visibility = () => api.current?.active(inView && !document.hidden);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      disposed = true;
      observer.disconnect();
      el.removeEventListener(PRODUCT_SCROLL_EVENT, scroll);
      el.removeEventListener(PRODUCT_REPLAY_EVENT, replay);
      document.removeEventListener("visibilitychange", visibility);
      api.current?.dispose();
      api.current = null;
    };
  }, [arrival]);
  const reset = () => {
    api.current?.view("general");
    setView("general");
    setSelected(null);
  };
  return (
    <div
      className={arrival ? "arrival-viewer" : "viewer-shell" + (selected ? " has-selection" : "")}
    >
      <div
        ref={host}
        className="scene"
        tabIndex={arrival ? -1 : 0}
        aria-label={
          arrival
            ? "Demostración de ascenso del modelo tridimensional de FÉNIX"
            : "Visor 3D. Arrastra para girar. Usa los botones de vista y zoom como alternativa."
        }
      >
        {(!ready || error) && (
          <div className="scene-fallback">
            <img
              src={fenixAssets.product}
              alt="FÉNIX — fotografía oficial"
              width="1800"
              height="894"
              loading="lazy"
            />
            {!arrival && (
              <p role="status">
                {error
                  ? "La vista 3D no está disponible en este dispositivo. Puedes seguir explorando las fotografías y especificaciones."
                  : "Cargando exploración 3D…"}
              </p>
            )}
          </div>
        )}
      </div>
      {arrival && ready && !error && (
        <button
          className="arrival-pause"
          aria-label={motionPaused ? "Reanudar animación del dron" : "Pausar animación del dron"}
          onClick={() => {
            api.current?.motion(motionPaused);
            setMotionPaused(!motionPaused);
          }}
        >
          {motionPaused ? <Play size={14} /> : <Pause size={14} />}
          <span>{motionPaused ? "Reanudar" : "Pausar"} animación</span>
        </button>
      )}
      {!arrival && (
        <>
          <div className="viewer-top">
            <span className="eyebrow">EXPLORACIÓN 360°</span>
            <span className="model-note">INTERACTIVO</span>
          </div>
          <div className="viewer-controls" aria-label="Vistas del modelo">
            {views.map(([id, label]) => (
              <button
                key={id}
                onClick={() => {
                  api.current?.view(id);
                  setView(id);
                  setSelected(null);
                }}
                disabled={!ready || error}
                aria-pressed={view === id}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="zoom-controls">
            <button
              aria-label="Acercar modelo"
              disabled={!ready || error}
              onClick={() => api.current?.zoom(0.8)}
            >
              <Plus size={18} />
            </button>
            <button
              aria-label="Alejar modelo"
              disabled={!ready || error}
              onClick={() => api.current?.zoom(1.25)}
            >
              <Minus size={18} />
            </button>
            <button aria-label="Volver a vista inicial" disabled={!ready || error} onClick={reset}>
              <RotateCcw size={17} />
            </button>
          </div>
          <div className="viewer-components" aria-label="Partes de FÉNIX">
            {points.map((point) => (
              <button
                key={point.id}
                type="button"
                disabled={!ready || error}
                aria-pressed={selected === point.id}
                onClick={() => api.current?.focus(point.id)}
              >
                <span>+</span>
                {point.name}
              </button>
            ))}
          </div>
          <div className="viewer-help">
             ARRASTRA. GIRA. DESCUBRE.
          </div>
          {selected && (
            <aside className="hotspot-info" aria-live="polite">
              <span className="eyebrow">EXPLORA EL COMPONENTE</span>
              <h3>{pointInfo[selected][0]}</h3>
              <p>{pointInfo[selected][1]}</p>
              <button onClick={reset}>
                Volver a vista general <RotateCcw size={14} />
              </button>
            </aside>
          )}
        </>
      )}
    </div>
  );
}
