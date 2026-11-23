(function(){
  var D = [["업력·규모", "문제가 생겨도 끝까지 책임질 수 있는 회사인가요?", "“실제로 서비스를 출시하고 운영해본 경험은 얼마나 있나요?”", "업력이 짧거나 인원이 적은 개발사는 피하세요. 담당자 한 명이 빠졌다고 개발이 멈추거나, 문제가 생겼는데 대응할 사람이 없어서는 안 됩니다. 실제 서비스를 출시하고 운영해본 경험은 물론, 일정과 품질을 지키고 출시 후 유지보수까지 책임질 인력과 체계가 있는 곳에 맡기세요."], ["포트폴리오 퀄리티", "포트폴리오에 있는 서비스는 실제로 운영되고 있나요?", "“실제 고객이 의뢰한 프로젝트인가요, 자체적으로 만든 서비스인가요?”", "포트폴리오가 거의 없거나, AI 목업뿐이거나, 디자인 디테일이 허술한 개발사는 바로 거르세요. 실제 고객의 의뢰로 만들어져 지금도 운영 중인 서비스가 포트폴리오에 많이 쌓여 있어야 합니다."], ["상담·견적", "견적에 대한 합리적인 근거가 있나요?", "“이 금액에 어디까지 포함되고, 추가 비용은 언제 발생하나요?”", "제대로 물어보지도 않고 “다 됩니다”라고 하거나, 이유 없이 싼 가격만 앞세우는 개발사는 피하세요. 어떤 작업에 얼마가 드는지 설명할 수 있어야 합니다. 싸게 맡겼다가 다시 개발하면, 비용과 시간만 더 듭니다."], ["서비스 이해도", "서비스를 왜 만드는지부터 물어보나요?", "“지금 기획에서 보완하거나 바꿔야 할 부분은 무엇인가요?”", "서비스와 비즈니스를 이해하려 하지 않고, 시킨 기능만 수동적으로 만드는 개발사는 피하세요. 개발보다 중요한 건 의도를 이해하는 것입니다. 목적에 맞는 방향을 함께 고민하고 제안할 수 있어야 합니다."], ["프로세스·유지보수", "진행 프로세스를 문서로 보여줄 수 있나요?", "“출시 후 문제가 생기면 누가, 어떤 기준으로 대응하나요?”", "체계적으로 진행한다는 말만 하고, 미팅에서 요청해도 문서로 보여주지 못하는 개발사는 피하세요. 기획부터 검수, 출시 후 유지보수까지 진행 방식과 책임 범위가 분명해야 합니다."]];
  var root = document.getElementById("five-questions-standard");
  var tabs = Array.prototype.slice.call(root.querySelectorAll('.q'));
  var panel = document.getElementById('fq-panel');
  var cur = 0;
  function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');}
  function show(i, focus){
    cur = i;
    tabs.forEach(function(t, k){ t.setAttribute('aria-selected', k === i ? 'true' : 'false'); t.tabIndex = k === i ? 0 : -1; });
    if (focus) tabs[i].focus();
    var r = D[i];
    panel.setAttribute('aria-labelledby', 'fq-q' + i);
    panel.dataset.question = String(i);
    panel.classList.remove('swap'); void panel.offsetWidth;
    panel.innerHTML = '<div><p class="detail__meta">0' + (i + 1) + ' · ' + esc(r[0]) + '</p><h3 class="detail__q">' + esc(r[1]) + '</h3><p class="detail__d">' + esc(r[3]) + '</p></div>' +
      '<div class="ask"><p class="ask__t">이렇게 물어보세요</p><p class="ask__q">' + esc(r[2]) + '</p></div>';
    panel.classList.add('swap');
  }
  tabs.forEach(function(t, k){
    t.addEventListener('click', function(){ show(k); });
    t.addEventListener('keydown', function(e){
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); show((cur + (e.key === 'ArrowRight' ? 1 : D.length - 1)) % D.length, true); }
    });
  });
  show(0);
  var els = Array.prototype.slice.call(root.querySelectorAll('.reveal'));
  tabs.forEach(function(t, k){ t.style.transitionDelay = (k * 0.08) + 's'; });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add('on'); if (e.target.querySelector('.kw') || e.target.classList.contains('sub') || e.target.classList.contains('close')) e.target.classList.add('in'); if (e.target.classList.contains('q')) setTimeout(function(){ e.target.style.transitionDelay = '0s'; }, 900); io.unobserve(e.target); } }); }, { threshold: 0.2 });
    els.forEach(function(el){ io.observe(el); });
  } else { els.forEach(function(el){ el.classList.add('on', 'in'); }); }
})();
