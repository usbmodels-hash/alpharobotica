# Landing `landing.alpharobotica.com` — fuente, correcciones y despliegue

**Actualizado el 14/09/2026.**

La landing **no se despliega desde este repositorio**: va por su propio proyecto de Netlify. Aquí se guarda su fuente para tener historial y una reversión concreta.

| Carpeta | Qué es |
|---|---|
| `origen-2026-09-14/` | **Copia recuperable** del despliegue de partida, tal como se recibió (13 archivos). No tocar: es el punto de reversión |
| `dist/` | La misma landing **con el pliego aplicado**, lista para desplegar (14 archivos) |
| `Cambios_pendientes_landing.md` | El pliego original, con las cadenas exactas y el diseño del formulario |

## Qué se ha cambiado en `dist/`

| Bloque | Cambio |
|---|---|
| **P3** | H1 «Robots KEENON para hoteles: dedica más tiempo a tus huéspedes»; subtítulo del pliego; apoyo «Coordinamos el alcance y las integraciones necesarias» bajo el CTA, que ya decía «Solicitar demo para mi hotel» |
| **P2** | Variables `--cta:#B30F6E` y `--cta-hover:#8E0B57` para la acción principal. `--magenta` se conserva para degradados y acentos decorativos. Añadido `:focus-visible` en el CTA y en todos los campos del formulario |
| **P8** | «Mejor servicio, con el mismo equipo» → «Tu equipo se centra en el huésped…»; C40 y frecuencias absolutas → «Mantén tus rutas de limpieza con una frecuencia planificada y resultados registrados»; «23.500 Pa · secado instantáneo» → «23.500 Pa · aspiración de agua y residuos tras el fregado»; W3 «La experiencia que se comenta» → «Una entrega cómoda y diferenciadora»; S100 «siempre disponible» → «Continuidad del servicio…»; maletas «sin esperas» → «Equipaje organizado…» |
| **P11** | Las dos presentaciones del S100 se presentan como **«Transporte interno»** con dos aplicaciones (logística y equipajes). **Se conservan las anclas `#s100` y `#maletas`** |
| **P5** | Selector «Prefiero llamada» / «Prefiero email». Solo el dato del canal elegido es obligatorio; nunca los dos a la vez. La opción por defecto del desplegable pasa a «Aún no sé qué solución necesito». El mensaje sigue siendo opcional. `inputmode` en teléfono y email, y prevención de doble envío que no bloquea un reintento tras error de red |

## Dos defectos de cableado encontrados en la fuente

1. **El formulario no llevaba `data-netlify`.** Solo tenía el campo oculto `form-name`. Netlify detecta formularios en el HTML por el atributo `netlify` / `data-netlify`; sin él, un despliegue nuevo puede no registrar el formulario. Añadidos `data-netlify="true"` y `netlify-honeypot="bot-field"`, igual que en el sitio principal. **No verificado contra el panel de Netlify**: si el formulario ya estaba registrado por un despliegue anterior, el atributo es inocuo.
2. **`action` apuntaba a `/gracias`, que no existía en el despliegue recibido.** Se añade `gracias.html`, con `noindex`, que distingue expresamente «solicitud recibida» de «demostración reservada». También hace funcionar el evento `form_thanks_view`, que `landing-events.js` espera en esa ruta.

## Comprobaciones hechas (servidor local + Chromium)

| Comprobación | Resultado |
|---|---|
| Contraste del CTA del hero y del botón del formulario | **6,54:1** (antes 4,37:1 con `#E5148C`) |
| Anclas `#c40`, `#w3`, `#s100`, `#maletas`, `#contacto` | Todas conservadas |
| Canal preferido | Por defecto llamada: `tel.required=true`, `email.required=false`. Al elegir email se invierte. Al volver, se restaura |
| Envío solo con email y teléfono vacío | El formulario **valida** |
| 360 / 390 / 768 / 1366 px | Sin desbordes horizontales |
| `/gracias` | Responde 200 |
| `consent.js` y `landing-events.js` | **Byte a byte sin cambios** |
| `leads-demo`, `form-name`, honeypot, privacidad | Conservados |

## Qué falta para cerrarlo

**No se ha desplegado.** Esta sesión no tiene acceso al proyecto de Netlify de la landing y `landing.alpharobotica.com` está bloqueado por su proxy de salida, así que no puede publicarse ni comprobarse la URL pública desde aquí.

Para publicarlo: subir el contenido de `dist/` al proyecto de Netlify que sirve `landing.alpharobotica.com` con el procedimiento habitual. **Nunca** subir ahí `AlphaRobotica_Correcciones_Videos_CRO.zip`, que son cambios parciales del sitio principal.

Después del despliegue quedan por comprobar, ya sobre la URL pública:

1. Que Netlify **registra el formulario** `leads-demo` tras el despliegue nuevo y que una entrada aparece en su panel.
2. El recorrido completo del formulario con cada canal, incluida la retirada del consentimiento.
3. Que el receptor acepta la estructura nueva, incluido el campo `canal`, que **no existía antes**: conviene comprobar si debe reflejarse en el CRM.
