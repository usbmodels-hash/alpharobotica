# Control de ejecución — Alpha Robótica (GSC, vídeos y conversión)

Encargo: `Prompt_Agente_Ejecucion_AlphaRobotica_GSC_Videos_CRO.md` + `Informe_AlphaRobotica_GSC_Videos_CRO.pdf` (13/09/2026).

**Base del informe:** `main` en `f94386b`. **Base real de ejecución:** `main` en `843acb1` (tres commits posteriores de carrusel de Inicio, conservados).

**Zona horaria de los registros:** Europa/Madrid (CEST, UTC+2).

## Aviso sobre el material de partida

El encargo indica adjuntar **`AlphaRobotica_Correcciones_Videos_CRO.zip`** (con `LEER_PRIMERO_Claude.md`, `aplicar.py`, el parche, los inventarios y las pruebas de regresión). **Ese ZIP se recibió el 14/09/2026**, después de ejecutar los lotes 1-3. En consecuencia, P1 y P9 **no** se han aplicado desde el paquete preparado, sino reimplementados sobre el código vigente siguiendo la especificación del informe, y verificados con pruebas propias. Al llegar el paquete se comprobó que su parche está generado sobre `f94386b` y **no se ha aplicado**, según indica su propio `LEER_PRIMERO_Claude.md`. Sí se ejecutó su prueba de regresión `tests/finder_regression.cjs` contra el código publicado: **8/8 correctas** (solo hubo que ampliar su stub de DOM, que no implementaba `setAttribute`; las aserciones no se tocaron).

## Estados usados

`pendiente` · `preparado` · `probado localmente` · `validado en vista previa` · `publicado` · `comprobado en producción` · `pendiente de Google` · `bloqueado` · `no aplicable`

Una misma tarea puede tener subpasos en estados distintos: el resumen final los desglosa así. «Publicado» significa fusionado en `main`; **no** implica comprobado en producción, que se registra aparte.

---

## Lote 1 — P1, P9, P2, P3

| ID | URL/archivo | Situación inicial | Cambio | Prueba | Estado | Evidencia | Fecha | Dependencia |
|---|---|---|---|---|---|---|---|---|
| P1 | `assets/js/hero-carousel.js` (afecta a `/` y `/en/`) | El handler `submit` del selector solo trasladaba `v` y `area`. El campo del formulario es `uc`, así que el objetivo se perdía: elegir hospital + transporte interno llevaba a `/configurador?v=hospital` | Se traslada también `uc`, validado con `/^(clean\|room\|fnb\|trans)$/`, el mismo patrón que ya aplica `configurador.js`. Se conservan `v`, `area` y la lógica previa | Regresión en navegador sobre **todas** las combinaciones reales de negocio×objetivo (11 verticales, sus objetivos disponibles), en ES y EN: URL resultante y casilla preseleccionada en el configurador | validado en vista previa | **52/52 correctas**. Antes del cambio, 0/52 conservaban `uc` | 14/09/2026 | — |
| P9 | `robot-limpieza-keenon-c40.html`, `en/…`, `robot-room-service-keenon-w3.html`, `en/…` | `<video hidden>` **sin ningún `<source>`**; las fuentes las creaba un script al pulsar un botón. Vídeo invisible en el HTML inicial | Reproductor visible desde el HTML inicial: `controls`, `playsinline`, `preload="none"`, poster, `width`/`height` reales, `<source>` MP4 **primero** (es el que lleva audio) y WebM como alternativa, y enlace de respaldo al MP4. Retirados el botón, los textos «Ver vídeo optimizado», «El vídeo se carga solo al hacer clic…» y «El vídeo se carga solo al pulsar», y los dos scripts CSP que creaban las fuentes | En navegador, las 4 páginas: elemento visible (537×301 px), `controls`, `playsinline`, `preload=none`, `autoplay=false`, poster, 2 `<source>`, enlace de respaldo, y **0 descargas de vídeo al cargar la página** | validado en vista previa | Sin autoplay y sin regresión de carga | 14/09/2026 | Reproducción con sonido real y respuesta a rangos de bytes: pendiente de comprobar sobre el dominio publicado |
| P2 | `styles.css` (afecta a todos los CTA principales) | `.btn.primary`, `.btn-primary`, `.nav-cta`, `.mobile-sticky-cta__primary`, `.roi-tabs button.active`, `.price-badge` y los CTA de panel usaban `--brand-accent-gradient` (rosa→violeta→cian) con texto blanco | Fondo sólido `--brand-cta:#B30F6E` para la acción principal. Añadidos `:hover` (`#8E0B57`) y `:focus-visible` con contorno visible. El degradado se conserva para lo decorativo (insignias, eyebrows, `background-clip:text`) | Contraste calculado por el navegador sobre los colores computados, antes y después | validado en vista previa | Antes: extremo cian **1,96:1**, rosa 3,57:1. Después: **6,54:1** en todos los CTA principales medidos (nav, hero, catálogo, sticky móvil). Hover `#8E0B57` = 8,99:1 | 14/09/2026 | — |
| P3 | `index.html`, `en/index.html`, fichas C40 y W3 ES/EN, `assets/js/contact-area-prefill.js` | CTA genéricos («Solicitar diagnóstico gratuito», «Ver mis robots») sin apoyo que explicara el paso siguiente; las fichas no preseleccionaban área | Textos del informe: Inicio + apoyo «Cuéntanos tu necesidad. Revisamos contigo la viabilidad.»; explorar → «Ver qué robot encaja»; C40 → «Valorar la limpieza de mi establecimiento» con `?area=limpieza`; W3 → «Valorar entregas entre plantas» con `?area=room-service` y aviso de compatibilidad del ascensor. Traducidos en EN | Clic real sobre cada CTA y lectura del `select[name="area"]` en el destino | validado en vista previa | C40→«Limpieza autónoma»/«Autonomous cleaning»; W3→«Room Service» en ES y EN | 14/09/2026 | — |
| P3b | `assets/js/contact-area-prefill.js` | **Fallo previo detectado al probar P3:** el mapa de áreas era solo en español, así que `?area=limpieza` y `?area=logistica` **nunca** preseleccionaban en las páginas EN (valores reales: «Autonomous cleaning», «Internal logistics»). Además el mensaje automático se escribía siempre en español | Mapa de valores por idioma y mensaje generado en el idioma de la página, detectando `document.documentElement.lang` | Clic real desde `/en/robot-limpieza-keenon-c40` | validado en vista previa | Antes: «Select an area» (sin preseleccionar). Después: «Autonomous cleaning» | 14/09/2026 | — |

