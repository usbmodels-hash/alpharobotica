# Control de ejecución — Alpha Robótica (GSC, vídeos y conversión)

Encargo: `Prompt_Agente_Ejecucion_AlphaRobotica_GSC_Videos_CRO.md` + `Informe_AlphaRobotica_GSC_Videos_CRO.pdf` (13/09/2026).

**Base del informe:** `main` en `f94386b`. **Base real de ejecución:** `main` en `843acb1` (tres commits posteriores de carrusel de Inicio, conservados).

**Zona horaria de los registros:** Europa/Madrid (CEST, UTC+2).

## Aviso sobre el material de partida

El encargo indica adjuntar **`AlphaRobotica_Correcciones_Videos_CRO.zip`** (con `LEER_PRIMERO_Claude.md`, `aplicar.py`, el parche, los inventarios y las pruebas de regresión). **Ese ZIP no se ha recibido**: solo llegaron el prompt (.md) y el informe (.pdf). En consecuencia, P1 y P9 **no** se han aplicado desde el paquete preparado, sino reimplementados sobre el código vigente siguiendo la especificación del informe, y verificados con pruebas propias. Los inventarios de 69 URL y de vídeos que el informe dice incluir en el ZIP tampoco están disponibles; se ha trabajado con la lista del anexo del PDF.

## Estados usados

`pendiente` · `preparado` · `validado en vista previa` · `publicado` · `comprobado en producción` · `pendiente de Google` · `bloqueado` · `no aplicable`

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

## Lotes pendientes y bloqueos

| ID | Alcance | Estado | Motivo / dependencia exacta |
|---|---|---|---|
| P4 | Reordenar Inicio: necesidad → 4 aplicaciones → validación → evidencia → contacto breve → modalidades comerciales → detalle | pendiente | Ejecutable en este repositorio. Lote 2 |
| P5 | Canal preferido (email o llamada) en el formulario de la landing | bloqueado | La landing se despliega por separado (Netlify Drop) y **su código no está en este repositorio**. Hace falta el origen de `landing.alpharobotica.com` o acceso a ese proyecto de Netlify |
| P6 | Causas de las 31 URL sin indexar; envío de sitemaps; solicitud de indexación; informe de indexación de vídeos | parcialmente bloqueado | **No dispongo de conector de Search Console** en esta sesión: no puedo inspeccionar URL, enviar sitemaps, solicitar indexación ni exportar el informe de vídeos. Sí es ejecutable la parte on-page (contenido propio, enlaces internos, canonical/hreflang) sobre las páginas prioritarias del anexo |
| P7 | Acreditar recepción real en Netlify/HubSpot y atribución de fuente | bloqueado | Requiere un envío real que dispara correos y flujos comerciales. El encargo exige pedir **una autorización concreta** antes. Preparado: identificador único, datos de prueba y criterios de aceptación. Hay conector de HubSpot disponible para revisión de configuración sin enviar nada |
| P8 | Reescrituras de texto (tabla del informe) | **publicado en la parte que aplica** | Lote 2. Las frases restantes están en la landing, fuera de este repositorio |
| P10 | Pausa persistente accesible del carrusel, teclado, foco, `prefers-reduced-motion` | **publicado** | Lote 2. La parte de «imagen aprobada de robot en uso» ya se resolvió en los lotes de carrusel previos |
| P11 | Agrupar las dos presentaciones del S100 en «Transporte interno»; variante C40 de la landing | bloqueado | Landing fuera de este repositorio (ver P5) |
| P12 | Casos reales con documentación y permiso | bloqueado | Requiere documentación e instalación acreditada del propietario. No se inventarán casos |
| P13 | Páginas de visionado C40 y W3 con transcripción y `VideoObject` | pendiente de datos | Requiere transcripción derivada del vídeo real y **fecha real de primera publicación documentada**. Sin esos datos no se publicará `VideoObject` |
| P14 | Microcopy y mensajes de ayuda | pendiente | Después de las fricciones principales |

---

## Línea base de medición (no atribuible a estos cambios)

| Métrica | 14/08–10/09/2026 | 17/07–13/08/2026 |
|---|---|---|
| Clics | 42 | 28 |
| Impresiones | 2.340 | 1.374 |
| CTR | 1,79 % | 2,04 % |
| Posición media | 23,86 | 34,34 |

Fuente: informe del 13/09/2026. **Estas cifras son anteriores a los cambios publicados y no prueban su efecto.** La comparación posterior debe hacerse sobre periodos completos equivalentes, por página y dispositivo.
