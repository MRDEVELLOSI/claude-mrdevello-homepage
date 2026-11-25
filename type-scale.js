/*
 * MR.DEVELLO 타이포 스케일 — 전 페이지 공통 (짝수 px만 사용)
 *
 *            PC(≥1024)   태블릿(768~1023)   모바일(<768)
 * 메인타이틀1   96 / 700      64 / 700          34 / 700   (페이지 히어로)
 * 메인타이틀2   64 / 700      48 / 700          30 / 700   (서브 히어로·대표 숫자)
 * 메인타이틀3   40 / 650      32 / 650          26 / 650   (섹션 제목)
 * 서브타이틀1   32 / 650      26 / 650          22 / 650   (소제목·강조 문장)
 * 서브타이틀2   24 / 700      22 / 700          18 / 700   (카드 제목)
 * 서브타이틀3   20 / 700      18 / 700          16 / 700   (작은 제목·리드)
 * 본문1         18            16                16         (리드 본문)
 * 본문2         16            14                14         (기본 본문)
 * 본문3         14            12                12         (캡션·라벨)
 * 본문 굵기: 400 / 600 / 700 세 단계만 사용
 */
(function(){
  var SCALE={
    pc:{t1:96,t2:64,t3:40,s1:32,s2:24,s3:20,b1:18,b2:16,b3:14},
    tb:{t1:64,t2:48,t3:32,s1:26,s2:22,s3:18,b1:16,b2:14,b3:12},
    mb:{t1:34,t2:30,t3:26,s1:22,s2:18,s3:16,b1:16,b2:14,b3:12}
  };
  // 현재 크기 → 역할 (브레이크포인트별 경계)
  var RULE={
    pc:[[80,'t1'],[52,'t2'],[36,'t3'],[28,'s1'],[22,'s2'],[19,'s3'],[17,'b1'],[15,'b2'],[11,'b3']],
    tb:[[56,'t1'],[40,'t2'],[30,'t3'],[24,'s1'],[20,'s2'],[17,'s3'],[16,'b1'],[14,'b2'],[11,'b3']],
    mb:[[30,'t1'],[28,'t2'],[25,'t3'],[21,'s1'],[18,'s2'],[17,'s3'],[16,'b1'],[14,'b2'],[11,'b3']]
  };
  var TW={t1:700,t2:700,t3:650,s1:650,s2:700,s3:700};
  var SKIP='script,style,noscript,svg,svg *,code,pre,.service-report,.service-report *,[data-ts-skip],[data-ts-skip] *';
  var touched=[],bp='',ORIG=new WeakMap();
  function restore(el){var o=ORIG.get(el);if(!o)return;
    if(o.fs)el.style.setProperty('font-size',o.fs,o.fsp);else el.style.removeProperty('font-size');
    if(o.fw)el.style.setProperty('font-weight',o.fw,o.fwp);else el.style.removeProperty('font-weight');}
  function bpOf(){var w=innerWidth;return w>=1024?'pc':w>=768?'tb':'mb';}
  function role(px,b){var r=RULE[b];for(var i=0;i<r.length;i++){if(px>=r[i][0])return r[i][1];}return null;}
  function hasText(el){for(var n=el.firstChild;n;n=n.nextSibling){if(n.nodeType===3&&n.nodeValue.trim())return true;}return el.tagName==='INPUT'||el.tagName==='TEXTAREA'||el.tagName==='SELECT';}
  function apply(el){
    if(el.matches(SKIP))return;
    if(ORIG.has(el))restore(el);else ORIG.set(el,{fs:el.style.getPropertyValue('font-size'),fsp:el.style.getPropertyPriority('font-size'),fw:el.style.getPropertyValue('font-weight'),fwp:el.style.getPropertyPriority('font-weight')});
    if(el.tagName!=='H1'&&el.closest('h1')){if(!ORIG.has(el))ORIG.set(el,{fs:el.style.getPropertyValue('font-size'),fsp:el.style.getPropertyPriority('font-size'),fw:el.style.getPropertyValue('font-weight'),fwp:el.style.getPropertyPriority('font-weight')});
      el.style.setProperty('font-size','inherit','important');el.style.setProperty('font-weight','inherit','important');if(!el.hasAttribute('data-ts')){el.setAttribute('data-ts','');touched.push(el);}return;}
    if(el.tagName!=='H1'&&!hasText(el))return;
    var cs=getComputedStyle(el),px=parseFloat(cs.fontSize),fw=parseInt(cs.fontWeight,10)||400;
    if(!px)return;
    var size,weight,r=el.getAttribute('data-ts-role')||role(px,bp);
    if(el.tagName==='H1'||el.closest('h1')){if(r!=='t1')r='t2';}else if(r==='t1'){r='t2';}  // 96은 페이지 제목 전용  // 페이지 제목은 최소 메인타이틀2
    if(!r){size=Math.max(8,Math.round(px/2)*2);weight=fw<=300?fw:fw<550?400:fw<750?600:700;}            // 11px 미만(목업 속 아주 작은 글자): 가장 가까운 짝수
    else{size=SCALE[bp][r];
      if(TW[r]){weight=fw<=300?fw:TW[r];}                    // 제목류: 역할 굵기 (얇은 장식 글자는 유지)
      else{weight=fw<=300?fw:fw<550?400:fw<750?600:700;}      // 본문류: 400/600/700 세 단계
    }
    el.style.setProperty('font-size',size+'px','important');
    if(weight)el.style.setProperty('font-weight',String(weight),'important');
    if(!el.hasAttribute('data-ts')){el.setAttribute('data-ts','');touched.push(el);}
  }
  function reset(){touched.forEach(function(el){restore(el);el.removeAttribute('data-ts');});touched=[];}
  function run(root){
    var list=(root||document.body).querySelectorAll('*');
    for(var i=0;i<list.length;i++)apply(list[i]);
    if(root&&root.nodeType===1)apply(root);
  }
  function all(){bp=bpOf();reset();run(document.body);document.documentElement.classList.remove('ts-pending');}
  var pend=null,queue=[];
  var mo=new MutationObserver(function(ms){ms.forEach(function(m){m.addedNodes.forEach(function(n){if(n.nodeType===1&&!n.hasAttribute('data-ts'))queue.push(n);});});
    if(!pend)pend=requestAnimationFrame(function(){pend=null;var q=queue;queue=[];q.forEach(function(n){if(n.isConnected)run(n);});});});
  function start(){all();
    addEventListener('load',function(){run(document.body);});setTimeout(function(){run(document.body);},1600);mo.observe(document.body,{childList:true,subtree:true});
    var last=bpOf();addEventListener('resize',function(){var b=bpOf();if(b!==last){last=b;all();}});
    if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
  window.MRTypeScale={scale:SCALE,rerun:all};
})();
