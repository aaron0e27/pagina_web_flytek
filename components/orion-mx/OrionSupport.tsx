const items = [
  { kicker: "01 / CAPACITACIÓN", big: "Incluida", title: "Aprende en tu zona de trabajo.", copy: "Capacitamos a tu equipo donde opera, para que no tengas que trasladarte y te sientas cómodo al manejarlo." },
  { kicker: "02 / MANTENIMIENTO", big: "Mínimo", title: "Diseñado para durar.", copy: "Por la naturaleza de su diseño y armado, el mantenimiento es mínimo." },
  { kicker: "03 / SOPORTE", big: "24/7", title: "Siempre contigo.", copy: "Soporte a nivel nacional las 24 horas, los siete días de la semana.", live: true },
] as const;

export default function OrionSupport() {
  return (
    <section className="orion-support" aria-labelledby="orion-support-title">
      <div className="orion-support__head">
        <div>
          <div className="orion-section-tag orion-reveal"><span>06</span> ACOMPAÑAMIENTO</div>
          <h2 id="orion-support-title" className="orion-reveal">No solo es un dron.<br /><em>Somos un equipo.</em></h2>
        </div>
        <p className="orion-reveal">Flytek Innovations es una empresa 100% mexicana. Te acompañamos desde la capacitación hasta el soporte en campo.</p>
      </div>
      <div className="orion-support__grid">
        {items.map((it) => (
          <article className="orion-support__item orion-reveal" key={it.kicker} tabIndex={0}>
            <span>{it.kicker}</span>
            <strong>
              {"live" in it && <i className="orion-support__live" aria-hidden="true" />}
              {it.big}
            </strong>
            <h3>{it.title}</h3>
            <p>{it.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}