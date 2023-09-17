# 浏览器的 16ms 渲染帧

由于现在广泛使用的屏幕都有固定的刷新率（比如最新的一般在 60Hz）， 在两次硬件刷新之间浏览器进行两次重绘是没有意义的只会消耗性能。 浏览器会利用这个间隔 16ms（1000ms/60）适当地对绘制进行节流， 因此 16ms 就成为页面渲染优化的一个关键时间。 尤其在[异步渲染](https://harttle.land/2016/11/26/dynamic-dom-render-blocking.html)中，要利用 [流式渲染](https://harttle.land/2016/11/26/static-dom-render-blocking.html) 就必须考虑到这个渲染帧间隔。

### TL;DR

为方便查阅源码和相关资料，本文以 Chromium 的 [Blink](https://chromium.googlesource.com/chromium/blink/) 引擎为例分析。如下是一些分析结论：

-   一个渲染帧内 commit 的多次 DOM 改动会被合并渲染；
-   耗时 JS 会造成丢帧；
-   渲染帧间隔为 16ms 左右；
-   避免耗时脚本、交错读写样式以保证流畅的渲染。

## 渲染帧的流程

渲染帧是指浏览器一次完整绘制过程，帧之间的时间间隔是 DOM 视图更新的最小间隔。 由于主流的屏幕刷新率都在 60Hz，那么渲染一帧的时间就必须控制在 16ms 才能保证不掉帧。 也就是说每一次渲染都要在 16ms 内页面才够流畅不会有卡顿感。 这段时间内浏览器需要完成如下事情：

-   脚本执行（JavaScript）：脚本造成了需要重绘的改动，比如增删 DOM、请求动画等
-   样式计算（CSS Object Model）：级联地生成每个节点的生效样式。
-   布局（Layout）：计算布局，执行渲染算法
-   重绘（Paint）：各层分别进行绘制（比如 3D 动画）
-   合成（Composite）：合成各层的渲染结果

最初 Webkit 使用定时器进行渲染间隔控制， 2014 年时开始 [使用显示器的 vsync 信号控制渲染](https://bugs.chromium.org/p/chromium/issues/detail?id=337617)（其实直接控制的是合成这一步）。 这意味着 16ms 内多次 commit 的 DOM 改动会合并为一次渲染。

## 耗时 JS 会造成丢帧

JavaScript 在并发编程上一个重要特点是“Run To Completion”。在事件循环的一次 Tick 中， 如果要执行的逻辑太多会一直阻塞下一个 Tick，所有异步过程都会被阻塞。 一个流畅的页面中，JavaScript 引擎中的执行队列可能是这样的：

```txt
执行 JS -> 空闲 -> 绘制（16ms）-> 执行 JS -> 空闲 -> 绘制（32ms）-> ...
```

如果在某个时刻有太多 JavaScript 要执行，就会丢掉一次帧的绘制：

```txt
执行很多 JS...（20ms）-> 空闲 -> 绘制（32ms）-> ...
```

例如下面的脚本在保持 JavaScript 忙的状态（持续 5s）下每隔 1s 新增一行 DOM 内容。

```js
<div id="message"></div>
<script>
var then = Date.now()
var i = 0
var el = document.getElementById('message')
while (true) {
  var now = Date.now()
  if (now - then > 1000) {
    if (i++ >= 5) {
      break;
    }
    el.innerText += 'hello!\n'
    console.log(i)
    then = now
  }
}
</script>
```

可以观察到虽然每秒都会写一次 DOM，但在 5s 结束后才会全部渲染出来，明显耗时脚本阻塞了渲染。

![js block render](https://images-1305186932.cos.ap-beijing.myqcloud.com/images/202305101229638.gif)

## 测量渲染帧间隔

浏览器的渲染间隔其实是很难测量的。即使通过 [clientHeight](https://harttle.land/2016/04/24/client-height-width.html) 这样的接口也只能强制进行Layout，是否 Paint 上屏仍未可知。

幸运的是，最新的浏览器基本都支持了 [requestAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame) 接口。 使用这个 API 可以请求浏览器在下一个渲染帧执行某个回调，于是测量渲染间隔就很方便了：

```js
var then = Date.now()
var count = 0

function nextFrame(){
  requestAnimationFrame(function(){
    count ++
    if(count % 20 === 0){
      var time = (Date.now() - then) / count
      var ms = Math.round(time*1000) / 1000
      var fps = Math.round(100000/ms) / 100
      console.log(`count: ${count}\t${ms}ms/frame\t${fps}fps`)
    }
    nextFrame()
  })
}
nextFrame()
```

每次 `requestAnimationFrame` 回调执行时发起下一个 `requestAnimationFrame`，统计一段时间即可得到渲染帧间隔，以及 fps。逼近 16.6 ms 有木有！

![render frame](https://images-1305186932.cos.ap-beijing.myqcloud.com/images/202305101229988.gif)

## 渲染优化建议

现在我们知道浏览器需要在 16ms 内完成整个 JS->Style->Layout->Paint->Composite 流程，那么基于此有哪些页面渲染的优化方式呢？

### 避免耗时的 JavaScript 代码

耗时超过 16ms 的 JavaScript 可能会丢帧让页面变卡。如果有太多事情要做可以把这些工作重新设计，分割到各个阶段中执行。并充分利用缓存和懒初始化等策略。不同执行时机的 JavaScript 有不同的优化方式：

-   初始化脚本（以及其他同步脚本）。对于大型 SPA 中首页卡死浏览器也是常事，建议增加服务器端渲染或者应用懒初始化策略。
-   事件处理函数（以及其他异步脚本）。在复杂交互的 Web 应用中，耗时脚本可以优化算法或者迁移到 Worker 中。Worker 在移动端的兼容性已经不很错了，可以生产环境使用。

### 避免交错读写样式

在编写涉及到布局的脚本时，常常会多次读写样式。比如：

```js
// 触发一次 Layout
var h = div.clientHeight
div.style.height = h + 20
// 再次触发 Layout
var w = div.clientWidth
div.style.width = w + 20
```

因为浏览器需要给你返回正确的宽高，上述代码片段中每次 Layout 触发都会阻塞当前脚本。 如果把交错的读写分隔开，就可以减少触发 Layout 的次数：

```js
// 触发一次 Layout
var h = div.clientHeight
var w = div.clientWidth
div.style.height = h + 20
div.style.width = w + 20
```

### 小心事件触发的渲染

我们知道 [DOM 事件的触发](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/dispatchEvent) 是异步的，但事件处理器的执行是可能在同一个渲染帧的， 甚至就在同一个 Tick。例如异步地获取 HTML 并拼接到当前页面上， 通过监听 XHR 的 [onprogress 事件](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequestEventTarget/onprogress) 来模拟流式渲染：

```js
var xhr = new XMLHttpRequest(),
  method = 'GET',
  url = 'https://harttle.land'

xhr.open(method, url, true)
xhr.onprogress = function () {
  div.innerHTML = xmlhttp.responseText
};
xhr.send()
```

上述渲染算法在网络情况较差时是起作用的，但不代表它是正确的。 比如当 [https://harttle.land](https://harttle.land/) 对应的 HTML 非常大而且网络很好时， `onprogress` 事件处理器可能碰撞在同一个渲染帧中，或者干脆在同一个 Tick。 这样页面会长时间空白，即使 `onprogress` 早已被调用过。

在实际项目实践中，甲方爸爸提出了一个需求，实时传输Chrome浏览器的刷新帧率（FPS）至性能监控模块，于是各种搜索，找到了一个比较好的解决方案，就是利用下面这个函数：window.requestAnimationFrame()。

requestAnimationFrame()引入
计时器一直是JavaScript动画的核心技术。而编写动画循环的关键是要知道延迟时间多长合适。一方面，循环间隔必须足够短，这样才能让不同的动画效果显得平滑流畅；另一方面，循环间隔还要足够长，这样才能确保浏览器有能力渲染产生的变化。

大多数电脑显示器的刷新频率是60Hz，大概相当于每秒钟重绘60次。大多数浏览器都会对重绘操作加以限制，不超过显示器的重绘频率，因为即使超过那个频率用户体验也不会有提升。因此，最平滑动画的最佳循环间隔是1000ms/60，约等于16.6ms。

window.requestAnimationFrame（查看相关文档），顾名思义就是请求动画帧，去告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。

注意：若你想在浏览器下次重绘之前继续更新下一帧动画，那么回调函数自身必须再次调用window.requestAnimationFrame()

当你准备更新动画时你应该调用此方法。这将使浏览器在下一次重绘之前调用你传入给该方法的动画函数(即你的回调函数)。回调函数执行次数通常是每秒60次，但在大多数遵循W3C建议的浏览器中，回调函数执行次数通常与浏览器屏幕刷新次数相匹配。为了提高性能和电池寿命，因此在大多数浏览器里，当requestAnimationFrame() 运行在后台标签页或者隐藏的<iframe> 里时，requestAnimationFrame() 会被暂停调用以提升性能和电池寿命。

回调函数会被传入DOMHighResTimeStamp参数，DOMHighResTimeStamp指示由RequestAnimationFrame（）排队的回调开始触发的时间。指示当前被 requestAnimationFrame() 排序的回调函数被触发的时间。在同一个帧中的多个回调函数，它们每一个都会接受到一个相同的时间戳，即使在计算上一个回调函数的工作负载期间已经消耗了一些时间。该时间戳是一个十进制数，单位毫秒，最小精度为1ms(1000μs)。



# JS中window.requestAnimationFrame()获取浏览器刷新帧率FPS及相关函数rAF()

在实际项目实践中，甲方爸爸提出了一个需求，实时传输Chrome浏览器的刷新帧率（FPS）至性能监控模块，于是各种搜索，找到了一个比较好的解决方案，就是利用下面这个函数：window.requestAnimationFrame()。

## requestAnimationFrame()引入

计时器一直是JavaScript动画的核心技术。而编写动画循环的关键是要知道延迟时间多长合适。一方面，循环间隔必须足够短，这样才能让不同的动画效果显得平滑流畅；另一方面，循环间隔还要足够长，这样才能确保浏览器有能力渲染产生的变化。

大多数电脑显示器的刷新频率是60Hz，大概相当于每秒钟重绘60次。大多数浏览器都会对重绘操作加以限制，不超过显示器的重绘频率，因为即使超过那个频率用户体验也不会有提升。因此，最平滑动画的最佳循环间隔是1000ms/60，约等于16.6ms。

window.requestAnimationFrame（查看相关文档），顾名思义就是请求动画帧，去告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。

注意：若你想在浏览器下次重绘之前继续更新下一帧动画，那么回调函数自身必须再次调用window.requestAnimationFrame()

当你准备更新动画时你应该调用此方法。这将使浏览器在下一次重绘之前调用你传入给该方法的动画函数(即你的回调函数)。回调函数执行次数通常是每秒60次，但在大多数遵循W3C建议的浏览器中，回调函数执行次数通常与浏览器屏幕刷新次数相匹配。为了提高性能和电池寿命，因此在大多数浏览器里，当requestAnimationFrame() 运行在后台标签页或者隐藏的<iframe> 里时，requestAnimationFrame() 会被暂停调用以提升性能和电池寿命。

回调函数会被传入DOMHighResTimeStamp参数，DOMHighResTimeStamp指示由RequestAnimationFrame（）排队的回调开始触发的时间。指示当前被 requestAnimationFrame() 排序的回调函数被触发的时间。在同一个帧中的多个回调函数，它们每一个都会接受到一个相同的时间戳，即使在计算上一个回调函数的工作负载期间已经消耗了一些时间。该时间戳是一个十进制数，单位毫秒，最小精度为1ms(1000μs)。

## requestAnimationFrame()对比

与setTimeout和setInterval相比——

-   而setTimeout和setInterval的问题是，它们都不精确。因为javascript是单线程的，它们的内在运行机制决定了时间间隔参数实际上只是指定了把动画代码添加到浏览器UI线程队列中以等待执行的时间。如果队列前面已经加入了其他任务，那动画代码就要等前面的任务完成后再执行。
-   requestAnimationFrame采用系统时间间隔，保持最佳绘制效率，不会因为间隔时间过短，造成过度绘制，增加开销；也不会因为间隔时间太长，使用动画卡顿不流畅，让各种网页动画效果能够有一个统一的刷新机制，从而节省系统资源，提高系统性能，改善视觉效果。

## requestAnimationFrame()特点

-   requestAnimationFrame会把每一帧中的所有DOM操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率
-   在隐藏或不可见的元素中，requestAnimationFrame将不会进行重绘或回流，这当然就意味着更少的CPU、GPU和内存使用量
-   requestAnimationFrame是由浏览器专门为动画提供的API，在运行时浏览器会自动优化方法的调用，并且如果页面不是激活状态下的话，动画会自动暂停，有效节省了CPU开销

## requestAnimationFrame()语法

```js
window.requestAnimationFrame(callback);
```

### 参数

`callback` 下一次重绘之前更新动画帧所调用的函数(即上面所说的回调函数)。该回调函数会被传入 `DOMHighResTimeStamp` 参数，该参数与 `performance.now()` 的返回值相同，它表示 `requestAnimationFrame()` 开始去执行回调函数的时刻。

### 返回值

一个 `long` 整数，请求 ID ，是回调列表中唯一的标识。是个非零值，没别的意义。你可以传这个值给 `window.cancelAnimationFrame()` 以取消回调函数。

## rAF(requestAnimationFrame)

网上很多教程里都有这个“rAF()”函数，看它的英文名全称就知道其实没什么神秘的，如果你喜欢，也可以叫“XXOO()”。因为目前，主要浏览器Firefox 23 / IE 10 / Chrome / Safari）都支持这个方法。可以用下面的方法，检查浏览器是否支持这个API。如果不支持，则自行模拟部署该方法。

```js
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();
```

## 获取浏览器刷新帧率FPS

一共两种方式：“纯`requestAnimationFrame`方式”和“`rAF()`获取方式”

两个调用方式都是直接使用如下代码：

```js
loopToGetFps();
```

### 纯requestAnimationFrame方式

获取浏览器帧率代码如下：

#### 方案一：固定时间

```js
//此代码运行于chrome版本 75.0.3770.100（正式版本）snap （64 位）
//fps variales
var frame = 0;
var allFrameCount = 0;
var lastTime = Date.now();
var lastFameTime = Date.now();
var preFps = 0;

var loopToGetFps = function () {
    var now = Date.now();  //获取当前时间
    var fs = (now - lastFameTime);  //计算时间差
    var fps = Math.round(1000 / fs); //计算帧率

    lastFameTime = now;
    // not set 0， to get FPS by recording the difference in this value at the beginning and end of the animation 
    allFrameCount++;
    frame++;

    if (now > 1000 + lastTime) {
        var fps = Math.round((frame * 1000) / (now - lastTime));
        
        if (preFps != fps) {
            console.log("fps:", fps);
            preFps = fps;
        }
        frame = 0;
        lastTime = now;
    };
    window.requestAnimationFrame(loopToGetFps);
}
```

#### 方案二：固定帧数

```js
//此代码运行于chrome版本 75.0.3770.100（正式版本）snap （64 位）
//fps variales
var frame = 0;
var allFrameCount = 0;
var lastTime = Date.now();
var lastFameTime = Date.now();
var preFps = 0;

var now = Date.now();
var fps = 0;
var sendFps = 0;

var loopToGetFps = function () {
    frame++;
    if (frame >= 60) {
        now = Date.now();
        fps = Math.round((frame * 1000) / (now - lastTime));
        console.log("fps:", fps);
        
        if (preFps != fps) {
            sendFps = "fpsNum" + fps;
            if (alexaFpsFlag) {
                sendMessage(sendFps);
            }
            preFps = fps;
        }
        frame = 0;
        lastTime = now;
    };
    window.requestAnimationFrame(loopToGetFps);
}
```

### rAF()获取浏览器刷新帧率FPS

之所以采用“rAF()”，是为了更好地适配兼容各种浏览器，获取浏览器帧率代码如下：

```js
//fps variales
var frame = 0;
var allFrameCount = 0;
var lastTime = Date.now();
var lastFameTime = Date.now();
var preFps = 0;

var rAF = function () {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        }
    );
}();

var loopToGetFps = function () {
    var now = Date.now();
    var fs = (now - lastFameTime);
    var fps = Math.round(1000 / fs);

    lastFameTime = now;
    // not set 0， to get FPS by recording the difference in this value at the beginning and end of the animation 
    allFrameCount++;
    frame++;

    if (now > 1000 + lastTime) {
        var fps = Math.round((frame * 1000) / (now - lastTime));
        console.log("fps:", fps);
        
        if (preFps != fps) {
            var sendFps = "fpsNum" + fps;
            if (alexaFpsFlag) {
                sendMessage(sendFps);
            }
            preFps = fps;
        }
        frame = 0;
        lastTime = now;
    };
    rAF(loopToGetFps);
}
```



