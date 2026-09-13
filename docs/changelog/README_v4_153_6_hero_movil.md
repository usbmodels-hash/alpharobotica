# v4.153.6 — Hero de Inicio en móvil: imagen visible y texto en el tercio inferior (13/09/2026)

En móvil el carrusel del hero de Inicio (ES/EN) no se veía: el velo apilaba dos degradados (93–97 % de opacidad), las fotos 16:9 recortadas en vertical perdían al robot en 3 de 6 diapositivas y el contenido cubría 1,3 pantallas. Opción A del análisis del 13/09/2026.

## Cambios

- **Recortes verticales propios (arte dirigido).** 6 nuevas imágenes `assets/hero/hero-<slide>-675x900.{avif,webp}` (3:4, recortadas del original 1600×900 centrando al robot) servidas con `<source media="(max-width:640px)">` en cada `<picture>` de `index.html` y `en/index.html`. En escritorio se siguen usando las 1600.
- **Layout móvil (≤640 px), CSS inline en el bloque `<style>` del hero de ambas portadas.** El bloque de imagen pasa a estar en flujo (alto `min(133,4vw, 62vh)`, a sangre), con un degradado solo en el tercio inferior (`.hero-slides::after`) que termina en azul marino sólido; el velo general se oculta; eyebrow + H1 + CTA se solapan 112 px sobre la parte oscurecida y el subtítulo y el configurador continúan sobre azul sólido. Chip de diapositiva arriba a la izquierda y puntos arriba a la derecha, sobre la foto.
- **Tablet (641–900 px).** Velo sustituido por un único degradado vertical (42 % → 88 %): la foto pasa a verse.
- **Swipe.** `hero-carousel.js`: gesto táctil horizontal sobre la imagen (umbral 44 px, ignora el scroll vertical); cache-bust `?v=41536-hero-movil` en las dos portadas. Sin cambios en el envío del formulario configurador.
- Escritorio (>900 px): sin cambios visuales.

## Decisiones

- CSS inline en las portadas en vez de `styles.css`, para no tocar el cache-bust de las 78 páginas.
- Se mantienen las 6 diapositivas actuales; la sustitución de las dos con robot humanoide (innovación, hospitality) queda pendiente de decisión.
- `lastmod` de `/` y `/en/` ya es 2026-09-13; si se publica otro día, actualizarlo a la fecha de publicación.
- Los recortes 675×900 se estiran ~1,7× en pantallas 3×; mejorarían con los originales en alta resolución si existen.

## Alcance

`index.html`, `en/index.html`, `assets/js/hero-carousel.js`, 12 imágenes nuevas en `assets/hero/`, este changelog. Sin cambios en `styles.css`, formularios, canonical/hreflang, JSON-LD ni sitemap.
