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

        //?????? ????????? ?????? ?????????
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

        const path = this.sections[2].querySelector('path'); //-????????? ????????? path??????
        let sScroll = 0; //-?????? ????????? ???????????? ?????? 0?????? ????????? ??????????????? ?????? ??????

        //3?????? ????????? ????????? ?????? ?????? ???????????????
        if(scroll >= this.posArr[2]+this.base){
            //?????? ????????? ????????? ??????????????? ???????????? base?????? ?????? ?????? ????????? ?????????
            sScroll = (scroll - (this.posArr[2]+this.base))*6.5;

            //sScroll?????? ??? ?????? path????????? ???????????? ??? ??????
            if(sScroll >= 1890)sScroll = 1890;
                //?????? stroke-offset?????? sScroll??? ???????????? ??????
                path.style.strokeDashoffset = 1890 - sScroll;
            
        } else{
            sScroll = 0;
            path.style.strokeDashoffset = 1890 - sScroll;
        }
        const box1 = document.querySelector('.box1');
        const box2 = document.querySelector('.box2');
        //4?????? ????????? ????????? ?????? ?????? ????????? ?????? 
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