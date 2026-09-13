# v4.152 — Coherencia técnica y comercial (12/09/2026)

## Especificaciones y seguridad
- **C40**: depósitos **16 L agua limpia / 11 L agua sucia** en ficha ES/EN (tabla, texto y JSON-LD), catálogo, familia de limpieza y comparativa. Sin restos de 14 L / 16/14.
- **Seguridad C40** (FAQ visible + FAQPage): retirado el absoluto «en ningún caso colisiona» y la mención a certificación no documentada; respuesta basada en LiDAR + visión, reducción de velocidad/parada/intervención y validación de recorridos en la instalación.
- **Guía C40** (`/blog-keenon-c40-vs-competencia-2026`, URL conservada): pasa de «vs competencia» a guía de criterios de comparación (técnicos, operativos, cómo comparar con otros fabricantes, qué aporta un integrador). Navegación explicada como fusión LiDAR + visión; distinción entre navegación local, conectividad de gestión e integración con ascensores.

## Comparativas (ES/EN)
- Plantilla clara con contraste ≥ 4,5:1; retirados los estilos de cabecera inline que ocultaban la navegación fija.
- KLEENBOT: tabla de aplicaciones separada de la tabla técnica (Parámetro × C30/C40/C55), `caption`, `scope`, unidades, «No aplica» en depósitos del C30 (limpieza en seco), enlaces a las tres fichas, tarjetas etiquetadas en móvil.
- DINERBOT: carga útil T9 40 kg · T10 40 kg · T11 20 kg (5 kg por bandeja intermedia · 10 kg en la base). Autonomía del T10 sin cambios (pendiente de fuente).

## Packs, financiación y ROI
- Packs 5/6/12/23 con supuestos visibles (Enterprise como fuente única; Inicio y Modelos enlazan a los supuestos).
- Texto base uniforme: «Compra en propiedad, financiación o servicio por cuota, con condiciones de propiedad, mantenimiento y continuidad según la modalidad contratada». Sin propiedad final automática en renting/leasing (Inicio, Modelos, `configurador.js?v=4138` finDesc).
- Artículo ROI retitulado «Cómo medir el ROI de un robot de limpieza en tu hotel» (URL conservada): horas liberadas ≠ ahorro en caja, fórmulas de payback, ejemplo reproducible con supuestos del configurador, «seis meses = evaluar, no recuperar». Tarjetas actualizadas (Inicio, blog, ficha C40, EN).

## Editorial
- Retirados rótulos internos: «FAQ SEO», «futuros vídeos», «versión anterior», «Este funnel», «Ver funnel», notas sobre autorización de testimonios.
- Casos W3 → «Aplicaciones y escenarios» + sección de referencias del fabricante (identificadas como tales).
- Tendencias y elección de robot: sección «Decisiones concretas antes de elegir» (suelo, metros, ancho de paso, carga, turnos, ascensores, accesorios, mantenimiento, piloto). Fecha de actualización visible y `dateModified`.
- Configurador: los tres H3 previos al primer H2 pasan a párrafos con énfasis (`p.diag__title`).
- Guía de precios: «artículos relacionados» ficticios sustituidos por contenidos reales; modelos de la tabla enlazados a fichas.

## Metadatos y enlaces
- Titles/descriptions/OG nuevos: Empresa, Limpieza, F&B, C55, Room service; títulos acortados de C30 y T8; traducción EN. Sufijo «| Alpha Robótica» unificado en páginas ES.
- Footer: iconos sociales identificados como «Canales de KEENON Robotics» (etiqueta visible + aria-label).
- `/lidar`: Áreas → `/#soluciones`, Configurador → `/configurador`. Migas EN de 5 páginas apuntaban a rutas ES.
- Enlaces contextuales a fichas C30/C55 (familia, ficha C40, guía de precios, FAQ de Inicio) y a la landing de demo (Inicio, Room service, Enterprise).

## Datos estructurados, sitemap, imágenes, CSS y analítica
- `Offer` sin precio retirado de las 22 fichas (venta bajo presupuesto); `Product` conservado.
- `Organization` unificada con `@id` `https://alpharobotica.com/#organization` (entidad de /empresa); `LocalBusiness` duplicado y `SearchAction` no funcional retirados de Inicio.
- Sitemap: 68 URL con `lastmod` 2026-09-12 (todas las páginas cambian por el bump de `styles.css`).
- Imágenes del blog (3 PNG ≈ 1,72 MB) → WebP (+ variante 400w, `srcset`/`sizes`, `width`/`height`); PNG conservados en su URL.
- Inicio: enlaces CSS duplicados dentro de `<noscript>` eliminados.
- `styles.css?v=4151-enc2`: etiqueta de canales KEENON; botón secundario (`.btn.secondary`, blanco por defecto) visible sobre fondos claros donde era invisible: tarjetas de familia (`.robot-card.expanded`), fichas (`.robot-detail-copy`), bloque S100 del W3, Enterprise (`.alpha-care-table-wrap`), página de cookies y **botones «Configurar» y «Rechazar» del banner de cookies** (también en las 6 páginas con CSS inline: blog, gracias, 404 ES/EN); enlaces legibles en la plantilla oscura de artículos (`.article-section a`, `.lead-magnet-cta`, `.site-footer`); rótulos «Escenario ·» de las tarjetas de escenarios (antes navy sobre navy); enlace de demo legible sobre fondo oscuro; enlace C55 en el bloque de sectores de la ficha C40.
- Comparativas: botones secundarios de las tarjetas con color de marca sobre fondo claro (Lighthouse accesibilidad 95 → 100).
- `alpha-events.js?v=4152-enc2` (v3): `diag_form_start`, `form_thanks_view`, `cta_demo_landing`; sin envío si la analítica está rechazada en el banner.

## Landing (proyecto Netlify independiente, v4)
- Tuteo, acceso a privacidad junto al formulario, «Ver ficha técnica» por bloque, dominio del footer enlazado, accesos a Empresa/Privacidad/Aviso legal, imágenes base64 → archivos con dimensiones y ALT, `robots.txt` + `sitemap.xml` (solo la URL canónica), analítica Plausible por proxy first-party (misma propiedad).
