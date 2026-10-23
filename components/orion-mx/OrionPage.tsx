import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
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
import OrionSubNav from "@/components/orion-mx/OrionSubNav";

export default function OrionPage() {
  return <main className="orion-page" id="inicio">
    <SiteHeader /><OrionMotion />
    <OrionSubNav />

    <section className="orion-hero" aria-labelledby="orion-title">
      <div className="orion-hero__grid" aria-hidden="true" />
      <h1 id="orion-title" className="orion-hero__title">ORION</h1>
      <div className="orion-hero__copy"><p className="orion-hero__lead orion-reveal">Hasta 50 minutos de vuelo.<br />Cargas útiles a tu medida.</p></div>
      <div className="orion-hero__visual" aria-hidden="true"><Image unoptimized src={orionAssets.heroFront} alt="" fill priority sizes="(max-width: 900px) 100vw, 90vw" className="orion-hero__image" /></div>
      <Link href="#descripcion" className="orion-scroll-cue"><span>CONOCER MÁS</span><ArrowDown size={20} /></Link>
    </section>

    <section className="orion-intro" id="descripcion" aria-labelledby="intro-title">
      <div className="orion-intro__statement"><h2 id="intro-title" className="orion-reveal">Ligera para llevarla.<br />Capaz para trabajar.</h2><p className="orion-reveal">{orionIntro}</p></div>
      <OrionPerformance />
    </section>

    <OrionAscent />

    <section className="orion-explorer" id="explorar" aria-labelledby="explorer-title">
      <div className="orion-explorer__heading"><div className="orion-section-tag orion-section-tag--light orion-reveal">EXPLORACIÓN 3D</div><h2 id="explorer-title" className="orion-reveal">Conoce cada ángulo.</h2><p className="orion-reveal">Gira, acerca y selecciona los puntos de interés para recorrer la plataforma.</p></div>
      <div className="orion-explorer__stage orion-reveal"><Orion3DViewer /></div>
    </section>

    <OrionPayloads />

    <OrionMissions />

    <section className="orion-gallery" id="galeria" aria-labelledby="orion-gallery-title">
      <div className="orion-section-tag orion-reveal">GALERÍA</div>
      <h2 id="orion-gallery-title" className="orion-reveal">ORION en campo.</h2>
      <p className="orion-reveal">Próximamente, nuevas imágenes de operación.</p>
    </section>

    <OrionSpecs />

    <OrionSupport />

  </main>;
}
