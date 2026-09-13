/* Plausible consent adapter. Keeps the existing first-party proxy and property.
 * No analytics script or event request before a valid positive choice.
 * The transport check also covers engagement requests made by tracker v36,
 * which do not pass through Plausible's transformRequest callback.
 */
(function () {
  'use strict';
  var requested = false;
  var ready = false;
  var active = false;
  var endpoint = window.location.origin + '/stats/api/event';

  function allowed() {
    var state = document.documentElement.dataset;
    return state.cookieAnalytics === 'granted' &&
      Date.now() < Number(state.cookieConsentExpires);
  }

  var originalFetch = window.fetch;
  window.fetch = function (resource) {
    var url;
    try { url = new URL(typeof resource === 'string' ? resource : resource.url || String(resource), window.location.href); }
    catch (error) { return originalFetch.apply(window, arguments); }
    if (url.origin + url.pathname === endpoint && !allowed()) {
      return Promise.resolve(new Response(null, { status: 204 }));
    }
    return originalFetch.apply(window, arguments);
  };

  window.plausible = function () {
    if (!allowed()) return;
    (window.plausible.q = window.plausible.q || []).push(arguments);
  };
  window.plausible.init = function (options) { window.plausible.o = options; };

  function update() {
    if (!allowed()) {
      var wasActive = active;
      active = false;
      window.plausible.q = [];
      // A filtered pageview closes v36's engagement session without sending it.
      // The transport check remains authoritative for every later request.
      if (ready && wasActive) window.plausible('pageview');
      return;
    }
    if (active) return;
    active = true;
    if (ready) { window.plausible('pageview'); return; }
    if (requested) return;
    requested = true;
    window.plausible.init({
      endpoint: endpoint,
      transformRequest: function (payload) { return allowed() ? payload : null; }
    });
    var script = document.createElement('script');
    script.src = '/stats/js/script.js';
    script.async = true;
    script.onload = function () {
      ready = true;
      if (!allowed()) { window.plausible.q = []; window.plausible('pageview'); }
    };
    script.onerror = function () { requested = false; active = false; script.remove(); };
    document.head.appendChild(script);
  }
  window.addEventListener('alphaCookieConsentUpdated', update);
  update();
})();
