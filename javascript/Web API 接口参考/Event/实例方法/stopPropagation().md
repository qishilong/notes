# event.stopPropagation

[`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) 接口的 **`stopPropagation()`** 方法阻止捕获和冒泡阶段中当前事件的进一步传播。但是，它不能防止任何默认行为的发生；例如，对链接的点击仍会被处理。如果要停止这些行为，请参见 [`preventDefault()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/preventDefault) 方法，它可以阻止事件触发后默认动作的发生。它也不能阻止附加到相同元素的相同事件类型的其他事件处理器，如果要阻止这些处理器的运行，请参见 [`stopImmediatePropagation()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/stopImmediatePropagation) 方法。

## [语法](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/stopPropagation#语法)

```js
event.stopPropagation();
```

### [参数](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/stopPropagation#参数)

None.

### [返回值](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/stopPropagation#返回值)

None.

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/stopPropagation#示例)

参见[冒泡事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model/Examples#example_5_event_propagation)。