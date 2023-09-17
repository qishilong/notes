# window.cancelAnimationFrame

**实验性:** **这是一项[实验性技术](https://developer.mozilla.org/zh-CN/docs/MDN/Writing_guidelines/Experimental_deprecated_obsolete#实验性)**
在将其用于生产之前，请仔细检查[浏览器兼容性表格](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/cancelAnimationFrame#浏览器兼容性)。

## [概述](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/cancelAnimationFrame#概述)

取消一个先前通过调用[`window.requestAnimationFrame()`](https://developer.mozilla.org/zh-CN/docs/Web/API/window/requestAnimationFrame)方法添加到计划中的动画帧请求。

## [语法](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/cancelAnimationFrame#语法)

```
window.mozCancelAnimationFrame(requestID);               // Firefox
```

## [参数](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/cancelAnimationFrame#参数)

-   `requestID`

    先前调用[`window.requestAnimationFrame()`](https://developer.mozilla.org/zh-CN/docs/Web/API/window/requestAnimationFrame)方法时返回的 ID.

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/cancelAnimationFrame#示例)

```
var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

var start = window.mozAnimationStartTime;  // 只有 Firefox 支持 mozAnimationStartTime 属性，其他浏览器可以使用 Date.now() 来替代。

var myReq;
function step(timestamp) {
  var progress = timestamp - start;
  d.style.left = Math.min(progress/10, 200) + "px";
  if (progress < 2000) {
    myReq = requestAnimationFrame(step);
  }
}
myReq = requestAnimationFrame(step);

window.cancelAnimationFrame(myReq);
```