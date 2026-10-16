import { ArrowRight, Mail, Phone } from "lucide-react";

const items = [
  { kicker: "01 / CAPACITACIÓN", big: "Incluida", title: "Aprende en tu zona de trabajo.", copy: "Capacitamos a tu equipo donde opera, para que no tengas que trasladarte y te sientas cómodo al manejarlo." },
  { kicker: "02 / MANTENIMIENTO", big: "Mínimo", title: "Diseñado para durar.", copy: "Por la naturaleza de su diseño y armado, el mantenimiento es mínimo." },
  { kicker: "03 / SOPORTE", big: "24/7", title: "Siempre contigo.", copy: "Soporte a nivel nacional las 24 horas, los siete días de la semana.", live: true },
] as const;

export default function OrionSupport() {
  return (
    <section className="orion-support" id="contacto" aria-labelledby="orion-support-title">
      <div className="orion-support__head">
        <div>
          <div className="orion-section-tag orion-reveal"><span>07</span> ACOMPAÑAMIENTO</div>
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
      <div className="orion-support__contact orion-reveal">
        <div>
          <h3>Tu siguiente misión puede empezar aquí.</h3>
          <p>Cuéntanos la operación, el objetivo y la carga útil que necesitas.</p>
        </div>
        <div className="orion-support__links">
          <a className="orion-support__mail" href="mailto:info@flytek.com.mx"><Mail size={16} aria-hidden="true" /> Hablar con un especialista <ArrowRight size={16} aria-hidden="true" /></a>
          <a href="tel:+525654407312"><Phone size={15} aria-hidden="true" /> +52 56 5440 7312</a>
          <a href="tel:+525522188546"><Phone size={15} aria-hidden="true" /> +52 55 2218 8546</a>
        </div>
      </div>
    </section>
  );
}
