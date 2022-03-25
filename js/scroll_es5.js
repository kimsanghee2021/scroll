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
            this.scrollAni(idx);
        }.bind(this));
    });


    window.addEventListener('scroll',this.scrollActive);
    window.addEventListener('resize', this.resize);

    this.sections.forEach(function(sec, idx){
        sec.addEventListener('mousewheel',function(e){
            this.mouseWheel(e);
        }.bind(this));
    });
}


Scroll.prototype.scrollAni = function(idx){
    new Animate(window,{
        prop : 'scroll',
        value : this.posArr[idx],
        duration : 500,
    });
}

Scroll.prototype.scrollActive= function(){
    const scroll = window.scrollY;
    this.sections.forEach(function(sec,idx){
        if(scroll >= this.posArr[idx]){
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
Scroll.prototype.resize = function(){ 
    //각 섹션의 offsetTop값 구해서 빈배열에 담기
    this.posArr = [];
    for(const sec of this.sections) this.posArr.push(sec.offsetTop);
    const active = this.ul.querySelector('li.on');
    const activeIdx = this.btnsArr.indexOf(active);
    window.scroll(0,this.posArr[activeIdx]); 
}

Scroll.prototype.mouseWheel = function(e){
    const activeSec = document.querySelector('section.on');
    const arrSecIdx = this.arrSec.indexOf(activeSec);
    if(e.deltaY > 0 ){
        console.log('아래로 내려간다.',);
        if(arrSecIdx !== this.sections.length-1){
            this.scrollAni(arrSecIdx+1); //맨위로 올려주는것
        }
    } else if(e.deltaY < 0){
        console.log('위로올라간다.');
        if(arrSecIdx !== 0){
            this.scrollAni(arrSecIdx-1);
        }
    }
}