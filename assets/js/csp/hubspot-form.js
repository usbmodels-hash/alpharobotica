/* hubspot-form.js - Alpha Robotics
 * Envia el formulario de contacto a HubSpot Forms Submissions API (Opcion B)
 * en paralelo al envio nativo a Netlify Forms (backup). Sin cookies de HubSpot.
 */
(function () {
  'use strict';

  var PORTAL_ID = '148817158';
  var FORM_GUID = 'ed283c38-85f7-4f73-a0e5-bbe61d2c73c5';
  var ENDPOINT = 'https://api.hsforms.com/submissions/v3/integration/submit/' + PORTAL_ID + '/' + FORM_GUID;

  // Mapa: valor del <select name="area"> (ES o EN) -> valor exacto de la propiedad de HubSpot (ES)
  var AREA_MAP = {
    'Limpieza aut\u00f3noma': 'Limpieza aut\u00f3noma',
    'Food & Beverage': 'Food & Beverage',
    'Room Service': 'Room Service',
    'Log\u00edstica interna': 'Log\u00edstica interna',
    'No lo tengo claro todav\u00eda': 'No lo tengo claro todav\u00eda',
    'Autonomous cleaning': 'Limpieza aut\u00f3noma',
    'Internal logistics': 'Log\u00edstica interna',
    'Not sure yet': 'No lo tengo claro todav\u00eda'
  };

  function val(form, name) {
    var el = form.elements[name];
    return el && typeof el.value === 'string' ? el.value.trim() : '';
  }

  function buildPayload(form) {
    var fields = [];
    function add(hsName, value) {
      if (value) fields.push({ name: hsName, value: value });
    }
    add('firstname', val(form, 'nombre'));
    add('email', val(form, 'email'));
    add('phone', val(form, 'telefono'));
    add('company', val(form, 'empresa'));
    add('message', val(form, 'mensaje'));

    var area = val(form, 'area');
    if (area) add('area_de_interes', AREA_MAP[area] || area);

    var consentEl = form.elements['privacidad'];
    var consented = !!(consentEl && consentEl.checked);

    var payload = {
      fields: fields,
      context: {
        pageUri: window.location.href,
        pageName: document.title
      }
    };

    if (consented) {
      payload.legalConsentOptions = {
        consent: {
          consentToProcess: true,
          text: 'Acepto que Alpha Robotics trate mis datos para responder a mi solicitud.'
        }
      };
    }
    return payload;
  }

  function sendToHubSpot(form) {
    try {
      var payload = buildPayload(form);
      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
        mode: 'cors',
        credentials: 'omit'
      }).catch(function () { /* silencioso: Netlify sigue siendo el respaldo */ });
    } catch (e) { /* no bloquear el envio nativo */ }
  }

  function init() {
    var form = document.getElementById('diagnostico-gratuito');
    if (!form) return;
    form.addEventListener('submit', function () {
      // Enviar a HubSpot y dejar que el envio nativo (Netlify) continue.
      sendToHubSpot(form);
    }, false);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
