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
		//for(let v of attrKeys){	这里与视频里讲的做了修改，要用let v in el.transform，因为attrKeys里存放的是用户传入的参数。而el.transform里放的是用户设置过的参数。这两个是有区别的。用户传入的参数有可能是没设置过的，有可能是设置过的
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
			//console.log(to[v]==Math.round(moveAttr[v]));

			/* if(to[v]==Math.round(moveAttr[v])){
				cancelAnimationFrame(el.timer);
				callBack&&callBack.call(el);
				return;
			} */

			//因为scale属性会有很多的小数点，所以不能够直接变成整数
			if(to[v]==css(el,v)){
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

		lastDistance=0,
		lastTime=0,
		nowTime=0,
		lastTimeDistance=0,

		//存储元素能够走的最小值
		minDistance={
			x:0,
			y:0
		},

		isFirstMove=true;

	//滚动条
	const bar=document.createElement('div');
	let scale=1;	//滚动的滑块走的距离与内容滚动的距离之间是一个比值关系
	bar.className='scrollBar';	//是为了给外面留一个样式，让用户去设置
	bar.style.cssText=`position:absolute;
						background:rgba(0,0,0,0.6);
						transition:0.2s opacity;
						border-radius:8px;
						opacity:0;`;

	
	wrap.addEventListener('touchstart',ev=>{
		cancelAnimationFrame(scroll.timer);
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

		//在按下的时候给声明的范围赋值
		minDistance={
			x:wrap.offsetWidth-scroll.offsetWidth,
			y:wrap.offsetHeight-scroll.offsetHeight,
		}

		lastTime=Date.now();
		lastDistance=0;

		//如果滚动的内容有增加，就需要重新计算一下滚动条的值
		if(dir=='x'){	//横向的滚动条
			scale=wrap.clientWidth/scroll.offsetWidth;
			bar.style.width=scale*wrap.clientWidth+'px';
			//设备的高/滚动元素的高 = 滑块的高/设备的高	= scale
			bar.style.cssText+=`left:0;bottom:0;height:5px`;
		}else{	//纵向的滚动条
			scale=wrap.clientHeight/scroll.offsetHeight;
			bar.style.height=scale*wrap.clientHeight+'px';
			bar.style.cssText+=`right:0;top:0;width:5px`;
		}
	
		if(scrollBar){	//用户设置要需要滚动条
			wrap.style.position='relative';
			wrap.appendChild(bar);
		}

		//在按下的时候需要让滚动条显示
		css(bar,{'opacity':0.6});
	});

	wrap.addEventListener('touchmove',ev=>{
		nowTime=Date.now();
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
			if(backOut=='none'){
				targetEle[dir]=targetEle[dir]>0?0:targetEle[dir];
				targetEle[dir]=targetEle[dir]<minDistance[dir]?minDistance[dir]:targetEle[dir];
			}else if(backOut=='back'){
				if(targetEle[dir]>0){
					targetEle[dir]*=0.3;
				}else if(targetEle[dir]<minDistance[dir]){
					let dis=minDistance[dir]-targetEle[dir];
					targetEle[dir]=minDistance[dir]-dis*0.3;
				}
			}
			css(scroll,{['translate'+dir.toUpperCase()]:targetEle[dir]});
			css(bar,{['translate'+dir.toUpperCase()]:-targetEle[dir]*scale});

			lastDistance=curPoint[dir]-lastPoint[dir];
			lastTimeDistance=nowTime-lastTime;

			ev.preventDefault();
		}
		
		lastPoint.x=curPoint.x;
		lastPoint.y=curPoint.y;
		lastTime=nowTime;
	});

	wrap.addEventListener('touchend',ev=>{
		end&&end.call(wrap,ev);
		isFirstMove=true;
		isDir={
			x:false,
			y:false
		}

		if(Date.now()-lastTime>100){
			lastDistance=0;
		}

		let lastSpeed=lastDistance/lastTimeDistance;
		lastSpeed=lastSpeed?lastSpeed:0;

		let buffer=lastSpeed*200;
		let target=Math.round(buffer+css(scroll,'translate'+dir.toUpperCase()));

		if(target>0){
			if(target>40){	//现在到顶部了，并且已经超过顶部50px了，这个时候一松手就可以刷新了
				toTop&&toTop.call(wrap,ev);
			}	
			target=0;
		}else if(target<minDistance[dir]){
			target=minDistance[dir];
		}

		tweenMove({
			el:scroll,
			type:'easeOutStrong',
			to:{
				['translate'+dir.toUpperCase()]:target
			},
			time:500,
			callIn(){
				move&&move.call(wrap,ev);
			},
			callBack(){
				//当缓冲走完了的时候才是加载数据的时候，但是需要判断是不是走到底部了
				if(target==minDistance[dir]){	//这个条件成立代表现在缓冲是到了底部了
					//console.log(1);
					toEnd&&toEnd.call(wrap,ev);
				}
				over&&over.call(wrap,ev);
			}
		});

		tweenMove({
			el:bar,
			type:'easeOutStrong',
			to:{
				['translate'+dir.toUpperCase()]:-target*scale
			},
			time:500,
			callBack(){
				css(bar,{opacity:0});
			}
		});
	});
}


