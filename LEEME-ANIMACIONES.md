# Flytek — escenas ligadas al scroll (v2)

Base: última versión oficial `flytek-vega-orion-hotspots (2).zip`, conservando las actualizaciones presentes en el proyecto de trabajo.

Esta versión reemplaza las apariciones temporizadas por composiciones que avanzan al bajar y retroceden al subir.

## Probar

Node.js 22.18 o superior. Desde la carpeta del proyecto:

```sh
npm ci
npm run dev
```

Abrir http://localhost:3000 y recorrer las páginas `/`, `/orion-mx` y `/vega`.
Para producción: `npm run build` y `npm start`.

## Qué se mueve

- **Principal:** portada fijada durante un recorrido de scroll en escritorio; palabra FLYTEK, vídeo y titular se desplazan a diferentes velocidades. El dron de la sección de empresa vuela según el scroll. Las plataformas crecen al entrar y las aplicaciones se abren con máscaras y desplazamientos laterales.
- **ORION:** portada fijada con desplazamiento, giro y zoom del dron, tipografía en otro plano, tarjetas escalonadas y desplazamiento del dron en cargas útiles.
- **VEGA:** portada fijada con zoom, giro y desplazamiento inverso, características escalonadas, apertura de la imagen de aplicaciones y desplazamiento del bloque de integración.
- Los titulares principales de cada página se desplazan progresivamente conforme recorren la pantalla.
- **FÉNIX:** excluido del nuevo controlador y de sus estilos. Mantiene su propio sistema original de animaciones.

## Implementación

`components/shared/useScrollScenes.ts` usa GSAP y ScrollTrigger, ya incluidos en el proyecto. `scrub` vincula el progreso al scroll; `pin` fija sólo las portadas en escritorio con espacio suficiente. No se introduce un scroll artificial.

`styles/scroll-scenes.css` evita conflictos con movimientos CSS antiguos mientras el controlador está activo. `styles/motion-polish.css` queda limitado a las tres páginas mediante `.scroll-page`.

En móvil, tablet, pantallas bajas y puntero táctil, no se fijan portadas y se reduce el recorrido. `prefers-reduced-motion` desactiva las escenas; GSAP restaura estilos y elimina los espacios de fijación al cambiar la preferencia, pausar o desmontar. Los botones de pausa existentes de Principal y VEGA también controlan estas escenas.

Los visores 3D y hotspots mantienen sus controles: el nuevo controlador no modifica sus cámaras, lienzos ni puntos de selección.

## Validación

- TypeScript y compilación de producción.
- Comprobación en navegador del cambio de transformaciones al bajar y su reversión al subir.
- Pausa de VEGA: elimina la fijación y restaura la composición.
- Comprobación responsive y de hotspots; FÉNIX no recibe `.scroll-page` ni el controlador nuevo.

Incluye código fuente y recursos. No incluye node_modules ni cachés de compilación.
