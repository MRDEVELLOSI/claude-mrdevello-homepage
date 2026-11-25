(function(){
  var el=document.querySelector('.q2-left-in'); if(!el) return;
  function fit(){ if(innerWidth<1101){el.style.removeProperty('top');return;}
    var t=Math.min(96, innerHeight-el.offsetHeight-24); el.style.setProperty('top',t+'px','important'); }
  addEventListener('resize',fit); addEventListener('load',fit); fit();
})();
