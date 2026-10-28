"use client";

import { useEffect, useRef, useState } from "react";
import { navSteps } from "@/lib/vega/technology-data";

const CYCLE_MS = 6500;
const H = { x: 12, y: 52 }; // punto de despegue

const PATHS = {
  gps: "M12 52 C26 46 34 54 50 40 S76 22 88 28",
  ruta: "M12 52 L28 40 L50 24 Q58 16 66 26 L74 38 L88 16",
  enlace: "M12 52 C30 50 44 44 60 36",
  regreso: "M86 16 L12 52",
} as const;

function Drone() {
  return (
    <g className="vega-nav__drone">
      <circle r="3.4" className="vega-nav__drone-halo" />
      <path d="M-2.6 -2.6 L2.6 2.6 M2.6 -2.6 L-2.6 2.6" />
      <circle cx="-2.6" cy="-2.6" r="1.1" />
      <circle cx="2.6" cy="-2.6" r="1.1" />
      <circle cx="-2.6" cy="2.6" r="1.1" />
      <circle cx="2.6" cy="2.6" r="1.1" />
      <circle r="1.2" className="vega-nav__drone-core" />
    </g>
  );
}

export function VegaTechnology() {
  const root = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [auto, setAuto] = useState(true);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const step = navSteps[index];

  useEffect(() => {
    setReduced(matchMedia("(prefers-reduced-motion: reduce)").matches);
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(root.current!);
    return () => io.disconnect();
  }, []);

  const cycling = auto && !paused && inView && !reduced;
  useEffect(() => {
    if (!cycling) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % navSteps.length), CYCLE_MS);
    return () => clearTimeout(t);
  }, [cycling, index]);

  const pick = (i: number) => {
    setAuto(false);
    setIndex(i);
  };

  const dur = step.id === "regreso" ? "4.5s" : step.id === "enlace" ? "5s" : "6s";

  return (
    <section
      ref={root}
      className="section vega-nav"
      id="tecnologia"
      aria-labelledby="vega-nav-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="section-head" data-reveal>
        <p className="eyebrow">NAVEGACIÓN</p>
        <span className="eyebrow">CONTROL Y SEGURIDAD</span>
      </div>
      <h2 id="vega-nav-title" data-title-motion>
        Tú decides cómo vuela.
        <br />
        <span className="muted">Ella sabe volver.</span>
      </h2>

      <div className="vega-nav__layout">
        <div className="vega-nav__list" role="tablist" aria-label="Modos de vuelo y seguridad">
          {navSteps.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-controls="vega-nav-map"
              className={i === index ? "is-active" : ""}
              onClick={() => pick(i)}
            >
              <span className="vega-nav__n">0{i + 1}</span>
              <span className="vega-nav__t">
                <b>{s.title}</b>
                <small>{i === index ? s.text : s.summary}</small>
                {i === index && (
                  <span className="vega-nav__chips">
                    {s.chips.map((c) => (
                      <i key={c}>{c}</i>
                    ))}
                  </span>
                )}
              </span>
              <em className={cycling && i === index ? "is-running" : ""} aria-hidden="true" />
            </button>
          ))}
        </div>

        <div className="vega-nav__map" id="vega-nav-map" role="img" aria-label={`Esquema: ${step.title}`} data-step={step.id}>
          <svg viewBox="0 0 100 64" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            {/* punto de despegue */}
            <g className="vega-nav__home">
              <circle cx={H.x} cy={H.y} r="3.6" />
              <text x={H.x} y={H.y + 1.3} textAnchor="middle">H</text>
            </g>

            <g key={step.id}>
              {step.id === "gps" && (
                <>
                  <path className="vega-nav__route" d={PATHS.gps} />
                  {[[24, 8], [74, 6]].map(([x, y], i) => (
                    <g key={i} className="vega-nav__sat" transform={`translate(${x} ${y})`}>
                      <rect x="-2" y="-2" width="4" height="4" transform="rotate(45)" />
                      <path d="M-5 0 H-3 M3 0 H5" />
                      <circle r="6" className="vega-nav__pulse" style={{ animationDelay: `${i * 0.8}s` }} />
                    </g>
                  ))}
                </>
              )}

              {step.id === "ruta" && (
                <>
                  <rect className="vega-nav__obstacle" x="52" y="26" width="9" height="9" />
                  <text className="vega-nav__tag" x="50" y="40.5">OBSTÁCULO</text>
                  <path className="vega-nav__route" d={PATHS.ruta} />
                  {[[28, 40], [50, 24], [74, 38], [88, 16]].map(([x, y], i) => (
                    <g key={i} className="vega-nav__wp" style={{ animationDelay: `${0.9 + i * 1.25}s` }}>
                      <circle cx={x} cy={y} r="2.4" />
                      <text x={x} y={y + 1} textAnchor="middle">{i + 1}</text>
                    </g>
                  ))}
                </>
              )}

              {step.id === "enlace" && (
                <>
                  {[14, 26, 38, 50].map((r, i) => (
                    <g key={r}>
                      <circle className="vega-nav__ring" cx={H.x} cy={H.y} r={r} />
                      <text className="vega-nav__tag" x={H.x + r + 0.8} y={H.y - 1.4}>{[10, 20, 30, 40][i]} km</text>
                    </g>
                  ))}
                  {[0, 1, 2].map((i) => (
                    <circle key={i} className="vega-nav__wave" cx={H.x} cy={H.y} r="4" style={{ animationDelay: `${i * 1.2}s` }} />
                  ))}
                  <path className="vega-nav__link" d={PATHS.enlace} />
                </>
              )}

              {step.id === "regreso" && (
                <>
                  <path className="vega-nav__route vega-nav__route--return" d={PATHS.regreso} />
                  <g className="vega-nav__alert" transform="translate(66 6)">
                    <rect width="30" height="9" rx="1" />
                    <text x="15" y="5.9" textAnchor="middle">SEÑAL / BATERÍA BAJA</text>
                  </g>
                </>
              )}

              {!reduced ? (
                <g>
                  <Drone />
                  <animateMotion
                    dur={dur}
                    repeatCount="indefinite"
                    path={step.id === "regreso" ? PATHS.regreso : PATHS[step.id]}
                    keyPoints={step.id === "enlace" ? "0;1;0" : undefined}
                    keyTimes={step.id === "enlace" ? "0;0.5;1" : undefined}
                    calcMode={step.id === "enlace" ? "linear" : undefined}
                  />
                </g>
              ) : (
                <g transform={step.id === "regreso" ? "translate(86 16)" : step.id === "enlace" ? "translate(60 36)" : "translate(88 28)"}>
                  <Drone />
                </g>
              )}
            </g>
          </svg>
          <span className="vega-nav__badge">{step.title}</span>
        </div>
      </div>
    </section>
  );
}
