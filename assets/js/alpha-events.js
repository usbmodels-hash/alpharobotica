/* alpha-events.js · v2
 * Eventos de funnel para Plausible (cookieless, first-party via /stats proxy).
 * Sin dependencias. No-op silencioso si Plausible no está cargado.
 * Eventos: hero_madlib_select, hero_madlib_submit, config_start,
 *          config_gate_submit, diag_form_submit, cta_whatsapp, cta_tel, cta_diagnostico
 */
(function () {
  'use strict';

  function track(name, props) {
    try {
      if (typeof window.plausible === 'function') {
        var p = props || {};
        p.page = window.location.pathname;
        window.plausible(name, { props: p });
      }
    } catch (e) { /* nunca romper la página por analítica */ }
  }

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else { fn(); }
  }

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
      // Botón "Ver mis robots" / "See my robots"
      var links = hero.querySelectorAll('a, button');
      Array.prototype.forEach.call(links, function (el) {
        var t = (el.textContent || '').trim().toLowerCase();
        if (t.indexOf('ver mis robots') !== -1 || t.indexOf('see my robots') !== -1) {
          el.addEventListener('click', function () { track('hero_madlib_submit'); });
        }
      });
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
      }
    }, true);
  });
})();
