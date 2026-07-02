# v4.147 — FASE 0 (P0): coherencia de contenido + analítica cookieless

## Cambios de contenido (ES + EN, visible y JSON-LD sincronizados)
- **Ficha C40**: bloque "Opiniones de facility managers" (testimonios con nombre y estrellas, no verificables) sustituido por "Escenarios de uso del C40" con disclaimer, alineado con la política de la home.
- **Moqueta — respuesta canónica** (fuente: catálogo oficial gama Cleaning, jun-2026): el C40 trabaja en moqueta de pelo corto en modo seco; el fregado es solo suelo duro. Corregida la FAQ contradictoria de la ficha y matizada la FAQ de la home.
- **Eficiencia C40**: unificada a "hasta 1.100 m²/h" (ficha, bloque capacidades y comparativa Kleenbot ES/EN; antes convivían 1.100 y 1.200).
- **Cifras 90/67/97** (agua/químicos/horas) retiradas de C30/C40/C55 ES+EN: no constan en documentación oficial disponible.
- **Instalación — frase canónica**: 1-3 días despliegue estándar; 6-10 días con integración de ascensores/automatismos (resuelve el conflicto entre FAQ y bloque OpExFlow).
- **Privacidad de navegación**: la home ya no afirma "sin cámaras"; explica fusión LiDAR+VSLAM con cámaras solo de navegación a bordo, sin grabar ni almacenar (coherente con /lidar).
- **CTA unificado**: "Diagnóstico gratuito" / "Free assessment" apunta siempre al formulario (/#diagnostico-gratuito · /en/#diagnostico-gratuito). 68 enlaces de cabecera corregidos.
- **EN**: "Configure fleet completa" → "Configure your full fleet"; `en_US` → `en_GB` en 22 páginas.

## Analítica cookieless (nueva)
- `assets/js/alpha-events.js?v=4147-p0` (validado con node --check): eventos de funnel — hero_madlib_select/submit, config_start, config_gate_submit, diag_form_submit, cta_whatsapp, cta_tel, cta_diagnostico. Delegación pura, sin dependencias, no-op si Plausible no carga.
- Snippet Plausible (data-api first-party) insertado en las 76 páginas; proxy `/stats/*` añadido a `_redirects` ANTES del catch-all `/en/*`.
- Promesa del configurador reformulada (ES/EN): sin cookies ni rastreadores publicitarios; analítica agregada y anónima alojada en la UE. Nota declarativa añadida a la política de cookies ES/EN.
- **ACTIVACIÓN PENDIENTE**: dar de alta `alpharobotica.com` en plausible.io (plan UE). Hasta entonces el script carga y los eventos se descartan sin efecto.

## Verificación ejecutada
- 0 apariciones de: testimonios con nombre, "exclusivamente para suelos duros", 1.200 m² (C40), en_US, "fleet completa", claims 90/67/97.
- JSON-LD: todos los bloques de las 14 páginas tocadas parsean OK; FAQ schema sincronizado con el texto visible.
- `main.js` y `cookie-consent.js` byte-a-byte idénticos a v4.146 (paridad ES intacta).

## Addendum v4.148 — integración del snippet oficial de Plausible (cuenta activada)
- Script único de la cuenta (`pa-xmf_YZISFSNuuYU-zgSlN.js`) servido en first-party vía el proxy `/stats/js/script.js` de `_redirects`.
- Stub de inicialización oficial **externalizado** a `assets/js/csp/plausible-init.js?v=4148-plausible` (la CSP definitiva usa `script-src 'self'` + hashes: un inline nuevo la rompería). Configura `endpoint` hacia `/stats/api/event`, de modo que `connect-src 'self'` sigue siendo válido y **no hay que modificar la CSP**.
- Orden en `<head>`: pa-script (async) → plausible-init (defer) → alpha-events (defer). El stub es independiente del orden de carga: encola eventos hasta que el script principal esté listo.
- Comprobación post-deploy: DevTools → Network: `GET /stats/js/script.js` = 200 y, al hacer clic en WhatsApp, `POST /stats/api/event` = 202; el evento aparece en el panel de Plausible en tiempo real. Verificar también que la consola no registra violaciones nuevas en el informe CSP Report-Only.
