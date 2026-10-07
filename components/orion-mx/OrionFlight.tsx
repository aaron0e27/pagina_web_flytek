"use client";

import { useEffect, useRef, useState } from "react";
import { orionFlight } from "@/lib/orion-mx/flight-data";

const pad = (n: number) => String(n).padStart(2, "0");

export default function OrionFlight() {
  const root = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const total = orionFlight.steps.length;

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    let disposed = false;
    let cleanup = () => {};

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();

      // Solo en pantallas grandes y sin "reducir movimiento": escena fija con scroll horizontal.
      // En celular y tablet queda una lista vertical normal (foto + texto).
      mm.add("(min-width: 901px) and (min-height: 560px) and (prefers-reduced-motion: no-preference)", () => {
        section.classList.add("is-staged");
        const slides = gsap.utils.toArray<HTMLElement>(".orion-flight__slide", section);
        const imgs = slides.map((s) => s.querySelector<HTMLElement>(".orion-flight__clip img")!);
        const shades = slides.map((s) => s.querySelector<HTMLElement>(".orion-flight__shade")!);
        const bar = section.querySelector<HTMLElement>(".orion-flight__bar")!;
        const drone = section.querySelector<HTMLElement>(".orion-flight__drone")!;

        gsap.set(imgs, { scale: 1.2 });
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top+=58",
            end: () => "+=" + Math.round(innerHeight * 0.8 * (total - 1)),
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => setStep(Math.round(self.progress * (total - 1))),
          },
        });

        slides.forEach((slide, i) => {
          if (i === 0) return;
          const at = i - 1;
          tl.fromTo(slide, { xPercent: 100 }, { xPercent: 0, duration: 1 }, at)
            .fromTo(imgs[i], { xPercent: 16 }, { xPercent: 0, duration: 1 }, at)
            .to(slides[i - 1], { xPercent: -26, duration: 1 }, at)
            .to(imgs[i - 1], { xPercent: -12, duration: 1 }, at)
            .to(shades[i - 1], { opacity: 0.75, duration: 1 }, at);
        });
        tl.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: total - 1 }, 0).fromTo(
          drone,
          { left: "0%" },
          { left: "100%", duration: total - 1 },
          0,
        );

        return () => {
          section.classList.remove("is-staged");
          setStep(0);
        };
      });

      // Varias secciones fijan la pantalla: GSAP debe calcular sus posiciones de arriba hacia abajo,
      // si no, la sección de Aplicaciones (que está más abajo) se activa antes de tiempo.
      const settle = () => {
        if (disposed) return;
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      };
      settle();
      void document.fonts.ready.then(settle);
      window.addEventListener("load", settle);
      cleanup = () => {
        window.removeEventListener("load", settle);
        mm.revert();
      };
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, [total]);

  return (
    <section ref={root} className="orion-flight" aria-labelledby="orion-flight-title">
      <div className="orion-flight__head">
        <div className="orion-section-tag orion-section-tag--light"><span>→</span> RECORRIDO</div>
        <h2 id="orion-flight-title">
          {orionFlight.title[0]}
          <br />
          {orionFlight.title[1]}
        </h2>
        <p>{orionFlight.intro}</p>
      </div>

      <div className="orion-flight__stage">
        {orionFlight.steps.map((s, i) => (
          <article key={s.id} className="orion-flight__slide" data-active={step === i}>
            <figure className="orion-flight__photo">
              <div className="orion-flight__clip">
                <img src={s.image} alt={s.alt} width="1600" height="900" loading="lazy" decoding="async" style={{ objectPosition: s.position }} />
                <i className="orion-flight__shade" aria-hidden="true" />
              </div>
            </figure>
            <div className="orion-flight__copy">
              <span className="orion-flight__index">
                {pad(i + 1)}
                <small> / {pad(total)}</small>
              </span>
              <span className="orion-flight__kicker">{s.kicker}</span>
              <h3>{s.title}</h3>
              <p>{s.copy}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="orion-flight__path" aria-hidden="true">
        <span className="orion-flight__line">
          <i className="orion-flight__bar" />
          <i className="orion-flight__drone" />
        </span>
        <ul>
          {orionFlight.steps.map((s, i) => (
            <li key={s.id} data-active={step >= i}>
              {pad(i + 1)} {s.kicker}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}