(function(){
  const mappings = {
    'limpieza': {
      value: 'Limpieza autónoma',
      family: 'KLEENBOT',
      area: 'limpieza autónoma'
    },
    'fnb': {
      value: 'Food & Beverage',
      family: 'DINERBOT',
      area: 'sala y Food & Beverage'
    },
    'room-service': {
      value: 'Room Service',
      family: 'BUTLERBOT',
      area: 'room service'
    },
    'logistica': {
      value: 'Logística interna',
      family: 'HEAVY LOAD',
      area: 'logística interna'
    }
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

    const optionExists = Array.from(select.options).some((option) => option.value === config.value);
    if (!optionExists) return;

    select.value = config.value;
    select.dispatchEvent(new Event('change', { bubbles: true }));

    const generatedMessages = Object.values(mappings).map(function(item){
      return 'Me interesa la familia ' + item.family + ' para ' + item.area + '.';
    });
    const message = form.querySelector('textarea[name="mensaje"], textarea[name="message"]');
    if (message && (!message.value.trim() || generatedMessages.indexOf(message.value.trim()) !== -1)) {
      message.value = 'Me interesa la familia ' + config.family + ' para ' + config.area + '.';
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
