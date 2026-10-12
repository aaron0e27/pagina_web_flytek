import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, ArrowRight, Crosshair } from "lucide-react";
import SiteHeader from "@/components/shared/SiteHeader";
import Orion3DViewer from "@/components/orion-mx/Orion3DViewer";
import OrionFlight from "@/components/orion-mx/OrionFlight";
import { OrionMotion } from "@/components/orion-mx/OrionMotion";
import OrionAscent from "@/components/orion-mx/OrionAscent";
import OrionSpecs from "@/components/orion-mx/OrionSpecs";
import { orionAssets, orionStats } from "@/lib/orion-mx/data";
import OrionCapabilities from "@/components/orion-mx/OrionCapabilities";
import OrionSupport from "@/components/orion-mx/OrionSupport";

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
      <div className="orion-intro__statement"><h2 id="intro-title" className="orion-reveal">Diseñado para entrar donde la inspección empieza a complicarse.</h2><p className="orion-reveal">Seguro, innovador y adaptable: un equipo pensado para operaciones precisas, donde ORION trabaja para que tu personal no tenga que arriesgarse.</p></div>
      <div className="orion-stats orion-reveal">{orionStats.map((s) => <div className="orion-stat" key={s.label}><span>{s.label}</span><strong>{s.value}</strong><small>{s.unit}</small></div>)}</div>
    </section>

    <OrionAscent />

    <section className="orion-explorer" id="explorar" aria-labelledby="explorer-title">
      <div className="orion-explorer__heading"><div className="orion-section-tag orion-section-tag--light orion-reveal"><span>03</span> EXPLORACIÓN 3D</div><h2 id="explorer-title" className="orion-reveal">Conoce cada ángulo.</h2><p className="orion-reveal">Gira, acerca y selecciona los puntos de interés para recorrer la plataforma.</p></div>
      <div className="orion-explorer__stage orion-reveal"><Orion3DViewer /></div>
    </section>

    <OrionFlight />

    <OrionCapabilities />

    <OrionSpecs />

    <OrionSupport />

    <section className="orion-contact" id="contacto" aria-labelledby="contact-title">
      <div className="orion-contact__glow" /><div className="orion-contact__number">O</div><div className="orion-contact__copy"><p className="orion-eyebrow orion-reveal">FLYTEK INNOVATIONS / ORION</p><h2 id="contact-title" className="orion-reveal">Tu siguiente inspección puede empezar aquí.</h2><p className="orion-reveal">Cuéntanos el entorno, el objetivo y el tipo de captura que necesitas.</p><div className="orion-contact__actions orion-reveal"><Link href="mailto:info@flytek.com.mx" className="orion-primary-button">Hablar con un especialista <ArrowRight /></Link><Link href="tel:+525654407312" className="orion-text-link">+52 56 5440 7312</Link><Link href="tel:+525522188546" className="orion-text-link">+52 55 2218 8546</Link></div></div>
    </section>
  </main>;
}