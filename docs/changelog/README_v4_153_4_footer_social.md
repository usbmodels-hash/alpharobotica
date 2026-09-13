# v4.153.4 — Corrección de enlaces sociales del footer (13/09/2026)

El footer de las páginas ES enlazaba a un perfil de LinkedIn con guion (`company/keenon-robotics/`) y a un usuario de Instagram (`keenon_robotics`) que no se corresponden con los canales oficiales de KEENON Robotics comunicados por Alpha (13/09/2026).

## Cambios

- LinkedIn: `https://www.linkedin.com/company/keenon-robotics/` → `https://www.linkedin.com/company/keenonrobotics/` (18 páginas ES).
- Instagram: `https://www.instagram.com/keenon_robotics/` → `https://www.instagram.com/keenonrobotics_official/` (18 páginas ES).
- YouTube sin cambios: `https://www.youtube.com/@KEENONRobotics` ya era el canal correcto.
- Se conservan los `aria-label` («canal del fabricante»), el rótulo «Canales de KEENON Robotics:», los iconos SVG y `rel="noopener noreferrer" target="_blank"`.

## Decisiones

- Sin cambio de `lastmod` en el sitemap: corrección de enlace en el footer, sin cambio sustantivo de contenido en las páginas.
- Las páginas EN no incluyen el bloque de enlaces sociales en su footer; añadirlo queda fuera de este cambio, pendiente de decisión.
- Estos perfiles son canales del fabricante (KEENON) y no de Alpha Robótica: no se usan como `sameAs` de la Organization de Alpha, que sigue pendiente de URL propias.

## Alcance

18 ficheros HTML (una línea por fichero). No se modifican CSS/JS, formularios, canonical/hreflang, JSON-LD, sitemap ni condiciones comerciales.
