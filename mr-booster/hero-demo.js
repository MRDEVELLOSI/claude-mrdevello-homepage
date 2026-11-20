(function () {
  var root = document.getElementById('booster_demo');
  if (!root) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var CHECK = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>';

  var scenarios = [
    {
      tab: '견적 문의 정리',
      srcLabel: '들어온 자료 · 홈페이지 문의 메일',
      src:
        '<div class="mail-head"><span class="av">한</span><span><b style="color:#141619">김민지 팀장</b> · 한빛상사</span><span style="margin-left:auto">오전 9:12</span></div>' +
        '<div class="mail-subj">[문의] 사내 예약 시스템 개발 견적 요청드립니다</div>' +
        '<div class="mail-body">회의실·차량 예약을 한곳에서 관리하는 사내 시스템을 만들고 싶습니다. 직원은 120명 정도이고 3월 중 오픈을 희망합니다. 연락은 010-****-5678로 부탁드립니다.</div>',
      fields: [
        ['회사', '한빛상사'],
        ['담당자', '김민지 팀장'],
        ['요청 내용', '사내 예약 시스템 (회의실·차량)'],
        ['규모', '직원 약 120명'],
        ['희망 일정', '3월 오픈'],
        ['예산', '언급 없음', 'flag', '미팅에서 확인']
      ],
      count: '6개 항목',
      checkTitle: '예산 확인 필요',
      checkText: '첫 미팅 질문에 추가하고 등록합니다.',
      approve: 'CRM에 등록',
      doneTitle: 'CRM 등록 · 담당 PM 배정 완료',
      doneText: '한빛상사 · 사내 예약 시스템 · 3월 오픈 희망',
      toast: '영업 채널에 새 문의 알림 전달 완료'
    },
    {
      tab: '영수증 → 지출결의',
      srcLabel: '들어온 자료 · 영수증 사진',
      src:
        '<div class="rcpt-wrap"><div class="rcpt">한결한식 마포점<br>2026.11.18 12:41<hr>정식 x4 &nbsp; 52,000<br>음료 x4 &nbsp;&nbsp; 16,000<hr><span class="tot">합계 &nbsp;&nbsp;&nbsp; 68,000</span><br>신용 승인 완료</div>' +
        '<div class="rcpt-note"><b style="color:#141619">메모</b><br>“거래처 미팅 점심”<br><span style="color:#6d7073">사진 1장 · 업로드 12:55</span></div></div>',
      fields: [
        ['사용일', '2026.11.18'],
        ['가맹점', '한결한식 마포점'],
        ['금액', '68,000원'],
        ['계정 과목', '접대비 <span class="ai-badge">AI 추천</span>'],
        ['참석자', '4명 · 명단 없음', 'flag', '입력 필요']
      ],
      count: '5개 항목',
      checkTitle: '참석자 명단 확인 필요',
      checkText: '사내 규정에 따라 참석자를 입력합니다.',
      approve: '명단 넣고 결재 요청',
      doneTitle: '지출결의서 작성 · 결재 요청 완료',
      doneText: '접대비 68,000원 · 팀장 결재 대기',
      toast: '팀장에게 결재 요청 알림 전달 완료'
    },
    {
      tab: '발주서 통일',
      srcLabel: '들어온 자료 · 거래처 발주 3건',
      src:
        '<div class="po-list">' +
        '<div class="po"><span class="ic" style="background:#21763c">XLS</span>가람유통_발주_1118.xlsx<span class="src">메일 첨부</span></div>' +
        '<div class="po"><span class="ic" style="background:#9d5d03">TXT</span>동해상사 · “박스테이프 30롤 내일까지요”<span class="src">메신저</span></div>' +
        '<div class="po"><span class="ic" style="background:#c22826">PDF</span>새봄상회 발주서 (스캔)<span class="src">팩스</span></div>' +
        '</div>',
      table: {
        head: ['거래처', '품목', '수량', '납기'],
        rows: [
          ['가람유통', 'A4 복사용지', '40박스', '11/21'],
          ['동해상사', '박스테이프 <span class="flag-badge">코드 확인</span>', '30롤', '11/19', 'flag'],
          ['새봄상회', '포장용 완충재', '12롤', '11/22']
        ]
      },
      count: '주문 3건',
      checkTitle: '‘박스테이프’ 품목 코드 2개',
      checkText: '최근 주문 기준으로 TP-48(48mm)을 선택합니다.',
      approve: 'ERP에 등록',
      doneTitle: '표준 주문서로 ERP 등록 완료',
      doneText: '주문 3건 · 출고팀 전달',
      toast: '출고팀에 오늘 출고 목록 전달 완료'
    }
  ];

  var el = function (id) { return root.querySelector('#' + id); };
  var tabsEl = el('axTabs'), srcEl = el('axSrc'), srcLabel = el('axSrcLabel'), aiEl = el('axAi'), aiText = el('axAiText'),
      outEl = el('axOut'), actEl = el('axAct'), toastEl = el('axToast'), toastText = el('axToastText'),
      stepsEl = el('axSteps').children, capEl = el('axCap');
  var cur = 0, step = 0, timers = [];

  function later(fn, ms) { timers.push(setTimeout(fn, reduce ? 0 : ms)); }
  function clearTimers() { timers.forEach(clearTimeout); timers = []; toastEl.classList.remove('show'); }

  function setStep(n) {
    step = n; root.dataset.step = n; root.dataset.scenario = cur;
    for (var i = 0; i < stepsEl.length; i++) { stepsEl[i].classList.toggle('on', i === n); if(i === n) stepsEl[i].setAttribute('aria-current','step'); else stepsEl[i].removeAttribute('aria-current'); }
    capEl.textContent = [
      '‘AI로 정리하기’ 버튼을 클릭하면 시연을 시작합니다.',
      'AI가 자료를 읽고 필요한 항목을 정리합니다.',
      '사람이 확인할 부분만 골라서 보여줍니다.',
      '확인된 내용만 시스템에 등록하고 담당자에게 알립니다.'
    ][n];
  }

  function renderTabs() {
    tabsEl.innerHTML = scenarios.map(function (s, i) {
      return '<button type="button" role="tab" id="boosterDemoTab' + i + '" aria-controls="boosterDemoPanel" tabindex="' + (i === cur ? '0' : '-1') + '" class="bst-tab" aria-selected="' + (i === cur) + '" data-i="' + i + '">' + s.tab + '</button>';
    }).join('');
    el('boosterDemoPanel').setAttribute('aria-labelledby','boosterDemoTab' + cur);
  }

  function skeleton(idle) {
    return '<div class="bst-skel' + (idle ? ' idle' : '') + '"><span></span><span style="width:86%"></span><span style="width:92%"></span><span style="width:70%"></span></div>';
  }

  function renderOutput(s) {
    if (s.table) {
      var h = '<table class="bst-table"><thead><tr>' + s.table.head.map(function (t) { return '<th>' + t + '</th>'; }).join('') + '</tr></thead><tbody>';
      h += s.table.rows.map(function (r) {
        return '<tr class="bst-row' + (r[4] ? ' flag' : '') + '">' + r.slice(0, 4).map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>';
      }).join('');
      return h + '</tbody></table>';
    }
    return '<dl class="bst-fields" style="margin:0">' + s.fields.map(function (f) {
      return '<div class="bst-field bst-row' + (f[2] ? ' flag' : '') + '"><dt>' + f[0] + '</dt><dd>' + f[1] + (f[3] ? ' <span class="flag-badge">' + f[3] + '</span>' : '') + '</dd></div>';
    }).join('') + '</dl>';
  }

  function act(html) {
    var focused = actEl.contains(document.activeElement);
    actEl.innerHTML = html;
    if (focused) {
      if (actEl.querySelector('button:disabled')) {actEl.tabIndex = -1; actEl.focus({preventScroll:true});}
      else actEl.querySelector('button').focus({preventScroll:true});
    }
  }

  function reset() {
    clearTimers();
    var s = scenarios[cur];
    renderTabs();
    srcLabel.textContent = s.srcLabel;
    srcEl.innerHTML = s.src;
    aiEl.className = 'bst-ai';
    aiText.textContent = '자료 수신 완료 · AI 정리 대기';
    outEl.innerHTML = skeleton(true);
    act('<div class="bst-act-text"><b>반복해서 옮겨 적던 일</b>AI가 먼저 읽고 정리합니다.</div>' +
        '<button type="button" class="bst-btn" data-annotation-target="booster-demo-action" data-act="run">AI로 정리하기</button>' +
        '<span class="bst-hint" aria-hidden="true">클릭으로 시연 시작</span>');
    setStep(0);
  }

  function run() {
    var s = scenarios[cur];
    setStep(1);
    act('<div class="bst-act-text"><b>AI가 정리하는 중</b>필요한 항목을 확인합니다.</div><button type="button" class="bst-btn" disabled>정리 중…</button>');
    aiEl.className = 'bst-ai is-busy';
    aiText.textContent = 'AI가 자료를 읽고 정리합니다.';
    outEl.innerHTML = skeleton(false);
    later(function () {
      outEl.innerHTML = renderOutput(s);
      var rows = outEl.querySelectorAll('.bst-row');
      rows.forEach(function (r, i) { later(function () { r.classList.add('in'); }, 140 + i * 230); });
      later(function () {
        aiEl.className = 'bst-ai is-done';
        aiText.textContent = s.count + ' 정리 완료 · 담당자 확인 1곳';
        setStep(2);
        act('<div class="bst-act-text"><b>' + s.checkTitle + '</b>' + s.checkText + '</div>' +
            '<button type="button" class="bst-btn" data-annotation-target="booster-demo-action" data-act="approve">' + s.approve + '</button>' +
            '<span class="bst-hint" aria-hidden="true">담당자가 확인하고 승인</span>');
      }, 260 + rows.length * 230);
    }, 1300);
  }

  function approve() {
    var s = scenarios[cur];
    setStep(3);
    outEl.querySelectorAll('.flag').forEach(function (f) { f.classList.remove('flag'); });
    outEl.querySelectorAll('.flag-badge').forEach(function (b) { b.className = 'ai-badge'; b.textContent = '확인됨'; });
    act('<div class="bst-done"><span class="ok">' + CHECK + '</span><div class="bst-act-text"><b>' + s.doneTitle + '</b>' + s.doneText + '</div></div>' +
        '<button type="button" class="bst-btn ghost" data-annotation-target="booster-demo-action" data-act="next">다른 예시 보기</button>');
    aiText.textContent = '담당자 확인 후 시스템 등록 완료';
    toastText.textContent = s.toast;
    later(function () { toastEl.classList.add('show'); }, 150);
    later(function () { toastEl.classList.remove('show'); }, 3400);
  }

  tabsEl.addEventListener('click', function (e) {
    var b = e.target.closest('[data-i]');
    if (!b) return;
    cur = +b.getAttribute('data-i');
    reset(); tabsEl.querySelector('[data-i="' + cur + '"]').focus({preventScroll:true});
  });
  tabsEl.addEventListener('keydown', function(e) {
    if (!['ArrowLeft','ArrowRight','Home','End'].includes(e.key)) return;
    e.preventDefault();
    cur = e.key === 'Home' ? 0 : e.key === 'End' ? scenarios.length-1 : (cur + (e.key === 'ArrowRight' ? 1 : -1) + scenarios.length) % scenarios.length;
    reset(); tabsEl.querySelector('[data-i="' + cur + '"]').focus({preventScroll:true});
  });
  actEl.addEventListener('click', function (e) {
    var b = e.target.closest('[data-act]');
    if (!b || b.disabled) return;
    var a = b.getAttribute('data-act');
    if (a === 'run' && step === 0) run();
    else if (a === 'approve' && step === 2) approve();
    else if (a === 'next') { cur = (cur + 1) % scenarios.length; reset(); }
  });

  document.addEventListener('visibilitychange', function() {root.dataset.paused = document.hidden;});
  window.addEventListener('pagehide', clearTimers);
  window.addEventListener('pageshow', function(e) {if(e.persisted) reset();});
  reset();
})();
