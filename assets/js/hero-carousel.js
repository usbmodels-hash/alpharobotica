(() => {
  const hero = document.querySelector(".hero-carousel");
  if (!hero) return;

  document.documentElement.classList.remove("no-js");
  document.documentElement.classList.add("js");

  const slides = Array.from(hero.querySelectorAll(".hero-slide"));
  const dots = Array.from(hero.querySelectorAll("[data-dot]"));
  const prev = hero.querySelector("[data-prev]");
  const next = hero.querySelector("[data-next]");
  const chip = hero.querySelector("[data-chip]");
  const finder = hero.querySelector("#finder");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lang = (document.documentElement.lang || "es").toLowerCase().startsWith("en") ? "en" : "es";

  const slideMetaByLang = {
    es: [
      { label: "Butlerbot - Room service", href: "/room-service" },
      { label: "KEENON - Innovacion robotica", href: "/catalogo-keenon" },
      { label: "KLEENBOT - Limpieza autonoma", href: "/limpieza-autonoma" },
      { label: "DINERBOT - Atencion y sala", href: "/food-beverage" },
      { label: "HEAVY LOAD - Logistica y transporte", href: "/logistica-interna" }
    ],
    en: [
      { label: "Butlerbot - Room service", href: "/room-service" },
      { label: "KEENON - Robotic innovation", href: "/catalogo-keenon" },
      { label: "KLEENBOT - Autonomous cleaning", href: "/limpieza-autonoma" },
      { label: "DINERBOT - Dining room service", href: "/food-beverage" },
      { label: "HEAVY LOAD - Logistics and transport", href: "/logistica-interna" }
    ]
  };
  const slideMeta = slideMetaByLang[lang];

  let current = 0;
  let timer = null;

  const update = (index) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === current);
    });
    hero.setAttribute("data-active", String(current));
    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === current;
      dot.classList.toggle("is-active", active);
      dot.setAttribute("aria-selected", active ? "true" : "false");
    });
    if (chip && slideMeta[current]) {
      chip.textContent = slideMeta[current].label;
      chip.href = slideMeta[current].href;
    }
  };

  const stop = () => {
    if (timer) {
      window.clearInterval(timer);
      timer = null;
    }
  };

  const start = () => {
    if (reduceMotion || timer) return;
    timer = window.setInterval(() => update(current + 1), 5000);
  };

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      stop();
      update(Number(dot.dataset.dot || 0));
      start();
    });
  });

  prev?.addEventListener("click", () => {
    stop();
    update(current - 1);
    start();
  });

  next?.addEventListener("click", () => {
    stop();
    update(current + 1);
    start();
  });

  hero.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      stop();
      update(current - 1);
      start();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      stop();
      update(current + 1);
      start();
    }
  });


  // Gesto táctil (swipe) sobre las imágenes — móvil
  const slidesEl = hero.querySelector(".hero-slides");
  let touchStart = null;
  slidesEl?.addEventListener("touchstart", (event) => {
    const t = event.touches[0];
    touchStart = { x: t.clientX, y: t.clientY };
  }, { passive: true });
  slidesEl?.addEventListener("touchend", (event) => {
    if (!touchStart) return;
    const t = event.changedTouches[0];
    const dx = t.clientX - touchStart.x;
    const dy = t.clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) < 44 || Math.abs(dx) < Math.abs(dy) * 1.4) return;
    stop();
    update(dx < 0 ? current + 1 : current - 1);
    start();
  }, { passive: true });

  hero.addEventListener("mouseenter", stop);
  hero.addEventListener("mouseleave", start);
  hero.addEventListener("focusin", stop);
  hero.addEventListener("focusout", start);

  finder?.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(finder);
    const url = new URL(lang === "en" ? "/en/configurador" : "/configurador", window.location.origin);
    const vertical = formData.get("v");
    const area = formData.get("area");
    if (vertical) url.searchParams.set("v", vertical.toString());
    if (area) url.searchParams.set("area", area.toString());
    window.location.href = `${url.pathname}${url.search}`;
  });

  update(0);
  start();
})();
