(()=>{
'use strict';
const form=document.querySelector('.q2-form');
if(!form)return;
const byName=name=>form.elements.namedItem(name);
// 상품 선택 (복수)
const prods=[...form.querySelectorAll('[data-product]')];
const syncProducts=()=>{
 byName('products').value=prods.filter(b=>b.getAttribute('aria-pressed')==='true').map(b=>b.dataset.product).join(', ');
 if(byName('products').value){document.getElementById('error-products').hidden=true;}
};
prods.forEach(b=>b.addEventListener('click',()=>{b.setAttribute('aria-pressed',String(b.getAttribute('aria-pressed')!=='true'));syncProducts();}));
// ?product=pro,team 처럼 들어오면 미리 선택
try{const want=(new URLSearchParams(location.search).get('product')||'').toLowerCase().split(',').map(s=>s.trim().replace(/^mr\./,'')).filter(Boolean);
 prods.forEach(b=>{if(want.includes(b.dataset.key))b.setAttribute('aria-pressed','true');});syncProducts();}catch(e){}
// 유입 경로
const sources=[...form.querySelectorAll('[data-source]')];
sources.forEach(button=>button.addEventListener('click',()=>{
 const value=button.getAttribute('aria-pressed')==='true'?'':button.dataset.source;
 sources.forEach(item=>item.setAttribute('aria-pressed',String(item.dataset.source===value)));
 byName('source').value=value;
 const other=document.getElementById('other-source');
 other.hidden=value!=='기타';
 if(value==='기타')byName('otherSource').focus();
 else{byName('otherSource').removeAttribute('aria-invalid');document.getElementById('error-otherSource').hidden=true;}
}));
byName('description').addEventListener('input',()=>document.getElementById('description-count').textContent=byName('description').value.length.toLocaleString()+'자');
const messages={products:'문의할 상품을 하나 이상 골라주세요. 잘 모르겠다면 ‘기타’를 골라주세요.',name:'이름 및 회사명 입력이 필요합니다.',email:'올바른 이메일 형식 입력이 필요합니다.',phone:'전화번호는 숫자와 하이픈으로 입력합니다.',projectBudget:'프로젝트 예산 입력이 필요합니다.',projectStartAt:'프로젝트 시작일 입력이 필요합니다.',otherSource:'유입경로 입력이 필요합니다.',term:'개인정보 수집 및 이용 동의가 필요합니다.'};
const labels={products:'문의 상품',name:'이름 및 회사명',email:'이메일',phone:'전화번호',source:'유입경로',projectBudget:'프로젝트 예산',projectStartAt:'프로젝트 시작일',description:'프로젝트 설명'};
let reviewedText='';
form.addEventListener('input',()=>{document.getElementById('inquiry-review').hidden=true;});
form.addEventListener('submit',event=>{
 event.preventDefault();let firstInvalid;
 for(const name of Object.keys(messages)){
  const input=byName(name);
  const invalid=name==='products'?!input.value:name==='otherSource'?byName('source').value==='기타'&&!input.value.trim():name==='term'?!input.checked:!input.value.trim()||!input.validity.valid;
  const error=document.getElementById('error-'+name);
  error.textContent=invalid?messages[name]:'';error.hidden=!invalid;
  if(name==='products'){if(invalid&&!firstInvalid)firstInvalid=prods[0];continue;}
  input.setAttribute('aria-invalid',String(invalid));
  if(invalid){input.setAttribute('aria-describedby',error.id);if(!firstInvalid)firstInvalid=input;}
  else input.removeAttribute('aria-describedby');
 }
 if(firstInvalid){firstInvalid.focus();firstInvalid.scrollIntoView({block:'center',behavior:'smooth'});return;}
 const values=new FormData(form),list=document.getElementById('inquiry-review-values');list.replaceChildren();
 const lines=[];
 for(const [name,label]of Object.entries(labels)){
  const value=(name==='source'&&values.get(name)==='기타'?values.get('otherSource'):values.get(name))||'미입력';
  const row=document.createElement('div'),dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=label;dd.textContent=value;row.append(dt,dd);list.append(row);lines.push(label+': '+value);
 }
 reviewedText=lines.join('\n');
 document.getElementById('inquiry-copy-status').textContent='';
 const review=document.getElementById('inquiry-review');review.hidden=false;review.focus();
});
document.getElementById('inquiry-copy').addEventListener('click',async()=>{
 const status=document.getElementById('inquiry-copy-status');
 try{await navigator.clipboard.writeText(reviewedText);status.textContent='문의 내용 복사 완료';}
 catch{status.textContent='아래 문의 내용을 선택해 직접 복사합니다.';}
});
})();
