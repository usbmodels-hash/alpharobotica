/* v4.146 — language-aware helpers for dynamic strings (EN site parity, ES behaviour unchanged) */
var ALPHA_LANG=(document.documentElement.lang||'es').slice(0,2);
var ALPHA_LOCALE=ALPHA_LANG==='en'?'en-GB':'es-ES';
function aT(es,en){return ALPHA_LANG==='en'?en:es;}
(function(){

  document.querySelectorAll('.reason-card>span,.area-icon,.robot-ico,.usecase-grid article>span').forEach(el=>el.setAttribute('aria-hidden','true'));

  const menuBtn=document.querySelector('.menu-btn');
  const menu=document.querySelector('[data-menu]');
  if(menuBtn&&menu){
    const dropdowns=Array.prototype.slice.call(menu.querySelectorAll('.nav-dropdown'));
    const closeDropdowns=()=>dropdowns.forEach(dd=>{
      dd.classList.remove('open');
      const t=dd.querySelector('.nav-dropdown-trigger');
      if(t) t.setAttribute('aria-expanded','false');
    });
    menuBtn.addEventListener('click',()=>{
      const open=menu.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded',String(open));
      if(!open) closeDropdowns();
    });
    dropdowns.forEach(dd=>{
      const trigger=dd.querySelector('.nav-dropdown-trigger');
      if(!trigger) return;
      trigger.setAttribute('aria-haspopup','true');
      trigger.setAttribute('aria-expanded','false');
      trigger.addEventListener('click',(event)=>{
        if(window.matchMedia('(max-width: 900px)').matches){
          event.preventDefault();
          event.stopPropagation();
          const willOpen=!dd.classList.contains('open');
          closeDropdowns();
          if(willOpen){
            dd.classList.add('open');
            trigger.setAttribute('aria-expanded','true');
          }
        }
      });
    });
    menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      if(a.classList.contains('nav-dropdown-trigger')&&window.matchMedia('(max-width: 900px)').matches) return;
      menu.classList.remove('open');
      menuBtn.setAttribute('aria-expanded','false');
      closeDropdowns();
    }));
  }

  if('IntersectionObserver' in window){
    document.documentElement.classList.add('js-reveal-ready');
    const io=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    },{rootMargin:'0px 0px -60px 0px',threshold:.1});
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  }


  const lightbox=document.createElement('div');
  lightbox.className='lightbox';
  lightbox.innerHTML='<div class="lightbox-dialog" role="dialog" aria-modal="true" aria-label="Visor multimedia"><div class="lightbox-header"><h3>Visor multimedia</h3><button type="button" class="lightbox-close" aria-label="Cerrar visor">×</button></div><div class="lightbox-body"><button type="button" class="lightbox-nav lightbox-prev" aria-label="Anterior">‹</button><div class="lightbox-media"></div><button type="button" class="lightbox-nav lightbox-next" aria-label="Siguiente">›</button></div><div class="lightbox-caption"></div><div class="lightbox-thumbs"></div></div>';
  document.body.appendChild(lightbox);
  const lightboxTitle=lightbox.querySelector('h3');
  const lightboxMedia=lightbox.querySelector('.lightbox-media');
  const lightboxCaption=lightbox.querySelector('.lightbox-caption');
  const lightboxThumbs=lightbox.querySelector('.lightbox-thumbs');
  let activeGalleryItems=[];
  let activeGalleryTitle='Visor multimedia';
  let activeIndex=0;

  function renderLightbox(){
    if(!activeGalleryItems.length) return;
    const item=activeGalleryItems[activeIndex];
    lightboxTitle.textContent=activeGalleryTitle;
    lightboxMedia.innerHTML='';
    if(item.type==='video'){
      const vid=document.createElement('video');
      vid.controls=true;vid.autoplay=true;vid.playsInline=true;vid.preload='metadata';
      if(item.poster) vid.poster=item.poster;
      if(item.webm){
        const webmSource=document.createElement('source');
        webmSource.src=item.webm;
        webmSource.type='video/webm';
        vid.appendChild(webmSource);
      }
      const mp4Source=document.createElement('source');
      mp4Source.src=item.src;
      mp4Source.type='video/mp4';
      vid.appendChild(mp4Source);
      lightboxMedia.appendChild(vid);
    }else{
      const img=document.createElement('img');
      img.src=item.src; img.alt=item.alt||activeGalleryTitle;
      lightboxMedia.appendChild(img);
    }
    lightboxCaption.textContent=item.alt||activeGalleryTitle;
    lightboxThumbs.innerHTML='';
    activeGalleryItems.forEach((entry,idx)=>{
      const btn=document.createElement('button');
      btn.type='button';
      if(idx===activeIndex) btn.classList.add('active');
      btn.setAttribute('aria-label',(entry.type==='video'?aT('Ver vídeo ','Watch video '):aT('Ver imagen ','View image '))+(idx+1));
      if(entry.type==='video'){
        const thumb=document.createElement('div');
        thumb.className='lightbox-video-thumb';
        thumb.textContent='VIDEO';
        btn.appendChild(thumb);
      }else{
        const thumb=document.createElement('img');
        thumb.src=entry.poster||entry.src; thumb.alt='';
        btn.appendChild(thumb);
      }
      btn.addEventListener('click',()=>{activeIndex=idx;renderLightbox();});
      lightboxThumbs.appendChild(btn);
    });
  }
  function openLightbox(items,startIndex,title){
    activeGalleryItems=items; activeIndex=startIndex||0; activeGalleryTitle=title||'Visor multimedia';
    renderLightbox();
    lightbox.classList.add('open');
    document.body.style.overflow='hidden';
  }
  function closeLightbox(){
    lightbox.classList.remove('open');
    document.body.style.overflow='';
    lightboxMedia.innerHTML='';
  }
  lightbox.querySelector('.lightbox-close').addEventListener('click',closeLightbox);
  lightbox.addEventListener('click',e=>{ if(e.target===lightbox) closeLightbox(); });
  lightbox.querySelector('.lightbox-prev').addEventListener('click',()=>{ if(!activeGalleryItems.length) return; activeIndex=(activeIndex-1+activeGalleryItems.length)%activeGalleryItems.length; renderLightbox(); });
  lightbox.querySelector('.lightbox-next').addEventListener('click',()=>{ if(!activeGalleryItems.length) return; activeIndex=(activeIndex+1)%activeGalleryItems.length; renderLightbox(); });
  document.addEventListener('keydown',e=>{
    if(!lightbox.classList.contains('open')) return;
    if(e.key==='Escape') closeLightbox();
    if(e.key==='ArrowRight'){activeIndex=(activeIndex+1)%activeGalleryItems.length; renderLightbox();}
    if(e.key==='ArrowLeft'){activeIndex=(activeIndex-1+activeGalleryItems.length)%activeGalleryItems.length; renderLightbox();}
  });

  document.querySelectorAll('[data-gallery]').forEach(gallery=>{
    const main=gallery.querySelector('.gallery-main');
    const thumbs=Array.from(gallery.querySelectorAll('.thumb'));
    const prev=gallery.querySelector('.gallery-prev');
    const next=gallery.querySelector('.gallery-next');
    const dotsWrap=gallery.querySelector('.gallery-dots');
    const openBtns=gallery.parentElement.querySelectorAll('.gallery-open-btn');
    const frame=gallery.querySelector('.gallery-frame');
    const items=thumbs.map(btn=>({src:btn.dataset.src||'',webm:btn.dataset.webm||'',alt:btn.dataset.alt||'',type:btn.dataset.type||'image',poster:btn.dataset.poster||''}));
    let current=Math.max(0,thumbs.findIndex(btn=>btn.classList.contains('active')));

    if(dotsWrap){
      dotsWrap.innerHTML='';
      thumbs.forEach((_,idx)=>{
        const dot=document.createElement('button');
        dot.type='button';
        dot.className='gallery-dot'+(idx===current?' active':'');
        dot.setAttribute('aria-label','Ver elemento '+(idx+1));
        dot.addEventListener('click',()=>show(idx));
        dotsWrap.appendChild(dot);
      });
    }

    const dots=Array.from(gallery.querySelectorAll('.gallery-dot'));
    if(thumbs.length<2){
      if(prev) prev.hidden=true;
      if(next) next.hidden=true;
      if(dotsWrap) dotsWrap.hidden=true;
    }

    function renderInline(item){
      if(!main||!item) return;
      if(item.type==='video' && item.poster){
        main.src=item.poster;
        main.alt=(item.alt||aT('Vídeo','Video'))+aT(' — pulsa para reproducir',' — press to play');
      }else{
        main.src=item.src;
        main.alt=item.alt||main.alt;
      }
    }

    function show(index){
      if(!main||!thumbs.length) return;
      current=(index+thumbs.length)%thumbs.length;
      const btn=thumbs[current];
      const item=items[current];
      gallery.classList.add('is-changing');
      window.setTimeout(()=>{
        renderInline(item);
        thumbs.forEach((b,i)=>b.classList.toggle('active',i===current));
        dots.forEach((d,i)=>d.classList.toggle('active',i===current));
        btn.scrollIntoView({behavior:'smooth',inline:'center',block:'nearest'});
        gallery.classList.remove('is-changing');
      },90);
    }

    thumbs.forEach((btn,idx)=>btn.addEventListener('click',()=>show(idx)));
    if(prev) prev.addEventListener('click',()=>show(current-1));
    if(next) next.addEventListener('click',()=>show(current+1));
    if(frame){
      frame.addEventListener('click',()=>openLightbox(items,current,gallery.dataset.title||'Visor multimedia'));
      frame.addEventListener('keydown',e=>{if(e.key==='Enter' || e.key===' '){e.preventDefault();openLightbox(items,current,gallery.dataset.title||'Visor multimedia');}});
    }
    openBtns.forEach(btn=>btn.addEventListener('click',()=>openLightbox(items,current,gallery.dataset.title||'Visor multimedia')));
    renderInline(items[current]);
  });


  function encode(data){
    return Object.keys(data).map(k=>encodeURIComponent(k)+'='+encodeURIComponent(data[k])).join('&');
  }

  const roiForm=document.getElementById('roi-form');
  const roiStatus=document.getElementById('roi-status');
  const roiEmbed=document.getElementById('roi-embed');
  const roiUser=document.getElementById('roi-user');

  function unlockROI(name){
    if(!roiForm||!roiEmbed) return;
    roiForm.hidden=true;
    roiEmbed.hidden=false;
    if(roiUser) roiUser.textContent=(name||'tu empresa').split(' ')[0];
    try{
      localStorage.setItem('alpha_roi_unlocked','1');
      localStorage.setItem('alpha_roi_name',name||'');
    }catch(e){}
  }

  try{
    if(localStorage.getItem('alpha_roi_unlocked')==='1'){
      unlockROI(localStorage.getItem('alpha_roi_name')||'');
    }
  }catch(e){}

  if(roiForm){
    roiForm.addEventListener('submit',async ev=>{
      ev.preventDefault();
      const data=new FormData(roiForm);
      const name=(data.get('nombre')||'').toString().trim();
      const email=(data.get('email')||'').toString().trim();
      if(!name||!email){
        if(roiStatus) roiStatus.textContent=aT('Completa nombre y email para activar el simulador.','Enter your name and email to activate the simulator.');
        return;
      }
      if(roiStatus) roiStatus.textContent=aT('Registrando solicitud...','Registering request...');
      try{
        const res=await fetch('/',{
          method:'POST',
          headers:{'Content-Type':'application/x-www-form-urlencoded'},
          body:encode(Object.fromEntries(data))
        });
        if(!res.ok) throw new Error('Form not accepted');
        unlockROI(name);
      }catch(err){
        if(roiStatus) roiStatus.textContent=aT('No hemos podido registrar la solicitud. Por favor, revisa los datos o contacta directamente por teléfono.','We could not register your request. Please check the details or contact us directly by phone.');
      }
    });
  }

  // Advanced ROI calculator: cleaned and adapted from the standalone C40 calculator.
  // Public-facing version: no distributor margin, no unverified external claims.
  const calcInputs={
    siteType:document.getElementById('calc-site-type'),
    area:document.getElementById('calc-area'),
    shiftHours:document.getElementById('calc-shift-hours'),
    daysWeek:document.getElementById('calc-days-week'),
    labourMonth:document.getElementById('calc-labour-month'),
    humanEff:document.getElementById('calc-human-eff'),
    c40Price:document.getElementById('calc-c40-price'),
    c40Rent:document.getElementById('calc-c40-rent'),
    c40Opex:document.getElementById('calc-c40-opex')
  };
  const calcOut={
    rentSaving:document.getElementById('calc-rent-saving'),
    payback:document.getElementById('calc-payback'),
    costReduction:document.getElementById('calc-cost-reduction'),
    robotsNeeded:document.getElementById('calc-robots-needed'),
    humanWorkers:document.getElementById('calc-human-workers'),
    humanCost:document.getElementById('calc-human-cost'),
    humanM2:document.getElementById('calc-human-m2'),
    robotCost:document.getElementById('calc-robot-cost'),
    robotM2:document.getElementById('calc-robot-m2'),
    annualSaving:document.getElementById('calc-annual-saving'),
    purchaseInvestment:document.getElementById('calc-purchase-investment'),
    purchaseYear1:document.getElementById('calc-purchase-year1'),
    summary:document.getElementById('calc-summary')
  };

  const eur=new Intl.NumberFormat(ALPHA_LOCALE,{style:'currency',currency:'EUR',maximumFractionDigits:0});
  const num=new Intl.NumberFormat(ALPHA_LOCALE,{maximumFractionDigits:1});
  const dec4=new Intl.NumberFormat(ALPHA_LOCALE,{minimumFractionDigits:4,maximumFractionDigits:4});

  const C40_EFF_M2_H=1100;        // C40 catalog cleaning efficiency used for the first simulation model.
  const C40_MAX_RUN_H=5;          // Practical single-cycle cap; final proposal must adjust to real routes/recharge plan.

  const siteDefaults={
    hotel:{area:2500,shiftHours:6,daysWeek:7,labourMonth:1400,humanEff:250,c40Rent:450,c40Opex:80},
    retail:{area:8000,shiftHours:8,daysWeek:7,labourMonth:1550,humanEff:300,c40Rent:450,c40Opex:100},
    health:{area:3500,shiftHours:7,daysWeek:7,labourMonth:1600,humanEff:225,c40Rent:450,c40Opex:100},
    supermarket:{area:1800,shiftHours:4,daysWeek:7,labourMonth:1450,humanEff:275,c40Rent:450,c40Opex:70}
  };

  function readNumber(el, fallback=0){
    const value=Number(el&&el.value);
    return Number.isFinite(value)?value:fallback;
  }
  function unitLabel(n){return n===1?' robot':' robots';}
  function workerLabel(n){return n===1?aT(' operario',' worker'):aT(' operarios',' workers');}

  function updateAdvancedCalc(){
    if(!calcInputs.area) return;

    const area=readNumber(calcInputs.area,2500);
    const shiftHours=readNumber(calcInputs.shiftHours,6);
    const daysWeek=readNumber(calcInputs.daysWeek,7);
    const labourMonth=readNumber(calcInputs.labourMonth,1400);
    const humanEff=readNumber(calcInputs.humanEff,250);
    const c40Price=readNumber(calcInputs.c40Price,15000);
    const c40Rent=readNumber(calcInputs.c40Rent,450);
    const c40Opex=readNumber(calcInputs.c40Opex,80);

    const daysMonth=daysWeek*(52/12);
    const monthlyArea=area*daysMonth;

    const humanAreaPerShift=Math.max(1,humanEff*shiftHours);
    const workersNeeded=Math.max(1,Math.ceil(area/humanAreaPerShift));
    const humanMonthlyCost=workersNeeded*labourMonth;
    const humanCostM2=monthlyArea>0?humanMonthlyCost/monthlyArea:0;

    const robotRunHours=Math.min(shiftHours,C40_MAX_RUN_H);
    const robotAreaPerShift=Math.max(1,C40_EFF_M2_H*robotRunHours);
    const robotsNeeded=Math.max(1,Math.ceil(area/robotAreaPerShift));
    const robotMonthlyCost=robotsNeeded*(c40Rent+c40Opex);
    const robotCostM2=monthlyArea>0?robotMonthlyCost/monthlyArea:0;

    const monthlySaving=humanMonthlyCost-robotMonthlyCost;
    const annualSaving=monthlySaving*12;
    const costReduction=humanCostM2>0?((humanCostM2-robotCostM2)/humanCostM2)*100:0;
    const purchaseInvestment=robotsNeeded*c40Price;
    const purchasePayback=monthlySaving>0?purchaseInvestment/monthlySaving:null;
    const purchaseYear1=annualSaving-purchaseInvestment;

    if(calcOut.rentSaving) calcOut.rentSaving.textContent=eur.format(monthlySaving)+aT(' / mes',' / month');
    if(calcOut.payback) calcOut.payback.textContent=purchasePayback?num.format(purchasePayback)+aT(' meses',' months'):'—';
    if(calcOut.costReduction) calcOut.costReduction.textContent=num.format(costReduction)+'%';
    if(calcOut.robotsNeeded) calcOut.robotsNeeded.textContent=robotsNeeded+unitLabel(robotsNeeded);
    if(calcOut.humanWorkers) calcOut.humanWorkers.textContent=workersNeeded+workerLabel(workersNeeded);
    if(calcOut.humanCost) calcOut.humanCost.textContent=eur.format(humanMonthlyCost)+aT(' / mes',' / month');
    if(calcOut.humanM2) calcOut.humanM2.textContent='€'+dec4.format(humanCostM2)+' / m²';
    if(calcOut.robotCost) calcOut.robotCost.textContent=eur.format(robotMonthlyCost)+aT(' / mes',' / month');
    if(calcOut.robotM2) calcOut.robotM2.textContent='€'+dec4.format(robotCostM2)+' / m²';
    if(calcOut.annualSaving) calcOut.annualSaving.textContent=eur.format(annualSaving)+aT(' / año',' / year');
    if(calcOut.purchaseInvestment) calcOut.purchaseInvestment.textContent=eur.format(purchaseInvestment);
    if(calcOut.purchaseYear1) calcOut.purchaseYear1.textContent=eur.format(purchaseYear1);

    if(calcOut.summary){
      calcOut.summary.innerHTML=aT('Para cubrir <strong>','To cover <strong>')+new Intl.NumberFormat(ALPHA_LOCALE).format(area)+aT(' m²</strong> por turno, el escenario calcula <strong>',' m²</strong> per shift, the scenario calculates <strong>')+workersNeeded+workerLabel(workersNeeded)+aT('</strong> en operativa manual frente a <strong>','</strong> in manual operation versus <strong>')+robotsNeeded+unitLabel(robotsNeeded)+aT('</strong>. El ahorro mensual estimado en modalidad renting sería de <strong>','</strong>. The estimated monthly saving in renting mode would be <strong>')+eur.format(monthlySaving)+aT('</strong>. La propuesta final debe validar rutas, horarios, recargas, obstáculos, zonas húmedas y protocolos del equipo.','</strong>. The final proposal must validate routes, schedules, recharges, obstacles, wet zones and team protocols.');
    }
  }

  function applySiteDefaults(){
    const key=calcInputs.siteType?calcInputs.siteType.value:'hotel';
    const d=siteDefaults[key];
    if(!d) return;
    Object.entries({area:'area',shiftHours:'shiftHours',daysWeek:'daysWeek',labourMonth:'labourMonth',humanEff:'humanEff',c40Rent:'c40Rent',c40Opex:'c40Opex'}).forEach(([field,inputKey])=>{
      if(calcInputs[inputKey]) calcInputs[inputKey].value=d[field];
    });
    updateAdvancedCalc();
  }

  Object.values(calcInputs).forEach(el=>el&&el.addEventListener('input',updateAdvancedCalc));
  if(calcInputs.siteType) calcInputs.siteType.addEventListener('change',applySiteDefaults);
  updateAdvancedCalc();


  // v4.32 ROI multi-scenario calculator
  const roiTabs=Array.from(document.querySelectorAll('[data-roi-tab]'));
  const roiPanels=Array.from(document.querySelectorAll('[data-roi-panel]'));
  const roiOut={
    l1:document.getElementById('roi-label-1'), r1:document.getElementById('roi-result-1'),
    l2:document.getElementById('roi-label-2'), r2:document.getElementById('roi-result-2'),
    l3:document.getElementById('roi-label-3'), r3:document.getElementById('roi-result-3'),
    l4:document.getElementById('roi-label-4'), r4:document.getElementById('roi-result-4'),
    summary:document.getElementById('roi-result-summary')
  };
  const fmtEur=new Intl.NumberFormat(ALPHA_LOCALE,{style:'currency',currency:'EUR',maximumFractionDigits:0});
  const fmtNum=new Intl.NumberFormat(ALPHA_LOCALE,{maximumFractionDigits:1});
  function val(id,fallback){const el=document.getElementById(id); const n=Number(el&&el.value); return Number.isFinite(n)?n:fallback;}
  function setR(labels,values,summary){
    if(!roiOut.r1) return;
    roiOut.l1.textContent=labels[0]; roiOut.r1.textContent=values[0];
    roiOut.l2.textContent=labels[1]; roiOut.r2.textContent=values[1];
    roiOut.l3.textContent=labels[2]; roiOut.r3.textContent=values[2];
    roiOut.l4.textContent=labels[3]; roiOut.r4.textContent=values[3];
    roiOut.summary.textContent=summary;
  }
  function activeScenario(){return (roiTabs.find(b=>b.classList.contains('active'))||{}).dataset?.roiTab || 'cleaning';}
  function updateRoiMulti(){
    const scenario=activeScenario();
    if(scenario==='cleaning'){
      const area=val('roi-clean-area',2500), hours=val('roi-clean-hours',6), cost=val('roi-clean-cost',16), days=val('roi-clean-days',26);
      const manualMonthlyHours=hours*days;
      const savedHours=manualMonthlyHours*0.65;
      const monthly=savedHours*cost;
      const annual=monthly*12;
      const payback=monthly>0?18000/monthly:null;
      setR([aT('Horas ahorradas/mes','Hours saved/month'),aT('Ahorro mensual','Monthly saving'),aT('Ahorro anual','Annual saving'),aT('Payback estimado','Estimated payback')],[fmtNum.format(savedHours)+' h',fmtEur.format(monthly),fmtEur.format(annual),payback?fmtNum.format(payback)+aT(' meses',' months'):'—'],aT('Escenario C40: ','C40 scenario: ')+fmtNum.format(area)+aT(' m² y ',' m² and ')+fmtNum.format(hours)+aT(' h/día de limpieza manual.',' h/day of manual cleaning.'));
    }else if(scenario==='fnb'){
      const plates=val('roi-fnb-plates',350), dist=val('roi-fnb-distance',18), shifts=val('roi-fnb-shifts',2), cost=val('roi-fnb-cost',17);
      const kmMonth=(plates*dist*2*shifts*30)/1000;
      const hoursSaved=kmMonth/4.2;
      const monthly=hoursSaved*cost;
      const payback=monthly>0?22000/monthly:null;
      setR([aT('Km recorridos/mes','Km travelled/month'),aT('Horas ahorradas/mes','Hours saved/month'),aT('Ahorro mensual','Monthly saving'),aT('Payback estimado','Estimated payback')],[fmtNum.format(kmMonth)+' km',fmtNum.format(hoursSaved)+' h',fmtEur.format(monthly),payback?fmtNum.format(payback)+aT(' meses',' months'):'—'],aT('Escenario F&B: desplazamientos cocina-sala reducidos en servicios de alta rotación.','F&B scenario: kitchen-to-floor trips reduced in high-turnover service.'));
    }else{
      const deliveries=val('roi-room-deliveries',28), minutes=val('roi-room-minutes',12), cost=val('roi-room-cost',18), days=val('roi-room-days',30);
      const hours=(deliveries*minutes*days)/60;
      const savedHours=hours*0.75;
      const monthly=savedHours*cost;
      const annual=monthly*12;
      const payback=monthly>0?20000/monthly:null;
      setR([aT('Horas liberadas/mes','Hours freed/month'),aT('Ahorro mensual','Monthly saving'),aT('Ahorro anual','Annual saving'),aT('Payback estimado','Estimated payback')],[fmtNum.format(savedHours)+' h',fmtEur.format(monthly),fmtEur.format(annual),payback?fmtNum.format(payback)+aT(' meses',' months'):'—'],aT('Escenario W3: entregas a habitación y amenities con disponibilidad 24h.','W3 scenario: room deliveries and amenities with 24h availability.'));
    }
  }
  roiTabs.forEach(btn=>btn.addEventListener('click',()=>{
    roiTabs.forEach(b=>b.classList.toggle('active',b===btn));
    roiPanels.forEach(p=>p.classList.toggle('active',p.dataset.roiPanel===btn.dataset.roiTab));
    updateRoiMulti();
  }));
  document.querySelectorAll('.roi-multi-section input').forEach(el=>el.addEventListener('input',updateRoiMulti));
  updateRoiMulti();


  // v4.49 FAQ smooth scroll, accessible toggles and statsbar i18n
  const faqLinks = Array.from(document.querySelectorAll('a[href="#faq"], a[href="index.html#faq"], a[href="/#faq"]'));
  faqLinks.forEach(link=>{
    link.addEventListener('click', event=>{
      const target = document.getElementById('faq');
      if(!target) return;
      event.preventDefault();
      if(menu && menu.classList.contains('open')){
        menu.classList.remove('open');
        if(menuBtn) menuBtn.setAttribute('aria-expanded','false');
      }
      window.history.pushState(null,'','#faq');
      target.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  document.querySelectorAll('.faq-section .faq-list summary').forEach(summary=>{
    if(!summary.querySelector('.faq-toggle-icon')){
      const icon=document.createElementNS('http://www.w3.org/2000/svg','svg');
      icon.setAttribute('viewBox','0 0 24 24');
      icon.setAttribute('aria-hidden','true');
      icon.setAttribute('class','faq-toggle-icon');
      icon.innerHTML='<line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>';
      summary.appendChild(icon);
    }
  });

  const LANG=(document.documentElement.lang||'es').slice(0,2);
  const i18n={
    es:{stat1_label:'robots instalados',stat2_label:'países',stat3_label:'ciudades activas',stat4_label:'ranking IDC 2026',disclaimer:'Datos del fabricante KEENON Robotics. Alpha Robotics es integrador oficial en España.'},
    en:{stat1_label:'robots deployed',stat2_label:'countries',stat3_label:'active cities',stat4_label:'IDC 2026 ranking',disclaimer:'Data from KEENON Robotics manufacturer. Alpha Robotics is the official integrator in Spain.'}
  };
  const dict=i18n[LANG]||i18n.es;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key=el.getAttribute('data-i18n');
    if(dict[key]) el.textContent=dict[key];
  });

})();

