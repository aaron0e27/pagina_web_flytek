"use client";

import { useEffect, useRef, useState } from "react";
import { vegaCopy } from "@/lib/vega/copy";
import { techNodes } from "@/lib/vega/technology-data";

const CYCLE_MS = 4800;

export function VegaTechnology() {
  const root = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [auto, setAuto] = useState(true);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const node = techNodes[index];

  useEffect(() => {
    setReduced(matchMedia("(prefers-reduced-motion: reduce)").matches);
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(root.current!);
    return () => io.disconnect();
  }, []);

  const cycling = auto && !paused && inView && !reduced;
  useEffect(() => {
    if (!cycling) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % techNodes.length), CYCLE_MS);
    return () => clearTimeout(t);
  }, [cycling, index]);

  const pick = (i: number) => {
    setAuto(false);
    setIndex(i);
  };

  return (
    <section
      ref={root}
      className="section technology vega-tech"
      id="tecnologia"
      data-active={node.id}
      aria-labelledby="vega-tech-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="vega-tech__copy">
        <p className="eyebrow">{vegaCopy.label_05_tecnologia}</p>
        <h2 id="vega-tech-title" data-reveal>
          {vegaCopy.una_vision}
          <br />
          {vegaCopy.del_sistema}
        </h2>
        <p>Configura VEGA a partir de la información que necesitas obtener. Toca cada módulo para explorarlo.</p>

        <article className="vega-tech__detail" key={node.id} aria-live="polite">
          <span className="eyebrow">0{index + 1} / {node.label}</span>
          <p>{node.text}</p>
          <ul>
            {node.chips.map((chip) => (
              <li key={chip}>{chip}</li>
            ))}
          </ul>
          <small>Detalles según configuración.</small>
        </article>
      </div>

      <div className="vega-tech__map" role="group" aria-label="Mapa del sistema VEGA">
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <circle className="vega-tech__orbit" cx="50" cy="50" r="17" />
          <circle className="vega-tech__orbit" cx="50" cy="50" r="31" />
          <circle className="vega-tech__orbit vega-tech__orbit--far" cx="50" cy="50" r="46" />
          {techNodes.map((n, i) => (
            <line
              key={n.id}
              className={"vega-tech__line" + (i === index ? " is-active" : "")}
              x1="50"
              y1="50"
              x2={n.x}
              y2={n.y}
            />
          ))}
          {!reduced && (
            <g key={node.id}>
              <circle className="vega-tech__signal" r="1.5">
                <animateMotion dur="1.7s" repeatCount="indefinite" path={`M50 50 L${node.x} ${node.y}`} />
              </circle>
              <circle className="vega-tech__signal" r="1.5">
                <animateMotion dur="1.7s" begin="0.85s" repeatCount="indefinite" path={`M50 50 L${node.x} ${node.y}`} />
              </circle>
            </g>
          )}
        </svg>

        <div className="vega-tech__hub">
          <span>{vegaCopy.vega_2}</span>
          <small>{vegaCopy.plataforma}</small>
          <i aria-hidden="true" />
        </div>

        {techNodes.map((n, i) => (
          <button
            key={n.id}
            type="button"
            className={"vega-tech__node" + (i === index ? " is-active" : "")}
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
            aria-pressed={i === index}
            onClick={() => pick(i)}
            onMouseEnter={() => {
              if (matchMedia("(hover: hover)").matches) pick(i);
            }}
          >
            <b>0{i + 1}</b>
            {n.label}
          </button>
        ))}
      </div>
    </section>
  );
}