(function(){

 const realDocument=globalThis.document,root=realDocument.getElementById('appframe');
 if(!root||root.dataset.nativeInitialized)return;root.dataset.nativeInitialized='true';
 const document={body:root,getElementById:id=>root.querySelector('#'+CSS.escape(id)),querySelector:sel=>root.querySelector(sel),querySelectorAll:sel=>root.querySelectorAll(sel),createElement:tag=>realDocument.createElement(tag)};
 const window={addEventListener:(type,fn,options)=>globalThis.addEventListener(type,fn,options)};
 const replyToMessage=globalThis.StarterDemoReplies.createResponder();
 function executePrototypeHandler(source,event){return eval(source);}
 ['click','input','keydown'].forEach(type=>root.addEventListener(type,function(event){
  const target=event.target.closest('[on'+type+']');if(!target||!root.contains(target))return;
  event.stopImmediatePropagation();
  if(type==='click')event.preventDefault();
  const result=executePrototypeHandler.call(target,target.getAttribute('on'+type),event);
  if(result===false)event.preventDefault();
 },true));
/* ===================== 메이트업 사용자 앱 — 화면 렌더 (상태 기반) ===================== */
const CATS = [['🏃','러닝'],['🧗','클라이밍'],['🎲','보드게임'],['🏸','배드민턴'],['📚','독서'],['🎨','드로잉'],['🎾','테니스']];
const CATEMO = Object.fromEntries(CATS.map(c => [c[1], c[0]]));
const GRAD = {러닝:'linear-gradient(135deg,#6C5CE7,#A29BFE)', 보드게임:'linear-gradient(135deg,#FF8A65,#FFB199)', 클라이밍:'linear-gradient(135deg,#26C6DA,#80DEEA)', 배드민턴:'linear-gradient(135deg,#F59E0B,#FCD34D)', 독서:'linear-gradient(135deg,#15142B,#4B4A6B)', 드로잉:'linear-gradient(135deg,#EC4899,#F9A8D4)', 테니스:'linear-gradient(135deg,#22C55E,#86EFAC)'};
const COLORS = {지:'#6C5CE7', 민:'#6C5CE7', 준:'#FF8A65', 서:'#26C6DA', 수:'#15142B', 현:'#26C6DA', 영:'#FF8A65', 하:'#EC4899', 도:'#15142B', 시:'#22C55E', 예:'#F59E0B', 태:'#EF4444'};
const DEF_APP = () => ({
  screen:'splash', tab:'home', cat:'전체', q:'', exFilter:'전체', back:[],
  user:{name:'지수', id:'M-10248', dong:'연남동', months:8, score:4.8, hobbies:['러닝','클라이밍','독서'], verified:true, suspended:false, warned:false},
  onb:{hobbies:[], dong:false},
  settings:{match:true, meet:true, chat:true, marketing:false},
  meetings:[
    {id:'m1', title:'퇴근 후 가볍게 5km', cat:'러닝', when:'오늘 19:30', date:'2026-09-16', place:'경의선숲길', dist:'0.8km', cap:6, members:['민','지','준'], host:'민서', desc:'페이스 6:30으로 천천히 뜁니다. 초보 환영, 끝나고 편의점 앞에서 아이스크림 정산 없이 각자!', tags:['페이스 6:30','초보 환영'], applied:'ok', fav:true, status:'open', requests:[]},
    {id:'m2', title:'스플렌더 · 카탄 초보방', cat:'보드게임', when:'9/12 (토) 20:00', date:'2026-09-12', place:'홍대 보드게임카페', dist:'1.2km', cap:4, members:['수','현'], host:'수아', desc:'룰 설명 있어요. 2시간 정도 두 게임 돌립니다. 카페 이용료 각자.', tags:['룰 설명 있음','2시간'], applied:'wait', fav:false, status:'open', requests:[]},
    {id:'m3', title:'볼더링 V2 같이 풀어요', cat:'클라이밍', when:'오늘 21:00', date:'2026-09-16', place:'클라이밍 파크', dist:'2.1km', cap:4, members:['영'], host:'하은', desc:'V2~V3 문제 같이 풀어요. 장비 대여 가능(3,000원).', tags:['중급','장비 대여'], applied:'none', fav:false, status:'open', requests:[]},
    {id:'m4', title:'주말 아침 배드민턴', cat:'배드민턴', when:'9/13 (일) 09:00', date:'2026-09-13', place:'망원 체육관', dist:'1.5km', cap:8, members:['도','시','예'], host:'도윤', desc:'복식 위주로 2시간. 라켓 있으신 분만요.', tags:['복식','라켓 지참'], applied:'none', fav:false, status:'open', requests:[]},
    {id:'m5', title:'북클럽 · 이달의 책', cat:'독서', when:'9/14 (월) 19:00', date:'2026-09-14', place:'연남 책방', dist:'0.5km', cap:6, members:['서','하'], host:'서윤', desc:'이달의 책 「우리가 빛의 속도로 갈 수 없다면」. 다 못 읽어도 괜찮아요.', tags:['소설','초보 환영'], applied:'none', fav:true, status:'open', requests:[]},
    {id:'m6', title:'한강 드로잉 산책', cat:'드로잉', when:'9/13 (일) 15:00', date:'2026-09-13', place:'망원한강공원', dist:'1.8km', cap:5, members:['하'], host:'하은', desc:'각자 스케치북 들고 산책하며 그려요. 재료 자유.', tags:['야외','재료 자유'], applied:'none', fav:false, status:'open', requests:[]},
  ],
  mates:[
    {id:'u1', name:'민서', dong:'연남동', dist:'0.4km', tags:['러닝','평일 저녁','페이스 6:00'], pct:92, bd:[95,90,92], score:4.9, meets:31, bio:'평일 저녁 러닝 메이트 찾아요. 6:00 페이스, 5~8km.', reviews:[['지수','시간 약속 칼같이 지켜요. 페이스 맞춰주셔서 편했어요.',5],['준혁','같이 뛰면 동기부여 됩니다.',5]], mate:'ok', blocked:false},
    {id:'u2', name:'준혁', dong:'망원동', dist:'1.1km', tags:['러닝','클라이밍','주말 오전'], pct:87, bd:[88,80,86], score:4.6, meets:15, bio:'주말 오전 클라이밍, 평일엔 가끔 러닝.', reviews:[['하은','볼더링 팁 많이 알려주세요.',5]], mate:'none', blocked:false},
    {id:'u3', name:'서윤', dong:'합정동', dist:'1.6km', tags:['보드게임','독서'], pct:81, bd:[70,92,78], score:4.7, meets:4, bio:'보드게임 초보, 북클럽 호스트.', reviews:[['수아','설명을 차분하게 잘 해주세요.',5]], mate:'none', blocked:false},
    {id:'u4', name:'도윤', dong:'망원동', dist:'1.3km', tags:['배드민턴','러닝'], pct:76, bd:[72,80,84], score:4.4, meets:11, bio:'배드민턴 복식 파트너 구합니다.', reviews:[], mate:'none', blocked:false},
  ],
  chats:[
    {id:'c1', kind:'dm', with:'민서', unread:1, msgs:[{me:false, t:'17:02', text:'지수님 오늘 19:30 경의선숲길 입구에서 봬요!'},{me:true, t:'17:05', text:'네! 조금 일찍 가서 스트레칭하고 있을게요'},{me:false, t:'17:06', text:'좋아요 👍 페이스 6:30 맞죠?'}]},
    {id:'c2', kind:'group', with:'퇴근 후 가볍게 5km', unread:0, msgs:[{me:false, who:'준혁', t:'12:40', text:'오늘 비 안 오죠?'},{me:false, who:'민서', t:'12:41', text:'네 맑음이에요 ☀️'}]},
  ],
  notis:[
    {id:'n1', t:'방금', k:'모임 확정', b:"'퇴근 후 가볍게 5km' 참여가 확정됐어요. 오늘 19:30 경의선숲길", read:false, go:'meeting:m1'},
    {id:'n2', t:'2시간 전', k:'새 메시지', b:'민서: 지수님 오늘 19:30 경의선숲길 입구에서 봬요!', read:false, go:'chat:c1'},
    {id:'n3', t:'어제', k:'후기 요청', b:"'북클럽 · 8월의 책' 모임은 어떠셨나요? 후기를 남겨주세요.", read:true, go:'review-write:서윤'},
  ],
  received:[['민서','약속 시간 잘 지키고 대화가 편해요.',5,'러닝'],['준혁','페이스 배려해주셔서 좋았어요.',5,'러닝'],['하은','조용히 집중하기 좋은 분.',4,'독서']],
  written:[],
  reports:[],  // {id, target, kind, reason, detail, status:'접수'|'처리 중'|'완료', result}
  done:['북클럽 · 8월의 책'],  // 후기 대상
  stats:{joined:12, mates:23},
});
let A = DEF_APP();
const $s = () => document.getElementById('screen');
const esc = s => String(s).replace(/</g,'&lt;');
const av = (ch, sz=20, extra='') => `<i style="background:${COLORS[ch]||'#6C5CE7'};width:${sz}px;height:${sz}px;font-size:${Math.round(sz*.42)}px;${extra}">${ch}</i>`;
const IC = {
  back:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M15 5l-7 7 7 7"/></svg>',
  bell:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0"/></svg>',
  search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>',
  heart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l8.8 8.8 8.8-8.8a5.5 5.5 0 0 0 0-7.8z"/></svg>',
  heartF:'<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l8.8 8.8 8.8-8.8a5.5 5.5 0 0 0 0-7.8z"/></svg>',
  more:'<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>',
  send:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/></svg>',
  pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  ppl:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/></svg>',
  share:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',
  star:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6.5 7 .8-5.2 4.8 1.5 7-6.3-3.6L5.7 21l1.5-7L2 9.3l7-.8z"/></svg>',
  gear:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
  shield:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  help:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01"/></svg>',
  chat:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a8 8 0 0 1-11.6 7.2L4 21l1.8-4.4A8 8 0 1 1 21 12z"/></svg>',
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg>',
  home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1z"/></svg>',
  compass:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M16 8l-2.5 6-6 2.5 2.5-6z"/></svg>',
  plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>',
  user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21a8 8 0 1 0-16 0"/><circle cx="12" cy="8" r="4"/></svg>',
  cal:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
};
const TAB_SCREENS = ['home','explore','chats','my'];
const NO_BACK = ['splash','login','home','explore','chats','my'];

/* ---------- 네비게이션 ---------- */
function nav(id, push=true){
  if (A.user.suspended && !['splash','login','suspended','safety'].includes(id)) id = 'suspended';
  if (push && A.screen !== id && !NO_BACK.includes(A.screen)) A.back.push(A.screen);
  if (NO_BACK.includes(id)) A.back = [];
  A.screen = id; if (TAB_SCREENS.includes(id)) A.tab = id;
  renderApp();
  if (window.onAppScreen) window.onAppScreen(id);
}
function goBack(){ const p = A.back.pop(); nav(p || A.tab || 'home', false); }
function renderApp(){
  const f = SCR[A.screen] || SCR.home;
  const el = $s(); el.innerHTML = f(); el.scrollTop = 0;
  document.getElementById('tabbar').style.display = TAB_SCREENS.includes(A.screen) ? '' : 'none';
  document.querySelectorAll('#tabbar .tab[data-t]').forEach(t => t.classList.toggle('active', t.dataset.t === A.tab && TAB_SCREENS.includes(A.screen)));
  document.getElementById('device').classList.toggle('dark', A.screen === 'splash');
  const un = A.chats.reduce((s,c) => s + c.unread, 0); const bd = document.getElementById('tab-chat-bd'); if (bd) { bd.textContent = un; bd.style.display = un ? '' : 'none'; }
  clearTimeout(window.__splashT);
  if (A.screen === 'splash' && !(window.TI >= 0)) window.__splashT = setTimeout(() => { if (A.screen === 'splash') nav('login'); }, 2200);
}
function atoast(m){ const t = document.getElementById('a-toast'); t.textContent = m; t.classList.add('on'); clearTimeout(window.__at); window.__at = setTimeout(() => t.classList.remove('on'), 1700); }
function pushNoti(k, b, go){ A.notis.unshift({id:'n'+Date.now(), t:'방금', k, b, read:false, go}); }
function sync(){ if (window.onAppChange) window.onAppChange(); }

/* ---------- 공통 조각 ---------- */
const topbar = (title, right='', back=true) => `<div class="a-top"><div class="a-bk" ${back ? 'onclick="goBack()"' : 'style="visibility:hidden"'}>${IC.back}</div><div class="a-tt">${title}</div><div class="a-rt">${right}</div></div>`;
const cta = (label, fn, cls='') => `<div class="a-cta"><div class="a-btn ${cls}" onclick="${fn}">${label}</div></div>`;
const mcard = m => `<div class="mcard" onclick="openMeeting('${m.id}')"><div class="th" style="background:${GRAD[m.cat]||GRAD.러닝}"><span class="tm">${m.when} · ${m.place}</span><span class="em">${CATEMO[m.cat]||'✨'}</span>${m.applied==='ok' ? '<span class="stt">참여 중</span>' : m.applied==='wait' ? '<span class="stt w">대기 중</span>' : m.mine ? '<span class="stt m">내 모임</span>' : ''}</div><div class="bd"><b>${esc(m.title)}</b><span>${m.tags.join(' · ')}</span><div class="ppl"><div class="avs">${m.members.slice(0,3).map(c => av(c)).join('')}</div>${m.members.length}/${m.cap}명 · ${m.dist}</div></div></div>`;
const mrow = m => `<div class="mrow" onclick="openMeeting('${m.id}')"><i style="background:${GRAD[m.cat]||GRAD.러닝}">${CATEMO[m.cat]||'✨'}</i><div class="in"><b>${esc(m.title)}${m.mine ? ' <em>내 모임</em>' : ''}</b><span>${m.when} · ${m.place} · ${m.dist}</span><div class="tg">${m.tags.map(t => `<span>${t}</span>`).join('')}</div></div><div class="rt"><b>${m.members.length}/${m.cap}</b><span>${m.members.length >= m.cap ? '마감' : '모집 중'}</span></div></div>`;
const materow = u => `<div class="mate" onclick="openMate('${u.id}')"><div class="av" style="background:${COLORS[u.name[0]]}">${u.name[0]}</div><div class="in"><b>${u.name} <small>${u.dong} · ${u.dist}</small></b><div class="tg">${u.tags.map(t => `<span>${t}</span>`).join('')}</div></div><div class="pct"><b>${u.pct}%</b><span>${u.pct >= 85 ? '잘 맞아요' : '비슷해요'}</span></div></div>`;
const stars = (n, sz=14) => `<span class="a-stars" style="font-size:${sz}px">${[1,2,3,4,5].map(i => `<i class="${i <= n ? 'on' : ''}">★</i>`).join('')}</span>`;
const empty = (t, s) => `<div class="a-empty"><b>${t}</b><span>${s||''}</span></div>`;

/* ---------- 화면 ---------- */
const SCR = {};
SCR.splash = () => `<div class="splash" onclick="nav('login')"><div class="blob b1"></div><div class="blob b2"></div><div class="lime"></div><div class="logo-mk"><i></i><i></i></div><h1>메이트업</h1><p>우리 동네, 같이 할 사람</p><div class="dots"><i></i><i></i><i></i></div></div>`;
SCR.login = () => `<div class="login-s">
  <div class="art"><div class="ln" style="left:72px;top:82px;width:110px;transform:rotate(-14deg)"></div><div class="ln" style="left:100px;top:100px;width:90px;transform:rotate(58deg)"></div><div class="av a1">지</div><div class="av a2">민</div><div class="av a3">준</div><div class="av a4">수</div><div class="pill">연남동 · 이번 주 128건 매칭</div></div>
  <h2>3초 만에 시작하고<br>오늘 저녁 메이트 찾기</h2><p class="lead">러닝, 보드게임, 클라이밍… 같은 동네에서 같은 취미를 가진 사람을 이어드려요.</p>
  <div class="sbtn kakao" onclick="login('kakao')"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C6.5 3 2 6.6 2 11c0 2.8 1.9 5.3 4.7 6.7L5.8 21l4.2-2.5c.6.1 1.3.2 2 .2 5.5 0 10-3.6 10-8S17.5 3 12 3z"/></svg>카카오로 3초 만에 시작</div>
  <div class="sbtn naver" onclick="login('naver')"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h5l6 8.5V4h5v16h-5l-6-8.5V20H4z"/></svg>네이버로 시작</div>
  <div class="sbtn apple" onclick="login('apple')"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.4 12.6c0-2.4 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.1 1-4 2.4-1.7 3-.4 7.3 1.2 9.7.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.2-.8s1.9.8 3.2.8c1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8 0 0-2.6-1-2.6-3.8zM14 5.5c.7-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.9 1 .1 2.1-.6 2.8-1.4z"/></svg>Apple로 시작</div>
  <div class="or">또는</div><div class="sbtn email" onclick="login('email')">이메일로 계속하기</div>
  <div class="browse" onclick="A.guest=true;nav('home')">로그인 없이 둘러보기 →</div>
  <div class="foot">시작하면 <u>이용약관</u>과 <u>개인정보처리방침</u>에 동의하게 됩니다.<br>휴대폰 번호는 매칭 확정 시에만 요청합니다.</div></div>`;
function login(how){ A.guest = false; if (A.user.suspended) { nav('suspended'); return; } if (!A.onb.done) nav('onb-hobby'); else nav('home'); }
SCR['onb-hobby'] = () => `<div class="a-pg">${topbar('', `<span class="a-step">1 / 2</span>`, false)}
  <div class="a-h1">어떤 취미로<br>메이트를 찾을까요?</div><div class="a-sub">3개까지 고를 수 있어요. 나중에 언제든 바꿀 수 있습니다.</div>
  <div class="a-grid3">${CATS.map(([e,n]) => `<div class="a-tile ${A.onb.hobbies.includes(n) ? 'on' : ''}" onclick="onbHobby('${n}')"><i>${e}</i><b>${n}</b></div>`).join('')}<div class="a-tile dis"><i>＋</i><b>더 보기</b></div></div>
  </div>${cta(`다음 (${A.onb.hobbies.length}개 선택)`, "onbNext()", A.onb.hobbies.length ? '' : 'dis')}`;
function onbHobby(n){ const h = A.onb.hobbies; const i = h.indexOf(n); if (i >= 0) h.splice(i,1); else if (h.length < 3) h.push(n); else { atoast('3개까지 고를 수 있어요'); return; } renderApp(); }
function onbNext(){ if (!A.onb.hobbies.length) return; nav('onb-dong'); }
SCR['onb-dong'] = () => `<div class="a-pg">${topbar('', `<span class="a-step">2 / 2</span>`)}
  <div class="a-h1">지금 계신 동네를<br>확인할게요</div><div class="a-sub">동네 인증을 해야 근처 모임에 참여할 수 있어요. 위치는 동 단위로만 저장됩니다.</div>
  <div class="a-map"><div class="a-map-pin">${IC.pin}</div><div class="a-map-lb">${A.onb.dong ? '연남동 인증 완료 ✓' : '서울 마포구 연남동 근처'}</div><div class="a-map-ring"></div></div>
  <div class="a-field"><label>동네</label><div class="a-input ${A.onb.dong ? '' : 'ph'}">${A.onb.dong ? '서울 마포구 연남동' : '현재 위치로 찾기'}</div></div>
  ${A.onb.dong ? '<div class="a-hint ok">✓ 현재 위치와 일치합니다. 반경 3km 모임이 보여요.</div>' : ''}
  </div>${A.onb.dong ? cta('메이트업 시작하기', "onbDone()") : cta('현재 위치로 인증하기', "onbDong()", 'o')}`;
function onbDong(){ atoast('위치 확인 중…'); setTimeout(() => { A.onb.dong = true; renderApp(); }, 700); }
function onbDone(){ A.onb.done = true; A.user.hobbies = A.onb.hobbies.slice(); pushNoti('환영해요', `${A.user.name}님, 연남동 메이트 ${A.mates.length}명이 기다리고 있어요.`, 'home'); nav('home'); sync(); }

SCR.home = () => { const list = A.meetings.filter(m => m.status !== 'hidden' && (A.cat === '전체' || m.cat === A.cat)); const unread = A.notis.some(n => !n.read);
  return `<div class="home-s">
  <div class="h-top"><div class="loc" onclick="nav('settings')">${A.user.dong} <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></div><div class="ic" onclick="nav('noti')">${IC.bell}${unread ? '<b></b>' : ''}</div></div>
  ${A.user.warned ? `<div class="a-warn" onclick="nav('safety')">⚠️ 운영정책 위반 경고 1회 — 자세히 보기</div>` : ''}
  ${A.guest ? `<div class="a-guest" onclick="nav('login')">둘러보기 중이에요 · 참여하려면 <b>3초 로그인</b> →</div>` : ''}
  <div class="search" onclick="nav('explore')">${IC.search}러닝, 보드게임, 등산…</div>
  <div class="cats"><div class="cat ${A.cat==='전체' ? 'on' : ''}" onclick="setCat('전체')"><i>✨</i>전체</div>${CATS.filter(c => !(window.HIDDEN_CATS||[]).includes(c[1])).map(([e,n]) => `<div class="cat ${A.cat===n ? 'on' : ''}" onclick="setCat('${n}')"><i>${e}</i>${n}</div>`).join('')}</div>
  <div class="sec"><div class="sec-h"><h3>${A.cat==='전체' ? '오늘 저녁, 지금 모집 중' : A.cat + ' 모임'}</h3><a onclick="nav('explore')">전체 보기</a></div>
    ${list.length ? `<div class="hs">${list.map(mcard).join('')}</div>` : empty('아직 모임이 없어요', '첫 모임을 열어보세요')}</div>
  <div class="sec"><div class="sec-h"><h3>나와 잘 맞는 메이트</h3><a onclick="atoast('취미 50% · 활동 시간대 30% · 거리 20%')">매칭 기준</a></div>${A.mates.filter(u => !u.blocked).slice(0,3).map(materow).join('')}</div>
  <div class="banner" onclick="atoast('첫 모임 참여 완료 시 자동 지급 (P1)')"><div><b>첫 모임 참여하면 커피 쿠폰</b><span>이번 달 신규 메이트 이벤트</span></div><i>☕</i></div></div>`; };
function setCat(c){ A.cat = c; renderApp(); }

SCR.explore = () => { const q = A.q.trim(); let list = A.meetings.filter(m => m.status !== 'hidden');
  if (A.exFilter === '오늘') list = list.filter(m => m.when.startsWith('오늘')); if (A.exFilter === '1km 이내') list = list.filter(m => parseFloat(m.dist) <= 1); if (A.exFilter === '자리 있음') list = list.filter(m => m.members.length < m.cap); if (A.exFilter === '내 취미') list = list.filter(m => A.user.hobbies.includes(m.cat));
  if (q) list = list.filter(m => (m.title + m.cat + m.place + m.tags.join()).includes(q));
  return `<div class="a-pg tabpad"><div class="a-top nb"><div class="a-tt big">탐색</div></div>
  <div class="a-search"><span>${IC.search}</span><input placeholder="모임, 장소, 취미 검색" value="${esc(A.q)}" oninput="A.q=this.value;exRe()"></div>
  <div class="a-chips">${['전체','오늘','1km 이내','자리 있음','내 취미'].map(f => `<span class="${A.exFilter===f ? 'on' : ''}" onclick="A.exFilter='${f}';renderApp()">${f}</span>`).join('')}</div>
  <div class="a-mapstrip" onclick="atoast('지도 보기 (P1)')"><div class="dot" style="left:30%;top:40%"></div><div class="dot" style="left:55%;top:60%"></div><div class="dot me" style="left:48%;top:48%"></div><div class="dot" style="left:70%;top:30%"></div><span>지도로 보기 · 반경 3km · ${list.length}개</span></div>
  <div class="a-list">${list.length ? list.map(mrow).join('') : empty('조건에 맞는 모임이 없어요', '필터를 바꾸거나 직접 열어보세요')}</div></div>`; };
function exRe(){ const inp = document.querySelector('.a-search input'); const pos = inp ? inp.selectionStart : 0; renderApp(); const n = document.querySelector('.a-search input'); if (n) { n.focus(); n.setSelectionRange(pos,pos); } }

function openMeeting(id){ A.curM = id; nav('meeting'); }
SCR.meeting = () => { const m = A.meetings.find(x => x.id === A.curM); if (!m) return SCR.home(); const full = m.members.length >= m.cap; const host = A.mates.find(u => u.name === m.host);
  const stt = m.mine ? (m.requests.length ? `<div class="a-req"><b>참여 신청 ${m.requests.length}건</b>${m.requests.map(r => `<div class="a-req-it">${av(r[0],28)}<span>${r} · 메이트 점수 4.6</span><em onclick="reqAct('${m.id}','${r}',1)">승인</em><em class="no" onclick="reqAct('${m.id}','${r}',0)">거절</em></div>`).join('')}</div>` : '') : '';
  const btn = m.mine ? (m.members.length>1 ? cta('모임 채팅방 열기', "openGroupChat('"+m.id+"')", 'ok') : cta('참여자 관리 · 모임 수정', "atoast('모임 수정 (P1)')", 'o')) : m.applied === 'ok' ? cta('참여 확정 · 채팅방 열기', "openGroupChat('"+m.id+"')", 'ok') : m.applied === 'wait' ? cta('신청 완료 · 호스트 승인 대기 중', "cancelJoin('"+m.id+"')", 'wait') : full ? cta('정원이 찼어요 · 대기 등록', "atoast('대기 등록 (P1)')", 'dis') : cta('참여 신청하기', "joinMeeting('"+m.id+"')");
  return `<div class="a-pg"><div class="a-hero" style="background:${GRAD[m.cat]}"><div class="a-top ov"><div class="a-bk" onclick="goBack()">${IC.back}</div><div class="a-rt"><span onclick="favM('${m.id}')" class="${m.fav ? 'on' : ''}">${m.fav ? IC.heartF : IC.heart}</span><span onclick="atoast('링크가 복사됐어요')">${IC.share}</span><span onclick="openReport('모임','${esc(m.title)}')">${IC.more}</span></div></div><span class="em">${CATEMO[m.cat]}</span><div class="a-hero-t"><span class="a-cat">${m.cat}</span><h2>${esc(m.title)}</h2></div></div>
  <div class="a-body"><div class="a-kv">${IC.clock}<div><b>${m.when}</b><span>${m.date}</span></div></div><div class="a-kv">${IC.pin}<div><b>${m.place}</b><span>내 위치에서 ${m.dist}</span></div></div><div class="a-kv">${IC.ppl}<div><b>${m.members.length}/${m.cap}명 ${full ? '· 마감' : '· 모집 중'}</b><span>${m.tags.join(' · ')}</span></div></div>
  <div class="a-sec-t">호스트</div><div class="mate" onclick="${host ? `openMate('${host.id}')` : `atoast('내 프로필')`}"><div class="av" style="background:${COLORS[m.host[0]]}">${m.host[0]}</div><div class="in"><b>${m.host} <small>${host ? host.dong : A.user.dong}</small></b><div class="tg"><span>메이트 점수 ${host ? host.score : A.user.score}</span><span>모임 ${host ? host.meets : 3}회</span></div></div><div class="pct"><b>${host ? host.pct + '%' : '나'}</b></div></div>
  <div class="a-sec-t">소개</div><p class="a-p">${esc(m.desc)}</p>
  <div class="a-sec-t">참여 중인 메이트 (${m.members.length})</div><div class="a-avlist">${m.members.map(c => `<div>${av(c,40)}<span>${c}</span></div>`).join('')}${Array.from({length:Math.max(0,m.cap-m.members.length)}).map(() => `<div><i class="ghost"></i><span>빈자리</span></div>`).join('')}</div>
  ${stt}<div class="a-rules">모임 매너: 30분 전 취소는 메이트 점수에 반영됩니다 · 노쇼 2회 시 참여 제한</div></div></div>${btn}`; };
function favM(id){ const m = A.meetings.find(x => x.id === id); m.fav = !m.fav; atoast(m.fav ? '관심 모임에 저장했어요' : '관심 모임에서 뺐어요'); renderApp(); }
function joinMeeting(id){ if (A.guest) { atoast('참여하려면 로그인이 필요해요'); nav('login'); return; } const m = A.meetings.find(x => x.id === id); m.applied = 'wait'; renderApp(); atoast('신청 완료! 호스트가 확인하면 알려드릴게요'); sync();
  setTimeout(() => { if (m.applied !== 'wait') return; m.applied = 'ok'; m.members.push('지'); pushNoti('모임 확정', `'${m.title}' 참여가 확정됐어요. ${m.when} ${m.place}`, 'meeting:'+m.id); if (!A.chats.find(c => c.id === 'g'+m.id)) A.chats.unshift({id:'g'+m.id, kind:'group', with:m.title, unread:1, msgs:[{me:false, who:m.host, t:'방금', text:`${A.user.name}님 환영해요! ${m.when}에 ${m.place}에서 봬요 🙌`}]}); A.stats.joined++; if (A.screen === 'meeting' && A.curM === id) renderApp(); else renderApp(); atoast(`'${m.title}' 참여 확정 🎉`); sync(); }, 2500); }
function cancelJoin(id){ const m = A.meetings.find(x => x.id === id); m.applied = 'none'; atoast('신청을 취소했어요'); renderApp(); sync(); }
function openGroupChat(id){
 const meeting=A.meetings.find(m=>m.id===id);if(!meeting)return;
 let chat=A.chats.find(c=>c.id==='g'+id);
 if(!chat){chat={id:'g'+id,kind:'group',with:meeting.title,unread:0,msgs:[{me:false,who:'민서',t:'방금',text:'안녕하세요. 모임에 함께 참여합니다.'}]};A.chats.unshift(chat);}
 A.curC=chat.id;nav('chat');
}
function reqAct(mid, who, ok){ const m = A.meetings.find(x => x.id === mid); m.requests = m.requests.filter(r => r !== who); if (ok) { m.members.push(who[0]); atoast(`${who}님을 승인했어요`); } else atoast('거절했어요'); renderApp(); sync(); }

SCR.create = () => { const c = A.draft || (A.draft = {cat:'', title:'', when:'', place:'', cap:4, desc:'', beginner:true}); const ok = c.cat && c.title && c.when && c.place;
  return `<div class="a-pg">${topbar('모임 만들기')}
  <div class="a-body"><div class="a-lab">취미 <em>*</em></div><div class="a-chips wrapc">${CATS.map(([e,n]) => `<span class="${c.cat===n ? 'on' : ''}" onclick="A.draft.cat='${n}';renderApp()">${e} ${n}</span>`).join('')}</div>
  <div class="a-lab">제목 <em>*</em></div><input class="a-in" placeholder="예) 퇴근 후 가볍게 5km" value="${esc(c.title)}" oninput="A.draft.title=this.value;ctaRe()">
  <div class="a-row2"><div><div class="a-lab">일시 <em>*</em></div><div class="a-chips">${['오늘 19:30','내일 20:00','9/19 (토) 10:00'].map(w => `<span class="${c.when===w ? 'on' : ''}" onclick="A.draft.when='${w}';renderApp()">${w}</span>`).join('')}</div></div></div>
  <div class="a-lab">장소 <em>*</em></div><input class="a-in" placeholder="예) 경의선숲길 연남동 입구" value="${esc(c.place)}" oninput="A.draft.place=this.value;ctaRe()">
  <div class="a-lab">인원</div><div class="a-stepper"><span onclick="A.draft.cap=Math.max(2,A.draft.cap-1);renderApp()">−</span><b>${c.cap}명</b><span onclick="A.draft.cap=Math.min(20,A.draft.cap+1);renderApp()">＋</span></div>
  <div class="a-lab">소개</div><textarea class="a-in ta" placeholder="어떤 분과 어떻게 하고 싶은지 적어주세요" oninput="A.draft.desc=this.value">${esc(c.desc)}</textarea>
  <div class="a-tgl" onclick="A.draft.beginner=!A.draft.beginner;renderApp()"><div><b>초보 환영</b><span>처음인 분도 참여할 수 있어요</span></div><i class="${c.beginner ? 'on' : ''}"></i></div>
  <div class="a-hint">모임을 열면 관리자 검수 없이 바로 노출되고, 신고 접수 시에만 검토됩니다.</div></div></div>${cta('모임 열기', 'createMeeting()', ok ? '' : 'dis')}`; };
function ctaRe(){ const c = A.draft; const ok = c.cat && c.title && c.when && c.place; const b = document.querySelector('.a-cta .a-btn'); if (b) b.classList.toggle('dis', !ok); }
function createMeeting(){ const c = A.draft; if (!(c.cat && c.title && c.when && c.place)) { atoast('필수 항목을 채워주세요'); return; } const m = {id:'m'+Date.now(), title:c.title, cat:c.cat, when:c.when, date:'2026-09-16', place:c.place, dist:'0.3km', cap:c.cap, members:['지'], host:A.user.name, desc:c.desc || '함께 해요!', tags:[c.beginner ? '초보 환영' : '경험자', '새 모임'], applied:'none', fav:false, status:'open', mine:true, requests:[]};
  A.meetings.unshift(m); A.draft = null; A.curM = m.id; nav('meeting'); atoast('모임이 열렸어요! 이제 동네 메이트에게 보여요'); sync();
  setTimeout(() => { m.requests.push('민서'); pushNoti('참여 신청', `민서님이 '${m.title}'에 참여를 신청했어요.`, 'meeting:'+m.id); if (A.screen === 'meeting' && A.curM === m.id) renderApp(); else renderApp(); atoast('민서님이 참여를 신청했어요'); sync(); }, 3000); }

function openMate(id){ A.curU = id; nav('mate'); }
SCR.mate = () => { const u = A.mates.find(x => x.id === A.curU); if (!u) return SCR.home(); const lb = ['취미','활동 시간대','거리'];
  return `<div class="a-pg">${topbar('', `<span onclick="openReport('회원','${u.name}')">${IC.more}</span>`)}
  <div class="a-prof"><div class="av" style="background:${COLORS[u.name[0]]}">${u.name[0]}</div><h2>${u.name}</h2><span>${u.dong} · ${u.dist} · 모임 ${u.meets}회</span><div class="a-score">${IC.star} 메이트 점수 <b>${u.score}</b></div></div>
  <div class="a-body"><div class="a-match"><div class="big"><b>${u.pct}%</b><span>나와 맞는 정도</span></div><div class="bars">${u.bd.map((v,i) => `<div><span>${lb[i]}</span><div class="bar"><i style="width:${v}%"></i></div><b>${v}</b></div>`).join('')}</div></div>
  <div class="a-sec-t">취미 · 활동</div><div class="hob">${u.tags.map(t => `<span>${t}</span>`).join('')}</div>
  <div class="a-sec-t">소개</div><p class="a-p">${esc(u.bio)}</p>
  <div class="a-sec-t">받은 후기 (${u.reviews.length})</div>${u.reviews.length ? u.reviews.map(r => `<div class="a-rev"><div class="m">${av(r[0][0],24)}<b>${r[0]}</b>${stars(r[2],11)}</div><p>${esc(r[1])}</p></div>`).join('') : empty('아직 후기가 없어요')}
  <div class="a-sec-t">함께할 수 있는 모임</div>${A.meetings.filter(m => m.host === u.name && m.status !== 'hidden').map(mrow).join('') || empty('호스트 중인 모임이 없어요')}</div></div>
  ${u.blocked ? cta('차단한 사용자 · 차단 해제', `unblock('${u.id}')`, 'o') : u.mate === 'ok' ? cta('채팅하기', `openDM('${u.name}')`, 'ok') : u.mate === 'wait' ? cta('메이트 신청 보냄 · 수락 대기', "atoast('상대가 수락하면 채팅이 열려요')", 'wait') : cta('메이트 신청하기', `mateReq('${u.id}')`)}`; };
function mateReq(id){ if (A.guest) { nav('login'); return; } const u = A.mates.find(x => x.id === id); u.mate = 'wait'; renderApp(); atoast('메이트 신청을 보냈어요'); setTimeout(() => { u.mate = 'ok'; A.stats.mates++; A.chats.unshift({id:'d'+u.id, kind:'dm', with:u.name, unread:1, msgs:[{me:false, t:'방금', text:`안녕하세요 ${A.user.name}님! 메이트 수락했어요. 언제 한번 같이 해요 😊`}]}); pushNoti('메이트 수락', `${u.name}님이 메이트 신청을 수락했어요. 채팅을 시작해보세요.`, 'chat:d'+u.id); renderApp(); atoast(`${u.name}님이 수락했어요 🎉`); sync(); }, 2200); }
function openDM(name){ let c = A.chats.find(x => x.kind === 'dm' && x.with === name); if (!c) { c = {id:'d'+Date.now(), kind:'dm', with:name, unread:0, msgs:[]}; A.chats.unshift(c); } A.curC = c.id; nav('chat'); }
function unblock(id){ const u = A.mates.find(x => x.id === id); u.blocked = false; atoast('차단을 해제했어요'); renderApp(); sync(); }

SCR.chats = () => `<div class="a-pg tabpad"><div class="a-top nb"><div class="a-tt big">채팅</div><div class="a-rt"><span onclick="atoast('읽음 처리했어요');A.chats.forEach(c=>c.unread=0);renderApp()">${IC.check}</span></div></div>
  <div class="a-chips">${['전체','1:1','모임'].map(f => `<span class="${(A.chatF||'전체')===f ? 'on' : ''}" onclick="A.chatF='${f}';renderApp()">${f}</span>`).join('')}</div>
  <div class="a-list">${A.chats.filter(c => (A.chatF||'전체')==='전체' || (A.chatF==='1:1' ? c.kind==='dm' : c.kind==='group')).map(c => { const last = c.msgs[c.msgs.length-1]; return `<div class="a-chat-it" onclick="A.curC='${c.id}';nav('chat')"><div class="av" style="background:${c.kind==='group' ? 'var(--ap-primary-soft)' : COLORS[c.with[0]]};color:${c.kind==='group' ? 'var(--ap-primary)' : '#fff'}">${c.kind==='group' ? CATEMO[(A.meetings.find(m => m.title===c.with)||{}).cat] || '👥' : c.with[0]}</div><div class="in"><b>${esc(c.with)}${c.kind==='group' ? ' <em>모임</em>' : ''}<small>${last ? last.t : ''}</small></b><span>${last ? esc((last.who ? last.who + ': ' : '') + last.text) : '대화를 시작해보세요'}</span></div>${c.unread ? `<i class="un">${c.unread}</i>` : ''}</div>`; }).join('') || empty('아직 채팅이 없어요', '메이트 신청이 수락되면 채팅이 열려요')}</div></div>`;
SCR.chat = () => { const c = A.chats.find(x => x.id === A.curC); if (!c) return SCR.chats(); c.unread = 0;
  return `<div class="a-pg chatpg">${topbar(`${esc(c.with)}${c.kind==='group' ? ' <small>' + ((A.meetings.find(m => m.title===c.with)||{members:[]}).members.length) + '명</small>' : ''}`, `<span onclick="openReport('${c.kind==='group' ? '모임' : '회원'}','${esc(c.with)}')">${IC.more}</span>`)}
  <div class="a-msgs" id="msgs">${c.kind==='group' ? `<div class="a-sys">모임 채팅방이 열렸어요. 매너 있는 대화 부탁드려요 🙏</div>` : `<div class="a-sys">${c.with}님과 메이트가 됐어요</div>`}${c.msgs.map(m => `<div class="a-msg ${m.me ? 'me' : ''}">${!m.me ? av((m.who||c.with)[0], 28) : ''}<div><b>${m.me ? '' : (m.who || c.with)}</b><p>${esc(m.text)}</p><small>${m.t}</small></div></div>`).join('')}</div>
  <div class="a-quick">${(c.kind==='group' ? ['📍 위치 공유','⏰ 10분 늦어요','👋 도착했어요'] : ['📅 일정 잡기','🏃 모임 초대','👍']).map(q => `<span onclick="sendMsg('${q.replace(/'/g,'')}')">${q}</span>`).join('')}</div>
  <div class="a-compose"><input id="cmp" aria-label="채팅 메시지" placeholder="메시지 입력" oninput="updateChatSend(this.value)" onkeydown="if(event.key==='Enter'&&!event.isComposing){event.preventDefault();sendMsg()}"><button type="button" aria-label="메시지 전송" onclick="sendMsg()" disabled>${IC.send}</button></div></div>`; };
function updateChatSend(value){const send=document.querySelector('.a-compose button');if(send)send.disabled=!value.trim();}
function renderChatPreservingDraft(){
 const before=document.getElementById('cmp'),draft=before?before.value:'',focused=before&&realDocument.activeElement===before,start=before?before.selectionStart:0,end=before?before.selectionEnd:0;
 renderApp();const after=document.getElementById('cmp');if(!after)return;
 after.value=draft;updateChatSend(draft);if(focused){after.focus({preventScroll:true});after.setSelectionRange(start,end);}
}
function sendMsg(q){
 const c=A.chats.find(x=>x.id===A.curC),input=document.getElementById('cmp');
 const text=q||(input?input.value.trim():'');if(!c||!text)return;
 const meeting=c.kind==='group'?A.meetings.find(m=>'g'+m.id===c.id||m.title===c.with):null;
 const reply=replyToMessage({message:text,chatId:c.id,meeting});
 c.msgs.push({me:true,t:'방금',text});if(input&&!q)input.value='';renderChatPreservingDraft();
 const box=document.getElementById('msgs');if(box)box.scrollTop=box.scrollHeight;
 root.dispatchEvent(new CustomEvent('starter:chat',{detail:{phase:'sent',chatId:c.id}}));
 setTimeout(()=>{
  c.msgs.push({me:false,who:c.kind==='group'?'민서':undefined,t:'방금',text:reply});
  if(A.screen==='chat'&&A.curC===c.id){renderChatPreservingDraft();const messages=document.getElementById('msgs');if(messages)messages.scrollTop=messages.scrollHeight;}else c.unread++;
  root.dispatchEvent(new CustomEvent('starter:chat',{detail:{phase:'reply',chatId:c.id}}));
 },1100);
}


SCR.noti = () => `<div class="a-pg">${topbar('알림', `<span onclick="A.notis.forEach(n=>n.read=true);renderApp();atoast('모두 읽음')">${IC.check}</span>`)}
  <div class="a-list">${A.notis.length ? A.notis.map(n => `<div class="a-noti ${n.read ? '' : 'un'}" onclick="notiGo('${n.id}')"><div class="k">${n.k}<small>${n.t}</small></div><p>${esc(n.b)}</p></div>`).join('') : empty('알림이 없어요')}</div></div>`;
function notiGo(id){ const n = A.notis.find(x => x.id === id); n.read = true; const [s, arg] = (n.go || 'home').split(':'); if (s === 'meeting') { A.curM = arg; nav('meeting'); } else if (s === 'chat') { A.curC = arg; nav('chat'); } else if (s === 'review-write') { A.revTarget = arg; nav('review-write'); } else nav(s); }

SCR.my = () => { const mine = A.meetings.filter(m => (m.applied !== 'none' || m.mine) && m.status !== 'hidden'); const pending = A.done.length;
  return `<div class="my-s"><div class="my-top"><h2>MY</h2><div class="ic" onclick="nav('settings')" style="width:40px;height:40px;border-radius:50%;background:var(--ap-surface2);display:flex;align-items:center;justify-content:center">${IC.gear.replace('<svg','<svg style="width:20px;height:20px"')}</div></div>
  <div class="prof"><div class="row1"><div class="av">${A.user.name[0]}</div><div class="nm">${A.user.name}<small>${A.user.dong} ${A.user.verified ? '✓' : ''} · 메이트업 ${A.user.months}개월째</small></div><span class="edit" onclick="atoast('프로필 편집 (P1)')">프로필 편집</span></div><div class="score"><b>메이트 점수</b><div class="bar"><i style="width:${A.user.score/5*100}%"></i></div><span>${A.user.score.toFixed(1)}</span></div></div>
  <div class="stat3"><div onclick="nav('explore')"><b>${A.stats.joined}</b><span>참여한 모임</span></div><div onclick="nav('chats')"><b>${A.stats.mates}</b><span>나의 메이트</span></div><div onclick="nav('reviews')"><b>${A.received.length}</b><span>받은 후기</span></div></div>
  <div class="sec"><div class="sec-h"><h3>내 취미</h3><a onclick="nav('onb-hobby')">편집</a></div><div class="hob">${A.user.hobbies.map(h => `<span>${CATEMO[h]||''} ${h}</span>`).join('')}<span class="add" onclick="nav('onb-hobby')">+ 추가</span></div></div>
  <div class="sec"><div class="sec-h"><h3>진행 중인 모임</h3><a onclick="nav('explore')">전체 보기</a></div>${mine.length ? mine.map(m => `<div class="ongo" onclick="openMeeting('${m.id}')"><i style="background:var(--ap-primary-soft)">${CATEMO[m.cat]}</i><div><b>${esc(m.title)}</b><span>${m.when} · ${m.place} · ${m.members.length}/${m.cap}명</span></div><span class="st ${m.mine ? 'mine' : m.applied==='wait' ? 'wait' : ''}">${m.mine ? '호스트' : m.applied==='wait' ? '대기 중' : '확정'}</span></div>`).join('') : empty('참여 중인 모임이 없어요')}</div>
  ${pending ? `<div class="a-todo" onclick="A.revTarget='서윤';nav('review-write')"><b>후기 남기기 ${pending}건</b><span>'${A.done[0]}' 어떠셨나요? 후기를 쓰면 점수가 올라요</span><em>쓰기 ›</em></div>` : ''}
  <ul class="menu"><li onclick="nav('reviews')">${IC.star.replace('fill="currentColor"','fill="none" stroke="currentColor" stroke-width="2"')}받은 후기 · 내가 쓴 후기<span class="ar">›</span></li><li onclick="nav('favorites')">${IC.heart}관심 모임<span class="bd" style="background:var(--ap-primary)">${A.meetings.filter(m => m.fav).length}</span><span class="ar">›</span></li><li onclick="nav('settings')">${IC.bell}알림 설정<span class="ar">›</span></li><li onclick="nav('safety')">${IC.shield}안전 · 차단 관리${A.reports.length ? `<span class="bd">${A.reports.length}</span>` : ''}<span class="ar">›</span></li><li onclick="atoast('고객센터 채널 연결 (P1)')">${IC.help}고객센터<span class="ar">›</span></li></ul></div>`; };

SCR.reviews = () => { const t = A.revTab || 'got'; return `<div class="a-pg">${topbar('후기')}
  <div class="a-tabs2"><span class="${t==='got' ? 'on' : ''}" onclick="A.revTab='got';renderApp()">받은 후기 ${A.received.length}</span><span class="${t==='wrote' ? 'on' : ''}" onclick="A.revTab='wrote';renderApp()">내가 쓴 후기 ${A.written.length}</span></div>
  <div class="a-body">${t==='got' ? `<div class="a-revsum"><b>${A.user.score.toFixed(1)}</b>${stars(Math.round(A.user.score),16)}<span>후기 ${A.received.length}개 · 상위 12%</span></div>` + A.received.map(r => `<div class="a-rev"><div class="m">${av(r[0][0],24)}<b>${r[0]}</b><em>${r[3]}</em>${stars(r[2],11)}</div><p>${esc(r[1])}</p></div>`).join('') : (A.written.length ? A.written.map(r => `<div class="a-rev"><div class="m">${av(r[0][0],24)}<b>${r[0]}에게</b>${stars(r[2],11)}</div><p>${esc(r[1])}</p><div class="tg">${r[3].map(x => `<span>${x}</span>`).join('')}</div></div>`).join('') : empty('아직 쓴 후기가 없어요', '모임이 끝나면 후기를 남길 수 있어요'))}</div></div>`; };
SCR['review-write'] = () => { const r = A.rev || (A.rev = {star:0, tags:[], text:''}); const TAGS = ['시간 약속 잘 지켜요','대화가 편해요','배려가 있어요','다시 만나고 싶어요','실력이 좋아요']; const who = A.revTarget || '서윤';
  return `<div class="a-pg">${topbar('후기 남기기')}<div class="a-body"><div class="a-revhead">${av(who[0],56)}<b>${who}님과의 '${A.done[0]||'모임'}'</b><span>어떠셨나요? 후기는 상대의 메이트 점수에 반영돼요</span></div>
  <div class="a-starpick">${[1,2,3,4,5].map(i => `<i class="${i <= r.star ? 'on' : ''}" onclick="A.rev.star=${i};renderApp()">★</i>`).join('')}</div><div class="a-starlb">${['','아쉬워요','그저 그래요','괜찮아요','좋아요','최고예요'][r.star]||'별점을 골라주세요'}</div>
  <div class="a-lab">어떤 점이 좋았나요?</div><div class="a-chips wrapc">${TAGS.map(t => `<span class="${r.tags.includes(t) ? 'on' : ''}" onclick="revTag('${t}')">${t}</span>`).join('')}</div>
  <div class="a-lab">한 줄 후기</div><textarea class="a-in ta" placeholder="다른 메이트에게 도움이 되는 한 마디" oninput="A.rev.text=this.value">${esc(r.text)}</textarea>
  <div class="a-hint">후기는 상대에게 작성자 이름과 함께 보여요. 비방·욕설은 운영정책에 따라 삭제됩니다.</div></div></div>${cta('후기 등록', 'submitReview()', r.star ? '' : 'dis')}`; };
function revTag(t){ const g = A.rev.tags; const i = g.indexOf(t); if (i >= 0) g.splice(i,1); else g.push(t); renderApp(); }
function submitReview(){ const r = A.rev; if (!r.star) return; const who = A.revTarget || '서윤'; A.written.unshift([who, r.text || r.tags.join(', ') || '좋았어요', r.star, r.tags]); const u = A.mates.find(x => x.name === who); if (u) { u.reviews.unshift([A.user.name, r.text || r.tags[0] || '좋았어요', r.star]); u.score = Math.round((u.score*0.9 + r.star*0.1)*10)/10; } A.done = []; A.user.score = Math.min(5, Math.round((A.user.score + 0.05)*10)/10); A.rev = null; A.revTab = 'wrote'; nav('reviews', false); A.back = []; atoast('후기가 등록됐어요. 내 점수도 +0.05 ⬆'); sync(); }

SCR.favorites = () => `<div class="a-pg">${topbar('관심 모임')}<div class="a-list">${A.meetings.filter(m => m.fav && m.status !== 'hidden').map(mrow).join('') || empty('관심 모임이 없어요', '모임 상세에서 ♥를 눌러 저장하세요')}</div></div>`;

SCR.settings = () => { const s = A.settings; const tg = (k, t, d) => `<div class="a-tgl" onclick="A.settings.${k}=!A.settings.${k};renderApp();sync()"><div><b>${t}</b><span>${d}</span></div><i class="${s[k] ? 'on' : ''}"></i></div>`;
  return `<div class="a-pg">${topbar('설정')}<div class="a-body"><div class="a-sec-t">알림</div>${tg('match','매칭 알림','메이트 신청·수락, 매칭률 높은 메이트 추천')}${tg('meet','모임 알림','참여 확정, 일정 변경, 모임 시작 1시간 전')}${tg('chat','채팅 알림','새 메시지')}${tg('marketing','이벤트·혜택 (선택)','쿠폰, 신규 기능 소식')}
  <div class="a-sec-t">계정</div><ul class="menu" style="margin:0"><li onclick="atoast('동네 변경은 30일에 1회 (P1)')">${IC.pin}동네 변경<span class="ar" style="font-size:12px;color:var(--ap-text3)">${A.user.dong} ✓ &nbsp;›</span></li><li onclick="atoast('연결된 계정: 카카오')">${IC.user}연결된 계정<span class="ar" style="font-size:12px;color:var(--ap-text3)">카카오 &nbsp;›</span></li><li onclick="atoast('약관 · 개인정보처리방침 (링크)')">${IC.help}약관 및 정책<span class="ar">›</span></li></ul>
  <div class="a-sec-t">기타</div><ul class="menu" style="margin:0"><li onclick="logout()" style="color:var(--ap-danger)">로그아웃<span class="ar">›</span></li><li onclick="atoast('탈퇴는 고객센터를 통해 진행됩니다 (P1)')" style="color:var(--ap-text3)">회원 탈퇴<span class="ar">›</span></li></ul><div class="a-ver">메이트업 v0.1 · 프로토타입</div></div></div>`; };
function logout(){ A.back = []; nav('login'); atoast('로그아웃 됐어요'); }

SCR.safety = () => `<div class="a-pg">${topbar('안전 · 차단 관리')}<div class="a-body">
  ${A.user.warned ? `<div class="a-warnbox"><b>⚠️ 운영정책 위반 경고 1회</b><span>신고 검토 결과 경고가 부여됐습니다. 경고 2회 누적 시 7일간 이용이 제한됩니다.</span></div>` : ''}
  <div class="a-sec-t">차단한 사용자 (${A.mates.filter(u => u.blocked).length})</div>${A.mates.filter(u => u.blocked).map(u => `<div class="a-blk">${av(u.name[0],36)}<b>${u.name}</b><em onclick="unblock('${u.id}')">해제</em></div>`).join('') || empty('차단한 사용자가 없어요')}
  <div class="a-sec-t">내 신고 내역 (${A.reports.length})</div>${A.reports.map(r => `<div class="a-rep"><div class="m"><b>${r.kind} · ${esc(r.target)}</b><span class="st ${r.status==='완료' ? 'ok' : r.status==='처리 중' ? 'ing' : ''}">${r.status}</span></div><span>${r.reason}${r.result ? ' → ' + r.result : ''}</span></div>`).join('') || empty('신고 내역이 없어요')}
  <div class="a-sec-t">안전 안내</div><div class="a-rules">첫 만남은 공공장소에서 · 개인 연락처 교환은 신중하게 · 불편한 일이 있으면 바로 신고해주세요. 신고는 24시간 안에 검토됩니다.</div></div></div>`;

function openReport(kind, target){ A.rep = {kind, target, reason:'', detail:'', block:false}; nav('report'); }
SCR.report = () => { const r = A.rep || {kind:'회원', target:'', reason:'', detail:''}; const RS = ['노쇼 · 약속 불이행', '욕설 · 비방', '광고 · 영업', '부적절한 사진 · 언행', '사기 의심', '기타'];
  return `<div class="a-pg">${topbar('신고하기')}<div class="a-body"><div class="a-repwho"><span>${r.kind} 신고</span><b>${esc(r.target)}</b></div>
  <div class="a-lab">신고 사유 <em>*</em></div><div class="a-radios">${RS.map(x => `<div class="a-radio ${r.reason===x ? 'on' : ''}" onclick="A.rep.reason='${x}';renderApp()"><i></i><span>${x}</span></div>`).join('')}</div>
  <div class="a-lab">상세 내용</div><textarea class="a-in ta" placeholder="언제, 어떤 일이 있었는지 적어주시면 검토가 빨라져요" oninput="A.rep.detail=this.value">${esc(r.detail)}</textarea>
  ${r.kind==='회원' ? `<div class="a-tgl" onclick="A.rep.block=!A.rep.block;renderApp()"><div><b>이 사용자 차단하기</b><span>차단하면 서로의 프로필과 모임이 보이지 않아요</span></div><i class="${r.block ? 'on' : ''}"></i></div>` : ''}
  <div class="a-hint">신고 내용은 운영팀만 확인하며, 상대에게 알려지지 않습니다.</div></div></div>${cta('신고 접수', 'submitReport()', r.reason ? '' : 'dis')}`; };
function submitReport(){ const r = A.rep; if (!r.reason) return; const rep = {id:'r'+Date.now(), kind:r.kind, target:r.target, reason:r.reason, detail:r.detail, status:'접수', by:A.user.name, at:'방금'}; A.reports.unshift(rep); if (r.block) { const u = A.mates.find(x => x.name === r.target); if (u) u.blocked = true; } A.rep = null; A.back = []; nav('safety', false); atoast('신고가 접수됐어요. 24시간 안에 검토됩니다'); sync(); }

SCR.suspended = () => `<div class="a-pg"><div class="a-body" style="padding-top:80px;text-align:center"><div style="font-size:56px">🚫</div><div class="a-h1" style="text-align:center">계정 이용이 제한됐어요</div><div class="a-sub" style="text-align:center">운영정책 위반으로 계정이 정지되었습니다.<br>문의는 고객센터로 부탁드려요.</div><div class="a-warnbox" style="text-align:left;margin-top:20px"><b>정지 사유</b><span>${A.user.suspendReason || '신고 누적'}</span></div></div></div>${cta('고객센터 문의', "atoast('고객센터 (P1)')", 'o')}`;

/* ---------- 관리자 → 앱 반영 ---------- */
function applyAdmin(act, p){
  if (act === 'suspend') { if (p.id === A.user.id) { A.user.suspended = true; A.user.suspendReason = p.reason || '신고 누적'; nav('suspended'); } }
  if (act === 'unsuspend') { if (p.id === A.user.id) { A.user.suspended = false; A.back = []; nav('login', false); atoast('정지가 해제됐어요'); } }
  if (act === 'warn') { A.user.warned = true; pushNoti('운영정책 안내', '신고 검토 결과 경고 1회가 부여됐습니다. 안전 · 차단 관리에서 확인하세요.', 'safety'); renderApp(); }
  if (act === 'hideMeeting') { const m = A.meetings.find(x => x.id === p.id); if (m) { m.status = 'hidden'; if (m.mine) pushNoti('모임 비공개 처리', `'${m.title}' 모임이 운영정책에 따라 비공개 처리됐어요.`, 'safety'); } renderApp(); }
  if (act === 'showMeeting') { const m = A.meetings.find(x => x.id === p.id); if (m) m.status = 'open'; renderApp(); }
  if (act === 'report') { const r = A.reports.find(x => x.id === p.id); if (r) { r.status = p.status; r.result = p.result; if (p.status === '완료') pushNoti('신고 처리 결과', `'${r.target}' 신고가 처리됐어요: ${p.result}`, 'safety'); } renderApp(); }
  if (act === 'push') { pushNoti(p.title, p.body, 'home'); renderApp(); atoast('🔔 ' + p.title); }
  if (act === 'cat') { window.HIDDEN_CATS = p.hidden; if (!CATS.find(c => c[1] === p.added) && p.added) CATS.push([p.emoji || '✨', p.added]); if (p.added) CATEMO[p.added] = p.emoji || '✨'; renderApp(); }
  sync();
}
function appSnapshot(){ return {user:A.user, meetings:A.meetings.map(m => ({id:m.id, title:m.title, cat:m.cat, when:m.when, place:m.place, cap:m.cap, n:m.members.length, host:m.host, status:m.status, mine:!!m.mine})), reports:A.reports, stats:A.stats, settings:A.settings, hobbies:A.user.hobbies}; }
function resetApp(){ A = DEF_APP(); window.HIDDEN_CATS = []; }


(function(){
 function post(o){ try { root.dispatchEvent(new CustomEvent('starter:state',{detail:Object.assign({mu:1},o)})); } catch(e){} }
 var dev = document.getElementById('device');
 var step = 0;
 function setStep(n){ step = n; dev.setAttribute('data-step', n); post({step:n}); }

 // 실제 앱 함수를 감싸서 단계만 알린다 (동작은 원본 그대로)
 var _create = createMeeting, _req = reqAct, _nav = nav;
 function scrollTo(sel, mode, smooth){
   var sc = document.getElementById('screen'), el = document.querySelector(sel);
   if (!sc || !el) return false;
   var top;
   if (mode === 'lower') top = el.offsetTop + el.offsetHeight - (sc.clientHeight - 120); // 아래쪽에 배치
   else if (mode === 'center') top = el.offsetTop - Math.max(0,(sc.clientHeight - el.offsetHeight)/2);
   else top = el.offsetTop - 24;
   top = Math.max(0, top);
   if (smooth) { try { sc.scrollTo({top:top, behavior:'smooth'}); return true; } catch(e){} }
   sc.scrollTop = top; return true;
 }
 // 대상이 확실히 화면 안에 들어올 때까지 몇 번 더 확인한다
 function ensure(sel, mode){
   var n = 0;
   (function tick(){
     var sc = document.getElementById('screen'), el = document.querySelector(sel);
     if (sc && el){
       var r = el.getBoundingClientRect(), d = document.getElementById('device').getBoundingClientRect();
       if (!(r.top > d.top + 100 && r.bottom < d.bottom - 8)) scrollTo(sel, mode, n > 0);
     }
     if (++n < 6) setTimeout(tick, 160);
   })();
 }
 nav = function(id, push){ _nav(id, push); dev.setAttribute('data-scr', id);
   if(id==='chat'&&step===2)A.back=['home'];
   if(id==='home'&&step===3&&dev.getAttribute('data-chat-replied')==='true')setStep(4); };
 createMeeting = function(){ var b = A.meetings.length; _create();
   if (A.meetings.length > b){
     // 뒤로가기가 '홈'으로 가도록 — 3단계에서 실제로 누를 수 있는 컨트롤이 된다
     A.back = ['home']; setStep(1);
   } };
 reqAct = function(mid, who, ok){ _req(mid, who, ok);
   if (ok && step === 1){ dev.setAttribute('data-guide',''); setStep(2);
     setTimeout(function(){scrollTo('.a-cta','lower',true);},60); } };
 root.addEventListener('starter:chat',function(event){
  var d=event.detail,meeting=A.meetings[0];if(!meeting||d.chatId!=='g'+meeting.id)return;
  if(d.phase==='sent'&&step===2){dev.setAttribute('data-chat-replied','false');A.back=['home'];setStep(3);}
  if(d.phase==='reply'&&step===3){dev.setAttribute('data-chat-replied','true');post({chatReply:true});}
 });
 window.onAppChange = function(){
   var m = A.meetings[0], n = (m && m.requests) ? m.requests.length : 0;
   post({reqs:n});
   // 참여 신청이 도착하면 승인 버튼이 보이도록 앱 화면을 스크롤한다
   if (n > 0 && A.screen === 'meeting' && step === 1){
     dev.setAttribute('data-guide','req');
     scrollTo('.a-req', 'lower', false);        // 화면 아래쪽에 바로 보이게
     placeGuide();
     setTimeout(function(){ ensure('.a-req', 'lower'); placeGuide(); }, 60);
     setTimeout(placeGuide, 260);
   } else if (n === 0) dev.setAttribute('data-guide','');
 };

 // 미리 채워둔 초안으로 '모임 만들기'에서 시작
 A.guest = false; A.onb.done = true; A.onb.hobbies = ['러닝']; A.user.hobbies = ['러닝'];
 A.draft = {cat:'러닝', title:'오늘 저녁 한강 러닝', when:'오늘 19:30', place:'망원한강공원', cap:4, desc:'', beginner:true};
 nav('create', false);
 dev.setAttribute('data-step', 0);

 var gb = document.getElementById('guidebar');
 if (gb) gb.addEventListener('click', function(){ scrollTo('.a-req', 'lower', true); });
 function placeGuide(){
   if (dev.getAttribute('data-guide') !== 'req') return;
   var q = document.querySelector('.a-req'); if (!q || !gb) return;
   var dr = dev.getBoundingClientRect(), qr = q.getBoundingClientRect();
   var t = qr.top - dr.top - 54;                       // 블록 바로 위
   t = Math.max(66, Math.min(t, dr.height - 170));
   gb.style.top = t + 'px';
 }
 (function(){ var sc = document.getElementById('screen');
   if (sc) sc.addEventListener('scroll', placeGuide, {passive:true});
   setInterval(placeGuide, 400); })();

 post({ready:1});
})();


(function(){
 var device=document.getElementById('device'),screen=document.getElementById('screen');
 var cue=document.createElement('div');cue.className='starter-cue';cue.hidden=true;cue.setAttribute('aria-hidden','true');
 cue.innerHTML='<span class="starter-cue-ring"></span><svg class="starter-cue-cursor" viewBox="0 0 32 38" fill="none"><path d="M3 2L26 22L16 23L12 34L3 2Z" fill="#57458e" stroke="#fff" stroke-width="2.3" stroke-linejoin="round"/></svg><span class="starter-cue-label"></span>';
 device.appendChild(cue);
 var active=null,stepKey='',pending=false;
 function locate(){
  pending=false;
  device.setAttribute('oai-annotatable','메이트업 프로토타입 화면');
  screen.querySelectorAll('input,textarea,button,.a-btn,.a-bk,.a-req-it em,.a-chips span,h2,h3,.a-msg p').forEach(function(el){
   var name=el.getAttribute('aria-label')||el.getAttribute('placeholder')||el.textContent.trim()||'프로토타입 버튼';
   el.setAttribute('oai-annotatable',name.slice(0,100));
  });
  var step=device.getAttribute('data-step'),scr=device.getAttribute('data-scr'),target=null,label='';
  if(step==='0'&&scr==='create'){target=screen.querySelector('.a-cta .a-btn:not(.dis)');label='클릭으로 모임 생성';}
  if(step==='1'&&scr==='meeting'){target=screen.querySelector('.a-req [onclick*="reqAct"][onclick$=",1)"]');label='클릭으로 참여 승인';}
  if(step==='2'&&scr==='meeting'){target=screen.querySelector('.a-cta .a-btn');label='클릭으로 채팅방 이동';}
  if(step==='2'&&scr==='chat'){var input=screen.querySelector('#cmp');target=input&&input.value.trim()?screen.querySelector('.a-compose button'):input;label=input&&input.value.trim()?'클릭으로 메시지 전송':'메시지 입력 후 전송';}
  if(step==='3'&&scr==='chat'&&device.getAttribute('data-chat-replied')==='true'){target=screen.querySelector('.a-bk');label='답장 확인 후 홈 이동';}
  if(active&&active!==target){active.removeAttribute('data-starter-target');active=null;}
  if(!target){cue.hidden=true;return;}
  if(active!==target){active=target;active.setAttribute('data-starter-target','');
   if(!target.matches('button,a,input')){target.setAttribute('role','button');target.tabIndex=0;target.onkeydown=function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();this.click();}};}
  }
  var r=target.getBoundingClientRect(),d=device.getBoundingClientRect();var displayScale=d.width/device.offsetWidth;
  if(step==='3')target.setAttribute('aria-label','홈에서 결과 확인');
  if(r.bottom>d.bottom||r.top<d.top+35){cue.hidden=true;return;}
  var key=step+':'+scr;
  if(key!==stepKey){stepKey=key;cue.querySelectorAll('.starter-cue-ring,.starter-cue-cursor').forEach(function(el){el.style.animation='none';void el.offsetWidth;el.style.animation='';});}
  var x=(r.left-d.left+r.width/2)/displayScale;cue.hidden=false;cue.style.left=x+'px';cue.style.top=((r.top-d.top+r.height/2)/displayScale)+'px';
  cue.querySelector('.starter-cue-label').style.left=(Math.max(105,Math.min(device.offsetWidth-105,x))-x)+'px';
  cue.classList.toggle('below',(r.top-d.top)/displayScale<110);cue.querySelector('.starter-cue-label').textContent=label;
 }
 function schedule(){if(!pending){pending=true;requestAnimationFrame(locate);}}
 new MutationObserver(schedule).observe(screen,{childList:true,subtree:true});
 new MutationObserver(schedule).observe(device,{attributes:true,attributeFilter:['data-step','data-scr','data-guide','data-chat-replied']});
 screen.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);
 // A pointer represents guidance only. All prototype actions remain visitor-triggered.
 screen.addEventListener('pointerdown',function(){cue.hidden=true;},{passive:true});
 
 screen.addEventListener('input',schedule);locate();
})();

})();
