# Landing industrial — `industria.alpharobotica.com`

**Creada el 28/09/2026 (Europe/Madrid).**

Versión de la landing para **empresas con naves industriales, almacenes y plantas** que quieren automatizar
limpieza de suelos y logística interna. Destinada a la campaña de apollo.io para toda España. Es un
**proyecto de Netlify independiente** de la landing de hoteles y del sitio principal; se despliega desde este
repositorio con base directory `docs/landing-industria`.

## Estado

| Plano | Estado |
|---|---|
| Fuentes en GitHub | Sí — `docs/landing-industria/dist/` |
| Validado en local | Sí — Chromium y un servidor que emula el enrutado de Netlify |
| **Proyecto de Netlify creado** | **Sí** — `alpharobotica-industria` (equipo Cubotic), base `docs/landing-industria`, publish `docs/landing-industria/dist`, sin build |
| **Subdominio configurado** | **Sí** — `industria.alpharobotica.com`, DNS de Netlify, certificado comodín, Force HTTPS con HSTS de 1 año |
| **Desplegado / comprobado en producción** | **Sí** — despliegue `6ab9a713db134853beb52e6a` (`main@d9fa5fb`, 28/09/2026 01:30 CEST). Portada 200, `/gracias` 200 `noindex,follow` |
| Formulario registrado en Netlify | **Sí** — `leads-demo`, aviso por correo a `antonio@alpharobotica.com`. El primer deploy (`6ab9a4ab…`) salió con la detección de formularios desactivada; se activó y se relanzó |
| Medición (Plausible) | **Configurada, pendiente de comprobar en producción**: sitio `industria.alpharobotica.com` dado de alta en Plausible el 28/09/2026 (Europe/Madrid) y `dist/_redirects` con el proxy hacia su script `pa-HiYUg-v5guchAkcKLe08u.js`. Ver «Comprobación de la medición» |
| Recepción de contactos acreditada | **No** |

## Qué contiene

Misma base técnica que `docs/landing/` (CSS, aviso de cookies, formulario con canal y tipo de solicitud,
medición con consentimiento) y contenido propio:

| Bloque | Contenido |
|---|---|
| Hero | «¿Qué tareas de limpieza y logística puede asumir un robot en tu nave?» con dos fotos de producto (C55 y S300) y los dos CTA de valoración/demo. Sin YouTube |
| Contacto y formulario | Primera valoración gratuita. Chips: limpieza de suelos, transporte interno, cargas pesadas, orientación. Campo «Empresa / Planta» (`name="empresa"`). Formulario `leads-demo`, `form-name`, señuelo, `canal`, `solicitud`, `interes`, `action="/gracias"` |
| Catálogo | 01 KLEENBOT C40 (500–4.500 m²) · 02 KLEENBOT C55 (> 3.000 m²) · 03 CARRYBOT S100 (100 kg+) · 04 CARRYBOT S300 (hasta 300 kg) |
| Fichas | Datos tomados de las fichas del sitio principal (`robot-limpieza-keenon-c40/c55`, `robot-logistica-keenon-s100/s300`). C55 y S300 llevan **vídeo del fabricante alojado en el propio sitio**, que solo se carga al pulsar (5,6 MB y 5,0 MB), con enlace directo al MP4 sin JavaScript |
| Proceso | Primera valoración → demostración → piloto con métricas → puesta en marcha |
| `/gracias` | `noindex,follow`, misma distinción «solicitud recibida ≠ demostración reservada» |
| `robots.txt`, `sitemap.xml` | Para `https://industria.alpharobotica.com/`; una sola URL, `lastmod` 2026-09-28 |

Lo que **no** se afirma: uso en exteriores, entornos ATEX, cargas superiores a las publicadas ni integración
con carretillas o sistemas de gestión de almacén. Todo se presenta como interiores y sujeto a valoración.

