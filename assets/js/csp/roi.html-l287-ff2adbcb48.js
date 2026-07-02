(function(){
  const C40_EFF = 1100;
  const C40_MAX_HOURS = 5;
  const hints = {hotel:'Hoteles: 1.500-4.000 m2',cc:'Centros comerciales: 5.000-15.000 m2',hosp:'Hospitales: 2.000-5.000 m2',super:'Retail: 1.000-8.000 m2'};
  const ids = ['roiTipo','roiSuperficie','roiHoras','roiDias','roiSalario','roiRendimiento','roiPrecio','roiRenting','roiOpex'];
  const el = id => document.getElementById(id);
  const num = id => parseFloat(el(id).value || 0);
  const fmt = n => Math.round(n).toLocaleString('es-ES');
  const money = n => (n < 0 ? '-' : '') + Math.abs(Math.round(n)).toLocaleString('es-ES') + ' euros';
  const moneyMonth = n => money(n) + '/mes';
  const m2 = n => n.toLocaleString('es-ES',{maximumFractionDigits:4}) + ' euros/m2';
  function setText(id,value){ const node = el(id); if(node) node.textContent = value; }
  function calc(){
    const superficie=num('roiSuperficie'), horas=num('roiHoras'), diasSemana=num('roiDias'), salario=num('roiSalario'), rendimiento=num('roiRendimiento'), precio=num('roiPrecio'), renting=num('roiRenting'), opex=num('roiOpex');
    const diasMes=diasSemana*52/12, m2Mes=superficie*diasMes;
    const manualTurno=rendimiento*horas, workers=Math.max(1,Math.ceil(superficie/manualTurno)), humanCost=workers*salario, humanM2=humanCost/m2Mes;
    const robotTurno=C40_EFF*Math.min(horas,C40_MAX_HOURS), units=Math.max(1,Math.ceil(superficie/robotTurno)), robotCost=(renting+opex)*units, robotM2=robotCost/m2Mes;
    const savingMonth=humanCost-robotCost, savingYear=savingMonth*12, investment=precio*units, payback=savingMonth>0?investment/savingMonth:null, savingM2Pct=humanM2>0?((humanM2-robotM2)/humanM2)*100:0;
    setText('hintSuperficie',hints[el('roiTipo').value]||hints.hotel); setText('outSuperficie',fmt(superficie)+' m2'); setText('outHoras',horas.toLocaleString('es-ES')+' h'); setText('outDias',diasSemana+' días'); setText('outSalario',money(salario)); setText('outRendimiento',fmt(rendimiento)+' m2/h'); setText('outPrecio',money(precio)); setText('outRenting',moneyMonth(renting)); setText('outOpex',moneyMonth(opex));
    setText('roiAhorroMes',moneyMonth(savingMonth)); setText('roiAhorroNote',workers+(workers===1?' operario':' operarios')+' -> '+units+(units===1?' robot':' robots')); setText('roiPayback',payback?payback.toLocaleString('es-ES',{maximumFractionDigits:1})+' meses':'No rentable'); setText('roiCosteM2Pct',savingM2Pct.toLocaleString('es-ES',{maximumFractionDigits:1})+'%'); setText('roiCosteM2Note',m2(robotM2)+' vs '+m2(humanM2));
    setText('roiWorkers',workers+(workers===1?' operario':' operarios')); setText('roiHumanCost',moneyMonth(humanCost)); setText('roiHumanM2',m2(humanM2)); setText('roiHumanArea',fmt(superficie)+' m2/turno'); setText('roiUnits',units+(units===1?' unidad':' unidades')); setText('roiRobotCost',moneyMonth(robotCost)); setText('roiRobotM2',m2(robotM2)); setText('roiRobotArea',fmt(Math.min(robotTurno*units,superficie))+' m2/turno');
    setText('roiDirectPrice',money(investment)); setText('roiDirectOpex',moneyMonth(opex*units)); setText('roiDirectYear',money(savingYear-investment)); setText('roiRentingCost',moneyMonth(renting*units)); setText('roiRentingTotal',moneyMonth(robotCost)); setText('roiRentingSaving',moneyMonth(savingMonth));
    const bars=el('roiBars'); if(bars){ const maxAbs=Math.max(investment,Math.abs(savingMonth*12-investment),1); bars.innerHTML=Array.from({length:12},function(_,i){ const month=i+1,cumulative=savingMonth*month-investment,pct=Math.min(Math.abs(cumulative)/maxAbs*100,100),cls=cumulative<0?'negative':'positive'; return '<div class="roi-pro-bar"><span>Mes '+month+'</span><b><i class="'+cls+' roi-pct-'+Math.round(pct)+'"></i></b><strong>'+money(cumulative)+'</strong></div>'; }).join(''); }
    setText('roiArgument','Con '+fmt(superficie)+' m2 por turno y '+horas.toLocaleString('es-ES')+' horas disponibles, la limpieza manual requiere aproximadamente '+workers+(workers===1?' operario':' operarios')+' y supone '+moneyMonth(humanCost)+'. El KLEENBOT C40 cubriría el escenario con '+units+(units===1?' unidad':' unidades')+', con un coste operativo estimado de '+moneyMonth(robotCost)+'. El ahorro mensual estimado es de '+moneyMonth(savingMonth)+' y el coste por m2 baja de '+m2(humanM2)+' a '+m2(robotM2)+'.');
  }
  ids.forEach(id=>{ const node=el(id); if(node){ node.addEventListener('input',calc); node.addEventListener('change',calc); } }); calc();
})();
