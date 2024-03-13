# Element.scrollIntoView()

[`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) 接口的 `scrollIntoView()` 方法会滚动元素的父容器，使被调用 `scrollIntoView()` 的元素对用户可见。

## 语法

```js
scrollIntoView()
scrollIntoView(alignToTop)
scrollIntoView(scrollIntoViewOptions)
```

### 参数

-   [`alignToTop`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView#aligntotop)可选

    一个布尔值：如果为 `true`，元素的顶端将和其所在滚动区的可视区域的顶端对齐。相应的 `scrollIntoViewOptions: {block: "start", inline: "nearest"}`。这是这个参数的默认值。如果为 `false`，元素的底端将和其所在滚动区的可视区域的底端对齐。相应的 `scrollIntoViewOptions: {block: "end", inline: "nearest"}`。

-   [`scrollIntoViewOptions`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView#scrollintoviewoptions) 可选 实验性

    一个包含下列属性的对象：[`behavior`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView#behavior) 可选定义滚动是立即的还是平滑的动画。该选项是一个字符串，必须采用以下值之一：`smooth`：滚动应该是平滑的动画。`instant`：滚动应该通过一次跳跃立刻发生。`auto`：滚动行为由 [`scroll-behavior`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-behavior) 的计算值决定。[`block`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView#block) 可选定义垂直方向的对齐，`start`、`center`、`end` 或 `nearest` 之一。默认为 `start`。[`inline`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView#inline) 可选定义水平方向的对齐，`start`、`center`、`end` 或 `nearest` 之一。默认为 `nearest`。

### 返回值

无 ([`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined))。

## 示例

```js
const element = document.getElementById("box");

element.scrollIntoView();
element.scrollIntoView(false);
element.scrollIntoView({ block: "end" });
element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
```

## 注意

取决于其他元素的布局情况，此元素可能不会完全滚动到顶端或底端。