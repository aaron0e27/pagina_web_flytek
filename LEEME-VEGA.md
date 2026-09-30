# FLYTEK actualizado: VEGA
Esta carpeta parte del ZIP oficial proporcionado el 11 de septiembre de 2026.

## Abrir y ejecutar
Abre esta carpeta en Visual Studio Code. En su terminal:
npm.cmd ci
npm.cmd run dev
Abre la dirección que indique la terminal y agrega /vega.
Se requiere Node.js 22.18 o superior. No hacen falta extensiones nuevas.

## Organización
- app/vega/page.tsx: ruta y metadatos.
- components/vega/VegaPage.tsx: portada flotante, aplicaciones, integración y contacto.
- components/vega/Vega3DViewer.tsx: controles y estado de carga del visor.
- lib/vega/data.ts: textos y valores editables.
- lib/vega/drone-scene.ts: iluminación, cámara, materiales y flotación 3D.
- styles/vega.css: diseño responsive y temas claro/oscuro.
- public/vega/vega.glb: modelo original proporcionado.
- public/vega/vega.jpeg: fotografía original proporcionada.
- lib/principal/data.ts y components/shared/HeaderControls.tsx: enlaces a VEGA.
- components/orion-mx/Orion3DViewer.tsx: carga sin fotografía temporal.
- lib/orion-mx/drone-scene.ts: dibuja el primer fotograma antes de retirar el indicador.

## Información
Los valores de referencia y opciones de integración proceden de:
https://www.flytek.com.mx/vega_4.php
Confirma con el equipo técnico su correspondencia con el modelo suministrado y la configuración comercial vigente.
La fotografía muestra la estructura plegada; el GLB suministrado muestra otra configuración. Ambos se conservan.
El GLB no contiene hélices separadas animables; flota el conjunto.

## Validación
Compilación de producción y TypeScript completados.
Revisado el renderizado WebGL y los temas en navegador local.
Se ajusta el encuadre del visor a pantallas estrechas.
No se publica el proyecto en internet con esta entrega.
