"use client";
import { vegaCopy } from "@/lib/vega/copy";

import { useEffect, useRef, useState } from "react";

import { vegaData } from "@/lib/vega/data";
import { viewerData } from "@/lib/vega/viewer-data";
import type { SceneController } from "./VegaDroneScene";
export function VegaViewer() {
  const root = useRef<HTMLDivElement>(null);
  const mount = useRef<HTMLDivElement>(null);
  const api = useRef<SceneController | null>(null);
  const markers = useRef<(HTMLButtonElement | null)[]>([]);
  const [status, setStatus] = useState<
    "waiting" | "loading" | "ready" | "error"
  >("waiting");
  const [progress, setProgress] = useState(0);
  const [active] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [view, setView] = useState("general");
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let cancelled = false;
    let began = false;
    const abort = new AbortController();
    let controller: SceneController | null = null;
    const observer = new IntersectionObserver(
      async (entries) => {
        if (!entries[0]?.isIntersecting || began) return;
        began = true;
        setStatus("loading");
        try {
          const { createDroneScene } = await import("./VegaDroneScene");
          if (cancelled) return;
          controller = await createDroneScene(
            mount.current!,
            markers.current,
            (percent) => {
              if (!cancelled) setProgress(percent);
            },
            () => {
              if (!cancelled) setStatus("error");
            },
            abort.signal,
          );
          if (cancelled) {
            controller.dispose();
            return;
          }
          api.current = controller;
          setStatus("ready");
        } catch {
          if (!cancelled) setStatus("error");
        }
      },
      { rootMargin: "300px" },
    );
    if (root.current) observer.observe(root.current);
    return () => {
      cancelled = true;
      abort.abort();
      observer.disconnect();
      controller?.dispose();
      api.current = null;
    };
  }, [attempt]);
  useEffect(() => {
    api.current?.setInteractive(active);
  }, [active, status]);
  function chooseView(id: string) {
    setView(id);
    setSelected(null);
    api.current?.view(id);
  }
  function chooseHotspot(i: number) {
    setSelected(viewerData.hotspots[i].id);
    setView("");
    api.current?.hotspot(i);
  }
  const hotspot = viewerData.hotspots.find((h) => h.id === selected);
  return (
    <section
      ref={root}
      className="viewer-section section"
      id="explorador"
      aria-labelledby="viewer-heading"
    >
      <div className="section-head">
        <div>
          <p className="eyebrow">{vegaCopy.label_02_explorador_interactivo}</p>
          <h2 id="viewer-heading">{vegaCopy.tu_punto_de_vista}</h2>
        </div>
        <span className="viewer-badge">
          <i />
          {vegaCopy.modelo_original_vega}
        </span>
      </div>
      <div className="viewer-workspace">
  <div className="viewer-stage">
    <div className="viewer-canvas is-active">
      <img
        className={
          "viewer-fallback " + (status === "ready" ? "is-hidden" : "")
        }
        src={vegaData.assets.hero}
        alt="Vista general de VEGA, alternativa al modelo interactivo"
        width="1440"
        height="920"
      />

      <div className="canvas-mount" ref={mount} />

      <div className="viewer-model-badge">
        <span>MODELO WEB</span>
        <strong>VEGA</strong>
      </div>

      {status === "ready" &&
        viewerData.hotspots.map((part, index) => (
          <button
            key={part.id}
            ref={(element) => {
              markers.current[index] = element;
            }}
            type="button"
            onClick={() => chooseHotspot(index)}
            className={
              "hotspot " + (selected === part.id ? "selected" : "")
            }
            aria-label={"Explorar " + part.label}
            aria-pressed={selected === part.id}
          >
            +
          </button>
        ))}

      {(status === "loading" || status === "waiting") && (
        <div className="viewer-loading" role="status">
          <b>{vegaCopy.vega_2}</b>

          <span>
            {vegaCopy.cargando_modelo}
            {Math.round(progress)}%
          </span>

          <progress
            max={100}
            value={progress}
            aria-label="Carga del modelo VEGA"
          />
        </div>
      )}

      {status === "error" && (
        <div className="viewer-error" role="status">
          <p>
            {vegaCopy.el_visor_3d_no_esta_disponible}
            <br />
            {vegaCopy.puedes_continuar_explorando_la_pagina}
          </p>

          <button
            className="outline-control"
            onClick={() => {
              api.current?.dispose();
              api.current = null;
              setProgress(0);
              setAttempt((current) => current + 1);
            }}
          >
            {vegaCopy.reintentar_carga}
          </button>
        </div>
      )}
    </div>

    <div
      className="viewer-floating-views"
      role="group"
      aria-label="Vistas del modelo"
    >
      {viewerData.views.map((item) => (
        <button
          key={item.id}
          type="button"
          disabled={status !== "ready"}
          aria-pressed={view === item.id}
          onClick={() => chooseView(item.id)}
        >
          {item.label}
        </button>
      ))}
    </div>

    <div className="viewer-floating-zoom">
      <button
        type="button"
        disabled={status !== "ready"}
        onClick={() => api.current?.zoom(0.87)}
        aria-label="Acercar modelo"
      >
        +
      </button>

      <button
        type="button"
        disabled={status !== "ready"}
        onClick={() => api.current?.zoom(1.15)}
        aria-label="Alejar modelo"
      >
        −
      </button>

      <button
        type="button"
        disabled={status !== "ready"}
        onClick={() => chooseView("general")}
        aria-label="Restablecer vista"
      >
        ↻
      </button>
    </div>

    <div
      className="viewer-floating-parts"
      aria-label="Partes principales de VEGA"
    >
      {viewerData.hotspots.map((part, index) => (
        <button
          key={part.id}
          type="button"
          disabled={status !== "ready"}
          aria-pressed={selected === part.id}
          onClick={() => chooseHotspot(index)}
        >
          <span>+</span>
          {part.shortLabel}
        </button>
      ))}
    </div>

    <p className="viewer-floating-help">
      ARRASTRA PARA GIRAR · PELLIZCA O UTILIZA LOS BOTONES PARA ACERCAR
    </p>
  </div>

  <aside
    className={"viewer-detail-panel " + (hotspot ? "has-selection" : "")}
    aria-live="polite"
  >
    <span className="viewer-detail-index">
      {hotspot
        ? String(
            viewerData.hotspots.findIndex(
              (part) => part.id === hotspot.id,
            ) + 1,
          ).padStart(2, "0")
        : "00"}
    </span>

    <div>
      <span className="eyebrow">
        {hotspot ? "COMPONENTE VEGA" : "EXPLORACIÓN 3D"}
      </span>

      <h3>
        {hotspot ? hotspot.label : "Selecciona una parte del dron"}
      </h3>

      <p>
        {hotspot
          ? hotspot.description
          : "Utiliza los botones para enfocar un componente y conocer su función sin ocultar el modelo tridimensional."}
      </p>

      {hotspot && (
        <button
          type="button"
          onClick={() => chooseView("general")}
          className="text-link"
        >
          VOLVER A VISTA GENERAL ↗
        </button>
      )}
    </div>
  </aside>
</div>
      <div className="sr-only">
        <p>{vegaCopy.tambien_puedes_explorar_vega_usando_los_botones_de}</p>
      </div>
    </section>
  );
}
