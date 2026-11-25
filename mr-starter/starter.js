
var sticky=document.getElementById('sticky');
function onS(){var apEl=document.getElementById('apply');if(!sticky||!apEl)return;var y=window.scrollY||document.documentElement.scrollTop;
 var ap=apEl.getBoundingClientRect().top;
 sticky.classList.toggle('on',y>560&&ap>window.innerHeight*0.6);}
window.addEventListener('scroll',onS,{passive:true});onS();
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -7% 0px',threshold:.05});
document.querySelectorAll('.rv').forEach(function(el,i){el.style.transitionDelay=(Math.min(i%3,2)*70)+'ms';io.observe(el)});
document.querySelectorAll('.faq details').forEach(function(d){d.addEventListener('toggle',function(){
 if(d.open)document.querySelectorAll('.faq details').forEach(function(o){if(o!==d)o.open=false})})});
function fgo(n){for(var i=1;i<=3;i++){
  var f=document.getElementById('f'+i),t=document.getElementById('tab'+i);
  f.classList.toggle('on',i===n);t.classList.toggle('on',i===n);t.classList.toggle('dn',i<n);}
 var y=document.getElementById('apply').getBoundingClientRect().top+window.scrollY-80;
 window.scrollTo({top:y,behavior:'smooth'});}
function cnt(el){var n=el.value.length,c=document.getElementById('c1');
 c.textContent='권장 150자 이상 · '+n+'자';c.classList.toggle('ok',n>=150);}
var tm;function toast(m){var t=document.getElementById('toast');t.textContent=m;t.classList.add('on');
 clearTimeout(tm);tm=setTimeout(function(){t.classList.remove('on')},3200);}
