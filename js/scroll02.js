const sections  = document.querySelectorAll('section');
const ul = document.querySelector('ul');
const btns = ul.querySelectorAll('ul li');
const btnsArr = Array.from(btns); //유사 배열 객체를 배열로 변경해주는 기능 
let posArr = [];


for(const sec of sections) posArr.push(sec.offsetTop);


//각각 li 버튼을 눌럿을때 일어나는 일
btns.forEach(function(el,idx){
    el.addEventListener('click',function(){
        new Animate(window,{
            prop : 'scroll',
            value : posArr[idx],
            duration : 500
        });
    });
});
