/* industria.js · landing industrial.
 * 1) Formulario: sincroniza el tipo de solicitud (valoración/demostración) con el
 *    botón y el asunto del aviso, y los chips de interés con el desplegable.
 *    Misma lógica que la landing de hoteles, sin la parte de YouTube.
 * 2) Vídeos de producto alojados en el propio sitio: solo se cargan al pulsar.
 *    Sin JavaScript queda el enlace directo al MP4.
 */
(function () {
  'use strict';

  var form = document.querySelector('form[name="leads-demo"]');
  if (form) {
    var request = form.querySelector('[name="solicitud"]');
    var interest = form.querySelector('[name="interes"]');
    var subject = form.querySelector('[name="subject"]');
    var submit = form.querySelector('[type="submit"]');
    function syncRequest() {
      var demo = request.value === 'demostracion';
      submit.textContent = demo ? 'Solicitar demostración →' : 'Solicitar primera valoración →';
      subject.value = demo ? 'Alpha Robótica · Solicitud de demostración para nave industrial' : 'Alpha Robótica · Solicitud de valoración para nave industrial';
    }
    function syncInterest() {
      document.querySelectorAll('[data-interes]').forEach(function (item) {
        if (item.getAttribute('data-interes') === interest.value) item.setAttribute('aria-current', 'true');
        else item.removeAttribute('aria-current');
      });
    }
    document.addEventListener('click', function (event) {
      var link = event.target.closest ? event.target.closest('a') : null;
      if (!link) return;
      var requested = link.getAttribute('data-solicitud');
      var need = link.getAttribute('data-interes');
      if (requested === 'valoracion' || requested === 'demostracion') {
        request.value = requested;
        syncRequest();
      }
      if (need) {
        interest.value = need;
        request.value = 'valoracion';
        syncRequest();
        syncInterest();
      }
    });
    request.addEventListener('change', syncRequest);
    interest.addEventListener('change', syncInterest);
    syncRequest();
    syncInterest();
  }

  document.querySelectorAll('.demo[data-video]').forEach(function (demo) {
    var stage = demo.querySelector('.demo-stage');
    var button = demo.querySelector('.demo-load');
    var poster = demo.querySelector('img');
    if (!stage || !button || !poster) return;
    button.addEventListener('click', function () {
      var video = document.createElement('video');
      video.controls = true;
      video.playsInline = true;
      video.preload = 'metadata';
      video.poster = poster.getAttribute('src');
      video.setAttribute('aria-label', poster.getAttribute('alt') || 'Vídeo del producto');
      var source = document.createElement('source');
      source.src = demo.getAttribute('data-video');
      source.type = 'video/mp4';
      video.appendChild(source);
      stage.replaceChildren(video);
      var p = video.play();
      if (p && typeof p.catch === 'function') p.catch(function () { /* el visitante pulsa reproducir */ });
      video.focus();
    });
  });
})();
