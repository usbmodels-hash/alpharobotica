# Landing `landing.alpharobotica.com` — cambios preparados, pendientes de acceso

**Preparado el 14/09/2026.** Cubre la parte de landing de P2, P3, P5, P8, P10 y P11 del informe de SEO, vídeos y conversión.

## Por qué está pendiente

La landing **no está en este repositorio** y se despliega por separado con Netlify Drop.

Comprobaciones hechas para localizar su origen, todas con resultado negativo:

| Vía | Resultado |
|---|---|
| Archivos de landing en `usbmodels-hash/alpharobotica` | No existen. Las únicas menciones son enlaces salientes en `index.html`, `room-service.html`, `soluciones-enterprise-integracion-360.html` y `robots.txt` |
| Otros repositorios de la cuenta | `list_repos` devuelve **un solo repositorio**: `usbmodels-hash/alpharobotica` |
| Descarga del HTML público | `landing.alpharobotica.com` está **bloqueado por el proxy de salida** de esta sesión (`EGRESS_BLOCKED`), igual que `alpharobotica.com` |

Sin el origen no se puede editar con garantías: una descarga del HTML servido no es el proyecto, y sobrescribirlo con una reconstrucción parcial destruiría configuración que no se conoce.

**Lo que hace falta, exactamente:** el ZIP completo del último despliegue de la landing, o acceso al proyecto de Netlify que la sirve. Con cualquiera de los dos, los cambios de abajo se aplican y verifican en una sesión.

**No debe subirse a Netlify Drop** el ZIP `AlphaRobotica_Correcciones_Videos_CRO.zip`: contiene solo cambios parciales del sitio principal.

---

## P8 — Sustituciones de texto

Cadenas exactas del informe. Antes de aplicar, confirmar que siguen literales en el HTML vigente.

| Buscar | Sustituir por |
|---|---|
| `Mejor servicio, con el mismo equipo` | `Tu equipo se centra en el huésped. El robot asume recorridos repetitivos.` |
| C40, frecuencias absolutas (`cumple todas las frecuencias, todos los días`) | `Mantén tus rutas de limpieza con una frecuencia planificada y resultados registrados.` |
| `23.500 Pa` asociado a `secado instantáneo` | `Aspiración de agua y residuos tras el fregado.` |
| W3 `La experiencia que se comenta` | `Añade una entrega cómoda y diferenciadora para tus huéspedes.` |
| S100 `siempre disponible` | `Planifica la continuidad del servicio con recarga y cambio de batería según tu operativa.` |
| Equipaje `sin esperas` | `Organiza el transporte de equipaje y reduce recorridos del personal.` |
| Promesa genérica de ROI | `Estima el ahorro operativo y el plazo de recuperación con tus datos.` |

**Criterios:** no asociar una cifra de aspiración a una garantía de secado; conservar cifras técnicas solo con su significado y condiciones; no introducir «demo gratuita», «respuesta inmediata» ni plazos nuevos sin respaldo; unificar el tratamiento de «tú»; y releer la página completa para que no queden frases que contradigan las nuevas.

## P3 — Cabecera y acción principal

- **H1:** `Robots KEENON para hoteles: dedica más tiempo a tus huéspedes`
- **Subtítulo:** `Limpieza, entregas a habitaciones y transporte interno. Te ayudamos a elegir qué automatizar y cómo comprobar su resultado en tu hotel.`
- **CTA principal:** `Solicitar demo para mi hotel`
- **Apoyo bajo el botón:** `Coordinamos el alcance y las integraciones necesarias.`

## P2 — Contraste del CTA

El informe midió el rosa de la landing `#E5148C` en **4,37:1** con texto blanco, por debajo del mínimo de 4,5:1.

Aplicar el mismo criterio ya publicado en el sitio principal:

```css
--brand-cta:#B30F6E;        /* 6,54:1 con blanco */
--brand-cta-hover:#8E0B57;  /* 8,99:1 con blanco */
```

Fondo **sólido** en la acción principal; el degradado queda para decoración. Añadir `:hover` y `:focus-visible` con contorno visible. Verificar el contraste real de los estados interactivos, no solo el reposo.

> El ajuste de `styles.css` del sitio principal **no acredita** el contraste de la landing: son proyectos distintos.

## P10 — Primer bloque visual

Imagen aprobada de un robot pertinente en uso, con jerarquía clara entre beneficio y acción. Conservar identidad de marca; evitar reconstrucción decorativa. Si hay carrusel, aplicar el mismo criterio del sitio principal: pausa persistente accesible, objetivo táctil de 44 px, `:focus-visible` y respeto a `prefers-reduced-motion`.

## P11 — Agrupar el S100

Las dos presentaciones del S100 (logística y equipajes) pasan a un bloque único **«Transporte interno»** con ambas como aplicaciones. **Conservar los destinos `#s100` y `#maletas`** si reciben enlaces entrantes: comprobarlo antes de renombrar anclas.

Variante C40 de limpieza: solo si existe campaña identificada y destino justificado, con contenido y medición propios. No crear duplicados por sector sin información propia. Documentar la decisión de indexabilidad de cualquier variante.

## P5 — Canal preferido en el formulario

Diseño funcional:

1. Selector **«Prefiero email» / «Prefiero llamada»**.
2. **Solo el dato del canal elegido es obligatorio.** Nunca teléfono y email obligatorios a la vez.
3. Añadir la opción **«Aún no sé qué solución necesito»**.
4. El mensaje sigue siendo **opcional**.

Condiciones que deben conservarse:

- El formulario **`leads-demo`** y su integración actual, salvo motivo documentado.
- Detección de formularios de Netlify, nombres de campos, campos ocultos, método y destino.
- Protección antispam (honeypot) y correspondencia con las propiedades del CRM.
- **Ningún campo oculto no aplicable debe impedir el envío**: al alternar el canal, el campo del canal descartado debe dejar de ser `required`.
- La confirmación debe depender de la **aceptación real del receptor**. «Solicitud recibida» no equivale a «demo reservada».
- Consentimiento v5 intacto: sin peticiones analíticas antes de aceptar, y tramitar la solicitud **no** debe obligar a aceptar analítica.

Comprobaciones al aplicarlo: etiquetas asociadas, teclado móvil (`inputmode`/`autocomplete`), errores comprensibles, conservación de datos al fallar, prevención de doble envío y recuperación ante error de red.

### Referencia útil: mapeo del CRM ya verificado

En el sitio principal, la propiedad `area_de_interes` del CRM (portal `148817158`) admite exactamente estos cinco valores, y el mapeo ES/EN está comprobado:

`Limpieza autónoma` · `Food & Beverage` · `Room Service` · `Logística interna` · `No lo tengo claro todavía`

Si la landing envía un área, debe usar uno de esos valores exactos.