### Comprobaciones transversales del lote 1

| Comprobación | Resultado |
|---|---|
| `node --check` en `hero-carousel.js`, `contact-area-prefill.js`, `configurador.js` | Correcto |
| Bloques JSON-LD de las 78 páginas ES/EN | 90 bloques, todos parsean |
| Formularios, `data-netlify`, `netlify-honeypot`, destinos e identificadores | Sin cambios (2+2+1+1 atributos intactos) |
| `sitemap.xml`, `_redirects`, `netlify.toml`, `_headers` | Sin cambios |
| `canonical` y `hreflang` | Sin cambios |
| Versiones de recursos (`/assets/*` es inmutable) | `styles.css`, `hero-carousel.js` y `contact-area-prefill.js` → `?v=41540-cro-lote1` en las 72/2/2 páginas que los referencian |
| Datos técnicos protegidos (C40 16/11 L, T9/T10/T11, S100, autonomía T10) | No se ha tocado ninguna cifra |
| Mejoras móviles v4.153.6 y posteriores | Conservadas (no se ha revertido ningún commit) |

---

## Lote 2 — P10, P8

| ID | URL/archivo | Situación inicial | Cambio | Prueba | Estado | Evidencia | Fecha | Dependencia |
|---|---|---|---|---|---|---|---|---|
| P10 | `assets/js/hero-carousel.js`, `index.html`, `en/index.html`, `styles.css` | El carrusel pausaba al recibir foco o ratón, pero **reanudaba al retirarlos**: no existía una pausa elegida por el usuario. Tampoco había control visible de pausa | Botón de pausa persistente con `aria-pressed` y etiqueta que cambia (Pausar/Reanudar · Pause/Play). `start()` respeta la elección del usuario, de modo que la pausa sobrevive al ratón, a los puntos y al swipe. Con `prefers-reduced-motion` el botón arranca en estado pausado. Objetivo táctil de 44 px y `:focus-visible` | En navegador, ES y EN: estado del botón, persistencia tras mover el ratón, tras usar los puntos, reanudación, `prefers-reduced-motion`, teclado y solapamiento con los puntos en 360/390/768/1366 px | validado en vista previa | Pausa persistente **sí** en los tres escenarios; táctil 110×44 (ES) y 99×44 (EN); reduced-motion sin avance automático; flechas ←/→ funcionan con el foco dentro del carrusel; foco visible de 3 px; sin solapamientos ni scroll horizontal | 14/09/2026 | — |
| P10b | `styles.css` | **Defecto detectado al probar:** `.hero-controls` lleva `pointer-events:none` (solo los puntos lo reactivan), así que el botón nuevo era visible pero **no pulsable** | `pointer-events:auto` en `.hero-pause` y separación entre puntos y botón | Clic real en ES y EN | validado en vista previa | Antes: clic con tiempo de espera agotado. Después: funciona | 14/09/2026 | — |
| P8 | `index.html`, `en/index.html` | Inicio no expresaba el beneficio inmediato bajo el H1; la lista comercial prometía «ROI orientativo desde el primer mes»; la jerga aparecía sin explicar | Beneficio bajo el H1 conservando el H1 SEO; introducción del informe **sumada** a la promesa útil anterior (diagnóstico gratuito, piloto medible, soporte local), en vez de sustituirla; «ROI orientativo desde el primer mes» → «Estima el ahorro operativo y el plazo de recuperación con tus datos»; OpExFlow y F&B explicados en su primera aparición | Render en 360/390/768/1366 px y validación de los 90 bloques JSON-LD | validado en vista previa | Sin pérdida de texto indexable | 14/09/2026 | — |

