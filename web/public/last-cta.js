(function(){
  var root=document.getElementById('last-cta'); if(!root) return;
  var btns=[].slice.call(root.querySelectorAll('.ls-svc')), dets=[].slice.call(root.querySelectorAll('.ls-det'));
  btns.forEach(function(b,i){ b.addEventListener('click',function(){
    btns.forEach(function(o,j){ var on=j===i; o.classList.toggle('is-on',on); o.setAttribute('aria-pressed',String(on)); });
    dets.forEach(function(d,j){ d.hidden=j!==i; });
  }); });
})();
