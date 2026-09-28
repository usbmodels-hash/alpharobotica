# Landing `landing.alpharobotica.com` — fuente, paquete y despliegue

**Actualizado el 27/09/2026 (Europe/Madrid).**

La landing **no se despliega desde este repositorio**: va por su propio proyecto de Netlify
(`alpharobotica-landing`, site ID `ce07e6ab-8176-47dc-9d42-3de7f68e0034`). Aquí se guarda su fuente para tener
historial, un paquete listo y una reversión concreta.

## Estado

| Plano | Estado |
|---|---|
| Fuentes en GitHub | Sincronizadas con el despliegue **`6aa7dd28a96ea01c454e27ff`** (versión «vídeo y valoración»), y encima la adaptación **«hoteles y centros sanitarios · toda España»** |
| Validado en local | **Sí** — Chromium y un servidor que emula el enrutado de Netlify |
| **Desplegado en Netlify** | **Sí.** Despliegue `6ab99baf5b1b2dba307fd3c7`, publicado el **28/09/2026 a las 00:41 CEST** desde `main@958b6f5`; primer deploy del proyecto **enlazado a GitHub** |
| **Comprobado en producción** | **Sí, por el propietario**: título sin «Andalucía», `/stats/js/script.js` 200 `application/javascript`, `/gracias` 200 `noindex,follow`, `leads-demo` activo |
| Recepción del contacto | Acreditada por confirmación del propietario para el formulario `leads-demo` (ID `6aa3d5f449890600084101b8`). La adaptación no cambia nombre, campos ni `action` del formulario |

**Procedencia de la base:** el ZIP `deploy-6aa7dd28a96ea01c454e27ff.zip` aportado por el propietario (SHA-256
`43b36c9ae24ae0c0537329343017ddd40b053910093a4456d2a192c2b4c39a65`). Esta sesión sigue sin salida de red hacia
`landing.alpharobotica.com`, `alpharobotica-landing.netlify.app` ni `api.netlify.com` (403 a CONNECT), así que no
ha podido comparar con la URL pública ni desplegar.

## Carpetas

| Carpeta | Qué es |
|---|---|
| `origen-2026-09-14/` | Captura parcial histórica del despliegue de partida (13 archivos), **intacta** |
| `dist/` | Las fuentes: 21 archivos, 20 de contenido más `_redirects` |
| `paquete/` | `AlphaRobotica_Landing_Completa.zip` (mismo contenido que `dist/`), su manifiesto SHA-256 y el inventario. Ya no es la vía de despliegue: sirve de copia verificable |
| `netlify.toml` | Configuración mínima del proyecto enlazado: sin build; el directorio de publicación se fija en el panel |
| `Cambios_pendientes_landing.md` | El pliego original |

El `netlify.toml` que viene en los ZIP de deploy lo genera el CLI de Netlify a partir de `_redirects` (mismas
dos reglas del proxy, comprobado) e incluye una ruta de build local, así que **no se versiona**: la fuente del
proxy sigue siendo `_redirects`.

## Adaptación «hoteles y centros sanitarios · toda España» (27/09/2026)

Objetivo: que la landing sirva también para centros sanitarios y no quede acotada a Andalucía, porque la campaña
de apollo.io se envía a toda España. Solo textos; sin cambios de estructura, imágenes ni cableado.

| Bloque | Cambio |
|---|---|
| SEO y social | `<title>` «Robots para hoteles y centros sanitarios \| Vídeo y valoración»; descripción y `og:` con «tu hotel o centro sanitario, en toda España». **Andalucía: 0 menciones** (antes 3: título, descripción y kicker) |
| Hero | Kicker «ROBÓTICA DE SERVICIO PARA HOTELES Y CENTROS SANITARIOS · TODA ESPAÑA». H1 «¿Qué tareas puede asumir un robot en tu hotel o centro sanitario?», sin salto forzado y con `text-wrap:balance` para que no queden líneas huérfanas con ninguna tipografía. Subtítulo: el vídeo muestra aplicaciones hoteleras y «las mismas soluciones de limpieza, entregas y transporte interno se aplican en centros sanitarios» |
| Vídeo | Sin cambios: es el vídeo oficial «Smart Hotel Solution» de KEENON y se describe como lo que es |
| Contacto | H2 «¿Vemos por dónde empezar en tu hotel o centro sanitario?»; textos, WhatsApp y `mailto` con «hotel o centro sanitario»; etiqueta «Hotel / Centro / Empresa» **manteniendo `name="hotel"`** |
| Aviso por correo | Asunto oculto y asunto dinámico (`video-funnel.js`) pasan a «…para hotel o centro sanitario». Versión del script `?v=20260927-sanitario1` |
| «Servicio de habitaciones» → «Entregas a habitaciones» | Menú, tarjeta 02, H2 del W3, opción del desplegable, alt de la foto y texto prellenado del WhatsApp del W3. Vale para habitación de hotel y de paciente |
| W3 | «ENTREGA EN SU PUERTA»; «Entregas 24/7: amenities, toallas y pedidos en hoteles; lencería y suministros a planta en centros sanitarios»; «cada destinatario accede solo a lo suyo»; «Convive con las personas»; «para huéspedes y pacientes». **No se afirma** transporte de medicación, material estéril ni desinfección |
| C40 | «también de noche: pasillos, salas de espera y zonas comunes»; registros «para auditorías, en hoteles y en centros sanitarios» |
| S100 | «Almacén, lencería y suministros: … entre almacén, plantas y servicios» |
| S100 + carro | Se conserva como aplicación hotelera, etiquetada «aplicación 2 de 2 · hoteles» |
| `/gracias` | «…para comentar tu hotel o centro sanitario…» |
| `sitemap.xml` | `lastmod` 2026-09-27 (fecha real de esta modificación sustancial) |

