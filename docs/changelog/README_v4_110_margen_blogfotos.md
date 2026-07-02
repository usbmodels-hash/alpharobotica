# Alpha Robotics v4.110 - margen RaaS interno y encuadre blog

## Base

VersiÃ³n creada desde `alpha_robotics_v4_109_configurador_hotfix_POSIX.zip`, sin tocar producciÃ³n.

## Cambios aplicados

- `configurador.html`: eliminado del panel pÃºblico el campo `Margen RaaS (%)` / `#raas_prem`.
- `assets/js/configurador.js`: aÃ±adido `RAAS_MARGIN = 0.15` como constante interna y aplicada a la cuota OpExFlow.
- `styles.css`: consolidadas reglas de contenciÃ³n para `.article-featured-media`, `.blog-thumb`, imÃ¡genes de artÃ­culos y tarjetas del blog.
- Todas las referencias a `styles.css` suben a `?v=4110-margen-blogfotos`.
- Las referencias a `assets/js/configurador.js` suben a `?v=4110-raas-margin`.
- `_headers` y `netlify.toml` actualizan el comentario de cache-busting.

## Margen RaaS

El margen interno aplicado a OpExFlow/RaaS es del 15 %. No se muestra al cliente y no existe ningÃºn input pÃºblico `#raas_prem`. La cuota sigue calculÃ¡ndose sobre la base anterior:

`(cuota financiacion RaaS + Alpha Care) * (1 + 0.15) + consumibles`

El configurador mantiene visibles solo supuestos de cliente: TAE, plazo financiado, plazo RaaS, ocupacion, utilizacion, horas operativas, jornada y consumibles. Nota v4.113: el comparador manual de cuota se elimina del panel publico; los PVP siguen como defaults internos y la estimacion conserva el descargo de que no tiene valor de oferta.

## Blog y WPO

Las reglas reforzadas evitan que las imÃ¡genes del blog excedan su marco:

- ArtÃ­culo: `.article-featured-media` mantiene `overflow:hidden`, `width/max-width:100%`, `aspect-ratio:16/9` y `object-fit:cover`.
- Ãndice: `.blog-thumb` elimina padding/restos de placeholder, fuerza `overflow:hidden` y la imagen usa `width/height:100%` con `object-fit:cover`.
- Seguridad global: imÃ¡genes dentro de `.article-body`, `.article-layout` y `.blog-card` con `max-width:100%`.

Los 12 assets de `assets/blog/` siguen presentes.

## VerificaciÃ³n realizada

- `rg "raas_prem|Margen RaaS"`: 0 coincidencias en cÃ³digo funcional.
- `rg "RAAS_MARGIN"`: constante interna encontrada en `assets/js/configurador.js`.
- `rg "styles.css?v=4108-alphacare-config"`: 0 coincidencias.
- `rg "configurador.js?v=4109-configurator-hotfix"`: 0 coincidencias.
- `assets/blog/`: 12 archivos.
- `on*=` inline: no se han aÃ±adido handlers inline; los botones del configurador siguen con `addEventListener` en JS externo.
- Node no estÃ¡ disponible en este entorno, por lo que no se pudo ejecutar `node --check`.

## VerificaciÃ³n pendiente en Deploy Preview

Subir este ZIP a una Deploy Preview de Netlify, idealmente con clear cache:

- `/configurador`: los botones de perfil operativo y vertical son clicables; KPIs cambian al editar; el informe se desbloquea.
- `/blog`: revisar a 1280 px y 380 px que las miniaturas quedan contenidas y no hay scroll horizontal.
- Un artÃ­culo, por ejemplo `/blog-keenon-c40-vs-competencia-2026`: revisar a 1280 px y 380 px que la imagen destacada queda contenida.
- Consola: sin 404 de assets y sin violaciones nuevas de CSP Report-Only.

## Empaquetado POSIX

El ZIP final debe tener rutas internas con `/`, nunca `\`. AutocomprobaciÃ³n obligatoria antes de entregar:

- Total de entradas: 267
- `backslash: 0`
- `assets/js/configurador.js`: incluido
- `assets/blog/blog-c40-vs-c55-1600.webp`: incluido
- `_headers`, `netlify.toml`, `robots.txt` y `sitemap.xml`: incluidos

Los archivos deben quedar en la raÃ­z del ZIP, incluyendo `_headers`, `netlify.toml`, `robots.txt`, `sitemap.xml`, `assets/js/` y `assets/blog/`.

