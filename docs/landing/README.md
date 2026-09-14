# Landing `landing.alpharobotica.com` — fuente, correcciones, paquete y despliegue

**Actualizado el 14/09/2026 (Europe/Madrid).**

La landing **no se despliega desde este repositorio**: va por su propio proyecto de Netlify. Aquí se
guarda su fuente para tener historial y una reversión concreta.

## Estado, en cuatro planos distintos

| Plano | Estado |
|---|---|
| **Archivos en GitHub** | Sí. Rama `landing-paquete-completo`, sobre `main` = `58957d69239503ac4d49d1fb915f4be1cdc66f1d` |
| **Validado en local / vista previa** | Sí, con Chromium y un servidor que emula el enrutado de Netlify. Resultados abajo |
| **Desplegado en Netlify** | **No.** Esta sesión no tiene acceso al proyecto de la landing |
| **Verificado en producción** | **No.** No se ha podido abrir ninguna URL pública desde aquí |
| **Recepción real de contactos acreditada** | **No.** Las pruebas usan un receptor simulado local, nunca Netlify Forms ni el CRM |

La fusión de la PR #17 acredita que estos archivos están en `main`; **no** acredita ningún despliegue.

## Carpetas

| Carpeta | Qué es |
|---|---|
| `origen-2026-09-14/` | La copia recibida del despliegue de partida, **tal cual, sin tocar** (13 archivos). Es el punto de reversión del contenido que se recibió. **No está acreditada como copia completa del despliegue**: le faltan al menos `robots.txt`, `sitemap.xml`, `icon-512.png`, `gracias` y la configuración del proyecto |
| `dist/` | La landing con el pliego aplicado y las diferencias resueltas (17 archivos) |
| `paquete/` | `AlphaRobotica_Landing_Completa.zip` y su manifiesto SHA-256 |
| `Cambios_pendientes_landing.md` | El pliego original |

## Reconciliación entre la copia recibida y la landing publicada

| Diferencia observada | Cómo queda resuelta en `dist/` |
|---|---|
| Producción usa `canonical` absoluto; la copia traía `href="index.html"` | Restaurado `https://landing.alpharobotica.com/`. `og:url` ya era coherente |
| `/robots.txt` existe en producción y faltaba en la copia | Añadido: `Allow: /` + línea `Sitemap:`. **No** bloquea `/gracias`, que debe seguir siendo rastreable para que Google pueda leer su `noindex` |
| `/sitemap.xml` existe en producción y faltaba en la copia | Añadido con **una sola URL**, la portada canónica. Sin `/gracias`, sin copias, sin documentación. `lastmod` = `2026-09-14`, la fecha real de esta modificación sustancial del contenido |
| `/icon-512.png` existe en producción, se cita en `og:image` y **falta en la copia** | El archivo no se puede reproducir: el PNG mayor disponible es `apple-touch-icon.png`, de 180×180. Como un despliegue de reemplazo completo borraría lo que no viaje en el ZIP, la imagen social pasa a `assets/og-landing.jpg`, **incluida en el paquete**, JPEG real de 1200×630, con `og:image:width/height/alt` y `twitter:card`. Ver dependencia **D2** si se prefiere conservar el archivo de producción |
| `/gracias` **ya existía en producción con `noindex`** | La copia recibida no lo traía. Se incluye `gracias.html` con `noindex,follow`, que distingue expresamente «solicitud recibida» de «demostración reservada» y hace funcionar el evento `form_thanks_view`. **No es una ruta nueva**: faltaba en la copia, no en el sitio |
| `/stats/js/script.js` funciona en producción, pero su configuración no está acreditada | **Sin resolver.** Ver dependencia **D1**. No se ha copiado el `netlify.toml` ni el `_redirects` del sitio principal, que corresponden a otro proyecto |

## Corrección sobre Netlify Forms

La lectura anterior era equivocada y queda rectificada: **Netlify elimina `data-netlify` / `netlify` del HTML
procesado e inyecta el campo oculto `form-name`.** Que el atributo no apareciera en el HTML de producción
**no demuestra** que el formulario estuviera roto ni sin registrar. El atributo se conserva en la fuente porque
es lo que usa la detección en tiempo de despliegue, y es inocuo si el formulario ya estaba registrado.

Se conservan `name="leads-demo"`, el campo oculto `form-name` y el señuelo `bot-field`
(`netlify-honeypot="bot-field"`).

