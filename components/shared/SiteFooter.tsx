import { ArrowUpRight } from "lucide-react";
import "@/styles/site-footer.css";

/**
 * Pie de página único para home, FÉNIX, ORION MX y VEGA.
 * Cambia solo `current` (qué página es), `product` (texto central) y `backHref`.
 */
const DRONES = [
  { id: "fenix", name: "FÉNIX", href: "/fenix" },
  { id: "orion", name: "ORION MX", href: "/orion-mx" },
  { id: "vega", name: "VEGA", href: "/vega" },
] as const;

type Props = {
  current: "home" | "fenix" | "orion" | "vega";
  product: string;
  backHref?: string;
  /** Crédito opcional (solo en páginas que muestran el video). */
  credit?: { label: string; href: string };
};

export default function SiteFooter({ current, product, backHref = "#inicio", credit }: Props) {
  return (
    <div className="flytek-footer" role="contentinfo">
      <div className="flytek-footer__row">
        <a href="/" aria-label="Flytek Innovations — inicio" className="flytek-footer__logo">
          <img src="/fenix/media/logo.webp" alt="Flytek Innovations" width="150" height="50" />
        </a>
        <p>Ingeniería para el trabajo real.</p>
        <a href={backHref} className="flytek-footer__top">
          Volver arriba <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </div>
      <div className="flytek-footer__row flytek-footer__bottom">
        <span>
          © {new Date().getFullYear()} Flytek Innovations
          {credit && (
            <>
              {" · "}
              <a href={credit.href} target="_blank" rel="noreferrer">{credit.label}</a>
            </>
          )}
        </span>
        <span>{product}</span>
        <nav aria-label="Plataformas Flytek">
          {DRONES.map((d) => (
            <a key={d.id} href={d.href} aria-current={d.id === current ? "page" : undefined}>
              {d.name}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
