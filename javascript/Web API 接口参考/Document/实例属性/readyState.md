# document.readyState

**`Document.readyState`** 属性描述了[`document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) 的加载状态。

当该属性值发生变化时，会在 [`document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) 对象上触发 [`readystatechange`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/readystatechange_event) 事件。

## [语法](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/readyState#语法)

```js
var string = document.readyState;
```

### [值](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/readyState#值)

一个文档的 **`readyState`** 可以是以下之一：

-   `loading`（正在加载）

    [`document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) 仍在加载。

-   `interactive`（可交互）

    文档已被解析，"**正在加载**"状态结束，但是诸如图像，样式表和框架之类的子资源仍在加载。

-   `complete`（完成）

    文档和所有子资源已完成加载。表示 [`load`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/load_event) 状态的事件即将被触发。

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/readyState#示例)

### [不同的准备状态](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/readyState#不同的准备状态)

```js
switch (document.readyState) {
  case "loading":
    // 表示文档还在加载中，即处于“正在加载”状态。
    break;
  case "interactive":
    // 文档已经结束了“正在加载”状态，DOM 元素可以被访问。
    // 但是像图像，样式表和框架等资源依然还在加载。
    var span = document.createElement("span");
    span.textContent = "A <span> element.";
    document.body.appendChild(span);
    break;
  case "complete":
    // 页面所有内容都已被完全加载。
    let CSS_rule = document.styleSheets[0].cssRules[0].cssText;
    console.log(`The first CSS rule is: ${CSS_rule }`);
    break;
}
```

### [模拟 DOMContentLoaded 事件的 readystatechange](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/readyState#模拟_domcontentloaded_事件的_readystatechange)

```js
// 模拟 DOMContentLoaded/ jquery ready
document.onreadystatechange = function () {
  if (document.readyState === "interactive") {
    initApplication();
  }
}
```

### [模拟 load 事件的 readystatechange](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/readyState#模拟_load_事件的_readystatechange)

```js
// 模拟 load 事件
document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    initApplication();
  }
}
```

### [在 DOMContentLoaded 之前使用 readystatechange 作为事件处理程序以插入或修改 DOM](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/readyState#在_domcontentloaded_之前使用_readystatechange_作为事件处理程序以插入或修改_dom)

```js
document.addEventListener('readystatechange', event => {
  if (event.target.readyState === 'interactive') {
    initLoader();
  }
  else if (event.target.readyState === 'complete') {
    initApp();
  }
});
```