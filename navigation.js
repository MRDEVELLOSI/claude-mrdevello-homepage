(()=>{
 'use strict';
 const header=document.getElementById('contentful-header');
 const nav=document.getElementById('devello-primary-nav');
 const toggle=header.querySelector('.devello-menu-toggle');
 const groups=[...nav.querySelectorAll('details')];
 const desktop=matchMedia('(min-width:1024px)');
 const hover=matchMedia('(hover:hover) and (pointer:fine)');
 const hoverOpened=new WeakSet();
 const leaveTimers=new WeakMap();
 let previousOverflow='';
 function closeGroups(except){groups.forEach(group=>{if(group!==except)group.open=false;});}
 function setMobileOpen(open){
  const wasOpen=toggle.getAttribute('aria-expanded')==='true';
  header.classList.toggle('devello-menu-open',open);
  toggle.setAttribute('aria-expanded',String(open));
  toggle.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기');
  if(open&&!wasOpen){previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';}
  if(!open){if(wasOpen)document.body.style.overflow=previousOverflow;closeGroups();}
 }
 toggle.addEventListener('click',()=>setMobileOpen(toggle.getAttribute('aria-expanded')!=='true'));
 groups.forEach(group=>{
  group.addEventListener('pointerenter',event=>{
   clearTimeout(leaveTimers.get(group));
   if(!desktop.matches||!hover.matches||event.pointerType==='touch')return;
   if(!group.open)hoverOpened.add(group);
   closeGroups(group);group.open=true;
  });
  group.addEventListener('pointerleave',()=>{
   if(!desktop.matches||!hover.matches)return;
   leaveTimers.set(group,setTimeout(()=>{
    if(!group.contains(document.activeElement)){group.open=false;hoverOpened.delete(group);}
   },140));
  });
  group.querySelector('summary').addEventListener('click',event=>{
   if(hoverOpened.has(group)&&event.detail>0){event.preventDefault();hoverOpened.delete(group);}
  });
  group.addEventListener('toggle',()=>{if(group.open)closeGroups(group);});
  group.querySelector('summary').addEventListener('keydown',event=>{
   if(event.key==='ArrowDown'){event.preventDefault();closeGroups(group);group.open=true;group.querySelector('.devello-nav-leaf').focus();}
  });
 });
 header.querySelectorAll('button:not(.devello-menu-toggle)').forEach(button=>button.addEventListener('click',()=>{
  const summary=button.closest('details')?.querySelector('summary');
  const mobileOpen=toggle.getAttribute('aria-expanded')==='true';
  setMobileOpen(false);
  if(mobileOpen)toggle.focus();else summary?.focus();
 }));
 document.addEventListener('click',event=>{if(!header.contains(event.target))setMobileOpen(false);});
 document.addEventListener('focusin',event=>{if(desktop.matches&&!nav.contains(event.target))closeGroups();});
 document.addEventListener('keydown',event=>{
  if(event.key!=='Escape')return;
  const group=groups.find(item=>item.open);
  if(group){group.open=false;group.querySelector('summary').focus();}
  else if(toggle.getAttribute('aria-expanded')==='true'){setMobileOpen(false);toggle.focus();}
 });
 desktop.addEventListener('change',()=>setMobileOpen(false));
})();
