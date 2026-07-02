# Alpha Robotics v4.111 - Hero con carrusel en home

## Resumen

Se crea la version `v4_111_hero_carrusel` sobre la base v4.110. No se toca produccion.

## Cambios aplicados

- `index.html`
  - Sustituido el hero estatico de home por un carrusel de 6 slides.
  - Se mantiene un unico `<h1>` en la home.
  - Se elimina el mini-finder duplicado bajo el hero.
  - Se integra un mini-finder dentro del hero que enlaza a `/configurador?v=...&area=...`.
  - Se cambia el preload LCP al primer slide: `./assets/hero/hero-roomservice-1600.webp`.
  - Se carga `./assets/js/hero-carousel.js?v=4113-utf8-keenon`.

- `assets/js/hero-carousel.js`
  - JS externo y CSP-safe.
  - Sin `onclick`, sin handlers inline, sin `eval`.
  - Rotacion automatica, controles prev/next, dots, pausa en hover/foco y soporte `prefers-reduced-motion`.
  - Actualiza el chip contextual de cada slide.

- `styles.css`
  - Bloque CSS nuevo aislado bajo `.hero-carousel`.
  - No modifica las galerias de fichas, blog, configurador, ROI ni Alpha Care.
  - Cache-busting global subido a `?v=4111-hero`.

- `assets/hero/`
  - Creados 12 assets optimizados, todos 1600x900:
    - `hero-roomservice-1600.avif`
    - `hero-roomservice-1600.webp`
    - `hero-innovacion-1600.avif`
    - `hero-innovacion-1600.webp`
    - `hero-hospitality-1600.avif`
    - `hero-hospitality-1600.webp`
    - `hero-limpieza-1600.avif`
    - `hero-limpieza-1600.webp`
    - `hero-sala-1600.avif`
    - `hero-sala-1600.webp`
    - `hero-logistica-1600.avif`
    - `hero-logistica-1600.webp`

- `_headers` y `netlify.toml`
  - Comentario de cache-busting actualizado: `CSS v=4113-carousel-config` y `hero-carousel JS v=4113-carousel-config`.

## Mapeo de slides

1. `hero-roomservice-1600` desde asset existente `assets/hero-w3-room-service.webp`: BUTLERBOT / Room service -> `/room-service`.
2. `hero-innovacion-1600` desde `250710-F1-P2.jpg`: KEENON / Innovacion robotica -> `/catalogo-keenon`.
3. `hero-hospitality-1600` desde `Greeting1.png`: Hospitality / Atencion premium 4-5 estrellas -> `/soluciones-enterprise-integracion-360`.
4. `hero-limpieza-1600` desde `KLEENBOT C40 KV.jpg`: KLEENBOT / Limpieza autonoma -> `/limpieza-autonoma`.
5. `hero-sala-1600` desde `01.jpg`: DINERBOT / Atencion y sala -> `/food-beverage`.
6. `hero-logistica-1600` desde `RoomService.png`: HEAVY LOAD / Logistica y transporte -> `/logistica-interna`.

## Decision sobre mini-finder

Se usa el mini-finder integrado dentro del nuevo hero y se elimina el bloque independiente `.config-mini` de la home. Motivo: evita duplicidad visual y funcional, conserva la ruta al configurador y mantiene las claves esperadas `v` y `area`.

## Verificacion realizada

- Auditoria local de assets referenciados en HTML/CSS/JS: `MISSING_COUNT=0`.
- Home en navegador local:
  - `h1Count=1`.
  - `slideCount=6`.
  - `dotCount=6`.
  - `allImagesLoaded=true`.
  - Imagen activa servida en AVIF 1600x900.
  - Sin errores de consola.
  - Sin `data-config-mini-finder` duplicado.
- Configurador local directo:
  - `configurador.html?v=hotel&area=room-service` carga sin errores.
  - Form `configurador-lead` presente.
  - Script `configurador.js` presente.
  - 1 solo H1.
- Rewrites Netlify:
  - `netlify.toml` mantiene `/configurador` y `/configurador/` hacia `/configurador.html` con `status = 200`.
- CSP/seguridad:
  - No se anaden scripts inline.
  - No hay atributos `on*=` nuevos.
  - No hay base64 en `index.html`.
  - No hay CDN ni terceros nuevos.

## Pendiente en Deploy Preview

- Revisar visualmente desktop y movil en la Deploy Preview final.
- Ejecutar Lighthouse/PageSpeed en la URL publica de preview. No se ejecuta Lighthouse local porque este entorno no dispone de Node/Lighthouse CLI real instalado.

## Empaquetado

El ZIP final debe crearse con rutas POSIX (`/`), no rutas Windows (`\`), para que Netlify publique correctamente los assets.


