"use client";

import { useState } from "react";
import { galleryData } from "@/lib/vega/gallery";

export function VegaGallery() {
  const [selected, setSelected] = useState(0);
  const view = galleryData.views[selected];

  return (
    <section className="section model-gallery" aria-labelledby="gallery-title">
      <div className="section-head" data-reveal>
        <p className="eyebrow">{galleryData.eyebrow}</p>
        <span className="eyebrow">{galleryData.instruction}</span>
      </div>
      <h2 id="gallery-title" data-title-motion>
        {galleryData.title}<br />
        <span className="muted">{galleryData.subtitle}</span>
      </h2>
      <figure className="gallery-stage">
        <span className="gallery-wordmark" aria-hidden="true">VEGA</span>
        <span className="gallery-cross gallery-cross-start" aria-hidden="true">＋</span>
        <img key={view.id} src={view.image} alt={view.alt} width="1440" height="920" loading="lazy" />
        <span className="gallery-cross gallery-cross-end" aria-hidden="true">＋</span>
        <figcaption aria-live="polite">
          <span>{view.detail}</span>
          <span>{String(selected + 1).padStart(2, "0")} / 04</span>
        </figcaption>
      </figure>
      <div className="gallery-selector" role="group" aria-label="Perspectivas de VEGA">
        {galleryData.views.map((item, index) => (
          <button key={item.id} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}>
            <span className="gallery-thumb"><img src={item.image} alt="" width="1440" height="920" loading="lazy" /></span>
            <span className="gallery-option-label"><span>{String(index + 1).padStart(2, "0")}</span>{item.label}<span aria-hidden="true">↗</span></span>
          </button>
        ))}
      </div>
      <a className="text-link" href="#explorador">{galleryData.detailLink}<span>↘</span></a>
    </section>
  );
}
