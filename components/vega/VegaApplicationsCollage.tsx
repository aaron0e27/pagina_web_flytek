"use client";

import { useState } from "react";
import { vegaCopy } from "@/lib/vega/copy";
import { vegaData } from "@/lib/vega/data";

export function VegaApplicationsCollage() {
  const items = vegaData.applications;
  const [active, setActive] = useState(0);
  const current = items[active];
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="app-stage">
      <div className="app-info">
        <div className="app-info-body" key={active} aria-live="polite">
          <span className="eyebrow">{pad(active + 1)} / {pad(items.length)}</span>
          <h3>{current.title}</h3>
          <p>{current.description}</p>
          {current.sectorHref ? (
            <a href={current.sectorHref} className="text-link">{vegaCopy.ver_sector}</a>
          ) : null}
        </div>
        <div className="app-list" role="group" aria-label="Aplicaciones de VEGA">
          {items.map((a, i) => (
            <button
              key={a.title}
              type="button"
              aria-pressed={active === i}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
            >
              <span>{pad(i + 1)}</span>
              {a.title}
              <span>↗</span>
            </button>
          ))}
        </div>
      </div>

      <div className="app-mosaic" data-active={active}>
        {items.map((a, i) => (
          <button
            key={a.title}
            type="button"
            className="app-frame"
            data-active={active === i}
            aria-pressed={active === i}
            aria-label={a.title}
            tabIndex={-1}
            onMouseEnter={() => setActive(i)}
            onClick={() => setActive(i)}
          >
            <img src={a.image} alt="" width="1440" height="920" loading="lazy" decoding="async" />
          </button>
        ))}
      </div>
    </div>
  );
}