
const sections= document.querySelectorAll('section');
const ul = document.querySelector('ul');
const lis = document.querySelectorAll('ul li'); 
const lis_arr = Array.from(lis);
let posArr = null;
let enableClick = true;


//로딩이벤트
setPos();

//window.resize 일어낫을떄
window.addEventListener('resize',setPos);

//각각 li 버튼을 눌럿을때 일어나는 일
lis.forEach(function(li,idx){
    li.addEventListener('click',function(e){
        if(enableClick){
            enableClick=false;
            e.preventDefault();
            movescroll(idx);
        }
    });
});

//window.scroll이 일어났을때 할 일
window.addEventListener('scroll',activation);

//마우스 휠 이벤트
sections.forEach((section)=>{
    section.addEventListener('mousewheel',function(e){
        e.preventDefault();
        if(enableClick){
            enableClick =false;
            const activeEl = document.querySelector('section.on');
            const arrSec = Array.from(sections);
            const activeIdx = arrSec.indexOf(activeEl);
    
            
            if(e.deltaY > 0){
                if(activeIdx!== sections.length-1){
                    movescroll(activeIdx + 1);
                }else{
                    enableClick = true;
                }
            }
            if (e.deltaY < 0){
                if(activeIdx !== 0){
                    movescroll(activeIdx-1);
                } else{
                    enableClick = true;
                }
            }
            
        }    
    })
});


function setPos(){
    posArr = [];
    for(const sec of sections) posArr.push(sec.offsetTop);
    const active = ul.querySelector('li.on');
    const activeIndex = lis_arr.indexOf(active);  
    window.scroll(0,posArr[activeIndex]); 
}

function activation(){
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
        duration : 500,
        callback : function(){
            enableClick =true;
        }
    });
}





