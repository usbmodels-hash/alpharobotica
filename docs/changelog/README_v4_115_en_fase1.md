# v4.115 EN Fase 1 - Alpha Robotica

Base usada: `alpha_robotics_v4_113_utf8_keenon_carousel_configurator.zip`.

Esta version no se ha promovido a produccion. Esta preparada para subir como Deploy Preview o sitio de pruebas en Netlify.

## Paginas creadas

- `/en/` -> `en/index.html`
- `/en/configurador` -> `en/configurador.html`

Las paginas EN usan rutas absolutas desde raiz para assets (`/styles.css`, `/assets/...`) para evitar 404 bajo `/en/assets`.

## Cambios principales

- Creado andamiaje `/en/` con home y configurador en ingles.
- Anadido selector `ES | EN` en nav y footer de home/configurador ES y EN.
- Anadidos `lang`, canonical, `hreflang` `es`, `en`, `x-default`, Open Graph/Twitter y `og:locale`/alternates en las cuatro paginas afectadas.
- Anadidos rewrites Netlify para `/en`, `/en/`, `/en/configurador` y `/en/configurador/`.
- Actualizado `sitemap.xml` con namespace `xhtml` y URLs EN con alternates.
- Refactorizado `assets/js/configurador.js` para funcionar con `LANG`, `TEXT` y `T()` en ES/EN desde una unica fuente.
- Refactorizado `assets/js/hero-carousel.js` para chips y mini-finder bilingues.
- Versionado de CSS/JS actualizado a `?v=4115-en-fase1`.
- Confirmadas cabeceras de JS con `charset=utf-8` en `_headers` y `netlify.toml`.

## I18N implementado

`assets/js/configurador.js` incluye claves para:

- Verticales: hotel, restaurante, hospital, senior, multifamily, gym.
- Areas: limpieza, fnb, room-service, logistica.
- Casos de uso, titulos de KPIs, plan recomendado, Alpha Care, recomendacion CAPEX/financiacion/OpExFlow, tabla de payback, mensajes del formulario, estados de envio y mini-finder.
- Formato EUR: `es-ES` en ES y `en-IE` en EN, manteniendo el simbolo euro al final.

`assets/js/hero-carousel.js` incluye `slideMetaByLang.es` y `slideMetaByLang.en`.

## Rutas y hreflang

- ES home canonical: `https://alpharobotica.com/`
- EN home canonical: `https://alpharobotica.com/en/`
- ES configurador canonical: `https://alpharobotica.com/configurador`
- EN configurador canonical: `https://alpharobotica.com/en/configurador`
- `x-default` apunta a la version ES.

## No-regresion

Se mantienen:

- Configurador original y gate Netlify Forms con `fetch('/')`/mismo origen.
- Mini-finder de la home.
- CSP en Report-Only y resto de cabeceras de seguridad.
- Galerias y fichas de producto existentes.
- Version ES de home/configurador, salvo selector de idioma, hreflang y cache-busting.

## Verificacion realizada en local

- `sitemap.xml` parsea como XML valido.
- No hay referencias `/en/assets`, `./assets`, `./styles`, `./main` ni `./cookie` en las paginas EN.
- Assets locales referenciados por `en/index.html` y `en/configurador.html` existen fisicamente.
- `_headers` y `netlify.toml` incluyen `Content-Type: text/javascript; charset=utf-8` para JS.
- Balance basico de llaves/parentesis:
  - `assets/js/configurador.js`: 208/208 llaves, 570/570 parentesis.
  - `assets/js/hero-carousel.js`: 31/31 llaves, 87/87 parentesis.
- No quedan referencias a `hero-carousel.js?v=4113` ni `configurador.js?v=4113` en las paginas afectadas.
- Las paginas EN quedaron sin mojibake y con enlaces legales directos a `.html`.

## Pendiente de Deploy Preview

Este entorno no dispone de Node/Python real, por lo que no se pudo ejecutar `node --check` ni pruebas con navegador local automatizado.

En Netlify Deploy Preview comprobar:

- `/en/` carga sin 404/503 de assets.
- `/en/configurador` calcula KPIs al cargar y al cambiar inputs.
- Mini-finder EN redirige a `/en/configurador?v=...&area=...`.
- Formulario del configurador EN se registra en Netlify Forms con campos ocultos poblados.
- Consola sin errores JS ni violaciones nuevas de CSP Report-Only.
- `document.documentElement.lang` devuelve `en` en paginas EN y `es` en ES.
- `document.querySelectorAll('link[hreflang]').length` devuelve al menos 3 en home/configurador ES y EN.

