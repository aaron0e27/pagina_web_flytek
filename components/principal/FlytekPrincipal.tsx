"use client";
import { useScrollScenes } from "@/components/shared/useScrollScenes";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Minus, Plus, Pause, Play } from "lucide-react";
import SiteHeader from "@/components/shared/SiteHeader";
import { fenixAssets } from "@/lib/fenix/assets";
import { homeCopy, platforms, sectors, support } from "@/lib/principal/data";
export default function FlytekPrincipal() {
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(true);
  const [platform, setPlatform] = useState(0);
  const [sector, setSector] = useState(0);
  const [openSupport, setOpenSupport] = useState<number | null>(0);
  const [showIntro, setShowIntro] = useState(false);
  const drone = platforms[platform];
  const mission = sectors[sector];
  useEffect(() => {
    let introSeen = false;
    try {
      introSeen = sessionStorage.getItem("flytek-intro-seen") === "true";
    } catch {
      introSeen = false;
    }
    if (introSeen) {
      setShowIntro(false);
      return;
    }
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;
    setShowIntro(true);
    const timer = window.setTimeout(
      () => {
        try {
          sessionStorage.setItem("flytek-intro-seen", "true");
        } catch {}
        setShowIntro(false);
      },
      900,
    );
    return () => {
      window.clearTimeout(timer);
    };
  }, []);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPaused(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    let visible = false;
    const update = () => { if (paused || !visible || document.hidden) element.pause(); else void element.play().catch(() => {}); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    update();
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); element.pause(); };
  }, [paused]);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { (entry.target as HTMLElement).dataset.motionOffscreen = String(!entry.isIntersecting); }));
    root.current?.querySelectorAll(".home-platform-stage, .home-flight-scene").forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, [platform]);
  useEffect(() => {
  const host = root.current;
  if (!host) return;

  const navigateToSection = async (event: MouseEvent) => {
    const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>(
      'a[href^="/#"]',
    );

    if (!anchor || window.location.pathname !== "/") return;

    const id = anchor.hash.slice(1);
    const target = document.getElementById(id);

    if (!target) return;

    event.preventDefault();

    const { ScrollTrigger } = await import("gsap/ScrollTrigger");

    ScrollTrigger.refresh();

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const margin =
          Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0;

        const top =
          target.getBoundingClientRect().top + window.scrollY - margin;

        window.scrollTo({
          top,
          behavior: "smooth",
        });

        window.history.replaceState(null, "", `#${id}`);
      });
    });
  };

  host.addEventListener("click", navigateToSection);

  return () => {
    host.removeEventListener("click", navigateToSection);
  };
}, []);

