(function(){
  const nav = document.querySelector('[data-catalog-subnav], .catalog-subnav');
  if (!nav) return;

  const hero = document.querySelector('.catalog-hero-fused');
  const links = Array.from(nav.querySelectorAll('a[href^="#"]'));
  const sections = links
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  function setCurrent(id) {
    links.forEach((link) => {
      const active = link.getAttribute('href') === '#' + id;
      if (active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }

  function updateVisibility() {
    if (!hero) {
      nav.classList.add('is-visible');
      return;
    }
    const offset = window.matchMedia('(max-width: 700px)').matches ? 66 : 74;
    const showPoint = hero.offsetTop + hero.offsetHeight - offset;
    const show = window.scrollY >= showPoint;
    nav.classList.toggle('is-visible', show);
  }

  if (!sections.length) {
    const first = links[0];
    if (first) first.setAttribute('aria-current', 'true');
    return;
  }

  let ticking = false;
  function updateCurrent() {
    ticking = false;
    updateVisibility();
    const probe = Math.max(180, Math.round(window.innerHeight * 0.45));
    let active = sections[0];
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= probe) active = section;
    });
    if (active && active.id) setCurrent(active.id);
  }

  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateCurrent);
  }

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  window.addEventListener('hashchange', () => window.setTimeout(updateCurrent, 80));
  window.setTimeout(updateCurrent, 120);
})();
