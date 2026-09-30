# Organización del proyecto Flytek

## Principal (`/`)

- `app/page.tsx`: entrada de la página principal.
- `components/principal/FlytekPrincipal.tsx`: pantalla de entrada, contenido, aplicaciones detalladas, interacciones y animaciones.
- `components/principal/OrionMiniFlight.tsx`: modelo ORION flotante dentro de la escena de Empresa.
- `lib/principal/data.ts`: textos, plataformas, sectores y datos de contacto.
- `styles/principal.css`: estilos exclusivos de la principal.
- `components/shared/SiteHeader.tsx` y `styles/site-header.css`: navegación compartida.

El hero principal muestra FLYTEK flotando, sin dron sobre el logotipo. El selector permite revisar FÉNIX, ORION MX y VEGA. FÉNIX y ORION MX muestran imagen y enlazan a sus páginas; VEGA permanece en preparación.

## FÉNIX (`/fenix`)

- `app/fenix/page.tsx`: composición de la página.
- `components/fenix/`: componentes visuales e interactivos.
- `lib/fenix/`: textos, assets, escenas y configuración del visor.
- `styles/fenix.css`: estilos de FÉNIX.
- `public/fenix/media/`: imágenes, video y GLB.

La navegación compartida permite volver a `/`. Su submenú conserva enlaces a las secciones internas.

## ORION MX

- `app/orion-mx/page.tsx`: ruta y metadatos.
- `components/orion-mx/OrionPage.tsx`: contenido, navegación, selector de perspectivas e interacción.
- `components/orion-mx/Orion3DViewer.tsx`: visor interactivo con vistas y zoom.
- `lib/orion-mx/data.ts`: estadísticas, especificaciones y rutas de recursos.
- `lib/orion-mx/drone-model.ts`: geometría visual que genera `orion-mx.glb`.
- `lib/orion-mx/drone-scene.ts`: escena, iluminación y animación del modelo.
- `styles/orion.css`: diseño adaptable, modo oscuro y animación flotante.
- `public/orion-mx/`: fotografías originales, portada y modelo `orion-mx.glb`.

Las carpetas contienen instrucciones. No existe `page.tsx`, por lo que no hay una ruta pública ni enlaces hacia la página antigua.

## VEGA (pendiente)

- `app/vega/`
- `components/vega/`
- `lib/vega/`
- `public/vega/`

Las carpetas contienen instrucciones. No existe `page.tsx`, por lo que no hay una ruta pública ni enlaces hacia la página antigua.

## Activar una página futura

1. Crear `app/vega/page.tsx`.
2. Crear sus componentes, datos y assets en las carpetas preparadas.
3. En `lib/principal/data.ts`, agregar la imagen, cambiar `href` a `/vega` y establecer `available: true`.
4. Compilar y revisar antes de habilitar el enlace.

## Navegación y tema compartidos

- `components/shared/SiteHeader.tsx`: logo pequeño que siempre regresa a `/`.
- `components/shared/HeaderControls.tsx`: menú completo, botón claro/oscuro y persistencia en localStorage.
- `styles/site-header.css`: encabezado, panel de navegación y versión móvil.
- `styles/theme.css`: colores oscuros de Principal y FÉNIX.
- `app/layout.tsx`: aplica el tema guardado antes de dibujar la página para evitar un destello de color.

El menú enlaza ORION MX con la nueva ruta local y muestra VEGA como página en preparación. No enlaza las versiones antiguas.
