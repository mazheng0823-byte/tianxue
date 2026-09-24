(() => {
  'use strict';
  const library = window.FLOW_RULE_LIBRARY || [];
  const kinds = {narration:'旁白',read:'读题准备',audio:'播放听力',wait:'间隔等待',prepare:'录音准备',write:'作答',record:'录音作答'};
  const timed = kind => !['audio','narration'].includes(kind);
  const stageOf = q => q.stage || source(q.bookId)?.stage;
  const ruleRegion = rule => PaperScope.regionLabel(rule.province ? rule : library.find(r=>r.id===rule.id)||{});
  let ctx = null, editor = null, editorBase = null, timer = null;

  function templateCopy(id) {
    const rule = library.find(r => r.id === id);
    if (!rule) return null;
    const result = clone(rule);
    // The source narration and timeline disagree here. Keep the source intact.
    if (id === 'high-standalone-retell') {
      const at = result.steps.findIndex(s => s.kind === 'audio');
      result.steps.splice(at + 1, 0, {...clone(result.steps[at]),id:'second-play',text:'第二次播放（按旁白听2遍，待确认）'});
      result.conflict = '附件旁白为听2遍，步骤仅列1遍；本模板暂按2遍展示，待规则确认后统一更新模板。';
    }
    return result;
  }
  function defaultConfig(q, items, index, scope={}) {
    if (!q.flowType || !PaperScope.valid(scope)) return null;
    const selected = scope.templateId ? window.PaperTemplate?.get(scope.templateId) : null;
    if (selected?.mode === 'none' || selected?.types && !selected.types.includes(q.flowType)) return null;
    const stage = scope.stage, prev = items[index - 1], next = items[index + 1];
    const adjacent = (item, type) => item && item.flowType === type;
    let mode = selected?.mode || 'exam';
    if (!selected && stage === '高中') {
      if (q.flowType === 'information' && !adjacent(next,'retell')) mode = 'standalone';
      if (q.flowType === 'retell' && !adjacent(prev,'information')) mode = 'standalone';
      if (q.flowType === 'reading' && !adjacent(next,'oral')) mode = 'standalone';
      if (q.flowType === 'oral' && !adjacent(prev,'reading')) mode = 'standalone';
    }
    const matches=library.filter(r=>r.province===scope.province && r.stage===stage && r.type===q.flowType && r.mode===mode);
    const rule=matches.find(r=>r.city===scope.city)||matches.find(r=>r.city==='*');
    return rule ? templateCopy(rule.id) : null;
  }
  function rulesForItems(items, stored = {}, scope={}) {
    return Object.fromEntries(items.flatMap((q,i) => {
      const fallback=defaultConfig(q,items,i,scope), saved=stored[q.id];
      const template=saved&&library.find(r=>r.id===saved.id);
      const currentTemplateId=window.PaperTemplate?.inferId(scope)||scope.templateId||'';
      const matchesTemplate=!saved?.scope?.templateId||saved.scope.templateId===currentTemplateId;
      const matchesScope=saved?.scope ? PaperScope.key(saved.scope)===PaperScope.key(scope)&&matchesTemplate : !!template && template.province===scope.province && template.stage===scope.stage && (template.city==='*'||template.city===scope.city);
      const rule = fallback && saved?.type===q.flowType && matchesScope ? saved : fallback;
      return rule ? [[q.id,clone(rule)]] : [];
    }));
  }
  function snapshot(paper) { return rulesForItems(paper.items,paper.flowOverrides || {},paper); }
  function publishedRules(paper,items=paper.items) {
    const resolved=rulesForItems(items,{},paper);
    return Object.fromEntries(items.flatMap(q=>{
      const rule=paper.flowRules?.[q.id]||resolved[q.id];
      return rule?[[q.id,clone(rule)]]:[];
    }));
  }
  const missing = (items,rules) => items.filter(q=>q.flowType&&!rules[q.id]);
  function expandSteps(rule, q, items, index, rules) {
    if (!rule) return [];
    let steps = clone(rule.steps);
    const count = Math.max(1,q.subQuestions?.length || 1);
    if (rule.stage === '高中' && rule.type === 'oral') {
      const lead = steps.filter(s => s.perQuestion != null);
      const loop = steps.filter(s => s.perQuestion == null);
      steps = [...lead.map(s => ({...s,seconds:s.perQuestion * count})),
        ...Array.from({length:count},(_,n) => loop.map(s => ({...s,id:s.id+'-q'+n,subIndex:n}))).flat()];
    }
    if (rule.type === 'answer-group') {
      let subIndex = 0;
      steps.forEach((s,i) => {
        if (s.kind === 'record') {
          s.subIndex = subIndex;
          if (steps[i-1]?.kind === 'narration') steps[i-1].subIndex = subIndex;
          subIndex++;
        }
      });
    }
    const previous = rules?.[items[index-1]?.id];
    const introGroup = config => library.find(r=>r.id===config.id)?.intro ?? config.intro;
    if (rule.intro && (!previous || introGroup(previous) !== introGroup(rule) || previous.stage !== rule.stage || previous.mode !== rule.mode)) {
      steps.unshift({id:'section-intro',kind:'narration',text:rule.intro,audio:rule.introAudio,audioFile:rule.introAudioFile?clone(rule.introAudioFile):undefined,seconds:null});
    }
    return steps;
  }
  function tableMarkup(q) {
    if (!q.table) return '';
    return `<table><tbody>${q.table.map(([a,b])=>`<tr><th>${esc(a)}</th><td>${esc(b)}</td></tr>`).join('')}</tbody></table>`;
  }
  function paperMarkup(q) {
    if(q.practiceKind)return ReadingLibrary.paperMarkup(q);
    return `${q.passage?`<p style="white-space:pre-line;margin:12px 0">${esc(q.passage)}</p>`:''}${tableMarkup(q)}${q.opening?`<p>${esc(q.opening)}</p>`:''}${(q.subQuestions||[]).map((s,i)=>`<p style="margin-top:12px">${i+1}. ${esc(s.stem)}</p><div class="options-grid">${(s.options||[]).map((o,j)=>`<div>${String.fromCharCode(65+j)}. ${esc(o)}</div>`).join('')}</div>`).join('')}`;
  }
  const currentQuestion = () => ctx.data.items[ctx.index];
  const currentRule = () => ctx.rules[currentQuestion().id];
  const phases = () => expandSteps(currentRule(),currentQuestion(),ctx.data.items,ctx.index,ctx.rules);
  const currentPhase = () => phases()[ctx.phase];
  function stop() { clearInterval(timer); timer = null; if (ctx) ctx.running = false; }
  function resetPhase(index = 0) { stop(); ctx.phase = index; ctx.remaining = currentPhase()?.seconds ?? null; }
  function selectQuestion(index) {
    if (!Number.isInteger(index) || index < 0 || index >= ctx.data.items.length) return;
    ctx.index=index;ctx.practiceIndex=0;ctx.reciteStage='prepare';resetPhase();renderPreview();
  }
  function nonFlowControls(q) {
    const practice=q.practiceKind?`<div class="ap-practice-controls">${ReadingLibrary.previewControls(q,ctx)}</div>`:'';
    const questions=`<div class="ap-question-controls"><button class="btn small" ${action('ap-prev-question')} ${ctx.index===0?'disabled':''}>${icon('chevron-left')}上一题</button><span class="small-text">第 ${ctx.index+1} / ${ctx.data.items.length} 题</span><button class="btn small" ${action('ap-next-question')} ${ctx.index===ctx.data.items.length-1?'disabled':''}>下一题${icon('chevron-right')}</button></div>`;
    return practice+questions;
  }

  function open(descriptor) {
    const paper = db.papers.find(p => p.id === descriptor.id);
    if (!paper) return;
    const data = descriptor.version ? paper.versions.find(v => v.version === Number(descriptor.version)) : descriptor.teacher ? latest(paper) : paper;
    if (!data?.items.length) return toast('试卷中暂无试题','error');
    closeModal();
    ctx = {...descriptor,data:clone(data),editable:!descriptor.teacher&&!descriptor.version,index:0,practiceIndex:0,reciteStage:'prepare',phase:0,device:'mobile',speed:1,running:false};
    ctx.rules = ctx.editable ? snapshot(paper) : publishedRules(data);
    resetPhase(); renderPreview();
    document.querySelector('[data-action="ap-exit"]')?.focus();
  }
  function exitPreview() {
    if (!ctx) return;
    stop(); closeEditor();
    const descriptor = ctx;
    ctx = null;
    document.getElementById('answerPreviewRoot')?.remove();
    render();
    showPreview(descriptor.id,descriptor.teacher,descriptor.version);
  }
  function choiceMarkup(s, index) {
    return `<div class="student-question"><p>${index == null?'':index+1+'. '}${esc(s.stem)}</p>${(s.options||[]).map((o,j)=>`<label class="student-option"><input type="radio" disabled aria-label="${esc(o)}"><span>${String.fromCharCode(65+j)}. ${esc(o)}</span></label>`).join('')}</div>`;
  }
  function studentContent() {
    const q = currentQuestion(), rule = currentRule(), phase = currentPhase();
    if(q.practiceKind)return ReadingLibrary.studentContent(q,ctx);
    if (phase?.kind === 'narration') return `<div class="student-narration">${icon('volume-2')}${esc(phase.text)}</div>`;
    if (!q.flowType && q.response === 'text') return `<div class="student-question"><p>${esc(q.stem)}</p><input type="text" disabled placeholder="${q.answerLanguage==='en'?'请输入英文单词':'请输入中文释义'}" aria-label="词汇默写答案"></div>`;
    if (!q.flowType || q.response === 'choice') return q.subQuestions ? q.subQuestions.map((s,i)=>choiceMarkup(s,i)).join('') : choiceMarkup(q,null);
    const subIndex = phase?.subIndex;
    const subs = Number.isInteger(subIndex) ? [q.subQuestions?.[subIndex]].filter(Boolean) : q.subQuestions || [];
    const pairedQuestions = q.flowType === 'reading' && rule && rule.mode !== 'standalone' && ctx.data.items[ctx.index+1]?.flowType === 'oral' ? ctx.data.items[ctx.index+1].subQuestions : null;
    const pairedInformation = q.flowType === 'retell' && rule?.stage === '高中' && rule?.mode !== 'standalone' && ctx.data.items[ctx.index-1]?.flowType === 'information';
    return `<div class="student-question"><p>${esc(q.stem)}</p>${q.passage?`<p class="passage">${esc(q.passage)}</p>`:''}${tableMarkup(q)}${q.opening?`<p>${esc(q.opening)}</p>`:''}${q.response==='fill'?q.table.map((_,i)=>`<label>${i+1}. <input type="text" disabled placeholder="请输入答案" aria-label="第${i+1}空"></label>`).join(''):''}${pairedInformation?`<div class="student-related muted small-text">听后记录答案回填区</div>${ctx.data.items[ctx.index-1].table.map((_,i)=>`<input type="text" disabled placeholder="第${i+1}空（预览未作答）" aria-label="第${i+1}空回填">`).join('')}`:''}${subs.map((s,i)=>`<p class="student-related">${(subIndex??i)+1}. ${esc(s.stem)}</p>`).join('')}${pairedQuestions?`<div class="student-related">${pairedQuestions.map((s,i)=>`<p>${i+1}. ${esc(s.stem)}</p>`).join('')}</div>`:''}</div>${q.response==='record'?`<div class="student-mic"><button disabled>${icon('mic')}录音</button><button disabled>${icon('headphones')}播放录音</button></div>`:''}`;
  }
  function renderPreview() {
    if (!ctx) return;
    let root = document.getElementById('answerPreviewRoot');
    if (!root) { root = document.createElement('section'); root.id = 'answerPreviewRoot'; root.className = 'ap-overlay'; document.body.appendChild(root); }
    const q = currentQuestion(), rule = currentRule(), steps = phases(), phase = currentPhase();
    const labels = {narration:'题目旁白',read:'请准备',audio:'正在播放',wait:'请等待',prepare:'请准备',write:'请作答',record:'请录音'};
    root.innerHTML = `<header class="ap-top">${tool('返回试卷预览','ap-exit',{},'arrow-left')}<h2>作答预览 · ${esc(ctx.data.name)}</h2><div class="ap-top-tools"><span class="ap-readonly">只读预览</span>${badge(ctx.editable?'当前草稿':'发布版本 V'+ctx.data.version,ctx.editable?'':'green')}${button('返回试卷','ap-exit',{},'btn small')}</div></header><div class="ap-layout"><aside class="ap-nav"><div class="ap-pane-title"><h3>试题目录</h3><span class="muted small-text">${ctx.data.items.length} 题</span></div><div class="ap-q-list">${ctx.data.items.map((item,i)=>`<button class="ap-q ${i===ctx.index?'active':''}" ${action('ap-question',{index:i})}><b>${i+1}</b><span>${esc(item.type)}<small>来源 ${esc(stageOf(item))} · ${item.score} 分</small></span></button>`).join('')}</div></aside><main class="ap-stage"><div class="ap-viewbar"><span>${esc(q.type)} · ${esc(PaperScope.label(ctx.data))}</span><div class="ap-segments">${['mobile','desktop'].map(v=>button(v==='mobile'?'手机':'电脑','ap-device',{value:v},ctx.device===v?'active':'',v==='mobile'?'smartphone':'monitor')).join('')}</div></div><section class="ap-device ${ctx.device}" aria-label="学生作答页面，只读"><div class="student-title">${icon('chevron-left')}<strong>${esc(ctx.data.name)}</strong>${icon('more-horizontal')}</div><div class="student-section">${icon('circle-chevron-down')}<span>${ctx.index+1}. ${esc(q.type)}</span></div><div class="student-scroll">${studentContent()}${phase?.kind==='audio'?`<div class="ap-static-player">${icon('volume-2')}<span class="track"></span>音频待接入</div>`:''}</div><footer class="student-footer"><span>${q.practiceKind?esc(q.type):labels[phase?.kind]||'作答页面'}</span><strong data-ap-timer>${ctx.remaining??'--'}<small>${ctx.remaining==null?'':' s'}</small></strong><button disabled>${q.practiceKind?'提交录音':phase?.kind==='record'?'结束录音':'提交答案'}</button></footer></section><div class="ap-controls">${q.practiceKind?ReadingLibrary.previewControls(q,ctx):`<button class="btn small" ${action('ap-prev')} ${ctx.phase===0?'disabled':''}>${icon('skip-back')}上一阶段</button><button class="btn small primary" ${action('ap-play')} ${!steps.length?'disabled':''}>${icon(ctx.running?'pause':'play')}${ctx.running?'暂停演示':'演示'}</button><button class="btn small" ${action('ap-next')} ${ctx.phase>=steps.length-1?'disabled':''}>下一阶段${icon('skip-forward')}</button><select id="apSpeed" aria-label="演示倍速">${[1,5,10].map(n=>option(n,n+'倍速',ctx.speed)).join('')}</select>`}</div><div class="ap-note" role="status">${phase&&!timed(phase.kind)?'音频文件待接入，当前仅展示播放状态；可切换下一阶段。':'仅查看作答效果，不采集答案、录音或提交记录。'}</div></main><aside class="ap-rules">${q.practiceKind?ReadingLibrary.previewSidebar(q,ctx):`<div class="ap-pane-title"><h3>流控规则</h3>${ctx.editable&&rule?button('修改','ap-edit',{},'link','sliders-horizontal'):''}</div>${rule?`<div class="ap-rule-meta"><strong>${esc(ruleRegion(rule))} · ${rule.stage} · ${esc(q.type)}</strong>${badge(rule.modeLabel)} ${badge(rule.custom?'本卷已修改':'默认模板',rule.custom?'orange':'gray')}<div>${esc(rule.section)}</div>${rule.conflict?`<div class="ap-rule-warning">${esc(templateCopy(rule.id)?.conflict||rule.conflict)}</div>`:''}</div><div class="ap-flow-list">${steps.map((s,i)=>`<button class="ap-step ${ctx.phase===i?'active':''}" ${action('ap-phase',{index:i})}><span class="step-no">${String(i+1).padStart(2,'0')}</span><span class="step-title">${kinds[s.kind]}${s.subIndex!=null?' · 第'+(s.subIndex+1)+'小题':''}</span><small>${s.seconds!=null?s.seconds+' 秒':'音频时长'}</small></button>`).join('')}</div><div class="ap-rule-foot">来源：${esc(rule.source.file)}<br>${esc(rule.source.sheet)} · 第 ${rule.source.row} 行<br>${ctx.editable?'修改仅应用于本份试卷；发布后随版本保存。':'此处为发布快照，规则不可修改。'}</div>`:`<div class="ap-empty">${q.flowType?(PaperScope.valid(ctx.data)?esc(PaperScope.label(ctx.data))+' · 本题型流控规则尚未配置。':'请先补充试卷所属省市和学段。'):'本题为普通作答题，无听说流控。'}${q.flowType&&ctx.editable?button('修改基础信息','ap-scope',{},'btn small'):''}</div>`}`}</aside></div>`;
    if (!(q.flowType && rule && steps.length)) root.querySelector('.ap-controls').innerHTML=nonFlowControls(q);
    icons();
  }
  function play() {
    if (ctx.running) { stop(); renderPreview(); return; }
    const phase = currentPhase();
    if (!phase || !timed(phase.kind)) { toast('音频尚未接入，请手动切换下一阶段'); return; }
    ctx.running = true;
    if (!ctx.remaining) ctx.remaining = phase.seconds;
    renderPreview();
    timer = setInterval(()=>{
      ctx.remaining = Math.max(0,ctx.remaining - ctx.speed);
      const timerLabel = document.querySelector('[data-ap-timer]');
      if (timerLabel) timerLabel.innerHTML = ctx.remaining+'<small> s</small>';
      if (ctx.remaining === 0) {
        stop();
        if (ctx.phase < phases().length-1) {
          resetPhase(ctx.phase+1);
          if (timed(currentPhase().kind)) play(); else renderPreview();
        } else renderPreview();
      }
    },1000);
  }

  function openEditor() {
    if (!ctx?.editable || !currentRule()) return;
    stop();
    editorBase = clone(currentRule());
    editor = clone(editorBase);
    renderPreview(); renderEditor();
    document.querySelector('#apRuleDialog textarea, #apRuleDialog input')?.focus();
  }
  function closeEditor() { editor = null; editorBase = null; document.getElementById('apRuleDialog')?.remove(); }
  function formatFileSize(bytes) {
    if (!Number.isFinite(bytes) || bytes < 1) return '大小未知';
    if (bytes < 1024) return bytes+' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(bytes < 10240 ? 1 : 0)+' KB';
    return (bytes / 1024 / 1024).toFixed(bytes < 10 * 1024 * 1024 ? 1 : 0)+' MB';
  }
  function audioUpload(label, value, file, target, index = '') {
    const hasFile = !!value, local = !!file?.local;
    const id = `apAudio-${target}-${index === '' ? 'intro' : index}`;
    const attrs = target === 'step' ? {target,index} : {target};
    const detail = local
      ? `本地待上传 · ${formatFileSize(file.size)}${file.type ? ' · '+file.type : ''}`
      : hasFile ? '当前规则音频' : '支持 MP3、WAV、M4A、AAC、OGG、FLAC';
    return `<div class="ap-audio-field">
      <span class="ap-audio-label">${label}</span>
      <div class="ap-audio-upload ${local?'selected':''}">
        <div class="ap-audio-file">${icon('file-audio')}<span><strong>${esc(value||'未选择音频')}</strong><small>${esc(detail)}</small></span></div>
        <div class="actions">
          <label class="btn small ap-file-trigger" for="${id}">${icon('upload')}${hasFile?'替换文件':'选择文件'}</label>
          <input id="${id}" class="ap-audio-input" type="file" accept="audio/*,.mp3,.wav,.m4a,.aac,.ogg,.flac" data-audio-target="${target}" ${target==='step'?`data-index="${index}"`:''} aria-label="${label}">
          ${hasFile?button('移除','ap-audio-clear',attrs,'btn small danger','trash-2'):''}
        </div>
      </div>
    </div>`;
  }
  function setAudioFile(input) {
    if (!editor) return;
    const file = input.files?.[0];
    if (!file) return;
    if (!(file.type?.startsWith('audio/') || /\.(mp3|wav|m4a|aac|ogg|flac)$/i.test(file.name))) {
      input.value='';
      toast('请选择 MP3、WAV、M4A、AAC、OGG 或 FLAC 音频文件','error');
      return;
    }
    const meta = {name:file.name,size:file.size,type:file.type||'',lastModified:file.lastModified,local:true};
    if (input.dataset.audioTarget === 'intro' && editorBase?.intro) {
      editor.introAudio=file.name;
      editor.introAudioFile=meta;
    } else {
      const step=editor.steps[Number(input.dataset.index)];
      if (!step || timed(step.kind)) return;
      step.audio=file.name;
      step.audioFile=meta;
    }
    renderEditor();
    toast(`已选择 ${file.name}，保存本卷规则后生效`);
  }
  function clearAudio(target, index) {
    if (!editor) return;
    if (target === 'intro' && editorBase?.intro) {
      editor.introAudio='';
      delete editor.introAudioFile;
    } else if (target === 'step') {
      const step=editor.steps[Number(index)];
      if (!step || timed(step.kind)) return;
      step.audio='';
      delete step.audioFile;
    }
    renderEditor();
  }
  // Only copy parameter fields; preserve even legacy customized step structures.
  function applyParameters(base, values) {
    const result = clone(base);
    if (base.intro) {
      result.intro = values.intro;
      result.introAudio = values.introAudio;
      if (values.introAudioFile) result.introAudioFile=clone(values.introAudioFile);
      else delete result.introAudioFile;
    }
    result.steps = base.steps.map(step => {
      const value = values.steps.find(s=>s.id===step.id && s.kind===step.kind);
      if (!value) return clone(step);
      const next = {...clone(step),text:value.text};
      if (timed(step.kind)) {
        if (step.perQuestion != null) next.perQuestion = value.perQuestion;
        else next.seconds = value.seconds;
      } else {
        next.audio = value.audio;
        if (value.audioFile) next.audioFile=clone(value.audioFile);
        else delete next.audioFile;
      }
      return next;
    });
    return result;
  }
  function renderEditor(error = '') {
    if (!editor) return;
    let root = document.getElementById('apRuleDialog');
    if (!root) {root=document.createElement('div');root.id='apRuleDialog';root.className='ap-dialog-layer';document.body.appendChild(root);}
    root.innerHTML=`<section class="ap-dialog" role="dialog" aria-modal="true" aria-labelledby="apDialogTitle">
      <header class="modal-head"><h2 id="apDialogTitle">流控设置 · ${esc(currentQuestion().type)}</h2>${tool('关闭流控设置','ap-cancel',{},'x')}</header>
      <div class="ap-dialog-body">
        <div class="ap-config-head"><div><span class="muted small-text">规则模板</span><p class="ap-fixed-template">${esc(ruleRegion(editor))} · ${editor.stage} · ${esc(editor.modeLabel)} ${badge('固定流程','gray')}</p></div><div><span class="muted small-text">应用范围</span><p class="ap-fixed-template">当前试卷 · 第 ${ctx.index+1} 题</p></div></div>
        <div class="ap-rule-warning">调整时长或旁白后，请核对对应音频。可选择本地音频替换当前文件，保存后文件名与待上传状态随本卷规则记录。${editor.type==='oral'?' 口语问答中的单题阶段按小题数量重复。':''}</div>
        ${editor.conflict?`<div class="ap-rule-warning">${esc(templateCopy(editor.id)?.conflict||editor.conflict)}</div>`:''}
        ${editorBase.intro?`<label class="field"><span>大题旁白</span><textarea id="apIntro" rows="3">${esc(editor.intro)}</textarea></label>${audioUpload('大题旁白音频',editor.introAudio,editor.introAudioFile,'intro')}`:''}
        <div class="ap-editor-error" role="alert">${esc(error)}</div>
        <div id="apFlowRows">${editor.steps.map((s,i)=>`<div class="ap-flow-row" data-step="${i}">
          <div class="row-top"><strong>${i+1}</strong><span class="ap-fixed-kind">${kinds[s.kind]}</span>${timed(s.kind)?`<label class="time-field">${s.perQuestion!=null?'每小题':s.kind==='wait'?'停顿时长':'时长'}<input type="number" min="1" max="3600" step="1" data-rule-field="seconds" aria-label="第${i+1}步时长" value="${s.perQuestion??s.seconds??''}">秒</label>`:'<span class="muted small-text">按音频时长</span>'}</div>
          <label class="ap-text-field"><span>${s.kind==='narration'?'旁白文案':'阶段说明'}</span><textarea rows="2" class="step-text" data-rule-field="text" aria-label="第${i+1}步说明">${esc(s.text)}</textarea></label>
          ${!timed(s.kind)?audioUpload('音频文件',s.audio,s.audioFile,'step',i):''}
        </div>`).join('')}</div>
      </div>
      <footer class="modal-footer">${button('恢复默认','ap-restore',{},'btn','rotate-ccw')}<span style="flex:1"></span>${button('取消','ap-cancel')}${button('保存本卷规则','ap-save',{},'btn primary','check')}</footer>
    </section>`;
    icons();
  }
  function saveRule() {
    if (!editor || !editorBase) return;
    editor = applyParameters(editorBase,editor);
    if (editorBase.intro && !editor.intro.trim()) return renderEditor('大题旁白不能为空。');
    if (editor.steps.some((s,i)=>s.kind==='narration'&&editorBase.steps[i].text?.trim()&&!s.text.trim())) return renderEditor('旁白文案不能为空。');
    if (editor.steps.some(s=>timed(s.kind)&&(!Number.isInteger(s.perQuestion??s.seconds)||(s.perQuestion??s.seconds)<1||(s.perQuestion??s.seconds)>3600))) return renderEditor('各阶段时长请输入 1 至 3600 的整数秒。');
    const response = currentQuestion().response;
    if (editor.type === 'answer-group' && editor.steps.filter(s=>s.kind==='record').length !== (currentQuestion().subQuestions?.length||2)) return renderEditor('组合题的每道小题需保留一个录音阶段，请核对录音步骤数量。');
    if (!editor.steps.some(s=>s.kind===(response==='record'?'record':'write'))) return renderEditor(response==='record'?'请保留至少一个录音作答阶段。':'请保留至少一个填写答案阶段。');
    const p = db.papers.find(p=>p.id===ctx.id);
    p.flowOverrides ||= {};
    const pristine = templateCopy(editor.id), comparison = clone(editor);
    delete comparison.custom; delete comparison.scope;
    const changed = JSON.stringify(comparison) !== JSON.stringify(pristine);
    if (!changed && editor.id === defaultConfig(currentQuestion(),ctx.data.items,ctx.index,ctx.data)?.id) delete p.flowOverrides[currentQuestion().id];
    else p.flowOverrides[currentQuestion().id] = {...clone(editor),scope:PaperTemplate.from(p),custom:changed};
    p.pending=true;p.updated=stamp();
    ctx.rules = snapshot(p);
    log('修改流控规则',p.name,`${currentQuestion().id} · ${editor.modeLabel}`);
    closeEditor();resetPhase();renderPreview();toast('已保存本卷流控规则');
  }
  document.addEventListener('input',e=>{
    if (!editor || !e.target.closest('#apRuleDialog')) return;
    document.querySelector('#apRuleDialog .ap-editor-error').textContent='';
    const t=e.target;
    if(t.id==='apIntro'&&editorBase.intro)editor.intro=t.value;
    const row=t.closest('[data-step]');
    if (!row || !t.dataset.ruleField) return;
    const step=editor.steps[Number(row.dataset.step)],field=t.dataset.ruleField;
    if (!step) return;
    if(field==='seconds'&&timed(step.kind)) {
      const amount=Number(t.value);
      if(step.perQuestion!=null)step.perQuestion=amount;else step.seconds=amount;
      if(/^\d+s/.test(step.text)) {
        step.text=step.text.replace(/^\d+s/,amount+'s');
        row.querySelector('[data-rule-field="text"]').value=step.text;
      }
    }
    else if(field==='text')step[field]=t.value;
  });
  document.addEventListener('change',e=>{
    const t=e.target;
    if(t.matches('.ap-audio-input')) {setAudioFile(t);return;}
    if(t.id==='apSpeed'&&ctx)ctx.speed=Number(t.value);
  });
  document.addEventListener('click',e=>{
    const target=e.target.closest('[data-action]');if(!target||target.disabled)return;
    const {action:name,...d}=target.dataset;
    if(name==='answer-preview')return open(app.preview);
    if(!ctx||!name.startsWith('ap-'))return;
    switch(name){
      case 'ap-exit':exitPreview();break;
      case 'ap-question':selectQuestion(Number(d.index));break;
      case 'ap-prev-question':selectQuestion(ctx.index-1);break;
      case 'ap-next-question':selectQuestion(ctx.index+1);break;
      case 'ap-reading-line':{const q=currentQuestion(),index=Number(d.index);if(q.practiceMode==='line'&&Number.isInteger(index)&&index>=0&&index<q.material.sentences.length){ctx.practiceIndex=index;renderPreview();}break;}
      case 'ap-recitation':if(currentQuestion().practiceMode==='recite'&&['prepare','recite'].includes(d.value)){ctx.reciteStage=d.value;renderPreview();}break;
      case 'ap-device':ctx.device=d.value;renderPreview();break;
      case 'ap-phase':resetPhase(Number(d.index));renderPreview();break;
      case 'ap-prev':resetPhase(Math.max(0,ctx.phase-1));renderPreview();break;
      case 'ap-next':resetPhase(Math.min(phases().length-1,ctx.phase+1));renderPreview();break;
      case 'ap-play':play();break;
      case 'ap-edit':openEditor();break;
      case 'ap-scope':{const id=ctx.id;stop();closeEditor();ctx=null;document.getElementById('answerPreviewRoot').remove();app.paperId=id;app.view='editor';render();showPaperForm(true);break;}
      case 'ap-cancel':closeEditor();document.querySelector('[data-action="ap-edit"]')?.focus();break;
      case 'ap-save':saveRule();break;
      case 'ap-restore':if(editor) {editor=applyParameters(editorBase,templateCopy(editorBase.id)||editorBase);renderEditor();}break;
      case 'ap-audio-clear':clearAudio(d.target,d.index);break;
    }
  });
  document.addEventListener('keydown',e=>{
    if (!ctx) return;
    if(e.key==='Escape'){e.preventDefault();if(editor)closeEditor();else exitPreview();}
    if(e.key==='Tab'){
      const root=document.getElementById(editor?'apRuleDialog':'answerPreviewRoot');
      const focusable=[...root.querySelectorAll('button:not(:disabled),input:not(:disabled),select,textarea')].filter(el=>el.getClientRects().length);
      const first=focusable[0],last=focusable.at(-1);
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}
    }
  });
  window.FlowPreview={snapshot,rulesForItems,publishedRules,missing,defaultConfig,expandSteps,paperMarkup};
})();

