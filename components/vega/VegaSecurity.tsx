import { vegaData } from "@/lib/vega/data";

const items = [
  {
    n: "01",
    title: "Seguimiento automático",
    text: "Cámara multisensor 4 en 1 para seguir objetivos de forma automática durante las operaciones de vuelo.",
  },
  {
    n: "02",
    title: "Observación nocturna",
    text: "Cámaras térmicas para ver y vigilar en la oscuridad, cuando más se necesita.",
  },
  {
    n: "03",
    title: "Disuasión",
    text: "Carga útil personalizable con altavoces y luces para comunicarte y disuadir a distancia.",
  },
];

export function VegaSecurity() {
  return (
    <section className="section vega-security" id="seguridad-publica" aria-labelledby="vega-security-title">
      <div className="section-head" data-reveal>
        <p className="eyebrow">06 / SEGURIDAD PÚBLICA</p>
        <span className="eyebrow">OPCIONES PARA CORPORACIONES</span>
      </div>
      <h2 id="vega-security-title" data-reveal>
        Vigilancia que
        <br />
        <span className="muted">llega más lejos.</span>
      </h2>
      <div className="vega-security__grid">
        {items.map((it) => (
          <article key={it.n} className="vega-security__item" data-reveal>
            <span>{it.n}</span>
            <h3>{it.title}</h3>
            <p>{it.text}</p>
          </article>
        ))}
      </div>
      <a className="vega-security__cta" href={vegaData.contactSecurityHref}>
        Consultar configuración para seguridad pública <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}
