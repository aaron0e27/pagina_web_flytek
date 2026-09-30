import { vegaCopy } from "@/lib/vega/copy";
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <a className="brand" href="/">
        {vegaCopy.flytek}
        <span>{vegaCopy.innovations}</span>
      </a>
      <p>{vegaCopy.plataformas_tecnologia_nuevas_perspectivas}</p>
      <a href="/vega#descripcion">{vegaCopy.volver_arriba}</a>
      <small>
        © {new Date().getFullYear()} {vegaCopy.flytek_innovations}
      </small>

    </footer>
  );
}
