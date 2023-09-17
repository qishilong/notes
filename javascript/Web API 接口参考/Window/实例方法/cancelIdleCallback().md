# window.cancelIdleCallback()

**实验性:** **这是一项[实验性技术](https://developer.mozilla.org/zh-CN/docs/MDN/Writing_guidelines/Experimental_deprecated_obsolete#实验性)**
在将其用于生产之前，请仔细检查[浏览器兼容性表格](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/cancelIdleCallback#浏览器兼容性)。

## [概述](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/cancelIdleCallback#概述)

**`window.cancelIdleCallback()`** 方法用于取消之前调用[`window.requestIdleCallback()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback) 的回调。

## [语法](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/cancelIdleCallback#语法)

```
window.cancelIdleCallback(handle);
```

### [参数](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/cancelIdleCallback#参数)

-   `handle`

    调用 [`window.requestIdleCallback()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback) 时返回的 ID.

### [返回值](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/cancelIdleCallback#返回值)

`undefined`.

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/cancelIdleCallback#示例)

在文章 [Cooperative Scheduling of Background Tasks API](https://developer.mozilla.org/zh-CN/docs/Web/API/Background_Tasks_API) 中可以查看 [完整示例](https://developer.mozilla.org/zh-CN/docs/Web/API/Background_Tasks_API#example) 。