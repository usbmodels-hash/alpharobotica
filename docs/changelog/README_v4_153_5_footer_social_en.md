# v4.153.5 — Bloque de enlaces sociales en el footer EN (13/09/2026)

Las 18 páginas ES con footer completo mostraban los canales oficiales de KEENON Robotics (v4.153.4); sus equivalentes EN no llevaban el bloque. Se añade el mismo bloque, traducido, a las 18 páginas EN equivalentes.

## Cambios

- Bloque `social-links` insertado en el footer EN (columna Legal, tras «Cookie settings»), con las URL corregidas en v4.153.4: LinkedIn `company/keenonrobotics/`, Instagram `keenonrobotics_official`, YouTube `@KEENONRobotics`.
- Rótulo: «KEENON Robotics channels:». `aria-label` traducidos: «KEENON Robotics on LinkedIn/Instagram/YouTube (manufacturer's channel)». Iconos SVG, `rel` y `target` idénticos a ES.
- Sin cambios de CSS: `.social-links` ya vive en `styles.css`, que cargan todas las páginas afectadas.

## Alcance

18 ficheros `en/*.html` (una inserción por fichero), equivalentes exactos de las 18 páginas ES con bloque social: index, catálogo, roi, 4 páginas de categoría y 11 fichas de producto. Las páginas EN de blog, legales y demás quedan como en ES (sin bloque). Sin cambio de `lastmod` en el sitemap (cambio de footer, no de contenido).
