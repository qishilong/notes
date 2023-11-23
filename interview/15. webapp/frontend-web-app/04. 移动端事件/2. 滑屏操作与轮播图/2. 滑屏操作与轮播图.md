# 2. 滑屏操作与轮播图

在上一讲中，我们介绍了移动端事件的一些基本知识，也知道了移动端中如果在 *document* 上面阻止了默认事件的话，又会出现很多新的问题，例如 *a* 标签无法跳转，表单输入控件无法选中。这些问题都需要我们自己来解决。

例如：*a* 标签无法跳转

```js
dom.addEventListener('touchstart',e=>{
  location.href = e.target.href;
})
```

表单输入控件无法选中

```js
input.addEventListener('touchstart',ev=>{
  input.focus();
})
```

这些问题我们倒还是能够很轻松的解决。

但是其中有一条是连基本的滑动都会被阻止掉了，因此同样，滑屏也只有通过我们自己手动实现。

本小节我们来看一个移动端中常见的操作：滑屏。并且在此基础上来实现一个轮播图。

本文主要介绍以下内容：

- 滑屏操作
- 轮播图



## 滑屏操作

还记得上一小节中我们所说的，在移动端中我们要阻止所有的默认事件，这样就能解决一些诸如事件穿透的 *Bug*。但是这随之而来的带给我们一些新的问题：那就是阻止了默认行为之后，很多东西都失效了，例如滚动条失效，因此，很多功能都需要我们自定义来实现。

这里我们就来实现一个滑屏操作。

实际上，滑屏操作的原理并不难理解，就和以前在 *PC* 端所书写的拖动是一样的。

首先我们复习一下事件对象中的 *changedTouches* 属性，该属性可以获取当前（引发）事件的触摸点的列表。列表的每一项为一个 *Touch* 对象，里面有那么一些属性，如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-04-01-034400.png" alt="image-20220401114400079" style="zoom:67%;" />

关于 *Touch* 对象各属性的含义，可以参阅 *MDN*：*https://developer.mozilla.org/zh-CN/docs/Web/API/Touch*



下面是一段滑屏操作的示例代码：

```html
<div id="wrap">
  <ul id="list">
    <li><a href="#">这是一个很长很长的列表1</a></li>
    <li><a href="#">这是一个很长很长的列表1</a></li>
    <li><a href="#">这是一个很长很长的列表1</a></li>
    <li><a href="#">这是一个很长很长的列表1</a></li>
    <li><a href="#">这是一个很长很长的列表1</a></li>
    <li><a href="#">这是一个很长很长的列表1</a></li>
    <li><a href="#">这是一个很长很长的列表1</a></li>
    <li><a href="#">这是一个很长很长的列表1</a></li>
    <li><a href="#">这是一个很长很长的列表1</a></li>
    <li><a href="#">这是一个很长很长的列表1</a></li>
    <li><a href="#">这是一个很长很长的列表1</a></li>
    <li><a href="#">这是一个很长很长的列表10</a></li>
    <li><a href="#">这是一个很长很长的列表1</a></li>
    <li><a href="#">这是一个很长很长的列表1</a></li>
    <li><a href="#">这是一个很长很长的列表1</a></li>
    <li><a href="#">这是一个很长很长的列表1</a></li>
    <li><a href="#">这是一个很长很长的列表1</a></li>
    <li><a href="#">这是一个很长很长的列表1</a></li>
    <li><a href="#">这是一个很长很长的列表1</a></li>
    <li><a href="#">这是一个很长很长的列表1</a></li>
    <li><a href="#">这是一个很长很长的列表1</a></li>
    <li><a href="#">这是一个很长很长的列表20</a></li>
  </ul>
</div>
```

```css
body{
  margin: 0;
}
ul{
  margin: 0;
  padding: 0;
  list-style: none;
}

#wrap{
  height: 100vh;
  overflow: hidden;
  border: 5px solid #f00;
  box-sizing: border-box;
}

#list{
  transition: 0.3s;
}
#list li{
  font-size: 24px;
  line-height: 50px;
}
```

```js
var wrap=document.querySelector('#wrap'),
    list=document.querySelector('#list');
var startPointY=0,		//按下时手指的坐标
    startTop=0,			//按下时元素的距离
    movePointY=0;		//手指移动时的坐标

Transform(list);	//使用第三方的库，在一上来的时候设置一下初始的距离

wrap.addEventListener('touchstart',ev=>{
  startPointY=ev.changedTouches[0].pageY;	//按下的时候获取手指的坐标
  startTop=list.translateY;
});

wrap.addEventListener('touchmove',ev=>{
  //坐标移动的距离 = 当前的距离-按下时的距离
  movePointY=ev.changedTouches[0].pageY-startPointY;

  //元素走的距离=按下时元素的距离+坐标移动的距离
  list.translateY=startTop+movePointY;

  ev.preventDefault();
});
```

