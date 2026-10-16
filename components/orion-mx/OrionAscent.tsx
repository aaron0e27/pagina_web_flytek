"use client";

// Animación de vuelo en 2D (foto frontal): ligera, sin WebGL. Sube con el scroll y reacciona al cursor.
import { useEffect, useRef } from "react";
import Image from "next/image";
import { Compass, Navigation, Wind } from "lucide-react";
import { orionAssets } from "@/lib/orion-mx/data";

const ALTS = ["0 m", "25 m", "50 m", "75 m", "100 m"];

export default function OrionAscent() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current!;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let inView = false;
    let tx = 0, ty = 0, px = 0, py = 0, lift = 0.6, liftT = 0.6;

    const measure = () => {
      const r = el.getBoundingClientRect();
      liftT = Math.min(1, Math.max(0, 1 - r.bottom / (r.height + innerHeight)) * 1.25);
    };
    const frame = () => {
      raf = 0;
      if (!inView) return;
      px += (tx - px) * 0.08;
      py += (ty - py) * 0.08;
      lift += (liftT - lift) * 0.08;
      el.style.setProperty("--lift", lift.toFixed(4));
      el.style.setProperty("--px", px.toFixed(3));
      el.style.setProperty("--py", py.toFixed(3));
      if (Math.abs(tx - px) + Math.abs(liftT - lift) > 0.002 || Math.abs(ty - py) > 0.002) raf = requestAnimationFrame(frame);
    };
    const kick = () => { if (!raf && inView) raf = requestAnimationFrame(frame); };
    const onScroll = () => { measure(); kick(); };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 2 - 1;
      ty = ((e.clientY - r.top) / r.height) * 2 - 1;
      kick();
    };
    const onLeave = () => { tx = 0; ty = 0; kick(); };

    if (reduced) { el.style.setProperty("--lift", "0.6"); return; }
    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      el.classList.toggle("is-live", inView);
      if (inView) { measure(); kick(); }
    }, { rootMargin: "100px 0px" });
    io.observe(el);
    addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      removeEventListener("scroll", onScroll);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section ref={root} className="orion-fly" id="vuelo" aria-labelledby="orion-fly-title">
      <div className="orion-fly__text">
        <div className="orion-section-tag orion-reveal"><span>02</span> VUELO</div>
        <h2 id="orion-fly-title" className="orion-reveal">Despega.<br /><em>Mantén la posición.</em></h2>
        <p className="orion-reveal">Navegación asistida por GPS, misiones autónomas por puntos de control y regreso a casa automático. Mueve el cursor, o desplázate en el celular, para ver a ORION desde otro ángulo.</p>
        <ul className="orion-fly__chips orion-reveal">
          <li><Navigation size={15} aria-hidden="true" /> Navegación asistida GPS</li>
          <li><Compass size={15} aria-hidden="true" /> Misión por puntos de control</li>
          <li><Wind size={15} aria-hidden="true" /> Viento de hasta 35 km/h</li>
        </ul>
      </div>

      <div className="orion-fly__stage" aria-hidden="true">
        <div className="orion-fly__alt">{ALTS.map((a) => <span key={a}>{a}</span>)}</div>
        <div className="orion-fly__sky" />
        <div className="orion-fly__drone">
          <div className="orion-fly__bob">
            <Image unoptimized src={orionAssets.front} alt="" width={1536} height={1024} sizes="(max-width: 900px) 90vw, 46vw" priority={false} />
          </div>
          <span className="orion-fly__tag orion-fly__tag--gps"><i /> GPS asistido</span>
          <span className="orion-fly__tag orion-fly__tag--hover"><i /> Hover estable</span>
        </div>
        <div className="orion-fly__ground">
          <span className="orion-fly__shadow" />
          <span className="orion-fly__ring" /><span className="orion-fly__ring orion-fly__ring--2" />
        </div>
      </div>
    </section>
  );
}
