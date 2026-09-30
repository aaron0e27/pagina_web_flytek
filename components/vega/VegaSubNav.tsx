"use client";
import { useEffect, useState, useRef } from "react";
import { vegaData } from "@/lib/vega/data";
export function VegaSubNav() {
  const [active, setActive] = useState("descripcion");
  const nav = useRef<HTMLElement>(null);
  useEffect(() => {
    let frame = 0;
    const sections = vegaData.nav
      .map(([id]) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const update = () => {
      frame = 0;
      let current = "descripcion";
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= innerHeight * 0.3)
          current = section.id;
      }
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    update();
    return () => {
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);
  useEffect(() => {
    const el = nav.current?.querySelector<HTMLAnchorElement>(
      '[aria-current="location"]',
    );
    if (el && nav.current) {
      const n = nav.current;
      if (
        el.offsetLeft < n.scrollLeft ||
        el.offsetLeft + el.offsetWidth > n.scrollLeft + n.clientWidth
      )
        n.scrollTo({
          left: el.offsetLeft - n.clientWidth / 2 + el.offsetWidth / 2,
          behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "instant"
            : "smooth",
        });
    }
  }, [active]);
  return (
    <div className="subnav">
      <a href="#descripcion" className="sub-brand">
        VEGA <span>↗</span>
      </a>
      <nav ref={nav} aria-label="Secciones de VEGA">
        {vegaData.nav.map(([id, label]) => (
          <a
            key={id}
            href={"#" + id}
            aria-current={active === id ? "location" : undefined}
          >
            {label}
          </a>
        ))}
      </nav>
    </div>
  );
}
