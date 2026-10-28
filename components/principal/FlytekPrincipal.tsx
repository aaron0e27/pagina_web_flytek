"use client";
import { useScrollScenes } from "@/components/shared/useScrollScenes";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Pause, Play } from "lucide-react";
import SupportSection from "@/components/shared/SupportSection";
import SiteHeader from "@/components/shared/SiteHeader";
import DroneGallery from "@/components/principal/DroneGallery";
import { fenixAssets } from "@/lib/fenix/assets";
import SiteFooter from "@/components/shared/SiteFooter";
import {
  homeCopy,
  platforms,
  sectorBenefits,
  sectorDetails,
  sectors,
} from "@/lib/principal/data";
export default function FlytekPrincipal({
  initiallyShowIntro,
}: {
  initiallyShowIntro: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(true);
  const [platform, setPlatform] = useState(0);
  const [sector, setSector] = useState(0);
  const [showIntro, setShowIntro] = useState(initiallyShowIntro);
  const drone = platforms[platform];
  const mission = sectors[sector];
  const missionDetail = sectorDetails[sector];
useEffect(() => {
  if (!showIntro) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reducedMotion) {
    setShowIntro(false);
    return;
  }

  const timer = window.setTimeout(() => {
    document.cookie = "flytek-intro-seen=true; path=/; SameSite=Lax";
    setShowIntro(false);
  }, 900);

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
  // Aparición suave de las tarjetas del sector cuando entran en pantalla.
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".home-sector-expanded");
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-rise]"));
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-in"));
      return;
    }
    root.classList.add("is-armed");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sector]);
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
    root.current?.querySelectorAll(".home-platform-stage").forEach(element => observer.observe(element));
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
            className={`home-hero-video${showIntro ? " home-hero-video--hidden" : ""}`}
            src={fenixAssets.video}
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
          <div className="home-company-grid" data-home-reveal>
            <h2>
              El futuro se ve
              <br />
              mejor desde <em>arriba.</em>
            </h2>
            <div>
              <p className="home-lead">{homeCopy.introduction}</p>
              <p>{homeCopy.company}</p>
            </div>
          </div>
          <DroneGallery />
          <div className="home-values">
            <article>
              <h3>Diseño industrial</h3>
              <p>Plataformas aéreas para las necesidades del trabajo en campo.</p>
            </article>
            <article>
              <h3>Integración de sensores</h3>
              <p>La información que buscas comienza con la carga útil adecuada.</p>
            </article>
            <article>
              <h3>Respaldo nacional</h3>
              <p>Refacciones, mantenimiento y soporte cerca de tu operación.</p>
            </article>
          </div>
        </section>
        <section className="home-fleet" id="drones">
          <div className="home-container">
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
                <small>{drone.name}</small>
              </div>
              <div className="home-platform-copy" key={drone.id}>
                <p className="home-label">PLATAFORMAS FLYTEK</p>
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
              <a className="home-link-light" href="#sector-expanded">
                Ver aplicación a detalle <ArrowDown size={20} />
              </a>
            </div>
          </div>
          <div
            className="home-sector-expanded"
            id="sector-expanded"
            key={missionDetail.slug}
            aria-live="polite"
          >
            <header className="home-detail-heading" data-home-reveal>
              <div className="home-detail-heading-title">
                <p className="home-label">{missionDetail.name}</p>
                <h3>{missionDetail.title}</h3>
              </div>
              <p>{missionDetail.summary}</p>
            </header>

            <section className="home-adv" aria-label={`Ventajas para ${missionDetail.name}`}>
              <figure className="home-adv-photo" data-rise>
                <img
                  src={missionDetail.capabilityImage}
                  alt={missionDetail.capabilityAlt}
                  style={{ objectPosition: missionDetail.capabilityPosition }}
                  width="1600"
                  height="1000"
                  loading="lazy"
                />
                <figcaption>
                  <span>{missionDetail.name}</span>
                  Ventajas Flytek
                </figcaption>
              </figure>
              <div className="home-adv-list">
                {missionDetail.proofs.map((proof, i) => (
                  <article className="home-adv-item" key={proof.title} data-rise style={{ ["--i" as string]: i }}>
                    <span className="home-adv-n" aria-hidden="true">0{i + 1}</span>
                    <div>
                      <h4>{proof.title}</h4>
                      <p>{proof.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="home-applications">
              <header className="home-applications-heading">
                <p className="home-label">Aplicaciones</p>
                <p>{missionDetail.applicationIntro}</p>
              </header>
              <div className={`home-app-grid is-n${missionDetail.applications.length}`}>
                {missionDetail.applications.map((application, i) => (
                  <article className="home-app" key={application.title} data-rise style={{ ["--i" as string]: i % 2 }}>
                    <img
                      className="home-app-bg"
                      src={application.image}
                      alt=""
                      width="1000"
                      height="600"
                      loading="lazy"
                    />
                    <span className="home-app-n" aria-hidden="true">0{i + 1}</span>
                    <div className="home-app-body">
                      <h4>{application.title}</h4>
                      <p>{application.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="home-recommended">
              <header>
                <p className="home-label">Drones recomendados</p>
              </header>
              <div className={`home-recommended-grid${missionDetail.drones.length === 1 ? " is-single" : ""}`}>
                {missionDetail.drones.map((recommended) => (
                  <article className="home-drone-card" key={recommended.name} data-rise>
                    <a className="home-drone-image" href={recommended.href} tabIndex={-1} aria-hidden="true" data-name={recommended.name}>
                      <img
                        src={recommended.image}
                        alt=""
                        width="800"
                        height="600"
                        loading="lazy"
                      />
                    </a>
                    <div className="home-drone-copy">
                      <p className="home-label">{recommended.context}</p>
                      <h4>
                        <a href={recommended.href} aria-label={`Conocer el drone ${recommended.name}`}>
                          {recommended.name}
                          <ArrowUpRight size={25} aria-hidden="true" />
                        </a>
                      </h4>
                      <p>{recommended.text}</p>
                      <ul className="home-drone-chips">
                        {recommended.specs.map(([label, value]) => (
                          <li key={label}>
                            <small>{label}</small>
                            {value}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="home-benefits" aria-label="Beneficios en campo">
              <p className="home-label">Beneficios en campo</p>
              <ul>
                {sectorBenefits.map((benefit, i) => (
                  <li key={benefit.label} data-rise style={{ ["--i" as string]: i }}>
                    <span className="home-benefit-ico" aria-hidden="true" style={{ ["--ico" as string]: `url(${benefit.icon})` }} />
                    <span>{benefit.label}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </section>
        <div id="soporte">
          <SupportSection
            variant="home"
            quoteHref={`mailto:${homeCopy.email}?subject=Contacto%20Flytek`}
            email={homeCopy.email}
            phones={[homeCopy.phone]}
          />
        </div>
      </main>
      <SiteFooter current="home" product="Diseño e integración de drones industriales · México" credit={{ label: "Video ilustrativo: Mixkit", href: "https://mixkit.co/free-stock-video/close-up-view-of-a-drone-flying-outdoors-44644/" }} />
    </div>
  );
}
