# Event()

**`Event()`** 构造函数，创建一个新的事件对象 [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event)。

## [语法](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/Event#语法)

```js
 event = new Event(typeArg, eventInit);
```

### [参数](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/Event#参数)

-   *typeArg*

    是[`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 类型，表示所创建事件的名称。

-   *eventInit*可选

    是 `EventInit` 类型的字典，接受以下字段：`"bubbles"`，可选，[`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean)类型，默认值为 `false`，表示该事件是否冒泡。`"cancelable"`，可选，[`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean)类型，默认值为 `false`，表示该事件能否被取消。`"composed"`，可选，[`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean)类型，默认值为 `false`，指示事件是否会在影子 DOM 根节点之外触发侦听器。

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/Event#示例)

```js
// 创建一个支持冒泡且不能被取消的 look 事件

var ev = new Event("look", {"bubbles":true, "cancelable":false});
document.dispatchEvent(ev);

// 事件可以在任何元素触发，不仅仅是 document
myDiv.dispatchEvent(ev);
```