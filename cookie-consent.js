/*
 * Alpha Robotics cookie consent banner.
 * Vanilla JS, no dependencies. Analytics starts only after explicit consent.
 */
(function () {
  var ALPHA_LANG = (document.documentElement.lang || "es").slice(0, 2);
  function aT(es, en) { return ALPHA_LANG === "en" ? en : es; }
  var CONSENT_KEY = "alpha_cookie_consent";
  var PREFS_KEY = "alpha_cookie_preferences";
  var ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

  function now() {
    return new Date().toISOString();
  }

  function getStoredConsent() {
    try {
      var raw = localStorage.getItem(CONSENT_KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (!Number.isFinite(data.expires) || Date.now() >= data.expires ||
          !data.preferences || typeof data.preferences.analytics !== "boolean" ||
          typeof data.preferences.marketing !== "boolean") return null;
      return data;
    } catch (error) {
      return null;
    }
  }

  function saveConsent(preferences) {
    var payload = {
      version: "2026-09-13",
      updatedAt: now(),
      expires: Date.now() + ONE_YEAR_MS,
      preferences: {
        necessary: true,
        analytics: !!preferences.analytics,
        marketing: !!preferences.marketing
      }
    };
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(payload));
      localStorage.setItem(PREFS_KEY, JSON.stringify(payload.preferences));
    } catch (error) { /* The choice still applies to this page when storage is blocked. */ }
    applyConsent(payload.preferences, payload.expires);
    return payload;
  }

  function applyConsent(preferences, expires) {
    var valid = Number.isFinite(expires) && Date.now() < expires;
    document.documentElement.dataset.cookieAnalytics = valid && preferences.analytics === true ? "granted" : "denied";
    document.documentElement.dataset.cookieMarketing = valid && preferences.marketing === true ? "granted" : "denied";
    document.documentElement.dataset.cookieConsentExpires = valid ? String(expires) : "0";
    window.dispatchEvent(new CustomEvent("alphaCookieConsentUpdated", { detail: {
      necessary: true,
      analytics: valid && preferences.analytics === true,
      marketing: valid && preferences.marketing === true
    } }));
  }

  function closeBanner() {
    var banner = document.querySelector("[data-cookie-banner]");
    if (banner) banner.remove();
  }

  function createBanner() {
    if (document.querySelector("[data-cookie-banner]")) return;
    var wrapper = document.createElement("section");
    wrapper.className = "cookie-banner";
    wrapper.setAttribute("data-cookie-banner", "");
    wrapper.setAttribute("aria-label", aT("Preferencias de cookies", "Cookie preferences"));
    wrapper.innerHTML =
      '<div class="cookie-banner__copy">' +
      '<strong>'+aT('Privacidad y cookies','Privacy and cookies')+'</strong>' +
      '<p>'+aT('Usamos almacenamiento técnico para recordar tus preferencias y el simulador ROI. Solo activamos la analítica de uso de Plausible si la aceptas. Puedes rechazarla o cambiar tu decisión en cualquier momento. No usamos rastreadores publicitarios.','We use technical storage for your preferences and the ROI simulator. Plausible usage analytics starts only if you accept it. You can reject it or change your decision at any time. We do not use advertising trackers.')+'</p>' +
      '<a href="'+aT('/cookies','/en/cookies')+'">'+aT('Política de cookies','Cookie policy')+'</a>' +
      '</div>' +
      '<div class="cookie-banner__toggles" data-cookie-options hidden>' +
      '<label><input type="checkbox" checked disabled> '+aT('Necesarias','Necessary')+'</label>' +
      '<label><input type="checkbox" data-cookie-analytics> '+aT('Analítica','Analytics')+'</label>' +
      '<label><input type="checkbox" data-cookie-marketing> Marketing</label>' +
      '</div>' +
      '<div class="cookie-banner__actions">' +
      '<button type="button" class="btn secondary" data-cookie-config>'+aT('Configurar','Settings')+'</button>' +
      '<button type="button" class="btn secondary" data-cookie-reject>'+aT('Rechazar','Reject')+'</button>' +
      '<button type="button" class="btn primary" data-cookie-accept>'+aT('Aceptar','Accept')+'</button>' +
      '</div>';
    document.body.appendChild(wrapper);
  }

  function openSettings() {
    createBanner();
    var options = document.querySelector("[data-cookie-options]");
    if (options) options.hidden = false;
    var valid = Date.now() < Number(document.documentElement.dataset.cookieConsentExpires);
    var analytics = document.querySelector("[data-cookie-analytics]");
    var marketing = document.querySelector("[data-cookie-marketing]");
    if (analytics) analytics.checked = valid && document.documentElement.dataset.cookieAnalytics === "granted";
    if (marketing) marketing.checked = valid && document.documentElement.dataset.cookieMarketing === "granted";
  }

  function bindEvents() {
    document.addEventListener("click", function (event) {
      var target = event.target;
      if (!target) return;

      if (target.matches("[data-cookie-config], [data-cookie-settings]")) {
        openSettings();
      }

      if (target.matches("[data-cookie-reject]")) {
        saveConsent({ analytics: false, marketing: false });
        closeBanner();
      }

      if (target.matches("[data-cookie-accept]")) {
        var analytics = document.querySelector("[data-cookie-analytics]");
        var marketing = document.querySelector("[data-cookie-marketing]");
        var options = document.querySelector("[data-cookie-options]");
        saveConsent({
          analytics: options && !options.hidden ? !!analytics.checked : true,
          marketing: options && !options.hidden ? !!marketing.checked : false
        });
        closeBanner();
      }
    });
  }

  function init() {
    bindEvents();
    var stored = getStoredConsent();
    if (stored) {
      return;
    }
    createBanner();
  }

  // Establish the default before other DOMContentLoaded listeners track events.
  var initial = getStoredConsent();
  applyConsent(initial ? initial.preferences : {}, initial ? initial.expires : 0);
  window.addEventListener("storage", function (event) {
    if (event.key !== CONSENT_KEY && event.key !== null) return;
    var stored = getStoredConsent();
    applyConsent(stored ? stored.preferences : {}, stored ? stored.expires : 0);
    if (stored) closeBanner(); else createBanner();
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
