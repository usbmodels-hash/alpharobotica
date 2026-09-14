# Landing `landing.alpharobotica.com` — fuente, paquete y despliegue

**Actualizado el 14/09/2026 (Europe/Madrid).**

La landing **no se despliega desde este repositorio**: va por su propio proyecto de Netlify. Aquí se guarda su
fuente, sincronizada con la versión publicada, para tener historial y una reversión concreta.

## Estado

| Plano | Estado |
|---|---|
| Fuentes en GitHub | **Sincronizadas** con la versión publicada (19 archivos) |
| Validado en local | **Sí** — Chromium y un servidor que emula el enrutado de Netlify |
| **Desplegado en Netlify** | **Sí.** Despliegue `6aa7c943cf146e1186e04f57`, publicado el **14/09/2026 a las 12:15:44 CEST** |
| **Comprobado en producción** | **Sí**, en esa misma ejecución. Vista previa final comprobada: `6aa7c81527616400eff2cf01` |
| **Recepción del contacto** | **Acreditada por confirmación del propietario** |

| Dato del proyecto | Valor |
|---|---|
| Proyecto Netlify | `alpharobotica-landing` |
| Site ID | `ce07e6ab-8176-47dc-9d42-3de7f68e0034` |
| Despliegue publicado | `6aa7c943cf146e1186e04f57` · 14/09/2026 12:15:44 CEST |
| Despliegue anterior conservado (reversión) | `6aa69fc317e0443637a1329d` |
| Formulario registrado | `leads-demo`, ID `6aa3d5f449890600084101b8`. Campo nuevo `canal` reconocido; aviso por correo conservado |

**Procedencia de estos datos:** los aporta el propietario. Esta sesión sigue sin salida de red hacia
`landing.alpharobotica.com` ni `api.netlify.com` (la pasarela responde 403 a CONNECT), así que la
sincronización se apoya en el paquete verificado por hash y en esa evidencia, no en una consulta propia.
No se ha ejecutado ningún despliegue desde aquí.

## Carpetas

| Carpeta | Qué es |
|---|---|
| `origen-2026-09-14/` | Captura parcial histórica del despliegue de partida (13 archivos), **intacta**. No es una copia completa del proyecto de Netlify |
| `dist/` | Las fuentes de la versión publicada: 19 archivos, 18 de contenido más `_redirects` |
| `paquete/` | `AlphaRobotica_Landing_Completa.zip` (el paquete desplegado), su manifiesto SHA-256 y el inventario |
| `Cambios_pendientes_landing.md` | El pliego original |

SHA-256 del paquete: `fbf17a98c9b6170113f5f3e8d774a629629a9f2bae7119c7fc24f3a408978603`

## Cómo se resolvió cada dependencia que quedaba abierta

| | Qué faltaba | Cómo quedó |
|---|---|---|
| **D1** | El destino real del proxy `/stats` | Resuelto: `_redirects` en la raíz del paquete, con las dos reglas comprobadas. El CLI oficial de Netlify las convirtió en un `netlify.toml` generado durante el despliegue; por eso el sitio desplegado muestra 18 archivos de contenido más esa configuración. Esa diferencia de representación es esperada. **No** se ha copiado configuración del sitio principal ni añadido otro medidor |
| **D2** | `icon-512.png` | Resuelto: PNG original de 512×512 recuperado de producción. Es la imagen social vigente, con sus dimensiones, ALT y tarjeta `summary` |
| **D3** | Identificación del proyecto | Resuelta: `alpharobotica-landing`, site ID `ce07e6ab-8176-47dc-9d42-3de7f68e0034` |
| **D4** | Acceso para publicar | Resuelto en esa ejecución, con el CLI oficial de Netlify |

Reglas del proxy, tal como viajan en `dist/_redirects`:

```text
/stats/js/script.js  https://plausible.io/js/pa-xmf_YZISFSNuuYU-zgSlN.js  200
/stats/api/event     https://plausible.io/api/event  200
```

`assets/og-landing.jpg` se conserva como recurso **sin referencias sociales**: esa imagen alternativa llevaba
texto superpuesto.

## Qué contiene la versión publicada

- `canonical` absoluto `https://landing.alpharobotica.com/`, `og:url` coherente, imagen social `/icon-512.png`
  con tarjeta `summary`.
- `robots.txt` con la línea `Sitemap:` y **sin** bloquear `/gracias`, que debe seguir siendo rastreable para que
  Google lea su `noindex`. `sitemap.xml` con **una sola URL**, la portada canónica.
- `/gracias` con `noindex,follow`, que distingue expresamente «solicitud recibida» de «demostración reservada»,
  con los controles de consentimiento y el enlace «Configurar cookies».
- Formulario `leads-demo` con su declaración de origen para Netlify, el campo oculto `form-name`, el señuelo
  `bot-field`, el selector de canal (`canal`) y `action` de **mismo origen** `/gracias`.
- Selector de canal con controles de radio de 20×20 px y `scroll-margin-top` bajo la cabecera fija, para que las
  anclas no queden tapadas.
- Enlaces internos como anclas reales. Esto hace funcionar `cta_demo`, que `landing-events.js` solo emite
  cuando el `href` es exactamente `#contacto`.
- Accesibilidad: ningún objetivo táctil por debajo de 44 px; acción principal a 6,54:1 de contraste.

`consent.js`, `plausible-init.js` y `landing-events.js` son **byte a byte** los mismos de
`origen-2026-09-14/`: la medición validada no se ha reescrito.

## Comprobaciones sobre estas fuentes

Chromium con Playwright y un servidor local que emula el enrutado de Netlify. **Receptor simulado**: los
envíos se guardan en el entorno de pruebas y no salen de él. No se ha enviado ningún formulario, contacto ni
evento analítico reales.

18 rutas públicas **200** con su tipo de contenido correcto · consentimiento A–F correcto (0 peticiones a
`/stats` antes de aceptar) · ambos canales envían y llegan a `/gracias`, con `canal` en el cuerpo junto a
`form-name` · doble pulsación → 1 POST · validación nativa correcta en cada canal · envía también **sin
JavaScript** · sin desbordes a 360/390/768/1366 px · ningún campo sin etiqueta · ningún objetivo táctil por
debajo de 44 px · paradas de teclado con foco visible.

## Reversión

En el panel del proyecto `alpharobotica-landing`: **Deploys → `6aa69fc317e0443637a1329d` → «Publish deploy»**.
Es inmediata y no depende de este repositorio. El contenido íntegro del despliegue vigente está además en
`dist/` y en `paquete/AlphaRobotica_Landing_Completa.zip`.

## Si hubiera que volver a desplegar

Subir el contenido de `dist/` con el CLI oficial de Netlify al proyecto `alpharobotica-landing`. `_redirects`
debe viajar en la raíz. **Nunca** subir ahí el paquete de correcciones del sitio principal, ni copiar a la
landing el `netlify.toml`, el `_redirects` o el `index.html` de la raíz del sitio principal.
