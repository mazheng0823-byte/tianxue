(() => {
  'use strict';
  const library=window.SELECTION_LIBRARY;
  const entries=[{id:'schoolbook',name:'校本',icon:'library'},{id:'feishu',name:'飞书',icon:'book-open'},{id:'bank',name:'题库',icon:'database'}];
  const modes=[{id:'cn-en',name:'看中选英'},{id:'en-cn',name:'看英选中'},{id:'write-en',name:'英文默写'},{id:'write-cn',name:'中文默写'}];
  const filterKeys=['sourceIds','sourceUnit','sourceSearch','qText','qType','qDiff','qStage','qSubject'];
  const state={owner:null,kind:'schoolbook',bankStage:'高中',bankSubject:'全部',selectedBank:'',filters:{},words:[],mode:'cn-en',score:2,dialog:null,baselineIds:[]};
  const entry=()=>entries.find(e=>e.id===state.kind);
  const isFeishuSource=id=>id==='s1'||id.startsWith('flow-');
  const sources=()=>state.kind==='bank'
    ? library.sources.filter(s=>s.kind==='bank'&&s.stage===state.bankStage&&(state.bankSubject==='全部'||s.subject===state.bankSubject))
    : sourceBooks.filter(s=>state.kind==='feishu'?isFeishuSource(s.id):!isFeishuSource(s.id));
  const pool=()=>state.kind==='bank'
    ? library.bankQuestions.filter(q=>source(q.bookId).stage===state.bankStage&&(!state.selectedBank||q.bookId===state.selectedBank))
    : questions.filter(q=>state.kind==='feishu'?isFeishuSource(q.bookId):!isFeishuSource(q.bookId));
  function resetFilters(){filterKeys.forEach(k=>app[k]=k==='sourceIds'?[]:'');}
  function ensure(){
    if(state.owner===app.paperId)return;
    state.owner=app.paperId;state.kind='schoolbook';state.bankStage=['初中','高中'].includes(currentPaper().stage)?currentPaper().stage:'高中';state.bankSubject=currentPaper().subject||'全部';state.selectedBank='';state.filters={};state.words=[];state.dialog=null;resetFilters();ReadingLibrary.reset();
  }
  function switchKind(kind){
    if(!entries.some(e=>e.id===kind)||state.kind===kind)return;
    state.filters[state.kind]=Object.fromEntries(filterKeys.map(k=>[k,clone(app[k])]));
    state.kind=kind;state.selectedBank='';resetFilters();Object.assign(app,clone(state.filters[kind]||{}));
  }
  function prepareType(type){ensure();switchKind('bank');app.qType=type;}
  function filteredWords(){return library.words.filter(w=>(!app.sourceIds.length||app.sourceIds.includes(w.bookId))&&(!app.sourceUnit||`${w.bookId}:${w.unit}`===app.sourceUnit)&&(!app.qStage||source(w.bookId).stage===app.qStage)&&(!app.qType||w.pos===app.qType)&&(!app.qText||`${w.word} ${w.meaning}`.toLowerCase().includes(app.qText.toLowerCase())));}
  function buildQuestion(word,mode,score=2){
    const config=modes.find(m=>m.id===mode);if(!word||!config)return null;
    const english=mode==='cn-en'||mode==='write-en',choice=mode==='cn-en'||mode==='en-cn';
    const answerText=english?word.word:word.meaning;
    const peers=library.words.filter(w=>w.bookId===word.bookId&&w.pos===word.pos&&w.id!==word.id);
    const candidates=[answerText,...peers.map(w=>english?w.word:w.meaning).filter(s=>s!==answerText).slice(0,3)];
    const offset=Number(word.id.slice(1))%4;
    const answers=choice?[...candidates.slice(offset),...candidates.slice(0,offset)]:[];
    return {id:`VOC-${word.id}-${mode}`,bookId:word.bookId,unit:word.unit,sourceKind:'vocab',wordId:word.id,word:word.word,vocabMode:mode,type:config.name,stage:source(word.bookId).stage,subject:'英语',difficulty:'容易',knowledge:source(word.bookId).units[word.unit],stem:choice?(english?`请选择“${word.meaning}”对应的英文单词。`:`请选择“${word.word}”对应的中文释义。`):(english?`根据中文写出英文单词：${word.meaning}  __________`:`写出单词的中文释义：${word.word}  __________`),options:answers,answer:choice?String.fromCharCode(65+answers.indexOf(answerText)):answerText,analysis:`${word.word}：${word.pos} ${word.meaning}。`,response:choice?'choice':'text',answerLanguage:english?'en':'zh',score};
  }
  function findQuestion(id){
    const bank=library.bankQuestions.find(q=>q.id===id);if(bank)return bank;
    const reading=ReadingLibrary.findQuestion(id);if(reading)return reading;
    const word=library.words.find(w=>modes.some(m=>`VOC-${w.id}-${m.id}`===id));
    if(!word)return null;
    return buildQuestion(word,modes.find(m=>`VOC-${word.id}-${m.id}`===id).id);
  }
  function sourcePath(q){
    const s=source(q.bookId);
    if(s.kind)return `${entries.find(e=>e.id===s.kind)?.name||'题库'} / ${s.name} / ${s.units[q.unit]||'全部'}${q.word?' / '+q.word:q.contentTitle?' / '+q.contentTitle:''}`;
    return `${isFeishuSource(s.id)?'飞书':'校本'} / ${s.name} / 第一篇 基础训练 / ${s.units[q.unit]} / 第一节 专项巩固 / Lesson ${q.unit+1} / 综合练习`;
  }
  function sourcePane(){
    const list=sources(),kind=entry(),matches=list.filter(s=>s.name.includes(app.sourceSearch));
    const stageSwitch=state.kind==='bank'?`<div class="sp-bank-stage" role="tablist" aria-label="题库学段">${['初中','高中'].map(stage=>`<button type="button" role="tab" aria-selected="${state.bankStage===stage}" class="${state.bankStage===stage?'active':''}" ${action('bank-stage',{stage})}>${stage}</button>`).join('')}</div>`:'';
    const sourceRows=matches.map(s=>{
      if(state.kind==='bank')return `<div class="book-group sp-bank-source"><label class="book-select ${app.sourceIds.includes(s.id)?'selected':''}"><input type="checkbox" data-source="${s.id}" ${app.sourceIds.includes(s.id)?'checked':''}><span class="book-name">${esc(s.name)}</span></label></div>`;
      const count=(state.kind==='vocab'?library.words:ReadingLibrary.supports(state.kind)?ReadingLibrary.items(state.kind):pool()).filter(q=>q.bookId===s.id).length;
      return `<div class="book-group"><label class="book-select ${app.sourceIds.includes(s.id)?'selected':''}"><input type="checkbox" data-source="${s.id}" ${app.sourceIds.includes(s.id)?'checked':''}><span class="book-name">${esc(s.name)}<span class="subline">${s.stage} · ${s.subject} · ${count}${state.kind==='vocab'?'词':state.kind==='sentence'?'句':state.kind==='passage'?'篇':'题'}</span></span></label>${s.units.map((u,i)=>`<button class="tree-leaf ${app.sourceUnit===`${s.id}:${i}`?'active':''}" ${action('unit',{id:s.id,unit:i})}>${icon('folder')} ${esc(u)}</button>`).join('')}</div>`;
    }).join('');
    return `<aside class="source-pane"><div class="pane-head">来源${kind.name} ${button('全部','clear-sources',{},'link')}</div>${stageSwitch}<div class="pane-tools"><input id="sourceSearch" placeholder="${kind.name}名称" value="${esc(app.sourceSearch)}" aria-label="搜索来源${kind.name}"></div>${sourceRows||'<p class="sp-empty-source">暂无匹配来源</p>'}<div class="selection-note">${app.sourceIds.length?`已筛选 ${app.sourceIds.length} 个来源`:`全部 ${list.length} 个来源`}</div></aside>`;
  }
  function questionResults(){
    const result=getFilteredQuestions();
    return `<section class="question-results"><form id="questionFilters" class="q-filters"><div class="search-line"><input name="text" placeholder="题目编号 / 题干 / 知识点" value="${esc(app.qText)}" aria-label="搜索试题"><button type="submit" class="btn small primary">${icon('search')}查询</button>${tool('重置筛选','reset-questions',{},'rotate-ccw')}</div><div class="q-filter-options"><select name="type" aria-label="题型">${options([...new Set(pool().map(q=>q.type))],app.qType,'全部题型')}</select><select name="difficulty" aria-label="难度">${options(['容易','适中','较难'],app.qDiff,'全部难度')}</select></div></form><div class="q-list-head"><span>共 ${result.length} 道试题</span>${app.sourceUnit?button('清除目录筛选','clear-unit',{},'link'):''}${!app.replaceId?button('加入当前结果','add-results',{},'link','list-plus'):''}</div>${result.map(questionCard).join('')||empty('暂无符合条件的试题')}</section>`;
  }
  function wordResults(){
    const result=filteredWords(),all=result.length>0&&result.every(w=>state.words.includes(w.id));
    return `<section class="question-results"><form id="vocabFilters" class="q-filters"><div class="search-line"><input name="text" placeholder="单词 / 中文释义" value="${esc(app.qText)}" aria-label="搜索词汇"><button type="submit" class="btn small primary">${icon('search')}查询</button>${tool('重置词库筛选','reset-questions',{},'rotate-ccw')}</div><div class="q-filter-options"><select name="stage" aria-label="词汇学段">${options(['初中','高中'],app.qStage,'全部学段')}</select><select name="pos" aria-label="词性">${options([{id:'n.',name:'名词'},{id:'v.',name:'动词'}],app.qType,'全部词性')}</select></div></form><div class="q-list-head"><span>共 ${result.length} 个词条</span>${app.sourceUnit?button('清除目录筛选','clear-unit',{},'link'):''}</div><div class="sp-word-list">${result.length?`<div class="sp-word-head">${app.replaceId?'<span></span>':`<input type="checkbox" data-sp-all aria-label="选择当前结果全部词汇" ${all?'checked':''}>`}<span>词条 / 释义</span><span>来源 / 分类</span><span></span></div>${result.map(w=>{
      const count=currentPaper().items.filter(q=>q.wordId===w.id).length;
      return `<div class="sp-word-row ${state.words.includes(w.id)?'selected':''}" data-word-row="${w.id}">${app.replaceId?'<span></span>':`<input type="checkbox" data-sp-word="${w.id}" aria-label="选择 ${w.word}" ${state.words.includes(w.id)?'checked':''}>`}<div><strong>${esc(w.word)}</strong><p>${w.pos} ${esc(w.meaning)}</p>${count?`<small class="sp-word-added">已出 ${count} 题</small>`:''}</div><div class="sp-word-source">${esc(source(w.bookId).short)}<small>${esc(source(w.bookId).units[w.unit])}</small></div>${tool(app.replaceId?'选词换题':'用此词出题','sp-word-generate',{id:w.id},app.replaceId?'replace':'file-plus')}</div>`;
    }).join('')}`:empty('暂无符合条件的词汇')}</div>${!app.replaceId?`<div class="sp-word-footer"><div><strong>已选 ${state.words.length} 个词</strong>${state.words.length?button('清空','sp-clear-words',{},'link'):''}</div><button class="btn primary" ${action('sp-generate')} ${!state.words.length?'disabled':''}>${icon('file-plus')}设置题型并出题</button></div>`:''}</section>`;
  }
  function bankCatalog(){
    const list=sources().filter(s=>s.name.includes(app.sourceSearch));
    return `<section class="sp-bank-catalog"><div class="sp-bank-filters"><div class="search-line">${icon('search')}<input id="sourceSearch" placeholder="输入题库名称关键词" value="${esc(app.sourceSearch)}" aria-label="搜索题库"></div><div class="sp-filter-row"><span>学段</span>${['初中','高中'].map(stage=>button(stage,'bank-stage',{stage},`btn small ${state.bankStage===stage?'primary':''}`)).join('')}</div><div class="sp-filter-row"><span>学科</span>${['全部','英语','数学'].map(subject=>button(subject,'bank-subject',{subject},`btn small ${state.bankSubject===subject?'primary':''}`)).join('')}</div></div><div class="sp-bank-list">${list.map(s=>{const count=library.bankQuestions.filter(q=>q.bookId===s.id).length;return `<button class="sp-bank-card" ${action('sp-bank-open',{id:s.id})}><span class="sp-bank-icon">${icon('database')}</span><span><strong>${esc(s.name)}</strong><small>${esc(s.stage)} · ${esc(s.subject)}　已发布 ${count} 题</small></span>${icon('chevron-right')}</button>`;}).join('')||empty('暂无符合条件的题库')}</div></section>`;
  }
  function basket(){
    const p=currentPaper();
    return `<aside class="basket-pane"><div class="pane-head"><span>${icon('list-checks')} 当前组卷</span><span class="badge">${p.items.length} 题</span></div><div class="basket-stats"><div><strong>${p.items.length}</strong><span>已选试题</span></div><div><strong>${total(p.items)}</strong><span>试卷总分</span></div></div><div class="basket-sources">${[...new Set(p.items.map(q=>q.bookId))].map(id=>badge(esc(source(id).short),source(id).kind==='bank'?'orange':'')).join('')||'<span class="muted">暂无来源</span>'}</div><div class="basket-list">${p.items.map((q,i)=>`<div class="basket-item"><span class="num">${i+1}</span><div class="item-name"><strong>${q.type} · ${q.score}分</strong><small>${esc(q.id)} · ${esc(source(q.bookId).short)}</small></div>${tool('移除试题','remove-q',{id:q.id},'x')}</div>`).join('')||empty('暂未选择试题')}</div></aside>`;
  }
  function entryTabs(){return `<div class="sp-entry-tabs" role="tablist" aria-label="选题来源">${entries.map(e=>`<button role="tab" aria-selected="${state.kind===e.id}" class="${state.kind===e.id?'active':''}" ${action('sp-entry',{kind:e.id})}>${icon(e.icon)}${e.name}</button>`).join('')}<span class="sp-data-label">本期支持 3 类来源</span></div>`;}
  function pickerContent(){
    if(state.kind==='bank'&&!state.selectedBank)return bankCatalog();
    const selected=state.kind==='bank'&&source(state.selectedBank);
    const back=selected?`<div class="sp-bank-current">${button('返回题库列表','sp-bank-back',{},'link','arrow-left')}<strong>${esc(selected.name)}</strong><span>${selected.stage} · ${selected.subject}</span></div>`:'';
    return `${back}<div class="workspace sp-workspace ${selected?'sp-bank-detail':''}">${selected?'':sourcePane()}${questionResults()}${basket()}</div>`;
  }
  function pickerBody(){return `<div class="sp-modal-picker">${entryTabs()}${app.replaceId?`<div class="info-banner warn">${icon('replace')}正在替换 ${esc(app.replaceId)}，选择新题后保留原题分值。${button('取消换题','cancel-replace',{},'link')}</div>`:''}${pickerContent()}</div>`;}
  function isOpen(){return !!document.querySelector('#modalRoot .source-picker-modal');}
  function draw(){modal(app.replaceId?'替换试题':'添加试题',pickerBody(),`${button('取消','sp-cancel-picker')}<button class="btn primary" ${action('sp-done-picker')}>完成添加（${currentPaper().items.length}题）</button>`,'source-picker-modal');afterRender();}
  function refresh(){if(!isOpen())return render();draw();}
  function open(kind='schoolbook'){ensure();if(!isOpen())state.baselineIds=currentPaper().items.map(item=>item.id);if(entries.some(e=>e.id===kind)&&kind!==state.kind)switchKind(kind);draw();}
  function renderPicker(){ensure();return `${workHeader()}${pickerBody()}`;}
  function revealActiveEntry(){
    const tabs=document.querySelector('.sp-entry-tabs'),active=tabs?.querySelector('[aria-selected="true"]');
    if(!active||tabs.scrollWidth<=tabs.clientWidth)return;
    const bounds=tabs.getBoundingClientRect(),item=active.getBoundingClientRect();
    if(item.left<bounds.left)tabs.scrollLeft+=item.left-bounds.left;
    else if(item.right>bounds.right)tabs.scrollLeft+=item.right-bounds.right;
  }
  window.addEventListener('resize',()=>requestAnimationFrame(revealActiveEntry));
  function afterRender(){
    revealActiveEntry();
    ReadingLibrary.afterRender();
    const checkbox=document.querySelector('[data-sp-all]');if(!checkbox)return;
    const words=filteredWords(),selected=words.filter(w=>state.words.includes(w.id)).length;
    checkbox.indeterminate=selected>0&&selected<words.length;
  }
  function dialogQuestions(){
    return state.dialog.ids.map(id=>buildQuestion(library.words.find(w=>w.id===id),state.mode,state.score)).filter(Boolean);
  }
  function updatePreview(){
    const root=document.getElementById('spVocabPreview');if(!root||!state.dialog)return;
    const items=dialogQuestions(),duplicates=items.filter(q=>currentPaper().items.some(x=>x.id===q.id)).length;
    document.getElementById('spVocabCount').textContent=`${items.length} 道试题 · 总分 ${items.reduce((sum,q)=>sum+q.score,0)} 分${duplicates?' · '+duplicates+' 道已在当前卷中':''}`;
    const invalid=!Number.isFinite(state.score)||state.score<.5||state.score>100||state.score*2%1!==0;
    document.querySelector('[form="vocabQuestionForm"]').disabled=invalid||duplicates===items.length;
    root.innerHTML=items.map((q,i)=>`<article class="sp-generated-question"><div class="sp-generated-meta"><strong>${i+1}. ${esc(q.word)}</strong>${badge(q.type)}${badge(q.score+' 分','gray')}</div><p>${esc(q.stem)}</p>${q.options.length?`<div class="options-grid">${q.options.map((o,j)=>`<div>${String.fromCharCode(65+j)}. ${esc(o)}</div>`).join('')}</div>`:'<input disabled placeholder="请输入答案" aria-label="词汇题作答预览">'}<details><summary>答案解析</summary><p>${esc(q.answer)} · ${esc(q.analysis)}</p></details><small class="muted">${esc(sourcePath(q))}</small></article>`).join('');
    icons();
  }
  function showGenerate(ids){
    const valid=[...new Set(ids)].filter(id=>library.words.some(w=>w.id===id));
    if(!valid.length)return toast('请先选择词汇','error');
    if(app.replaceId&&valid.length!==1)return toast('换题时请选择一个词汇','error');
    state.dialog={paperId:app.paperId,ids:valid,replaceId:app.replaceId};
    if(app.replaceId)state.score=currentPaper().items.find(q=>q.id===app.replaceId)?.score||2;
    modal(app.replaceId?'词汇换题':'词汇出题设置',`<form id="vocabQuestionForm" class="sp-vocab-form"><div class="form-grid"><label class="field"><span>题型</span><select name="mode">${options(modes,state.mode)}</select></label><label class="field"><span>每题分值</span><input name="score" type="number" min="0.5" max="100" step="0.5" value="${state.score}" ${app.replaceId?'readonly':''} required></label></div><p id="spVocabCount" class="small-text muted"></p></form><div id="spVocabPreview"></div>`,`${button('取消','close')}<button class="btn primary" type="submit" form="vocabQuestionForm">${icon(app.replaceId?'replace':'plus')}${app.replaceId?'确认换题':'加入当前组卷'}</button>`,true);
    updatePreview();
  }
  function finishPicker(){
    const paper=currentPaper(),baseline=new Set(state.baselineIds),added=paper.items.filter(item=>!baseline.has(item.id));
    const rejected=added.filter(item=>!PaperTemplate.accepts(paper,item));
    if(rejected.length){
      const rejectedIds=new Set(rejected.map(item=>item.id));
      paper.items=paper.items.filter(item=>!rejectedIds.has(item.id));
      changePaper();
    }
    app.replaceId=null;closeModal();render();
    if(!rejected.length){toast(added.length?`已添加 ${added.length} 道试题`:'本次未添加新试题');return;}
    const accepted=added.length-rejected.length,template=PaperTemplate.label(paper),allowed=PaperTemplate.allowedLabels(paper);
    modal('部分试题未添加',`<div class="info-banner warn">${icon('info')}当前试卷使用“${esc(template)}”，仅支持模板包含的听力、听说题型。</div><p class="template-reject-summary">以下 ${rejected.length} 道试题因与模板不匹配，未加入当前试卷${accepted?`；其余 ${accepted} 道已成功添加`:''}。</p><div class="template-reject-list">${rejected.map((item,index)=>`<div><span class="num">${index+1}</span><p><strong>${esc(item.type)}</strong><small>${esc(item.id)} · ${esc(sourcePath(item))}</small></p>${badge('模板不支持','orange')}</div>`).join('')}</div><p class="text-note">当前模板支持：${esc(allowed.join('、')||'暂无可用题型')}</p>`,button('知道了','close',{},'btn primary'));
  }
  document.addEventListener('click',e=>{
    const t=e.target.closest('[data-action]');if(!t||t.disabled)return;
    const d=t.dataset;
    if(d.action==='sp-entry'){switchKind(d.kind);refresh();}
    if(d.action==='bank-stage'&&['初中','高中'].includes(d.stage)&&state.bankStage!==d.stage){state.bankStage=d.stage;state.selectedBank='';app.sourceIds=[];app.sourceUnit='';refresh();}
    if(d.action==='bank-subject'&&['全部','英语','数学'].includes(d.subject)&&state.bankSubject!==d.subject){state.bankSubject=d.subject;state.selectedBank='';app.sourceIds=[];app.sourceUnit='';refresh();}
    if(d.action==='sp-bank-open'&&sources().some(s=>s.id===d.id)){state.selectedBank=d.id;app.sourceIds=[d.id];app.sourceUnit='';refresh();}
    if(d.action==='sp-bank-back'){state.selectedBank='';app.sourceIds=[];app.sourceUnit='';refresh();}
    if(d.action==='sp-done-picker')finishPicker();
    if(d.action==='sp-cancel-picker'){app.replaceId=null;closeModal();render();}
    if(d.action==='sp-clear-words'){state.words=[];render();}
    if(d.action==='sp-word-generate')showGenerate([d.id]);
    if(d.action==='sp-generate')showGenerate(state.words);
  });
  document.addEventListener('change',e=>{
    const t=e.target;
    if(t.dataset.spWord){state.words=t.checked?[...new Set([...state.words,t.dataset.spWord])]:state.words.filter(id=>id!==t.dataset.spWord);render();}
    if(t.hasAttribute('data-sp-all')){const ids=filteredWords().map(w=>w.id);state.words=t.checked?[...new Set([...state.words,...ids])]:state.words.filter(id=>!ids.includes(id));render();}
    if(t.closest('#vocabQuestionForm')&&t.name==='mode'){state.mode=t.value;updatePreview();}
  });
  document.addEventListener('input',e=>{if(e.target.closest('#vocabQuestionForm')&&e.target.name==='score'){state.score=Number(e.target.value);updatePreview();}});
  document.addEventListener('submit',e=>{
    const id=e.target.getAttribute('id');if(!['vocabFilters','vocabQuestionForm'].includes(id))return;
    e.preventDefault();const data=new FormData(e.target);
    if(id==='vocabFilters'){app.qText=data.get('text').trim();app.qStage=data.get('stage');app.qType=data.get('pos');render();return;}
    if(!state.dialog||state.dialog.paperId!==app.paperId)return;
    if(!modes.some(m=>m.id===data.get('mode')))return;
    const score=Number(data.get('score'));
    if(!Number.isFinite(score)||score<.5||score>100||score*2%1!==0)return toast('分值需为 0.5 至 100，按 0.5 递增','error');
    state.mode=data.get('mode');state.score=score;
    const p=currentPaper(),items=dialogQuestions(),added=items.filter(q=>!p.items.some(x=>x.id===q.id));
    if(!added.length)return toast('这些词汇试题已在当前组卷中','error');
    if(state.dialog.replaceId){
      const index=p.items.findIndex(q=>q.id===state.dialog.replaceId);if(index<0)return toast('原试题已变更，请重新选择','error');
      p.items[index]={...added[0],score:p.items[index].score};app.replaceId=null;app.view='editor';
    }else p.items.push(...added);
    state.words=state.words.filter(id=>!state.dialog.ids.includes(id));state.dialog=null;
    changePaper();closeModal();render();toast(`已加入 ${added.length} 道词汇试题`);
  });
  window.SourcePicker={render:renderPicker,afterRender,pool,ensure,prepareType,sourcePath,findQuestion,buildQuestion,open,refresh,isOpen};
})();

