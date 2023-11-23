/* 
	//操作样式函数
	css(box,{width:300,opacity:0.5});	//设置
	css(box,width);	//获取 
*/
const css=(el,attr)=>{
    let transformAttr=['rotate','rotateX','rotateY','rotateZ','skewX','skewY','scale','scaleX','scaleY','translateX','translateY','translateZ'];

    const type=o=>{
        let str=Object.prototype.toString.call(o);
        return str.match(/\[object (.*)\]/)[1].toLowerCase();
    }

    const getOrSet=type(attr)=='object'?false:true;

    if(getOrSet){
        if(transformAttr.includes(attr)){
            return transform();
        }else{	
            return parseFloat(getComputedStyle(el)[attr]);
        }
    }else{
        const attrKeys=Object.keys(attr);
        for(let v of attrKeys){
            el.style[v]=v=='opacity'?attr[v]:attr[v]+'px';
        }

        transform(attrKeys);
    }

    function transform(attrKeys){
        if(!el.transform){
            el.transform={}
        }

        if(getOrSet){
            if(!Object.keys(el.transform).includes(attr)){
                if(attr=='scale'){
                    return 1;
                }else{
                    return 0;
                }
            }

            return el.transform[attr];
        }

        for(let v of attrKeys){
            el.transform[v]=attr[v];
        }

        let str='';
        for(let v in el.transform){
            switch(v){
                case 'rotate':
                case 'rotateX':
                case 'rotateY':
                case 'rotateZ':
                case 'skewX':
                case 'skewY':
                    str+=v+`(${el.transform[v]}deg) `;
                    break;
                case 'scale':
                case 'scaleX':
                case 'scaleY':
                    str+=v+`(${el.transform[v]}) `;
                    break;
                case 'translateX':
                case 'translateY':
                case 'translateZ':
                    str+=v+`(${el.transform[v]}px) `;
                    break;
            }
        }

        el.style.transform=str;
    }
}


/* 
	//运动函数
	tweenMove({
		el:要运动的元素,
		type:动画的类型,
		to:{	//运动的目的地
			left:200
		},
		time:动画时间,
		callBack:动画结束后的回调函数
		callIn:动画执行中的回调函数
	})
 */
const tweenMove=({el,type,to,time,callBack,callIn})=>{
	let t=0,
		b={},
		c={},
		d=Math.round(time/16.7);
	cancelAnimationFrame(el.timer);	

	for(let v in to){
		b[v]=css(el,v);	
		c[v]=to[v]-b[v];
	}

	el.timer=requestAnimationFrame(move);


	let moveAttr={};
	function move(){
		t++;

		if(t>d){
			cancelAnimationFrame(el.timer);
			callBack&&callBack.call(el);
			return;
		}

		for(let v in to){
			moveAttr[v]=Tween[type](t,b[v],c[v],d);

			if(to[v]==Math.round(moveAttr[v])){
				cancelAnimationFrame(el.timer);
				callBack&&callBack.call(el);
				return;
			}
		}

		css(el,moveAttr);
		callIn&&callIn.call(el);
		el.timer=requestAnimationFrame(move);
	}
}


/* 
	//滑屏函数
	swiper({
		wrap:父级元素（dom元素）,
		dir:拖动方向，x=>左右拖动，y=>上下拖动（String）,
		start(){
			//回调函数，手指按下时的回调函数
		},
		move(){
			//回调函数，滚动中的回调函数
		},
		end(){
			//回调函数，手指抬起后的回调函数
		},
		over(){
			//回调函数，滚动结束后的回调函数
		},
		toTop(){
			//回调函数，滚动到页面头部的回调函数
		}
		toEnd(){
			//回调函数，滚动到页面最底部的回调函数
		},
		backOut:'none'=>不允许超出，'back'=>拉力回弹,
		scrollBar:是否显示滚动条，显示=>true,隐藏=>false,
	});
 */ 
