class Scroll{
    constructor(){
        this.init();
        this.bindingEvent();
        this.setPos();
    }
    init(){
        this.sections= document.querySelectorAll('section');
        this.ul = document.querySelector('ul');
        this.lis = document.querySelectorAll('ul li'); 
        this.lis_arr = Array.from( this.lis);
        this.posArr = null;
        this.enableClick = true;
    }
    bindingEvent(){
        window.addEventListener('resize',this.setPos);
        window.addEventListener('scroll',this.activation);
        this.lis.forEach((li,idx)=>{
            li.addEventListener('click',e=>{
                if(this.enableClick){
                    this.enableClick=false;
                    e.preventDefault();
                    this.movescroll(idx);
                }
            });
        });
        this.sections.forEach(section=>{
            section.addEventListener('mousewheel',e=>{
                e.preventDefault();
                this.mousewheel(e);
            })
        });
    }
    mousewheel(e){
        if(this.enableClick){
            this.enableClick =false;
            const activeEl = document.querySelector('section.on');
            const arrSec = Array.from(this.sections);
            const activeIdx = arrSec.indexOf(activeEl);
    
            
            if(e.deltaY > 0){
                if(activeIdx!== this.sections.length-1){
                    this.movescroll(activeIdx + 1);
                }else{
                    this.enableClick = true;
                }
            }
            if (e.deltaY < 0){
                if(activeIdx !== 0){
                    this.movescroll(activeIdx-1);
                } else{
                    this.enableClick = true;
                }
            }
            
        }    
    }
    setPos(){
        this.posArr = [];
        for(const sec of this.sections) this.posArr.push(sec.offsetTop);
        const active = this.ul.querySelector('li.on');
        const activeIndex = this.lis_arr.indexOf(active);  
        window.scroll(0,this.posArr[activeIndex]); 
    }
    activation(){
        let scroll = window.scrollY || window.pageYOffset;
        this.sections.forEach((sec,idx)=>{
            if(scroll >= this.posArr[idx]){
                for(const li of this.lis){
                    li.classList.remove('on');
                    this.lis[idx].classList.add('on');
                }
                for(const section of this.sections){
                    section.classList.remove('on');
                    sec.classList.add('on');
                }
            }
        });
    }
    movescroll(idx){
        new Animate(window,{
            prop : 'scroll',
            value : this.posArr[idx],
            duration : 500,
            callback :()=>{
                this.enableClick =true;
            }
        });
    }
}