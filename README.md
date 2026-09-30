# Flytek Innovations

Sitio web de Flytek con la portada principal y las páginas de FÉNIX, ORION MX y VEGA. Está desarrollado con Next.js 16, React, TypeScript, GSAP y Three.js.

## Empezar a trabajar

Instala Node.js 22.18 o superior y clona el repositorio. Usa npm, que está fijado por `package-lock.json`:

```bash
git clone https://github.com/aaron0e27/pagina_web_flytek.git
cd pagina_web_flytek
git lfs install
git lfs pull
npm ci
npm run dev
```

Abre `http://localhost:3000`. Si ese puerto está ocupado, Next.js indicará otro en la terminal. Para comprobar los cambios antes de compartirlos:

```bash
npm run typecheck
npm run build
```

`node_modules/`, `.next/` y `out/` son carpetas generadas y no se suben a GitHub. Las dependencias se reconstruyen con `npm ci`. Los modelos `.glb` y videos `.mp4` se guardan mediante Git LFS; por eso cada colaborador debe tener Git LFS instalado antes de clonar o ejecutar `git lfs pull` después.

## Páginas y archivos principales

| Ruta | Código de página | Componentes | Estilos |
| --- | --- | --- | --- |
| `/` | `app/page.tsx` | `components/principal/` | `styles/principal.css` |
| `/fenix` | `app/fenix/page.tsx` | `components/fenix/` | `styles/fenix.css` |
| `/orion-mx` | `app/orion-mx/page.tsx` | `components/orion-mx/` | `styles/orion.css` |
| `/vega` | `app/vega/page.tsx` | `components/vega/` | `styles/vega.css` |

Los datos y la configuración de los visores están en `lib/`; imágenes, videos y modelos 3D están en `public/`. Los documentos adicionales del repositorio describen decisiones de diseño y versiones anteriores; este README describe la estructura actual.

## Colaborar con ramas

Cada cambio debe ir en una rama propia creada a partir de `main`:

```bash
git switch main
git pull
git switch -c nombre-del-cambio
# Edita y comprueba el sitio.
git add .
git commit -m "Describe el cambio"
git push -u origin nombre-del-cambio
```

En GitHub, abre un Pull Request de esa rama hacia `main`. Otra persona puede revisar el cambio y fusionarlo. Tras la fusión, actualiza tu copia con `git switch main` y `git pull`. El acceso para colaboradores y la protección de `main` se configuran en Settings del repositorio de GitHub; esos permisos no se conceden desde este proyecto.

## Publicación

`npm run build` valida la compilación, pero esta configuración todavía usa el servidor de Next.js. Para un hosting estático de IONOS hará falta preparar y verificar una exportación estática antes de subir la carpeta resultante. No publiques `node_modules/`, `.next/` ni este repositorio completo como si fueran el sitio compilado.
