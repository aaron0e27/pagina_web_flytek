import { ArrowUpRight } from "lucide-react";
import { fenixSpecs } from "@/lib/fenix/data";

export default function FenixSpecs() {
  return (
    <section className="specifications wrap" id="especificaciones">
      <div className="spec-heading">
        <span className="section-index">FÉNIX EN DETALLE</span>
        <h2 data-motion="text">
          Especificaciones
          <br />
          técnicas.
        </h2>
        <p>
          Datos publicados por Flytek.
          <br />
          La configuración final se define contigo.
        </p>
        <a
          href="https://www.flytek.com.mx/fenix_2.php"
          target="_blank"
          rel="noreferrer"
          className="text-link"
        >
          Consultar fuente oficial <ArrowUpRight size={16} />
        </a>
      </div>
      <div className="spec-groups">
        {fenixSpecs.map((group) => (
          <section key={group.name} data-motion="tech">
            <h3>{group.name}</h3>
            <dl>
              {group.items.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </section>
  );
}