var DOCS = {"terms": {"t": "이용약관", "h": "\n<p class=\"mnote\">아래는 MR.STARTER 서비스 이용약관 초안입니다. <b><span class=\"need\">입력 필요<\/span><\/b> 표시가 붙은 조항은 회사 확인 후 값을 채워야 효력이 생깁니다.<\/p>\n<h4>제1조 (목적)<\/h4>\n<p>이 약관은 미스터디벨로 주식회사(이하 \"회사\")가 제공하는 기획 프로토타입 제작 서비스 <b>MR.STARTER<\/b>(이하 \"서비스\")의 이용 조건과 절차, 회사와 이용자의 권리·의무를 정하는 것을 목적으로 합니다.<\/p>\n<h4>제2조 (서비스의 내용)<\/h4>\n<p>서비스는 이용자의 아이디어를 개발 이전 단계에서 <b>눌러볼 수 있는 화면(프로토타입)<\/b>으로 제작해 제공합니다. 진행은 다음 순서를 따릅니다.<\/p>\n<ol>\n<li>문의 접수 및 샘플 프로토타입 링크 발송 (무료)<\/li>\n<li>약 1시간의 미팅. 미팅 전 상호 비밀유지 확인서를 교환합니다. (무료)<\/li>\n<li>미팅 후 5영업일 이내, 결과물의 약 50%에 해당하는 핵심 흐름 화면을 선공개합니다. (무료)<\/li>\n<li>이용자가 진행 여부를 결정합니다. 진행하지 않는 경우 이용자에게 어떠한 비용도 청구하지 않습니다.<\/li>\n<li>진행이 확정되면 목적에 맞는 구성(검증용 · 설득용 · 시장 테스트용)을 정해 나머지를 제작합니다. 통상 1~3주가 소요됩니다.<\/li>\n<li>프로토타입 링크와 산출물 문서를 전달합니다.<\/li>\n<\/ol>\n<h4>제3조 (프로토타입의 성격과 한계)<\/h4>\n<p>서비스로 제작되는 결과물은 개발 이전 단계의 프로토타입입니다. 화면 전환, 버튼, 입력, 더미 데이터까지 동작하지만 <b>실제 서버, 회원 로그인, 결제는 연결되지 않습니다.<\/b> 앱 마켓에 등록할 수 있는 형태가 아니며, 상용 서비스로서의 성능·보안·가용성을 보장하지 않습니다. 시장 테스트용 구성에 한해 사전예약 폼·설문 등 제한된 실제 동작을 연결할 수 있습니다.<\/p>\n<h4>제4조 (선공개 결과물의 권리)<\/h4>\n<ol>\n<li>제2조 제3호의 선공개 결과물에 대한 저작권을 포함한 일체의 권리는 <b>진행이 확정되기 전까지 회사에 있습니다.<\/b><\/li>\n<li>이용자가 진행하지 않기로 결정한 경우 선공개 결과물을 사용·복제·배포·전시할 수 없으며, 회사는 제공한 링크를 만료시키고 결과물을 폐기합니다.<\/li>\n<li>선공개 결과물은 미팅 자리에서의 시연 또는 이용자명·날짜가 표시된 만료 링크의 형태로 제공됩니다.<\/li>\n<\/ol>\n<h4>제5조 (최종 산출물의 권리)<\/h4>\n<p>진행이 확정되어 제작이 완료된 최종 산출물의 소유권과 이용 권리는 대금이 모두 지급된 때에 이용자에게 이전됩니다. 이용자는 최종 산출물을 제3의 개발사에 제공하여 후속 개발을 진행할 수 있습니다. 다만 회사가 서비스 제공을 위해 보유한 범용 도구·템플릿·라이브러리에 대한 권리는 회사에 유보됩니다.<\/p>\n<h4>제6조 (비밀유지)<\/h4>\n<p>회사와 이용자는 미팅 전 상호 비밀유지 확인서를 교환합니다. 회사는 이용자가 제공한 아이디어와 자료를 서비스 제공 목적 외로 사용하지 않으며, 이용자의 사전 서면 동의 없이 외부에 공개하거나 포트폴리오로 사용하지 않습니다.<\/p>\n<h4>제7조 (대금 및 환불)<\/h4>\n<p>서비스 대금은 아이템의 규모와 선택한 구성에 따라 개별 견적으로 정합니다. 견적은 선공개 결과물 확인 후 진행을 결정하는 시점에 제시합니다.<\/p>\n<p class=\"mfill\">지급 시기와 분할 조건, 제작 착수 후 이용자 사정으로 중단할 경우의 정산 기준, 환불 규정 — <span class=\"need\">입력 필요<\/span><\/p>\n<h4>제8조 (이용자의 협조 의무)<\/h4>\n<p>이용자는 제작에 필요한 정보를 성실히 제공하고, 제작 과정에서 요청되는 확인·피드백에 합리적인 기간 내에 응해야 합니다. 이용자의 자료 제공 지연으로 발생한 일정 지연에 대해 회사는 책임지지 않습니다. 이용자는 제3자의 지식재산권을 침해하는 자료를 제공해서는 안 됩니다.<\/p>\n<h4>제9조 (책임의 제한)<\/h4>\n<p>회사는 프로토타입을 사업 판단·투자 유치·지원사업 신청 등에 활용한 결과에 대해 보증하지 않으며, 그 결과로 발생한 손해에 대해 책임지지 않습니다. 회사의 배상 책임은 고의 또는 중대한 과실이 있는 경우를 제외하고 해당 건의 수령 대금을 한도로 합니다.<\/p>\n<h4>제10조 (약관의 변경과 준거법)<\/h4>\n<p>회사는 필요한 경우 이 약관을 변경할 수 있으며, 변경된 약관은 이 페이지에 게시한 때부터 적용됩니다. 이미 진행 중인 건에는 변경 전 약관이 적용됩니다. 이 약관은 대한민국 법률에 따르며, 분쟁은 회사 본점 소재지를 관할하는 법원을 제1심 관할 법원으로 합니다.<\/p>\n<div class=\"mfoot\">\n<p><b>미스터디벨로 주식회사<\/b> (MR.DEVELLO)<br>사업자등록번호 507-87-02801<br>서울특별시 마포구<\/p>\n<p class=\"mfill\">대표자 성명, 통신판매업 신고 여부, 문의 이메일·전화번호, 약관 시행일 — <span class=\"need\">입력 필요<\/span><\/p>\n<\/div>\n"}, "privacy": {"t": "개인정보처리방침", "h": "\n<p class=\"mnote\">아래는 이 페이지의 <b>문의 폼 두 곳<\/b>(샘플 링크 받기 · 무료 미팅 신청)에서 실제로 수집하는 항목을 기준으로 작성한 개인정보처리방침 초안입니다. <b><span class=\"need\">입력 필요<\/span><\/b> 표시가 붙은 항목은 회사 확인 후 채워야 합니다.<\/p>\n<h4>1. 수집하는 개인정보 항목과 수집 방법<\/h4>\n<p>회사는 이용자가 이 웹페이지의 폼에 직접 입력하는 방식으로만 개인정보를 수집합니다.<\/p>\n<table class=\"mtbl\">\n<thead><tr><th>수집 지점<\/th><th>필수 항목<\/th><th>선택 항목<\/th><\/tr><\/thead>\n<tbody>\n<tr><td data-l=\"수집 지점\">샘플 링크 받기<\/td><td data-l=\"필수 항목\">이름, 이메일 또는 연락처, 아이템 한 줄 설명<\/td><td data-l=\"선택 항목\">없음<\/td><\/tr>\n<tr><td data-l=\"수집 지점\">무료 미팅 신청<\/td><td data-l=\"필수 항목\">이름, 연락처, 이메일, 현재 진행 단계, 아이템 설명, 핵심 기능, 활용 목적, 희망 시기, 미팅 희망 방식<\/td><td data-l=\"선택 항목\">회사·팀명, 참고 서비스, 기획 메모·스케치 첨부파일, 지원사업명, 예산 범위, 미팅 가능 시간대, 기타 문의<\/td><\/tr>\n<\/tbody><\/table>\n<p>회사는 주민등록번호, 계좌번호, 카드번호 등 고유식별정보와 결제정보를 이 페이지에서 수집하지 않습니다.<\/p>\n<h4>2. 수집·이용 목적<\/h4>\n<ol>\n<li>샘플 프로토타입 링크의 발송<\/li>\n<li>미팅 일정 안내 및 상담 진행<\/li>\n<li>이용자의 아이템에 맞는 제작 범위 검토와 견적 안내<\/li>\n<li>계약이 성립한 경우 제작 진행에 필요한 연락<\/li>\n<\/ol>\n<p>회사는 수집한 정보를 위 목적 외의 용도로 사용하지 않으며, 이용자가 별도로 동의하지 않는 한 광고성 정보 발송이나 영업 목적의 전화에 사용하지 않습니다.<\/p>\n<h4>3. 보유 및 이용 기간<\/h4>\n<p>수집 목적이 달성되면 지체 없이 파기하는 것을 원칙으로 합니다.<\/p>\n<p class=\"mfill\">문의 후 계약으로 이어지지 않은 경우의 보관 기간, 계약이 성립한 경우의 보관 기간, 관계 법령에 따라 보존이 필요한 항목과 그 기간 — <span class=\"need\">입력 필요<\/span><\/p>\n<h4>4. 제3자 제공<\/h4>\n<p>회사는 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만 법령에 따라 수사기관 등이 적법한 절차로 요구하는 경우에는 그러하지 않습니다.<\/p>\n<h4>5. 처리의 위탁<\/h4>\n<p>회사는 폼 접수와 안내 메일 발송을 위해 외부 서비스를 이용할 수 있습니다.<\/p>\n<p class=\"mfill\">실제 사용하는 폼·메일·문서 도구의 수탁사명과 위탁 업무 내용(예: 메일 발송, 데이터 보관), 국외 이전이 있는 경우 이전 국가와 시점 — <span class=\"need\">입력 필요<\/span><\/p>\n<h4>6. 파기 절차와 방법<\/h4>\n<p>전자적 형태로 저장된 정보는 복구할 수 없는 방법으로 삭제하고, 출력물이 있는 경우 분쇄하거나 소각합니다.<\/p>\n<h4>7. 이용자의 권리와 행사 방법<\/h4>\n<p>이용자는 언제든지 자신의 개인정보에 대한 열람, 정정, 삭제, 처리정지를 요구할 수 있습니다. 개인정보 수집·이용 동의를 거부할 수 있으며, 이 경우 샘플 링크 발송과 상담 진행이 불가능합니다. 요청은 아래 개인정보 보호책임자에게 하시면 지체 없이 처리합니다.<\/p>\n<h4>8. 쿠키 등 자동 수집 장치<\/h4>\n<p class=\"mfill\">이 페이지에 접속 기록 분석 도구(예: 웹로그 분석)를 사용하는지 여부와, 사용한다면 수집 항목·거부 방법 — <span class=\"need\">입력 필요<\/span><\/p>\n<h4>9. 개인정보 보호책임자<\/h4>\n<p class=\"mfill\">보호책임자 성명·직위, 연락 가능한 이메일과 전화번호 — <span class=\"need\">입력 필요<\/span><\/p>\n<h4>10. 권익침해 구제<\/h4>\n<p>개인정보 침해로 인한 상담·신고가 필요한 경우 개인정보분쟁조정위원회(1833-6972), 개인정보침해신고센터(118), 대검찰청 사이버수사과(1301), 경찰청 사이버수사국(182)에 문의하실 수 있습니다.<\/p>\n<div class=\"mfoot\">\n<p><b>미스터디벨로 주식회사<\/b> (MR.DEVELLO)<br>사업자등록번호 507-87-02801<br>서울특별시 마포구<\/p>\n<p class=\"mfill\">이 방침의 시행일과 변경 이력 — <span class=\"need\">입력 필요<\/span><\/p>\n<\/div>\n"}};
var mOpener=null, mEl=document.getElementById('modal'), mScrim=document.getElementById('mscrim');
function trapTab(e){
  if(e.key!=='Tab')return;
  var f=mEl.querySelectorAll('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])');
  if(!f.length)return;
  var first=f[0],last=f[f.length-1];
  if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
  else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
}
function onKey(e){if(e.key==='Escape')closeDoc();else trapTab(e)}
function openDoc(k,el){
  var d=DOCS[k]; if(!d)return false;
  mOpener=el||document.activeElement;
  document.getElementById('mtitle').textContent=d.t;
  document.getElementById('mbody').innerHTML=d.h;
  document.getElementById('mbody').scrollTop=0;
  mEl.hidden=false;mScrim.hidden=false;document.body.classList.add('locked');
  requestAnimationFrame(function(){mEl.classList.add('on');mScrim.classList.add('on')});
  document.getElementById('mclose').focus();
  document.addEventListener('keydown',onKey);
  return false;
}
function closeDoc(){
  if(mEl.hidden)return;
  mEl.classList.remove('on');mScrim.classList.remove('on');
  document.removeEventListener('keydown',onKey);
  document.body.classList.remove('locked');
  setTimeout(function(){mEl.hidden=true;mScrim.hidden=true},220);
  if(mOpener&&mOpener.focus)mOpener.focus();
}
document.getElementById('mclose').addEventListener('click',closeDoc);
mScrim.addEventListener('click',closeDoc);
if(location.hash==='#terms'||location.hash==='#privacy')openDoc(location.hash.slice(1),null);

