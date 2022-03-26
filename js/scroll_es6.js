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
        //이벤트문에 두번째 인수로 함수명이 바로 대입되어있는 경우는 
        //화살표 함수로 변경할 wrapping 함수 자체가 없기 떄문에 직접 뒤에 bind(this)로 
        //안쪽 this값 인스턴스로 고정시킨다.
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
    }
    resize (){ 
        this.posArr = [];
        for(const sec of this.sections) this.posArr.push(sec.offsetTop);
        const active = this.ul.querySelector('li.on');
        const activeIdx = this.btnsArr.indexOf(active);
        window.scroll(0,this.posArr[activeIdx]); 
    }
}