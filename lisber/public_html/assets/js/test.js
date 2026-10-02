/* LISBER · Test «¿Por qué altura empiezo?»
   Todos los textos y puntuaciones viven en DATOS_TEST. La lógica no necesita cambios. */
(function () {
  "use strict";

  var DATOS_TEST = {
    preguntas: [
      {
        clave: "POSTURA",
        texto: "¿Cómo duermes casi siempre?",
        opciones: [
          { texto: "Boca arriba", puntos: 0, valor: "boca_arriba" },
          { texto: "De lado", puntos: 2, valor: "de_lado" },
          { texto: "Cambio mucho de postura", puntos: 1, valor: "cambio" },
          { texto: "Boca abajo", puntos: 0, valor: "boca_abajo", especial: "boca_abajo" }
        ]
      },
      {
        clave: "HOMBROS",
        texto: "¿Cómo son tus hombros?",
        opciones: [
          { texto: "Estrechos", puntos: 0, valor: "estrechos" },
          { texto: "Normales", puntos: 1, valor: "normales" },
          { texto: "Anchos", puntos: 2, valor: "anchos" }
        ]
      },
      {
        clave: "COLCHON",
        texto: "¿Cómo es tu colchón?",
        opciones: [
          { texto: "Blando, me hundo", puntos: 0, valor: "blando" },
          { texto: "Intermedio", puntos: 1, valor: "intermedio" },
          { texto: "Firme", puntos: 2, valor: "firme" }
        ]
      },
      {
        clave: "ALTURA",
        texto: "¿Cómo notas tu almohada actual?",
        opciones: [
          { texto: "Me queda alta", puntos: -1, valor: "alta" },
          { texto: "Está bien", puntos: 0, valor: "bien" },
          { texto: "Me queda baja", puntos: 1, valor: "baja" }
        ]
      }
    ],
    resultados: {
      // Se evalúan en orden: el primero cuyo máximo cubra la suma.
      tramos: [
        { maximo: 2, altura: "12", titulo: "Empieza por el lado de 12 cm" },
        { maximo: 3, altura: "12", titulo: "Empieza por el lado de 12 cm y prueba el de 14 cm a los pocos días" },
        { maximo: Infinity, altura: "14", titulo: "Empieza por el lado de 14 cm" }
      ],
      especiales: {
        boca_abajo: { altura: "12", titulo: "Empieza por el lado de 12 cm. Esta almohada está pensada sobre todo para dormir boca arriba y de lado." }
      },
      nota: "La almohada trae las dos alturas, así que podrás probar ambas. Este test es orientativo y no sustituye el consejo de un profesional."
    },
    textos: {
      anterior: "Atrás",
      contador: "Pregunta {n} de {total}",
      repetir: "Repetir el test"
    }
  };

  var raiz = document.getElementById("test");
  if (!raiz) { return; }

  var pasos = raiz.querySelector(".test__pasos");
  var progreso = raiz.querySelector(".test__progreso");
  var resultado = raiz.querySelector(".test__resultado");
  var tituloResultado = raiz.querySelector(".test__resultado-titulo");
  var etiquetaResultado = raiz.querySelector(".test__etiqueta");
  var notaResultado = raiz.querySelector(".test__nota");
  var repetir = raiz.querySelector(".test__repetir");
  var respuestas = {};
  var actual = 0;
  var total = DATOS_TEST.preguntas.length;

  function construir() {
    pasos.innerHTML = "";
    DATOS_TEST.preguntas.forEach(function (p, i) {
      var paso = document.createElement("div");
      paso.className = "test__paso";
      paso.setAttribute("role", "group");
      paso.setAttribute("aria-labelledby", "test-p" + i);
      paso.dataset.indice = i;

      var contador = document.createElement("p");
      contador.className = "test__contador";
      contador.textContent = DATOS_TEST.textos.contador.replace("{n}", i + 1).replace("{total}", total);

      var h = document.createElement("h3");
      h.className = "test__pregunta";
      h.id = "test-p" + i;
      h.textContent = p.texto;

      var opciones = document.createElement("div");
      opciones.className = "test__opciones";
      p.opciones.forEach(function (o) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "test__opcion";
        b.textContent = o.texto;
        b.setAttribute("aria-pressed", "false");
        b.addEventListener("click", function () { responder(i, o, b); });
        opciones.appendChild(b);
      });

      var nav = document.createElement("div");
      nav.className = "test__nav";
      if (i > 0) {
        var atras = document.createElement("button");
        atras.type = "button";
        atras.className = "enlace-boton";
        atras.textContent = DATOS_TEST.textos.anterior;
        atras.addEventListener("click", function () { ir(i - 1); });
        nav.appendChild(atras);
      }

      paso.appendChild(contador);
      paso.appendChild(h);
      paso.appendChild(opciones);
      paso.appendChild(nav);
      pasos.appendChild(paso);
    });
    notaResultado.textContent = DATOS_TEST.resultados.nota;
    ir(0);
  }

  function ir(indice) {
    actual = indice;
    var lista = pasos.querySelectorAll(".test__paso");
    lista.forEach(function (el, i) {
      if (i === indice) { el.setAttribute("data-activo", ""); } else { el.removeAttribute("data-activo"); }
    });
    resultado.removeAttribute("data-activo");
    progreso.hidden = false;
    progreso.value = indice;
    var activo = lista[indice];
    if (activo) {
      var titulo = activo.querySelector(".test__pregunta");
      titulo.setAttribute("tabindex", "-1");
      titulo.focus({ preventScroll: false });
    }
  }

  function responder(indice, opcion, boton) {
    var paso = boton.closest(".test__paso");
    paso.querySelectorAll(".test__opcion").forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
    boton.setAttribute("aria-pressed", "true");
    respuestas[DATOS_TEST.preguntas[indice].clave] = opcion;
    if (indice + 1 < total) { ir(indice + 1); } else { mostrarResultado(); }
  }

  function calcular() {
    var suma = 0, especial = null;
    DATOS_TEST.preguntas.forEach(function (p) {
      var o = respuestas[p.clave];
      if (!o) { return; }
      suma += o.puntos;
      if (o.especial) { especial = o.especial; }
    });
    if (especial && DATOS_TEST.resultados.especiales[especial]) {
      return DATOS_TEST.resultados.especiales[especial];
    }
    for (var i = 0; i < DATOS_TEST.resultados.tramos.length; i++) {
      if (suma <= DATOS_TEST.resultados.tramos[i].maximo) { return DATOS_TEST.resultados.tramos[i]; }
    }
    return DATOS_TEST.resultados.tramos[DATOS_TEST.resultados.tramos.length - 1];
  }

  function mostrarResultado() {
    var r = calcular();
    pasos.querySelectorAll(".test__paso").forEach(function (el) { el.removeAttribute("data-activo"); });
    progreso.value = total;
    tituloResultado.textContent = r.titulo;
    etiquetaResultado.textContent = "Tu resultado";
    resultado.setAttribute("data-activo", "");
    tituloResultado.setAttribute("tabindex", "-1");
    tituloResultado.focus();

    // Rellena los campos ocultos del formulario de la lista
    var valores = {
      POSTURA: respuestas.POSTURA ? respuestas.POSTURA.valor : "",
      HOMBROS: respuestas.HOMBROS ? respuestas.HOMBROS.valor : "",
      COLCHON: respuestas.COLCHON ? respuestas.COLCHON.valor : "",
      ALTURA: r.altura
    };
    document.querySelectorAll("form[data-formulario] input[data-test]").forEach(function (campo) {
      var clave = campo.getAttribute("data-test");
      if (valores[clave] !== undefined) { campo.value = valores[clave]; }
    });
    raiz.dispatchEvent(new CustomEvent("lisber:resultado", { detail: valores }));
  }

  repetir.addEventListener("click", function () {
    respuestas = {};
    pasos.querySelectorAll(".test__opcion").forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
    ir(0);
  });

  construir();
})();
