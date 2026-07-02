# v4.119 — Fase 2 · Tanda 1A: verticales en inglés (sobre v4.118)

Base: v4.118 (tablas enterprise recalculadas). Sin build; deploy por arrastre a Netlify.

## Qué incluye esta entrega
Las 4 páginas de categoría ("Soluciones") traducidas al inglés bajo `/en/`, con contenido completo
(galerías multimedia, specs, comparadores, FAQ SEO y enlaces internos):
- `/en/limpieza-autonoma`  — KLEENBOT C30 · C40 · C55
- `/en/food-beverage`      — DINERBOT T8 · T9 · T10 · T11 · T3
- `/en/logistica-interna`  — KEENON S100 · S300 (+ tarjeta de integraciones GBox/E-Box)
- `/en/room-service`       — BUTLERBOT W3 (vídeo EN) · T3 · S100

## Menú e idioma (transición)
- El nav y el footer de TODAS las páginas EN (home, configurador y las 4 nuevas) ya enlazan a `/en/*`
  para estas 4 verticales.
- Lo aún no traducido (catálogo, fichas de producto, Alpha Care, blog, ROI) enlaza a la versión ES
  a propósito —contenido útil mejor que enlace roto— hasta su tanda. El selector ES|EN siempre visible.

## SEO
- `hreflang` recíproco es ↔ en ↔ x-default en los 4 pares (EN nuevas + ES correspondientes).
- `canonical` propio por página (`/en/<slug>`).
- `sitemap.xml`: las 4 entradas ES mejoradas con alternates + 4 entradas `/en/` nuevas.

## Técnico
- Rutas de assets ROOT-ABSOLUTAS (`/assets/…`, `/styles.css`, `/main.js`). Por eso las páginas EN
  renderizan servidas desde el dominio (o `http://localhost:8099/en/…`), NO en `file://`.
- Sin cambios en CSS/JS → la versión de caché se mantiene en `?v=4118-tables-recalc`.
- Reutilizan las clases existentes (category-hero, product-stack, robot-gallery, spec-list, seo-faq…).

## Pendiente (siguientes entregas)
- Tanda 1B: catálogo EN (`/en/catalogo-keenon`) — la página más larga.
- Tanda 2: adquisición + Alpha Care + enterprise + `/en/roi`, y migrar esos enlaces del nav a `/en/*`.
- Fase 2b: fichas de producto EN (C30/C40/C55, T-series, W3, S100/S300).

## Ritual de despliegue
1. Arrastrar el **ZIP completo** a Netlify.
2. Verificar en **incógnito** + **Ctrl/Cmd+Shift+R**.
3. Probar EN visitando `https://alpharobotica.com/en/limpieza-autonoma` (las rutas root-absolutas
   necesitan servirse desde la raíz del dominio).
