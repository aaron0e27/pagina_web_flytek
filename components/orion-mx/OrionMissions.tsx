"use client";

import { useState } from "react";
import Image from "next/image";
import { orionMissions } from "@/lib/orion-mx/data";

export default function OrionMissions() {
  const [i, setI] = useState(0);
  const m = orionMissions[i];
  return (
    <section className="orion-missions" id="aplicaciones" aria-labelledby="orion-missions-title">
      <div className="orion-missions__head">
        <div className="orion-section-tag orion-reveal">MISIONES</div>
        <h2 id="orion-missions-title" className="orion-reveal">Tú eliges<br />la misión.</h2>
        <p className="orion-reveal">ORION se adapta a la operación: cambia la carga útil y el plan de vuelo, no el equipo.</p>
      </div>
      <div className="orion-missions__body orion-reveal">
        <div className="orion-missions__stage" aria-hidden="true">
          {orionMissions.map((x, k) => (
            <Image key={x.id} unoptimized src={x.image} alt="" fill sizes="(max-width: 900px) 100vw, 55vw" className={`${k === i ? "is-on " : ""}${x.fit === "contain" ? "is-contain" : ""}`} loading="lazy" />
          ))}
          <span className="orion-missions__badge"><i /> {m.payload}</span>
        </div>
        <div className="orion-missions__list" role="tablist" aria-label="Misiones">
          {orionMissions.map((x, k) => (
            <button key={x.id} type="button" role="tab" aria-selected={k === i} className={k === i ? "is-active" : ""} onClick={() => setI(k)} onMouseEnter={() => matchMedia("(hover:hover)").matches && setI(k)}>
              <span className="orion-missions__n">0{k + 1}</span>
              <span className="orion-missions__txt">
                <small>{x.kicker}</small>
                <b>{x.title}</b>
                <span className="orion-missions__more"><span>{x.copy}</span></span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
