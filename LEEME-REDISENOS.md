# FLYTEK — rediseños integrados

Esta entrega integra los rediseños oficiales de ORION MX y VEGA en el sitio principal.

## Incluye

- Portadas de ORION MX y VEGA con movimiento suave ligado al scroll.
- Drones flotantes en “Nuestras plataformas” de la página principal.
- Elementos de texto estables; el movimiento de contenido se concentra en portadas, títulos e imágenes.
- Navegación, tipografía, paleta, modo oscuro y datos de contacto compartidos.
- Visores 3D con carga diferida. VEGA deja de renderizar cuando está quieto o fuera de pantalla; ORION se pausa fuera de su sección y requiere activar la rotación para manipularlo.
- Ajustes responsive comprobados desde 320 px hasta escritorio.
- FÉNIX conservado sin aplicar los nuevos efectos de scroll.

## Ejecutar

```bash
npm install
npm run dev
```

Para validar producción:

```bash
npm run typecheck
npm run build
npm start
```

Los valores técnicos marcados como “según configuración” deben confirmarse antes de publicación comercial.
