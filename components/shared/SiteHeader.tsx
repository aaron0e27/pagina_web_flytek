import { fenixAssets } from "@/lib/fenix/assets";
import HeaderControls from "./HeaderControls";
import "@/styles/site-header.css";
export default function SiteHeader() {
  return <header className="flytek-header"><a className="flytek-brand" href="/" aria-label="Flytek Innovations — regresar a la página principal"><img src={fenixAssets.logo} alt="Flytek Innovations" width="122" height="40" /></a><nav className="flytek-main-links" aria-label="Navegación principal"><a href="/#empresa">Empresa</a><a href="/#drones">Drones</a><a href="/#sectores">Sectores</a></nav><HeaderControls /></header>;
}
