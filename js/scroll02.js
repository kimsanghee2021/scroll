const sections  = document.querySelectorAll('section');
const ul = document.querySelector('ul');
const btns = ul.querySelectorAll('ul li');
const btnsArr = Array.from(btns); //유사 배열 객체를 배열로 변경해주는 기능 
let posArr = [];

//각 섹션의 offsetTop값 구해서 빈배열에 담기
for(const sec of sections) posArr.push(sec.offsetTop);


//각각 li 버튼을 눌럿을때 일어나는 일
btns.forEach((el,idx)=>{
    el.addEventListener('click', e =>{
        new Animate(window,{
            prop : 'scroll',
            value : posArr[idx],
            duration : 500
        });

    });
});

//윈도우에서 스크롤 햇을 시 일어나는 일 
window.addEventListener('scroll',function(){
    const scroll = window.scrollY;
    console.log(scroll);
    sections.forEach((sec,idx)=>{
        if(scroll >= posArr[idx]){
            for(const btn of btns){
                btn.classList.remove('on');
                btns[idx].classList.add('on');
            }

            for(const sec of sections){
                sec.classList.remove('on');
                sections[idx].classList.add('on');
            }   
        }
    });
});