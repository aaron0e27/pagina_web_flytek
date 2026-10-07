"use client";

import { useState } from "react";
import { galleryData } from "@/lib/vega/gallery";

export function VegaGallery() {
  const [active, setActive] = useState(0);
  const total = galleryData.items.length;

  return (
    <>
      <div className="shutter" role="group" aria-label="VEGA en campo">
        {galleryData.items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            className="shutter-panel"
            data-active={active === i}
            aria-pressed={active === i}
            aria-label={item.alt}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
          >
            <img src={item.image} alt="" loading="lazy" decoding="async" style={{ objectPosition: item.position }} />
            <span className="shutter-index">{String(i + 1).padStart(2, "0")}</span>
            <span className="shutter-label">{item.label}</span>
            <span className="shutter-caption">
              <span>{item.detail}</span>
              <span>{String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
            </span>
          </button>
        ))}
      </div>
      <p className="shutter-hint">{galleryData.instruction}</p>
    </>
  );
}