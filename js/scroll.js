/*
    DOM.offsetTop : 전체문서에 해당 DOM요소의 세로 위치값 (정적)
    window.scrollY : 브라우저의 현재 스크롤 거리값(동적)
*/
const sections= document.querySelectorAll('section');
const ul = document.querySelector('ul');
const lis = document.querySelectorAll('ul li'); 
const lis_arr = Array.from(lis);//유사배열을 순수배열로 변환
let posArr = null;

//로딩이벤트 - posArr값을 받아오기 위해서
setPos();

//window.resize 일어낫을떄
window.addEventListener('resize', () => {
    setPos();
    //사이즈를 조정해도 현재의 위치값에 고정
    const active = ul.querySelector('li.on');
    const activeIndex = lis_arr.indexOf(active);  
    window.scroll(0,posArr[activeIndex]); 
});

//각각 li 버튼을 눌럿을때 일어나는 일
lis.forEach(function(li,idx){
    li.addEventListener('click',function(e){
        e.preventDefault();
        movescroll(idx);
    });
});

//window.scroll이 일어났을때 할 일
window.addEventListener('scroll',activation);

function setPos(){
    posArr = [];
    for(const sec of sections) posArr.push(sec.offsetTop);
}

function activation(){
    //section.forEach를 쓰는이유는 posArr[idx]를 가져오기위함이다.
    let scroll = window.scrollY || window.pageYOffset;
    sections.forEach(function(sec,idx){
        if(scroll >= posArr[idx]){
            for(const li of lis){
                li.classList.remove('on');
                lis[idx].classList.add('on');
            }
            for(const section of sections){
                section.classList.remove('on');
                sec.classList.add('on');
            }
        }
    });
}
function movescroll(idx){
    new Animate(window,{
        prop : 'scroll',
        value : posArr[idx],
        duration : 500
    });
}





