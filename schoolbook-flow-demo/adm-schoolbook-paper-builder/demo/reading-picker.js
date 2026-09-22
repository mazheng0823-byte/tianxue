(() => {
  'use strict';
  const library=window.READING_LIBRARY;
  const configs={
    sentence:{name:'句库',unit:'句',noun:'句子',items:library.sentences,modes:[{id:'follow',name:'句子跟读'}],score:2},
    passage:{name:'篇库',unit:'篇',noun:'文章',items:library.passages,modes:[{id:'line',name:'逐句跟读'},{id:'full',name:'整篇跟读'},{id:'recite',name:'背诵'}],score:10}
  };
  let selected={sentence:[],passage:[]},mode={sentence:'follow',passage:'line'},dialog=null;
  const supports=kind=>!!configs[kind];
  const items=kind=>configs[kind]?.items||[];
  const fullText=item=>item.sentences.map(s=>s.text).join(' ');
  const getMode=(kind,id)=>configs[kind]?.modes.find(m=>m.id===id);
  function reset(){selected={sentence:[],passage:[]};dialog=null;}
  function prepareType(type){
    for(const [kind,config] of Object.entries(configs)){const option=config.modes.find(m=>m.name===type);if(option){mode[kind]=option.id;return kind;}}
    return null;
  }
  function filtered(kind){return items(kind).filter(item=>(!app.sourceIds.length||app.sourceIds.includes(item.bookId))&&(!app.sourceUnit||`${item.bookId}:${item.unit}`===app.sourceUnit)&&(!app.qStage||source(item.bookId).stage===app.qStage)&&(!app.qText||`${item.title} ${item.translation||''} ${item.sentences.map(s=>s.text+' '+s.translation).join(' ')}`.toLowerCase().includes(app.qText.toLowerCase())));}
  function buildQuestion(kind,item,practiceMode,score=configs[kind]?.score){
    const config=getMode(kind,practiceMode);if(!item||!config)return null;
    return {id:`READ-${kind}-${item.id}-${practiceMode}`,bookId:item.bookId,unit:item.unit,sourceKind:kind,practiceKind:kind,practiceMode,materialId:item.id,material:clone(item),contentTitle:item.title,type:config.name,stage:source(item.bookId).stage,subject:'英语',difficulty:'适中',knowledge:source(item.bookId).units[item.unit],stem:kind==='sentence'?'请跟读下面的句子。':`${practiceMode==='line'?'请逐句跟读':practiceMode==='full'?'请完整跟读':'请背诵'}短文《${item.title}》。`,options:[],answer:fullText(item),analysis:practiceMode==='recite'?'参考背诵文本见原文。':'参考跟读文本见原文。',response:'record',score};
  }
  function findQuestion(id){
    for(const [kind,config] of Object.entries(configs))for(const item of config.items){const chosen=config.modes.find(m=>`READ-${kind}-${item.id}-${m.id}`===id);if(chosen)return buildQuestion(kind,item,chosen.id);}
    return null;
  }
  function paperMarkup(q){
    if(!q.practiceKind)return '';
    const lines=q.material.sentences;
    return `<div class="rp-paper-content">${q.practiceMode==='line'?`<ol>${lines.map(s=>`<li>${esc(s.text)}</li>`).join('')}</ol>`:`<p>${esc(fullText(q.material))}</p>`}${q.practiceKind==='sentence'?`<small>${esc(lines[0].translation)}</small>`:''}</div>`;
  }
  function renderResults(kind){
    const config=configs[kind],result=filtered(kind),chosen=selected[kind],all=result.length>0&&result.every(item=>chosen.includes(item.id));
    return `<section class="question-results"><form id="readingFilters" data-kind="${kind}" class="q-filters"><div class="search-line"><input name="text" placeholder="${kind==='sentence'?'句子 / 中文译文':'文章标题 / 正文关键词'}" value="${esc(app.qText)}" aria-label="搜索${config.name}"><button type="submit" class="btn small primary">${icon('search')}查询</button>${tool('重置筛选','reset-questions',{},'rotate-ccw')}</div><div class="q-filter-options"><select name="stage" aria-label="${config.name}学段">${options(['初中','高中'],app.qStage,'全部学段')}</select></div></form><div class="q-list-head rp-result-head">${!app.replaceId?`<label class="check-row"><input type="checkbox" data-rp-all="${kind}" aria-label="选择当前全部${config.noun}" ${all?'checked':''}>全选当前结果</label>`:''}<span>共 ${result.length} ${config.unit}</span>${app.sourceUnit?button('清除目录筛选','clear-unit',{},'link'):''}</div>${result.map(item=>{
      const added=currentPaper().items.filter(q=>q.practiceKind===kind&&q.materialId===item.id);
      return `<article class="question-card rp-material-card ${chosen.includes(item.id)?'chosen':''}" data-material="${item.id}"><div class="rp-material-head">${!app.replaceId?`<input type="checkbox" data-rp-item="${item.id}" data-kind="${kind}" aria-label="选择 ${esc(item.title)}" ${chosen.includes(item.id)?'checked':''}>`:''}<strong>${esc(item.title)}</strong>${badge(source(item.bookId).stage,'gray')}</div><div class="rp-material-body">${kind==='sentence'?`<p class="rp-sentence-text">${esc(item.sentences[0].text)}</p><p class="rp-translation">${esc(item.sentences[0].translation)}</p>`:`<p class="rp-translation">${esc(item.translation)}</p><p>${esc(item.sentences[0].text)}</p><details><summary>查看全文 · ${item.sentences.length} 句</summary>${item.sentences.map(s=>`<p>${esc(s.text)}</p>`).join('')}</details>`}</div><div class="rp-material-foot"><div><span class="muted small-text">${esc(source(item.bookId).short)} / ${esc(source(item.bookId).units[item.unit])}</span>${added.length?`<div class="rp-added">${added.map(q=>badge(q.type,'green')).join(' ')}</div>`:''}</div>${button(app.replaceId?'选择并替换':kind==='sentence'?'添加跟读':'选择练习方式','rp-add',{kind,id:item.id},'btn small primary',app.replaceId?'replace':'plus')}</div></article>`;
    }).join('')||empty(`暂无符合条件的${config.noun}`)}${!app.replaceId?`<div class="sp-word-footer"><div><strong>已选 ${chosen.length} ${config.unit}</strong>${chosen.length?button('清空','rp-clear',{kind},'link'):''}</div><button class="btn primary" ${action('rp-batch',{kind})} ${chosen.length?'':'disabled'}>${icon('plus')}设置并加入</button></div>`:''}</section>`;
  }
  function afterRender(){
    const box=document.querySelector('[data-rp-all]');if(!box)return;
    const kind=box.dataset.rpAll,result=filtered(kind),count=result.filter(item=>selected[kind].includes(item.id)).length;
    box.indeterminate=count>0&&count<result.length;
  }
  function updateDialog(){
    const root=document.getElementById('rpPreview');if(!root||!dialog)return;
    const generated=dialog.items.map(item=>buildQuestion(dialog.kind,item,dialog.mode,dialog.score));
    const duplicates=generated.filter(q=>currentPaper().items.some(p=>p.id===q.id&&p.id!==dialog.editId)).length;
    const valid=Number.isFinite(dialog.score)&&dialog.score>=.5&&dialog.score<=100&&dialog.score*2%1===0;
    document.querySelector('[form="readingPracticeForm"]').disabled=!valid||duplicates===generated.length;
    document.getElementById('rpSummary').textContent=`${generated.length} ${configs[dialog.kind].unit} · ${generated.length} 道练习 · 总分 ${valid?generated.length*dialog.score:'--'} 分${duplicates?' · '+duplicates+' 道已加入':''}`;
    root.innerHTML=generated.map(q=>`<article class="sp-generated-question"><div class="sp-generated-meta"><strong>${esc(q.contentTitle)}</strong>${badge(q.type)}${badge((valid?q.score:'--')+' 分','gray')}</div>${paperMarkup(q)}<div class="rp-audio-status">${icon('volume-2')}示范音频待接入</div><small class="muted">${esc(SourcePicker.sourcePath(q))}</small></article>`).join('');icons();
  }
  function openDialog(kind,ids,editId=null){
    if(!supports(kind))return;
    const original=editId?currentPaper().items.find(q=>q.id===editId):null;
    const materials=original?[clone(original.material)]:[...new Set(ids)].map(id=>items(kind).find(item=>item.id===id)).filter(Boolean).map(clone);
    if(!materials.length)return toast('请先选择内容','error');
    if(app.replaceId&&materials.length!==1)return toast('换题时请选择一份内容','error');
    const replaceId=editId||app.replaceId;
    const replaced=currentPaper().items.find(q=>q.id===replaceId);
    if(replaceId&&!replaced)return toast('原试题已变更，请重新选择','error');
    dialog={kind,items:materials,paperId:app.paperId,replaceId,editId,mode:original?.practiceMode||mode[kind],score:replaced?.score||configs[kind].score};
    const config=configs[kind];
    modal(editId?'修改练习方式':app.replaceId?'替换练习':kind==='sentence'?'句子跟读设置':'文章练习设置',`<form id="readingPracticeForm" class="sp-vocab-form"><div class="form-grid"><label class="field"><span>练习方式</span>${kind==='sentence'?'<strong class="rp-fixed-mode">句子跟读</strong><input type="hidden" name="mode" value="follow">':`<select name="mode">${options(config.modes,dialog.mode)}</select>`}</label><label class="field"><span>每${config.unit}分值</span><input name="score" type="number" min="0.5" max="100" step="0.5" value="${dialog.score}" ${app.replaceId?'readonly':''} required></label></div><p class="small-text muted" id="rpSummary"></p></form><div id="rpPreview"></div>`,`${button('取消','close')}<button class="btn primary" form="readingPracticeForm" type="submit">${icon(replaceId?'check':'plus')}${editId?'保存设置':replaceId?'确认替换':'加入当前组卷'}</button>`,true);
    updateDialog();
  }
  function studentContent(q,ctx){
    const lines=q.material.sentences,index=Math.min(ctx.practiceIndex||0,lines.length-1),reciting=q.practiceMode==='recite'&&ctx.reciteStage==='recite';
    const audioLabel=q.practiceMode==='line'?'播放本句':'播放原音';
    return `<div class="student-question rp-student"><h3>${esc(q.contentTitle)}</h3>${q.practiceMode==='line'?`<div class="rp-sentence-progress">第 ${index+1} / ${lines.length} 句</div><p class="rp-active-sentence">${esc(lines[index].text)}</p>`:reciting?`<div class="rp-recite-state">${icon('mic')}<strong>背诵中</strong><span>请背诵全文</span></div>`:`<div class="rp-reading-body">${q.practiceMode==='recite'?'<span class="badge">背诵准备</span>':''}${lines.map(s=>`<p>${esc(s.text)}</p>`).join('')}</div>`}<div class="rp-student-audio"><button disabled title="示范音频待接入">${icon('volume-2')}${audioLabel}</button><span>示范音频待接入</span></div><div class="student-mic"><button disabled>${icon('mic')}${q.practiceMode==='recite'?'录制背诵':'录制跟读'}</button><button disabled>${icon('headphones')}播放录音</button></div></div>`;
  }
  function previewControls(q,ctx){
    if(q.practiceMode==='line')return `<button class="btn small" ${action('ap-reading-line',{index:(ctx.practiceIndex||0)-1})} ${!ctx.practiceIndex?'disabled':''}>${icon('chevron-left')}上一句</button><span class="small-text">第 ${(ctx.practiceIndex||0)+1} / ${q.material.sentences.length} 句</span><button class="btn small" ${action('ap-reading-line',{index:(ctx.practiceIndex||0)+1})} ${(ctx.practiceIndex||0)>=q.material.sentences.length-1?'disabled':''}>下一句${icon('chevron-right')}</button>`;
    if(q.practiceMode==='recite')return `<div class="ap-segments">${['prepare','recite'].map(value=>button(value==='prepare'?'背诵准备':'背诵状态','ap-recitation',{value},(ctx.reciteStage||'prepare')===value?'active':'')).join('')}</div>`;
    return `<span class="muted small-text">${esc(q.type)} · ${q.practiceKind==='sentence'?'1 句':q.material.sentences.length+' 句'}</span>`;
  }
  function previewSidebar(q,ctx){
    return `<div class="ap-pane-title"><h3>练习方式</h3></div><div class="ap-rule-meta"><strong>${esc(q.type)}</strong>${badge(q.score+' 分','gray')}<div>${esc(q.contentTitle)}</div><div>共 ${q.material.sentences.length} 句</div></div>${q.practiceMode==='line'?`<div class="ap-flow-list">${q.material.sentences.map((s,i)=>`<button class="ap-step ${i===(ctx.practiceIndex||0)?'active':''}" ${action('ap-reading-line',{index:i})}><span class="step-no">${i+1}</span><span class="step-title">${esc(s.text)}</span></button>`).join('')}</div>`:''}<div class="ap-rule-foot">${esc(SourcePicker.sourcePath(q))}<br>跟读、背诵练习不使用中高考流控。</div>`;
  }
  function assignmentSummary(items){
    const practice=items.filter(q=>q.practiceKind);if(!practice.length)return '';
    return `<div class="rp-assignment-summary"><h3>跟读 / 背诵练习</h3>${practice.map(q=>`<div><span>${esc(q.contentTitle)}</span>${badge(q.type,'green')}</div>`).join('')}</div>`;
  }
  document.addEventListener('click',e=>{
    const t=e.target.closest('[data-action]');if(!t||t.disabled)return;const d=t.dataset;
    if(d.action==='rp-add')openDialog(d.kind,[d.id]);
    if(d.action==='rp-batch')openDialog(d.kind,selected[d.kind]||[]);
    if(d.action==='rp-clear'&&supports(d.kind)){selected[d.kind]=[];render();}
    if(d.action==='rp-edit'){const q=currentPaper().items.find(q=>q.id===d.id);if(q?.practiceKind)openDialog(q.practiceKind,[],q.id);}
  });
  document.addEventListener('change',e=>{
    const t=e.target;
    if(t.dataset.rpItem&&supports(t.dataset.kind)){const list=selected[t.dataset.kind];selected[t.dataset.kind]=t.checked?[...new Set([...list,t.dataset.rpItem])]:list.filter(id=>id!==t.dataset.rpItem);render();}
    if(t.dataset.rpAll&&supports(t.dataset.rpAll)){const kind=t.dataset.rpAll,ids=filtered(kind).map(item=>item.id);selected[kind]=t.checked?[...new Set([...selected[kind],...ids])]:selected[kind].filter(id=>!ids.includes(id));render();}
    if(dialog&&t.closest('#readingPracticeForm')&&t.name==='mode'&&getMode(dialog.kind,t.value)){dialog.mode=t.value;mode[dialog.kind]=t.value;updateDialog();}
  });
  document.addEventListener('input',e=>{if(dialog&&e.target.closest('#readingPracticeForm')&&e.target.name==='score'){dialog.score=Number(e.target.value);updateDialog();}});
  document.addEventListener('submit',e=>{
    const id=e.target.getAttribute('id');if(!['readingFilters','readingPracticeForm'].includes(id))return;
    e.preventDefault();const form=new FormData(e.target);
    if(id==='readingFilters'){app.qText=form.get('text').trim();app.qStage=form.get('stage');render();return;}
    if(!dialog||dialog.paperId!==app.paperId||!getMode(dialog.kind,form.get('mode')))return;
    const score=Number(form.get('score'));if(!Number.isFinite(score)||score<.5||score>100||score*2%1!==0)return toast('分值需为 0.5 至 100，按 0.5 递增','error');
    const p=currentPaper(),generated=dialog.items.map(item=>buildQuestion(dialog.kind,item,form.get('mode'),score));
    const added=generated.filter(q=>!p.items.some(item=>item.id===q.id&&item.id!==dialog.editId));
    if(!added.length)return toast('所选内容的相同练习方式已加入','error');
    if(dialog.replaceId){const index=p.items.findIndex(q=>q.id===dialog.replaceId);if(index<0)return toast('原试题已变更，请重新选择','error');p.items[index]={...added[0],score:dialog.editId?score:p.items[index].score};app.replaceId=null;app.view='editor';}
    else p.items.push(...added);
    selected[dialog.kind]=selected[dialog.kind].filter(id=>!dialog.items.some(item=>item.id===id));
    const editing=!!dialog.editId;dialog=null;changePaper();closeModal();render();toast(editing?'练习设置已保存':`已加入 ${added.length} 道练习`);
  });
  window.ReadingLibrary={supports,items,reset,prepareType,render:renderResults,afterRender,buildQuestion,findQuestion,paperMarkup,studentContent,previewControls,previewSidebar,assignmentSummary};
})();
