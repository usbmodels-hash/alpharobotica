/*
 * Genera el informe corporativo del configurador en PDF (cliente).
 * Expone window.buildConfiguradorPDF(data) -> Promise<Blob>.
 * `data` lo construye configurador.js (ya formateado): logo, KPIs, modelos
 * con imagen, flota, vías de adquisición. Las librerías se cargan bajo demanda.
 */
(function () {
  'use strict';

  var VENDOR = '/assets/js/vendor/';
  var ALPHA_LOGO = '/assets/alpha-logo-pdf.png?v=4127';
  var KEENON_LOGO = '/assets/keenon-logo-official.webp?v=4127';
  var libsPromise = null;

  function loadScript(src) {
    return new Promise(function (res, rej) {
      var s = document.createElement('script');
      s.src = src;
      s.async = true;
      s.onload = function () { res(); };
      s.onerror = function () { rej(new Error('No se pudo cargar ' + src)); };
      document.head.appendChild(s);
    });
  }

  function ensureLibs() {
    if (window.jspdf && window.html2canvas) return Promise.resolve();
    if (libsPromise) return libsPromise;
    libsPromise = Promise.all([
      window.jspdf ? Promise.resolve() : loadScript(VENDOR + 'jspdf.umd.min.js'),
      window.html2canvas ? Promise.resolve() : loadScript(VENDOR + 'html2canvas.min.js')
    ]);
    return libsPromise;
  }

  var L_ES = {
    band: 'Distribuidor autorizado KEENON · España',
    title: 'Informe de configuración de flota',
    subtitle: 'Estimación orientativa',
    operation: 'Tipo de operación',
    properties: 'Propiedades',
    rooms: 'hab.',
    activity: 'Actividad (alta / baja)',
    kpis: 'KPIs estimados',
    kpiRobots: 'robots en total',
    kpiFte: 'jornadas completas que cubren',
    kpiSave: 'ahorro neto estimado / mes',
    models: 'Modelos KEENON sugeridos para tu operación',
    fleet: 'Flota recomendada',
    thChallenge: 'Reto', thModel: 'Modelo KEENON', thUnits: 'Uds.', thAcc: 'Accesorios sugeridos',
    routes: 'Vías de adquisición (orientativo)',
    recommended: 'Recomendada',
    perMonth: '/mes',
    unit: 'uds',
    workdoc: 'Documento base de trabajo',
    generated: 'Generado el',
    footerName: 'Distribuidor autorizado KEENON en España'
  };
  var L_EN = {
    band: 'Authorized KEENON distributor · Spain',
    title: 'Fleet configuration report',
    subtitle: 'Indicative estimate',
    operation: 'Operation type',
    properties: 'Properties',
    rooms: 'rooms',
    activity: 'Activity (high / low)',
    kpis: 'Estimated KPIs',
    kpiRobots: 'robots in total',
    kpiFte: 'full-time shifts covered',
    kpiSave: 'estimated net saving / month',
    models: 'Suggested KEENON models for your operation',
    fleet: 'Recommended fleet',
    thChallenge: 'Challenge', thModel: 'KEENON model', thUnits: 'Units', thAcc: 'Suggested accessories',
    routes: 'Acquisition routes (indicative)',
    recommended: 'Recommended',
    perMonth: '/month',
    unit: 'units',
    workdoc: 'Working base document',
    generated: 'Generated on',
    footerName: 'Authorized KEENON distributor in Spain'
  };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function buildContainer(data) {
    var L = data.lang === 'en' ? L_EN : L_ES;
    var wrap = document.createElement('div');
    wrap.className = 'pdfdoc';
    wrap.setAttribute('aria-hidden', 'true');
    wrap.style.position = 'fixed';
    wrap.style.left = '-10000px';
    wrap.style.top = '0';
    wrap.style.width = '794px';
    wrap.style.zIndex = '-1';

    var modelsHtml = (data.models || []).map(function (m) {
      return '<div class="pdfdoc__model">' +
        '<div class="pdfdoc__imgwrap"><img src="' + esc(m.img) + '" alt=""/></div>' +
        '<div class="pdfdoc__marea">' + esc(m.area) + '</div>' +
        '<div class="pdfdoc__mname">' + esc(m.name) + '</div>' +
        '<div class="pdfdoc__muds">' + m.units + ' ' + L.unit + '</div></div>';
    }).join('');

    var fleetRows = (data.models || []).map(function (m) {
      return '<tr><td>' + esc(m.area) + '</td><td>' + esc(m.name) + '</td>' +
        '<td class="u">' + m.units + '</td><td>' + esc(m.acc) + '</td></tr>';
    }).join('');

    var routesHtml = (data.routes || []).map(function (rt) {
      var win = rt.key === data.rec ? ' pdfdoc__route--win' : '';
      var badge = rt.key === data.rec ? '<div class="pdfdoc__badge">' + L.recommended + '</div>' : '';
      return '<div class="pdfdoc__route' + win + '">' + badge +
        '<div class="pdfdoc__rn">' + esc(rt.name) + '</div>' +
        '<div class="pdfdoc__fee">' + esc(rt.fee) + ' <small>' + L.perMonth + '</small></div>' +
        '<div class="pdfdoc__rsub">' + esc(rt.sub) + '</div></div>';
    }).join('');

    var roomsStr = (data.props > 1)
      ? (data.props + ' · ' + (data.roomsList || []).join(' / ') + ' ' + L.rooms)
      : ((data.roomsList && data.roomsList[0] != null ? data.roomsList[0] : '') + ' ' + L.rooms);

    wrap.innerHTML =
      '<div class="pdfdoc__band"><img class="pdfdoc__alpha" src="' + ALPHA_LOGO + '" alt="Alpha Robotics"/>' +
      '<div class="pdfdoc__bandtxt">' + L.band + '</div></div>' +
      '<div class="pdfdoc__accent"></div>' +
      '<div class="pdfdoc__bodywrap">' +
        '<h1 class="pdfdoc__title">' + L.title + '</h1>' +
        '<p class="pdfdoc__sub">' + esc(data.verticalLabel) + ' · ' + L.subtitle + ' · ' + esc(data.date) + '</p>' +
        '<div class="pdfdoc__ctx">' +
          '<div><span class="k">' + L.operation + '</span><span class="v">' + esc(data.verticalLabel) + '</span></div>' +
          '<div><span class="k">' + L.properties + '</span><span class="v">' + esc(roomsStr) + '</span></div>' +
          '<div><span class="k">' + L.activity + '</span><span class="v">' + data.occHigh + '% / ' + data.occLow + '%</span></div>' +
        '</div>' +
        '<p class="pdfdoc__h">' + L.kpis + '</p>' +
        '<div class="pdfdoc__kpis">' +
          '<div class="pdfdoc__kpi"><div class="v">' + data.units + '</div><div class="l">' + L.kpiRobots + '</div></div>' +
          '<div class="pdfdoc__kpi"><div class="v">\u2248' + esc(data.fte) + '</div><div class="l">' + L.kpiFte + '</div></div>' +
          '<div class="pdfdoc__kpi pdfdoc__kpi--green"><div class="v">' + esc(data.saveNet) + '</div><div class="l">' + L.kpiSave + '</div></div>' +
        '</div>' +
        '<p class="pdfdoc__h">' + L.models + '</p>' +
        '<div class="pdfdoc__models">' + modelsHtml + '</div>' +
        '<p class="pdfdoc__h">' + L.fleet + '</p>' +
        '<table class="pdfdoc__fleet"><thead><tr><th>' + L.thChallenge + '</th><th>' + L.thModel +
          '</th><th>' + L.thUnits + '</th><th>' + L.thAcc + '</th></tr></thead><tbody>' + fleetRows + '</tbody></table>' +
        '<p class="pdfdoc__h">' + L.routes + '</p>' +
        '<div class="pdfdoc__routes">' + routesHtml + '</div>' +
        '<p class="pdfdoc__note">' + esc(data.note) + '</p>' +
        '<div class="pdfdoc__foot">' +
          '<div><img class="pdfdoc__keenon" src="' + KEENON_LOGO + '" alt="KEENON"/>' +
            '<strong>Alpha Robotics</strong> — ' + L.footerName + '<br/>alpharobotica.com · +34 659 483 652</div>' +
          '<div class="pdfdoc__footr">' + L.workdoc + '<br/>' + L.generated + ' ' + esc(data.date) + '</div>' +
        '</div>' +
      '</div>';
    return wrap;
  }

  function waitImages(container) {
    var imgs = Array.prototype.slice.call(container.querySelectorAll('img'));
    return Promise.all(imgs.map(function (img) {
      if (img.complete && img.naturalWidth) return Promise.resolve();
      return new Promise(function (res) {
        img.onload = function () { res(); };
        img.onerror = function () { res(); };
      });
    }));
  }

  window.buildConfiguradorPDF = function (data) {
    if (!data) return Promise.reject(new Error('Sin datos para el PDF'));
    var container;
    return ensureLibs().then(function () {
      container = buildContainer(data);
      document.body.appendChild(container);
      var fontsReady = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
      return Promise.all([waitImages(container), fontsReady]);
    }).then(function () {
      return window.html2canvas(container, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
        logging: false,
        windowWidth: 820
      });
    }).then(function (canvas) {
      var img = canvas.toDataURL('image/jpeg', 0.92);
      var JsPDF = window.jspdf.jsPDF;
      var pdf = new JsPDF({ unit: 'mm', format: 'a4', compress: true });
      var pw = 210, ph = 297;
      var imgW = pw, imgH = canvas.height * pw / canvas.width;
      var heightLeft = imgH, position = 0;
      pdf.addImage(img, 'JPEG', 0, position, imgW, imgH);
      heightLeft -= ph;
      while (heightLeft > 0) {
        position = heightLeft - imgH;
        pdf.addPage();
        pdf.addImage(img, 'JPEG', 0, position, imgW, imgH);
        heightLeft -= ph;
      }
      if (container && container.parentNode) container.parentNode.removeChild(container);
      return pdf.output('blob');
    }).catch(function (err) {
      if (container && container.parentNode) container.parentNode.removeChild(container);
      throw err;
    });
  };
})();
