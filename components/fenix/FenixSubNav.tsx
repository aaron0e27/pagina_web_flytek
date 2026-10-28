import { ArrowUpRight } from "lucide-react";
import { fenixNavigation } from "@/lib/fenix/data";

export default function FenixSubNav() {
  return (
    <nav className="product-nav" aria-label="FÉNIX">
      <a className="product-name" href="#descripcion">
        FÉNIX<span> / </span>
      </a>
      <div>
        {fenixNavigation.map(([id, label]) => (
          <a
            key={id}
            href={id === "aplicaciones" || id === "galeria" ? undefined : "#" + id}
            data-section={id === "aplicaciones" || id === "galeria" ? undefined : id}
            aria-current={id === "descripcion" ? "location" : undefined}
          >
            {label}
          </a>
        ))}
      </div>
      <a className="small-cta" href="#contacto" data-section="contacto">
        Contacto <ArrowUpRight size={14} />
      </a>
    </nav>
  );
}
