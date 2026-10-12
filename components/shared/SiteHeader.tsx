import Link from "next/link";
import { fenixAssets } from "@/lib/fenix/assets";
import HeaderControls from "./HeaderControls";
import "@/styles/site-header.css";
export default function SiteHeader() {
  return (
    <header className="flytek-header">
      <Link
        className="flytek-brand"
        href="/"
        aria-label="Flytek Innovations — regresar a la página principal"
      >
        <img
          src={fenixAssets.logo}
          alt="Flytek Innovations"
          width="122"
          height="40"
        />
      </Link>

      <nav className="flytek-main-links" aria-label="Navegación principal">
        <Link href="/#empresa">¿Quiénes somos?</Link>
        <Link href="/#drones">Drones</Link>
        <Link href="/#sectores">Sectores</Link>
      </nav>

      <HeaderControls />
    </header>
  );
}
