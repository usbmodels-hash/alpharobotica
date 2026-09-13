# v4.153.7 — Hero de Inicio: diapositivas 2 y 6 con producto real (14/09/2026)

Complemento de v4.153.6. Dos diapositivas del carrusel de Inicio (ES/EN) mostraban producto que Alpha no comercializa o que no correspondía a su etiqueta: la 2 («KEENON · Innovación robótica») un humanoide sobre fondo morado, y la 6 («Heavy Load · Logística y transporte») una foto en la que aparecía un W3 junto al S100 (en móvil el recorte mostraba solo el W3).

## Cambios

- **Diapositiva 2 → W3 en pasillo de hotel.** `assets/hero/hero-w3pasillo-1200.{avif,webp}` (de `assets/w3-corridor-room-service-v4101-1200.webp`) y recorte móvil `hero-w3pasillo-506x675`. En ≥641 px anclaje `object-position:0 center` y velo más ligero (`[data-active="1"]`) porque el robot está a la izquierda de la foto.
- **Diapositiva 6 → S100 Heavy Load (dos unidades, una con jaula de carga).** `assets/hero/hero-heavyload-1600.{avif,webp}` (de `assets/catalog/heavyload-kv.webp`, 1600×800) y recorte móvil `hero-heavyload-600x800`. Anclaje `object-position:0 center` en todos los tamaños para que el S100 con jaula quede a la derecha del titular en escritorio.
- Etiquetas, chips, enlaces y `aria-label` de los puntos no cambian.
- `hero-carousel.js`: `update()` fija `data-active` en la sección (para el velo por diapositiva); cache-bust `?v=41537-hero-slides`. Sin cambios en el envío del configurador.
- Se eliminan los recortes móviles que quedan sin uso: `hero-innovacion-675x900.*` y `hero-logistica-675x900.*`. Los ficheros `hero-innovacion-1600.*` y `hero-logistica-1600.*` se conservan sin referencias.

## Decisiones

- La diapositiva 3 (humanoide en lobby) se mantiene, pendiente de decisión.
- Sin cambio de `lastmod` (cambio de imagen en el hero); si se publica otro día que el 13/09 y se quiere reflejar, actualizar solo `/` y `/en/`.
- Foto del W3 a 1200 px y KV Heavy Load a 1600 px: se estiran en pantallas grandes/densas; mejorarían con originales en alta resolución.

## Alcance

`index.html`, `en/index.html`, `assets/js/hero-carousel.js`, 8 imágenes nuevas y 4 eliminadas en `assets/hero/`, este changelog.
