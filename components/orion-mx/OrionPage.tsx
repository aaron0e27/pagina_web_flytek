import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, ArrowRight, Box, Camera, ChevronRight, Crosshair, Layers3, Radar, ScanLine, ShieldCheck } from "lucide-react";
import SiteHeader from "@/components/shared/SiteHeader";
import Orion3DViewer from "@/components/orion-mx/Orion3DViewer";
import OrionFlight from "@/components/orion-mx/OrionFlight";
import { OrionMotion } from "@/components/orion-mx/OrionMotion";
import OrionAscent from "@/components/orion-mx/OrionAscent";
import OrionSpecs from "@/components/orion-mx/OrionSpecs";
import { orionAssets, orionStats } from "@/lib/orion-mx/data";
import OrionCapabilities from "@/components/orion-mx/OrionCapabilities";

const applications = [
  { index: "01", title: "Inspección industrial", copy: "Acércate a turbinas, maquinaria y activos críticos sin detener la lectura visual del entorno.", image: "/orion-mx/orion-turbine.webp" },
  { index: "02", title: "Túneles e infraestructura", copy: "Recorre ductos, galerías técnicas y estructuras de acceso limitado con una plataforma compacta.", image: "/orion-mx/orion-tunnel.webp" },
  { index: "03", title: "Imagen especializada", copy: "Configura el sistema de captura con opciones Full HD y térmicas para adaptar la misión a cada operación.", image: orionAssets.viewB },
] as const;

const anatomy = [
  { index: "01", kicker: "Estructura", title: "Compacto por diseño.", copy: "Un cuerpo de fibra de carbono de 40 centímetros, protegido para trabajar cerca de superficies y obstáculos.", icon: Box },
  { index: "02", kicker: "Percepción", title: "Lee antes de avanzar.", copy: "Hasta ocho sensores LiDAR apoyan la navegación y ayudan a mantener conciencia del espacio durante la inspección.", icon: Radar },
  { index: "03", kicker: "Captura", title: "El detalle es la misión.", copy: "Integra video HD, configuraciones Full HD o térmicas y estabilización de dos o tres ejes.", icon: Camera },
] as const;

export default function OrionPage() {
  return <main className="orion-page" id="inicio">
    <SiteHeader /><OrionMotion />
    <nav className="orion-rail" aria-label="ORION">
  <Link href="#inicio" className="orion-rail__brand">
    ORION<span> / </span>
  </Link>
  <div className="orion-rail__links">
    <Link href="#sistema">Sistema</Link>
    <Link href="#explorar">Explorar</Link>
    <Link href="#recorrido">Recorrido</Link>
    <Link href="#especificaciones">Especificaciones</Link>
  </div>
  <Link href="#contacto" className="orion-rail__talk">
    Hablemos <ArrowUpRight size={14} />
  </Link>
</nav>

    <section className="orion-hero" aria-labelledby="orion-title">
      <div className="orion-hero__grid" aria-hidden="true" /><div className="orion-hero__signal"><span />SISTEMA LISTO</div>
      <div className="orion-hero__copy"><p className="orion-eyebrow orion-reveal">UAV DE INSPECCIÓN / SERIE O</p><h1 id="orion-title" className="orion-hero__title">ORION</h1><p className="orion-hero__lead orion-reveal">Precisión para entrar.<br />Claridad para decidir.</p></div>
      <div className="orion-hero__visual" aria-hidden="true"><Image unoptimized src={orionAssets.hero} alt="" fill priority sizes="(max-width: 900px) 100vw, 70vw" className="orion-hero__image" /><span className="orion-crosshair orion-crosshair--one"><Crosshair /></span><span className="orion-crosshair orion-crosshair--two"><Crosshair /></span></div>
      <div className="orion-hero__footer"><div><span>PLATAFORMA</span><strong>INSPECCIÓN INTERIOR</strong></div><div><span>CUERPO</span><strong>FIBRA DE CARBONO</strong></div><Link href="#sistema" className="orion-scroll-cue">DESCUBRIR <ArrowDown size={16} /></Link></div>
    </section>

    <section className="orion-intro" id="sistema" aria-labelledby="intro-title">
      <div className="orion-section-tag orion-reveal"><span>01</span> EL SISTEMA</div>
      <div className="orion-intro__statement"><h2 id="intro-title" className="orion-reveal">Diseñado para entrar donde la inspección empieza a complicarse.</h2><p className="orion-reveal">ORION concentra estructura, percepción e imagen en un formato ágil para interiores y espacios reducidos.</p></div>
      <div className="orion-stats orion-reveal">{orionStats.map((s) => <div className="orion-stat" key={s.label}><span>{s.label}</span><strong>{s.value}</strong><small>{s.unit}</small></div>)}</div>
    </section>

    <section className="orion-anatomy" aria-labelledby="anatomy-title">
      <div className="orion-anatomy__media"><Image unoptimized src={orionAssets.viewA} alt="ORION visto en perspectiva" fill sizes="(max-width: 900px) 100vw, 52vw" /><div className="orion-anatomy__label"><ScanLine size={18} />VISTA DE SISTEMA / 01</div></div>
      <div className="orion-anatomy__content"><div className="orion-section-tag orion-reveal"><span>02</span> ANATOMÍA ORION</div><h2 id="anatomy-title" className="orion-reveal">Tres capas.<br />Una sola misión.</h2>
        <div>{anatomy.map(({ icon: Icon, ...item }) => <article className="orion-anatomy__item orion-reveal" key={item.index}><div className="orion-anatomy__index">{item.index}</div><Icon size={22} strokeWidth={1.5} /><div><span>{item.kicker}</span><h3>{item.title}</h3><p>{item.copy}</p></div></article>)}</div>
      </div>
    </section>

    <OrionAscent />

    <section className="orion-explorer" id="explorar" aria-labelledby="explorer-title">
      <div className="orion-explorer__heading"><div className="orion-section-tag orion-section-tag--light orion-reveal"><span>03</span> EXPLORACIÓN 3D</div><h2 id="explorer-title" className="orion-reveal">Conoce cada ángulo.</h2><p className="orion-reveal">Gira, acerca y selecciona los puntos de interés para recorrer la plataforma.</p></div>
      <div className="orion-explorer__stage orion-reveal"><Orion3DViewer /></div>
    </section>

    <OrionFlight />

    <OrionCapabilities />

    <OrionSpecs />

    <section className="orion-contact" id="contacto" aria-labelledby="contact-title">
      <div className="orion-contact__glow" /><div className="orion-contact__number">O</div><div className="orion-contact__copy"><p className="orion-eyebrow orion-reveal">FLYTEK INNOVATIONS / ORION</p><h2 id="contact-title" className="orion-reveal">Tu siguiente inspección puede empezar aquí.</h2><p className="orion-reveal">Cuéntanos el entorno, el objetivo y el tipo de captura que necesitas.</p><div className="orion-contact__actions orion-reveal"><Link href="mailto:info@flytek.com.mx" className="orion-primary-button">Hablar con un especialista <ArrowRight /></Link><Link href="tel:+525654407312" className="orion-text-link">+52 56 5440 7312</Link></div></div>
    </section>
  </main>;
}
