(function(){
  // El formulario ES y el EN usan valores distintos en el select de area,
  // y el mensaje generado debe ir en el idioma de la pagina.
  const LANG = (document.documentElement.lang || 'es').toLowerCase().indexOf('en') === 0 ? 'en' : 'es';

  const mappings = {
    'limpieza': {
      value: { es: 'Limpieza autónoma', en: 'Autonomous cleaning' },
      family: 'KLEENBOT',
      area: { es: 'limpieza autónoma', en: 'autonomous cleaning' }
    },
    'fnb': {
      value: { es: 'Food & Beverage', en: 'Food & Beverage' },
      family: 'DINERBOT',
      area: { es: 'sala y Food & Beverage', en: 'dining and Food & Beverage' }
    },
    'room-service': {
      value: { es: 'Room Service', en: 'Room Service' },
      family: 'BUTLERBOT',
      area: { es: 'room service', en: 'room service' }
    },
    'logistica': {
      value: { es: 'Logística interna', en: 'Internal logistics' },
      family: 'HEAVY LOAD',
      area: { es: 'logística interna', en: 'internal logistics' }
    }
  };

  const MSG = {
    es: function (f, a) { return 'Me interesa la familia ' + f + ' para ' + a + '.'; },
    en: function (f, a) { return 'I am interested in the ' + f + ' range for ' + a + '.'; }
  };

  function getAreaParam() {
    const searchArea = new URLSearchParams(window.location.search).get('area');
    if (searchArea) return searchArea;

    const hash = window.location.hash || '';
    const queryIndex = hash.indexOf('?');
    if (queryIndex === -1) return '';
    return new URLSearchParams(hash.slice(queryIndex + 1)).get('area') || '';
  }

  function getBaseHash() {
    return (window.location.hash || '').split('?')[0];
  }

  function hasContactHash() {
    const baseHash = getBaseHash();
    return baseHash === '#contacto' || baseHash === '#diagnostico-gratuito';
  }

  function cleanContactUrl() {
    if (!hasContactHash()) return;
    const cleanUrl = window.location.pathname + '#diagnostico-gratuito';
    window.history.replaceState(null, '', cleanUrl);
  }

  function scrollToContact(target, focusTarget) {
    if (!target) return;
    [80, 450, 1100, 2200].forEach(function(delay){
      window.setTimeout(function(){
        var root = document.documentElement;
        var previousBehavior = root.style.scrollBehavior;
        var headerOffset = window.matchMedia('(max-width: 900px)').matches ? 92 : 122;
        var targetTop = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        root.style.scrollBehavior = 'auto';
        window.scrollTo(0, Math.max(0, Math.round(targetTop)));
        root.style.scrollBehavior = previousBehavior;
        if (focusTarget) {
          focusTarget.focus({ preventScroll: true });
        }
      }, delay);
    });
  }

  function prefillContactArea() {
    const config = mappings[getAreaParam()];

    const form = document.querySelector('form[name="contacto-alpha"]');
    const directTarget = document.getElementById('diagnostico-gratuito');
    const contactSection = document.getElementById('contacto');
    const select = form ? form.querySelector('select[name="area"]') : null;
    const target = directTarget || form || contactSection;

    if (!config) {
      if (hasContactHash()) {
        scrollToContact(target, null);
      }
      return;
    }

    if (!form || !select) return;

    const wanted = config.value[LANG] || config.value.es;
    const optionExists = Array.from(select.options).some((option) => option.value === wanted);
    if (!optionExists) return;

    select.value = wanted;
    select.dispatchEvent(new Event('change', { bubbles: true }));

    const generatedMessages = [];
    Object.values(mappings).forEach(function(item){
      ['es', 'en'].forEach(function(l){ generatedMessages.push(MSG[l](item.family, item.area[l])); });
    });
    const message = form.querySelector('textarea[name="mensaje"], textarea[name="message"]');
    if (message && (!message.value.trim() || generatedMessages.indexOf(message.value.trim()) !== -1)) {
      message.value = MSG[LANG](config.family, config.area[LANG] || config.area.es);
    }

    cleanContactUrl();
    scrollToContact(target, select);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', prefillContactArea, { once: true });
  } else {
    prefillContactArea();
  }
  window.addEventListener('hashchange', prefillContactArea);
  window.addEventListener('pageshow', prefillContactArea);
})();
