/* plausible-init.js · v4148 — stub oficial de Plausible externalizado por CSP.
 * Define la cola window.plausible y configura el endpoint por el proxy first-party /stats. */
window.plausible = window.plausible || function () { (window.plausible.q = window.plausible.q || []).push(arguments); };
window.plausible.init = window.plausible.init || function (i) { window.plausible.o = i || {}; };
window.plausible.init({ endpoint: window.location.origin + '/stats/api/event' });
