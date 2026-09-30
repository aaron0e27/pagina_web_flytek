# Validación del refinamiento

Comprobación del 2 de septiembre de 2026 sobre `outputs/fenix-proyecto`, servida en `http://localhost:3000/fenix`. Se revisó la compilación de producción además del desarrollo.

## Compilación

- `npm run typecheck`: pasa sin errores.
- `npm run build`: pasa; `/fenix` se prerenderiza como ruta estática de Next.js.
- `npm run format`: aplicado a componentes, datos, estilos y configuración.
- `next start --port 3000`: servidor de producción local, respuesta correcta de la página.
- No se cambió el framework ni se añadieron dependencias.

## Responsive y composición

| Tamaño comprobado | Resultado observado |
| --- | --- |
| Desktop 1440 × 900 | Hero, mosaico de cifras y paneles editoriales; un único pin del recorrido horizontal. Sin overflow horizontal del documento. |
| Desktop 1280 × 800 | Hero completo, payloads, contacto y visor con siete vistas. Flecha alineada con la cámara de la foto. Sin overflow horizontal del documento. |
| Laptop 1366 × 768 | Scroll horizontal, estados activos y especificaciones sticky. La columna izquierda se mantiene a 110 px mientras los datos pasan de 193.6 px a -305.4 px. |
| Tablet 768 × 1024 | Mosaico adaptado, producto integrado en la intro y capítulos verticales. Cero pin-spacers. |
| Móvil 390 × 844 | Hero y Hablemos visibles; cuatro cifras, payloads, aplicaciones, soporte y especificaciones legibles. Cero pin-spacers y cero overflow horizontal del documento. |

Los recortes del producto dentro de las escenas son intencionales. La barra FÉNIX admite desplazamiento horizontal propio en pantallas estrechas; no desplaza horizontalmente toda la página.

## Navegación y movimiento

- Menú principal permanece al inicio; barra FÉNIX sticky observada a `top: 0`.
- CONOCER MÁS lleva a características; navegación directa a payloads y especificaciones verificada en móvil.
- Estado activo con `aria-current="location"` y subrayado azul. La franja interna acompaña el enlace activo sin introducir scroll vertical.
- Recorrido horizontal comprobado con rueda a 1366 px: segundo panel situado en x ≈ -1 px y y ≈ 58 px; cuarto panel en x = 0; al seguir, el bloque sale de pantalla y continúa Payloads. Índices 01/04–04/04 conservados.
- Títulos ligados al scroll, entrada de imágenes y líneas revisados en el recorrido.
- Refresh tras recursos/resize diferido hasta terminar el scroll, para evitar cortar el desplazamiento suave.
- Cambio entre tablet/móvil y escritorio observado: cero y un pin respectivamente, sin acumulación de pin-spacers.

## Three.js

- Modelo GLB local cargado en visor y escena de entrada.
- Siete botones de vista, acercar, alejar y regreso a general comprobados.
- Hotspots: información, botón seleccionado, resaltado del componente y cambio de cámara observados.
- Selección de Payload desde Superior comprobada tras ajustar el ángulo: muestra el componente por debajo del fuselaje.
- En móvil, panel informativo empieza donde termina el canvas; no se superponen. Canvas de 530 px, información en flujo debajo.
- Arrastre con puntero y regreso a general comprobados.
- Ascenso, pausa/reanudación y reentrada comprobados. Se salió por arriba y se volvió: el modelo apareció desde abajo y después quedó suspendido. No se repite la secuencia completa en bucle.
- Modelo sigue identificado como representativo, sin presentarlo como geometría oficial de ingeniería.

## Teclado, video y formulario

- Tabs Base UI: flechas mueven foco; Enter activa la opción. Cambio a Dual mediante teclado y traspaso de esa integración al contacto comprobados.
- Navegación y controles conservan foco visible; el indicador de navegación se mantiene dentro del área del enlace.
- Formulario: campos obligatorios y email HTML; intento vacío enfoca Nombre y muestra validación. La integración seleccionada se conserva.
- No se enviaron mensajes: el formulario prepara un `mailto:` para revisión en la aplicación de correo. No hay backend de envío.
- Video local conserva reproducción/pausa, estado accesible y suspensión fuera de pantalla.
- No se observaron errores ni advertencias de consola en el recorrido final ni imágenes locales fallidas en las secciones revisadas.

## Movimiento reducido y límites de la prueba

Revisión del código y estilos de `prefers-reduced-motion: reduce`: no crea pin ni parallax; se leen los cuatro paneles en vertical; el video empieza pausado; se cancelan ascenso y hover; la cámara cambia directamente y se mantienen contenido, enlaces y controles. Los cambios de preferencia tienen limpieza en GSAP, video y escena.

**Pendiente de comprobación visual en un dispositivo con la preferencia del sistema activada.** La automatización del navegador disponible permite cambiar viewport, pero no emular esta preferencia. No se alteraron ajustes globales del equipo para simularla. La lectura vertical sí se verificó visualmente en tablet y móvil, pero no se presenta como sustituto de esa prueba.

La prueba de móvil fue por tamaño de viewport y puntero. OrbitControls conserva configuración táctil y hay reglas para punteros gruesos; los gestos de pellizco y rotación con varios dedos quedan por verificar en un dispositivo físico. No se realizó una auditoría WCAG integral ni perfilado prolongado de memoria/GPU.

## Paquete y recursos

- ZIP con componentes solicitados, utilidades, configuración, documentación y assets locales.
- Excluye `node_modules`, `.next`, `.git` y archivos de compilación incremental.
- Se verifica integridad CRC, archivos obligatorios y correspondencia entre package.json y lockfile.
- Fotografías, video y GLB originales de la entrega anterior se conservan; no se descargó material nuevo para esta iteración.

Última comprobación de producción: recarga con `#especificaciones` deja el destino a 69.8 px en móvil; el control de video cambia `paused` de `false` a `true` y vuelve a `false`. Sin errores/advertencias de consola ni imágenes fallidas en el estado final. Se compararon los 13 assets locales por SHA-256 con el respaldo previo: todos permanecen idénticos.
