class Scroll{
    constructor(el, opt){
        let default_opt = {
            speed : 500,
            base:0,
            autoScroll:false
        };
        let resulte_opt = {...default_opt,...opt};
        this.init(el,resulte_opt);
        this.bindingEvent();
    }
    init(el,opt){
        this.sections  = document.querySelectorAll(el);
        this.ul = document.querySelector('ul');
        this.btns = this.ul.querySelectorAll('ul li');
        this.btnsArr = Array.from(this.btns);
        this.arrSec = Array.from(this.sections);
        this.speed = opt.seed;
        this.autoScroll = opt.autoScroll;
        this.base = opt.base;
        this.posArr = null;
        this.enableClick = true;
    }
    bindingEvent(){
        this.resize();

        this.btns.forEach((el,idx)=>{
            el.addEventListener('click', e=>{
                if(this.enableClick){
                    this.enableClick=false;
                    e.preventDefault();
                    this.scrollAni(idx);
                }
            });
        }); 

        window.addEventListener('scroll',this.scrollActive.bind(this));
        window.addEventListener('resize', this.resize.bind(this));

        if(!this.autoScroll) return;
        this.sections.forEach(section =>{
            section.addEventListener('mousewheel',e=>{
                e.preventDefault();
                this.mousewheel(e);
            });
        });
    }
    scrollAni(idx){
        new Animate(window,{
            prop : 'scroll',
            value : this.posArr[idx],
            duration : this.speed,
            callback : ()=>{
                this.enableClick =true;
            }
        });
    }
    mousewheel(e){
        if(this.enableClick){
            this.enableClick =false;
            const activeEl = document.querySelector('section.on');
            const arrSec = Array.from(this.sections);
            const activeIdx = arrSec.indexOf(activeEl);
    
            if(e.deltaY > 0){
                activeIdx!== this.sections.length-1 ? this.scrollAni(activeIdx + 1) : this.enableClick = true;
            }
            if (e.deltaY < 0){
                activeIdx !== 0 ? this.scrollAni(activeIdx-1):this.enableClick = true;
            }
        }   
    }
    scrollActive(){
        const scroll = window.scrollY;

        //모든 섹션의 공통 활성화
        this.sections.forEach((sec,idx)=>{
            if(scroll >= this.posArr[idx] + this.base){
                for(const btn of this.btns){
                    btn.classList.remove('on');
                    this.btns[idx].classList.add('on');
                }
                for(const section of this.sections){
                    section.classList.remove('on');
                    sec.classList.add('on');
                }   
            }
        });

        const path = this.sections[2].querySelector('path'); //-스크롤 적용할 path요소
        let sScroll = 0; //-해당 섹션에 도달하면 다시 0부터 증가될 스크롤값이 담길 변수

        //3번째 섹션의 스크롤 박스 영역 커스텀모션
        if(scroll >= this.posArr[2]+this.base){
            //기존 스크롤 값에서 현재섹션의 위치값과 base값을 빼준 현재 스크롤 위치값
            sScroll = (scroll - (this.posArr[2]+this.base))*6.5;

            //sScroll값이 혹 전체 path길이의 넘어서는 걸 방지
            if(sScroll >= 1890)sScroll = 1890;
                //기존 stroke-offset값에 sScroll값 뺴주면서 연동
                path.style.strokeDashoffset = 1890 - sScroll;
            
        } else{
            sScroll = 0;
            path.style.strokeDashoffset = 1890 - sScroll;
        }
        const box1 = document.querySelector('.box1');
        const box2 = document.querySelector('.box2');
        //4번째 섹션의 스크롤 박스 영역 커스텀 모션 
        if(scroll >= this.posArr[3]+this.base){
            sScroll = scroll-(this.posArr[3]+this.base);
            box1.style.transform = `translateX(${sScroll}px)`;
            box2.style.transform = `translateX(${sScroll*2}px)`;
        }else{
            sScroll = 0;
            box1.style.transform = `translateX(${sScroll}px)`;
            box2.style.transform = `translateX(${sScroll}px)`;
        }
    }
    resize (){ 
        this.posArr = [];
        for(const sec of this.sections) this.posArr.push(sec.offsetTop);
        const active = this.ul.querySelector('li.on');
        const activeIdx = this.btnsArr.indexOf(active);
        window.scroll(0,this.posArr[activeIdx]); 
    }
}