/*
	gesTure({
		el:要添加事件的元素,
		start(){	//对应gesturestart
			//按下时要操作的事件
		}
		change(){	//对应gesturechange
			//手指移动时的回调
			//el.rotation	start与move的手指旋转角度的差值
			//el.scale		start与move的手指间的距离的比值
		}
		end(){	//对应gestureend
			//手指抬起时候的回调函数
		}
	})
*/
const gesTure=({el,start,change,end})=>{
	let isGesture=false;
		startPointDis=0,
		startPointDeg=0,

		lastScale=1,	//上一次的缩放值
		lastRotate=0;	//上一次的旋转值
	
	el.addEventListener('touchstart',ev=>{
		const touch=ev.touches;

		if(touch.length>=2){
			isGesture=true;

			//用户按下的时候，就可以获取到上一次的旋转度数及绽放比例
			lastScale=css(el,'scale');
			lastRotate=css(el,'rotate');


			startPointDis=getPointDis(touch[0],touch[1],'distance');

			startPointDeg=getPointDis(touch[0],touch[1],'angle');

			start&&start.call(el,ev);
		}
	});

	el.addEventListener('touchmove',ev=>{
		const touch=ev.touches;

		if(touch.length>=2 && isGesture){
			isGesture=true;

			const movePointDis=getPointDis(touch[0],touch[1],'distance');
			el.scale=movePointDis/startPointDis*lastScale;	//因为缩放是倍数的关系，所以要拿这次的值与上一次的值相乘

			const movePointDeg=getPointDis(touch[0],touch[1],'angle');	//手指移动时候的角度
			el.rotation=movePointDeg-startPointDeg+lastRotate;	//度数并是倍数的关系，而是相加的关系


			change&&change.call(el,ev);
		}
	});

	el.addEventListener('touchend',ev=>{
		if(isGesture){

			//在手指抬起的时候添加一个缩放的范围
			if(el.scale>2){
				tweenMove({
					el:el,
					to:{
						scale:2
					},
					time:200,
					type:'easeInStrong',
					callBack(){
						el.scale=2;	//因为运动的是元素身上的scale样式，但是它身上的scale是没有变的，所以在运动完以后也要让这个scale属性的值更新一下
					}
				});
			}

			if(el.scale<1){
				tweenMove({
					el:el,
					to:{
						scale:1
					},
					time:200,
					type:'easeInStrong',
					callBack(){
						el.scale=1;
					}
				});
			}

			end&&end.call(el,ev);
		}

		isGesture=false;
	});

	function getPointDis(p1,p2,type){
		let x=p2.pageX-p1.pageX;
		let y=p2.pageY-p1.pageY;

		switch(type){
			case 'distance':
				return Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
				break;
			case 'angle':
				return Math.atan2(y,x)*180/Math.PI;
				break;
		}
	}
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