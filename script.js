(() => {
  const STORAGE_KEY = 'finance-quiz-progress-v1';
  const $ = (selector) => document.querySelector(selector);
  const state = { queue: [], index: 0, correct: 0, answered: false, lastMode: 'all', lastCategory: null };
  let progress = loadProgress();

  function loadProgress() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { answers:{}, theme:'light' }; } catch { return { answers:{}, theme:'light' }; } }
  function saveProgress() { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); }
  function categoryQuestions(id) { return QUESTIONS.filter(q => !id || q.category === id); }
  function shuffle(items) { return [...items].sort(() => Math.random() - .5); }
  function show(view) { document.querySelectorAll('.view').forEach(el => el.classList.add('hidden')); $(`#${view}-view`).classList.remove('hidden'); window.scrollTo({top:0,behavior:'smooth'}); }
  function labelFor(id) { return QUIZ_CATEGORIES.find(c => c.id === id)?.name || '全範囲'; }

  function renderHome() {
    const attempted = Object.values(progress.answers); const correct = attempted.filter(x => x.correct).length;
    $('#overall-rate').textContent = attempted.length ? `${Math.round(correct / attempted.length * 100)}%` : '—';
    $('#overall-count').textContent = attempted.length ? `${attempted.length}問を解答済み` : 'まだ解答がありません';
    const wrong = Object.values(progress.answers).filter(x => !x.correct).length;
    $('#review-summary').textContent = wrong ? `${wrong}問の復習ができます` : 'まちがえた問題はありません';
    $('#category-grid').innerHTML = QUIZ_CATEGORIES.map(c => {
      const count = categoryQuestions(c.id).length;
      return `<button class="category-card ${c.available?'':'coming'}" data-category="${c.id}" ${c.available?'':'disabled'}><span class="category-icon">${c.icon}</span><strong>${c.name}</strong><small>${c.available ? `${count}問を収録` : '資料追加後に収録予定'}</small><span class="status">${c.available ? '学習する →' : '準備中'}</span></button>`;
    }).join('');
    $('#category-grid').querySelectorAll('[data-category]').forEach(b => b.addEventListener('click', () => start('category', b.dataset.category)));
  }

  function start(mode, category = null) {
    let pool = mode === 'review' ? QUESTIONS.filter(q => progress.answers[q.id] && !progress.answers[q.id].correct) : categoryQuestions(category);
    if (!pool.length) { toast(mode === 'review' ? '復習する問題はありません。' : 'この科目の問題は準備中です。'); return; }
    state.queue = shuffle(pool); state.index = 0; state.correct = 0; state.answered = false; state.lastMode = mode; state.lastCategory = category;
    show('quiz'); renderQuestion();
  }
  function renderQuestion() {
    state.answered = false; const q = state.queue[state.index];
    $('#quiz-category').textContent = labelFor(q.category); $('#quiz-counter').textContent = `${state.index + 1} / ${state.queue.length}`;
    $('#progress-bar').style.width = `${state.index / state.queue.length * 100}%`; $('#question-type').textContent = q.type === 'ox' ? '○× 問題' : '四択問題'; $('#question-text').textContent = q.question;
    $('#live-score').textContent = `正解 ${state.correct} / ${state.index}`; $('#feedback').classList.add('hidden'); $('#next-button').classList.add('hidden');
    $('#answer-list').innerHTML = q.choices.map((choice, i) => `<button class="answer-button" data-answer="${i}"><span class="answer-label">${q.type === 'ox' ? choice : String.fromCharCode(65+i)}</span><span>${q.type === 'ox' ? (choice === '○' ? '正しい' : '誤り') : choice}</span></button>`).join('');
    $('#answer-list').querySelectorAll('button').forEach(b => b.addEventListener('click', () => answer(Number(b.dataset.answer))));
  }
  function answer(choice) {
    if (state.answered) return; state.answered = true; const q = state.queue[state.index], correct = choice === q.answer;
    if (correct) state.correct++; progress.answers[q.id] = { correct, answeredAt: Date.now() }; saveProgress();
    $('#answer-list').querySelectorAll('button').forEach(b => { const n = Number(b.dataset.answer); b.disabled = true; if (n === q.answer) b.classList.add('correct'); else if (n === choice) b.classList.add('incorrect'); });
    $('#feedback').innerHTML = `<strong>${correct ? '✓ 正解です！' : '× 不正解です'}</strong><p>${q.explanation}</p><p style="margin-top:8px;font-size:12px">資料：${q.source}</p>`; $('#feedback').classList.remove('hidden'); $('#live-score').textContent = `正解 ${state.correct} / ${state.index + 1}`; $('#next-button').textContent = state.index + 1 === state.queue.length ? '結果を見る →' : '次の問題 →'; $('#next-button').classList.remove('hidden');
  }
  function next() { if (!state.answered) return; if (++state.index < state.queue.length) renderQuestion(); else finish(); }
  function finish() { $('#progress-bar').style.width = '100%'; const rate = Math.round(state.correct / state.queue.length * 100); $('#result-score').textContent = `${rate}%`; $('#result-detail').textContent = `${state.queue.length}問中 ${state.correct}問正解`; $('#result-message').textContent = rate >= 80 ? 'とても良い調子です。この感覚を定着させましょう。' : rate >= 60 ? 'あと少し。解説を見直して、もう一度挑戦しましょう。' : '復習モードで、苦手な問題をじっくり確認しましょう。'; show('result'); }
  function renderStats() {
    const attempted = Object.values(progress.answers); if (!attempted.length) { $('#stats-content').innerHTML = '<article class="card empty-card">まだ学習記録がありません。ホームから問題を解き始めましょう。</article>'; return; }
    $('#stats-content').innerHTML = `<div class="stats-grid">${QUIZ_CATEGORIES.filter(c => c.available).map(c => { const qs=categoryQuestions(c.id), results=qs.map(q=>progress.answers[q.id]).filter(Boolean), ok=results.filter(x=>x.correct).length, rate=results.length?Math.round(ok/results.length*100):0; return `<article class="stat-card card"><h3>${c.icon} ${c.name}</h3><p>${results.length} / ${qs.length}問 解答済み</p><strong>${results.length ? `${rate}%` : '—'}</strong><p>${ok}問正解</p><div class="bar"><i style="width:${rate}%"></i></div></article>`; }).join('')}</div>`;
  }
  function toast(message) { const t=$('#toast'); t.textContent=message; t.classList.remove('hidden'); setTimeout(()=>t.classList.add('hidden'),2500); }
  function applyTheme() { document.body.classList.toggle('dark', progress.theme === 'dark'); }
  document.addEventListener('click', e => { const action=e.target.closest('[data-action]')?.dataset.action; if (!action) return; if(action==='home'){renderHome();show('home')} if(action==='start-all')start('all'); if(action==='review')start('review'); if(action==='stats'){renderStats();show('stats')} if(action==='next')next(); if(action==='retry')start(state.lastMode,state.lastCategory); if(action==='toggle-theme'){progress.theme=progress.theme==='dark'?'light':'dark';saveProgress();applyTheme();} });
  applyTheme(); renderHome();
})();
