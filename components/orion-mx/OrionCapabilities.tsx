"use client";

import { useState } from "react";
import { Camera, Layers3, ShieldCheck } from "lucide-react";

const caps = [
  {
    id: "material",
    icon: Layers3,
    kicker: "01 / MATERIAL",
    title: ["Ligero en forma.", "Serio en función."],
    copy: "La fibra de carbono combina rigidez y bajo peso en una plataforma compacta de menos de dos kilogramos.",
    metric: "1,980",
    unit: "g",
    note: "peso del dron",
  },
  {
    id: "proteccion",
    icon: ShieldCheck,
    kicker: "02 / PROTECCIÓN",
    title: ["Preparado para", "trabajar cerca."],
    copy: "Protectores de propela y asistencia anticolisión para entornos que exigen maniobras precisas.",
    metric: "0.5",
    unit: "m",
    note: "acercamiento seguro",
  },
  {
    id: "integracion",
    icon: Camera,
    kicker: "03 / INTEGRACIÓN",
    title: ["Una plataforma.", "Distintas miradas."],
    copy: "Opciones de cámara y estabilización que se ajustan a los objetivos de cada operación.",
    metric: "48",
    unit: "MP",
    note: "+ cámara térmica",
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
      <em>REC · FULL HD / TÉRMICA</em>
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