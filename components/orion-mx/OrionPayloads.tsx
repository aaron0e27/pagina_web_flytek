"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { orionPayloads } from "@/lib/orion-mx/data";

export default function OrionPayloads() {
  const [active, setActive] = useState(0);
  return (
    <section className="orion-pay" id="cargas" aria-labelledby="orion-pay-title">
      <div className="orion-pay__head">
        <div className="orion-section-tag orion-reveal"><span>05</span> CARGAS ÚTILES</div>
        <h2 id="orion-pay-title" className="orion-reveal">Una plataforma.<br />Distintas miradas.</h2>
        <p className="orion-reveal">Elige la cámara que tu operación necesita. Admite hasta 500 g de carga útil y se integra a tu medida.</p>
      </div>
      <ul className="orion-pay__rail orion-reveal">
        {orionPayloads.map((p, i) => (
          <li
            key={p.id}
            className={i === active ? "is-active" : ""}
            tabIndex={0}
            onMouseEnter={() => matchMedia("(hover:hover)").matches && setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
          >
            <div className="orion-pay__img"><Image unoptimized src={p.image} alt={p.alt} width={1000} height={656} sizes="(max-width: 900px) 90vw, 30vw" loading="lazy" /></div>
            <div className="orion-pay__info">
              <span className="orion-pay__n">0{i + 1}</span>
              <strong>{p.big}</strong>
              <h3>{p.title}</h3>
              <div className="orion-pay__more">
                <div>
                  <p>{p.text}</p>
                  <ul>{p.chips.map((c) => <li key={c}>{c}</li>)}</ul>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <a className="orion-pay__cta orion-reveal" href="mailto:info@flytek.com.mx?subject=Integraci%C3%B3n%20ORION">
        <span>¿Necesitas otra integración?</span>
        <b>Cuéntanos tu proyecto <ArrowUpRight size={16} /></b>
      </a>
    </section>
  );
}
