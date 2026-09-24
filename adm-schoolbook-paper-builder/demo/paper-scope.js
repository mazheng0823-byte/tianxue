(() => {
  const regions = window.PAPER_REGIONS || [];
  const stages = ['初中','高中'];
  const municipalities = ['11','12','31','50'];
  const from = (paper={}) => ({province:paper.province||'',city:paper.city||'',stage:paper.stage||''});
  const key = paper => {const s=from(paper);return `${s.province}/${s.city}/${s.stage}`;};
  const province = code => regions.find(p=>p.code===code);
  function cities(code) {
    const p=province(code);if(!p)return [];
    return [{id:'*',name:municipalities.includes(code)?'全市通用':'全省通用'},...(municipalities.includes(code)?[]:p.children.map(c=>({id:c.code,name:c.name})))];
  }
  const valid = paper => paper?.templateId==='none' || !!province(paper?.province) && cities(paper.province).some(c=>c.id===paper.city) && stages.includes(paper.stage);
  function regionLabel(paper={}) {
    const p=province(paper.province), c=cities(paper.province).find(c=>c.id===paper.city);
    return p ? p.name+(!c?' / 城市待补充':c.id!=='*'?' / '+c.name:'') : '省市待补充';
  }
  const label = paper => window.PaperTemplate
    ? window.PaperTemplate.label(paper)
    : `${regionLabel(paper)} · ${stages.includes(paper?.stage)?paper.stage:'学段待补充'}`;
  function fields(scope={}) {
    const s=from(scope);
    return `<label class="field"><span><b class="required">*</b> 所属省 / 直辖市</span><select name="province" data-scope-province required>${options(regions.map(p=>({id:p.code,name:p.name})),s.province,'请选择省 / 直辖市')}</select></label>
      <label class="field"><span><b class="required">*</b> 所属城市</span><select name="city" data-scope-city required ${s.province?'':'disabled'}>${options(cities(s.province),s.city,'请选择城市')}</select></label>
      <label class="field"><span><b class="required">*</b> 所属学段</span><select name="stage" data-scope-stage required>${options(stages,s.stage,'请选择学段')}</select></label>`;
  }
  function update(paper, scope) {
    if (key(paper)!==key(scope)) {
      paper.flowOverridesByScope ||= {};
      paper.flowOverridesByScope[key(paper)] = clone(paper.flowOverrides||{});
      paper.flowOverrides = clone(paper.flowOverridesByScope[key(scope)]||{});
    }
    Object.assign(paper,from(scope));
  }
  document.addEventListener('change',e=>{
    if (!e.target.matches('[data-scope-province]')) return;
    const select=e.target.closest('form').querySelector('[data-scope-city]');
    const code=e.target.value, list=cities(code);
    select.disabled=!list.length;
    select.innerHTML=options(list,municipalities.includes(code)?'*':'','请选择城市');
  });
  window.PaperScope={regions,stages,from,key,valid,label,regionLabel,fields,update};
})();

