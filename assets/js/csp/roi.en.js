(function(){
  const C40_EFF = 1100;
  const C40_MAX_HOURS = 5;
  const hints = {hotel:'Hotels: 1,500-4,000 m²',cc:'Shopping centres: 5,000-15,000 m²',hosp:'Hospitals: 2,000-5,000 m²',super:'Retail: 1,000-8,000 m²'};
  const ids = ['roiTipo','roiSuperficie','roiHoras','roiDias','roiSalario','roiRendimiento','roiPrecio','roiRenting','roiOpex'];
  const el = id => document.getElementById(id);
  const num = id => parseFloat(el(id).value || 0);
  const fmt = n => Math.round(n).toLocaleString('en-GB');
  const money = n => (n < 0 ? '-€' : '€') + Math.abs(Math.round(n)).toLocaleString('en-GB');
  const moneyMonth = n => money(n) + '/month';
  const m2 = n => '€' + n.toLocaleString('en-GB',{maximumFractionDigits:4}) + '/m²';
  function setText(id,value){ const node = el(id); if(node) node.textContent = value; }
  function calc(){
    const superficie=num('roiSuperficie'), horas=num('roiHoras'), diasSemana=num('roiDias'), salario=num('roiSalario'), rendimiento=num('roiRendimiento'), precio=num('roiPrecio'), renting=num('roiRenting'), opex=num('roiOpex');
    const diasMes=diasSemana*52/12, m2Mes=superficie*diasMes;
    const manualTurno=rendimiento*horas, workers=Math.max(1,Math.ceil(superficie/manualTurno)), humanCost=workers*salario, humanM2=humanCost/m2Mes;
    const robotTurno=C40_EFF*Math.min(horas,C40_MAX_HOURS), units=Math.max(1,Math.ceil(superficie/robotTurno)), robotCost=(renting+opex)*units, robotM2=robotCost/m2Mes;
    const savingMonth=humanCost-robotCost, savingYear=savingMonth*12, investment=precio*units, payback=savingMonth>0?investment/savingMonth:null, savingM2Pct=humanM2>0?((humanM2-robotM2)/humanM2)*100:0;
    setText('hintSuperficie',hints[el('roiTipo').value]||hints.hotel); setText('outSuperficie',fmt(superficie)+' m²'); setText('outHoras',horas.toLocaleString('en-GB')+' h'); setText('outDias',diasSemana+' days'); setText('outSalario',money(salario)); setText('outRendimiento',fmt(rendimiento)+' m²/h'); setText('outPrecio',money(precio)); setText('outRenting',moneyMonth(renting)); setText('outOpex',moneyMonth(opex));
    setText('roiAhorroMes',moneyMonth(savingMonth)); setText('roiAhorroNote',workers+(workers===1?' worker':' workers')+' -> '+units+(units===1?' robot':' robots')); setText('roiPayback',payback?payback.toLocaleString('en-GB',{maximumFractionDigits:1})+' months':'Not profitable'); setText('roiCosteM2Pct',savingM2Pct.toLocaleString('en-GB',{maximumFractionDigits:1})+'%'); setText('roiCosteM2Note',m2(robotM2)+' vs '+m2(humanM2));
    setText('roiWorkers',workers+(workers===1?' worker':' workers')); setText('roiHumanCost',moneyMonth(humanCost)); setText('roiHumanM2',m2(humanM2)); setText('roiHumanArea',fmt(superficie)+' m²/shift'); setText('roiUnits',units+(units===1?' unit':' units')); setText('roiRobotCost',moneyMonth(robotCost)); setText('roiRobotM2',m2(robotM2)); setText('roiRobotArea',fmt(Math.min(robotTurno*units,superficie))+' m²/shift');
    setText('roiDirectPrice',money(investment)); setText('roiDirectOpex',moneyMonth(opex*units)); setText('roiDirectYear',money(savingYear-investment)); setText('roiRentingCost',moneyMonth(renting*units)); setText('roiRentingTotal',moneyMonth(robotCost)); setText('roiRentingSaving',moneyMonth(savingMonth));
    const bars=el('roiBars'); if(bars){ const maxAbs=Math.max(investment,Math.abs(savingMonth*12-investment),1); bars.innerHTML=Array.from({length:12},function(_,i){ const month=i+1,cumulative=savingMonth*month-investment,pct=Math.min(Math.abs(cumulative)/maxAbs*100,100),cls=cumulative<0?'negative':'positive'; return '<div class="roi-pro-bar"><span>Month '+month+'</span><b><i class="'+cls+' roi-pct-'+Math.round(pct)+'"></i></b><strong>'+money(cumulative)+'</strong></div>'; }).join(''); }
    setText('roiArgument','With '+fmt(superficie)+' m² per shift and '+horas.toLocaleString('en-GB')+' available hours, manual cleaning requires approximately '+workers+(workers===1?' worker':' workers')+' and costs '+moneyMonth(humanCost)+'. The KLEENBOT C40 would cover the scenario with '+units+(units===1?' unit':' units')+', with an estimated operating cost of '+moneyMonth(robotCost)+'. The estimated monthly saving is '+moneyMonth(savingMonth)+' and the cost per m² drops from '+m2(humanM2)+' to '+m2(robotM2)+'.');
  }
  ids.forEach(id=>{ const node=el(id); if(node){ node.addEventListener('input',calc); node.addEventListener('change',calc); } }); calc();
})();
