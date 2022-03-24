const sections  = document.querySelectorAll('section');
const ul = document.querySelector('ul');
const btns = ul.querySelectorAll('ul li');
const btnsArr = Array.from(btns); //유사 배열 객체를 배열로 변경해주는 기능 
let posArr = [];

//각 섹션의 offsetTop값 구해서 빈배열에 담기
for(const sec of sections) posArr.push(sec.offsetTop);


//각각 li 버튼을 눌럿을때 일어나는 일
btns.forEach(function(el,idx){
    el.addEventListener('click',function(){

        new Animate(window,{
            prop : 'scroll',
            value : posArr[idx],
            duration : 500
        });
        for(const btn of btns){
            btn.classList.remove('on');
            btns[idx].classList.add('on');
        }

    });
});
