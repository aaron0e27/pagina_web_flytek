import { GraduationCap, Headset, Wrench } from "lucide-react";
import { vegaData } from "@/lib/vega/data";

const icons = { grad: GraduationCap, wrench: Wrench, headset: Headset } as const;

export function VegaService() {
  return (
    <section className="section vega-service" aria-labelledby="vega-service-title">
      <div className="vega-service__head">
        <p className="eyebrow">ACOMPAÑAMIENTO</p>
        <h2 id="vega-service-title">
          No solo es un dron.
          <br />
          <span className="muted">Somos un equipo.</span>
        </h2>
        <p>Flytek Innovations es una empresa 100% mexicana. Te acompañamos desde la capacitación hasta el soporte en campo.</p>
      </div>
      <ul className="vega-service__list">
        {vegaData.service.map((s) => {
          const Icon = icons[s.icon as keyof typeof icons];
          return (
            <li key={s.title}>
              <span aria-hidden="true"><Icon size={26} strokeWidth={1.4} /></span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
