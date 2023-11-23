/*
	t	time 当前时间
	b	begin 初始值
	c	count 总的运动值（结束值与初始值之间的差）
	d	duration 持续时间
	返回值	元素应该在的位置
*/

/* 
	样式操作
	css(box,{width:300,opacity:0.5});	//设置
	css(box,'width');	//获取
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
	tweenMove({
		el:要运动的元素,
		type:动画的类型,
		to:{	//运动的目的地
			left:200,
		},
		time:运动的时间(ms),
		callBack(){
			//动画结束后的回调函数
		},
		callIn(){
			//动画执行中的回调函数
		}
	});
 */

const tweenMove=({el,type,to,time,callBack,callIn})=>{
	let t=0,
		b={},	//所有要运动的样式的初始值
		c={},	//所有要运动的样式的总运动值
		d=Math.round(time/16.7);	//把用户传的时候修改一下，改成与浏览器刷新频率一样（形成倍数的关系）
	cancelAnimationFrame(el.timer);		//在一上来的时候先清一下，避免重复累加

	for(let v in to){
		b[v]=css(el,v);		//用css方法去获取到所有元素的初始值
		c[v]=to[v]-b[v];	//拿用户传的目标值-元素的初始值
	}

	el.timer=requestAnimationFrame(move);


	let moveAttr={};	//用来存储“所有属性”应该在的位置（某个时间点，元素应该在的位置），用于给css赋值
	function move(){
		t++;

		//用于停止运动的
		if(t>d){	//如果t的值已经超过整个运动要用的时间了，就需要停止了
			cancelAnimationFrame(el.timer);
			callBack&&callBack.call(el);
			return;
		}

		for(let v in to){
			moveAttr[v]=Tween[type](t,b[v],c[v],d);	//b与c的值是一个对象，不能直接传，要把它们里面的value拿出来才行

			//如果用户传的属性值与属性的初始值一样，这个时候也需要停止运动
			if(to[v]==Math.round(moveAttr[v])){	//如果用户给的值与目标值是一样，那就代表现在已经走到头了，运动需要结束了
				cancelAnimationFrame(el.timer);
				callBack&&callBack.call(el);
				return;
			}
		}

		//取到所有的值，然后通过css函数，让元素动起来
		css(el,moveAttr);
		callIn&&callIn.call(el);
		el.timer=requestAnimationFrame(move);
	}
}






//Tween.linear();
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