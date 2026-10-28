import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SiteHeader from "@/components/shared/SiteHeader";
import SiteFooter from "@/components/shared/SiteFooter";
import SupportSection from "@/components/shared/SupportSection";
import SectorDetail from "@/components/principal/SectorDetail";
import { homeCopy, sectorDetails, sectors } from "@/lib/principal/data";
import "@/styles/fenix.css";
import "@/styles/principal.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return sectors.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = sectors.find((x) => x.slug === slug);
  if (!s) return {};
  return {
    title: `${s.name} | Flytek Innovations`,
    description: sectorDetails.find((d) => d.slug === slug)?.summary ?? s.description,
  };
}

export default async function SectorPage({ params }: Props) {
  const { slug } = await params;
  const index = sectors.findIndex((s) => s.slug === slug);
  if (index < 0) notFound();
  const s = sectors[index];
  const others = sectors.filter((x) => x.slug !== slug);

  return (
    <div className="fenix-page home-page sector-page">
      <SiteHeader />
      <main>
        <section className="sector-hero" aria-labelledby="sector-title">
          <img src={s.image} alt={s.alt} style={{ objectPosition: s.position }} width="1600" height="900" />
          <div className="sector-hero__shade" aria-hidden="true" />
          <div className="sector-hero__copy home-container">
            <Link className="sector-hero__back" href="/#sectores">
              <ArrowLeft size={16} aria-hidden="true" /> Todos los sectores
            </Link>
            <p className="home-label">{s.name}</p>
            <h1 id="sector-title">{s.title}</h1>
            <p>{s.description}</p>
          </div>
        </section>
        <div className="home-container sector-body">
          <SectorDetail index={index} />
        </div>
        <nav className="home-container sector-more" aria-label="Otros sectores">
          <p className="home-label">Explora otros sectores</p>
          <div>
            {others.map((o) => (
              <Link key={o.slug} href={`/sectores/${o.slug}`}>
                <span>{o.name}</span>
                <i aria-hidden="true"><ArrowRight size={18} /></i>
              </Link>
            ))}
          </div>
        </nav>
        <div id="soporte">
          <SupportSection
            variant="home"
            quoteHref={`mailto:${homeCopy.email}?subject=Contacto%20Flytek%20-%20${encodeURIComponent(s.name)}`}
            email={homeCopy.email}
            phones={[homeCopy.phone]}
          />
        </div>
      </main>
      <SiteFooter current="home" product="Diseño e integración de drones industriales · México" />
    </div>
  );
}
