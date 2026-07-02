(function(){
  const LANG = (document.documentElement.lang || 'es').toLowerCase().indexOf('en') === 0 ? 'en' : 'es';
  const LOCALE = LANG === 'en' ? 'en-IE' : 'es-ES';
  const TEXT = {
    es: {
      unitsHotel: 'Nº de habitaciones',
      unitsRetail: 'Nº de tiendas',
      unitsOffices: 'Nº de plantas',
      unitsWarehouse: 'Nº de naves',
      unitsFactory: 'Nº de plantas',
      unitsAirport: 'Nº de terminales',
      unitsUniversity: 'Nº de edificios',
      unitsRestaurant: 'Plazas / cubiertos',
      unitsHospital: 'Nº de camas',
      unitsSenior: 'Nº de residentes',
      unitsMultifamily: 'Nº de viviendas',
      unitsGym: 'Nº de socios',
      roomsAutoHint: 'Ajusta automáticamente los volúmenes de abajo; puedes afinarlos.',
      propsHint: 'Con más de una propiedad se despliega una casilla de habitaciones por edificio; cada uno se dimensiona por separado.',
      roomsPropLabel: 'Habitaciones · Propiedad {n}',
      floorsInfoLabel: 'Nº de plantas (informativo, no afecta al cálculo)',
      hotelRoom: 'Room service multiplanta',
      hotelFnb: 'Reparto en restaurante / F&B',
      hotelClean: 'Limpieza de suelos',
      hotelTrans: 'Transporte de carga pesada',
      restaurantFnb: 'Reparto en sala y retirada de vajilla',
      restaurantTrans: 'Transporte interno cocina - almacen',
      hospitalRoom: 'Entregas internas multiplanta',
      hospitalTrans: 'Logistica interna',
      seniorRoom: 'Entrega de comidas a habitacion',
      seniorFnb: 'Comedor / sala',
      multifamilyClean: 'Limpieza de zonas comunes',
      multifamilyTrans: 'Paqueteria / entregas internas',
      gymClean: 'Limpieza de instalaciones',
      gymTrans: 'Transporte interno',
      areaCleaning: 'Limpieza autonoma',
      areaLogistics: 'Logistica interna',
      slaEssential: 'Sin garantia de disponibilidad',
      slaPro: 'Objetivo de disponibilidad >= 95%',
      slaPremium: 'Objetivo de disponibilidad >= 98%',
      modeBig: 'Gran cuenta / RaaS',
      modeSmall: 'Pyme / CAPEX',
      kpiRobots: 'robots en total',
      kpiSaving: 'ahorro neto estimado / mes',
      kpiFte: 'jornadas completas que cubren',
      kpiBreakeven: 'Se amortiza automatizando solo el ~{pct}% de ese trabajo. Escenario conservador (\u224850% de las horas).',
      lockDetail: '\ud83d\udd12 Desbloquea el desglose y recibe el PDF',
      flexSeasonal: 'Con RaaS puedes ajustar la flota entre <strong>{hi} robots</strong> en temporada alta y <strong>{lo}</strong> en baja.',
      flexStable: 'Tu actividad es estable. RaaS mantiene cuota fija, soporte y cobertura de riesgo operativo.',
      carePrice: 'Nivel {level} · {min}-{max} /mes por robot según modelo',
      careIncluded: 'Incluido en RaaS. Opcional y recomendado en compra o compra financiada.',
      recoLabel: 'Via recomendada',
      purchase: 'Compra',
      financed: 'Compra financiada',
      raas: 'RaaS',
      bigWhyBase: 'Para una cuenta de gran tamaño trabajamos sobre la base de RaaS: {reasons}.',
      reasonSeasonal: 'actividad estacional',
      reasonOpex: 'preferencia por gasto operativo',
      reasonProps: '{props} propiedades a estandarizar',
      reasonCare: 'Alpha Care y sustitucion incluidos',
      smallWhy: 'Según tus datos, {name} ofrece el mejor equilibrio coste-beneficio a {years} años.',
      recommended: 'Recomendado',
      financeHow: 'Cómo calculamos la cuota',
      financeText: 'La cuota se estima con sistema francés: una mensualidad constante que amortiza capital e intereses durante el plazo elegido. No se publica PVP por modelo; el motor usa referencias internas para simular la estructura financiera.',
      term: 'Plazo',
      apr: 'TAE',
      monthlyInterest: 'Interés mensual estimado',
      estimatedFinanceFee: 'Cuota financiera estimada',
      fleetMonth: '/mes flota',
      perRobotMonth: '/robot·mes',
      purchaseDesc: 'Pagas el equipo una sola vez y es tuyo desde el día 1. La cuota mensual de abajo son solo los costes de operación (Alpha Care + consumibles y energía), incluidos también en Financiada y OpExFlow.',
      finDesc: 'Sin desembolso inicial. Pagas a plazos y el equipo queda en propiedad al final.',
      raasDesc: 'Suscripcion todo incluido con servicio, sustitucion y flexibilidad operativa.',
      operationSub: ' · operación',
      financedSub: ' a plazos',
      includedSub: ' todo incluido',
      netMonthlyFlow: 'Flujo mensual neto',
      netBenefitYears: 'Beneficio neto a {years} años',
      referenceInvestment: 'Inversion de referencia',
      estimatedPayback: 'Payback estimado',
      months: 'meses',
      noUpfront: 'Sin desembolso inicial',
      breakevenMonth: 'Equilibrio en mes',
      alphaCareIncluded: 'Alpha Care incluido',
      purchaseOptionMonth12: 'Opcion de compra desde el mes 12',
      paybackRoute: 'Vía',
      estimatedBreakeven: 'Equilibrio estimado',
      horizonNetBenefit: 'Beneficio neto a horizonte',
      benchmark: '<strong>Referencia orientativa:</strong> Tu OpExFlow &asymp; {raas}/robot&middot;mes frente a &asymp; {saving}/mes de coste laboral equivalente.',
      chartAria: 'Coste acumulado por modelo de adquisicion',
      yearSuffix: 'a',
      disclaimer: 'Estimacion orientativa basada en los datos introducidos y parametros internos de referencia. No tiene valor de oferta. Precios, cuotas, SLA e integraciones se confirman en la propuesta de Alpha Robotica tras el diagnostico de sitio.',
      summary: '{units} robots; {saving}/mes de ahorro estimado; via recomendada: {route}; flota: {fleet}',
      unlocked: 'Resultados completos desbloqueados para {name}.',
      unlockedFallback: 'tu empresa',
      whatsappReview: 'Revisar por WhatsApp',
      bookSite: 'Reservar estudio de sitio',
      requiredFields: 'Completa nombre, email y privacidad para desbloquear el informe.',
      registering: 'Registrando solicitud...',
      generatingPdf: 'Generando tu informe PDF...',
      downloadPdf: 'Descargar PDF',
      fallbackNotice: 'Te mostramos el informe ahora. Si no recibimos la solicitud, puedes llamarnos o escribirnos por WhatsApp.',
      fnbBreakageLabel: 'Gasto mensual en rotura de vajilla (€)',
      cleanCostLabel: 'Coste actual de limpieza y químicos (€/mes)',
      liftsLabel: 'Nº de ascensores a integrar',
      liftsNote: 'Suma un coste de integración por ascensor.',
      sliderOutRoom: '{value} entregas/día',
      sliderOutFnb: '{value} servicios/día',
      sliderOutClean: '{value} m²/día',
      sliderOutTrans: '{value} trayectos/día',
      sliderOutPercent: '{value}%',
      cleanHintSmall: '≈ un restaurante',
      cleanHintMedium: '≈ un hotel mediano',
      cleanHintLarge: '≈ un hotel grande u hospital',
      roomHintLight: 'operación ligera de room service',
      roomHintStandard: 'operación estándar de room service',
      roomHintIntensive: 'operación intensiva de room service',
      fleetThumbAlt: 'Modelo KEENON sugerido: {model}',
      fleetHead: 'Modelos sugeridos para tu operación',
      fleetPropsNote: 'Suma de las {props} propiedades configuradas.',
      unitSingular: 'ud',
      unitPlural: 'uds',
      modelAccW3: 'Modulo E-box para ascensor y 2-4 compartimentos',
      modelAccT10: 'Bandejas y pantalla de marketing',
      modelAccT11: 'Bandejas para pasillo estrecho',
      modelAccT9: 'Pila de carga y bandejas',
      modelAccT8: 'Pila de carga y bandejas',
      modelAccC30: 'Kit de consumibles 6 meses',
      modelAccC40: 'Workstation, pila de carga y kit de consumibles',
      modelAccC55: 'Workstation de agua y bateria extra',
      modelAccS100: 'Estanteria y bateria de cambio rapido',
      modelAccS300: 'Plataforma y modulo de cambio de bateria'
    },
    en: {
      unitsHotel: 'No. of rooms',
      unitsRetail: 'No. of stores',
      unitsOffices: 'No. of floors',
      unitsWarehouse: 'No. of units',
      unitsFactory: 'No. of plants',
      unitsAirport: 'No. of terminals',
      unitsUniversity: 'No. of buildings',
      unitsRestaurant: 'Seats / covers',
      unitsHospital: 'No. of beds',
      unitsSenior: 'No. of residents',
      unitsMultifamily: 'No. of units',
      unitsGym: 'No. of members',
      roomsAutoHint: 'Auto-adjusts the volumes below; you can fine-tune them.',
      propsHint: 'With more than one property, a rooms field appears per building; each one is sized separately.',
      roomsPropLabel: 'Rooms · Property {n}',
      floorsInfoLabel: 'Floors (for reference, not used in the calculation)',
      hotelRoom: 'Multi-floor room service',
      hotelFnb: 'Restaurant / F&B delivery',
      hotelClean: 'Floor cleaning',
      hotelTrans: 'Heavy-load transport',
      restaurantFnb: 'Dining-room delivery and dish return',
      restaurantTrans: 'Kitchen-to-storage internal transport',
      hospitalRoom: 'Multi-floor internal deliveries',
      hospitalTrans: 'Internal logistics',
      seniorRoom: 'In-room meal delivery',
      seniorFnb: 'Dining room service',
      multifamilyClean: 'Common-area cleaning',
      multifamilyTrans: 'Parcel and internal deliveries',
      gymClean: 'Facility cleaning',
      gymTrans: 'Internal transport',
      areaCleaning: 'Autonomous cleaning',
      areaLogistics: 'Internal logistics',
      slaEssential: 'No availability guarantee',
      slaPro: 'Availability target >= 95%',
      slaPremium: 'Availability target >= 98%',
      modeBig: 'Enterprise / RaaS',
      modeSmall: 'SMB / CAPEX',
      kpiRobots: 'robots in total',
      kpiSaving: 'estimated net monthly saving',
      kpiFte: 'full-time roles it covers',
      kpiBreakeven: 'It pays for itself by automating only ~{pct}% of that work. Conservative scenario (\u224850% of hours).',
      lockDetail: '\ud83d\udd12 Unlock the breakdown and get the PDF',
      flexSeasonal: 'With RaaS you can adjust the fleet between <strong>{hi} robots</strong> in high season and <strong>{lo}</strong> in low season.',
      flexStable: 'Your operation is stable. RaaS keeps a fixed fee, support and operational risk coverage.',
      carePrice: '{level} level · {min}-{max} /month per robot depending on model',
      careIncluded: 'Included in RaaS. Optional and recommended for purchase or financed purchase.',
      recoLabel: 'Recommended route',
      purchase: 'Purchase',
      financed: 'Financed purchase',
      raas: 'RaaS',
      bigWhyBase: 'For an enterprise account we work from a RaaS baseline: {reasons}.',
      reasonSeasonal: 'seasonal activity',
      reasonOpex: 'operational-expense preference',
      reasonProps: '{props} properties to standardise',
      reasonCare: 'Alpha Care and replacement coverage included',
      smallWhy: 'Based on your data, {name} offers the best cost-benefit balance over {years} years.',
      recommended: 'Recommended',
      financeHow: 'How the fee is calculated',
      financeText: 'The payment is estimated with a standard amortisation formula: a fixed monthly amount that repays capital and interest over the selected term. We do not publish model price lists; the engine uses internal references to simulate the financial structure.',
      term: 'Term',
      apr: 'APR',
      monthlyInterest: 'Estimated monthly interest',
      estimatedFinanceFee: 'Estimated finance fee',
      fleetMonth: '/month fleet',
      perRobotMonth: '/robot·month',
      purchaseDesc: 'You pay for the equipment once and own it from day one. The monthly amount below only covers operating costs (Alpha Care + consumables and energy), also included in Financed and OpExFlow.',
      finDesc: 'No upfront payment. You pay in instalments and own the equipment at the end.',
      raasDesc: 'All-inclusive subscription with service, replacement coverage and operational flexibility.',
      operationSub: ' · operation',
      financedSub: ' in instalments',
      includedSub: ' all included',
      netMonthlyFlow: 'Net monthly flow',
      netBenefitYears: 'Net benefit over {years} years',
      referenceInvestment: 'Reference investment',
      estimatedPayback: 'Estimated payback',
      months: 'months',
      noUpfront: 'No upfront payment',
      breakevenMonth: 'Break-even in month',
      alphaCareIncluded: 'Alpha Care included',
      purchaseOptionMonth12: 'Purchase option from month 12',
      paybackRoute: 'Route',
      estimatedBreakeven: 'Estimated break-even',
      horizonNetBenefit: 'Net benefit at horizon',
      benchmark: '<strong>Indicative benchmark:</strong> Your OpExFlow &asymp; {raas}/robot&middot;month versus &asymp; {saving}/month of equivalent labour cost.',
      chartAria: 'Cumulative cost by acquisition model',
      yearSuffix: 'y',
      disclaimer: 'Indicative estimate based on the data entered and internal reference parameters. It is not a commercial offer. Prices, fees, SLA and integrations are confirmed in Alpha Robotica’s proposal after the site assessment.',
      summary: '{units} robots; {saving}/month estimated saving; recommended route: {route}; fleet: {fleet}',
      unlocked: 'Full results unlocked for {name}.',
      unlockedFallback: 'your company',
      whatsappReview: 'Review via WhatsApp',
      bookSite: 'Book a site study',
      requiredFields: 'Complete name, email and privacy consent to unlock the report.',
      registering: 'Registering request...',
      generatingPdf: 'Generating your PDF report...',
      downloadPdf: 'Download PDF',
      fallbackNotice: 'We are showing the report now. If the request is not received, you can call us or message us on WhatsApp.',
      fnbBreakageLabel: 'Monthly tableware breakage cost (€)',
      cleanCostLabel: 'Current cleaning & chemicals cost (€/month)',
      liftsLabel: 'Lifts to integrate',
      liftsNote: 'Adds an integration cost per lift.',
      sliderOutRoom: '{value} deliveries/day',
      sliderOutFnb: '{value} services/day',
      sliderOutClean: '{value} m²/day',
      sliderOutTrans: '{value} trips/day',
      sliderOutPercent: '{value}%',
      cleanHintSmall: '≈ a restaurant',
      cleanHintMedium: '≈ a mid-size hotel',
      cleanHintLarge: '≈ a large hotel or hospital',
      roomHintLight: 'light room service operation',
      roomHintStandard: 'standard room service operation',
      roomHintIntensive: 'intensive room service operation',
      fleetThumbAlt: 'Suggested KEENON model: {model}',
      fleetHead: 'Suggested models for your operation',
      fleetPropsNote: 'Sum of the {props} configured properties.',
      unitSingular: 'unit',
      unitPlural: 'units',
      modelAccW3: 'E-box lift module and 2-4 compartments',
      modelAccT10: 'Trays and marketing screen',
      modelAccT11: 'Trays for narrow corridors',
      modelAccT9: 'Charging stack and trays',
      modelAccT8: 'Charging stack and trays',
      modelAccC30: '6-month consumables kit',
      modelAccC40: 'Workstation, charging stack and consumables kit',
      modelAccC55: 'Water workstation and extra battery',
      modelAccS100: 'Shelving and quick-swap battery',
      modelAccS300: 'Platform and battery-swap module'
    }
  };
  function T(key, vars){
    let value = (TEXT[LANG] && TEXT[LANG][key]) || TEXT.es[key] || key;
    if (vars) {
      Object.keys(vars).forEach(function(name){
        value = value.replace(new RegExp('\\{' + name + '\\}', 'g'), vars[name]);
      });
    }
    return value;
  }
  const EUR = function(n){
    return new Intl.NumberFormat(LOCALE, { maximumFractionDigits: 0 }).format(Math.round(n || 0)) + ' €';
  };
  const EUR1 = function(n){
    return new Intl.NumberFormat(LOCALE, { maximumFractionDigits: 0 }).format(Math.round(n || 0));
  };
  function fmtPct(n, digits){
    return new Intl.NumberFormat(LOCALE, {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits
    }).format(n || 0);
  }
  const ceil = Math.ceil;
  const max = Math.max;

  const MODELS = {
    W3: { n: 'BUTLERBOT W3', price: 12000, cls: 'media', deliv_h: 8, acc: 'Modulo E-box para ascensor y 2-4 compartimentos' },
    T10: { n: 'DINERBOT T10', price: 9000, cls: 'media', deliv_h: 12, acc: 'Bandejas y pantalla de marketing' },
    T11: { n: 'DINERBOT T11', price: 8200, cls: 'media', deliv_h: 10, acc: 'Bandejas para pasillo estrecho' },
    T9: { n: 'DINERBOT T9', price: 7000, cls: 'ligera', deliv_h: 12, acc: 'Pila de carga y bandejas' },
    T8: { n: 'DINERBOT T8', price: 7000, cls: 'ligera', deliv_h: 10, acc: 'Pila de carga y bandejas' },
    C30: { n: 'KLEENBOT C30', price: 8000, cls: 'ligera', m2h: 600, acc: 'Kit de consumibles 6 meses' },
    C40: { n: 'KLEENBOT C40', price: 13000, cls: 'pesada', m2h: 1100, acc: 'Workstation, pila de carga y kit de consumibles' },
    C55: { n: 'KLEENBOT C55', price: 18000, cls: 'pesada', m2h: 2376, acc: 'Workstation de agua y bateria extra' },
    S100: { n: 'CARRYBOT S100', price: 9500, cls: 'media', acc: 'Estanteria y bateria de cambio rapido' },
    S300: { n: 'CARRYBOT S300', price: 12000, cls: 'media', acc: 'Plataforma y modulo de cambio de bateria' }
  };

  const ALPHACARE = {
    essential: { ligera: 36, media: 36, pesada: 36 },
    pro: { ligera: 85, media: 92, pesada: 105 },
    premium: { ligera: 214, media: 224, pesada: 244 }
  };
  const SLA = {
    essential: T('slaEssential'),
    pro: T('slaPro'),
    premium: T('slaPremium')
  };
  const LVLNAME = { essential: 'Essential', pro: 'Pro', premium: 'Premium' };
  var RAAS_MARGIN = 0.15; // 15 % margen RaaS interno (no visible al cliente).
  const INTEG_LIFT = 1500;
  const FLEET_THUMBS = {
    W3: '/assets/w3-front-black-v445.webp',
    T8: '/assets/t8-hero-v438.webp',
    T9: '/assets/t9-back45-v438.webp',
    T10: '/assets/t10-food-v438.webp',
    T11: '/assets/t11-front-v438.webp',
    C30: '/assets/c30-front-straight.webp',
    C40: '/assets/kleenbot-c40-hero.webp',
    C55: '/assets/kleenbot-c55-front.webp',
    S100: '/assets/s100-shelf-v438.webp',
    S300: '/assets/s300-cases-v438.webp'
  };
  const FLEET_THUMB_FALLBACK = '/assets/keenon-logo-official.webp';
  // Cache-buster para las miniaturas: evita que un 404 cacheado de un deploy
  // anterior (rutas rotas) siga sirviendose. Subir si se cambian las imagenes.
  const THUMB_V = '?v=4126';

  const VERT = {
    hotel: {
      label: T('unitsHotel'),
      units: 200,
      show: ['room', 'fnb', 'clean', 'trans'],
      t: {
        room: T('hotelRoom'),
        fnb: T('hotelFnb'),
        clean: T('hotelClean'),
        trans: T('hotelTrans')
      },
      d: { room: [60, 8], fnb: [320, 3, 80, '0'], clean: [6000, 'wet', 25, 0], trans: [40, 10, 80] }
    },
    restaurante: {
      label: T('unitsRestaurant'),
      units: 120,
      show: ['fnb', 'clean', 'trans'],
      t: {
        fnb: T('restaurantFnb'),
        clean: T('hotelClean'),
        trans: T('restaurantTrans')
      },
      d: { fnb: [500, 3, 70, '0'], clean: [1000, 'wet', 5, 0], trans: [20, 8, 40] }
    },
    hospital: {
      label: T('unitsHospital'),
      units: 300,
      show: ['room', 'clean', 'trans'],
      t: {
        room: T('hospitalRoom'),
        clean: T('hotelClean'),
        trans: T('hospitalTrans')
      },
      d: { room: [150, 9], clean: [9000, 'wet', 15, 0], trans: [70, 10, 100] }
    },
    senior: {
      label: T('unitsSenior'),
      units: 120,
      show: ['room', 'fnb', 'clean', 'trans'],
      t: {
        room: T('seniorRoom'),
        fnb: T('seniorFnb'),
        clean: T('hotelClean'),
        trans: T('hospitalTrans')
      },
      d: { room: [80, 9], fnb: [200, 3, 100, '0'], clean: [3000, 'wet', 30, 0], trans: [30, 9, 60] }
    },
    multifamily: {
      label: T('unitsMultifamily'),
      units: 200,
      show: ['clean', 'trans'],
      t: { clean: T('multifamilyClean'), trans: T('multifamilyTrans') },
      d: { clean: [2000, 'dry', 10, 0], trans: [40, 8, 30] }
    },
    gym: {
      label: T('unitsGym'),
      units: 1500,
      show: ['clean', 'trans'],
      t: { clean: T('gymClean'), trans: T('gymTrans') },
      d: { clean: [3000, 'wet', 15, 0], trans: [15, 8, 40] }
    },
    retail: { label: T('unitsRetail'), units: 1, show: ['clean', 'trans'], t: { clean: T('hotelClean'), trans: T('hotelTrans') }, d: { clean: [4000, 'wet', 12, 0], trans: [40, 8, 60] } },
    oficinas: { label: T('unitsOffices'), units: 4, show: ['clean'], t: { clean: T('hotelClean') }, d: { clean: [2500, 'dry', 8, 0] } },
    almacen: { label: T('unitsWarehouse'), units: 1, show: ['trans', 'clean'], t: { trans: T('hotelTrans'), clean: T('hotelClean') }, d: { trans: [80, 10, 120], clean: [5000, 'dry', 6, 0] } },
    fabrica: { label: T('unitsFactory'), units: 1, show: ['trans', 'clean'], t: { trans: T('hotelTrans'), clean: T('hotelClean') }, d: { trans: [60, 10, 100], clean: [6000, 'wet', 8, 0] } },
    aeropuerto: { label: T('unitsAirport'), units: 1, show: ['clean', 'trans'], t: { clean: T('hotelClean'), trans: T('hotelTrans') }, d: { clean: [12000, 'wet', 20, 0], trans: [50, 12, 150] } },
    universidad: { label: T('unitsUniversity'), units: 5, show: ['clean'], t: { clean: T('hotelClean') }, d: { clean: [8000, 'dry', 10, 0] } }
  };

  const AREA = {
    limpieza: { vertical: 'hotel', cases: ['clean'], label: T('areaCleaning') },
    fnb: { vertical: 'restaurante', cases: ['fnb'], label: 'Food & Beverage' },
    'room-service': { vertical: 'hotel', cases: ['room'], label: 'Room Service' },
    logistica: { vertical: 'hotel', cases: ['trans'], label: T('areaLogistics') }
  };

  const state = { mode: 'big', vertical: 'hotel', areaKey: '', unlocked: false, result: null };

  function modelAcc(model){
    return T('modelAcc' + model);
  }

  function byId(id){
    return document.getElementById(id);
  }

  function setHTML(id, html){
    const el = byId(id);
    if (el) el.innerHTML = html;
  }

  function setText(id, text){
    const el = byId(id);
    if (el) el.textContent = text;
  }

  function val(id){
    const el = byId(id);
    return el ? (parseFloat(el.value) || 0) : 0;
  }

  function activeUseCase(uc){
    const cb = byId('uc_' + uc);
    const block = document.querySelector('.config-uc[data-uc="' + uc + '"]');
    return !!(cb && cb.checked && (!block || block.style.display !== 'none'));
  }

  function scaleVolumesFromRooms(){
    const cfg = VERT[state.vertical] || VERT.hotel;
    const ratio = cfg.units > 0 ? val('rooms') / cfg.units : 1;
    const volumeInputs = {
      room: 'room_day',
      fnb: 'fnb_day',
      clean: 'clean_m2',
      trans: 'trans_day'
    };
    Object.keys(volumeInputs).forEach(function(uc){
      if (!activeUseCase(uc) || !cfg.d[uc]) return;
      const input = byId(volumeInputs[uc]);
      if (input) input.value = Math.round(cfg.d[uc][0] * ratio);
    });
    syncDynamicInputs();
    compute();
  }

  function getRoomsList(props){
    const list = [val('rooms')];
    document.querySelectorAll('#roomsFields .rooms-extra').forEach(function(inp){
      list.push(parseFloat(inp.value) || 0);
    });
    const base = val('rooms');
    while (list.length < props) list.push(base);
    return list.slice(0, props);
  }

  function renderPropertyRooms(reset){
    const wrap = byId('roomsFields');
    if (!wrap) return;
    const props = Math.max(1, Math.round(val('props')));
    const primarySpan = wrap.querySelector('.config-rooms__primary span');
    const baseVal = val('rooms');
    const prev = [];
    wrap.querySelectorAll('.config-rooms__extra').forEach(function(l){
      const inp = l.querySelector('input');
      prev.push(inp ? (parseFloat(inp.value) || 0) : 0);
      l.remove();
    });
    if (props <= 1) {
      wrap.classList.remove('multi');
      if (primarySpan) primarySpan.textContent = (VERT[state.vertical] || VERT.hotel).label;
      return;
    }
    wrap.classList.add('multi');
    if (primarySpan) primarySpan.textContent = T('roomsPropLabel', { n: 1 });
    const frag = document.createDocumentFragment();
    for (let i = 2; i <= props; i++) {
      const label = document.createElement('label');
      label.className = 'config-rooms__extra';
      const span = document.createElement('span');
      span.textContent = T('roomsPropLabel', { n: i });
      const input = document.createElement('input');
      input.type = 'number';
      input.min = '1';
      input.className = 'rooms-extra';
      input.setAttribute('data-prop', String(i));
      const keep = (!reset && prev[i - 2] != null && prev[i - 2] > 0) ? prev[i - 2] : baseVal;
      input.value = String(keep);
      input.addEventListener('input', compute);
      label.appendChild(span);
      label.appendChild(input);
      frag.appendChild(label);
    }
    wrap.appendChild(frag);
  }

  function syncSlider(id, outId, key){
    const out = byId(outId);
    if (!out) return;
    out.textContent = T(key, { value: Math.round(val(id)) });
  }

  function syncDynamicInputs(){
    setText('roomsAutoHint', T('roomsAutoHint'));
    setText('propsHint', T('propsHint'));
    setText('lbl_floors', T('floorsInfoLabel'));
    setText('lbl_fnb_breakage', T('fnbBreakageLabel'));
    setText('lbl_clean_cost', T('cleanCostLabel'));
    setText('lbl_lifts', T('liftsLabel'));
    setText('liftsNote', T('liftsNote'));
    syncSlider('room_day', 'out_room_day', 'sliderOutRoom');
    syncSlider('fnb_day', 'out_fnb_day', 'sliderOutFnb');
    syncSlider('clean_m2', 'out_clean_m2', 'sliderOutClean');
    syncSlider('trans_day', 'out_trans_day', 'sliderOutTrans');
    syncSlider('occ_high', 'out_occ_high', 'sliderOutPercent');
    syncSlider('occ_low', 'out_occ_low', 'sliderOutPercent');

    const cleanHint = byId('hint_clean_m2');
    if (cleanHint) {
      const m2 = val('clean_m2');
      cleanHint.textContent = m2 < 1000 ? T('cleanHintSmall') : (m2 <= 5000 ? T('cleanHintMedium') : T('cleanHintLarge'));
    }
    const roomHint = byId('hint_room_day');
    if (roomHint) {
      const deliveries = val('room_day');
      roomHint.textContent = deliveries > 100 ? T('roomHintIntensive') : (deliveries >= 40 ? T('roomHintStandard') : T('roomHintLight'));
    }
  }

  function dominantModel(r){
    if (!r || !r.agg) return '';
    let best = '';
    let units = -1;
    Object.keys(r.agg).forEach(function(model){
      if (r.agg[model] > units) {
        best = model;
        units = r.agg[model];
      }
    });
    return best;
  }

  function renderFleetThumb(r){
    const wrap = byId('fleetThumb');
    if (!wrap) return;
    const rows = (r && r.planRows) ? r.planRows : [];
    if (!rows.length) {
      wrap.innerHTML = '';
      wrap.setAttribute('aria-hidden', 'true');
      return;
    }
    wrap.removeAttribute('aria-hidden');
    const fb = FLEET_THUMB_FALLBACK + THUMB_V;
    const cards = rows.map(function(p){
      const name = MODELS[p.m] ? MODELS[p.m].n : p.m;
      const src = (FLEET_THUMBS[p.m] || FLEET_THUMB_FALLBACK) + THUMB_V;
      const uds = p.u + ' ' + (p.u === 1 ? T('unitSingular') : T('unitPlural'));
      return '<figure class="fleet-card">' +
        '<img src="' + src + '" alt="' + T('fleetThumbAlt', { model: name }) + '" loading="lazy" decoding="async" onerror="this.onerror=null;this.src=\'' + fb + '\'"/>' +
        '<figcaption><span class="fleet-card__area">' + p.uc + '</span><span class="fleet-card__model">' + name + '</span><span class="fleet-card__uds">' + uds + '</span></figcaption>' +
        '</figure>';
    }).join('');
    const note = (r.props && r.props > 1)
      ? '<p class="fleet-thumbs__note">' + T('fleetPropsNote', { props: r.props }) + '</p>'
      : '';
    wrap.innerHTML = '<div class="fleet-thumbs__head">' + T('fleetHead') + '</div><div class="fleet-thumbs__grid">' + cards + '</div>' + note;
  }

  // Set this to a Calendly/HubSpot Meetings URL to show "Reservar estudio de sitio" after the lead form.
  const BOOKING_URL = '';

  function encodeForm(formData){
    return new URLSearchParams(formData).toString();
  }

  async function postNetlifyForm(formData){
    const body = encodeForm(formData);
    const currentPath = window.location && window.location.pathname ? window.location.pathname : '/configurador';
    const endpoints = [currentPath, '/configurador', '/'].filter(function(endpoint, index, list){
      return endpoint && list.indexOf(endpoint) === index;
    });
    let lastError = null;

    for (const endpoint of endpoints) {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: body
        });
        if (res.ok || res.redirected || (res.status >= 200 && res.status < 400)) {
          return true;
        }
        lastError = new Error('Netlify Forms rejected ' + endpoint + ' with status ' + res.status);
      } catch (err) {
        lastError = err;
      }
    }

    throw lastError || new Error('Netlify Forms unavailable');
  }

  function annuity(P, apr, n){
    const r = apr / 100 / 12;
    return r ? P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1) : P / n;
  }

  function setActiveButton(containerSelector, attr, value){
    document.querySelectorAll(containerSelector + ' button').forEach(function(button){
      const active = button.getAttribute(attr) === value;
      button.classList.toggle('on', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function setMode(mode){
    state.mode = mode === 'small' ? 'small' : 'big';
    setActiveButton('#seg', 'data-mode', state.mode);
    compute();
  }

  function setUseCaseFocus(keys){
    ['room', 'fnb', 'clean', 'trans'].forEach(function(uc){
      const block = document.querySelector('.config-uc[data-uc="' + uc + '"]');
      const cb = byId('uc_' + uc);
      if (!block || !cb) return;
      const active = keys.indexOf(uc) !== -1;
      if (block.style.display !== 'none') {
        cb.checked = active;
        block.classList.toggle('active', active);
      }
    });
  }

  function setVertical(v, focusedCases){
    const cfg = VERT[v] || VERT.hotel;
    state.vertical = VERT[v] ? v : 'hotel';
    const lbl = byId('lbl_units');
    if (lbl) lbl.textContent = cfg.label;
    const rooms = byId('rooms');
    if (rooms) rooms.value = cfg.units;
    ['room', 'fnb', 'clean', 'trans'].forEach(function(uc){
      const block = document.querySelector('.config-uc[data-uc="' + uc + '"]');
      const cb = byId('uc_' + uc);
      if (!block || !cb) return;
      const show = cfg.show.indexOf(uc) !== -1;
      block.style.display = show ? '' : 'none';
      cb.checked = show;
      block.classList.toggle('active', show);
      const title = byId('ttl_' + uc);
      if (show && cfg.t[uc] && title) title.textContent = cfg.t[uc];
    });

    const d = cfg.d;
    if (d.room) {
      byId('room_day').value = d.room[0];
      byId('room_min').value = d.room[1];
    }
    if (d.fnb) {
      byId('fnb_day').value = d.fnb[0];
      byId('fnb_min').value = d.fnb[1];
      byId('fnb_aisle').value = d.fnb[2];
      byId('fnb_mkt').value = d.fnb[3];
    }
    if (d.clean) {
      byId('clean_m2').value = d.clean[0];
      byId('clean_type').value = d.clean[1];
      byId('clean_carpet').value = d.clean[2];
      byId('clean_cost').value = d.clean[3];
    }
    if (d.trans) {
      byId('trans_day').value = d.trans[0];
      byId('trans_min').value = d.trans[1];
      byId('trans_kg').value = d.trans[2];
    }

    if (focusedCases && focusedCases.length) {
      setUseCaseFocus(focusedCases);
    }
    setActiveButton('#vbtns', 'data-v', state.vertical);
    renderPropertyRooms(true);
    compute();
  }

  function buildUseCases(){
    const ophS = val('oph_srv');
    const ophC = 8;
    const util = val('util') / 100;
    const ucs = [];

    if (byId('uc_room') && byId('uc_room').checked) {
      ucs.push({
        uc: byId('ttl_room').textContent,
        m: 'W3',
        capDay: MODELS.W3.deliv_h * ophS * util,
        demand0: val('room_day'),
        hours0: val('room_day') * val('room_min') / 60,
        extra: 0
      });
    }
    if (byId('uc_fnb') && byId('uc_fnb').checked) {
      const aisle = val('fnb_aisle');
      const mkt = byId('fnb_mkt').value === '1';
      const dd = val('fnb_day');
      const m = mkt ? 'T10' : (aisle < 50 ? 'T11' : (dd > 400 ? 'T9' : 'T8'));
      ucs.push({
        uc: byId('ttl_fnb').textContent,
        m: m,
        capDay: MODELS[m].deliv_h * ophS * util,
        demand0: dd,
        hours0: dd * val('fnb_min') / 60,
        extra: val('fnb_breakage')
      });
    }
    if (byId('uc_clean') && byId('uc_clean').checked) {
      const m2 = val('clean_m2');
      const type = byId('clean_type').value;
      const cost = val('clean_cost');
      const m = (m2 >= 6000) ? 'C55' : (type === 'dry' ? 'C30' : 'C40');
      ucs.push({
        uc: byId('ttl_clean').textContent,
        m: m,
        capDay: MODELS[m].m2h * ophC * util,
        demand0: m2,
        hours0: cost > 0 ? 0 : (m2 / 300),
        extra: cost > 0 ? cost : 0
      });
    }
    if (byId('uc_trans') && byId('uc_trans').checked) {
      const kg = val('trans_kg');
      const dd = val('trans_day');
      const mn = val('trans_min');
      const m = kg > 120 ? 'S300' : 'S100';
      ucs.push({
        uc: byId('ttl_trans').textContent,
        m: m,
        capDay: (ophS * 60 / Math.max(1, mn)) * util,
        demand0: dd,
        hours0: dd * mn / 60,
        extra: 0
      });
    }
    return ucs;
  }

  function fleetAt(ucs, occ){
    const plan = [];
    const agg = {};
    let units = 0;
    let capex = 0;
    ucs.forEach(function(c){
      const u = max(1, ceil(c.demand0 * occ / Math.max(1, c.capDay)));
      plan.push({ uc: c.uc, m: c.m, u: u });
      agg[c.m] = (agg[c.m] || 0) + u;
      units += u;
    });
    Object.keys(agg).forEach(function(k){
      capex += MODELS[k].price * agg[k];
    });
    return { plan: plan, agg: agg, units: units, capex: capex };
  }

  // Suma la flota de varias propiedades heterogeneas. Cada propiedad escala los
  // volumenes por su nº de habitaciones (rooms_i / base) y redondea su flota de
  // forma independiente: cada edificio necesita al menos un robot por area.
  function fleetSum(ucs, occ, roomsList, base){
    const agg = {};
    const plan = ucs.map(function(c){ return { uc: c.uc, m: c.m, u: 0 }; });
    let units = 0;
    let capex = 0;
    roomsList.forEach(function(r){
      if (!(r > 0)) return;
      const scale = base > 0 ? r / base : 1;
      ucs.forEach(function(c, idx){
        const u = max(1, ceil(c.demand0 * scale * occ / Math.max(1, c.capDay)));
        plan[idx].u += u;
        agg[c.m] = (agg[c.m] || 0) + u;
        units += u;
      });
    });
    Object.keys(agg).forEach(function(k){
      capex += MODELS[k].price * agg[k];
    });
    return { plan: plan, agg: agg, units: units, capex: capex };
  }

  function compute(){
    if (!byId('configurator')) return;
    syncDynamicInputs();
    const hourly = val('hourly');
    const hidden = val('hidden') / 100;
    const horizonY = val('horizon');
    const H = Math.round(horizonY * 12);
    const apr = val('apr');
    const tFin = val('term_fin');
    const tRaas = val('term_raas');
    const prem = RAAS_MARGIN;
    const fteH = val('fte_h');
    const level = byId('care_level').value;
    const consumU = val('consum');
    const occHigh = val('occ_high') / 100;
    const occLow = val('occ_low') / 100;
    const occAvg = max(0.3, (occHigh + occLow) / 2);

    const props = Math.max(1, Math.round(val('props')));
    const roomsList = getRoomsList(props);
    const base = Math.max(1, roomsList[0]);
    const ucs = buildUseCases();
    // Opcion B (propiedades heterogeneas): el motor dimensiona la propiedad de
    // referencia (#1, cuyos volumenes se muestran y se pueden afinar) y suma el
    // resto escalando por su nº de habitaciones. Cada edificio redondea aparte.
    const main = fleetSum(ucs, occAvg, roomsList, base);
    const hi = fleetSum(ucs, occHigh, roomsList, base);
    const lo = fleetSum(ucs, occLow, roomsList, base);
    let scaleSum = 0;
    roomsList.forEach(function(r){ if (r > 0) scaleSum += r / base; });
    if (scaleSum <= 0) scaleSum = 1;
    let hoursMonth = 0;
    let extraSaving = 0;
    ucs.forEach(function(c){
      hoursMonth += c.hours0 * occAvg * 30;
      extraSaving += c.extra;
    });
    hoursMonth *= scaleSum;
    extraSaving *= scaleSum;
    const savingM = hoursMonth * hourly * (1 + hidden) + extraSaving;
    const SAVE_FACTOR = 0.5;
    const saveNet = SAVE_FACTOR * savingM;
    const fte = fteH > 0 ? hoursMonth / fteH : 0;
    const units = main.units;
    const integCost = val('lifts') * INTEG_LIFT * props;
    const capex = main.capex + integCost;
    let leaseM = integCost > 0 ? annuity(integCost, apr, tFin) : 0;
    let raasLeaseM = integCost > 0 ? annuity(integCost, apr, tRaas) : 0;
    let careM = 0;
    Object.keys(main.agg).forEach(function(k){
      const u = main.agg[k];
      const P = MODELS[k].price;
      leaseM += annuity(P, apr, tFin) * u;
      raasLeaseM += annuity(P, apr, tRaas) * u;
      careM += ALPHACARE[level][MODELS[k].cls] * u;
    });
    const consumM = consumU * units;
    const purchaseMonthly = careM + consumM;
    const finDuring = leaseM + careM + consumM;
    const finAfter = careM + consumM;
    const raasMonthly = (raasLeaseM + careM) * (1 + prem) + consumM;
    const raasPerRobot = units ? raasMonthly / units : 0;
    const leasePerRobot = units ? leaseM / units : 0;
    const monthlyInterest = apr / 100 / 12;

    const cost = { purchase: [capex], fin: [0], raas: [0] };
    const net = { purchase: [-capex], fin: [0], raas: [0] };
    let beF = null;
    let beR = null;
    for (let m = 1; m <= H; m++) {
      cost.purchase.push(cost.purchase[m - 1] + purchaseMonthly);
      cost.fin.push(cost.fin[m - 1] + (m <= tFin ? finDuring : finAfter));
      cost.raas.push(cost.raas[m - 1] + raasMonthly);
      net.purchase.push(net.purchase[m - 1] + saveNet - purchaseMonthly);
      net.fin.push(net.fin[m - 1] + saveNet - (m <= tFin ? finDuring : finAfter));
      net.raas.push(net.raas[m - 1] + saveNet - raasMonthly);
      if (beF === null && net.fin[m] >= 0) beF = m;
      if (beR === null && net.raas[m] >= 0) beR = m;
    }

    const netP = net.purchase[H];
    const netF = net.fin[H];
    const netR = net.raas[H];
    const pay = (saveNet - purchaseMonthly) > 0 ? capex / (saveNet - purchaseMonthly) : null;
    const capexAppetite = byId('capex').value;
    const acct = byId('acct').value;
    let rec;
    let why;
    if (state.mode === 'big') {
      rec = 'raas';
      const reasons = [];
      if ((occHigh - occLow) >= 0.25) reasons.push(T('reasonSeasonal'));
      if (acct === 'opex') reasons.push(T('reasonOpex'));
      if (val('props') > 1) reasons.push(T('reasonProps', { props: val('props') }));
      reasons.push(T('reasonCare'));
      why = T('bigWhyBase', { reasons: reasons.join(', ') });
    } else {
      const order = [['purchase', netP], ['fin', netF], ['raas', netR]].sort(function(a, b){ return b[1] - a[1]; });
      rec = order[0][0];
      if (capexAppetite === 'low' && rec === 'purchase') rec = netF >= netR ? 'fin' : 'raas';
      const names = { purchase: T('purchase'), fin: T('financed'), raas: T('raas') };
      why = T('smallWhy', { name: names[rec], years: horizonY });
    }

    state.result = {
      planRows: main.plan,
      props: props,
      agg: main.agg,
      units: units,
      capex: capex,
      integCost: integCost,
      fte: fte,
      savingM: savingM,
      saveNet: saveNet,
      horizonY: horizonY,
      hiU: hi.units,
      loU: lo.units,
      occHigh: occHigh,
      occLow: occLow,
      level: level,
      raasPerRobot: raasPerRobot,
      apr: apr,
      tFin: tFin,
      monthlyInterest: monthlyInterest,
      purchase: { monthly: purchaseMonthly, net: netP, pay: pay },
      fin: { monthly: finDuring, net: netF, be: beF, leaseM: leaseM, leasePerRobot: leasePerRobot },
      raas: { monthly: raasMonthly, net: netR, be: beR },
      cost: cost,
      H: H,
      rec: rec,
      why: why,
      ucs: ucs,
      vertical: state.vertical
    };
    render(state.result);
    fillLeadFields();
  }

  function render(r){
    const recMonthly = r[r.rec] ? r[r.rec].monthly : r.raas.monthly;
    const saveNetMonthly = Math.max(0, r.saveNet - recMonthly);
    const bePct = r.savingM > 0 ? Math.round(recMonthly / r.savingM * 100) : 0;
    const fteStr = (LANG === 'en' ? r.fte.toFixed(1) : r.fte.toFixed(1).replace('.', ','));
    setHTML('kpis',
      '<div class="config-kpi"><div class="v">' + r.units + '</div><div class="l">' + T('kpiRobots') + '</div></div>' +
      '<div class="config-kpi"><div class="v">\u2248' + fteStr + '</div><div class="l">' + T('kpiFte') + '</div></div>' +
      '<div class="config-kpi k-main"><div class="v">' + EUR(saveNetMonthly) + '</div><div class="l">' + T('kpiSaving') + '</div></div>');
    renderFleetThumb(r);
    setHTML('kpiNote', T('kpiBreakeven', { pct: bePct }));

    const flex = r.hiU !== r.loU
      ? T('flexSeasonal', { hi: r.hiU, lo: r.loU })
      : T('flexStable');
    setHTML('flexNote', flex);

    setHTML('planBody', r.planRows.map(function(p){
      return '<tr><td>' + p.uc + '</td><td>' + MODELS[p.m].n + '</td><td class="uds">' + p.u + '</td><td>' + modelAcc(p.m) + '</td></tr>';
    }).join(''));

    const lv = r.level;
    const mn = Math.min(ALPHACARE[lv].ligera, ALPHACARE[lv].media, ALPHACARE[lv].pesada);
    const mx = Math.max(ALPHACARE[lv].ligera, ALPHACARE[lv].media, ALPHACARE[lv].pesada);
    setHTML('careprice', T('carePrice', { level: LVLNAME[lv], min: EUR(mn), max: EUR(mx) }));
    setText('sla', SLA[lv]);

    const names = { purchase: T('purchase'), fin: T('financed'), raas: T('raas') };
    setHTML('reco', '<div class="lab">' + T('recoLabel') + '</div><div class="big">' + names[r.rec] + '</div><p>' + r.why + '</p>');

    const card = function(key, title, desc, sub, monthly, net, extra){
      const win = r.rec === key ? ' win' : '';
      const badge = r.rec === key ? '<div class="badge">' + T('recommended') + '</div>' : '';
      const flow = r.saveNet - monthly;
      const financeDetails = key === 'fin'
        ? '<details class="finance-method"><summary>' + T('financeHow') + '</summary><p>' + T('financeText') + '</p><dl><div><dt>' + T('term') + '</dt><dd>' + r.tFin + ' ' + T('months') + '</dd></div><div><dt>' + T('apr') + '</dt><dd>' + fmtPct(r.apr, 1) + '%</dd></div><div><dt>' + T('monthlyInterest') + '</dt><dd>' + fmtPct(r.monthlyInterest * 100, 3) + '%</dd></div><div><dt>' + T('estimatedFinanceFee') + '</dt><dd>' + EUR(r.fin.leasePerRobot) + T('perRobotMonth') + ' · ' + EUR(r.fin.leaseM) + T('fleetMonth') + '</dd></div></dl></details>'
        : '';
      const detailInner = '<ul>' +
        '<li>' + T('netMonthlyFlow') + ': <strong class="' + (flow >= 0 ? 'pos' : 'neg') + '">' + (flow >= 0 ? '+' : '') + EUR(flow) + '</strong></li>' +
        extra + '<li>' + T('netBenefitYears', { years: r.horizonY }) + ': <strong class="' + (net >= 0 ? 'pos' : 'neg') + '">' + (net >= 0 ? '+' : '') + EUR(net) + '</strong></li></ul>' + financeDetails;
      const detail = state.unlocked
        ? '<div class="config-detail">' + detailInner + '</div>'
        : '<div class="config-detail locked"><span>' + T('lockDetail') + '</span></div>';
      return '<article class="config-option' + win + '">' + badge + '<h4>' + title + '</h4><p>' + desc + '</p>' +
        '<div class="fee">' + EUR(monthly) + ' <small>' + (LANG === 'en' ? '/month' : '/mes') + sub + '</small></div>' + detail + '</article>';
    };

    setHTML('opts',
      card('purchase', T('purchase'), T('purchaseDesc'), T('operationSub'), r.purchase.monthly, r.purchase.net,
        '<li>' + T('referenceInvestment') + ': <strong>' + EUR(r.capex) + '</strong></li><li>' + T('estimatedPayback') + ': <strong>' + (r.purchase.pay ? Math.round(r.purchase.pay) + ' ' + T('months') : '-') + '</strong></li>') +
      card('fin', T('financed'), T('finDesc'), T('financedSub'), r.fin.monthly, r.fin.net,
        '<li>' + T('noUpfront') + '</li><li>' + T('breakevenMonth') + ' <strong>' + (r.fin.be == null ? '-' : r.fin.be) + '</strong></li>') +
      card('raas', 'RaaS / OpExFlow', T('raasDesc'), T('includedSub'), r.raas.monthly, r.raas.net,
        '<li>' + T('noUpfront') + '</li><li>' + T('alphaCareIncluded') + '</li><li>' + T('purchaseOptionMonth12') + '</li>'));

    setHTML('paybackBody',
      '<tr><td>' + T('purchase') + '</td><td>' + (r.purchase.pay ? Math.round(r.purchase.pay) + ' ' + T('months') : '-') + '</td><td>' + EUR(r.purchase.net) + '</td></tr>' +
      '<tr><td>' + T('financed') + '</td><td>' + (r.fin.be == null ? '-' : r.fin.be + ' ' + T('months')) + '</td><td>' + EUR(r.fin.net) + '</td></tr>' +
      '<tr><td>RaaS / OpExFlow</td><td>' + (r.raas.be == null ? '-' : r.raas.be + ' ' + T('months')) + '</td><td>' + EUR(r.raas.net) + '</td></tr>');

    const rr = r.raasPerRobot;
    setHTML('benchMkt', T('benchmark', { raas: EUR(rr), saving: EUR(r.savingM) }));

    drawChart(r.cost, r.H);
    setText('disc', T('disclaimer'));
    setText('mRobots', r.units);
    setHTML('mSave', EUR(saveNetMonthly));
    var __mbar = byId('configMbar'); if (__mbar) __mbar.hidden = false;
  }

  function drawChart(series, months){
    const chart = byId('chart');
    if (!chart) return;
    const W = 560;
    const Ht = 240;
    const pl = 58;
    const pr = 12;
    const pt = 14;
    const pb = 26;
    const all = series.purchase.concat(series.fin, series.raas);
    const mn = 0;
    const mx = Math.max.apply(Math, all.concat([1])) * 1.06;
    const x = function(m){ return pl + (W - pl - pr) * (m / months); };
    const y = function(v){ return pt + (Ht - pt - pb) * (1 - (v - mn) / (mx - mn)); };
    const path = function(arr){
      return arr.map(function(v, m){ return (m ? 'L' : 'M') + x(m).toFixed(1) + ' ' + y(v).toFixed(1); }).join(' ');
    };
    let grid = '';
    for (let i = 0; i <= 4; i++) {
      const v = mn + (mx - mn) * i / 4;
      const yy = y(v);
      grid += '<line x1="' + pl + '" y1="' + yy + '" x2="' + (W - pr) + '" y2="' + yy + '" stroke="#dce7f2"/><text x="' + (pl - 6) + '" y="' + (yy + 3) + '" text-anchor="end" font-size="9" fill="#6b7a8c">' + EUR1(v / 1000) + 'k</text>';
    }
    let xl = '';
    const yrs = Math.round(months / 12);
    for (let ym = 0; ym <= yrs; ym++) {
      const m = ym * 12;
      xl += '<text x="' + x(m) + '" y="' + (Ht - 8) + '" text-anchor="middle" font-size="9" fill="#6b7a8c">' + ym + T('yearSuffix') + '</text>';
    }
    chart.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + Ht + '" role="img" aria-label="' + T('chartAria') + '">' + grid +
      '<path d="' + path(series.purchase) + '" fill="none" stroke="#ef3da5" stroke-width="2.4"/>' +
      '<path d="' + path(series.fin) + '" fill="none" stroke="#53BAED" stroke-width="2.4"/>' +
      '<path d="' + path(series.raas) + '" fill="none" stroke="#0164A8" stroke-width="2.8"/>' + xl + '</svg>';
  }

  function resultSummary(){
    const r = state.result;
    if (!r) return '';
    const names = { purchase: T('purchase'), fin: T('financed'), raas: 'RaaS / OpExFlow' };
    return T('summary', { units: r.units, saving: EUR(r.savingM), route: names[r.rec], fleet: fleetSummary(r) });
  }

  function fleetSummary(r){
    if (!r) return '';
    return r.planRows.map(function(p){ return p.u + ' x ' + MODELS[p.m].n + ' (' + p.uc + ')'; }).join(' | ');
  }

  function activeUseCases(){
    return ['room', 'fnb', 'clean', 'trans'].filter(function(uc){
      const cb = byId('uc_' + uc);
      return cb && cb.checked;
    }).join(',');
  }

  // Construye los datos ya formateados para el PDF corporativo del configurador.
  function buildReportData(){
    const r = state.result;
    if (!r) return null;
    const props = Math.max(1, Math.round(val('props')));
    const recMonthly = r[r.rec] ? r[r.rec].monthly : r.raas.monthly;
    const saveNetMonthly = Math.max(0, r.saveNet - recMonthly);
    return {
      lang: LANG,
      date: new Date().toLocaleDateString(LOCALE),
      verticalLabel: (VERT[state.vertical] || VERT.hotel).label,
      props: props,
      roomsList: getRoomsList(props),
      occHigh: Math.round(val('occ_high')),
      occLow: Math.round(val('occ_low')),
      units: r.units,
      fte: (LANG === 'en' ? r.fte.toFixed(1) : r.fte.toFixed(1).replace('.', ',')),
      saveNet: EUR(saveNetMonthly),
      models: r.planRows.map(function(p){
        return {
          area: p.uc,
          name: MODELS[p.m] ? MODELS[p.m].n : p.m,
          units: p.u,
          acc: modelAcc(p.m),
          img: (FLEET_THUMBS[p.m] || FLEET_THUMB_FALLBACK) + THUMB_V
        };
      }),
      routes: [
        { key: 'purchase', name: T('purchase'), fee: EUR(r.purchase.monthly), sub: T('estimatedPayback') + ': ' + (r.purchase.pay ? Math.round(r.purchase.pay) + ' ' + T('months') : '-') },
        { key: 'fin', name: T('financed'), fee: EUR(r.fin.monthly), sub: T('breakevenMonth') + ' ' + (r.fin.be == null ? '-' : r.fin.be) },
        { key: 'raas', name: 'RaaS / OpExFlow', fee: EUR(r.raas.monthly), sub: T('alphaCareIncluded') }
      ],
      rec: r.rec,
      note: T('disclaimer')
    };
  }

  // Envia el lead a Netlify Forms como multipart, adjuntando el PDF si existe.
  async function submitLeadWithPdf(formEl, pdfBlob){
    const fd = new FormData(formEl);
    fd.delete('informe_pdf');
    if (pdfBlob) {
      fd.append('informe_pdf', pdfBlob, 'Informe_configuracion_KEENON_AlphaRobotics.pdf');
    }
    if (!fd.get('form-name')) {
      fd.append('form-name', formEl.getAttribute('name') || 'configurador-lead');
    }
    const currentPath = window.location && window.location.pathname ? window.location.pathname : '/configurador';
    const endpoints = [currentPath, '/configurador', '/'].filter(function(endpoint, index, list){
      return endpoint && list.indexOf(endpoint) === index;
    });
    let lastError = null;
    for (const endpoint of endpoints) {
      try {
        const res = await fetch(endpoint, { method: 'POST', body: fd });
        if (res.ok || res.redirected || (res.status >= 200 && res.status < 400)) {
          return true;
        }
        lastError = new Error('Netlify Forms rechazó ' + endpoint + ' (' + res.status + ')');
      } catch (err) {
        lastError = err;
      }
    }
    throw lastError || new Error('Netlify Forms no disponible');
  }

  function fillLeadFields(){
    const form = byId('configurador-lead-form');
    const r = state.result;
    if (!form || !r) return;
    const names = { purchase: T('purchase'), fin: T('financed'), raas: 'RaaS / OpExFlow' };
    const fields = {
      vertical: state.vertical,
      area_preseleccionada: state.areaKey,
      modo_cuenta: state.mode === 'big' ? T('modeBig') : T('modeSmall'),
      habitaciones_unidades: getRoomsList(Math.max(1, Math.round(val('props')))).join(' / '),
      propiedades: val('props'),
      plantas: val('floors'),
      ocupacion_alta: val('occ_high'),
      ocupacion_baja: val('occ_low'),
      casos_uso: activeUseCases(),
      flota_detalle: fleetSummary(r),
      robots_totales: r.units,
      ahorro_mensual: Math.round(r.savingM),
      fte_liberadas: r.fte.toFixed(1),
      via_recomendada: names[r.rec],
      nivel_alpha_care: LVLNAME[r.level],
      gran_cuenta: state.mode === 'big' ? 'si' : 'no',
      payback_meses: r.purchase.pay ? Math.round(r.purchase.pay) : '',
      cuota_raas_mensual: Math.round(r.raas.monthly),
      inversion_referencia: Math.round(r.capex),
      resultado_resumen: resultSummary()
    };
    Object.keys(fields).forEach(function(name){
      const input = form.querySelector('[name="' + name + '"]');
      if (input) input.value = fields[name];
    });
  }

  function unlockResults(name, note, pdfBlob){
    state.unlocked = true;
    if (state.result) render(state.result);
    const gated = byId('config-gated');
    const gate = byId('config-gate');
    const intro = byId('config-gate-success');
    if (gate) gate.hidden = true;
    if (gated) gated.hidden = false;
    if (intro) {
      intro.hidden = false;
      intro.textContent = (note ? note + ' ' : '') + T('unlocked', { name: name || T('unlockedFallback') });
      const actions = document.createElement('div');
      actions.className = 'config-success-actions';
      if (pdfBlob) {
        const dl = document.createElement('a');
        dl.className = 'btn primary';
        dl.href = URL.createObjectURL(pdfBlob);
        dl.download = 'Informe_configuracion_KEENON_AlphaRobotics.pdf';
        dl.textContent = T('downloadPdf');
        actions.appendChild(dl);
      }
      const whatsapp = document.createElement('a');
      whatsapp.className = 'btn light';
      whatsapp.href = 'https://wa.me/34659483652?text=Hola%2C%20quiero%20revisar%20mi%20informe%20del%20configurador%20KEENON%20y%20solicitar%20un%20diagn%C3%B3stico%20de%20sitio';
      whatsapp.target = '_blank';
      whatsapp.rel = 'noopener';
      whatsapp.textContent = T('whatsappReview');
      actions.appendChild(whatsapp);
      if (BOOKING_URL) {
        const booking = document.createElement('a');
        booking.className = 'btn primary';
        booking.href = BOOKING_URL;
        booking.target = '_blank';
        booking.rel = 'noopener';
        booking.textContent = T('bookSite');
        actions.appendChild(booking);
      }
      intro.appendChild(actions);
    }
  }

  function bindConfigurator(){
    if (!byId('configurator')) return;
    const segment = byId('seg');
    if (segment) {
      segment.addEventListener('click', function(ev){
        const button = ev.target && ev.target.closest ? ev.target.closest('button[data-mode]') : null;
        if (!button || !segment.contains(button)) return;
        ev.preventDefault();
        setMode(button.getAttribute('data-mode'));
      });
    }
    const verticals = byId('vbtns');
    if (verticals) {
      verticals.addEventListener('click', function(ev){
        const button = ev.target && ev.target.closest ? ev.target.closest('button[data-v]') : null;
        if (!button || !verticals.contains(button)) return;
        ev.preventDefault();
        state.areaKey = '';
        setVertical(button.getAttribute('data-v'));
      });
    }
    document.querySelectorAll('.config-uc').forEach(function(uc){
      const cb = uc.querySelector('input[type="checkbox"]');
      if (!cb) return;
      cb.addEventListener('change', function(){
        uc.classList.toggle('active', cb.checked);
        compute();
      });
    });
    const rooms = byId('rooms');
    if (rooms) {
      rooms.addEventListener('input', scaleVolumesFromRooms);
    }
    const propsInput = byId('props');
    if (propsInput) {
      const onProps = function(){ renderPropertyRooms(false); compute(); };
      propsInput.addEventListener('input', onProps);
      propsInput.addEventListener('change', onProps);
    }
    document.querySelectorAll('#configurator input, #configurator select').forEach(function(el){
      el.addEventListener('input', compute);
      el.addEventListener('change', compute);
    });
    var __mGo = byId('mGo');
    if (__mGo) __mGo.addEventListener('click', function(){ var t = document.querySelector('.config-results'); if (t) t.scrollIntoView({ behavior: 'smooth' }); });

    const params = new URLSearchParams(window.location.search);
    const area = params.get('area');
    const vertical = params.get('v');
    const uc = params.get('uc');
    const ucList = (uc && /^(clean|room|fnb|trans)$/.test(uc)) ? [uc] : undefined;
    const mapped = area ? AREA[area] : null;
    state.areaKey = mapped ? area : '';
    if (mapped) {
      setVertical(mapped.vertical, mapped.cases);
    } else if (vertical && VERT[vertical]) {
      setVertical(vertical, ucList);
    } else {
      setVertical('hotel');
    }

    const leadForm = byId('configurador-lead-form');
    const status = byId('config-lead-status');
    if (leadForm) {
      leadForm.addEventListener('submit', async function(ev){
        ev.preventDefault();
        fillLeadFields();
        const data = new FormData(leadForm);
        const name = (data.get('nombre') || '').toString().trim();
        const email = (data.get('email') || '').toString().trim();
        if (!name || !email || !data.get('privacidad')) {
          if (status) status.textContent = T('requiredFields');
          return;
        }
        let pdfBlob = null;
        if (typeof window.buildConfiguradorPDF === 'function') {
          if (status) status.textContent = T('generatingPdf');
          try {
            pdfBlob = await window.buildConfiguradorPDF(buildReportData());
          } catch (e) {
            pdfBlob = null;
          }
        }
        if (status) status.textContent = T('registering');
        try {
          await submitLeadWithPdf(leadForm, pdfBlob);
          if (status) status.textContent = '';
          unlockResults(name, null, pdfBlob);
        } catch (err) {
          unlockResults(name, T('fallbackNotice'), pdfBlob);
        }
      });
    }

    const printButton = byId('config-print');
    if (printButton) {
      printButton.addEventListener('click', function(){
        fillLeadFields();
        window.print();
      });
    }

    const cta = byId('cta');
    if (cta) {
      cta.addEventListener('click', function(){
        fillLeadFields();
      });
    }
  }

  function bindMiniFinder(){
    document.querySelectorAll('[data-config-mini-finder]').forEach(function(form){
      form.addEventListener('submit', function(ev){
        ev.preventDefault();
        const area = new FormData(form).get('area') || 'room-service';
        const base = LANG === 'en' ? '/en/configurador' : '/configurador';
        window.location.href = base + '?area=' + encodeURIComponent(area.toString());
      });
    });
  }

  function ready(fn){
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  }

  ready(function(){
    bindMiniFinder();
    bindConfigurator();
  });
})();
