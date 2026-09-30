# Refinamiento sobre la versión existente

Se conserva Next.js App Router, React, TypeScript, GSAP/ScrollTrigger, Three.js, Base UI y todos los assets locales. La composición de `app/fenix/page.tsx` mantiene el orden y los módulos originales; no se migró de framework ni se publicó una nueva versión remota.

| Archivo / componente | Cambio |
| --- | --- |
| `FenixTopNav.tsx` | Estructura logo, Plataformas, Industria, Hablemos. Menú no sticky; Hablemos visible en móvil. |
| `FenixSubNav.tsx` | Misma estructura; identificadores de sección, estado activo con subrayado azul y seguimiento del scroll. |
| `FenixHero.tsx`, `FenixHeroVideo.tsx` | Video, FÉNIX detrás del dron y profundidad conservados. Placeholders solicitados, eliminación del copy redundante y CTA grande, CONOCER MÁS centrado y control de video a la derecha. |
| `FenixStats.tsx` | Mosaico asimétrico: autonomía con foto grande, viento con recorte del producto, peso en azul y longitud en gris. Se conservan los cuatro datos. |
| `FenixIntro.tsx` | Producto sin fondo integrado a la composición, título editorial ligado al scroll y texto asimétrico. Sin captions de foto. |
| `Fenix3DViewer.tsx`, `FenixDroneCanvas.tsx` | Siete vistas y controles conservados; estados del hotspot y panel informativo ajustados. En móvil el detalle aparece debajo del canvas. |
| `FenixDroneEntrance.tsx` | Ascenso frontal conservado; eventos centralizados para reentrada, hover y respuesta mínima al scroll. Pausa disponible. |
| `FenixHorizontalStory.tsx` | Cuatro paneles, pin y liberación conservados. Carbono con mayor jerarquía; cifras y divisores refinados; llamadas de navegación más legibles; señal animada y estación de control revisada; progreso 01–04. |
| `FenixPayloads.tsx`, `FenixPayloadSelector.tsx` | Tabs y distribución conservados. Flecha desde el payload, zona destacada y coordenadas adaptadas al encuadre móvil. Selección de integración transmitida al contacto. |
| `FenixApplications.tsx` | Mosaico original de una imagen grande y dos laterales, datos centralizados, contraste de texto y entrada de imágenes refinados. |
| `FenixSpecs.tsx` | Columna izquierda sticky conservada y movimiento de título/datos. Estructura de especificaciones sin cambios. |
| `FenixSupport.tsx` | Tres bloques de imagen y texto con índices; fotografías locales reutilizadas y espacio de mantenimiento pendiente. |
| `FenixContact.tsx`, `FenixContactForm.tsx` | Composición y punto azul conservados. Copies y correo compartidos, contraste de inputs mejorado, validación y preparación de correo intactas. |
| `FenixAnimations.tsx` | Cuatro patrones, contextos GSAP, matchMedia, limpieza, refresh diferido al terminar scroll, estado activo, navegación horizontal y eventos del producto. |
| `lib/fenix/drone-scene.ts` | Cámara interrumpible por arrastre, ángulos por componente, resaltado reversible, hover/rotores y repetición del ascenso al volver. |
| `lib/fenix/data.ts`, `payloads.ts`, `viewer-data.ts`, `assets.ts`, `contact.ts`, `motion.ts` | Datos editables centralizados. `motion.ts` es nuevo; se mantienen las rutas locales de assets. |
| `styles/fenix.css` | Dirección visual, responsive, estados activos, líneas de integración y presentación móvil de los hotspots. |
| `README.md`, `ASSETS.md`, `VALIDACION.md`, `MOTION.md` | Instrucciones de edición, recursos, pruebas y criterios del sistema de movimiento. |

`package.json` y su lockfile conservan el stack y las versiones existentes. No se regeneró ni cambió la geometría del GLB.

## Placeholders y decisiones de Flytek

- `[FRASE PRINCIPAL FÉNIX]`, `[TÍTULO EDITORIAL]` y `[INFORMACIÓN A DETALLAR]`: editables en `fenixCopy` dentro de `data.ts`.
- `[IMAGEN PENDIENTE]`: fotografía de Mantenimiento.
- Los demás copies se mantienen como ejemplos editables. Flytek debe aprobar nomenclatura, titular, alcance de servicios y textos de aplicaciones.
- Validar el recorte grande del producto, la alternancia claro/carbón y el bloque de peso en azul corporativo.
- Validar las posiciones de integración en payloads y los encuadres de hotspots al recibir fotografía y GLB oficiales.
- Material ideal a sustituir: video genérico, modelo ilustrativo, composición de estudio, fotos provisionales de servicios y close-ups de payloads.

## Revisión de motion

Se aplicaron criterios de Impeccable, Emil Kowalski, Taste y UI/UX Pro Max como guías; el brief tiene prioridad.

| Antes | Después | Motivo |
| --- | --- | --- |
| Un título se revelaba una vez. | Títulos con pocos píxeles de desplazamiento y opacidad vinculados al scroll. | La relación con la navegación continúa sin un bucle autónomo. |
| Ascenso de una sola ejecución. | Ascenso al reentrar; hover y rotores mientras se ve la escena. | Mantener vida en el producto sin repetir la secuencia constantemente. |
| Cámara dependiente del ángulo anterior. | Direcciones de enfoque por componente y transición interrumpible. | Ver el payload incluso si antes se eligió vista superior. |
| Detalle móvil superpuesto al componente. | Información debajo del canvas. | Mantener visible el objeto seleccionado. |
| Flecha animada también desde teclado. | Cambio inmediato al activar las tabs por teclado. | Reducir latencia en acciones de navegación frecuentes. |
| Refresh durante un ancla suave. | Refresh al terminar el scroll. | Evitar interrupciones de la navegación. |
| Subrayado fuera de la caja del enlace. | Subrayado dentro de la barra. | Evitar que el indicador cree scroll vertical en el menú. |

Veredicto de revisión de código: apto para revisión visual de Flytek; los movimientos tienen una función definida y cuatro patrones comunes. La verificación visual de movimiento reducido y de gestos multitáctiles en dispositivo físico sigue indicada en `VALIDACION.md`; no se afirma una auditoría de accesibilidad completa.