function subGate(e){e.preventDefault();toast('시안입니다 — 실제 발송은 개발 단계에서 연결됩니다');return false}
function subApply(e){e.preventDefault();toast('시안입니다 — 실제 접수는 개발 단계에서 연결됩니다');return false}
document.querySelectorAll('.starter-source a[href^="#"]').forEach(function(a){
 var h=a.getAttribute('href');if(h==='#'||h==='#terms'||h==='#privacy')return;
 a.addEventListener('click',function(ev){var el=document.querySelector(h);if(!el)return;ev.preventDefault();
  window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY-74,behavior:'smooth'})})});


// Native prototype DOM is selectable by browser annotations, without an iframe.
(function(){
 var frame=document.getElementById('appframe'),view=document.getElementById('phoneview');
 var box=frame&&frame.closest('.phonebox'),stage=frame&&frame.closest('.starter-live-demo');
 if(!frame||!view||!box||!stage)return;
 function fit(){
  var available=stage.clientWidth;if(!available)return;
  var desktop=matchMedia('(min-width:1024px)').matches;
  var cap=desktop?350:320,maxHeight=desktop?Math.min(680,Math.max(560,innerHeight-300)):800;
  var grid=stage.closest('.service-hero-grid'),caption=stage.querySelector('.stagedone');
  if(matchMedia('(min-width:1280px)').matches&&grid.clientHeight>0)maxHeight=Math.min(680,Math.max(240,grid.clientHeight-caption.offsetHeight-18));
  var width=Math.min(available,cap,maxHeight/856*402),scale=Math.max(.1,width/402);
  box.style.setProperty('--phone-scale',scale);box.style.width=width+'px';box.style.height=(856*scale)+'px';view.style.width=(390*scale)+'px';view.style.height=(844*scale)+'px';view.style.left=(6*scale)+'px';view.style.top=(6*scale)+'px';view.style.borderRadius=(62*scale)+'px';frame.style.transform='scale('+scale+')';
 }
 function sendVisibility(){var r=stage.getBoundingClientRect();var overlap=Math.max(0,Math.min(r.bottom,innerHeight)-Math.max(r.top,0));frame.style.setProperty('--cue-play',overlap/Math.min(r.height,innerHeight)>.35?'running':'paused');}
 var step=0,requests=false,chatReply=false,instruction=document.getElementById('demo-instruction'),steps=stage.querySelectorAll('.demo-steps li');
 function paint(){
  var copy=['‘모임 열기’ 버튼을 클릭하면 시연을 시작합니다.',requests?'도착한 신청의 ‘승인’ 버튼으로 참여를 확정합니다.':'모임을 생성했습니다. 잠시 후 참여 신청이 도착합니다.','채팅방을 열고 메시지를 입력해 전송합니다.',chatReply?'예시 답장을 확인한 뒤 왼쪽 위 버튼으로 홈에서 결과를 확인합니다.':'메시지를 전송했습니다. 잠시 후 예시 답장을 표시합니다.','모임 생성부터 참여 승인·채팅까지 체험했습니다. 다른 화면도 자유롭게 탐색합니다.'];
  instruction.textContent=copy[step];stage.dataset.demoStep=step;
  steps.forEach(function(item,i){item.classList.toggle('is-done',i<step);if(i===step)item.setAttribute('aria-current','step');else item.removeAttribute('aria-current');});
 }
 frame.addEventListener('starter:state',function(event){
  var d=event.detail;if(d.ready){fit();sendVisibility();}
  if(typeof d.reqs==='number')requests=d.reqs>0;
  if(d.chatReply)chatReply=true;
  if(typeof d.step==='number')step=Math.max(0,Math.min(4,d.step));paint();
 });
 addEventListener('resize',function(){fit();sendVisibility();});
 if(globalThis.ResizeObserver)new ResizeObserver(fit).observe(stage);
 if(globalThis.IntersectionObserver)new IntersectionObserver(sendVisibility,{threshold:[0,.35,.7]}).observe(stage);
 fit();sendVisibility();paint();
})();
