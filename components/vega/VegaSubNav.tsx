"use client";
import { useEffect, useState, useRef, type MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { vegaData } from "@/lib/vega/data";
import { scrollToSection } from "@/components/shared/scrollToSection";
export function VegaSubNav() {
  const [active, setActive] = useState("caracteristicas");
  const nav = useRef<HTMLElement>(null);
  const scrollTarget = useRef<string | null>(null);
  const cancelScroll = useRef<(() => void) | null>(null);

  const goTo = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    scrollTarget.current = id;
    setActive(id);
    cancelScroll.current?.();
    cancelScroll.current = scrollToSection(id, ".vega-redesign .subnav", () => {
      if (scrollTarget.current === id) scrollTarget.current = null;
    });
  };
  useEffect(() => {
    let frame = 0;
    const sections = vegaData.nav
      .map(([id]) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const update = () => {
      frame = 0;
      if (scrollTarget.current) {
        setActive(scrollTarget.current);
        return;
      }
      let current = "caracteristicas";
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
      cancelScroll.current?.();
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
      <a href="#descripcion" className="sub-brand" onClick={(event) => goTo(event, "descripcion")}>
        VEGA<span> / </span>
      </a>
      <nav ref={nav} aria-label="Secciones de VEGA">
        {vegaData.nav.map(([id, label]) => (
          <a
            key={id}
            href={"#" + id}
            onClick={(event) => goTo(event, id)}
            aria-current={active === id ? "location" : undefined}
          >
            {label}
          </a>
        ))}
      </nav>
      <a href="#contacto" className="subnav-talk" onClick={(event) => goTo(event, "contacto")}>
        Hablemos <ArrowUpRight size={14} />
      </a>
    </div>
  );
}
