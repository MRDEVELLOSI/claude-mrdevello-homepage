(()=>{'use strict';
 const tabs=[...document.querySelectorAll('.work-tabs [role="tab"]')];
 const select=(tab,focus=false)=>{tabs.forEach(item=>{const on=item===tab;item.setAttribute('aria-selected',String(on));item.tabIndex=on?0:-1;document.getElementById(item.getAttribute('aria-controls')).hidden=!on;});if(focus)tab.focus();};
 tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>select(tab));tab.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=(index+1)%tabs.length;else if(event.key==='ArrowLeft')next=(index-1+tabs.length)%tabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;else return;event.preventDefault();select(tabs[next],true);});});
})();
