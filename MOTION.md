# Sistema de motion FÉNIX

Definido antes de implementar esta iteración. Se mantiene el hero y la secuencia horizontal existente.

| Patrón | Uso | Comportamiento |
| --- | --- | --- |
| A · Text reveal | Títulos editoriales | Traslación de pocos píxeles y opacidad vinculadas al avance de scroll; reversibles. |
| B · Image reveal | Mosaico, aplicaciones y soporte | Recorte discreto y traslación de entrada; 1 s. El hover de la foto queda en un elemento interior. |
| C · Tech reveal | Datos, labels, separadores y conexión | Entrada de 0.7 s y líneas que se extienden. Sin contadores ni telemetría inventada. |
| D · Product motion | Hero, cámara 3D y ascenso | Parallax mínimo; cámara 0.9 s; ascenso 4.2 s; hover de amplitud reducida. |

Easing de entrada `power3.out`; scrub lineal suavizado 0.65. Microinteracciones 220 ms. Los valores viven en `lib/fenix/motion.ts` y las variables CSS existentes.

Todos los ScrollTriggers se crean dentro de `gsap.context()` y `gsap.matchMedia()` en `FenixAnimations.tsx`. El modelo recibe progreso y solicitudes de reproducción mediante eventos locales; el canvas no crea ScrollTriggers. Se limpian eventos, observadores, tweens y triggers al desmontar.

Con movimiento reducido: contenido visible, paneles verticales, video pausado inicialmente, cámara directa, dron situado al final y sin parallax ni hover automático. Las transiciones de color y el feedback de los controles se conservan.

Referencias de comportamiento consultadas: [MotionSites, scroll animation](https://motionsites.ai/lesson/build-scroll-animated-website-with-ai), [Motion, texto ligado al scroll](https://motion.dev/examples/react-text-scroll-word-reveal), [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) y [gsap.matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/). Se toma la relación entre avance, texto y producto; no se copia la plantilla, sus assets, sus estilos ni su stack.
