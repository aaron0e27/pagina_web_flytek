"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { scrollToSection } from "@/components/shared/scrollToSection";

const sections = [
  ["descripcion", "Descripción"],
  ["rendimiento", "Rendimiento"],
  ["tecnologia", "Navegación"],
  ["explorar", "Modelo 3D"],
  ["cargas", "Cargas útiles"],
  ["aplicaciones", "Aplicaciones"],
  ["galeria", "Galería"],
  ["especificaciones", "Especificaciones"],
] as const;

export default function OrionSubNav() {
  const [active, setActive] = useState("descripcion");
  const links = useRef<HTMLDivElement>(null);
  const scrollTarget = useRef<string | null>(null);
  const cancelScroll = useRef<(() => void) | null>(null);

  const goTo = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    scrollTarget.current = id;
    setActive(id);
    cancelScroll.current?.();
    cancelScroll.current = scrollToSection(id, ".orion-rail", () => {
      if (scrollTarget.current === id) scrollTarget.current = null;
    });
  };

  useEffect(() => {
    let frame = 0;
    const elements = sections
      .map(([id]) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));
    const update = () => {
      frame = 0;
      if (scrollTarget.current) {
        setActive(scrollTarget.current);
        return;
      }
      let current = "descripcion";
      for (const section of elements) {
        if (section.getBoundingClientRect().top <= innerHeight * 0.3) current = section.id;
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
    const selected = links.current?.querySelector<HTMLAnchorElement>('[aria-current="location"]');
    if (!selected || !links.current) return;
    const container = links.current;
    if (
      selected.offsetLeft < container.scrollLeft ||
      selected.offsetLeft + selected.offsetWidth > container.scrollLeft + container.clientWidth
    ) {
      container.scrollTo({
        left: selected.offsetLeft - container.clientWidth / 2 + selected.offsetWidth / 2,
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      });
    }
  }, [active]);

  return (
    <nav className="orion-rail" aria-label="ORION">
      <a href="#inicio" className="orion-rail__brand" onClick={(event) => goTo(event, "inicio")}>
        ORION<span> / </span>
      </a>
      <div className="orion-rail__links" ref={links}>
        {sections.map(([id, label]) => (
          <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined} onClick={(event) => goTo(event, id)}>
            {label}
          </a>
        ))}
      </div>
      <a href="#contacto" className="orion-rail__talk" onClick={(event) => goTo(event, "contacto")}>
        Hablemos <ArrowUpRight size={14} />
      </a>
    </nav>
  );
}
