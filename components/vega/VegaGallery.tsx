"use client";

import { useEffect, useRef, useState } from "react";
import { galleryData } from "@/lib/vega/gallery";

export function VegaGallery() {
  const [active, setActive] = useState(0);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const total = galleryData.items.length;

  // El video solo corre mientras su panel está abierto (y si no hay "reducir movimiento").
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    videos.current.forEach((video, i) => {
      if (!video) return;
      if (i === active && !reduce) void video.play().catch(() => {});
      else video.pause();
    });
  }, [active]);

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
            {item.kind === "video" ? (
              <video
                ref={(el) => { videos.current[i] = el; }}
                src={item.video}
                poster={item.image}
                muted
                loop
                playsInline
                preload="none"
                style={{ objectPosition: item.position }}
              />
            ) : (
              <img src={item.image} alt="" loading="lazy" decoding="async" style={{ objectPosition: item.position }} />
            )}
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