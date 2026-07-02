/*
 * Alpha Robotics cookie consent banner.
 * Vanilla JS, no dependencies. Future analytics/marketing scripts must be loaded
 * only after the matching preference is true.
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
      if (!data.expires || Date.now() > data.expires) return null;
      return data;
    } catch (error) {
      return null;
    }
  }

  function saveConsent(preferences) {
    var payload = {
      version: "2026-06-15",
      updatedAt: now(),
      expires: Date.now() + ONE_YEAR_MS,
      preferences: {
        necessary: true,
        analytics: !!preferences.analytics,
        marketing: !!preferences.marketing
      }
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(payload));
    localStorage.setItem(PREFS_KEY, JSON.stringify(payload.preferences));
    window.dispatchEvent(new CustomEvent("alphaCookieConsentUpdated", { detail: payload.preferences }));
    applyConsent(payload.preferences);
    return payload;
  }

  function applyConsent(preferences) {
    // TODO: Load analytics scripts here only if preferences.analytics === true.
    // TODO: Load marketing pixels here only if preferences.marketing === true.
    document.documentElement.dataset.cookieAnalytics = preferences.analytics ? "granted" : "denied";
    document.documentElement.dataset.cookieMarketing = preferences.marketing ? "granted" : "denied";
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
      '<p>'+aT('Usamos almacenamiento técnico para recordar tus preferencias y mejorar el simulador ROI. La analítica y marketing quedan desactivados salvo consentimiento futuro.','We use technical storage to remember your preferences and improve the ROI simulator. Analytics and marketing remain disabled unless you consent in the future.')+'</p>' +
      '<a href="'+aT('cookies.html','/en/cookies')+'">'+aT('Política de cookies','Cookie policy')+'</a>' +
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
      applyConsent(stored.preferences);
      return;
    }
    createBanner();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