const swiper=({wrap,dir='y',start,move,end,over,toTop,toEnd,backOut='back',scrollBar=true})=>{
	const scroll=wrap.children[0];
	let startPoint={},
		startEle={},
		distance={},
		targetEle={},
		isDir={
			x:false,
			y:false
		},

		curPoint={},
		lastPoint={},

		lastDistance=0,		//最后一次拖动的距离（当前的坐标-上一次的坐标）
		lastTime=0,			//上一次的时间点
		nowTime=0,			//当前次的时间点
		lastTimeDistance=0,	//最后一次拖动，所需要的时间（当前的时间-上一次的时间）

		isFirstMove=true;
	
	wrap.addEventListener('touchstart',ev=>{
		start&&start.call(wrap,ev);

		startPoint={
			x:ev.changedTouches[0].pageX,
			y:ev.changedTouches[0].pageY
		};

		lastPoint={
			x:ev.changedTouches[0].pageX,
			y:ev.changedTouches[0].pageY
		}

		startEle={
			x:css(scroll,'translateX'),
			y:css(scroll,'translateY')
		}

		lastTime=Date.now();	//在按下的时候，给lastTime赋值
		lastDistance=0;	//需要在按下的时候把这什值清空，要不然的话，拖动松开后点击页面，页面照样走
	});

	wrap.addEventListener('touchmove',ev=>{
		nowTime=Date.now();	//在移动 的时候，给nowTime赋值
		curPoint={
			x:ev.changedTouches[0].pageX,
			y:ev.changedTouches[0].pageY
		}
		if(lastPoint.x==curPoint.x && lastPoint.y==curPoint.y){
			return;
		}

		distance={
			x:ev.changedTouches[0].pageX-startPoint.x,
			y:ev.changedTouches[0].pageY-startPoint.y
		};
		targetEle={
			x:startEle.x+distance.x,
			y:startEle.y+distance.y
		};

		if(isFirstMove){
			if(Math.abs(distance.x)>Math.abs(distance.y)){
				isDir.x=true;
				isDir.y=isFirstMove=false;
			}else{
				isDir.y=true;
				isDir.x=isFirstMove=false;
			}
		}


		if(isDir[dir]){
			css(scroll,{['translate'+dir.toUpperCase()]:targetEle[dir]});

			//在移动的时候，算出最后一次移动的距离以及移动这段距离所需要的时间
			lastDistance=curPoint[dir]-lastPoint[dir];	//算出来最后一次移动的距离
			lastTimeDistance=nowTime-lastTime	//算出来最后一次移动的距离所需要的时间

			ev.preventDefault();
		}
		
		lastPoint.x=curPoint.x;
		lastPoint.y=curPoint.y;
		lastTime=nowTime;	//用完以后一定把上一次的更新成当前次的
	});

	wrap.addEventListener('touchend',ev=>{
		end&&end.call(wrap,ev);
		isFirstMove=true;
		isDir={
			x:false,
			y:false
		}

		//在抬起的时候给一个时间点的判断，用于知道用户是否要做一个扔的动作
		if(Date.now()-lastTime>100){
			//这个条件成立就说明现在用户最后一次已经停了，不需要扔了
			lastDistance=0;
		}

		//添加缓冲
		let lastSpeed=lastDistance/lastTimeDistance;
		lastSpeed=lastSpeed?lastSpeed:0;	//如果手指是从别的地方滑过来，以上点击了一次就会出现NaN的值，这里做的目的是为了把NaN换成0

		//console.log(lastSpeed);
		let buffer=lastSpeed*200;	//要缓冲的距离
		let target=Math.round(buffer+css(scroll,'translate'+dir.toUpperCase()));	//要走到的距离=当前的距离+缓冲的距离
		//console.log(target);

		tweenMove({
			el:scroll,
			type:'easeOutStrong',
			to:{
				['translate'+dir.toUpperCase()]:target
			},
			time:500,
			callIn(){
				move&&move.call(wrap,ev);	//缓冲时滚动的回调函数
			},
			callBack(){
				over&&over.call(wrap,ev);	//缓冲滚动结束时的回调函数
			}
		});
	});
}

var Tween = {
	linear: function (t, b, c, d){  //匀速
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){  //加速曲线
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){  //减速曲线
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){  //加速减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){  //加加速曲线
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){  //减减速曲线
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 3.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
}