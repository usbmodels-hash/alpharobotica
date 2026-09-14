/* leadform-channel.js · canal preferido del formulario leads-demo.
 * Solo el dato del canal elegido es obligatorio. Nunca teléfono y email a la vez.
 * Si el script no carga, el formulario sigue siendo usable: el teléfono queda
 * obligatorio, que es el comportamiento anterior.
 */
(function () {
  'use strict';
  function init() {
    var form = document.querySelector('form[name="leads-demo"]');
    if (!form) return;
    var tel = form.querySelector('#lf-tel');
    var mail = form.querySelector('#lf-email');
    var radios = form.querySelectorAll('input[name="canal"]');
    if (!tel || !mail || !radios.length) return;

    function aplicar() {
      var canal = 'llamada';
      Array.prototype.forEach.call(radios, function (r) { if (r.checked) canal = r.value; });
      var porTel = canal === 'llamada';
      tel.required = porTel;
      mail.required = !porTel;
      // Un campo oculto o no aplicable no debe impedir el envio.
      tel.setAttribute('aria-required', String(porTel));
      mail.setAttribute('aria-required', String(!porTel));
      form.querySelectorAll('[data-req]').forEach(function (marca) {
        marca.hidden = marca.getAttribute('data-req') !== canal;
      });
    }

    Array.prototype.forEach.call(radios, function (r) {
      r.addEventListener('change', aplicar);
    });
    aplicar();

    // Evita el doble envio sin bloquear un reintento tras un error de red.
    var enviando = false;
    form.addEventListener('submit', function (ev) {
      if (enviando) { ev.preventDefault(); return; }
      enviando = true;
      window.setTimeout(function () { enviando = false; }, 8000);
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
