/* utm-form.js · atribución de campaña en el formulario leads-demo.
 * Copia utm_source, utm_medium, utm_campaign y utm_content de la URL de entrada
 * a campos ocultos del formulario, para saber de qué campaña viene cada solicitud.
 * No guarda nada en el navegador (ni cookies ni almacenamiento local) y no envía
 * nada por sí mismo: los valores solo viajan si el visitante envía el formulario.
 * Se descarta cualquier valor fuera de la política (con @, espacios, barras…),
 * para que nunca entren datos personales por error en la URL de la campaña.
 */
(function () {
  'use strict';
  var CLAVES = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'];
  var PATRON = /^[a-z0-9][a-z0-9._-]{0,59}$/;
  function init() {
    var form = document.querySelector('form[name="leads-demo"]');
    if (!form) return;
    var params;
    try { params = new URLSearchParams(window.location.search); } catch (e) { return; }
    CLAVES.forEach(function (clave) {
      var campo = form.querySelector('input[type="hidden"][name="' + clave + '"]');
      if (!campo) return;
      var valor = (params.get(clave) || '').trim().toLowerCase();
      campo.value = PATRON.test(valor) ? valor : '';
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