## Archivos tocados

- `index.html`
- `configurador.html`
- `en/index.html`
- `en/configurador.html`
- `assets/js/configurador.js`
- `assets/js/hero-carousel.js`
- `styles.css`
- `_headers`
- `netlify.toml`
- `sitemap.xml`
- `README_v4_115_en_fase1.md`

## Lista completa de claves I18N

| Clave | ES | EN |
|---|---|---|
| $key | Nº de habitaciones | No. of rooms |
| $key | Plazas / cubiertos | Seats / covers |
| $key | Nº de camas | No. of beds |
| $key | Nº de residentes | No. of residents |
| $key | Nº de viviendas | No. of units |
| $key | Nº de socios | No. of members |
| $key | Room service multiplanta | Multi-floor room service |
| $key | Reparto en restaurante / F&B | Restaurant / F&B delivery |
| $key | Limpieza de suelos | Floor cleaning |
| $key | Transporte de carga pesada | Heavy-load transport |
| $key | Reparto en sala y retirada de vajilla | Dining-room delivery and dish return |
| $key | Transporte interno cocina - almacen | Kitchen-to-storage internal transport |
| $key | Entregas internas multiplanta | Multi-floor internal deliveries |
| $key | Logistica interna | Internal logistics |
| $key | Entrega de comidas a habitacion | In-room meal delivery |
| $key | Comedor / sala | Dining room service |
| $key | Limpieza de zonas comunes | Common-area cleaning |
| $key | Paqueteria / entregas internas | Parcel and internal deliveries |
| $key | Limpieza de instalaciones | Facility cleaning |
| $key | Transporte interno | Internal transport |
| $key | Limpieza autonoma | Autonomous cleaning |
| $key | Logistica interna | Internal logistics |
| $key | Sin garantia de disponibilidad | No availability guarantee |
| $key | Objetivo de disponibilidad >= 95% | Availability target >= 95% |
| $key | Objetivo de disponibilidad >= 98% | Availability target >= 98% |
| $key | Gran cuenta / RaaS | Enterprise / RaaS |
| $key | Pyme / CAPEX | SMB / CAPEX |
| $key | robots en total | robots in total |
| $key | ahorro estimado / mes | estimated monthly saving |
| $key | personas-equivalente liberadas | FTE-equivalent hours released |
| $key | Con RaaS puedes ajustar la flota entre <strong>{hi} robots</strong> en temporada alta y <strong>{lo}</strong> en baja. | With RaaS you can adjust the fleet between <strong>{hi} robots</strong> in high season and <strong>{lo}</strong> in low season. |
| $key | Tu actividad es estable. RaaS mantiene cuota fija, soporte y cobertura de riesgo operativo. | Your operation is stable. RaaS keeps a fixed fee, support and operational risk coverage. |
| $key | Nivel {level} · {min}-{max} /mes por robot según modelo | {level} level · {min}-{max} /month per robot depending on model |
| $key | Incluido en RaaS. Opcional y recomendado en compra o compra financiada. | Included in RaaS. Optional and recommended for purchase or financed purchase. |
| $key | Via recomendada | Recommended route |
| $key | Compra | Purchase |
| $key | Compra financiada | Financed purchase |
| $key | RaaS | RaaS |
| $key | Para una cuenta de gran tamaño trabajamos sobre la base de RaaS: {reasons}. | For an enterprise account we work from a RaaS baseline: {reasons}. |
| $key | actividad estacional | seasonal activity |
| $key | preferencia por gasto operativo | operational-expense preference |
| $key | {props} propiedades a estandarizar | {props} properties to standardise |
| $key | Alpha Care y sustitucion incluidos | Alpha Care and replacement coverage included |
| $key | Según tus datos, {name} ofrece el mejor equilibrio coste-beneficio a {years} años. | Based on your data, {name} offers the best cost-benefit balance over {years} years. |
| $key | Recomendado | Recommended |
| $key | Cómo calculamos la cuota | How the fee is calculated |
| $key | La cuota se estima con sistema francés: una mensualidad constante que amortiza capital e intereses durante el plazo elegido. No se publica PVP por modelo; el motor usa referencias internas para simular la estructura financiera. | The payment is estimated with a standard amortisation formula: a fixed monthly amount that repays capital and interest over the selected term. We do not publish model price lists; the engine uses internal references to simulate the financial structure. |
| $key | Plazo | Term |
| $key | TAE | APR |
| $key | Interés mensual estimado | Estimated monthly interest |
| $key | Cuota financiera estimada | Estimated finance fee |
| $key | /mes flota | /month fleet |
| $key | /robot·mes | /robot·month |
| $key | Pagas el equipo una sola vez y es tuyo desde el día 1. La cuota mensual de abajo son solo los costes de operación (Alpha Care + consumibles y energía), incluidos también en Financiada y OpExFlow. | You pay for the equipment once and own it from day one. The monthly amount below only covers operating costs (Alpha Care + consumables and energy), also included in Financed and OpExFlow. |
| $key | Sin desembolso inicial. Pagas a plazos y el equipo queda en propiedad al final. | No upfront payment. You pay in instalments and own the equipment at the end. |
| $key | Suscripcion todo incluido con servicio, sustitucion y flexibilidad operativa. | All-inclusive subscription with service, replacement coverage and operational flexibility. |
| $key |  · operación |  · operation |
| $key |  a plazos |  in instalments |
| $key |  todo incluido |  all included |
| $key | Flujo mensual neto | Net monthly flow |
| $key | Beneficio neto a {years} años | Net benefit over {years} years |
| $key | Inversion de referencia | Reference investment |
| $key | Payback estimado | Estimated payback |
| $key | meses | months |
| $key | Sin desembolso inicial | No upfront payment |
| $key | Equilibrio en mes | Break-even in month |
| $key | Alpha Care incluido | Alpha Care included |
| $key | Opcion de compra desde el mes 12 | Purchase option from month 12 |
| $key | Vía | Route |
| $key | Equilibrio estimado | Estimated break-even |
| $key | Beneficio neto a horizonte | Net benefit at horizon |
| $key | <strong>Referencia orientativa:</strong> Tu OpExFlow &asymp; {raas}/robot&middot;mes frente a &asymp; {saving}/mes de coste laboral equivalente. | <strong>Indicative benchmark:</strong> Your OpExFlow &asymp; {raas}/robot&middot;month versus &asymp; {saving}/month of equivalent labour cost. |
| $key | Coste acumulado por modelo de adquisicion | Cumulative cost by acquisition model |
| $key | a | y |
| $key | Estimacion orientativa basada en los datos introducidos y parametros internos de referencia. No tiene valor de oferta. Precios, cuotas, SLA e integraciones se confirman en la propuesta de Alpha Robotica tras el diagnostico de sitio. | Indicative estimate based on the data entered and internal reference parameters. It is not a commercial offer. Prices, fees, SLA and integrations are confirmed in Alpha Robotica’s proposal after the site assessment. |
| $key | {units} robots; {saving}/mes de ahorro estimado; via recomendada: {route}; flota: {fleet} | {units} robots; {saving}/month estimated saving; recommended route: {route}; fleet: {fleet} |
| $key | Resultados completos desbloqueados para {name}. | Full results unlocked for {name}. |
| $key | tu empresa | your company |
| $key | Revisar por WhatsApp | Review via WhatsApp |
| $key | Reservar estudio de sitio | Book a site study |
| $key | Completa nombre, email y privacidad para desbloquear el informe. | Complete name, email and privacy consent to unlock the report. |
| $key | Registrando solicitud... | Registering request... |
| $key | Te mostramos el informe ahora. Si no recibimos la solicitud, puedes llamarnos o escribirnos por WhatsApp. | We are showing the report now. If the request is not received, you can call us or message us on WhatsApp. |
| $key | Modulo E-box para ascensor y 2-4 compartimentos | E-box lift module and 2-4 compartments |
| $key | Bandejas y pantalla de marketing | Trays and marketing screen |
| $key | Bandejas para pasillo estrecho | Trays for narrow corridors |
| $key | Pila de carga y bandejas | Charging stack and trays |
| $key | Pila de carga y bandejas | Charging stack and trays |
| $key | Kit de consumibles 6 meses | 6-month consumables kit |
| $key | Workstation, pila de carga y kit de consumibles | Workstation, charging stack and consumables kit |
| $key | Workstation de agua y bateria extra | Water workstation and extra battery |
| $key | Estanteria y bateria de cambio rapido | Shelving and quick-swap battery |
| $key | Plataforma y modulo de cambio de bateria | Platform and battery-swap module |