### Textos de la tabla P8 que **no** aplican a este repositorio

El informe cita frases que **no existen en el sitio principal**; están en la landing, que se despliega por separado y cuyo código no está aquí. Comprobado con búsqueda en las 78 páginas ES/EN:

| Texto del informe | Resultado de la búsqueda |
|---|---|
| «23.500 Pa → secado instantáneo» | 0 apariciones (ni «23.500», ni «23500», ni «instantáne») |
| «cumple todas las frecuencias, todos los días» (C40) | 0 apariciones |
| «La experiencia que se comenta» (W3) | 0 apariciones |
| «siempre disponible» (S100) | 0 apariciones. Los cinco usos de «siempre» en el repositorio están condicionados («siempre que el diagnóstico valide…», «siempre orientativos») y no son absolutos |
| «sin esperas» (maletas) | 0 apariciones como promesa; el único uso cita tiempos medidos con su rango |
| «Mejor servicio, con el mismo equipo» | 0 apariciones |
| H1 y subtítulo de la landing | Fuera de este repositorio |

Estas reescrituras quedan **preparadas y pendientes de acceso a la landing** (ver P5/P11).

---

## Lote 3 — P6 (parte ejecutable en el repositorio)

### Auditoría técnica de las páginas prioritarias

Comprobado sobre las 16 páginas prioritarias del informe (8 ES + 8 EN): `robots`, `canonical`, `hreflang`, presencia en sitemap y enlaces internos entrantes.

**Resultado: ninguna tiene un defecto técnico de indexabilidad.** Todas devuelven `index, follow`, canonical autorreferente correcta, `hreflang` es/en/x-default recíproco y están en el sitemap. Por tanto, «Descubierta, sin indexar» y «Desconocida para Google» **no** se explican por un bloqueo técnico en el repositorio, sino por descubrimiento, autoridad y diferenciación de contenido — coincide con lo que anticipaba el informe.

### Causa de descubrimiento localizada y corregida

| ID | URL/archivo | Situación inicial | Cambio | Prueba | Estado | Evidencia | Fecha | Dependencia |
|---|---|---|---|---|---|---|---|---|
| P6a | Footer de las 29 páginas EN que lo incluyen | El footer EN **omitía tres enlaces** que sí tiene el ES: Restauración / negocios locales, Enterprise / integración 360º y Modelos de adquisición. Las tres figuran en el anexo de URL sin indexar | Añadidos al footer EN, con los mismos destinos y su traducción | Recuento de enlaces entrantes antes/después, HTTP de los tres destinos y render en 390/1366 px | validado en vista previa | `/en/robots-para-restaurantes-negocios-locales` pasa de **4 a 30** enlaces entrantes (su gemela ES tenía 25); las otras dos de 36 a 38. Footer ES y EN quedan en 17 enlaces internos cada uno. Los tres destinos responden 200 | 14/09/2026 | pendiente de Google: el rastreo posterior no depende de nosotros |

### Hallazgo documentado, sin actuar

21 páginas **no incluyen el footer del sitio**: `blog.html`, los seis artículos, las dos comparativas, `404` y `gracias`, en ES y EN por igual. Eso explica que los blogs y las comparativas tengan entre 6 y 11 enlaces entrantes frente a una mediana del sitio de 37, y encaja con que las dos comparativas aparezcan como «Desconocida para Google».

**No se ha modificado**: es simétrico en ambos idiomas, luego parece una decisión de diseño previa y no un fallo de la versión EN. Añadir el footer a esas 21 páginas mejoraría el enlazado interno de forma notable, pero es un cambio visible de maquetación que conviene que apruebe la propiedad. **Recomendación pendiente de decisión.**

### Lo que no puede ejecutarse sin Search Console

Sin conector de Search Console en esta sesión no se puede: inspeccionar URL en vivo, exportar la lista actual con motivo y última lectura, enviar sitemaps, solicitar indexación ni obtener el informe de indexación de vídeos con sus URL y motivos. La matriz `URL | motivo GSC | vídeo principal o complementario | causa | corrección | validación | estado` **no puede completarse** con datos reales: la columna «motivo GSC» requiere ese informe. Queda como dependencia con acción exacta: exportar «Indexación de vídeos» desde la propiedad `sc-domain:alpharobotica.com`.

---

## Lote 4 — P4 · Reorganización de Inicio

