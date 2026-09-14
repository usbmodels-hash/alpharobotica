/* alpha-events.js · v3
 * Eventos de funnel para Plausible (cookieless, first-party via /stats proxy).
 * Sin dependencias. No-op silencioso si Plausible no está cargado o si el usuario
 * no ha aceptado la analítica o su preferencia ha caducado.
 * Eventos: hero_madlib_select, hero_madlib_submit, config_start, config_gate_submit,
 *          diag_form_start, diag_form_submit, form_thanks_view (vista de /gracias; no equivale
 *          a recepción en CRM), cta_whatsapp, cta_tel, cta_diagnostico, cta_demo_landing,
 *          diag_form_accepted (respuesta HTTP aceptada por el receptor; tampoco acredita
 *          el alta definitiva en CRM) y diag_form_error (error HTTP, de red o de cliente).
 * Atribución: utm_source/medium/campaign de la página de entrada, capturados al cargar o al
 * aceptar la analítica, nunca antes. Valores restringidos a códigos de campaña y canal
 * conocidos; lo que no encaja se descarta y se retira de la URL. Nunca se envían nombre,
 * email, teléfono, empresa ni mensaje.
 */
(function () {
  'use strict';

  function track(name, props) {
    try {
      if (document.documentElement.dataset.cookieAnalytics !== 'granted' ||
          !(Date.now() < Number(document.documentElement.dataset.cookieConsentExpires || 0))) return;
      if (typeof window.plausible === 'function') {
        var p = props || {};
        p.page = window.location.pathname;
        var a = attribution();
        for (var k in a) { if (a[k] && !p[k]) p[k] = a[k]; }
        window.plausible(name, { props: p });
      }
    } catch (e) { /* nunca romper la página por analítica */ }
  }

  /* ---------- Fuente de entrada de la sesión ----------
   * Política de valores admitidos. Solo se aceptan las tres claves esperadas y
   * valores con forma de código de campaña o canal: minúsculas, dígitos y . _ -
   * Cualquier otra cosa (arrobas, espacios, %, URL, texto libre) se descarta sin
   * enviarla ni guardarla, y sin devolver el valor en ningún mensaje.
   * La atribución solo se escribe con consentimiento analítico vigente, y se
   * borra al rechazar, retirar o caducar la preferencia.
   */
  var CLAVES_UTM = ['utm_source', 'utm_medium', 'utm_campaign'];
  var PATRON_UTM = /^[a-z0-9][a-z0-9._-]{0,39}$/;
  var MEDIOS = ['cpc', 'ppc', 'paid', 'display', 'banner', 'email', 'newsletter', 'social',
                'paid_social', 'organic', 'organic_social', 'referral', 'affiliate', 'video',
                'qr', 'print', 'partner', 'none'];
  var DOMINIO_PROPIO = /(^|\.)alpharobotica\.com$/i;

  function utmValido(clave, valor) {
    if (typeof valor !== 'string') return false;
    var v = valor.toLowerCase();
    if (v !== valor) return false;                 // no normalizamos: exigimos el código tal cual
    if (!PATRON_UTM.test(v)) return false;
    if (clave === 'utm_medium') return MEDIOS.indexOf(v) !== -1;
    return true;
  }

  function consentimientoVigente() {
    var d = document.documentElement.dataset;
    return d.cookieAnalytics === 'granted' &&
           Date.now() < Number(d.cookieConsentExpires || 0);
  }

  function limpiar(objeto) {
    // Revalida al leer: puede haber datos antiguos guardados sin filtrar.
    var out = {};
    if (!objeto || typeof objeto !== 'object') return out;
    CLAVES_UTM.forEach(function (k) {
      if (utmValido(k, objeto[k])) out[k] = objeto[k];
    });
    return out;
  }

  function leerAtribucion() {
    try {
      var bruto = window.sessionStorage.getItem('alphaAttribution');
      if (!bruto) return {};
      return limpiar(JSON.parse(bruto));           // JSON inválido -> catch -> {}
    } catch (e) { return {}; }
  }

  function borrarAtribucion() {
    try { window.sessionStorage.removeItem('alphaAttribution'); } catch (e) { /* sin almacenamiento */ }
  }

  // Retira de la barra de direcciones las UTM que no pasan la política, para que
  // no viajen tampoco en la URL que el proveedor envía con cada evento. Las
  // campañas válidas se conservan intactas.
  function depurarUrl() {
    try {
      if (!window.history || !window.history.replaceState) return;
      var url = new URL(window.location.href);
      var tocado = false;
      CLAVES_UTM.forEach(function (k) {
        if (url.searchParams.has(k) && !utmValido(k, url.searchParams.get(k))) {
          url.searchParams.delete(k);
          tocado = true;
        }
      });
      if (tocado) window.history.replaceState(null, '', url.pathname + url.search + url.hash);
    } catch (e) { /* nunca romper la navegación por esto */ }
  }

  function capturarAtribucion() {
    if (!consentimientoVigente()) return;
    try {
      if (Object.keys(leerAtribucion()).length) return;   // no sobrescribir una fuente válida
      var out = {};
      var q = new URLSearchParams(window.location.search);
      CLAVES_UTM.forEach(function (k) {
        var v = q.get(k);
        if (v !== null && utmValido(k, v)) out[k] = v;
      });
      if (!out.utm_source && document.referrer) {
        var h = '';
        try { h = new URL(document.referrer).hostname.toLowerCase(); } catch (e) { h = ''; }
        // Un salto desde nuestro propio dominio o subdominio no es adquisición externa.
        if (h && h !== window.location.hostname && !DOMINIO_PROPIO.test(h) && PATRON_UTM.test(h)) {
          out.utm_source = h;
          out.utm_medium = 'referral';
        }
      }
      if (Object.keys(out).length) {
        window.sessionStorage.setItem('alphaAttribution', JSON.stringify(out));
      }
    } catch (e) { /* almacenamiento bloqueado: seguimos sin atribución */ }
  }

  function attribution() {
    return consentimientoVigente() ? leerAtribucion() : {};
  }

  depurarUrl();
  capturarAtribucion();
  window.addEventListener('alphaCookieConsentUpdated', function () {
    if (consentimientoVigente()) capturarAtribucion();
    else borrarAtribucion();
  });

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else { fn(); }
  }

  // El receptor emite su estado operativo en alphaHubSpotSubmission. Se registra aqui para
  // separar el intento (diag_form_submit) de la aceptacion HTTP y del error. «accepted» acredita
  // una respuesta HTTP del receptor, no el alta definitiva del contacto en el CRM.
  window.addEventListener('alphaHubSpotSubmission', function (ev) {
    var d = (ev && ev.detail) || {};
    if (d.state === 'pending') return;
    if (d.state === 'accepted') {
      track('diag_form_accepted', { form: d.form || 'contacto-alpha', http: String(d.httpStatus || '') });
    } else {
      track('diag_form_error', { form: d.form || 'contacto-alpha', motivo: String(d.state || 'desconocido'),
                                 http: String(d.httpStatus || '') });
    }
  });

  ready(function () {
    var isConfigurador = /\/configurador\/?$/.test(window.location.pathname) ||
                         /\/en\/configurador\/?$/.test(window.location.pathname);

    /* ---------- 1 · Mad-lib del hero (home ES/EN) ---------- */
    // Selectores tolerantes: cualquier <select> dentro del hero / primera sección con h1.
    var hero = document.querySelector('header + section, .hero, #inicio, main > section');
    if (hero && hero.querySelector('h1')) {
      var madlibSelects = hero.querySelectorAll('select');
      var madlibFired = false;
      madlibSelects.forEach ? madlibSelects.forEach(bindSel) : Array.prototype.forEach.call(madlibSelects, bindSel);
      function bindSel(sel) {
        sel.addEventListener('change', function () {
          if (!madlibFired) { madlibFired = true; track('hero_madlib_select'); }
        });
      }
      // El envío del selector se mide sobre el formulario #finder, no sobre el texto
      // del botón: ese texto cambia con el idioma y con las revisiones de copy.
      // En fase de captura, para emitir antes de que hero-carousel.js navegue.
      // El evento submit solo se dispara si la validación del formulario pasa,
      // así que no se mide un envío que el navegador bloquea.
      var finder = document.getElementById('finder');
      if (finder) {
        finder.addEventListener('submit', function () {
          track('hero_madlib_submit');
        }, true);
      }
    }

    /* ---------- 2 · Configurador: inicio y gate ---------- */
    if (isConfigurador) {
      var started = false;
      document.addEventListener('input', function (ev) {
        if (started) return;
        var el = ev.target;
        if (el && (el.tagName === 'INPUT' || el.tagName === 'SELECT' || el.tagName === 'TEXTAREA')) {
          // Ignorar el propio gate (tiene campo email + checkbox privacidad)
          var form = el.closest ? el.closest('form') : null;
          if (form && form.querySelector('input[type="email"]')) return;
          started = true;
          track('config_start');
        }
      }, true);
    }

    /* ---------- 2b · Inicio de formulario de contacto (primera interacción) ---------- */
    var formStarted = {};
    document.addEventListener('input', function (ev) {
      var el = ev.target;
      var form = el && el.closest ? el.closest('form') : null;
      if (!form) return;
      var fn = form.querySelector('input[name="form-name"]');
      var formName = fn ? fn.value : (form.getAttribute('name') || '');
      if (formName !== 'contacto-alpha' && formName !== 'leads-demo') return;
      if (formStarted[formName]) return;
      formStarted[formName] = true;
      track('diag_form_start', { form: formName });
    }, true);

    /* ---------- 2c · Vista de la página de gracias (tras envío correcto del formulario) ---------- */
    if (/^\/(en\/)?gracias\/?$/.test(window.location.pathname)) {
      var thanksSent = false;
      var sendThanks = function () {
        if (thanksSent || document.documentElement.dataset.cookieAnalytics !== 'granted') return;
        thanksSent = true; track('form_thanks_view');
      };
      sendThanks(); window.addEventListener('alphaCookieConsentUpdated', sendThanks);
    }

    /* ---------- 3 · Formularios: gate del configurador y diagnóstico ---------- */
    document.addEventListener('submit', function (ev) {
      var form = ev.target;
      if (!form || form.tagName !== 'FORM') return;
      var hasEmail = !!form.querySelector('input[type="email"]');
      if (!hasEmail) return;
      var fn = form.querySelector('input[name="form-name"]');
      var formName = fn ? fn.value : (form.getAttribute('name') || '');
      if (formName === 'lead-magnet-guia-costes') {
        track('lead_magnet_submit');
      } else if (isConfigurador) {
        track('config_gate_submit');
      } else {
        // Formulario de diagnóstico (home u otras páginas)
        track('diag_form_submit');
      }
    }, true);

    /* ---------- 4 · CTAs de contacto (delegación global) ---------- */
    document.addEventListener('click', function (ev) {
      var a = ev.target && ev.target.closest ? ev.target.closest('a') : null;
      if (!a) return;
      var href = a.getAttribute('href') || '';
      if (href.indexOf('wa.me') !== -1 || href.indexOf('whatsapp') !== -1) {
        track('cta_whatsapp');
      } else if (href.indexOf('tel:') === 0) {
        track('cta_tel');
      } else if (href.indexOf('#diagnostico-gratuito') !== -1) {
        track('cta_diagnostico');
      } else if (href.indexOf('landing.alpharobotica.com') !== -1) {
        track('cta_demo_landing');
      }
    }, true);
  });
})();
