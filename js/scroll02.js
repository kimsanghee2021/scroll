const sections  = document.querySelectorAll('section');
const ul = document.querySelector('ul');
const btns = ul.querySelectorAll('ul li');
const btnsArr = Array.from(btns); //유사 배열 객체를 배열로 변경해주는 기능 
let posArr = null;
let enableClick = true;

//loading Evnet
resize();

//click event
btns.forEach((el,idx)=>{
    el.addEventListener('click', e =>{
        if(enableClick){
            enableClick = false;
            scrollAni(idx);
        }

    });
});

//scroll event
window.addEventListener('scroll',scrollActive);

//resize event
window.addEventListener('resize', resize);

//mouseWheel
sections.forEach(function(sec, idx){
    sec.addEventListener('mousewheel',function(e){
        e.preventDefault();
        mouseWheel();
    });
});



function scrollAni(idx){
    new Animate(window,{
        prop : 'scroll',
        value : posArr[idx],
        duration : 500,
        callback : function(){
            return  enableClick = true;
        }
    });
}
function scrollActive(){
    const scroll = window.scrollY;
    sections.forEach((sec,idx)=>{
        if(scroll >= posArr[idx]){
            for(const btn of btns){
                btn.classList.remove('on');
                btns[idx].classList.add('on');
            }

            for(const section of sections){
                section.classList.remove('on');
                sec.classList.add('on');
            }   
        }
    });
}
function resize(){ 
    //각 섹션의 offsetTop값 구해서 빈배열에 담기
    posArr = [];
    for(const sec of sections) posArr.push(sec.offsetTop);
    const active = ul.querySelector('li.on');
    const activeIdx = btnsArr.indexOf(active);
    window.scroll(0,posArr[activeIdx]); 
}
function mouseWheel(){
    
}