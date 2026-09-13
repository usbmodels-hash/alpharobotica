# v4.153.2 — Ilustración propia del artículo W3 (13/09/2026)

## Inicio ES/EN · tarjeta del blog «Aplicaciones y escenarios del robot de room service W3 en hoteles»
- La tarjeta usaba `/assets/blog-room-service-w3-hoteles.webp` (589×562), una fotografía con el rótulo incrustado «Casos de uso del robot de room service W3 en hoteles reales», que ya no coincidía con el título del artículo desde v4.152.
- Nueva ilustración de elaboración propia (esquema vectorial, sin fotografías ni logotipos de terceros) en dos idiomas: planta de hotel con cocina/office, ascensor, pasillo y habitaciones, un robot de entrega genérico en ruta hacia la habitación, y los cuatro escenarios del artículo numerados (room service sin contacto, amenities y solicitudes, turnos nocturnos, eventos y picos de demanda). Tipografías del sitio (Playfair Display + Inter) y paleta de `styles.css`.
- Ficheros: `assets/w3-aplicaciones-es-1260.webp`, `-630.webp`, `-400.webp` y sus equivalentes `-en-` (relación 1,05:1, la de `.home-blog-thumb`, sin recorte). Pesos: 55 KB / 25 KB / 13 KB (ES) y 50 KB / 23 KB / 12 KB (EN); la imagen anterior pesaba 28 KB (WebP 589 px) y el PNG de origen 536 KB.
- `index.html` y `en/index.html`: `src`, `srcset` (400w · 630w · 1260w), `sizes` conservado, `width="1260" height="1200"`, `loading="lazy"`, y `alt` descriptivo del esquema (sin mencionar marca en el `alt`, ya presente en el texto de la tarjeta).
- Los ficheros antiguos (`blog-room-service-w3-hoteles.png/.webp/-400.webp`) se conservan en su URL; ya no se referencian desde ninguna página.
- Sin cambios en CSS, JS, sitemap ni metadatos: no hace falta bump de caché.
