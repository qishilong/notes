# DOMContentLoaded

当初始的 **HTML** 文档被完全加载和解析完成之后，**`DOMContentLoaded`** 事件被触发，而无需等待样式表、图像和子框架的完全加载。

模拟的 css 文件：CSS.php

```php
<?php
sleep(3);
```

测试代码：

```html
<link rel="stylesheet" href="css.php">
<script>
document.addEventListener('DOMContentLoaded',function(){
    console.log('3 seconds passed');
});
</script>
```

如果将 link 置于 script 之后，就会立即打印。

**备注：** 同步 JavaScript 会暂停 DOM 的解析。

**备注：** 还有许多通用和独立的库提供跨浏览器方法来检测 DOM 是否已准备就绪

## [加速中](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/DOMContentLoaded_event#加速中)

如果您希望 DOM 在用户请求页面后尽可能快地解析，你可以做的一些事情是把你的 [JavaScript 异步化](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/Synchronous_and_Asynchronous_Requests) 以及 [优化样式表的加载](https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery), 由于被并行加载而减慢页面加载，从主 html 文档“窃取”流量。

## [常规信息](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/DOMContentLoaded_event#常规信息)

-   规范

    [HTML5](https://www.whatwg.org/specs/web-apps/current-work/multipage/the-end.html#the-end)

-   接口

    Event

-   是否冒泡

    是

-   能否取消

    能 (尽管一个简单的事件被指定为不可取消)

-   目标

    Document

-   默认行为

    无。

## [属性](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/DOMContentLoaded_event#属性)

| 属性              | 类型                                                         | 描述                                         |
| :---------------- | :----------------------------------------------------------- | :------------------------------------------- |
| `target` 只读     | [`EventTarget`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget) | 产生该事件的对象 (DOM 树中最顶级的那个对象). |
| `type` 只读       | [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) | 事件类型。                                   |
| `bubbles` 只读    | [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | 该事件是否冒泡。                             |
| `cancelable` 只读 | [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | 该事件是否可取消默认行为。                   |

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/DOMContentLoaded_event#示例)

```html
<script>
  document.addEventListener("DOMContentLoaded", function(event) {
      console.log("DOM fully loaded and parsed");
  });
</script>
```

```html
<script>
  document.addEventListener("DOMContentLoaded", function(event) {
      console.log("DOM fully loaded and parsed");
  });

  for(var i=0; i<1000000000; i++){
      // 这个同步脚本将延迟 DOM 的解析。
      // 所以 DOMContentLoaded 事件稍后将启动。
  }
</script>
```