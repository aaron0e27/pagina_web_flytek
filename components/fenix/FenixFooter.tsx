import { ArrowUpRight } from "lucide-react";
import { fenixAssets } from "@/lib/fenix/assets";

export default function FenixFooter() {
  return (
    <footer>
      <div className="wrap">
        <a href="#descripcion" aria-label="Volver al inicio">
          <img src={fenixAssets.logo} alt="Flytek Innovations" width="150" height="50" />
        </a>
        <p>Ingeniería para el trabajo real.</p>
        <a href="#descripcion">
          Volver arriba <ArrowUpRight size={17} />
        </a>
      </div>
      <div className="wrap footer-bottom">
        <span>© {new Date().getFullYear()} Flytek Innovations</span>
        <span>FÉNIX · Plataforma aérea industrial</span>
        <a
          href="https://mixkit.co/free-stock-video/close-up-view-of-a-drone-flying-outdoors-44644/"
          target="_blank"
          rel="noreferrer"
        >
          Video ilustrativo: Mixkit
        </a>
      </div>
    </footer>
  );
}