useScrollScenes(root, "home", !paused && !showIntro);
  return (
    <div ref={root} className={`fenix-page home-page scroll-page${paused ? " home-paused" : ""}`}>
      {showIntro && (
        <div
          className="home-loader"
          role="status"
          aria-live="polite"
          aria-label="Cargando Flytek Innovations"
        >
          <div className="home-loader-orbit" aria-hidden="true">
            <i />
            <i />
            <span />
          </div>
          <img
            className="home-loader-logo"
            src={fenixAssets.logo}
            alt="Flytek Innovations"
            width="190"
            height="64"
          />
          <p>INGENIERÍA QUE ELEVA TU OPERACIÓN</p>
          <div className="home-loader-progress" aria-hidden="true">
            <span />
          </div>
        </div>
      )}
      <a className="skip" href="#inicio">
        Saltar al contenido
      </a>
      <SiteHeader />
      <main>
        <section className="home-hero" id="inicio" aria-labelledby="home-heading">
          <video
            ref={video}
            className="home-hero-video"
            src={fenixAssets.video}
            poster={fenixAssets.inspection}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
          />
          <div className="home-hero-shade" />
          <div className="home-hero-meta">
            <span>INGENIERÍA MEXICANA</span>
          </div>
          <div className="home-word-group" aria-hidden="true">
            <img
              className="home-word-logo"
              src="/images/flytek-logo.png"
              alt=""
            />
          </div>
          <div className="home-hero-copy">
            <p className="home-label">DRONES PARA EL TRABAJO REAL</p>
            <h1 id="home-heading">{homeCopy.headline}</h1>
            <a className="home-link-light" href="#drones">
              Conocer más <ArrowDown size={20} />
            </a>
          </div>
        </section>
        <section className="home-company home-container" id="empresa">
          <div className="home-section-line">
            <span className="home-label">01 / SOMOS FLYTEK</span>
            <span>TECNOLOGÍA CON PROPÓSITO</span>
          </div>
          <div className="home-company-grid" data-home-reveal>
            <h2>
              El futuro se ve
              <br />
              mejor desde <em>arriba.</em>
            </h2>
            <div>
              <p className="home-lead">{homeCopy.introduction}</p>
              <p>{homeCopy.company}</p>
              <a className="home-text-link" href="#contacto">
                Conversemos sobre tu operación <ArrowUpRight size={20} />
              </a>
            </div>
          </div>
          <div
            className="home-flight-scene"
            data-home-reveal
            aria-label="Representación animada de FÉNIX sobre un terreno digital"
          >
            <div className="home-flight-copy">
              <span className="home-label">DISEÑO / INTEGRACIÓN / OPERACIÓN</span>
              <p>
                Configuramos cada sistema alrededor de la información que necesitas obtener, desde
                vigilancia e inspección hasta construcción y búsqueda.
              </p>
            </div>
            <div className="home-flight-path" aria-hidden="true" />
            <img
              className="home-flight-drone home-flight-drone--fenix"
              src={fenixAssets.product}
              alt=""
              width="900"
              height="447"
              loading="lazy"
            />
            <svg
              className="home-terrain"
              viewBox="0 0 1000 280"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <pattern id="flytek-grid" width="52" height="30" patternUnits="userSpaceOnUse">
                  <path d="M52 0H0V30" fill="none" stroke="currentColor" strokeWidth="1" />
                </pattern>
              </defs>
              <path
                d="M0 135 C160 45 270 210 430 128 C610 37 725 220 1000 90 V280 H0Z"
                fill="url(#flytek-grid)"
              />
              <path
                d="M0 135 C160 45 270 210 430 128 C610 37 725 220 1000 90"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              />
            </svg>
            <div className="home-flight-data">
              <span>19.4326° N</span>
              <span>99.1332° W</span>
              <span>SISTEMA ACTIVO</span>
            </div>
          </div>
          <div className="home-values">
            <article>
              <span>01</span>
              <h3>Diseño industrial</h3>
              <p>Plataformas aéreas para las necesidades del trabajo en campo.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Integración de sensores</h3>
              <p>La información que buscas comienza con la carga útil adecuada.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Respaldo nacional</h3>
              <p>Refacciones, mantenimiento y soporte cerca de tu operación.</p>
            </article>
          </div>
        </section>
        <section className="home-fleet" id="drones">
          <div className="home-container">
            <div className="home-section-line">
              <span className="home-label">02 / NUESTRAS PLATAFORMAS</span>
              <span>ELIGE TU PERSPECTIVA</span>
            </div>
            <div className="home-fleet-heading" data-home-reveal>
              <h2>
                Una misión.
                <br />
                <em>Tu plataforma.</em>
              </h2>
              <p>
                Tres formas de llevar tu operación
                <br />a una nueva altura.
              </p>
            </div>
            <div
              className="home-platform-selector"
              role="group"
              aria-label="Seleccionar plataforma"
            >
              {platforms.map((item, index) => (
                <button
                  key={item.id}
                  aria-pressed={platform === index}
                  aria-controls="platform-detail"
                  onClick={() => setPlatform(index)}
                >
                  <span>0{index + 1}</span>
                  {item.name}
                  <ArrowUpRight size={20} />
                </button>
              ))}
            </div>
            <div
              id="platform-detail"
              className="home-platform-detail"
              aria-live="polite"
              aria-atomic="true"
            >
              <div
                className={`home-platform-stage${drone.available ? "" : " home-platform-pending"}`}
                key={`${drone.id}-image`}
              >
                <span aria-hidden="true">{drone.name}</span>
                <div className="home-orbit" />
                                {drone.image ? (
                  <img
                    src={drone.image}
                    alt={`Plataforma ${drone.name} de Flytek`}
                    width="1000"
                    height="600"
                    loading="lazy"
                    className={drone.id === "vega" ? "home-platform-photo-cutout" : undefined}
                  />
                ) : (
                  <div
                    className="home-pending-art"
                    aria-label={`Imagen de ${drone.name} pendiente`}
                  >
                    <i />
                    <small>IMAGEN / MODELO PENDIENTE</small>
                  </div>
                )}
                <small>FLYTEK / {drone.name}</small>
              </div>
              <div className="home-platform-copy" key={drone.id}>
                <p className="home-label">0{platform + 1} / PLATAFORMAS FLYTEK</p>
                <h3>{drone.title}</h3>
                <p>{drone.description}</p>
                <ul>
                  {drone.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                {drone.href ? (
                  <a className="home-button" href={drone.href}>
                    Explorar {drone.name}
                    <ArrowUpRight size={19} />
                  </a>
                ) : (
                  <span className="home-button home-button-disabled" aria-disabled="true">
                    Página en preparación
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>
        <section className="home-sectors home-container" id="sectores">
          <div className="home-section-line">
            <span className="home-label">03 / APLICACIONES</span>
            <span>DEL VUELO A LA ACCIÓN</span>
          </div>
          <div className="home-sectors-title" data-home-reveal>
            <h2>
              Donde hay un reto,
              <br />
              hay otra <em>perspectiva.</em>
            </h2>
            <p>
              Explora cómo una plataforma aérea
              <br />
              puede acompañar a tu industria.
            </p>
          </div>
          <div className="home-sector-buttons" role="group" aria-label="Seleccionar sector">
            {sectors.map((item, index) => (
              <button
                key={item.name}
                aria-pressed={sector === index}
                aria-controls="sector-detail"
                onClick={() => setSector(index)}
              >
                {item.name}
                <ArrowUpRight size={17} />
              </button>
            ))}
          </div>
          <div className="home-sector-detail" id="sector-detail" aria-live="polite">
            <img
              key={mission.image}
              src={mission.image}
              alt={mission.alt}
              width="1400"
              height="850"
              loading="lazy"
            />
            <div className="home-sector-overlay" />
            <div className="home-sector-copy" key={mission.name}>
              <p className="home-label">{mission.tag}</p>
              <h3>{mission.title}</h3>
              <p>{mission.description}</p>
              <a className="home-link-light" href={`#aplicacion-${mission.slug}`}>
                Ver aplicación a detalle <ArrowDown size={20} />
              </a>
            </div>
            <span className="home-sector-number" aria-hidden="true">
              0{sector + 1}
            </span>
          </div>
          <div className="home-application-details">
            {sectors.map((item, index) => (
              <article
                className="home-application-card"
                id={`aplicacion-${item.slug}`}
                key={item.slug}
                data-home-reveal
              >
                <div className="home-application-image">
                  <img src={item.image} alt={item.alt} width="1200" height="800" loading="lazy" />
                  <span>
                    0{index + 1} / {item.name.toUpperCase()}
                  </span>
                </div>
                <div className="home-application-copy">
                  <p className="home-label">{item.tag}</p>
                  <h3>{item.detailTitle}</h3>
                  <p>{item.detailText}</p>
                  <ul>
                    {item.capabilities.map((capability) => (
                      <li key={capability}>{capability}</li>
                    ))}
                  </ul>
                  <a
                    className="home-text-link"
                    href={`mailto:${homeCopy.email}?subject=${encodeURIComponent(`Proyecto de ${item.name} — Flytek`)}`}
                  >
                    Evaluar una misión de {item.name}
                    <ArrowUpRight size={19} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="home-support" id="soporte">
          <div className="home-container home-support-grid">
            <div data-home-reveal>
              <p className="home-label">04 / ACOMPAÑAMIENTO</p>
              <h2>
                No solo un dron.
                <br />
                <em>Todo un equipo.</em>
              </h2>
              <p>
                La tecnología es el comienzo. Nuestro equipo te acompaña en lo que viene después.
              </p>
              <div className="home-support-mark" aria-hidden="true">
                MX
                <span>
                  INGENIERÍA
                  <br />Y SOPORTE NACIONAL
                </span>
              </div>
            </div>
            <div className="home-accordion">
              {support.map((item, index) => (
                <article key={item.title}>
                  <h3>
                    <button
                      onClick={() => setOpenSupport(openSupport === index ? null : index)}
                      aria-expanded={openSupport === index}
                      aria-controls={`support-${index}`}
                      id={`support-button-${index}`}
                    >
                      <span>0{index + 1}</span>
                      {item.title}
                      {openSupport === index ? <Minus size={20} /> : <Plus size={20} />}
                    </button>
                  </h3>
                  <div
                    id={`support-${index}`}
                    role="region"
                    aria-labelledby={`support-button-${index}`}
                    hidden={openSupport !== index}
                  >
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="home-contact home-container" id="contacto">
          <div data-home-reveal>
            <p className="home-label">LA SIGUIENTE MISIÓN EMPIEZA CONTIGO</p>
            <h2>
              Hagamos que
              <br />
              <em>suceda.</em>
              <span>↗</span>
            </h2>
          </div>
          <div className="home-contact-bottom">
            <p>
              Cuéntanos qué necesitas observar,
              <br />
              inspeccionar o resolver.
            </p>
            <a href={`mailto:${homeCopy.email}`} className="home-text-link">
              {homeCopy.email}
              <ArrowUpRight size={22} />
            </a>
            <a href="tel:+525654407312">{homeCopy.phone}</a>
          </div>
        </section>
      </main>
      <footer className="home-footer">
        <div className="home-container">
          <a href="/" aria-label="Flytek — inicio">
            <img src={fenixAssets.logo} alt="Flytek Innovations" width="150" height="50" />
          </a>
          <nav aria-label="Páginas de drones">
            {platforms.map((item) =>
              item.href ? (
                <a key={item.id} href={item.href}>
                  {item.name}
                  <ArrowUpRight size={14} />
                </a>
              ) : (
                <span key={item.id}>{item.name} · Próximamente</span>
              ),
            )}
          </nav>
          <a href="#inicio">
            Volver arriba <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="home-container home-footer-bottom">
          <span>© {new Date().getFullYear()} Flytek Innovations</span>
          <span>Diseño e integración de drones industriales · México</span>
        </div>
      </footer>
    </div>
  );
}
