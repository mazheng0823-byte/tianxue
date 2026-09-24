(() => {
  const templates = [
    {id:'none',name:'无固定模板',province:'',city:'',stage:'',mode:'none'},
    {id:'beijing-gaokao',name:'北京高考模板',province:'11',city:'*',stage:'高中',mode:'exam'},
    {id:'beijing-high-general',name:'北京高中通用模板',province:'11',city:'*',stage:'高中',mode:'fallback'},
    {id:'beijing-zhongkao',name:'北京中考模板',province:'11',city:'*',stage:'初中',mode:'exam'},
    {id:'beijing-junior-general',name:'北京初中通用模板',province:'11',city:'*',stage:'初中',mode:'fallback'},
    {id:'beijing-high-reading',name:'北京高中朗读专项',province:'11',city:'*',stage:'高中',mode:'standalone',types:['reading']},
    {id:'beijing-high-retell',name:'北京高中口语复述专项',province:'11',city:'*',stage:'高中',mode:'standalone',types:['retell']},
    {id:'beijing-high-oral',name:'北京高中口语问答专项',province:'11',city:'*',stage:'高中',mode:'standalone',types:['oral']},
    {id:'beijing-high-information',name:'北京高中听后记录专项',province:'11',city:'*',stage:'高中',mode:'standalone',types:['information']}
  ];
  const get = id => templates.find(template => template.id === id);
  const inferId = paper => {
    if (get(paper?.templateId)) return paper.templateId;
    if (paper?.province === '11' && paper?.stage === '高中') return 'beijing-gaokao';
    if (paper?.province === '11' && paper?.stage === '初中') return 'beijing-zhongkao';
    return 'none';
  };
  const profile = paper => get(inferId(paper)) || templates[0];
  const scope = id => {
    const template = get(id) || templates[0];
    return {province:template.province,city:template.city,stage:template.stage};
  };
  const from = paper => ({templateId:inferId(paper),...PaperScope.from(paper)});
  const valid = paper => paper?.templateId ? !!get(paper.templateId) : !!get(inferId(paper));
  const label = paper => profile(paper).name;
  const isFixed = paper => inferId(paper) !== 'none';
  const allowedTypes = paper => {
    const template=profile(paper);
    if(template.mode==='none')return null;
    if(Array.isArray(template.types))return [...template.types];
    return [...new Set((window.FLOW_RULE_LIBRARY||[])
      .filter(rule=>rule.province===template.province&&rule.stage===template.stage&&rule.mode===template.mode)
      .map(rule=>rule.type))];
  };
  const accepts = (paper,question) => {
    const allowed=allowedTypes(paper);
    return allowed===null||!!question?.flowType&&allowed.includes(question.flowType);
  };
  const allowedLabels = paper => {
    const allowed=allowedTypes(paper);
    if(allowed===null)return ['全部题型'];
    const questions=window.FLOW_QUESTIONS||[];
    return allowed.map(type=>questions.find(question=>question.flowType===type)?.type||type);
  };
  function field(paper={}) {
    const selected=inferId(paper);
    return `<label class="field span2"><span><b class="required">*</b> 选择模板</span><select name="templateId" required>${templates.map(template=>`<option value="${template.id}" ${template.id===selected?'selected':''}>${template.name}</option>`).join('')}</select></label>`;
  }
  function apply(paper,id) {
    const next=get(id);if(!next)return false;
    const current=inferId(paper), nextScope=scope(next.id);
    if(current!==next.id){
      paper.flowOverridesByTemplate ||= {};
      paper.flowOverridesByTemplate[current]=clone(paper.flowOverrides||{});
      const legacy=paper.flowOverridesByScope?.[PaperScope.key(nextScope)];
      paper.flowOverrides=clone(paper.flowOverridesByTemplate[next.id]||legacy||{});
    }
    Object.assign(paper,nextScope);
    paper.templateId=next.id;
    return true;
  }
  window.PaperTemplate={templates,get,inferId,profile,scope,from,valid,label,isFixed,allowedTypes,allowedLabels,accepts,field,apply};
})();

