(()=>{
 'use strict';
 const labels=[...document.querySelectorAll('[data-overview-mode-label]')];
 const decorations=[...document.querySelectorAll('[data-study-decorations]')];
 const artwork=window.overviewArtwork||[];
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');
 const compactBrief=matchMedia('(max-width:600px)');
 const field=document.getElementById('project-brief');
 const form=document.querySelector('.devello-project-form');
 const topics=document.querySelector('.devello-brief-topics');
 const modes=[
  {
    "label": "어떤 서비스를 만들고 싶으세요?",
    "placeholder": "예약 앱을 만들고 싶은데, 아직 아이디어만 있어요.\n기획부터 디자인, 개발까지 함께 맡길 수 있을까요?\n개발 전에 프로토타입으로 먼저 확인해 보고 싶어요.\n예산과 일정은 상담하면서 정하고 싶습니다.",
    "helper": "기획·프로토타입부터 앱·웹 개발까지.",
    "cta": "프로젝트 상담하기",
    "topics": [
      [
        "외주 프로젝트",
        "동물병원 예약 앱을 만들려고 합니다.\n고객 예약과 병원 일정 관리, 결제 기능이 필요해요.\n개발팀이 없어서 기획부터 출시까지 맡기고 싶습니다.\n가능한 개발 범위와 예상 일정부터 상담받을 수 있을까요?",
        "앱 개발을 맡기고 싶어요."
      ],
      [
        "기획 · 프로토타입",
        "해보고 싶은 사업은 있는데, 화면과 기능을 어떻게 정할지 막막해요.\n고객이 쓰는 화면과 관리자가 쓰는 화면을 함께 정리하고 싶습니다.\n바로 개발하기보다는 프로토타입으로 먼저 검증해 보고 싶어요.\n아이디어를 설명드리면 기획부터 같이 진행할 수 있을까요?",
        "아이디어를 구체화하고 싶어요."
      ],
      [
        "웹 · 앱 개발",
        "지금은 고객 신청을 전화와 카카오톡으로 받고 있어요.\n신청과 결제를 한 번에 할 수 있는 웹과 앱이 필요합니다.\n직원들이 신청 내역을 확인하는 관리자 화면도 만들고 싶어요.\n어떤 방식으로 개발하면 좋을지 제안받을 수 있을까요?",
        "웹과 앱을 만들고 싶어요."
      ],
      [
        "정부지원사업 MVP",
        "정부지원사업에 선정돼서 서비스 MVP를 준비하고 있어요.\n협약 기간 안에 핵심 기능을 출시하고 사용자 반응을 보고 싶습니다.\n아직 요구사항이 정리되지 않아 기능 우선순위부터 함께 잡고 싶어요.\n사업 일정에 맞춰 기획과 개발을 진행할 수 있을까요?",
        "지원사업 MVP를 만들고 싶어요."
      ],
      [
        "쇼핑몰 · 플랫폼",
        "지금은 인스타그램으로 주문을 받고 엑셀로 재고를 관리해요.\n주문이 늘어서 결제와 배송 관리까지 연결되는 쇼핑몰이 필요합니다.\n나중에는 여러 판매자가 입점하는 구조로 확장하고 싶어요.\n처음부터 어디까지 준비하면 좋을지 상담받고 싶습니다.",
        "쇼핑몰을 만들고 싶어요."
      ]
    ],
    "mobilePlaceholder": "앱 개발을 맡기고 싶어요."
  },
  {
    "label": "어떤 서비스를 운영하고 계신가요?",
    "placeholder": "다른 업체에서 만든 예약 서비스를 운영하고 있어요.\n오류가 날 때마다 대응이 늦어 고객 불편이 커지고 있습니다.\n소스코드는 있는데, 유지보수와 보안 점검도 맡길 수 있을까요?\n현재 상태부터 살펴보고 관리 방법을 제안해 주세요.",
    "helper": "운영·유지보수부터 보안 점검까지.",
    "cta": "운영 상담하기",
    "topics": [
      [
        "운영 · 유지보수",
        "작년에 출시한 앱을 운영하고 있는데, 기존 개발 계약이 끝났어요.\n작은 수정이나 오류가 생길 때마다 맡길 곳을 찾기가 어렵습니다.\n소스코드와 서버 계정은 전달받아 둔 상태예요.\n인수 점검부터 정기 유지보수까지 함께 맡아주실 수 있을까요?",
        "정기 유지보수를 맡기고 싶어요."
      ],
      [
        "오류 · 장애 대응",
        "최근 결제 후 주문 내역이 안 뜨는 일이 반복되고 있어요.\n접속자가 몰리면 앱이 멈춰 고객 문의도 계속 들어옵니다.\n그때그때 수정해도 다시 발생해서 원인부터 확인하고 싶어요.\n장애 대응과 재발 방지까지 함께 맡아주실 수 있을까요?",
        "반복되는 오류를 잡고 싶어요."
      ],
      [
        "보안 점검",
        "회원의 개인정보와 결제 정보를 다루는 서비스를 운영하고 있어요.\n출시 후 제대로 된 보안 점검을 받아본 적이 없어 걱정됩니다.\n관리자 권한이나 서버 설정에 문제가 없는지도 확인하고 싶어요.\n취약점 점검부터 필요한 수정까지 함께 진행할 수 있을까요?",
        "서비스 보안이 걱정돼요."
      ],
      [
        "서버 · 인프라 관리",
        "이벤트를 열 때마다 접속자가 몰려 사이트가 느려집니다.\n서버 비용도 늘고 있는데, 현재 구성이 적절한지 잘 모르겠어요.\n백업과 모니터링도 제대로 갖춰져 있는지 확인하고 싶습니다.\n인프라 점검과 안정적인 운영 관리를 맡길 수 있을까요?",
        "서버 관리를 맡기고 싶어요."
      ],
      [
        "성능 개선",
        "앱에서 상품 목록을 여는 데 시간이 오래 걸려요.\n검색이나 결제 화면에서도 대기가 길다는 피드백이 들어옵니다.\n서버 문제인지 앱 문제인지 몰라 어디부터 고쳐야 할지 막막해요.\n속도가 느려지는 원인을 찾고 개선해 주실 수 있을까요?",
        "앱 속도를 개선하고 싶어요."
      ]
    ],
    "mobilePlaceholder": "서비스 오류를 해결하고 싶어요."
  },
  {
    "label": "어떤 변화를 만들고 싶으세요?",
    "placeholder": "매일 엑셀로 주문을 정리하고 같은 내용을 다시 입력하고 있어요.\n이런 반복 업무를 AI로 자동화할 수 있을까요?\n운영 중인 서비스에도 새 기능을 꾸준히 추가하고 싶습니다.\n개발팀 구독으로 함께할 수 있는지도 궁금해요.",
    "helper": "AX 전환·업무 자동화부터 개발팀 구독·고도화까지.",
    "cta": "확장 상담하기",
    "topics": [
      [
        "AX 전환",
        "회사에서도 AI를 활용하고 싶은데 어디부터 시작할지 모르겠어요.\n영업 자료 정리와 고객 응대에 직원들이 시간을 많이 쓰고 있습니다.\n우리 업무를 살펴보고 효과가 있을 만한 과제를 찾아주실 수 있나요?\n작은 범위로 먼저 검증하고 괜찮으면 확대해 보고 싶어요.",
        "우리 팀에 AI를 도입하고 싶어요."
      ],
      [
        "업무 자동화",
        "쇼핑몰 주문을 내려받아 엑셀에 옮기고 거래처에 메일을 보내요.\n매일 같은 작업을 반복하다 보니 시간이 많이 들고 누락도 생깁니다.\n지금 쓰는 도구들을 연결해 이 과정을 자동화하고 싶어요.\n어디까지 자동화할 수 있는지 실제 업무를 보며 상담받고 싶습니다.",
        "반복 업무를 자동화하고 싶어요."
      ],
      [
        "AI 기능 도입",
        "고객 문의가 늘어서 비슷한 질문에 답하는 시간이 많아졌어요.\n매뉴얼과 내부 문서를 찾아 답해 주는 AI 기능을 붙이고 싶습니다.\n이미 운영 중인 웹 서비스와 관리자 화면이 있는데 연동할 수 있나요?\n답변 정확도를 확인하는 작은 테스트부터 시작하고 싶어요.",
        "서비스에 AI를 붙이고 싶어요."
      ],
      [
        "개발팀 구독",
        "서비스에 추가할 기능은 계속 있는데 개발자를 채용하기는 부담돼요.\n한 번 맡기고 끝내기보다 서비스를 이해하는 팀과 오래 일하고 싶습니다.\n매달 우선순위를 정해 기능 개발과 개선을 진행할 수 있을까요?\n개발팀 구독의 진행 방식과 함께할 수 있는 범위가 궁금합니다.",
        "개발팀을 구독하고 싶어요."
      ],
      [
        "추가 개발 · 고도화",
        "현재 운영 중인 예약 서비스에 정기 결제와 알림 기능을 넣고 싶어요.\n사용자들이 불편해하는 화면도 함께 개선하려고 합니다.\n기존 데이터와 운영에 미치는 영향을 줄이며 단계적으로 바꾸고 싶어요.\n소스코드를 먼저 검토하고 개발 순서와 일정을 제안해 주실 수 있나요?",
        "기존 앱에 기능을 더하고 싶어요."
      ]
    ],
    "mobilePlaceholder": "업무를 AI로 자동화하고 싶어요."
  }
];
 const palettes=[['#10a0e8','#fcd448'],['#04b84c','#10a0e8'],['#ceb0fb','#10a0e8']];
 // 확장 모드 예시 문구: 번갈아 가며 타이핑
 modes[2].placeholders=["회사에서도 AI를 활용하고 싶은데 어디부터 시작할지 모르겠어요.\n영업 자료 정리와 고객 응대에 직원들이 시간을 많이 쓰고 있습니다.\n우리 업무를 살펴보고 효과가 있을 만한 과제를 찾아주실 수 있나요?\n작은 범위로 먼저 검증하고 괜찮으면 확대해 보고 싶어요.",modes[2].placeholder];
 const phCount=[0,0,0];
 let typeTimer=0,typingEnds=0;
 function nextPlaceholder(n){const c=modes[n];if(compactBrief.matches)return c.mobilePlaceholder;const list=c.placeholders||[c.placeholder];const text=list[phCount[n]%list.length];phCount[n]++;return text;}
 // 예시 문구: 실제 입력값으로 타이핑 → 지우면 같은 문구가 회색 placeholder로 남음
 let autoValue='';
 function typePlaceholder(text){
  clearTimeout(typeTimer);clearTimeout(valueTimer);
  field.placeholder=text;
  if(field.value&&field.value!==autoValue){typingEnds=0;return;}
  autoValue=text;
  if(reduced.matches){field.value=text;typingEnds=0;fitField();return;}
  const chars=[...text];let i=0;
  const delayFor=ch=>ch==='\n'?140:ch===' '?12:20;
  typingEnds=performance.now()+120+chars.reduce((a,ch)=>a+delayFor(ch)+4,0);
  field.value='';fitField();
  const step=()=>{i++;field.value=chars.slice(0,i).join('');autoValue=text;fitField();if(i<chars.length)typeTimer=setTimeout(step,delayFor(chars[i-1])+Math.random()*8);};
  typeTimer=setTimeout(step,120);
 }
 function fitField(){try{if(typeof fitBriefField==='function')fitBriefField();}catch(e){}}
 let mode=-1,autoTimer=0,heroVisible=true,briefFocused=false,generatedExample=null;
 function scheduleAuto(){clearTimeout(autoTimer);if(!document.hidden&&heroVisible&&!briefFocused&&!reduced.matches&&!form.dataset.pinned)autoTimer=setTimeout(()=>selectMode((mode+1)%3),Math.max(3000,typingEnds-performance.now()+2200));}
 // 주제 버튼 클릭 시 입력창에 좌라라락 타이핑
 let valueTimer=0;
 function typeValue(text,done){
  clearTimeout(valueTimer);
  if(reduced.matches){field.value=text;field.setSelectionRange(text.length,text.length);if(done)done();return;}
  const chars=[...text];let i=0;field.value='';
  const step=()=>{i=Math.min(chars.length,i+2);field.value=chars.slice(0,i).join('');field.setSelectionRange(field.value.length,field.value.length);field.scrollTop=field.scrollHeight;if(i<chars.length)valueTimer=setTimeout(step,chars[i-1]==='\n'?90:16);else if(done)done();};
  step();
 }
 field.addEventListener('input',e=>{if(e.isTrusted){clearTimeout(valueTimer);clearTimeout(typeTimer);autoValue='';form.dataset.pinned='1';}});
 const isExample=()=>field.value&&(field.value===autoValue||(generatedExample&&field.value===generatedExample.value)||field.value===field.placeholder);
 field.addEventListener('pointerdown',()=>{if(isExample()&&document.activeElement!==field){clearTimeout(typeTimer);field.value=field.placeholder;requestAnimationFrame(()=>field.select());}});
 field.addEventListener('focus',()=>{if(isExample()){clearTimeout(typeTimer);field.value=field.placeholder;requestAnimationFrame(()=>field.select());}});
 let firstArtwork=true;
 function changeArtwork(n){
  if(firstArtwork){
   firstArtwork=false;
   // 첫 로드: 이미 그려진 장식을 갈아끼우지 않고, 아이콘을 하나씩 뿅뿅 등장시킴
   const reuse=decorations.every(c=>c.dataset.overviewMode===(artwork[n]?.mode||'chat')&&c.querySelector('.study-artwork-scene'));
   if(reuse){decorations.forEach(c=>{const sc=c.querySelector('.study-artwork-scene');if(!reduced.matches)sc.classList.add('study-scene-enter');c.dataset.mrReady='1';});return;}
  }
  decorations.forEach(container=>{
   container.dataset.mrReady='1';
   const scenes=[...container.querySelectorAll('.study-artwork-scene')];
   const previous=scenes.pop();
   scenes.forEach(scene=>scene.remove());
   const scene=document.createElement('div');scene.className='study-artwork-scene'+(reduced.matches?'':' study-scene-enter');
   scene.innerHTML=artwork[n]?.[container.dataset.studyDecorations]||'';
   container.dataset.overviewMode=artwork[n]?.mode||'chat';
   if(previous){if(reduced.matches)previous.remove();else{previous.classList.add('study-scene-exit');setTimeout(()=>previous.remove(),360);}}
   container.append(scene);
  });
 }
 function selectMode(n){
  if(n<0||n>=modes.length)return;
  const changed=n!==mode;mode=n;
  labels.forEach((button,i)=>{
   button.setAttribute('aria-pressed',String(i===n));button.dataset.active=String(i===n);
   button.querySelectorAll('[data-overview-mode-character]').forEach((char,j)=>char.style.color=i===n?palettes[i][j%2]:'var(--text-primary)');
   const line=button.querySelector('[data-overview-mode-active-indicator]');if(line)line.style.transform=i===n?'scaleX(1)':'scaleX(0)';
  });
  if(changed){changeArtwork(n);renderBrief(n);}
  scheduleAuto();
 }
 function renderBrief(n){
  const config=modes[n];
  form.dataset.mode=String(n);form.querySelector('label').textContent=config.label;
  typePlaceholder(nextPlaceholder(n));
  form.querySelector('.devello-form-bottom p').textContent=config.helper;
  form.querySelector('.devello-brief-submit').firstChild.textContent=config.cta+' ';
  topics.dataset.mode=String(n);topics.replaceChildren(...config.topics.map((topic,i)=>{
   const button=document.createElement('button');button.type='button';button.dataset.briefTopic=String(i);button.textContent=topic[0];button.setAttribute('aria-pressed',String(topic.slice(1).includes(field.value)));
   button.addEventListener('click',()=>{topics.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));field.focus();clearTimeout(typeTimer);typeValue(briefTopicDraft(topic),()=>{generatedExample={mode:n,index:i,value:field.value};field.placeholder=field.value;form.dataset.pinned='1';updateTopicSelection();});});return button;
  }));
  fitBriefField();
 }
 function fitBriefField(){
  const main=document.querySelector('.devello-onepage');
  const content=document.querySelector('.devello-onepage-content');
  const brief=document.querySelector('.devello-project-brief');
  const intro=document.querySelector('.devello-intro-copy');
  const mainStyle=getComputedStyle(main);
  const sideBySide=getComputedStyle(content).display==='grid';
  const viewport=window.visualViewport?.height||innerHeight;
  const chrome=document.getElementById('contentful-header').offsetHeight;
  const padding=parseFloat(mainStyle.paddingTop)+parseFloat(mainStyle.paddingBottom);
  const overhead=form.offsetHeight-field.offsetHeight+brief.offsetHeight-form.offsetHeight;
  const introSpace=sideBySide?0:intro.offsetHeight+parseFloat(getComputedStyle(brief).marginTop);
  const available=viewport-chrome-padding-overhead-introSpace-2;
  const desired=Math.min(innerWidth<=600?220:280,Math.max(144,viewport*.27));
  const next=Math.max(48,Math.floor(Math.min(desired,available)));
  if(field.style.height!==next+'px')field.style.height=next+'px';
 }
 function briefTopicDraft(topic){return compactBrief.matches?topic[2]:topic[1];}
 function updateTopicSelection(){topics.querySelectorAll('button').forEach((button,i)=>button.setAttribute('aria-pressed',String(modes[mode].topics[i].slice(1).includes(field.value))));}
 labels.forEach((button,i)=>{
  button.addEventListener('click',()=>{delete form.dataset.pinned;selectMode(i);});
  button.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();const next=(i+(event.key==='ArrowRight'?1:2))%3;selectMode(next);labels[next].focus();}});
 });
 field.addEventListener('focus',()=>{briefFocused=true;scheduleAuto();});
 field.addEventListener('blur',()=>{briefFocused=false;scheduleAuto();});
 field.addEventListener('input',()=>{generatedExample=null;updateTopicSelection();});
 form.addEventListener('submit',event=>event.preventDefault());
 document.addEventListener('visibilitychange',scheduleAuto);
 addEventListener('pagehide',()=>clearTimeout(autoTimer));
 reduced.addEventListener('change',scheduleAuto);
 compactBrief.addEventListener('change',()=>{
  if(generatedExample&&field.value===generatedExample.value){field.value=briefTopicDraft(modes[generatedExample.mode].topics[generatedExample.index]);generatedExample.value=field.value;}
  renderBrief(mode);
 });
 addEventListener('resize',fitBriefField);
 window.visualViewport?.addEventListener('resize',fitBriefField);
 document.fonts?.ready.then(fitBriefField);
 new ResizeObserver(fitBriefField).observe(document.querySelector('.devello-onepage-content'));
 const intro=document.querySelector('.devello-onepage');
 if(intro)new IntersectionObserver(entries=>{heroVisible=entries[0].isIntersecting;scheduleAuto();},{threshold:.1}).observe(intro);
 [...new Set(artwork.flatMap(scene=>[...scene.desktop.matchAll(/src="(assets\/decor\/[^\"]+)"/g)].map(match=>match[1])))].forEach(src=>{const img=new Image();img.src=src;});
 selectMode(0);
})();