`consent.js`, `plausible-init.js`, `landing-events.js`, `leadform-channel.js` y `video-funnel.css` quedan **byte a
byte** como en el despliegue `6aa7dd28…`. Formulario: `leads-demo`, `form-name`, señuelo, `canal`, `solicitud`,
`interes` y `action="/gracias"` sin cambios; la opción «Entregas a habitaciones (W3)» cambia solo el texto que se
envía en `interes`.

## Comprobaciones (Chromium + servidor local; receptor simulado, ningún envío real)

20 rutas públicas **200** con su tipo de contenido (`text/css` incluido) · consentimiento: primera visita sin
aviso aceptado no pide `/stats` **ni YouTube**; aceptar activa la medición y **sigue sin cargar YouTube**; YouTube
solo se pide al pulsar «Ver vídeo»; rechazo y retirada correctos · canal por defecto email (teléfono oculto y
deshabilitado) y alternancia correcta · asunto dinámico y botón cambian con «Prefiero solicitar una demo» · los
chips de interés fijan una opción existente del desplegable · envío por email y por llamada llegan a `/gracias`
con `canal`, `solicitud` y `subject` en el cuerpo · doble pulsación → 1 POST · **sin JavaScript también envía** ·
anclas `#top #video #c40 #w3 #s100 #maletas #contacto #solicitud` resuelven · sin desbordes a 360/390/768/1366 px
· ningún campo sin etiqueta ni objetivo táctil por debajo de 44 px · foco visible en el recorrido de teclado.

Observación no atribuible a este cambio: con la tipografía de reserva (aquí no se pueden cargar las Google
Fonts), el menú de escritorio deja «Contacto» fuera del área visible; `.links` es desplazable, así que nada se
rompe, y con Barlow cargada es probable que quepa. Ya ocurría con `6aa7dd28…`. Conviene mirarlo en producción.

## Despliegue: desde GitHub

Decidido el 27/09/2026: el proyecto `alpharobotica-landing` se **enlaza a este repositorio** y despliega solo
desde `main`, como ya hace el sitio principal. Ajustes en Netlify (Site configuration → Build & deploy →
*Link repository*):

| Ajuste | Valor |
|---|---|
| Repositorio / rama | `usbmodels-hash/alpharobotica` / `main` |
| **Base directory** | `docs/landing` |
| Publish directory | `docs/landing/dist` — el panel muestra la ruta completa desde la raíz del repositorio; el log del deploy debe decir `Publish directory: /opt/build/repo/docs/landing/dist` |
| Build command | *(vacío)* |

`docs/landing/netlify.toml` solo declara que no hay build y evita que la landing herede el `netlify.toml` del
sitio principal; el directorio de publicación se fija en el panel. Las reglas del proxy siguen en `dist/_redirects`.

Enlace hecho el 28/09/2026 (sin autorización nueva en GitHub: la app de Netlify ya estaba instalada por el
sitio principal). Primer despliegue: `6ab99baf5b1b2dba307fd3c7`. Desde entonces, **cada fusión en `main` que
toque `docs/landing/` despliega la landing** y las PR tienen deploy preview de este proyecto. Ya no hace falta
el CLI. El explorador del deploy lista `dist/` y `netlify.toml` porque muestra el base directory; la raíz
servida es `dist` (`/` responde y `/dist/` da 404).

Deploys y reversión: **Deploys → despliegue anterior → «Publish deploy»**. Versión previa a esta:
`6aa7dd28a96ea01c454e27ff`.

## Atribución de campaña (UTM) en el formulario

Desde el 28/09/2026 el formulario `leads-demo` lleva cuatro campos ocultos — `utm_source`, `utm_medium`,
`utm_campaign` y `utm_content` — que `assets/utm-form.js` rellena con los parámetros de la URL de entrada. Cada
solicitud que llega por Netlify Forms y por el aviso de correo dice así de qué campaña viene.

- **No guarda nada en el navegador** (ni cookies ni almacenamiento local) y no envía nada por sí mismo: los
  valores solo viajan si el visitante envía el formulario. No depende del aviso de cookies ni de Plausible.
- Política de valores: minúsculas, letras, números, punto, guion y guion bajo, hasta 60 caracteres. Se descarta
  cualquier otro valor (con `@`, espacios, barras o URL) para que nunca entren datos personales por error.
- Los parámetros UTM descartados **también se quitan de la dirección de la página** (`history.replaceState`),
  antes de que arranque la medición: por eso `utm-form.js` es el primer script. Así Plausible no recibe un email
  u otro dato personal como fuente de campaña, ni siquiera si el visitante ya había aceptado las cookies en una
  visita anterior. Los valores admitidos se quedan en la dirección y sí llegan a Plausible.
- Sin JavaScript el formulario sigue enviando, con los campos vacíos.
- Los campos se conservan al navegar por las anclas de la página, porque la URL mantiene los parámetros.

**Enlaces para apollo.io** (una campaña por secuencia — por ejemplo `hoteles-2026-10` y `sanitario-2026-10`, las dos a esta landing; `utm_content` para el paso o la variante del correo):

```
https://landing.alpharobotica.com/?utm_source=apollo&utm_medium=email&utm_campaign=hoteles-2026-10&utm_content=paso1
```

No usar variables de personalización de Apollo (nombre, email, empresa) dentro de los parámetros UTM.

## Reversión

Panel de `alpharobotica-landing` → Deploys → `6aa7dd28a96ea01c454e27ff` → «Publish deploy».
