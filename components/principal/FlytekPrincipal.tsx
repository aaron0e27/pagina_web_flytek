"use client";
import { useScrollScenes } from "@/components/shared/useScrollScenes";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Pause, Play } from "lucide-react";
import SupportSection from "@/components/shared/SupportSection";
import SiteHeader from "@/components/shared/SiteHeader";
import DroneGallery from "@/components/principal/DroneGallery";
import { fenixAssets } from "@/lib/fenix/assets";
import SectorAccordion from "./SectorAccordion";
import SiteFooter from "@/components/shared/SiteFooter";
import {homeCopy, platforms,} from "@/lib/principal/data";
export default function FlytekPrincipal({
  initiallyShowIntro,
}: {
  initiallyShowIntro: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(true);
  const [platform, setPlatform] = useState(0);
  const [showIntro, setShowIntro] = useState(initiallyShowIntro);
  const track = useRef<HTMLDivElement>(null);
  // Celular: las plataformas se deslizan con el dedo; aquí se lee cuál quedó al centro.
  const onTrackScroll = () => {
    const el = track.current;
       if (!el || el.scrollWidth <= el.clientWidth + 1) return;
       const n = Math.round(el.scrollLeft / el.clientWidth);
       if (n >= 0 && n < platforms.length && n !== platform) setPlatform(n);
     };
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
            <div className="home-platform-track" ref={track} onScroll={onTrackScroll}>
              {platforms.map((p, idx) => (
                <div
                  key={p.id}
                  id={idx === platform ? "platform-detail" : undefined}
                  className={`home-platform-detail${idx === platform ? " is-active" : ""}`}
                  aria-live={idx === platform ? "polite" : undefined}
                  aria-atomic="true"
                >
                <div
                  className={`home-platform-stage${p.available ? "" : " home-platform-pending"}`}
                  key={`${p.id}-image`}
                  >
                  <span aria-hidden="true">{p.name}</span>
                  <div className="home-orbit" />
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={`Plataforma ${p.name} de Flytek`}
                        width="1000"
                        height="600"
                        loading="lazy"
                        className={p.id === "vega" ? "home-platform-photo-cutout" : undefined}
                      />
                    ) : (
                      <div
                        className="home-pending-art"
                        aria-label={`Imagen de ${p.name} pendiente`}
                      >
                        <i />
                        <small>IMAGEN / MODELO PENDIENTE</small>
                      </div>
                    )}
                <small>{p.name}</small>
                  </div>
                  <div className="home-platform-copy" key={p.id}>
                    <p className="home-label">PLATAFORMAS FLYTEK</p>
                    <h3>{p.title}</h3>
                    <p>{p.description}</p>
                    <ul>
                      {p.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                    {p.href ? (
                      <a className="home-button" href={p.href}>
                        Explorar {p.name}
                        <ArrowUpRight size={19} />
                      </a>
                    ) : (
                      <span className="home-button home-button-disabled" aria-disabled="true">
                        Página en preparación
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="home-platform-dots" aria-hidden="true">
              {platforms.map((p, idx) => (
                <i key={p.id} className={idx === platform ? "is-active" : ""} />
              ))}
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
          <SectorAccordion />
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