El `action` pasa de la URL absoluta `https://landing.alpharobotica.com/gracias` a la ruta de **mismo origen**
`/gracias`. Así una prueba en una vista previa (`deploy-preview-*.netlify.app`) no envía datos al sitio de
producción.

## Cambios aplicados en `dist/` sobre la copia recibida

| Bloque | Cambio |
|---|---|
| **P3** | H1 «Robots KEENON para hoteles: dedica más tiempo a tus huéspedes»; subtítulo del pliego; apoyo «Coordinamos el alcance y las integraciones necesarias» bajo el CTA |
| **P2** | `--cta:#B30F6E` y `--cta-hover:#8E0B57` para la acción principal; `--magenta` se conserva para degradados y acentos decorativos. `:focus-visible` en el CTA y en todos los campos |
| **P8** | Retiradas «siempre disponible», «sin esperas» y «secado instantáneo». «23.500 Pa · aspiración de agua y residuos tras el fregado». (La landing no publica capacidades de depósito, así que no hay ninguna cifra de litros que corregir aquí) |
| **P11** | Las dos presentaciones del S100 como «Transporte interno», con las anclas `#s100` y `#maletas` conservadas |
| **P5** | Selector «Prefiero llamada» / «Prefiero email»: solo el dato del canal elegido es obligatorio. Opción por defecto «Aún no sé qué solución necesito». `inputmode` en teléfono y email. Prevención de doble envío que no bloquea un reintento tras error de red |
| **Enlaces** | Los 12 enlaces internos que la descarga del HTML había reescrito a `index.html#…` vuelven a ser anclas (`#c40`, `#w3`, `#s100`, `#maletas`, `#contacto`, `#top`) y el de cookies a `#`. **Esto repara `cta_demo`**: `landing-events.js` solo lo emite cuando el `href` es exactamente `#contacto`, así que con la copia recibida ese evento no se emitía nunca |
| **Canales** | «O déjanos tus datos y te llamamos» → «O déjanos tus datos y te contactamos por el canal que prefieras», coherente con los dos canales |
| **Accesibilidad** | `min-height:44px` en `.btn` y en los botones del aviso de cookies (medían 43 px y 40 px). El botón «Aceptar» del aviso pasa de `--magenta` (4,37:1) a `--cta` (6,54:1) |

`consent.js`, `landing-events.js` y `plausible-init.js` quedan **byte a byte sin cambios** respecto a
`origen-2026-09-14/`. No se ha tocado el lote de medición del sitio principal.

## Comprobaciones hechas (Chromium + servidor local que emula el enrutado de Netlify)

Sintéticas y con **receptor simulado local**: los envíos se guardan en un archivo del entorno de pruebas y
nunca salen de él. No se ha generado ningún contacto, correo ni automatización reales.

| Comprobación | Resultado |
|---|---|
| 17 rutas: estado y tipo de contenido | Todas 200 con el tipo correcto (`text/html`, `text/plain`, `application/xml`, `image/png`, `image/jpeg`, `text/javascript`). `/icon-512.png` ya no se referencia |
| A · Primera visita | Aviso visible, analítica `denied`, **0** peticiones a `/stats` |
| B · Aceptar | `granted`, aviso cerrado, se solicita `/stats/js/script.js` |
| C · Rechazar | `denied`, aviso cerrado, **0** peticiones a `/stats` |
| D · Retirada desde el pie | `granted` → el aviso reabre → `denied` |
| E · Elección caducada | Se trata como `denied` y el aviso reaparece |
| F · `localStorage` bloqueado | La página sigue viva y la elección se aplica en esa página |
| Canal por defecto (llamada) | `tel.required=true`, `email.required=false`, marcas `*` coherentes, `aria-required` correcto |
| Canal email | Se invierte; al volver a llamada, se restaura |
| Envío canal=llamada y canal=email | Ambos llegan a `/gracias` con «Solicitud recibida» |
| `canal` en el envío | Viaja en el cuerpo junto a `form-name=leads-demo` y el señuelo vacío |
| Doble pulsación | **1** POST |
| Llamada sin teléfono / email sin email | No navega; el campo del canal elegido queda inválido; el otro no bloquea |
| **Sin JavaScript** | El formulario envía igual y llega a `/gracias` |
| Anclas `#top #c40 #w3 #s100 #maletas #contacto` | Las seis resuelven a un elemento existente |
| 360 / 390 / 768 / 1366 px, en `/` y `/gracias` | Sin desbordes horizontales |
| Campos sin etiqueta | Ninguno |
| Objetivos táctiles < 44 px | Ninguno (tras la corrección) |
| Recorrido de teclado, 22 paradas | Todas con indicador de foco visible |
| Contraste | CTA 6,54:1 · CTA hover 8,99:1 · blanco sobre navy 16,38:1 · texto de `/gracias` 12,23:1 |

