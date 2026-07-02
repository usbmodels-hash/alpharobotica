# Alpha Robotics v4.112 - Correccion carrusel hero

## Diagnostico

En v4.111 las fotos del carrusel estaban presentes y respondian correctamente, pero no se veian en la home porque el CSS critico inline de `index.html` seguia aplicando esta regla heredada a todos los hijos directos de `.hero`:

```css
.hero>*:not(.hero-bg):not(.hero-bg-wrap){position:relative;z-index:2}
```

Al convertir el hero en carrusel, esa regla tambien afectaba a `.hero-slides`, anulaba su posicion absoluta y dejaba las imagenes fuera de la capa visual esperada.

## Cambios realizados

- `index.html`
  - La regla critica ahora excluye el carrusel: `.hero:not(.hero-carousel)>*...`.
  - CSS cache-busting actualizado a `styles.css?v=4113-carousel-config`.
  - JS del carrusel cache-busting actualizado a `hero-carousel.js?v=4113-utf8-keenon`.

- `styles.css`
  - Se reforzaron las capas del carrusel con selectores especificos:
    - `.hero.hero-carousel > .hero-slides`
    - `.hero.hero-carousel > .hero-overlay`
    - `.hero.hero-carousel > .hero-inner`
    - `.hero.hero-carousel > .hero-controls`
    - `.hero.hero-carousel > .hero-chip`

- `assets/js/hero-carousel.js`
  - Se limpio mojibake de etiquetas del chip del carrusel.
  - Se mantuvo la logica externa CSP-safe, sin handlers inline.

- `_headers` y `netlify.toml`
  - Comentario de version actualizado a `CSS v=4113-carousel-config` y `hero-carousel JS v=4113-carousel-config`.

## Verificacion local

- Servidor local: `http://127.0.0.1:4112/` devuelve 200.
- Navegador:
  - `.hero-slides` queda en `position:absolute`.
  - Imagen activa carga en AVIF: `1600 x 900`.
  - Rectangulo visual de imagen activa: `1265 x 908`.
  - `document.querySelectorAll('h1').length` devuelve `1`.
  - 6 slides y 6 dots.
  - Consola sin errores.
- Assets:
  - `MissingAssetRefs = 0`.
  - 12 assets del carrusel en `/assets/hero/` (`6 AVIF + 6 WebP`).
  - Los 6 AVIF del carrusel responden 200 en servidor local.

## Notas de despliegue

Subir el ZIP a una Deploy Preview de Netlify y comprobar:

1. Home desktop y mobile: las fotos del carrusel se ven desde el primer pantallazo.
2. DevTools > Network: `styles.css?v=4113-carousel-config` y `hero-carousel.js?v=4113-utf8-keenon` devuelven 200.
3. DevTools > Console: sin errores ni nuevas violaciones CSP.
4. Si Netlify conserva cache antigua, ejecutar "Clear cache and deploy site".

