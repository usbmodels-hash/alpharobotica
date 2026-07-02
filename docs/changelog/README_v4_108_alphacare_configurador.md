# Alpha Robotics v4.108 - Alpha Care + configurador + blog cards

## Resumen

VersiÃ³n preparada para Deploy Preview en Netlify, sin tocar producciÃ³n. Parte de `v4107_diagnostico_anchor_from_v4106`, manteniendo intactos los fixes de anclaje a `#diagnostico-gratuito`, el visor de vÃ­deo primero en W3/C40, el configurador/gate, el mini-finder, la limpieza SEO tÃ©cnica previa, la CSP en Report-Only y los assets optimizados existentes.

## Cambios aplicados

### Configurador

- `configurador.html`
  - `Horas/mes por persona` pasa a `Jornada mensual de un empleado (h/mes)`.
  - `UtilizaciÃ³n Ãºtil (%)` y `Horas operativas/dÃ­a servicio` incorporan ayuda contextual.
  - Nota v4.113: ese campo comparativo se elimina del panel publico.
  - El formulario `configurador-lead` conserva `data-netlify="true"`, `netlify-honeypot="bot-field"` y `form-name`; se elimina el atributo redundante `netlify=""`.
  - El fallback HTML del formulario apunta a `/configurador`; el JS sigue enviando al mismo origen.
  - AÃ±adido enlace cruzado a `/alpha-care`.

- `assets/js/configurador.js`
  - Nota v4.113: el comparador usa siempre el coste laboral equivalente mensual frente a OpExFlow.
  - Se aÃ±ade el bloque desplegable `CÃ³mo calculamos la cuota` en compra financiada: sistema francÃ©s, plazo, TAE, interÃ©s mensual y cuota estimada.
  - No se publica PVP por modelo; se mantienen referencias internas del motor para estimaciÃ³n.
  - El POST sigue siendo mismo origen (`pathname`, `/configurador`, `/`) con `application/x-www-form-urlencoded`.

### Alpha Care

- `alpha-care.html` nuevo.
  - PÃ¡gina SEO con un Ãºnico H1, canonical `https://alpharobotica.com/alpha-care` y OG.
  - Tabla Essential / Pro / Premium con SLA orientativo: Pro >=95%, Premium >=98%.
  - Horquillas orientativas por clase de robot y explicaciÃ³n de que la propuesta final se valida con diagnÃ³stico.
  - Integra MÃ©todo Alpha 4D, piloto 15 dÃ­as y CTAs a `/configurador` y `/#diagnostico-gratuito`.

- `netlify.toml`
  - Rewrite 200 para `/alpha-care` y `/alpha-care/`.

- `sitemap.xml`
  - Nueva URL canÃ³nica `https://alpharobotica.com/alpha-care`.

- NavegaciÃ³n/footer
  - El menÃº principal cambia `MÃ©todo Alpha` por `Alpha Care`.
  - El footer incorpora `Alpha Care` en Soluciones.

### Home

- `index.html`
  - Eliminado el bloque `section.intro-strip#hotel-360`.
  - No quedan enlaces a `#hotel-360`.
  - El formulario de diagnÃ³stico mantiene `id="diagnostico-gratuito"` para que todos los CTAs lleguen al formulario real.

### Blog

- `blog.html`
  - Las seis tarjetas ahora coinciden con el H1 real de cada artÃ­culo enlazado.
  - Sustituidos iconos por imÃ¡genes reales optimizadas.

- ArtÃ­culos modificados:
  - `blog-cuanto-cuesta-robot-limpieza-autonomo-2026.html`
  - `blog-robot-limpieza-hotel-roi-6-meses.html`
  - `blog-keenon-c40-vs-competencia-2026.html`
  - `blog-robot-room-service-w3-casos-uso-hoteles.html`
  - `blog-automatizacion-hosteleria-tendencias-2026.html`
  - `blog-elegir-robot-servicio-restaurante.html`

- Nuevos assets en `assets/blog/`:
  - `blog-costes-roi-limpieza-1600.avif/.webp`
  - `blog-c40-vs-c55-1600.avif/.webp`
  - `blog-dinerbot-restaurante-1600.avif/.webp`
  - `blog-automatizacion-hoteles-casos-1600.avif/.webp`
  - `blog-lidar-vs-camaras-1600.avif/.webp`
  - `blog-cuando-no-implantar-1600.avif/.webp`

Todas las imÃ¡genes del blog usan `?v=4108`, `width/height`, `loading="lazy"` y fallback WebP.

### Cache y seguridad

- `styles.css` sube a `?v=4110-margen-blogfotos` y `assets/js/configurador.js` a `?v=4110-raas-margin`.
- `_headers` y `netlify.toml` actualizan el comentario de cache-busting.
- La CSP sigue en `Content-Security-Policy-Report-Only`.
- No se aÃ±aden handlers `on*=` inline.
- No se llama a HubSpot desde cliente; `connect-src` permanece en `'self'`.

## Netlify Forms - notificaciones por email