## Dependencias que faltan (nombradas, sin rodeos)

**D1 · Configuración del proxy `/stats` del proyecto de la landing.** `plausible-init.js` pide
`/stats/js/script.js` y envía a `/stats/api/event`, y no lleva `data-domain`, así que **el destino real no se
puede deducir del paquete**. Hace falta el `_redirects` o el `netlify.toml` **del proyecto de la landing**.
El sitio principal usa otro identificador de script; copiarlo sin comprobarlo mediría en la propiedad
equivocada, así que no se ha copiado ni inventado. **Mientras D1 no se resuelva, no se debe desplegar por
Netlify Drop**: un despliegue de reemplazo borraría el `_redirects` actual y dejaría `/stats` sin proxy.

**D2 · `icon-512.png`.** Si se quiere conservar exactamente la imagen social de producción, hay que aportar
ese archivo; entonces se coloca en la raíz del paquete y se revierte `og:image` a
`https://landing.alpharobotica.com/icon-512.png`. Si no, queda `assets/og-landing.jpg`, que sí viaja en el ZIP.

**D3 · Identificación del proyecto de Netlify.** Nombre, `site_id`, dominios, despliegue activo y ajustes de
panel (Forms, notificaciones, cabeceras) **no constan en este repositorio ni en el paquete recibido**. Hace
falta acceso de lectura al panel o un token de API con permiso sobre ese sitio.

**D4 · Acceso de red.** La pasarela de salida de este entorno responde **403 a CONNECT** para
`landing.alpharobotica.com:443`, `alpharobotica.com:443` y `api.netlify.com:443`. No se ha eludido ninguna
restricción. Sin D3 y D4 no es posible desplegar ni comprobar ninguna URL pública desde aquí.

Ningún secreto, dato personal ni copia de seguridad se guarda en el directorio público ni en el repositorio.

## Procedimiento de despliegue

1. Resolver **D1**: obtener el `_redirects` (o `netlify.toml`) del proyecto de la landing y **colocarlo en la
   raíz del ZIP** antes de subirlo. Debe contener las dos reglas de proxy de `/stats` con el destino real.
2. Anotar el **despliegue activo actual** en el panel del proyecto (Deploys → el marcado *Published*): su
   `deploy id` y su fecha. Ése es el punto de reversión.
3. Subir `paquete/AlphaRobotica_Landing_Completa.zip` al proyecto que sirve `landing.alpharobotica.com`.
   El ZIP lleva `index.html` en la raíz, sin carpeta envolvente.
4. Un ZIP de Netlify Drop **no aplica por sí solo la configuración de `netlify.toml`** de otro proyecto ni los
   ajustes del panel: lo que no viaje en el ZIP no estará. Por eso el paso 1 no es opcional.
5. Comprobar en Netlify Forms que `leads-demo` sigue registrado tras el despliegue.

## Reversión

En el panel del proyecto, **Deploys → el despliegue anotado en el paso 2 → «Publish deploy»**. La reversión es
inmediata y no depende de este repositorio. El contenido de partida, además, está en `origen-2026-09-14/`.

## Qué queda por comprobar, ya sobre la URL pública

1. Que las 17 rutas responden 200 con su tipo de contenido correcto, y `/stats/js/script.js` con
   `text/javascript` (un 200 devolviendo HTML **no** cuenta).
2. Que `/gracias` responde 200 con `noindex` y **no** está bloqueada en `robots.txt`.
3. Que Netlify **registra** `leads-demo` y que una entrada real aparece en su panel.
4. El recorrido completo del formulario con cada canal, incluida la retirada del consentimiento.
5. Si el campo `canal` debe reflejarse en el CRM. **No se ha añadido ninguna conexión a HubSpot**: la del sitio
   principal no está acreditada como correspondiente a esta landing.
