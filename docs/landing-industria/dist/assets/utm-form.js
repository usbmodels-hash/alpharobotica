/* utm-form.js · atribución de campaña en el formulario leads-demo.
 * Copia utm_source, utm_medium, utm_campaign y utm_content de la URL de entrada
 * a campos ocultos del formulario, para saber de qué campaña viene cada solicitud.
 * No guarda nada en el navegador (ni cookies ni almacenamiento local) y no envía
 * nada por sí mismo: los valores solo viajan si el visitante envía el formulario.
 * Se descarta cualquier valor fuera de la política (con @, espacios, barras…),
 * para que nunca entren datos personales por error en la URL de la campaña.
 * Esos valores descartados también se quitan de la dirección de la página, para
 * que no los reciba la analítica. Por eso este script se carga el primero.
 */
(function () {
  'use strict';
  var CLAVES = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  var PATRON = /^[a-z0-9][a-z0-9._-]{0,59}$/;
  var validos = {};
  var params;
  try { params = new URLSearchParams(window.location.search); } catch (e) { return; }

  // 1) Limpiar la dirección: fuera cualquier parámetro UTM no admitido.
  var cambiado = false;
  CLAVES.forEach(function (clave) {
    if (!params.has(clave)) return;
    var valor = (params.get(clave) || '').trim().toLowerCase();
    if (params.getAll(clave).length === 1 && PATRON.test(valor)) { validos[clave] = valor; return; }
    params.delete(clave);
    cambiado = true;
  });
  if (cambiado) {
    try {
      var q = params.toString();
      window.history.replaceState(window.history.state, '', window.location.pathname + (q ? '?' + q : '') + window.location.hash);
    } catch (e) { /* sin History API: el formulario sigue descartando el valor */ }
  }

  // 2) Rellenar los campos ocultos del formulario con los valores admitidos.
  function rellenar() {
    var form = document.querySelector('form[name="leads-demo"]');
    if (!form) return;
    CLAVES.forEach(function (clave) {
      var campo = form.querySelector('input[type="hidden"][name="' + clave + '"]');
      if (campo) campo.value = validos[clave] || '';
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', rellenar);
  else rellenar();
})();
