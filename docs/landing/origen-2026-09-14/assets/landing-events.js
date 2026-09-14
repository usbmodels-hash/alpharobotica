/* landing-events.js · v5 (solo con consentimiento analítico) — eventos de funnel de la landing para Plausible (cookieless, first-party).
 * Eventos: cta_demo (enlace a #contacto), cta_whatsapp, cta_email, cta_ficha (enlace a ficha técnica),
 *          diag_form_start (primera interacción con el formulario), diag_form_submit (envío del formulario),
 *          form_thanks_view (vista de /gracias; no equivale a recepción en CRM). No-op si Plausible no carga. */
(function () {
  'use strict';
  function track(name, props) {
    try {
      if (document.documentElement.dataset.cookieAnalytics !== 'granted' ||
          !(Date.now() < Number(document.documentElement.dataset.cookieConsentExpires || 0))) return;
      if (typeof window.plausible === 'function') {
        var p = props || {}; p.page = window.location.pathname;
        window.plausible(name, { props: p });
      }
    } catch (e) { /* nunca romper la página por analítica */ }
  }
  function ready(fn) { if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', fn); } else { fn(); } }
  ready(function () {
    if (/^\/gracias\/?$/.test(window.location.pathname)) {
      var thanksSent = false;
      var sendThanks = function () {
        if (thanksSent || document.documentElement.dataset.cookieAnalytics !== 'granted') return;
        thanksSent = true; track('form_thanks_view');
      };
      sendThanks(); window.addEventListener('alphaCookieConsentUpdated', sendThanks);
    }
    var started = false;
    document.addEventListener('input', function (ev) {
      var form = ev.target && ev.target.closest ? ev.target.closest('form') : null;
      if (!form || started) return;
      started = true; track('diag_form_start', { form: form.getAttribute('name') || '' });
    }, true);
    document.addEventListener('submit', function (ev) {
      var form = ev.target;
      if (!form || form.tagName !== 'FORM') return;
      track('diag_form_submit', { form: form.getAttribute('name') || '' });
    }, true);
    document.addEventListener('click', function (ev) {
      var a = ev.target && ev.target.closest ? ev.target.closest('a') : null;
      if (!a) return;
      var href = a.getAttribute('href') || '';
      if (href.indexOf('wa.me') !== -1) { track('cta_whatsapp'); }
      else if (href.indexOf('mailto:') === 0) { track('cta_email'); }
      else if (href === '#contacto') { track('cta_demo'); }
      else if (a.classList.contains('ficha')) { track('cta_ficha', { href: href }); }
    }, true);
  });
})();
