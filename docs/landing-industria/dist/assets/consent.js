/* consent.js · landing v5 — consentimiento de analítica (mismo comportamiento que alpharobotica.com).
 * La analítica de Plausible solo se activa tras una elección positiva; rechazo por defecto, caducidad a 12 meses,
 * retirada desde el footer y sincronización entre pestañas. Sin cookies ni rastreadores publicitarios. */
(function () {
  'use strict';
  var KEY = 'alpha_cookie_consent';
  var ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
  function stored() {
    try {
      var raw = localStorage.getItem(KEY); if (!raw) return null;
      var d = JSON.parse(raw);
      if (!Number.isFinite(d.expires) || Date.now() >= d.expires || !d.preferences || typeof d.preferences.analytics !== 'boolean') return null;
      return d;
    } catch (e) { return null; }
  }
  function apply(prefs, expires) {
    var valid = Number.isFinite(expires) && Date.now() < expires;
    var root = document.documentElement;
    root.dataset.cookieAnalytics = valid && prefs.analytics === true ? 'granted' : 'denied';
    root.dataset.cookieMarketing = 'denied';
    root.dataset.cookieConsentExpires = valid ? String(expires) : '0';
    window.dispatchEvent(new CustomEvent('alphaCookieConsentUpdated', { detail: { necessary: true, analytics: valid && prefs.analytics === true, marketing: false } }));
  }
  function save(analytics) {
    var payload = { version: '2026-09-13', updatedAt: new Date().toISOString(), expires: Date.now() + ONE_YEAR_MS, preferences: { necessary: true, analytics: !!analytics, marketing: false } };
    try { localStorage.setItem(KEY, JSON.stringify(payload)); } catch (e) { /* la elección se aplica en esta página aunque el almacenamiento esté bloqueado */ }
    apply(payload.preferences, payload.expires);
  }
  function close() { var b = document.querySelector('[data-cookie-banner]'); if (b) b.remove(); document.documentElement.classList.remove('cookie-open'); }
  function open() {
    if (document.querySelector('[data-cookie-banner]')) return;
    var s = document.createElement('section');
    s.className = 'cookie-banner'; s.setAttribute('data-cookie-banner', ''); s.setAttribute('aria-label', 'Preferencias de cookies');
    s.innerHTML = '<div class="cookie-banner__copy"><strong>Privacidad y cookies</strong>' +
      '<p>Usamos almacenamiento técnico para recordar tu elección. Solo activamos la analítica de uso de Plausible si la aceptas; puedes rechazarla o cambiar tu decisión en cualquier momento. No usamos rastreadores publicitarios.</p>' +
      '<a href="https://alpharobotica.com/cookies">Política de cookies</a></div>' +
      '<div class="cookie-banner__actions"><button type="button" class="cb-btn cb-reject" data-cookie-reject>Rechazar</button><button type="button" class="cb-btn cb-accept" data-cookie-accept>Aceptar</button></div>';
    document.body.appendChild(s); document.documentElement.classList.add('cookie-open');
  }
  document.addEventListener('click', function (e) {
    var t = e.target; if (!t || !t.closest) return;
    if (t.closest('[data-cookie-reject]')) { save(false); close(); }
    else if (t.closest('[data-cookie-accept]')) { save(true); close(); }
    else if (t.closest('[data-cookie-settings]')) { e.preventDefault(); open(); }
  });
  var initial = stored();
  apply(initial ? initial.preferences : {}, initial ? initial.expires : 0);
  window.addEventListener('storage', function (ev) {
    if (ev.key !== KEY && ev.key !== null) return;
    var s = stored(); apply(s ? s.preferences : {}, s ? s.expires : 0);
    if (s) close(); else open();
  });
  function init() { if (!stored()) open(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
