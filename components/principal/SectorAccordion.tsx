"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Plus, X } from "lucide-react";
import { sectorBenefits, sectorDetails, sectors } from "@/lib/principal/data";

/** Aparición suave de los bloques del panel al abrirlo. */
function useRise(open: boolean, ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = ref.current;
    if (!open || !root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-rise]"));
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-in"));
      return;
    }
    root.classList.add("is-armed");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [open, ref]);
}

function SectorPanel({ index, open }: { index: number; open: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useRise(open, ref);
  const d = sectorDetails[index];
  return (
    <div className="home-sector-expanded" ref={ref}>
      <header className="home-detail-heading">
        <div className="home-detail-heading-title">
          <p className="home-label">{d.name}</p>
          <h3>{d.title}</h3>
        </div>
        <p>{d.summary}</p>
      </header>

      <section className="home-adv" aria-label={`Ventajas para ${d.name}`}>
        <figure className="home-adv-photo" data-rise>
          <img src={d.capabilityImage} alt={d.capabilityAlt} style={{ objectPosition: d.capabilityPosition }} width="1600" height="1000" loading="lazy" />
          <figcaption>
            <span>{d.name}</span>
            Ventajas Flytek
          </figcaption>
        </figure>
        <div className="home-adv-list">
          {d.proofs.map((proof, i) => (
            <article className="home-adv-item" key={proof.title} data-rise style={{ ["--i" as string]: i }}>
              <span className="home-adv-n" aria-hidden="true">0{i + 1}</span>
              <div>
                <h4>{proof.title}</h4>
                <p>{proof.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-applications">
        <header className="home-applications-heading">
          <p className="home-label">Aplicaciones</p>
          <p>{d.applicationIntro}</p>
        </header>
        <div className={`home-app-grid is-n${d.applications.length}`}>
          {d.applications.map((application, i) => (
            <article className="home-app" key={application.title} data-rise style={{ ["--i" as string]: i % 2 }}>
              <img className="home-app-bg" src={application.image} alt="" width="1000" height="600" loading="lazy" />
              <span className="home-app-n" aria-hidden="true">0{i + 1}</span>
              <div className="home-app-body">
                <h4>{application.title}</h4>
                <p>{application.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-recommended">
        <header>
          <p className="home-label">Drones recomendados</p>
        </header>
        <div className={`home-recommended-grid${d.drones.length === 1 ? " is-single" : ""}`}>
          {d.drones.map((recommended) => (
            <article className="home-drone-card" key={recommended.name} data-rise>
              <a className="home-drone-image" href={recommended.href} tabIndex={-1} aria-hidden="true" data-name={recommended.name}>
                <img src={recommended.image} alt="" width="800" height="600" loading="lazy" />
              </a>
              <div className="home-drone-copy">
                <p className="home-label">{recommended.context}</p>
                <h4>
                  <a href={recommended.href} aria-label={`Conocer el drone ${recommended.name}`}>
                    {recommended.name}
                    <ArrowUpRight size={25} aria-hidden="true" />
                  </a>
                </h4>
                <p>{recommended.text}</p>
                <ul className="home-drone-chips">
                  {recommended.specs.map(([label, value]) => (
                    <li key={label}>
                      <small>{label}</small>
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-benefits" aria-label="Beneficios en campo">
        <p className="home-label">Beneficios en campo</p>
        <ul>
          {sectorBenefits.map((benefit, i) => (
            <li key={benefit.label} data-rise style={{ ["--i" as string]: i }}>
              <span className="home-benefit-ico" aria-hidden="true" style={{ ["--ico" as string]: `url(${benefit.icon})` }} />
              <span>{benefit.label}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default function SectorAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  const detail = useRef<HTMLElement>(null);

  const toggle = (i: number) => {
    const next = open === i ? null : i;
    setOpen(next);
    if (next !== null) {
      // El detalle aparece en su propia sección debajo de las tarjetas: se lleva la vista hasta ahí.
      setTimeout(() => detail.current?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" }), 80);
    }
  };

  return (
    <>
      <div className="sacc">
        {sectors.map((s, i) => {
          const isOpen = open === i;
          return (
            <article className={`sacc__card${isOpen ? " is-open" : ""}`} key={s.slug}>
              <img className="sacc__bg" src={s.image} alt={s.alt} width="1400" height="850" loading="lazy" />
              <div className="sacc__shade" aria-hidden="true" />
              <span className="sacc__n" aria-hidden="true">0{i + 1}</span>
              <div className="sacc__copy">
                <p className="home-label">{s.tag}</p>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                <button
                  type="button"
                  className="sacc__cta"
                  aria-expanded={isOpen}
                  aria-controls="sacc-detail"
                  onClick={() => toggle(i)}
                >
                  <span>{isOpen ? "Cerrar" : "Ver más"}</span>
                  {isOpen ? <X size={18} aria-hidden="true" /> : <Plus size={18} aria-hidden="true" />}
                  <span className="sacc__sr"> {s.name}</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>
      <section className="sacc__detail" id="sacc-detail" ref={detail} aria-live="polite" hidden={open === null}>
        {open !== null && <SectorPanel key={sectors[open].slug} index={open} open />}
      </section>
    </>
  );
}
