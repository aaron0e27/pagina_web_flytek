"use client";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { fenixAssets } from "@/lib/fenix/assets";
export default function FenixHeroVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const manualPause = useRef(false);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = true;
    const sync = () => {
      if (reduced.matches || document.hidden || !inView || manualPause.current) {
        v.pause();
        setPaused(true);
      } else {
        v.play()
          .then(() => setPaused(false))
          .catch(() => setPaused(true));
      }
    };
    const ob = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      sync();
    });
    ob.observe(v);
    reduced.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      ob.disconnect();
      reduced.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);
  return (
    <>
      <video
        ref={video}
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={fenixAssets.studio}
      >
        <source src={fenixAssets.video} type="video/mp4" />
      </video>
      <div className="hero-shade" />
      <button
        className="video-toggle"
        onClick={() => {
          const v = video.current;
          if (!v) return;
          if (v.paused) {
            manualPause.current = false;
            v.play()
              .then(() => setPaused(false))
              .catch(() => {});
          } else {
            manualPause.current = true;
            v.pause();
            setPaused(true);
          }
        }}
        aria-label={paused ? "Reproducir video" : "Pausar video"}
      >
        {paused ? <Play size={15} /> : <Pause size={15} />}
      </button>
      <span className="media-note">Video ilustrativo</span>
    </>
  );
}