// v4.46 WhatsApp floating CTA
(function(){
  if(document.querySelector('.whatsapp-float')) return;
  const a=document.createElement('a');
  a.className='whatsapp-float';
  a.href='https://wa.me/34659483652?text=Hola%2C%20me%20interesa%20informaci%C3%B3n%20sobre%20los%20robots%20de%20Alpha%20Robotics';
  a.target='_blank';
  a.rel='noopener';
  a.setAttribute('aria-label',aT('Contactar por WhatsApp','Contact us on WhatsApp'));
  a.setAttribute('role','link');
  a.innerHTML='<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M19.1 17.4c-.3-.2-1.8-.9-2-.9-.3-.1-.5-.2-.7.2-.2.3-.8.9-1 1.1-.2.2-.4.2-.7.1-.3-.2-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.7.1-.1.3-.4.5-.5.2-.2.2-.3.3-.5.1-.2.1-.4 0-.6-.1-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.8s1.2 3.2 1.3 3.4c.2.2 2.3 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.8-.7 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.1-.3-.2-.6-.4z"/><path d="M16 3C8.8 3 3 8.8 3 16c0 2.3.6 4.5 1.7 6.4L3.6 29l6.8-1.8c1.7.9 3.7 1.4 5.6 1.4 7.2 0 13-5.8 13-13S23.2 3 16 3zm0 23.4c-1.8 0-3.5-.5-5-1.3l-.4-.2-4 .1 1.1-3.9-.3-.4c-1-1.5-1.5-3.1-1.5-4.8 0-5.6 4.5-10.1 10.1-10.1S26.1 10.4 26.1 16 21.6 26.4 16 26.4z"/></svg>';
  document.body.appendChild(a);

  // v4.49 FAQ smooth scroll, accessible toggles and statsbar i18n
  const faqLinks = Array.from(document.querySelectorAll('a[href="#faq"], a[href="index.html#faq"], a[href="/#faq"]'));
  faqLinks.forEach(link=>{
    link.addEventListener('click', event=>{
      const target = document.getElementById('faq');
      if(!target) return;
      event.preventDefault();
      if(menu && menu.classList.contains('open')){
        menu.classList.remove('open');
        if(menuBtn) menuBtn.setAttribute('aria-expanded','false');
      }
      window.history.pushState(null,'','#faq');
      target.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  document.querySelectorAll('.faq-section .faq-list summary').forEach(summary=>{
    if(!summary.querySelector('.faq-toggle-icon')){
      const icon=document.createElementNS('http://www.w3.org/2000/svg','svg');
      icon.setAttribute('viewBox','0 0 24 24');
      icon.setAttribute('aria-hidden','true');
      icon.setAttribute('class','faq-toggle-icon');
      icon.innerHTML='<line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>';
      summary.appendChild(icon);
    }
  });

  const LANG=(document.documentElement.lang||'es').slice(0,2);
  const i18n={
    es:{stat1_label:'robots instalados',stat2_label:'países',stat3_label:'ciudades activas',stat4_label:'ranking IDC 2026',disclaimer:'Datos del fabricante KEENON Robotics. Alpha Robotics es integrador oficial en España.'},
    en:{stat1_label:'robots deployed',stat2_label:'countries',stat3_label:'active cities',stat4_label:'IDC 2026 ranking',disclaimer:'Data from KEENON Robotics manufacturer. Alpha Robotics is the official integrator in Spain.'}
  };
  const dict=i18n[LANG]||i18n.es;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key=el.getAttribute('data-i18n');
    if(dict[key]) el.textContent=dict[key];
  });

})();

// v4.51 active navigation for product pages
document.addEventListener('DOMContentLoaded', function(){
  var path = window.location.pathname.replace(/\.html$/, '');
  var links = document.querySelectorAll('.nav-links a');
  links.forEach(function(a){ a.classList.remove('active'); });
  if (path.indexOf('/robot-') === 0) {
    var catalogTrigger = document.querySelector('.nav-dropdown-trigger');
    if (catalogTrigger) catalogTrigger.classList.add('active');
  }
});
