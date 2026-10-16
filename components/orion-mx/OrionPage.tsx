import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Crosshair } from "lucide-react";
import SiteHeader from "@/components/shared/SiteHeader";
import Orion3DViewer from "@/components/orion-mx/Orion3DViewer";
import OrionMissions from "@/components/orion-mx/OrionMissions";
import { OrionMotion } from "@/components/orion-mx/OrionMotion";
import OrionSpecs from "@/components/orion-mx/OrionSpecs";
import { orionAssets, orionIntro } from "@/lib/orion-mx/data";
import OrionPayloads from "@/components/orion-mx/OrionPayloads";
import OrionAscent from "@/components/orion-mx/OrionAscent";
import OrionPerformance from "@/components/orion-mx/OrionPerformance";
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
    <Link href="#vuelo">Vuelo</Link>
    <Link href="#explorar">Explorar</Link>
    <Link href="#misiones">Misiones</Link>
    <Link href="#cargas">Cargas útiles</Link>
    <Link href="#especificaciones">Especificaciones</Link>
  </div>
  <Link href="#contacto" className="orion-rail__talk">
    Hablemos <ArrowUpRight size={14} />
  </Link>
</nav>

    <section className="orion-hero" aria-labelledby="orion-title">
      <div className="orion-hero__grid" aria-hidden="true" /><div className="orion-hero__signal"><span />SISTEMA LISTO</div>
      <div className="orion-hero__copy"><p className="orion-eyebrow orion-reveal">PLATAFORMA AÉREA MULTIPROPÓSITO</p><h1 id="orion-title" className="orion-hero__title">ORION</h1><p className="orion-hero__lead orion-reveal">Hasta 50 minutos de vuelo.<br />Cargas útiles a tu medida.</p></div>
      <div className="orion-hero__visual" aria-hidden="true"><Image unoptimized src={orionAssets.hero} alt="" fill priority sizes="(max-width: 900px) 100vw, 70vw" className="orion-hero__image" /><span className="orion-crosshair orion-crosshair--one"><Crosshair /></span><span className="orion-crosshair orion-crosshair--two"><Crosshair /></span></div>
      <div className="orion-hero__footer"><div><span>PLATAFORMA</span><strong>MULTIPROPÓSITO</strong></div><div><span>ALCANCE</span><strong>HASTA 40 KM</strong></div><Link href="#sistema" className="orion-scroll-cue">DESCUBRIR <ArrowDown size={16} /></Link></div>
    </section>

    <section className="orion-intro" id="sistema" aria-labelledby="intro-title">
      <div className="orion-section-tag orion-reveal"><span>01</span> EL SISTEMA</div>
      <div className="orion-intro__statement"><h2 id="intro-title" className="orion-reveal">Ligera para llevarla.<br />Capaz para trabajar.</h2><p className="orion-reveal">{orionIntro}</p></div>
      <OrionPerformance />
    </section>

    <OrionAscent />

    <section className="orion-explorer" id="explorar" aria-labelledby="explorer-title">
      <div className="orion-explorer__heading"><div className="orion-section-tag orion-section-tag--light orion-reveal"><span>03</span> EXPLORACIÓN 3D</div><h2 id="explorer-title" className="orion-reveal">Conoce cada ángulo.</h2><p className="orion-reveal">Gira, acerca y selecciona los puntos de interés para recorrer la plataforma.</p></div>
      <div className="orion-explorer__stage orion-reveal"><Orion3DViewer /></div>
    </section>

    <OrionMissions />

    <OrionPayloads />

    <OrionSpecs />

    <OrionSupport />

  </main>;
}
