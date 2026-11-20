/* Browser-local prototype replies. No model API or external messaging connection. */
(function(root,factory){
 const api=factory();
 if(typeof module==='object'&&module.exports)module.exports=api;
 else root.StarterDemoReplies=api;
})(globalThis,function(){
 'use strict';
 function normalize(message){return String(message||'').normalize('NFKC').toLowerCase().replace(/\s+/g,'');}
 function delayLabel(text){
  const range=text.match(/(\d{1,3})(?:~|-|에서)(\d{1,3})분/);if(range)return range[1]+'~'+range[2]+'분';
  const hours=text.match(/(\d{1,2}(?:\.\d+)?)시간/);if(hours)return hours[1]+'시간';
  const minutes=text.match(/(\d{1,3})분/);if(minutes)return minutes[1]+'분';
  for(const [word,value] of [['한시간','1시간'],['반시간','30분'],['삼십분','30분'],['이십분','20분'],['십오분','15분'],['십분','10분'],['오분','5분']])if(text.includes(word))return value;
  return '조금';
 }
 function intentOf(text,raw){
  if(/취소(?:안|하지않)|늦지않|안늦|제시간에도착|정시에도착/.test(text))return 'ontime';
  if(/취소|못갈|못가요|못가겠|참여못|참석못|불참|빠질|안갈/.test(text))return 'cancel';
  if(/늦|지각|지연/.test(text))return 'late';
  if(/길.{0,8}잃|헤매|못찾|안보여|어느쪽|입구|출구|찾기어려/.test(text))return 'location';
  if(/몇시|언제|일정잡기/.test(text))return 'time';
  if(/아직.{0,10}출발|출발.{0,8}(못|안했|안됐)|안.{0,4}출발/.test(text))return 'preparing';
  if(/아직.{0,10}도착|도착.{0,8}(못|안했|안됐)|안.{0,4}도착|못.{0,4}도착/.test(text))return 'enroute';
  if(/도착(예정|할|하려|하면|해도|하기)|\d+(분|시간)(후|뒤)|가는중|가고있|이동중|출발|곧갈/.test(text))return 'enroute';
  if(/도착|다왔|와있|왔어요|왔습니다/.test(text))return 'arrived';
  if(/위치|장소|어디|어딜|어딨|만나는곳|만날곳|주소|지도/.test(text))return 'location';
  if(/날씨|비가.{0,6}오|비오|우천|눈오|더워|추워|미세먼지/.test(text))return 'weather';
  if(/초보|처음|처음이|잘못해|못뛰|느려|페이스|몇키로|몇킬로|몇km|얼마나뛰|속도/.test(text))return 'beginner';
  if(/준비물|뭘가져|물챙|생수|운동화|복장|라켓|장비|신발|물은|물도|물필요|뭐챙/.test(text))return 'gear';
  if(/지하철|버스|택시|주차|차로|대중교통|걸어|도보|운전/.test(text))return 'transport';
  if(/몇시|언제|일정|일자|날짜|시간|일정잡기/.test(text))return 'time';
  if(/친구|같이가도|데려|초대|자리|정원|몇명|인원/.test(text))return 'invite';
  if(/누구|이름|챗봇|봇이|사람이야|너ai/.test(text))return 'identity';
  if(/배고|밥|식사|먹을|커피|카페|뒤풀이/.test(text))return 'food';
  if(/피곤|힘들|긴장|떨려|걱정/.test(text))return 'comfort';
  if(/고마|감사|수고/.test(text))return 'thanks';
  if(/안녕|반가|하이|ㅎㅇ|hello|^hi[!.~]*$/.test(text))return 'greeting';
  if(/싫어|별로|아니야|그건아니|불편/.test(text))return 'concern';
  if(/^(네|넵|넹|응|웅|예|ㅇㅇ|ㅇㅋ|오케이|ok|okay|좋아|알겠|확인|그래)/.test(text))return 'affirm';
  if(/ㅋㅋ|ㅎㅎ|재밌|신나|기대|최고|좋다|👍|😊|😄/.test(text))return 'positive';
  if(/[?？]/.test(raw)||/어떻게|왜|뭐|궁금|알려|가능/.test(text))return 'question';
  return 'general';
 }
 function poolFor(topic,c){
  const {place,when,delay}=c;
  const pools={
   location:place?[
    `모임 장소는 ‘${place}’입니다. 근처에 도착하면 채팅 남겨주세요!`,
    `${place}에서 만나요. 찾기 어려우면 주변 표지판을 알려주세요.`,
    `만나는 곳은 ${place}입니다. 도착하신 위치도 글로 알려주시면 좋아요.`,
    `${place} 쪽으로 오시면 돼요. 출발 전에 장소 이름을 한 번 더 확인해 주세요.`,
    `정해진 장소는 ‘${place}’입니다. 근처에서 서로 알아볼 수 있게 메시지 남겨요.`,
    `모임은 ${place}에서 만나요. 어느 쪽에 계신지 알려주시면 합류하기 편해요.`
   ]:[
    '만나는 장소부터 함께 정해볼까요? 이동하기 편한 곳을 알려주세요.',
    '아직 이 대화에 정해진 장소가 없어요. 어느 지역이 편하세요?',
    '장소 이름이나 가까운 역을 알려주시면 약속을 정하기 좋겠어요.',
    '서로 찾기 쉬운 곳으로 정해요. 생각해 두신 장소가 있나요?'
   ],
   late:[
    `${delay} 정도 늦으시는군요. 괜찮아요, 서두르지 말고 조심히 오세요!`,
    `${delay} 늦는다고 알려주셔서 고마워요. 도착하면 한 번 더 메시지 주세요.`,
    `알겠어요! ${delay} 정도 여유 두고 기다릴게요. 안전하게 오세요.`,
    `${delay} 정도면 괜찮아요. 무리해서 뛰어오지 않으셔도 돼요 😊`,
    `네, ${delay} 늦는 걸로 알고 있을게요. 도착하시면 같이 시작해요.`,
    `${delay} 정도 늦어도 너무 걱정하지 마세요. 도착할 때 채팅 남겨주세요.`
   ],
   arrived:[
    `도착하셨군요!${place?' '+place+' 근처에서':''} 어느 쪽에 계신지 알려주시면 같이 만나요.`,
    '잘 도착하셨네요! 주변에 보이는 표지판이나 옷차림을 알려주실래요?',
    '오셨군요, 반가워요! 서로 알아볼 수 있게 계신 곳을 채팅으로 남겨주세요.',
    '도착 메시지 확인했어요. 정확히 어느 쪽에서 기다리고 계세요?',
    '잘 도착하셨어요! 이제 서로 합류하면 되겠네요 😊',
    '도착하셨다니 좋네요. 눈에 띄는 표지판 쪽에서 만나면 찾기 편하겠어요.'
   ],
   enroute:[
    '이동 중이시군요. 천천히 조심히 오시고, 도착하면 한 번 더 알려주세요.',
    '아직 오는 중이군요! 서두르지 마시고 도착할 때 메시지 주세요.',
    `오는 길 확인했어요.${place?' '+place+'에':''} 도착하면 서로 합류해요.`,
    '출발 소식 고마워요. 길 찾기 어려우면 장소를 다시 물어보셔도 돼요.',
    '안전하게 오세요! 도착하신 뒤에 주변 위치를 알려주시면 좋겠어요.'
   ],
   preparing:[
    '아직 출발 전이군요. 준비되시면 조심히 오시고 예상 시간을 알려주세요.',
    '출발이 어려우시면 무리하지 마세요. 일정이 달라지는지 먼저 알려주세요.',
    '준비가 되면 다시 메시지 주세요. 도착 예상 시간을 함께 맞춰봐요.',
    '아직 이동 전이라면 여유 있게 준비하세요. 늦어질 것 같으면 미리 알려주세요.'
   ],
   ontime:[
    '좋아요, 시간에 맞춰 만나면 되겠네요. 이동 조심히 하세요!',
    '알려주셔서 고마워요. 도착하시면 채팅으로 인사 나눠요.',
    '네, 약속한 시간에 함께 시작해요!'
   ],
   time:when?[
    `현재 모임 일정은 ${when}입니다. 그 시간에 맞춰 만나요!`,
    `모임 일정은 ${when}입니다. 변경이 필요하면 채팅으로 같이 얘기해요.`,
    `모임 화면에 적힌 시간은 ${when}입니다. 출발 전에 한 번 확인해 주세요.`,
    `우선 ${when}에 만나는 일정이에요. 가능한지 알려주실래요?`,
    `${when} 일정으로 생각하고 있어요. 시간이 애매하면 미리 말씀해 주세요.`
   ]:[
    '아직 정해진 일정이 없네요. 가능한 요일이나 시간을 먼저 알려주실래요?',
    '서로 편한 시간을 맞춰봐요. 평일 저녁과 주말 중 언제가 좋아요?',
    '일정을 잡으려면 가능한 시간대부터 나누면 좋겠어요.'
   ],
   beginner:[
    '처음이어도 괜찮아요. 무리하지 않는 속도로 함께 맞춰가요!',
    '실력보다 편하게 함께하는 게 중요하죠. 부담 없이 참여해 주세요 😊',
    '거리나 페이스는 아직 세부적으로 정하지 않았어요. 편한 수준을 같이 얘기해요.',
    '천천히 시작해도 좋아요. 처음이라고 미리 알려주셔서 고마워요.',
    '괜찮아요! 힘들면 중간에 쉬면서 각자 편한 페이스로 맞춰요.'
   ],
   gear:[
    '편한 복장과 필요한 개인 장비를 챙겨주세요. 물도 있으면 좋겠어요.',
    '개인 준비물부터 챙기시면 돼요. 필요한 장비가 따로 있는지는 모임에서 같이 확인해요.',
    '활동하기 편한 신발과 물을 준비하면 좋겠어요. 궁금한 준비물이 있나요?',
    '너무 많이 챙기기보다는 활동에 꼭 필요한 것부터 준비해요.',
    '준비물은 함께 한 번 더 확인해봐요. 따로 필요한 물건이 있으면 알려주세요.'
   ],
   weather:[
    '날씨는 출발 전에 최신 예보를 한 번 확인해봐요. 비가 오면 일정도 같이 조정해요.',
    '실제 날씨를 이 채팅에서 확인한 건 아니에요. 우천 시에는 장소나 일정을 다시 얘기하면 좋겠어요.',
    '야외 활동이면 날씨가 중요하죠. 예보를 확인한 뒤 채팅으로 함께 정해요.',
    '날씨가 좋지 않으면 무리하지 않기로 해요. 출발 전에 다시 확인해 주세요.'
   ],
   transport:[
    '편한 교통편으로 오세요. 도착 시간이 달라지면 미리 알려주시면 좋아요.',
    '이동 조심히 하세요! 주차나 교통 상황은 출발 전에 확인해 주세요.',
    `${place?'목적지는 ‘'+place+'’입니다. ':''}오는 길이 헷갈리면 장소를 다시 확인해봐요.`,
    '서두르지 않으셔도 돼요. 근처에 도착하면 채팅으로 연락해요.'
   ],
   invite:[
    '함께할 사람이 있군요! 모임의 남은 자리부터 확인하고 같이 정해요.',
    '인원을 먼저 확인해보면 좋겠어요. 추가로 몇 분이 함께하실 예정인가요?',
    '초대 전에 모임 정원을 같이 확인해요. 인원이 맞으면 더 즐겁겠네요.',
    '좋아요. 모임 화면에서 참여 인원을 확인한 뒤 함께 얘기해봐요.'
   ],
   cancel:[
    '이번에는 참여가 어려우시군요. 알려주셔서 고마워요. 다음 기회에 함께해요.',
    '일정이 바뀌셨군요. 괜찮아요, 참여 상태도 모임 화면에서 확인해 주세요.',
    '미리 말씀해 주셔서 고마워요. 다음에 편한 일정으로 다시 만나요.',
    '아쉽지만 무리하지 마세요. 다음 모임에서 함께하면 좋겠어요.'
   ],
   thanks:[
    '별말씀을요! 편하게 이야기 나눠요 😊',
    '저도 고마워요. 모임에서 즐겁게 만나요!',
    '도움이 됐다니 다행이에요. 궁금한 게 있으면 더 물어보세요.',
    '함께 맞춰가면 되죠. 편하게 말씀해 주세요!',
    '고마워요! 서로 배려하면서 즐겁게 참여해요.'
   ],
   greeting:[
    '반가워요! 오늘 모임에서 함께하게 됐네요 😊',
    '안녕하세요! 궁금한 일정이나 장소가 있으면 편하게 물어보세요.',
    '안녕하세요, 만나서 반가워요. 오늘 모임 기대돼요!',
    '반가워요! 처음 오시는 모임인가요?',
    '안녕하세요! 오시는 길이나 준비물도 편하게 얘기해요.',
    '어서 오세요 😊 함께할 수 있어 좋네요.'
   ],
   identity:[
    '지금은 메이트업 프로토타입의 예시 대화예요. 모임 시간이나 장소를 물어보셔도 좋아요.',
    '실제 상대와 연결된 채팅은 아니고, 메이트업의 대화 흐름을 체험하는 화면이에요.',
    '이 화면에서는 모임 참여자와 나누는 예시 대화를 체험할 수 있어요.'
   ],
   food:[
    '활동 뒤에 간단히 먹을지 같이 얘기해봐요. 선호하는 메뉴가 있나요?',
    '배고프면 힘들죠! 무리하지 않게 간단히 챙겨 드시고 오세요.',
    '모임 끝나고 가볍게 커피 한 잔도 좋겠네요. 다른 분들 의견도 들어봐요.',
    '좋은 생각이에요. 식사나 카페는 모임 일정에 맞춰 함께 정해요.'
   ],
   comfort:[
    '처음엔 긴장될 수 있죠. 편하게 오셔도 괜찮아요 😊',
    '무리하지 마세요. 컨디션에 맞춰 쉬면서 함께해요.',
    '편하게 말씀해 주세요. 각자 가능한 만큼 즐기면 좋겠어요.',
    '괜찮아요. 부담 갖지 말고 천천히 맞춰가요.'
   ],
   concern:[
    '그럴 수 있죠. 어떤 방식이 더 편한지 알려주실래요?',
    '의견 알려주셔서 고마워요. 다른 방법도 같이 생각해봐요.',
    '편한 방향으로 맞춰가요. 어떤 점이 불편했는지 말씀해 주세요.',
    '알겠어요. 원하시는 쪽을 조금 더 구체적으로 얘기해볼까요?'
   ],
   positive:[
    'ㅎㅎ 저도 기대돼요! 즐겁게 함께해요 😊',
    '좋아요! 편하게 이야기 나누면서 맞춰가요.',
    '기분 좋은 모임이 되면 좋겠네요. 만나서 더 얘기해요!',
    '저도요 😊 함께하면 더 즐겁겠네요.',
    '분위기 좋네요! 모임에서 반갑게 인사해요.'
   ],
   affirm:[
    '좋아요! 더 궁금한 게 있으면 편하게 말씀해 주세요.',
    '네, 그렇게 맞춰가요. 도착할 때 다시 인사해요!',
    '알겠어요 😊 함께 즐겁게 참여해요.',
    '좋습니다! 필요한 내용은 채팅으로 이어서 얘기해요.'
   ],
   question:[
    '어떤 부분이 가장 궁금하세요? 모임 시간, 장소, 준비물부터 같이 확인해봐요.',
    '질문을 조금 더 구체적으로 알려주실래요? 가능한 범위에서 같이 정리해봐요.',
    '모임과 관련해서 궁금하신 내용인가요? 어떤 점인지 조금 더 얘기해 주세요.',
    '제가 놓친 맥락이 있을 수 있어요. 무엇을 확인하고 싶으신가요?',
    '시간이나 장소처럼 구체적으로 물어보시면 함께 확인하기 좋아요.'
   ],
   general:[
    '메시지 잘 봤어요! 모임에서 어떤 활동을 가장 기대하고 계세요?',
    '그렇군요 😊 더 나누고 싶은 이야기가 있으면 편하게 말씀해 주세요.',
    '편하게 이야기 나눠요. 오시는 길은 괜찮으세요?',
    '말씀해 주셔서 고마워요. 준비하면서 궁금한 점도 함께 얘기해요.',
    '좋아요. 모임에서 만나면 더 자세히 얘기해봐요!',
    '함께 맞춰가면 좋겠네요. 모임에 오시는 건 처음이세요?',
    '이야기 들었어요. 혹시 미리 확인할 일정이나 준비물이 있나요?',
    '편하게 참여해 주세요. 따로 원하는 활동이 있으면 알려주세요.',
    '서로 얘기 나누면서 정해봐요. 어떤 방식이 가장 편하세요?',
    '네 😊 필요한 내용은 이 채팅에서 계속 이야기해요.'
   ]
  };
  return pools[topic]||pools.general;
 }
 function createResponder(options={}){
  const random=options.random||Math.random,rooms=new Map();
  function shuffled(length){
   const bag=Array.from({length},(_,i)=>i);
   for(let i=bag.length-1;i>0;i--){const n=Math.max(0,Math.min(.999999,Number(random())||0));const j=Math.floor(n*(i+1));[bag[i],bag[j]]=[bag[j],bag[i]];}
   return bag;
  }
  return function reply({message,chatId='demo',meeting=null}={}){
   const raw=String(message||''),text=normalize(raw);
   if(!rooms.has(chatId))rooms.set(chatId,{topic:'',lastReply:'',bags:new Map()});
   const state=rooms.get(chatId),detected=intentOf(text,raw);
   const context={place:meeting&&meeting.place||'',when:meeting&&meeting.when||'',delay:delayLabel(text)};
   let topic=detected,bagKey=detected;
   if(detected==='affirm'&&['location','time','late','arrived','enroute'].includes(state.topic)){
    topic=state.topic;bagKey='followup:'+topic;
    if(topic==='late')context.delay=state.delay||'조금';
   }
   const pool=poolFor(topic,context);
   let bag=state.bags.get(bagKey);if(!bag||!bag.length||bag.some(i=>i>=pool.length)){bag=shuffled(pool.length);state.bags.set(bagKey,bag);}
   let index=bag.pop();
   if(pool[index]===state.lastReply&&bag.length){const alternate=bag.pop();bag.push(index);index=alternate;}
   const answer=pool[index];state.lastReply=answer;
   if(detected!=='affirm'){state.topic=detected;if(detected==='late')state.delay=context.delay;}
   return answer;
  };
 }
 return {createResponder};
});
