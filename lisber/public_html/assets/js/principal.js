/* LISBER · principal.js · modos, acordeón, formularios y UTM. Sin dependencias. */
(function () {
  "use strict";

  var A = window.LISBER || {};
  var MODO = A.MODO === "lanzado" ? "lanzado" : "prelanzamiento";
  var EMAIL = A.EMAIL_CONTACTO || "";

  /* ---------- Modo ---------- */
  document.documentElement.setAttribute("data-modo", MODO);
  document.querySelectorAll("[data-solo-modo]").forEach(function (el) {
    if (el.getAttribute("data-solo-modo") === MODO) { el.setAttribute("data-visible", ""); } else { el.remove(); }
  });
  // Los enlaces a Amazon solo existen en el DOM en modo lanzado.
  if (MODO === "lanzado" && A.URL_AMAZON && A.URL_AMAZON.charAt(0) !== "[") {
    document.querySelectorAll("[data-amazon]").forEach(function (el) {
      var a = document.createElement("a");
      a.className = el.getAttribute("data-clase") || "boton boton--principal";
      a.href = A.URL_AMAZON;
      a.target = "_blank";
      a.rel = "noopener sponsored";
      a.textContent = el.getAttribute("data-texto") || "Comprar en Amazon";
      el.replaceWith(a);
    });
    if (A.CODIGO_PROMO && A.CODIGO_PROMO.charAt(0) !== "[") {
      document.querySelectorAll("[data-codigo-promo]").forEach(function (el) {
        el.textContent = A.CODIGO_PROMO;
        el.closest("[data-si-codigo]") && el.closest("[data-si-codigo]").removeAttribute("hidden");
      });
    }
  } else {
    document.querySelectorAll("[data-amazon]").forEach(function (el) { el.remove(); });
  }
  document.querySelectorAll("[data-texto-oferta]").forEach(function (el) {
    var t = (A.TEXTO_OFERTA || "").trim();
    if (t && t.charAt(0) !== "[") { el.textContent = t; } else { el.remove(); }
  });
  document.querySelectorAll("[data-email-contacto]").forEach(function (el) {
    if (!EMAIL || EMAIL.charAt(0) === "[") { return; }
    el.textContent = EMAIL;
    if (el.tagName === "A") { el.href = "mailto:" + EMAIL; }
  });
  document.querySelectorAll("[data-anio]").forEach(function (el) { el.textContent = String(new Date().getFullYear()); });

  /* ---------- Acordeón accesible ---------- */
  document.querySelectorAll(".acordeon").forEach(function (ac) {
    var botones = ac.querySelectorAll(".acordeon__boton");
    botones.forEach(function (b, i) {
      b.addEventListener("click", function () {
        var abierto = b.getAttribute("aria-expanded") === "true";
        b.setAttribute("aria-expanded", abierto ? "false" : "true");
        document.getElementById(b.getAttribute("aria-controls")).hidden = abierto;
      });
      b.addEventListener("keydown", function (e) {
        var destino = null;
        if (e.key === "ArrowDown") { destino = botones[(i + 1) % botones.length]; }
        if (e.key === "ArrowUp") { destino = botones[(i - 1 + botones.length) % botones.length]; }
        if (e.key === "Home") { destino = botones[0]; }
        if (e.key === "End") { destino = botones[botones.length - 1]; }
        if (destino) { e.preventDefault(); destino.focus(); }
      });
    });
  });

  /* ---------- UTM ---------- */
  var params = new URLSearchParams(window.location.search);
  ["utm_source", "utm_medium", "utm_campaign"].forEach(function (k) {
    var v = params.get(k);
    if (!v) { return; }
    document.querySelectorAll("input[name='" + k + "']").forEach(function (el) { el.value = v.slice(0, 100); });
  });

  /* ---------- Formularios ---------- */
  var RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function marcarError(campo, mensaje) {
    var caja = campo.closest(".campo");
    var err = caja ? caja.querySelector(".campo__error") : null;
    if (mensaje) {
      caja && caja.setAttribute("data-invalido", "");
      campo.setAttribute("aria-invalid", "true");
      if (err) { err.textContent = mensaje; }
    } else {
      caja && caja.removeAttribute("data-invalido");
      campo.removeAttribute("aria-invalid");
      if (err) { err.textContent = ""; }
    }
  }

  function validar(form) {
    var ok = true, primero = null;
    var email = form.querySelector("input[name='email']");
    var consentimiento = form.querySelector("input[name='consentimiento']");
    var origen = form.querySelector("select[name='tienda']");
    if (email) {
      var v = email.value.trim();
      if (!v) { marcarError(email, "Escribe tu correo."); ok = false; primero = primero || email; }
      else if (!RE_EMAIL.test(v)) { marcarError(email, "Revisa el correo: parece que falta algo."); ok = false; primero = primero || email; }
      else { marcarError(email, ""); }
    }
    if (origen) {
      if (!origen.value) { marcarError(origen, "Dinos dónde la compraste."); ok = false; primero = primero || origen; }
      else { marcarError(origen, ""); }
    }
    if (consentimiento) {
      if (!consentimiento.checked) { marcarError(consentimiento, "Necesitamos tu permiso para escribirte."); ok = false; primero = primero || consentimiento; }
      else { marcarError(consentimiento, ""); }
    }
    if (primero) { primero.focus(); }
    return ok;
  }

  document.querySelectorAll("form[data-formulario]").forEach(function (form) {
    var estado = form.querySelector(".formulario__estado");
    var boton = form.querySelector("button[type='submit']");
    form.setAttribute("novalidate", "");

    form.querySelectorAll("input, select").forEach(function (c) {
      c.addEventListener("input", function () { if (c.getAttribute("aria-invalid")) { validar(form); } });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      estado.textContent = "";
      estado.removeAttribute("data-tipo");
      if (!validar(form)) { return; }

      var datos = new FormData(form);
      var textoOriginal = boton.textContent;
      boton.disabled = true;
      boton.textContent = "Enviando…";

      var controlador = ("AbortController" in window) ? new AbortController() : null;
      var temporizador = controlador ? setTimeout(function () { controlador.abort(); }, 15000) : null;

      fetch(form.getAttribute("action"), {
        method: "POST",
        body: datos,
        headers: { "Accept": "application/json", "X-Requested-With": "fetch" },
        credentials: "same-origin",
        signal: controlador ? controlador.signal : undefined
      }).then(function (r) {
        return r.json().then(function (j) { return { ok: r.ok, json: j }; });
      }).then(function (res) {
        if (res.ok && res.json && res.json.estado === "ok") {
          window.location.assign(form.getAttribute("data-gracias") || "/gracias/");
          return;
        }
        if (res.json && res.json.estado === "invalido" && res.json.campo) {
          var campo = form.querySelector("[name='" + res.json.campo + "']");
          if (campo) { marcarError(campo, res.json.mensaje || "Revisa este campo."); campo.focus(); }
          else { fallo(); }
          return;
        }
        fallo();
      }).catch(fallo).finally(function () {
        if (temporizador) { clearTimeout(temporizador); }
        boton.disabled = false;
        boton.textContent = textoOriginal;
      });

      function fallo() {
        estado.setAttribute("data-tipo", "error");
        estado.textContent = "No hemos podido guardar tu correo. Inténtalo de nuevo en un momento o escríbenos a " + EMAIL + ".";
      }
    });
  });

  /* ---------- Analítica sin cookies (desactivada) ----------
     Cuando se quiera medir visitas sin cookies, descomentar este bloque
     y añadir el dominio del proveedor a la Content-Security-Policy del .htaccess.
     Ejemplo (Plausible, autoalojado o de pago):
       var s = document.createElement("script");
       s.defer = true; s.setAttribute("data-domain", "lisber.eu");
       s.src = "https://plausible.io/js/script.js";
       document.head.appendChild(s);
  ------------------------------------------------------------ */
})();
