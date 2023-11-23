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
						border-radius:8px;
						opacity:0;
						z-index:100;`;	//有可能别的元素会盖住滚动条，所以加个层级

	
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
			bar.style.cssText+=`left:0;bottom:0;height:3px`;
		}else{	//纵向的滚动条
			scale=wrap.clientHeight/scroll.offsetHeight;
			bar.style.height=scale*wrap.clientHeight+'px';
			bar.style.cssText+=`right:0;top:0;width:3px`;
		}
	
		if(scrollBar){	//用户设置要需要滚动条
			wrap.style.position='relative';
			wrap.appendChild(bar);
		}

		//在按下的时候需要让滚动条显示
		//css(bar,{'opacity':0.6});
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

			//透明度是后来增加的：在按下的时候已经修改了scale的值，但是那个时候并没改变滚动条的位置。而滚动条的位置是在move的时候才设置的，这样就会有一个跳的问题。解决这个问题的方法就是在move的时候再让滚动条显示，那跳的过程就看不到
			css(bar,{['translate'+dir.toUpperCase()]:-targetEle[dir]*scale,opacity:0.6});

			lastDistance=curPoint[dir]-lastPoint[dir];
			lastTimeDistance=nowTime-lastTime;

			ev.preventDefault();
		}

		//在用户拖动的时候也是需要让move方法执行的
		move&&move.call(wrap,ev);
		
		lastPoint.x=curPoint.x;
		lastPoint.y=curPoint.y;
		lastTime=nowTime;
	});

	wrap.addEventListener('touchend',ev=>{
		//end&&end.call(wrap,ev);	//不能把结束的回调函数放在最上面，而要放在最下面
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
		
		//如果用户拖动后并没有甩，就不需要执行tweenMove，直接执行回调函数
		if(target==Math.round(css(scroll,'translate'+dir.toUpperCase()))){
			end&&end.call(wrap,ev);
			return;
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

		end&&end.call(wrap,ev);
	});
}


/*
	单指滑动
		singleDrag({
			el:元素,
			start(){
				//按下时的回调函数
			},
			move(){
				//拖动时的回调函数
			},
			end(){
				//抬起时的回调函数
			}
		});
 */




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

		lastScale=1,
		lastRotate=0;

		//在一上来的时候给他们一个默认值，为了避免在别的地方使用它们的时候没有值，就会出问题了
		el.scale=1;
		el.rotation=0;


	//声明一些单指操作的变量
	let isSingleDrag=false,
		startPoint={},
		distance={},
		startEle={},
		targetEle={};

	
	el.addEventListener('touchstart',ev=>{
		const touch=ev.touches;

		if(touch.length>=2){
			isGesture=true;

			lastScale=css(el,'scale');
			lastRotate=css(el,'rotate');


			startPointDis=getPointDis(touch[0],touch[1],'distance');

			startPointDeg=getPointDis(touch[0],touch[1],'angle');

			start&&start.call(el,ev);
		}

		//这个条件成立的时候说明，现在用户只有一根手指在屏幕上，可以认为是要进行单指操作
		if(touch.length<2){
			isSingleDrag=true;

			startPoint={
				x:touch[0].pageX,
				y:touch[0].pageY,
			}

			//这里要乘以倍数的原因：因为translate的值并不会因为缩放而被直接改变，所以第二次取到的translate的值，仍然是缩放前的值，所以这里要补个倍数
			startEle={
				x:css(el,'translateX')*el.scale,
				y:css(el,'translateY')*el.scale,
			}
		}

	});

	el.addEventListener('touchmove',ev=>{
		const touch=ev.touches;

		if(touch.length>=2 && isGesture){
			isGesture=true;

			const movePointDis=getPointDis(touch[0],touch[1],'distance');
			el.scale=movePointDis/startPointDis*lastScale;

			const movePointDeg=getPointDis(touch[0],touch[1],'angle');
			el.rotation=movePointDeg-startPointDeg+lastRotate;


			change&&change.call(el,ev);
		}

		//当用户滑动的时候，如果只有一根手指，以及isSingleDrag为true，就表示现在用户正在进行单指滑动
		if(touch.length<2&&isSingleDrag){
			distance={
				x:touch[0].pageX-startPoint.x,
				y:touch[0].pageY-startPoint.y,
			}

			//console.log(distance);

			//这里要除以倍数，是因为图片缩放后它要走的距离与手指走的距离不是1:1的关系了，而是形成了倍数的关系，所以要去掉倍数
			targetEle={
				x:(startEle.x+distance.x)/el.scale,
				y:(startEle.y+distance.y)/el.scale,
			}
			console.log((startEle.x+distance.x),el.scale);

			
			css(el,{translateX:targetEle.x,translateY:targetEle.y});
		}
	});

	el.addEventListener('touchend',ev=>{
		if(isGesture){

			if(el.scale>2){
				tweenMove({
					el:el,
					to:{
						scale:2
					},
					time:200,
					type:'easeInStrong',
					callBack(){
						el.scale=2;
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
		isSingleDrag=false;	//在手指抬起的时候，把这个值还原成原始值
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