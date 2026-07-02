# alpharobotica.com

Sitio estático de **Alpha Robotics** (Alpha Bootis S.L.), distribuidor autorizado de KEENON Robotics en España. Bilingüe ES (raíz) / EN (`/en/`), desplegado en **Netlify**.

## Estructura
- `*.html` · `en/*.html` — una página por archivo, nav/footer inline (38 + 38 páginas).
- `assets/` — imágenes (webp/avif), vídeos, fuentes autohospedadas y JS (`assets/js/`, con los scripts externalizados por CSP en `assets/js/csp/`).
- `main.js` · `cookie-consent.js` — JS compartido con helper i18n (`ALPHA_LANG`/`aT(es,en)`); cualquier cambio exige verificar paridad ES byte a byte.
- `_redirects` — URLs limpias, 301 legacy y proxy first-party de analítica (`/stats/*` → Plausible).
- `_headers` · `netlify.toml` — cache, seguridad y CSP (Report-Only; la definitiva usa `script-src 'self'` + hashes: **no añadir scripts inline**).
- `docs/changelog/` — READMEs históricos por versión. `docs/src-components/` — parciales fuente ya inlinados en las páginas (no se usan en runtime).

## Despliegue
ZIP de la raíz (POSIX) → Netlify drag & drop, o repositorio conectado publicando la raíz. En cada cambio de archivo cacheado, subir el `?v=` correspondiente (ver `_headers`).

## Convenciones
- Cifras técnicas: solo de la ficha oficial KEENON vigente (jun-2026). ROI: motor del configurador, nunca estimaciones sueltas.
- "Distribuidor **autorizado**", nunca "exclusivo".
- Analítica: Plausible cookieless vía proxy `/stats`; eventos de funnel en `assets/js/alpha-events.js`.