`consent.js`, `plausible-init.js`, `landing-events.js`, `leadform-channel.js` y `video-funnel.css` son **byte a
byte** los de `docs/landing/dist/`. `industria.js` es nuevo: la lógica del formulario de la landing de hoteles
sin la parte de YouTube, más la carga bajo demanda de los vídeos.

## Puesta en marcha (acciones del propietario)

1. **Netlify → Add new project → Import from Git** → `usbmodels-hash/alpharobotica`. Nombre propuesto:
   `alpharobotica-industria`.

   | Ajuste | Valor |
   |---|---|
   | Branch to deploy | `main` |
   | **Base directory** | `docs/landing-industria` |
   | Build command | *vacío* |
   | **Publish directory** | `docs/landing-industria/dist` (el panel muestra la ruta completa) |

   `docs/landing-industria/netlify.toml` solo declara que no hay build y evita heredar el `netlify.toml` del
   sitio principal. El log del primer deploy debe decir `Starting to deploy site from 'docs/landing-industria/dist'`.

2. **Dominio**: Domain management → Add domain → `industria.alpharobotica.com`. En el DNS de
   `alpharobotica.com`, un registro `CNAME industria → <nombre-del-proyecto>.netlify.app` (Netlify muestra el
   valor exacto). Netlify emite el certificado solo. Si prefieres otro subdominio (`naves.`, `logistica.`),
   cambia las cuatro URL absolutas: `canonical`, `og:url`, `og:image`/`twitter:image` y `robots.txt`/`sitemap.xml`.

3. **Forms**: tras el primer deploy, comprobar que `leads-demo` aparece en Forms del proyecto nuevo y configurar
   el **aviso por correo** (es un proyecto distinto: no hereda el de la landing de hoteles). El asunto llega en
   el campo `subject` («Solicitud de valoración/demostración para nave industrial»).

4. **Comprobar en producción**: `<title>`, `/gracias` 200 con `noindex`, los dos MP4 con `video/mp4` y que se
   cargan solo al pulsar, y una entrada de prueba en Forms (etiquetada como prueba).

## Dependencias

| | Qué falta |
|---|---|
| **D1 · Medición** | **Resuelta el 28/09/2026.** Sitio `industria.alpharobotica.com` dado de alta en Plausible y `dist/_redirects` con las dos reglas del proxy hacia `pa-HiYUg-v5guchAkcKLe08u.js`. La etiqueta que propone Plausible incluye un bloque inline que define `window.plausible` y llama a `plausible.init()`: **no hace falta añadirlo**, porque `plausible-init.js` ya hace exactamente eso (define `window.plausible` con cola, llama a `init` con el `endpoint` del proxy y solo carga el script tras el consentimiento). Es el mismo mecanismo que funciona en la landing de hoteles |
| **D2 · Proyecto y dominio** | Pasos 1 y 2 de arriba. Esta sesión no tiene acceso a Netlify ni al DNS |
| **D3 · Aviso por correo del formulario** | Paso 3 |

## Comprobación de la medición (pendiente, en producción)

1. `https://industria.alpharobotica.com/stats/js/script.js` → 200 con JavaScript (`application/javascript` o
   `text/javascript`); un 200 con HTML no vale.
2. Abrir la landing, **aceptar** el aviso de cookies y navegar: en el panel de Plausible del sitio
   `industria.alpharobotica.com` debe aparecer la visita en tiempo real.
3. Antes de aceptar (o tras rechazar), la pestaña de red no debe mostrar ninguna petición a `/stats/`.

## Reversión

Deploys → despliegue anterior → «Publish deploy». El primero válido es `6ab9a713db134853beb52e6a`; antes no
había nada publicado en ese subdominio.

El explorador de archivos del deploy muestra `dist/` y `netlify.toml` porque lista el base directory; no existe
`dist/dist` en `main` y los 10,6 MB del deploy son los dos vídeos MP4, no activos duplicados.
