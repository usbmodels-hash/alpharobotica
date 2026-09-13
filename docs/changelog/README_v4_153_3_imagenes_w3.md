# v4.153.3 — Coherencia de imágenes del artículo W3 (13/09/2026)

La tarjeta de Inicio ya mostraba un esquema ilustrativo, pero el artículo y el listado del blog aún cargaban otra imagen con «casos reales» y porcentajes no documentados en el artículo. La misma imagen aparecía al compartir el artículo en redes.

## Cambios

- Cabecera del artículo W3 y su tarjeta en `/blog` y `/en/blog`: ilustraciones horizontales en el idioma de cada página, con el estilo del esquema de Inicio y cuatro aplicaciones (room service, amenities, entregas nocturnas y eventos).
- WebP de 480 × 270, 960 × 540 y 1600 × 900 por idioma, con `srcset`, `sizes`, dimensiones explícitas y ALT descriptivo. Las tarjetas contienen la ilustración completa; no recortan sus rótulos.
- Imágenes JPEG de 1200 × 630 por idioma para `og:image` y `twitter:image`, con márgenes que preservan el contenido. Open Graph incluye tipo, dimensiones y ALT; Twitter incluye ALT.
- `Article.image` identifica la ilustración correspondiente. `dateModified`, fecha visible del artículo y los cuatro `lastmod` afectados pasan al 13/09/2026.
- Las variantes antiguas WebP/AVIF dejan de estar referenciadas en las páginas. Se conservan los archivos para no romper enlaces anteriores. Inicio y sus ilustraciones permanecen en v4.153.2.

## Recursos

- `assets/blog/w3-aplicaciones-es-v41533-{480,960,1600}.webp`
- `assets/blog/w3-aplicaciones-en-v41533-{480,960,1600}.webp`
- `assets/blog/w3-aplicaciones-es-v41533-social.jpg`
- `assets/blog/w3-aplicaciones-en-v41533-social.jpg`

Las URL nuevas evitan reutilizar imágenes con caché antigua. No se modifican los archivos CSS/JS compartidos ni sus versiones, los formularios, los canonical/hreflang, las fichas técnicas o las condiciones comerciales.

## Producción gráfica y comprobaciones

Ilustraciones adaptadas con la función integrada de imágenes, usando como referencia el esquema aprobado de Inicio. Especificación ES: composición horizontal 16:9, paleta azul marino/cian, título «Room service W3», cuatro aplicaciones y un diagrama conceptual de cocina, ascensor, robot y habitación; sin porcentajes ni referencias a clientes reales. Especificación EN: conservar la composición y traducir las etiquetas a «Applications in hotels», «Night deliveries», «Events», «Kitchen / pantry», «Lift» e «Illustrative diagram».

Exportación técnica con ImageMagick: WebP de 8–38 KB y JPEG social de 129–137 KB (bytes decimales aproximados). Los márgenes del formato social se han revisado visualmente. Se han comprobado las referencias a recursos, dimensiones, metadatos, JSON-LD y la conservación de H1, canonical/hreflang y scripts en las cuatro páginas.