| ID | URL/archivo | Situación inicial | Cambio | Prueba | Estado | Evidencia | Fecha | Dependencia |
|---|---|---|---|---|---|---|---|---|
| P4 | `index.html`, `en/index.html` | El bloque CAPEX/OpExFlow ocupaba la 3.ª posición, antes de las cuatro aplicaciones. El formulario de contacto quedaba al 86 % del alto | Orden nuevo dentro de `<main>`: hero → franja de impacto → cuatro aplicaciones → método → casos → escenarios ilustrativos → contacto → modalidades comerciales → packs → tecnología/ROI → KEENON+Alpha → sobre Alpha → FAQ. El blog sigue fuera de `<main>` | Secciones movidas completas; el script aborta si el resultado no es el mismo conjunto de caracteres reordenado. Render a 390 y 1366 px en ES y EN | publicado (PR #13, `ed13405`) | 1366 px: aplicaciones y=2786→**1324**; financiación y=1324→6892; contacto y=12991→**6293** (86 %→42 %). 390 px: contacto y=14724→8145. Sin ids duplicados; los 2 formularios Netlify y sus honeypots intactos; 3 anclas externas ES y 6 EN, ninguna rota; 1 h1 y 12 h2; JSON-LD válido; sin scroll horizontal; el salto a `#diagnostico-gratuito` no queda tapado | 14/09/2026 | comprobación en producción pendiente del despliegue |

---

## Lote 5 — P6 · Navegación y descubrimiento

### Correcciones a mi diagnóstico anterior

El encargo de continuación corrige tres afirmaciones mías de los lotes 1-3, y son correctas:

1. **No encontrar fallos de canonical, robots o hreflang descarta esas causas concretas, no todas las causas técnicas** ni la causa exacta de la exclusión de Google. La redacción anterior daba a entender más de lo comprobado.
2. **Que una página carezca de footer no explica sus pocos enlaces entrantes.** Un footer genera enlaces *salientes*. Para reforzar una página hay que enlazarla *desde* otras. Mi conclusión anterior confundía ambas direcciones.
3. **El número de enlaces no identifica por sí solo una causa de indexación.** Las mejoras de descubrimiento se registran como acciones justificadas, y la respuesta de Google queda como observación pendiente.

También corrijo un dato propio: al medir enlaces entrantes usaba un patrón que solo reconocía comillas dobles, y la navegación ES usa simples. Eso infravaloraba las páginas ES. La medición de este lote distingue además **enlaces totales** de **contextuales** (fuera de cabecera, nav y footer).

Y corrijo el estado de las comparativas: según GSC Wizard el 14/09, **KLEENBOT ES está indexada (PASS)** y la EN «Descubierta, sin indexar»; DINERBOT está «Desconocida para Google» en ambos idiomas. Mi frase anterior sobre «ambas comparativas» era inexacta.

### Medición corregida (antes de este lote)

| Ruta | Totales ES | Contextuales ES | Totales EN | Contextuales EN |
|---|---|---|---|---|
| `/comparativa-dinerbot-t9-t10-t11` | 9 | 7 | 9 | 7 |
| `/comparativa-kleenbot-c30-c40-c55` | 9 | 7 | 9 | 7 |
| `/empresa` | 29 | **1** | 30 | **1** |
| `/lidar` | 5 | 3 | 5 | 3 |
| `/robot-limpieza-keenon-c55` | 37 | 7 | 37 | 7 |

Las comparativas ya estaban bien enlazadas **contextualmente** (desde sus cuatro/tres fichas y el catálogo); lo que les faltaba era presencia en navegación. `/empresa` vive del footer: un solo enlace contextual.

### Acciones

| ID | URL/archivo | Cambio | Prueba | Estado | Evidencia | Fecha | Dependencia |
|---|---|---|---|---|---|---|---|
| P6b | 72 páginas con desplegable | Las dos comparativas entran en la columna «Herramientas / Tools», junto a ROI y configurador: son herramientas de decisión, no relleno de palabras clave | Recuento de entrantes y render | publicado | Las cuatro comparativas pasan de **9 a 37** enlaces entrantes, la mediana del sitio | 14/09/2026 | pendiente de Google |
| P6c | 19 páginas (blog, 6 artículos y 2 comparativas en ES y EN, y `gracias` ES) | Footer del sitio añadido, con el selector de idioma apuntando a la propia página. Mejora la salida del visitante y reparte enlaces hacia las páginas comerciales | Render a 390 y 1366 px, ids sin duplicar, JSON-LD válido | publicado | 15-17 enlaces internos por página; sin desbordes | 14/09/2026 | — |
| P6d | `blog.html` | Era la **única** página del sitio sin ningún selector de idioma, ni en cabecera ni en footer, pese a tener `hreflang` recíproco | Selector añadido en su footer | Render | publicado | ES↔EN navegable desde el blog | 14/09/2026 | — |

**Recuento corregido de páginas sin footer:** eran **21**, no las que citaba antes sin desglosar: `404` y `gracias` ES, `404` EN, más blog, 6 artículos y 2 comparativas en cada idioma. `en/gracias.html` **sí** tenía footer, de ahí la asimetría. Tras este lote quedan **solo `404.html` y `en/404.html`**, a propósito: ni se les añade footer de destino SEO ni entran en el sitemap. `gracias` conserva su `noindex` y su función.

---

## Lote 6 — P7 · Medición y cadena de formularios

### Cadena real, revisada sin enviar nada

`form[name="contacto-alpha"]` hace **dos envíos en paralelo**: el nativo de Netlify (`action="/gracias"`) y un POST a la **HubSpot Forms Submissions API**, portal `148817158`, formulario `ed283c38-…`, sin cookies de HubSpot.

| Campo del formulario | Propiedad de HubSpot | Comprobado |
|---|---|---|
| `nombre` | `firstname` | sí |
| `email` | `email` | sí |
| `telefono` | `phone` | sí |
| `empresa` | `company` | sí |
| `mensaje` | `message` | sí |
| `area` | `area_de_interes` | sí, con traducción EN→ES |

La propiedad `area_de_interes` admite exactamente cinco valores (`Limpieza autónoma`, `Food & Beverage`, `Room Service`, `Logística interna`, `No lo tengo claro todavía`) y **las cinco opciones del formulario EN traducen a valores válidos**. El mapeo es correcto.

### Recepción acreditada con registros existentes

Sin enviar ningún formulario, en el CRM hay **dos contactos con origen `FORM`**:

| Fecha | Área registrada | Estado | Fuente |
|---|---|---|---|
| 02/07/2026 | Room Service | lead | Tráfico directo |
| 11/09/2026 | Limpieza autónoma | lead | Tráfico directo |

Los otros 93 contactos del portal tienen origen `INTEGRATION` (importación del 04/09/2026), no del formulario web.

**Esto acredita la cadena web → HubSpot**, incluida la propiedad personalizada. Lo que **sigue sin acreditarse** es la recepción en **Netlify Forms** (ruta independiente, sin acceso al panel) y el formulario `leads-demo` de la landing.

### Instrumentación añadida

| ID | Archivo | Cambio | Prueba | Estado | Evidencia | Fecha | Dependencia |
|---|---|---|---|---|---|---|---|
| P7a | `assets/js/alpha-events.js` | `hubspot-form.js` ya emitía `alphaHubSpotSubmission` con su estado operativo, pero **nadie lo escuchaba**. Ahora se registran `diag_form_accepted` (respuesta HTTP aceptada) y `diag_form_error` (`http-error`, `network-error`, `client-error`), separando el intento de la aceptación. `pending` se ignora para no contar dos veces | Emisión de los cuatro estados con y sin consentimiento | publicado | Sin consentimiento: **0 eventos**. Con consentimiento: `accepted` con `http=200`; dos `error` con su motivo; `pending` ignorado. **Ningún dato personal en las propiedades** | 14/09/2026 | — |
| P7b | `assets/js/alpha-events.js` | Atribución de fuente: `utm_source/medium/campaign` de la primera página de la sesión, guardados en `sessionStorage`; si no hay UTM, el dominio de referencia. Se añaden a todos los eventos | Carga con UTM y lectura de las propiedades emitidas | publicado | `utm_source=prueba, utm_medium=cpc, utm_campaign=c40` presentes en los eventos, sin nombre, email, teléfono ni mensaje | 14/09/2026 | — |

Eventos ya existentes que se conservan: `cta_diagnostico`, `cta_tel`, `cta_whatsapp`, `cta_demo_landing`, `diag_form_start`, `diag_form_submit`, `form_thanks_view`, `config_start`, `config_gate_submit`, `hero_madlib_select/submit`, `lead_magnet_submit`. **`form_thanks_view` no equivale a recepción en CRM** y así está documentado en el propio archivo.

**Lead cualificado** no se instrumenta en el navegador a propósito: es un estado del CRM (`lifecyclestage`), no un evento de página. Contarlo desde el navegador lo duplicaría.

### Prueba de extremo a extremo: preparada, pendiente de una autorización

- **Identificador único:** `PRUEBA-E2E-<fecha>-<4 dígitos>` en el campo `empresa`, para localizarlo sin ambigüedad y poder borrarlo después.
- **Datos:** nombre `Prueba E2E`, email de buzón controlado por la propiedad, teléfono no asignado, área `No lo tengo claro todavía`.
- **Criterios de aceptación:** (1) `diag_form_accepted` con HTTP 200; (2) contacto nuevo en HubSpot con origen `FORM`, el identificador en `empresa` y `area_de_interes` correcta; (3) entrada correspondiente en Netlify Forms; (4) la página de gracias no se toma como prueba.
- **Efectos:** el envío dispara los flujos comerciales que tenga configurados el portal y la notificación de Netlify.
- **Lo que hace falta:** una confirmación concreta del envío y del buzón de destino. **No se ha enviado nada.**

---

## Lote 6b (PR #15, `11e2b47`) — P13 · Vídeos: hechos verificados y límite real

| Comprobación | Resultado |
|---|---|
| Integridad de los MP4 | **Confirmada por decodificación completa** en la revisión externa del 14/09. Lo que yo comprobé aquí fueron solo las cabeceras del contenedor (`ftyp`, `moov`, `mdat`, marca `avc1`): **la presencia de cabeceras no era, por sí sola, prueba de integridad completa**, y así queda corregido |
| Duración real | **C40 77,824 s · W3 39,250 s**, H.264/AAC. Dato de la **revisión externa del 14/09**, que descargó los dos MP4 publicados y decodificó vídeo y audio completos sin errores. **No es una prueba realizada en esta sesión.** Los 77,28 s que registré antes eran la duración del **WebM** del C40, no del MP4 |
| Pista de audio en los WebM | **Ninguna**: solo `Stream #0:0 Video`. Confirma el informe y justifica que el MP4 vaya primero |
| Reproducción efectiva | Verificada en las dos fichas: el vídeo arranca, `currentTime` avanza y la duración es la real |
| Reproducción del MP4 y su audio | **No verificable en esta sesión**: el Chromium disponible devuelve `canPlayType('video/mp4; codecs="avc1…"') === ""`, es decir, no soporta H.264, y cae al WebM. Un Chrome, Safari o Edge reales sí lo reproducen |

**Transcripción: no ejecutable aquí.** No hay motor de reconocimiento de voz instalado ni forma de instalarlo en esta sesión. Es una tarea de contenido que me corresponde, no un dato que deba aportar la propiedad: la limitación es de capacidad, no de alcance.

Matiz que corrijo: **la transcripción no es un requisito universal de indexación de Google**. Es un requisito de **calidad** de las páginas de visionado que pide el encargo, para que el vídeo sea contenido principal con contexto propio. Sin ella, una página de visionado sería una ficha repetida.

**`uploadDate`**: sigue sin evidencia documentada de la fecha de primera publicación. No se inventará ni se sustituirá por la fecha de un commit de migración.

---

## Lote 7 (PR #16, `cc6ea6d`) — Paso 1 · Medición corregida

Los tres fallos se reprodujeron sobre el código vigente, blob `355e0c8b…`, el mismo que citaba el encargo.

| ID | Situación inicial | Cambio | Prueba | Estado | Fecha |
|---|---|---|---|---|---|
| M1 | `hero_madlib_submit` se ataba **por el texto** del botón («Ver mis robots»). Desde el lote 1 el botón ES dice «Ver qué robot encaja», así que el controlador no se asociaba a nada | Se mide el `submit` del formulario `#finder`, en fase de captura para emitir antes de que `hero-carousel.js` navegue. Retirada la vinculación por clic, sin duplicado. El `submit` solo se dispara si la validación pasa | ES y EN, clic y teclado | **probado localmente** | 14/09/2026 |
| M2 | `alphaAttribution` se guardaba **dentro de `track()`**: si el visitante entraba con UTM y navegaba antes de generar un evento, la fuente se perdía | Captura al cargar con consentimiento vigente, y en el momento de aceptar si acepta en la página de entrada. Sin consentimiento no se escribe; al rechazar, retirar o caducar se borra. La navegación interna no sustituye una fuente válida y un subdominio propio no cuenta como adquisición externa | 6 escenarios de consentimiento y navegación | **probado localmente** | 14/09/2026 |
| M3 | Solo se recortaba a 60 caracteres: `utm_campaign=qa@example.invalid` llegaba a las propiedades | Política de valores: `utm_medium` contra lista de canales, `utm_source`/`utm_campaign` contra patrón de código de campaña. Se valida al guardar **y al leer**. Las UTM no admitidas se retiran también de la URL, para que no viajen en la que el proveedor envía con cada evento | 4 UTM no admitidas, 1 campaña válida, 4 estados de almacenamiento | **probado localmente** | 14/09/2026 |

**Resultado de la tabla de aceptación (receptor simulado, datos sintéticos, sin tocar la analítica de producción):** los ocho casos se cumplen. Botón ES/EN ×1 por envío; fuente conservada tras navegar; captura al aceptar en la entrada; rechazo y retirada sin eventos ni almacenamiento; navegación interna que no sustituye; UTM con email sintético, texto personal, canal inventado y URL: ninguna viaja, se guarda ni queda en la URL; campaña válida intacta; almacenamiento inválido, con claves ajenas o bloqueado: descartado con página funcional.

**Limitación documentada de `diag_form_accepted`:** el envío nativo navega a `/gracias`. El `fetch` a HubSpot lleva `keepalive`, así que la petición sale, pero el `.then()` que emite `alphaHubSpotSubmission` **no se ejecuta tras la descarga de la página**. El evento solo se observa si la página permanece abierta. Una respuesta simulada en una página abierta **no acredita el ciclo real**; la aceptación se acredita en el CRM. No se retrasa el envío comercial para medirlo.

---

## Lote 8 (PR #17, `a5c1d30`) — Paso 3 · Landing

Recibida la fuente del último despliegue (13 archivos) el 14/09/2026.

| Carpeta | Contenido |
|---|---|
| `docs/landing/origen-2026-09-14/` | Copia recuperable del despliegue de partida, intacta |
| `docs/landing/dist/` | La landing con el pliego aplicado, 14 archivos, lista para desplegar |

| Bloque | Estado | Evidencia |
|---|---|---|
| P3 · H1, subtítulo y apoyo del CTA | **preparado, sin desplegar** | H1 y subtítulo del pliego; el CTA ya decía «Solicitar demo para mi hotel» |
| P2 · Contraste | **preparado, sin desplegar** | CTA del hero y botón del formulario: **4,37:1 → 6,54:1**. `:focus-visible` en CTA y campos |
| P8 · Textos | **preparado, sin desplegar** | 0 apariciones de las seis frases retiradas; las seis nuevas presentes. La cifra de 23.500 Pa se conserva descrita como aspiración, sin garantía de secado |
| P11 · S100 | **preparado, sin desplegar** | Dos aplicaciones bajo «Transporte interno»; anclas `#s100` y `#maletas` conservadas |
| P5 · Canal preferido | **preparado, sin desplegar** | Llamada: `tel.required=true`; email: se invierte; vuelta: se restaura. Envío solo con email y teléfono vacío: **valida** |
| Integridad | comprobada | `consent.js` y `landing-events.js` byte a byte sin cambios; `leads-demo`, `form-name`, honeypot y privacidad conservados; sin desbordes a 360/390/768/1366 px |

**Dos defectos de cableado encontrados en la fuente**, corregidos en `dist/`:

1. El formulario **no llevaba `data-netlify`**, solo el campo oculto `form-name`. Netlify detecta formularios por ese atributo; sin él, un despliegue nuevo puede no registrarlo. **No verificado contra el panel de Netlify.**
2. `action` apuntaba a `/gracias`, **que no existía** en el despliegue recibido. Añadida `gracias.html` con `noindex`, que distingue «solicitud recibida» de «demostración reservada».

**Dependencia:** no hay acceso al proyecto de Netlify de la landing y su dominio sigue bloqueado por el proxy de salida de esta sesión, así que **no se ha desplegado ni comprobado la URL pública**. Procedimiento y comprobaciones posteriores en `docs/landing/README.md`.

---

## Lote 9 — Paso 4.2 · Recepción por formulario: evidencia identificada

Identificadores **recomprobados sobre la versión actual**: formulario `contacto-alpha`, elemento `#diagnostico-gratuito`, portal `148817158`, GUID `ed283c38-…`, `assets/js/csp/hubspot-form.js`, envío paralelo a HubSpot Forms API y formulario nativo de Netlify. Todos coinciden.

### Recepción histórica acreditada, y con qué alcance

Los dos contactos con origen `FORM` **sí se atribuyen al formulario de la web**, no solo a «algún formulario»:

| Fecha (UTC) | URL de origen registrada | Área registrada | Campos recibidos |
|---|---|---|---|
| 02/07/2026 22:41 | `https://alpharobotica.com/#diagnostico-gratuito` | Room Service | nombre, empresa, mensaje, área |
| 11/09/2026 15:30 | `https://alpharobotica.com/en/#diagnostico-gratuito` | Limpieza autónoma | nombre, empresa, mensaje, área |

El segundo caso **acredita además que el mapeo EN→ES funciona en producción**: la página EN ofrece «Autonomous cleaning» y en el CRM quedó registrado el valor español `Limpieza autónoma`, que es el que admite la propiedad.

En el portal existe **un único formulario**, creado el 02/07/2026 11:11 UTC, cuya última modificación es el **11/09/2026 15:30:52 UTC**, catorce segundos después del segundo contacto. El conector no expone las propiedades del objeto formulario, así que **no he podido leer su GUID** para compararlo con el del código: la correspondencia se apoya en la URL de origen y en las marcas de tiempo, no en el identificador.

**Alcance de esta evidencia:** acredita la recepción **histórica** del formulario web en HubSpot. **No valida el despliegue actual**, que es posterior a ambos registros. No se han enviado formularios.

### Lo que sigue sin acreditarse, por separado

| Ruta | Estado | Qué falta |
|---|---|---|
| Aceptación de HubSpot y alta/actualización en CRM | **acreditada en histórico** | Repetir sobre el despliegue actual |
| Recepción de **Netlify Forms** del sitio web | **sin acreditar** | Es una ruta independiente de HubSpot. Requiere el panel de Netlify del sitio principal |
| Recepción de **`leads-demo`** y su destino | **sin acreditar** | Requiere desplegar la landing corregida y el panel de su proyecto |
| Otros formularios (`configurador-lead`) | **sin acreditar** | Usa una ruta distinta; no hereda la validación de `contacto-alpha` |

### Plan mínimo de prueba real, preparado

- **Formulario:** `contacto-alpha` en `https://alpharobotica.com/#diagnostico-gratuito`.
- **Identificador único:** `PRUEBA-E2E-20260914-<4 dígitos>` en el campo `empresa`.
- **Campos:** nombre `Prueba E2E`; email **un buzón controlado por la propiedad**, que debe indicarnos; **teléfono se omite**, que es opcional (no se inventará un número «no asignado» ni se usará uno de terceros); área `No lo tengo claro todavía`.
- **Criterios:** (1) `diag_form_accepted` con HTTP 200 si la página permanece abierta; (2) contacto en HubSpot con el identificador en `empresa`, `hs_analytics_first_url` apuntando al ancla y `area_de_interes` correcta — vale que **actualice** un contacto existente por email, no hace falta que cree uno nuevo; (3) entrada correspondiente en Netlify Forms; (4) la página de gracias no cuenta como prueba.
- **Efectos:** dispara los flujos comerciales del portal y la notificación de Netlify.
- **Falta:** una confirmación concreta del envío y el buzón de destino. Cada prueba se enviará **una sola vez**, y antes de repetir tras un error se consultarán los receptores para evitar duplicados. El registro de prueba se documentará y se acordará su limpieza.

---

## Resumen por tarea P1–P14

Este resumen sustituye al anterior y coincide con el detalle de los lotes.

| ID | Subpaso | Estado | PR / evidencia | Dependencia concreta |
|---|---|---|---|---|
| **P1** | Objetivo del configurador ES/EN | **publicado** | PR #10 `8b4b86d`; 52/52 combinaciones reales; la prueba del propio paquete da 8/8 | Pruebas de interacción en producción |
| **P2** | Sitio principal | **publicado** | PR #10; 1,96:1 → 6,54:1 | — |
| **P2** | Landing | **preparado, sin desplegar** | PR #17; 4,37:1 → 6,54:1 en `dist/` | Acceso al proyecto de Netlify de la landing |
| **P3** | Sitio principal | **publicado** | PR #10; área preseleccionada comprobada en ES y EN | — |
| **P3** | Landing | **preparado, sin desplegar** | PR #17 | Igual que P2 landing |
| **P4** | Reorganización de Inicio | **publicado** | PR #13 `ed13405`; contacto del 86 % al 42 % del alto; 0 anclas rotas | Comprobación pública hecha sobre estructura y recursos; **faltan pruebas de interacción** de cada flujo en producción |
| **P5** | Canal preferido | **preparado, sin desplegar** | PR #17; alternancia de obligatoriedad comprobada | Igual que P2 landing, más confirmar si el campo `canal` debe reflejarse en el CRM |
| **P6** | Enlazado y navegación | **publicado** | PR #12 `72a08a6` y PR #14 `84313b6`; comparativas 9 → 37 entrantes; footer en 19 páginas | **Pendiente de Google**: el recuento de enlaces es una mejora de descubrimiento justificada, **no** una prueba de la causa de exclusión |
| **P6** | Informes de GSC | **bloqueado** | — | **No hay conector de Search Console** en esta sesión. Hace falta el exportado nativo |
| **P7** | Configuración revisada | **comprobado** | Lote 6; mapeo de los 6 campos y los 5 valores de `area_de_interes` | — |
| **P7** | Instrumentación | **publicado** | PR #15 `11e2b47` y PR #16 | — |
| **P7** | Atribución de fuente | **publicado** | PR #16; política de valores y captura con consentimiento | — |
| **P7** | Aceptación HTTP | **publicado con limitación** | PR #15; `diag_form_accepted` no se observa cuando la página navega a `/gracias` | Se acredita en el CRM, no en el navegador |
| **P7** | Recepción en HubSpot | **acreditada en histórico** | Lote 9; dos contactos con URL de origen `#diagnostico-gratuito` | No valida el despliegue actual |
| **P7** | Recepción en Netlify | **sin acreditar** | — | Panel de Netlify del sitio principal |
| **P7** | Landing `leads-demo` | **sin acreditar** | — | Desplegar `dist/` y su panel |
| **P8** | Sitio principal | **publicado** | PR #11 `2026551` | — |
| **P8** | Landing | **preparado, sin desplegar** | PR #17; las seis frases sustituidas | Igual que P2 landing |
| **P9** | Reproductores C40/W3 | **publicado** | PR #10; visibles, sin autoplay, 0 descargas al cargar | Reproducción del MP4 con audio: no verificable aquí (este Chromium no soporta H.264); confirmada por la revisión externa del 14/09 |
| **P10** | Pausa persistente y accesibilidad | **publicado** | PR #11; persistente en los tres escenarios, 44 px, `prefers-reduced-motion` | — |
| **P10** | Jerarquía visual de la landing | **preparado, sin desplegar** | PR #17 | Igual que P2 landing |
| **P11** | Agrupar S100 | **preparado, sin desplegar** | PR #17; anclas conservadas | Igual que P2 landing |
| **P11** | Variante C40 de campaña | **no procede por ahora** | — | Requiere una campaña identificada y destino justificado |
| **P12** | Casos reales | **bloqueado** | — | Documentación y permiso de uso. No se inventarán casos |
| **P13** | Hechos verificados del vídeo | **comprobado** | Lote 7, corregido con la medición externa del 14/09 | — |
| **P13** | Páginas de visionado | **pendiente de capacidad y dato** | — | Transcripción (sin motor de voz en esta sesión) y **fecha real de primera publicación documentada** para `VideoObject`. Una página útil podría publicarse sin el marcado, pero no sin transcripción revisada |
| **P14** | Microcopy y etiquetas | **parcialmente publicado** | PR #10 y #11: apoyo de CTA, etiquetas del botón de pausa, jerga explicada | Sin fricciones adicionales observadas; se revisará tras las pruebas de interacción en producción |

---

## Línea base de medición (no atribuible a estos cambios)

| Métrica | 14/08–10/09/2026 | 17/07–13/08/2026 |
|---|---|---|
| Clics | 42 | 28 |
| Impresiones | 2.340 | 1.374 |
| CTR | 1,79 % | 2,04 % |
| Posición media | 23,86 | 34,34 |

Fuente: informe del 13/09/2026. **Estas cifras son anteriores a los cambios publicados y no prueban su efecto.** La comparación posterior debe hacerse sobre periodos completos equivalentes, por página y dispositivo.
