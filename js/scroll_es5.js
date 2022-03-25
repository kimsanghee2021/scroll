function Scroll(){
    this.init();
    this.bindingEvent();
    this.resize();
}


Scroll.prototype.init = function(){
    this.sections  = document.querySelectorAll('section');
    this.ul = document.querySelector('ul');
    this.btns = this.ul.querySelectorAll('ul li');
    this.btnsArr = Array.from(this.btns);
    this.arrSec = Array.from(this.sections);
    this.posArr = null;
    this.enableClick = true;
}
Scroll.prototype.bindingEvent = function(){
    this.btns.forEach((el,idx)=>{
        el.addEventListener('click', function(e){
            if(this.enableClick){
                this.enableClick=false;
                e.preventDefault();
                this.scrollAni(idx);
            }
        }.bind(this));
    });


    window.addEventListener('scroll',this.scrollActive.bind(this));
    window.addEventListener('resize', this.resize.bind(this));

    this.sections.forEach((section)=>{
        section.addEventListener('mousewheel',function(e){
            e.preventDefault();
            this.mousewheel(e);
        }.bind(this))
    });

}


Scroll.prototype.scrollAni = function(idx){
    new Animate(window,{
        prop : 'scroll',
        value : posArr[idx],
        duration : 500,
        callback : function(){
            this.enableClick =true;
        }.bind(this)
    });
}
Scroll.prototype.mousewheel = function(e){
    if(this.enableClick){
        this.enableClick =false;
        const activeEl = document.querySelector('section.on');
        const arrSec = Array.from(this.sections);
        const activeIdx = arrSec.indexOf(activeEl);

        if(e.deltaY > 0){
            if(activeIdx!== this.sections.length-1){
                this.scrollAni(activeIdx + 1);
            }else{
                this.enableClick = true;
            }
        }
        if (e.deltaY < 0){
            if(activeIdx !== 0){
                this.scrollAni(activeIdx-1);
            } else{
                this.enableClick = true;
            }
        }
    }   
}

Scroll.prototype.scrollActive= function(){
    const scroll = window.scrollY;
    this.sections.forEach(function(sec,idx){
        if(scroll >= posArr[idx]){
            for(const btn of this.btns){
                btn.classList.remove('on');
                this.btns[idx].classList.add('on');
            }
            for(const section of this.sections){
                section.classList.remove('on');
                sec.classList.add('on');
            }   
        }
    }.bind(this));
}
Scroll.prototype.resize = function(){ 
    //각 섹션의 offsetTop값 구해서 빈배열에 담기
    posArr = [];
    for(const sec of this.sections) posArr.push(sec.offsetTop);
    const active = this.ul.querySelector('li.on');
    const activeIdx = this.btnsArr.indexOf(active);
    window.scroll(0,posArr[activeIdx]); 
}

