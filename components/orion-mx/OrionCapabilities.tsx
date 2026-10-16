import { Aperture, Lightbulb, Radar, ScanLine, ThermometerSun, ArrowUpRight } from "lucide-react";
import { orionIntegrations } from "@/lib/orion-mx/data";

const icons = { radar: Radar, spectral: Aperture, thermal: ThermometerSun, photo: ScanLine, light: Lightbulb } as const;

export default function OrionCapabilities() {
  return (
    <section className="orion-custom" id="personalizable" aria-labelledby="orion-custom-title">
      <div className="orion-custom__head">
        <div className="orion-section-tag orion-reveal"><span>04</span> PERSONALIZABLE</div>
        <h2 id="orion-custom-title" className="orion-reveal">Una plataforma.<br />Distintas miradas.</h2>
        <p className="orion-reveal">Personalizamos tu drone para el trabajo: lo integramos con el sensor o la cámara que tu inspección necesita.</p>
      </div>
      <ul className="orion-custom__grid orion-reveal">
        {orionIntegrations.map((it) => {
          const Icon = icons[it.icon];
          return (
            <li key={it.title}>
              <Icon size={24} strokeWidth={1.4} aria-hidden="true" />
              <h3>{it.title}</h3>
              <p>{it.text}</p>
            </li>
          );
        })}
        <li className="orion-custom__cta">
          <a href="mailto:info@flytek.com.mx?subject=Integraci%C3%B3n%20ORION%20MX">
            <h3>¿Necesitas otra integración?</h3>
            <span>Cuéntanos tu proyecto <ArrowUpRight size={16} /></span>
          </a>
        </li>
      </ul>
    </section>
  );
}
