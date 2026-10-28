import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { sectors } from "@/lib/principal/data";

/** Tres tarjetas verticales; cada botón lleva a la página de su sector. */
export default function SectorAccordion() {
  return (
    <div className="sacc">
      {sectors.map((s, i) => (
        <article className="sacc__card" key={s.slug}>
          <img
            className="sacc__bg"
            src={s.image}
            alt={s.alt}
            style={{ objectPosition: s.position }}
            width="1400"
            height="850"
            loading="lazy"
          />
          <div className="sacc__shade" aria-hidden="true" />
          <span className="sacc__n" aria-hidden="true">0{i + 1}</span>
          <div className="sacc__copy">
            <p className="home-label">{s.name}</p>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
            <Link className="sacc__cta" href={`/sectores/${s.slug}`} aria-label={`Ver más sobre ${s.name}`}>
              <span>Ver más</span>
              <i aria-hidden="true"><ArrowRight size={18} /></i>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
