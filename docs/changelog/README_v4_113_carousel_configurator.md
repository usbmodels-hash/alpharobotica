# Alpha Robotics v4.113 - Carrusel, Configurador UTF-8 y KEENON /en

## Base

Version creada desde `alpha_robotics_v4_112_hero_carrusel_fix`, sin tocar produccion y preparada para Deploy Preview manual en Netlify.

## Cambios del carrusel

- `assets/js/hero-carousel.js`
  - Autoavance conservado y bajado de `6500 ms` a `5000 ms`.
  - Se mantiene `prefers-reduced-motion`: si el usuario pide reducir movimiento, el carrusel no autoavanza.
  - Se mantienen pausa por hover/focus y navegacion con flechas de teclado.

- `index.html`
  - Eliminadas las flechas laterales visuales del carrusel.
  - Los controles `data-dot` pasan de botones con texto visible a puntos discretos.
  - Los dots mantienen `role="tab"`, `aria-selected` y `aria-label` accesible.

- `styles.css`
  - Selector del carrusel convertido a puntos pequenos centrados en la parte inferior.
  - Dot activo destacado con `--gold2`.
  - Eliminados estilos de `.hero-arrow`.

## Cache-Busting

- CSS: `styles.css?v=4113-carousel-config`.
- JS carrusel: `hero-carousel.js?v=4113-utf8-keenon`.
- JS configurador: `configurador.js?v=4113-utf8-keenon`.
- JS globales cacheados: `main.js?v=4113-utf8-keenon`, `cookie-consent.js?v=4113-utf8-keenon` y `contact-area-prefill.js?v=4113-utf8-keenon`.
- JS externos generados para CSP y scrollspy: versionados tambien con `v=4113-utf8-keenon` para forzar nueva respuesta con charset.
- `_headers` y `netlify.toml` actualizan el comentario de version.

## Charset UTF-8 JS

Se anadio en `_headers`:

```text
/assets/js/*
  Content-Type: text/javascript; charset=utf-8

/main.js
  Cache-Control: public, max-age=31536000, immutable
  Content-Type: text/javascript; charset=utf-8

/cookie-consent.js
  Cache-Control: public, max-age=31536000, immutable
  Content-Type: text/javascript; charset=utf-8
```

Y el equivalente en `netlify.toml`.

Ademas, `assets/js/configurador.js` se normalizo a UTF-8 real porque la copia de trabajo contenia secuencias mojibake en simbolos monetarios, separadores y acentos. Verificacion local: `SuspiciousMojibakeChars = 0`.

## Cambios Del Configurador

- `configurador.html`
  - Eliminado del panel avanzado el campo comparativo manual de cuota.

- `assets/js/configurador.js`
  - Eliminadas variables y estado asociados a `wiongo_ref`, `wRef` y `hasWRef`.
  - El benchmark muestra siempre la comparacion: OpExFlow por robot/mes frente a coste laboral equivalente.
  - Se elimina la frase de anadir una referencia externa.
  - `RAAS_MARGIN = 0.15` se mantiene interno y no visible al cliente.

## Tarjeta Compra

Antes:

```text
Pagas el precio completo hoy. El robot es tuyo desde el dia 1.
/mes
```

Despues:

```text
Pagas el equipo una sola vez y es tuyo desde el día 1. La cuota mensual de abajo son solo los costes de operación (Alpha Care + consumibles y energía), incluidos también en Financiada y OpExFlow.
/mes · operación
```

El calculo no cambia: el importe mensual de Compra sigue siendo Alpha Care + consumibles/energia.

## Enlace KEENON

Sustitucion global realizada desde las variantes antiguas del enlace espanol de KEENON hacia:

```text
https://www.keenon.com/en
```

Verificacion local: la URL antigua de KEENON en espanol devuelve 0 coincidencias en el paquete.

## Verificacion Realizada

- Home:
  - 6 slides y 6 dots.
  - 0 flechas visuales (`.hero-arrow`, `data-prev`, `data-next`) en HTML/CSS.
  - Autoavance configurado a `5000 ms`.
  - Dots sin texto visible y con `aria-label`.
  - `h1` unico.

- Configurador:
  - No existe `#wiongo_ref`.
  - 3 tarjetas renderizadas por el motor.
  - Tarjeta Compra usa `/mes · operación`.
  - Benchmark fijo contra coste laboral equivalente.
  - Caracteres especiales en JS correctos: `€`, `º`, `·`, `años`, `Cómo`.

- Assets y seguridad:
  - `MissingAssetRefs = 0`.
  - `InlineEvents = 0`.
  - `RAAS_MARGIN = 0.15` presente solo como constante interna.
  - ZIP generado con rutas POSIX: `backslash: 0`.

## Checklist De Preview

1. Subir el ZIP a Deploy Preview en Netlify.
2. Abrir `/` en incognito y confirmar que las fotos cambian solas cada unos 5 segundos.
3. Confirmar que el selector inferior son puntos discretos y clicables.
4. Abrir `/configurador` y confirmar que no aparece el campo eliminado.
5. Revisar que la tarjeta Compra muestra `/mes · operación`.
6. DevTools > Network: comprobar 200 en CSS/JS con `v=4113-utf8-keenon` en los JS modificados.
7. DevTools > Network: comprobar `Content-Type: text/javascript; charset=utf-8` en `assets/js/configurador.js`, `main.js` y `cookie-consent.js`.
8. DevTools > Console: sin errores ni nuevas violaciones CSP.