因为滑屏操作涉及到频繁的滑动，而以前传统的通过 *position* 的方式来实现的话，会有重绘重排的性能问题，因此我们选择使用 *CSS3* 的 *transform* 来实现滑动效果，*CSS3* 新增的 *transform* 有硬件加速等特性，性能上面要比传统的 *position* 要好一些。

另外，在上面的代码中，我们用到了一个第三方库 *Transform*：*https://github.com/AlloyTeam/PhyTouch/tree/master/transformjs*



## 轮播图

接下来我们在滑屏操作上更进一步，来实现一个轮播图。

其原理如下图所示：

![image-20220401160337640](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-04-01-080337.png)

代码如下：

```html
<section id="banner">
  <div class="wrap">
    <a href="#"><img src="images/banner_01.jpg" alt=""></a>
    <a href="#"><img src="images/banner_02.jpg" alt=""></a>
    <a href="#"><img src="images/banner_03.jpg" alt=""></a>
  </div>
  <div class="circle">
    <span class="active"></span><span></span><span></span>
  </div>
</section>
```

```css
body {
  margin: 0;
}

#banner {
  position: relative;
  width: 100vw;
  overflow: hidden;
}

.wrap {
  width: 300vw;
  display: flex;
}

.wrap a {
  width: 100vw;
}

.wrap a img {
  width: 100%;
  vertical-align: middle;
}

.circle {
  position: absolute;
  bottom: 3vw;
  width: 100vw;
  display: flex;
  justify-content: center;
}

.circle span {
  width: 3vw;
  height: 3vw;
  background: #ddd;
  border-radius: 50%;
  margin: 0 1.5vw;
}

.circle span.active {
  background: grey;
  opacity: .8;
}
```

```js
var banner = document.querySelector('#banner'),
    wrap = document.querySelector('.wrap'),
    spans = document.querySelectorAll('.circle span'),
    imgWidth = banner.offsetWidth; // 一张图片的宽度

var startPointX = 0, // 按下时手指的坐标
    disPointX = 0, // 手指坐标的差
    startEleX = 0, // 按下时元素的位置
    cn = 0, // 当前图片走的索引数
    ln = 0; // 上一个图片走的索引

Transform(wrap);

//无缝滚动
wrap.innerHTML += wrap.innerHTML; //复制了一份
wrap.style.width = wrap.children.length * imgWidth + 'px';

banner.addEventListener('touchstart', ev => {
  startPointX = ev.changedTouches[0].pageX;

  // 按下的是第 0 张图，要做的事情：让 wrap 走到第 2 份的第 0 张，左边就有内容
  if (cn == 0) {
    cn = wrap.children.length / 2;
  }

  // 按下的是最后一张图，要做的事情：让 wrap 走到第 1 份的最后一张图
  if (cn == wrap.children.length - 1) {
    cn = wrap.children.length / 2 - 1;
  }
  wrap.style.transition = ''; // 不去掉的放在拖动的时候会很慢
  // 当改变了 cn 的值后也需要修正一下 wrap 的位置， 使其马上变过去，以免两边出现留白
  wrap.translateX = -imgWidth * cn;
  startEleX = wrap.translateX; // 当 wrap 的位置改变后，需要去更新一下初始值（元素的位置）
  ev.preventDefault();
});

banner.addEventListener('touchmove', ev => {
  disPointX = ev.changedTouches[0].pageX - startPointX;

  wrap.translateX = startEleX + disPointX;
});

banner.addEventListener('touchend', ev => {
  // 回弹的效果
  var backWidth = imgWidth / 8; //加弹的距离，超过这个距离才能运动到下一张，小于这个距离就需要回弹

  if (Math.abs(disPointX) > backWidth) {
    // 这个条件满足了说明现拖动的距离已经超过回弹的距离了，可以运动到下一张了
    // 判断现在是往右边拖还是往左边拖
    if (disPointX < 0) {
      // 往左边拖
      cn++;
    }

    if (disPointX > 0) {
      // 往右边拖
      cn--;
    }
  }

  wrap.style.transition = '0.3s';
  wrap.translateX = -imgWidth * cn;

  //修改小圆点的class
  /* 
                现在图片的索引：0，1，2，3，4，5 => 0,1,2,0,1,2
                span标签的索引：0，1，2
            */

  // 先去掉上一个次圆点身上的class
  spans[ln].className = '';
  // 先去掉上一个次圆点身上的class
  spans[cn % (wrap.children.length / 2)].className = 'active';
  // 再最后的时候需要去更新一下上一个的索引，更新为这次。相对于下次来说，它的上一次是不是就是当前次
  ln = cn % (wrap.children.length / 2);
});
```


