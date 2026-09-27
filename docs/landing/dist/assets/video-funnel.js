/* YouTube se activa por petición expresa. No guarda preferencias de vídeo.
 * La analítica de Alpha se comprueba en cada evento y nunca condiciona el vídeo.
 */
(function () {
  'use strict';
  var VIDEO = 'c3VMJ5Jl06Q';
  var load = document.getElementById('video-load');
  var mount = document.getElementById('video-mount');
  var close = document.getElementById('video-close');
  var status = document.getElementById('video-status');
  if (!load || !mount || !close || !status) return;
  var active = false;
  var player = null;
  var frame = null;
  var apiScript = null;
  var didStart = false;
  var didEnd = false;

  function track(name) {
    try {
      var state = document.documentElement.dataset;
      if (state.cookieAnalytics !== 'granted' || Date.now() >= Number(state.cookieConsentExpires || 0) || typeof window.plausible !== 'function') return false;
      window.plausible(name, { props: { video: VIDEO, page: window.location.pathname } });
      return true;
    } catch (e) { return false; }
  }
  function fail() {
    if (active) status.textContent = 'Si el vídeo no se reproduce aquí, puedes abrirlo en YouTube con el enlace de arriba.';
  }
  function connectPlayer() {
    if (!active || player || !window.YT || typeof window.YT.Player !== 'function') return;
    try {
      player = new window.YT.Player(frame, {
        events: {
          onReady: function () { if (active) status.textContent = 'Reproductor listo. Si no comienza, pulsa el botón de reproducción del vídeo.'; },
          onStateChange: function (event) {
            if (!active) return;
            if (event.data === 1) {
              status.textContent = '';
              if (!didStart) didStart = track('video_start');
            }
            // Es un evento de fin del reproductor; no demuestra que se hayan
            // visto todos los segundos (el visitante puede adelantar el vídeo).
            if (event.data === 0 && !didEnd) didEnd = track('video_end');
          },
          onError: fail
        }
      });
    } catch (e) { fail(); }
  }
  load.addEventListener('click', function (event) {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    if (active) return;
    active = true;
    didStart = false;
    didEnd = false;
    track('video_load');
    frame = document.createElement('iframe');
    frame.id = 'keenon-video-player';
    frame.title = 'KEENON Smart Hotel Solution · vídeo oficial de 1 minuto y 35 segundos';
    frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    frame.allowFullscreen = true;
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.src = 'https://www.youtube-nocookie.com/embed/' + VIDEO + '?autoplay=1&playsinline=1&rel=0&hl=es&enablejsapi=1&origin=' + encodeURIComponent(window.location.origin);
    mount.appendChild(frame);
    mount.hidden = false;
    load.hidden = true;
    close.hidden = false;
    status.textContent = 'Cargando el vídeo de YouTube…';
    frame.focus();
    if (window.YT && typeof window.YT.Player === 'function') { connectPlayer(); return; }
    var previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = function () {
      if (typeof previousReady === 'function') { try { previousReady(); } catch (e) {} }
      connectPlayer();
    };
    if (!apiScript) {
      apiScript = document.createElement('script');
      apiScript.src = 'https://www.youtube.com/iframe_api';
      apiScript.async = true;
      apiScript.onerror = fail;
      document.head.appendChild(apiScript);
    }
  });
  close.addEventListener('click', function () {
    active = false;
    if (player) { try { player.destroy(); } catch (e) {} }
    player = null;
    mount.replaceChildren();
    frame = null;
    mount.hidden = true;
    load.hidden = false;
    close.hidden = true;
    status.textContent = 'Vídeo cerrado. Puedes volver a activarlo cuando quieras.';
    load.focus();
  });

  var form = document.querySelector('form[name="leads-demo"]');
  if (!form) return;
  var request = form.querySelector('[name="solicitud"]');
  var interest = form.querySelector('[name="interes"]');
  var subject = form.querySelector('[name="subject"]');
  var submit = form.querySelector('[type="submit"]');
  function syncRequest() {
    var demo = request.value === 'demostracion';
    submit.textContent = demo ? 'Solicitar demostración →' : 'Solicitar primera valoración →';
    subject.value = demo ? 'Alpha Robótica · Solicitud de demostración para hotel o centro sanitario' : 'Alpha Robótica · Solicitud de valoración para hotel o centro sanitario';
  }
  function syncInterest() {
    document.querySelectorAll('[data-interes]').forEach(function (item) {
      if (item.getAttribute('data-interes') === interest.value) item.setAttribute('aria-current','true');
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
  form.addEventListener('submit', syncRequest);
  window.addEventListener('pageshow', function () { syncRequest(); syncInterest(); });
  syncRequest();
  syncInterest();
})();
