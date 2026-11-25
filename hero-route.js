/* 메인 상단 '상담하기' → 선택한 성격(개발·운영·확장)과 주제에 맞는 SERVICE 상품 페이지로 안내 */
(function(){
  var form=document.querySelector('.devello-project-form'); if(!form) return;
  var MAP=[
    {def:'/mr-pro/',   topics:['/mr-pro/','/mr-starter/','/mr-pro/','/mr-pro/','/mr-pro/']},          // 개발: 외주·기획프로토·웹앱·정부지원MVP·쇼핑몰
    {def:'/mr-team/',  topics:['/mr-team/','/mr-team/','/mr-check/','/mr-check/','/mr-team/']},       // 운영: 유지보수·장애·보안점검·서버인프라·성능
    {def:'/mr-booster/',topics:['/mr-booster/','/mr-booster/','/mr-booster/','/mr-team/','/mr-team/']} // 확장: AX·자동화·AI도입·개발팀구독·고도화
  ];
  document.addEventListener('click',function(e){
    var btn=e.target.closest&&e.target.closest('.devello-brief-submit'); if(!btn) return;
    var mode=+(form.dataset.mode||0); var m=MAP[mode]||MAP[0];
    var on=document.querySelector('.devello-brief-topics button[aria-pressed="true"]');
    var url=on?(m.topics[+on.dataset.briefTopic]||m.def):m.def;
    try{var f=document.getElementById('project-brief');if(f&&f.value&&f.value!==f.placeholder)sessionStorage.setItem('mrd-brief',f.value);}catch(_){}
    e.preventDefault(); location.href=url;
  });
})();
