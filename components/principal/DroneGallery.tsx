"use client";

import { useEffect, useRef, useState, type TouchEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import "@/styles/drone-gallery.css";

const DRONES = [
  { id: "fenix", name: "FÉNIX", tag: "Plataforma industrial", href: "/fenix", w: 1500, h: 330, dw: 640, dh: 315 },
  { id: "orion", name: "ORION MX", tag: "Inspección compacta", href: "/orion-mx", w: 1500, h: 330, dw: 640, dh: 326 },
  { id: "vega", name: "VEGA", tag: "Plegable y versátil", href: "/vega", w: 1500, h: 330, dw: 640, dh: 315 },
] as const;

export default function DroneGallery() {
  const [i, setI] = useState(0);
  const [visible, setVisible] = useState(false);
  const [hold, setHold] = useState(false);
  const [still, setStill] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const touch = useRef<number | null>(null);

  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStill(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    if (root.current) io.observe(root.current);
    return () => {
      mq.removeEventListener("change", sync);
      io.disconnect();
    };
  }, []);

  const go = (n: number) => setI((n + DRONES.length) % DRONES.length);
  const onStart = (e: TouchEvent) => {
    touch.current = e.touches[0].clientX;
  };
  const onEnd = (e: TouchEvent) => {
    if (touch.current === null) return;
    const dx = e.changedTouches[0].clientX - touch.current;
    touch.current = null;
    if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1));
  };
  const playing = visible && !hold && !still;
  const cur = DRONES[i];

  return (
    <div
      ref={root}
      className={`dgal${playing ? "" : " is-paused"}`}
      data-home-reveal
      role="region"
      aria-roledescription="galería"
      aria-label="Galería de plataformas FÉNIX, ORION MX y VEGA"
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={() => setHold(false)}
    >
      <div className="dgal__stage" onTouchStart={onStart} onTouchEnd={onEnd}>
        <div className="dgal__copy">
          <span className="home-label">DISEÑO / INTEGRACIÓN / OPERACIÓN</span>
          <p>
            Configuramos cada sistema alrededor de la información que necesitas obtener, desde
            vigilancia e inspección hasta construcción y búsqueda.
          </p>
        </div>
        {DRONES.map((d, n) => (
          <figure
            key={d.id}
            className={`dgal__slide dgal__slide--${d.id}${n === i ? " is-active" : ""}`}
            aria-hidden={n !== i}
          >
            <img
              className="dgal__terrain"
              src={`/home/gallery/t-${d.id}.webp`}
              alt=""
              width={d.w}
              height={d.h}
              loading={n === 0 ? "eager" : "lazy"}
              decoding="async"
            />
            <span className="dgal__shadow" aria-hidden="true" />
            <img
              className="dgal__drone"
              src={`/home/gallery/d-${d.id}.webp`}
              alt={`Silueta de ${d.name} sobrevolando un terreno`}
              width={d.dw}
              height={d.dh}
              loading={n === 0 ? "eager" : "lazy"}
              decoding="async"
            />
            <figcaption>
              <b>{d.name}</b>
              <small>{d.tag}</small>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="dgal__bar">
        <div className="dgal__tabs" role="tablist" aria-label="Plataformas">
          {DRONES.map((d, n) => (
            <button
              key={d.id}
              type="button"
              role="tab"
              aria-selected={n === i}
              className={n === i ? "is-active" : ""}
              onClick={() => go(n)}
            >
              {d.name}
              {n === i && (
                <i
                  key={`${d.id}-${i}`}
                  className="dgal__fill"
                  onAnimationEnd={() => !still && go(i + 1)}
                />
              )}
            </button>
          ))}
        </div>
        <a className="dgal__link" href={cur.href}>
          Explorar {cur.name} <ArrowUpRight size={16} />
        </a>
      </div>
    </div>
  );
}
