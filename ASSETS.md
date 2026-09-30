# Recursos incluidos

Todas las rutas se resuelven desde `lib/fenix/assets.ts`. Ninguna imagen, fuente, video o modelo exige un servicio externo para mostrarse. Las fotografías y la marca mantienen sus derechos de origen; esta entrega no cambia su titularidad.

| Archivo en `public/fenix/media/` | Procedencia / uso |
| --- | --- |
| `logo.webp` | Logotipo de Flytek utilizado en la propuesta. |
| `fenix.webp` | Recorte oficial del producto; original `https://www.flytek.com.mx/Img/feinxpng_r.png`. |
| `front.webp` | Vista oficial; original `https://www.flytek.com.mx/Img/fenix_1_edit.png`. |
| `construction.webp`, `inspection.webp`, `thermal.webp` | Recursos publicados por Flytek para sus aplicaciones. |
| `payload-thermal.webp`, `payload-dual.webp`, `payload-zoom.webp` | Imágenes representativas de integración publicadas por Flytek. |
| `studio.webp` | Composición ilustrativa de estudio generada a partir del recorte oficial. |
| `hero.mp4` | **Placeholder de video genérico** de Mixkit, con atribución en el footer. |
| `drone.glb` | **Placeholder 3D genérico** creado para esta propuesta. No representa las dimensiones ni la ingeniería real de FÉNIX. |
| `placeholder.svg` | Marcador neutral incluido para sustituir recursos nuevos o desconocidos. |

- Producto y datos: [página de FÉNIX de Flytek](https://www.flytek.com.mx/fenix_2.php), consultada para la propuesta el 2 de septiembre de 2026.
- Video: [Close-up view of a drone flying outdoors](https://mixkit.co/free-stock-video/close-up-view-of-a-drone-flying-outdoors-44644/).
- Licencia del video: [Mixkit Stock Video Free License](https://mixkit.co/license/#videoFree).

Para cambiar el material genérico por material oficial, sustituye las rutas o archivos y actualiza las leyendas de `FenixHeroVideo.tsx`, `Fenix3DViewer.tsx`, `FenixDroneCanvas.tsx`, `FenixDroneEntrance.tsx` y `FenixFooter.tsx` según corresponda. Ajusta los hotspots si cambia la geometría. No presentes el modelo de demostración como un modelo de ingeniería del producto.

## Uso de recursos en esta iteración

No se añadieron ni descargaron imágenes, video o GLB. Los archivos binarios locales se conservaron.

- `fenix.webp`: hero, mosaico de viento, composición integrada de Conoce FÉNIX, paneles técnicos y plataforma principal de payloads.
- `studio.webp`: bloque grande de autonomía y panel oscuro de rendimiento. Es una composición ilustrativa, no una nueva fotografía de ingeniería.
- `inspection.webp` y `construction.webp`: se mantienen en aplicaciones y se reutilizan provisionalmente para capacitación y soporte nacional. No acreditan por sí mismas actividades del equipo Flytek.
- `placeholder.svg`: nuevo uso visible en Mantenimiento, con `[IMAGEN PENDIENTE]`.
- Las tres imágenes de payloads permanecen vinculadas a sus pestañas; “A medida” utiliza su composición tipográfica existente.
- `hero.mp4` y `drone.glb`: permanecen ilustrativos. Se conserva la atribución del video y la advertencia del modelo.

## Sustituciones recomendadas al recibir material oficial

1. Video oficial, con versión comprimida y poster correspondiente.
2. GLB oficial con escala/origen consistentes, rotores separados y nombres de piezas. Ajustar cámaras, luz y hotspots en `viewer-data.ts`.
3. Fotografías reales de capacitación, mantenimiento y soporte; editar `fenixSupport` y sus textos alternativos en `data.ts`.
4. Close-ups oficiales de estructura, vuelo y payloads con sus posiciones reales de integración.

Validar con Flytek las zonas marcadas por las flechas: son guías visuales representativas sobre la fotografía disponible, no planos técnicos ni certificación de compatibilidad.
