"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import type { AscentAPI } from "@/lib/orion-mx/ascent-scene";

export default function OrionAscent() {
  const section = useRef<HTMLElement>(null);
  const host = useRef<HTMLDivElement>(null);
  const api = useRef<AscentAPI | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const root = section.current!;
    const el = host.current!;
    let disposed = false;
    let inView = false;
    let started = false;
    let progress = 0.5;
    let frame = 0;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Avance del scroll por la sección: en celular sustituye al cursor.
    const measure = () => {
      frame = 0;
      const r = root.getBoundingClientRect();
      progress = 1 - (r.bottom) / (r.height + innerHeight);
      api.current?.progress(progress);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(measure); };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const r = root.getBoundingClientRect();
      api.current?.pointer(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1);
    };
    const onLeave = () => api.current?.pointer(0, 0);

    const start = async () => {
      if (started) return;
      started = true;
      try {
        const { createAscentScene } = await import("@/lib/orion-mx/ascent-scene");
        if (disposed) return;
        const scene = await createAscentScene(el, {
          reduced,
          onReady: () => !disposed && setReady(true),
          onError: () => !disposed && setError(true),
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
      { rootMargin: "300px 0px", threshold: 0.25 },
    );
    observer.observe(root);
    const visibility = () => api.current?.active(inView && !document.hidden);
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("scroll", onScroll, { passive: true });
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    measure();
    return () => {
      disposed = true;
      observer.disconnect();
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("scroll", onScroll);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      api.current?.dispose();
      api.current = null;
    };
  }, []);

  return (
    <section ref={section} className="orion-ascent" id="ascenso" aria-labelledby="orion-ascent-title" data-reeady={ready}>
      <div className="orion-ascent__text">
        <div className="orion-section-tag orion-section-tag--light"><span>↑</span> ASCENSO</div>
        <h2 id="orion-ascent-title">
          Despega.
          <br />
          <em>Mantén la posición.</em>
        </h2>
        <p>Un ascenso controlado y un vuelo estable. Mueve el cursor, o desplázate en el celular, para mirar a ORION desde otro ángulo.</p>
      </div>
      <div key={`alt-${cycle}`} className="orion-ascent__alt" aria-hidden="true">
        <i /><i /><i /><i /><i />
        {ready && <b />}
      </div>
      <div ref={host} className="orion-ascent__scene" data-ready={ready} role="img" aria-label="Animación ilustrativa de ORION ascendiendo y manteniéndose en vuelo estacionario" />
      <div key={`floor-${cycle}`} className="orion-ascent__floor" aria-hidden="true">
        {ready && (
          <>
            <span className="orion-ascent__shadow" />
            <span className="orion-ascent__ring" />
            <span className="orion-ascent__ring orion-ascent__ring--2" />
          </>
        )}
      </div>
      {error && <img className="orion-ascent__fallback" src="/orion-mx/orion-view-a.jpg" alt="ORION en perspectiva" />}
      <div className="orion-ascent__bottom">
        <span>ASCENSO CONTROLADO / HOVER ESTABLE</span>
        <button type="button" onClick={() => { api.current?.replay(); setCycle((c) => c + 1); }} disabled={!ready || error}></button>
        <span>MOVIMIENTO ILUSTRATIVO</span>
      </div>
    </section>
  );
}