"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Mail, Phone } from "lucide-react";
import "@/styles/support.css";

/**
 * Acompañamiento + contacto. Mismo formato en ORION y VEGA.
 * Cambia solo los datos (correo, teléfonos, enlace de cotización) y el número de sección.
 */
const items = [
  { kicker: "Capacitación", big: "Incluida", title: "Aprende en tu zona de trabajo.", copy: "Capacitamos a tu equipo donde opera, sin que tengas que trasladarte." },
  { kicker: "Mantenimiento", big: "Mínimo", title: "Diseñado para durar.", copy: "Por su diseño y armado, requiere muy poco mantenimiento." },
  { kicker: "Soporte", big: "24/7", title: "Siempre contigo.", copy: "Soporte a nivel nacional, las 24 horas, los siete días de la semana.", live: true },
] as const;

type Props = {
  variant: "orion" | "vega" | "fenix" | "home";
  num?: string;
  quoteHref: string;
  email: string;
  phones: readonly string[];
  className?: string;
};

const tel = (p: string) => `tel:${p.replace(/[^\d+]/g, "")}`;

export default function SupportSection({ variant, num, quoteHref, email, phones, className = "" }: Props) {
  const ref = useRef<HTMLElement>(null);
  // En celular las tres tarjetas se despliegan; en escritorio siempre están abiertas.
  const [mobile, setMobile] = useState(false);
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    const mq = matchMedia("(max-width: 900px)");
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-rise]"));
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.setAttribute("data-in", ""));
      return;
    }
    root.classList.add("is-armed");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.setAttribute("data-in", ""); io.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} id="contacto" className={`flytek-support flytek-support--${variant} ${className}`.trim()} aria-labelledby={`support-title-${variant}`}>
      <div className="flytek-support__head">
        <div>
          <p className="flytek-support__tag" data-rise>{num && <span>{num}</span>}ACOMPAÑAMIENTO</p>
          <h2 id={`support-title-${variant}`}>No solo es un dron.<br /><em>Somos un equipo.</em></h2>
        </div>
        <p data-rise>Flytek Innovations es una empresa 100% mexicana. Te acompañamos desde la capacitación hasta el soporte en campo.</p>
      </div>

      <div className="flytek-support__grid">
        {items.map((it, i) => {
          const isOpen = !mobile || open === i;
          return (
            <article className={`flytek-support__item${isOpen ? " is-open" : ""}`} key={it.kicker} data-rise style={{ ["--i" as string]: i }}>
              <button
                type="button"
                className="flytek-support__toggle"
                aria-expanded={mobile ? isOpen : undefined}
                aria-controls={`support-${variant}-${i}`}
                onClick={() => mobile && setOpen(open === i ? null : i)}
              >
                <span>{String(i + 1).padStart(2, "0")} / {it.kicker}</span>
                <strong>{"live" in it && <i aria-hidden="true" />}{it.big}</strong>
                <ChevronDown className="flytek-support__chev" size={20} aria-hidden="true" />
              </button>
              <div className="flytek-support__more" id={`support-${variant}-${i}`}>
                <div>
                  <h3>{it.title}</h3>
                  <p>{it.copy}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="flytek-support__contact" data-rise>
        <p>¿Hablamos de tu operación?</p>
        <div className="flytek-support__links">
          <a className="flytek-support__cta" href={quoteHref}>Hablar con un especialista <ArrowUpRight size={16} aria-hidden="true" /></a>
          <a href={`mailto:${email}`}><Mail size={15} aria-hidden="true" />{email}</a>
          {phones.map((p) => (<a key={p} href={tel(p)}><Phone size={15} aria-hidden="true" />{p}</a>))}
        </div>
      </div>
    </section>
  );
}
