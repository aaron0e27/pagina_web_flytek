"use client";

import { useState } from "react";
import { Camera, Layers3, ShieldCheck } from "lucide-react";

const caps = [
  {
    id: "material",
    icon: Layers3,
    kicker: "01 / RESISTENCIA",
    title: ["Hecho para", "ambientes difíciles."],
    copy: "Frame de fibra de carbono con materiales de grado aeroespacial, validado bajo esfuerzos y cargas para asegurar un buen rendimiento.",
    metric: "1,980",
    unit: "g",
    note: "peso total del dron",
  },
  {
    id: "proteccion",
    icon: ShieldCheck,
    kicker: "02 / SEGURIDAD",
    title: ["Trabaja cerca.", "Sin arriesgar a nadie."],
    copy: "Su distancia de seguridad permite acercamientos de hasta 0.5 m sin preocuparte por una colisión. ORION hace la labor sin exponer a tu personal.",
    metric: "0.5",
    unit: "m",
    note: "acercamiento seguro",
  },
  {
    id: "integracion",
    icon: Camera,
    kicker: "03 / PERSONALIZABLE",
    title: ["Una plataforma.", "Distintas miradas."],
    copy: "Lo adaptamos a tu trabajo: sensores especializados, cámaras multiespectrales, térmicas y fotogramétricas, y lámparas de alta luminosidad.",
    metric: "5",
    unit: "opciones",
    note: "de integración",
  },
] as const;

function Visual({ id }: { id: string }) {
  if (id === "material") return <div className="orion-caps__visual orion-caps__weave" aria-hidden="true"><i /></div>;
  if (id === "proteccion")
    return (
      <div className="orion-caps__visual orion-caps__radar" aria-hidden="true">
        <i /><i /><i /><b />
      </div>
    );
  return (
    <div className="orion-caps__visual orion-caps__reticle" aria-hidden="true">
      <i /><i /><i /><i /><b />
      <em>MULTIESPECTRAL · TÉRMICA</em>
    </div>
  );
}

export default function OrionCapabilities() {
  const [active, setActive] = useState(0);
  return (
    <section className="orion-caps" aria-label="Capacidades de ORION">
      <div className="orion-caps__list">
        {caps.map((c, i) => {
          const Icon = c.icon;
          return (
            <article
              key={c.id}
              className="orion-caps__item"
              data-active={active === i}
              style={{ ["--i" as string]: i }}
              tabIndex={0}
              onMouseEnter={() => { if (matchMedia("(hover: hover)").matches) setActive(i); }}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
            >
              <header>
                <span>{c.kicker}</span>
                <Icon size={22} strokeWidth={1.5} />
              </header>
              <Visual id={c.id} />
              <div className="orion-caps__metric">
                <strong>{c.metric}<small>{c.unit}</small></strong>
                <em>{c.note}</em>
              </div>
              <div className="orion-caps__text">
                <h3>{c.title[0]}<br />{c.title[1]}</h3>
                <p>{c.copy}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}