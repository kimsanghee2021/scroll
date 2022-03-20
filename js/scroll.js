/*
    DOM.offsetTop : 전체문서에 해당 DOM요소의 세로 위치값 (정적)
    window.scrollY : 브라우저의 현재 스크롤 거리값(동적)
*/
const sections= document.querySelectorAll('section');
const lis = document.querySelectorAll('ul li');
let posArr = [];

for(const sec of sections){
    posArr.push(sec.offsetTop);
}
//각각 li 버튼을 눌럿을때 일어나는 일
lis.forEach(function(li,idx){
    li.addEventListener('click',function(e){
        e.preventDefault();

        new Animate(window,{
            prop : 'scroll',
            value : posArr[idx],
            duration : 500
        });
    });
});
//window.scroll이 일어났을때 할 일
window.addEventListener('scroll',function(e){
    let scroll = window.scrollY || window.pageYOffset;
    //section.forEach를 쓰는이유는 posArr[idx]를 가져오기위함이다.
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
});
//각 박스의 높이값이 100vh일때 발생하는 문제점을 파악하고 해결







































// const sections =  document.querySelectorAll('section');
// const lis = document.querySelectorAll('ul li');
// let posArr = [];

// for(const section of sections) posArr.push(section.offsetTop);

// lis.forEach(function(li,idx){
//     li.addEventListener('click',function(e){
//         e.preventDefault();
//         new Animate(window,{
//             prop:'scroll',
//             value : posArr[idx],
//             duration:500
//         });
//     });
// });
// window.addEventListener('scroll',function(){
//     let scroll = window.scrollY || window.pageYOffset;
//     sections.forEach(function(sec,idx){
//         if(scroll >=posArr[idx]){
//             for(const li of lis){
//                 li.classList.remove('on');
//                 lis[idx].classList.add('on');
//             }
//             for(const section of sections){
//                 section.classList.remove('on');
//                 sections[idx].classList.add('on');
//             }
//         }
//     });
// });


