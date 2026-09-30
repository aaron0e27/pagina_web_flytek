"use client";

import { useEffect, useRef, useState } from "react";
import type { OrionSceneAPI } from "@/lib/orion-mx/drone-scene";

export default function OrionMiniFlight({ paused }: { paused: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const scene = useRef<OrionSceneAPI | null>(null);
  const visible = useRef(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let disposed = false;
    let started = false;
    const start = async () => {
      if (started) return;
      started = true;
      try {
        const { createOrionScene } = await import("@/lib/orion-mx/drone-scene");
        const api = await createOrionScene(element, {
          reduced: matchMedia("(prefers-reduced-motion: reduce)").matches,
          onReady: () => !disposed && setReady(true),
          onError: () => !disposed && setReady(false),
        });
        if (disposed) api.dispose();
        else {
          scene.current = api;
          api.active(visible.current && !document.hidden);
        }
      } catch {
        if (!disposed) setReady(false);
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting;
        if (visible.current) void start();
        scene.current?.active(visible.current && !document.hidden);
      },
      { rootMargin: "160px" },
    );
    observer.observe(element);
    return () => {
      disposed = true;
      observer.disconnect();
      scene.current?.dispose();
      scene.current = null;
    };
  }, []);

  useEffect(() => {
    scene.current?.active(!paused && visible.current && !document.hidden);
  }, [paused]);

  return (
    <div className={`home-flight-orion${ready ? " is-ready" : ""}`} aria-hidden="true">
      <div ref={host} className="home-flight-orion-canvas" />
      {!ready && <span>ORION / CARGANDO MODELO</span>}
    </div>
  );
}
