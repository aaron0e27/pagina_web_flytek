# Principal Flytek + FÉNIX

La principal, FÉNIX y ORION MX ya están conectadas en este proyecto Next.js. La portada incluye una introducción animada de 2.6 segundos que se muestra una vez por pestaña. La sección Empresa presenta a FÉNIX y ORION en una escena de vuelo, y Aplicaciones desarrolla Seguridad, Inspección y Construcción mediante enlaces internos y fichas detalladas.

## Abrir y editar

1. Extrae fenix-proyecto.zip en una carpeta nueva para conservar tus cambios anteriores.
2. En Visual Studio Code abre la carpeta que contiene package.json.
3. En su terminal ejecuta `npm.cmd ci` y después `npm.cmd run dev`.
4. Abre la dirección que indique la terminal. La principal está en `/` y FÉNIX en `/fenix`.
5. Guarda cambios con Ctrl+S; el servidor de desarrollo actualiza el preview.

Si 3000 está ocupado: `npm.cmd run dev -- --port 3001`.

## Archivos de la principal

- app/page.tsx: ruta de inicio, título y descripción para buscadores. Antes redirigía a FÉNIX; ahora muestra FlytekHome.
- components/principal/FlytekPrincipal.tsx: pantalla de entrada, secciones, selector de plataformas, aplicaciones detalladas, soporte desplegable y animaciones.
- components/principal/OrionMiniFlight.tsx: versión ligera del visor ORION para la escena animada de Empresa.
- lib/principal/data.ts: textos, imágenes, correo y enlaces de productos.
- styles/principal.css: composición y estilos responsivos exclusivos de la principal.
- components/shared/SiteHeader.tsx: menú compartido de las dos páginas.
- styles/site-header.css: estilos del menú compartido.
- components/fenix/FenixTopNav.tsx: utiliza SiteHeader sin cambiar el menú interno de FÉNIX.
- public/home: fotografías oficiales de ORION y VEGA, incluidas localmente.

## Conectar con una copia existente de FÉNIX

Si ya editaste tu copia de Descargas, guarda una copia de seguridad y copia únicamente:

- app/page.tsx (reemplazar la redirección anterior)
- components/principal/ (carpeta nueva completa)
- components/shared/ (carpeta nueva completa)
- lib/principal/ (carpeta nueva completa)
- styles/principal.css y styles/site-header.css
- public/home/ (carpeta nueva completa)
- components/fenix/FenixTopNav.tsx (actualización del menú)

No hay nuevas dependencias. Conserva las carpetas existentes de FÉNIX, su CSS y sus assets.

## Cómo funcionan los enlaces

`/` abre la principal; `/fenix` abre el producto. `/#empresa`, `/#drones`, `/#sectores` y `/#contacto` vuelven a las secciones de la principal desde cualquier página. El submenú de FÉNIX mantiene sus enlaces internos.

Los enlaces HTML con href permiten recargar la página y limpiar correctamente las animaciones y el visor 3D al cambiar de ruta.

ORION enlaza a la nueva ruta local `/orion-mx`. VEGA permanece visible como próxima plataforma, sin abrir la página antigua. Cuando se cree `app/vega/page.tsx`, cambia su `href` en `lib/principal/data.ts` a `/vega` y establece `available: true`.

## Movimiento y accesibilidad

- Flotación del dron y video ilustrativo con botón de pausa.
- Entradas al desplazarse mediante IntersectionObserver y Web Animations API.
- Transiciones al elegir plataforma y sector.
- Botones accesibles por teclado, estados aria-pressed/aria-expanded y regiones anunciadas.
- Preferencia del sistema de movimiento reducido respetada; contenido visible sin animación.
- Contacto por mailto y teléfono. No hay formulario ni envío automático.

## Fuentes y recursos

Información corporativa y datos de contacto: https://flytek.com.mx/
ORION MX: ruta local `/orion-mx`
VEGA: https://flytek.com.mx/vega_4.php
Fotos locales: https://flytek.com.mx/Img/orion-inicio.png y https://flytek.com.mx/Img/vega_new.png
FÉNIX y fotografías de sectores: assets ya incluidos en el proyecto original.
Video genérico ilustrativo ya autorizado: https://mixkit.co/free-stock-video/close-up-view-of-a-drone-flying-outdoors-44644/

## Verificación

Compilación de Next.js y TypeScript correctas. Respuestas HTTP comprobadas para principal, FÉNIX y recursos nuevos. Diseño con reglas para móvil/tablet/escritorio; esta entrega no incluye una prueba visual automatizada en navegador.

Esta entrega es local. No modifica la web pública flytek.com.mx ni la publicación previa en chatgpt.site.


## Actualización de navegación y apariencia

La sección Empresa contiene una escena técnica animada creada en HTML/CSS/SVG y una imagen local del dron FÉNIX. El modelo recorre la escena y respeta el botón de pausa y la preferencia de movimiento reducido.

El encabezado compartido incluye logo de regreso a `/`, menú desplegable y modo oscuro persistente. `styles/theme.css` contiene la apariencia oscura de la principal y FÉNIX; `components/shared/HeaderControls.tsx` contiene la interacción.