Para recibir los leads del configurador:

1. Subir esta versiÃ³n a un Deploy Preview o sitio de staging en Netlify.
2. Ir a `Site configuration` -> `Forms` -> `Form notifications`.
3. AÃ±adir `Email notification`.
4. Formulario: `configurador-lead`.
5. Destinatario: `antonio@alpharobotica.com`.
6. Reply-To field: `email`.
7. Guardar.

Opcionalmente repetir el mismo patrÃ³n para `contacto-alpha`.

Notas operativas:

- Las notificaciones de Netlify solo aplican a nuevas submissions desde que se activa la notificaciÃ³n.
- El remitente suele ser `formresponses@netlify.com`; revisar spam, cuarentena y reglas del dominio si no llega.
- El envÃ­o desde cliente es solo a Netlify Forms. La conexiÃ³n Netlify -> HubSpot debe hacerse por webhook/automatizaciÃ³n del equipo, nunca desde JS pÃºblico.

## Mapeo recomendado a HubSpot

- `nombre` -> firstname / nombre completo
- `email` -> email
- `telefono` -> phone
- `empresa` -> company
- `vertical` -> vertical_operativa
- `area` -> area_automatizacion
- `flota_detalle` -> flota_detalle
- `ahorro_mensual` -> ahorro_mensual_estimado
- `via_recomendada` -> via_recomendada
- `nivel_alpha_care` -> nivel_alpha_care
- `gran_cuenta` -> gran_cuenta
- `payback_meses` -> payback_meses
- `cuota_opex` -> cuota_opex_estimada
- `cuota_financiada` -> cuota_financiada_estimada
- `horas_liberadas` -> horas_liberadas_estimadas
- `robots_total` -> robots_total

## VerificaciÃ³n realizada

- 765 referencias locales de assets en HTML/CSS/JS revisadas: sin faltantes.
- PÃ¡ginas HTML pÃºblicas revisadas: un Ãºnico H1. Los Ãºnicos HTML sin H1 estÃ¡n en `/components/`, bloqueado en `robots.txt`.
- Sin restos visibles de `Wiongo`, `Benchmark renting mercado`, `Horas/mes por persona` ni enlaces antiguos a `#contacto`.
- Sin enlaces a `#hotel-360`.
- W3 y C40 mantienen el visor de vÃ­deo primero bajo hero/descripciÃ³n y antes de specs.
- `blog.html-l723-7467e863b5.js` existe y se conserva.
- Nuevos AVIF/WebP del blog existen fÃ­sicamente.

## Checklist de preview

- Abrir `/`, `/configurador`, `/alpha-care`, `/blog`, un artÃ­culo de blog, `/robot-room-service-keenon-w3` y `/robot-limpieza-keenon-c40`.
- Confirmar que no hay assets 404/503 en Network.
- Confirmar consola sin violaciones CSP nuevas en Report-Only.
- En `/configurador`, probar que los botones de perfil operativo son clicables y actualizan KPIs.
- En `/configurador`, enviar una submission de prueba con email real y confirmar que aparece en Netlify Forms con campos ocultos poblados.
- Probar CTAs `DiagnÃ³stico gratuito` y `Solicitar diagnÃ³stico gratuito`: deben llegar a `/#diagnostico-gratuito`.
- Revisar en mÃ³vil que la barra sticky no tapa el primer campo del formulario al llegar al ancla.

## Decisiones pendientes del equipo

- Validar importes orientativos de Alpha Care por clase antes de uso comercial definitivo.
- Configurar la notificaciÃ³n email de Netlify para `configurador-lead` y, si procede, `contacto-alpha`.
- Conectar Netlify Forms con HubSpot mediante webhook o automatizaciÃ³n servidor-a-servidor.
- Validar legalmente cualquier cifra comercial antes de convertirla en claim publicitario.

## Nota de empaquetado

El ZIP final no incluye `_source/Alpha_Robotica_Configurador_RaaS.html` para evitar publicar material interno usado como referencia del configurador.

## Nota de empaquetado POSIX para Netlify

El paquete de entrega debe usar rutas POSIX (`/`) dentro del ZIP. No reempaquetar con herramientas de Windows que generen barras invertidas (`\`) en los nombres de entrada, porque Netlify puede desplegar esos archivos como nombres planos y provocar 404 en `assets/js/`, `assets/blog/` y el resto de carpetas.

Autocomprobacion obligatoria antes de entregar cualquier ZIP futuro:

- `backslash: 0`
- Deben existir entradas como `assets/js/configurador.js` y `assets/blog/blog-c40-vs-c55-1600.webp`.

Verificacion tras desplegar en Deploy Preview o produccion, preferiblemente en incognito:

- `/assets/js/configurador.js` devuelve 200.
- `/assets/blog/blog-c40-vs-c55-1600.webp` devuelve 200 y `/blog` muestra miniaturas.
- En `/configurador`, los botones de perfil operativo responden y el informe se desbloquea al enviar.
- Consola sin 404 de assets ni errores JS.

