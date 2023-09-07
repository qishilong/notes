# 键盘事件 KeyboardEvent()

**`KeyboardEvent()`** 构造函数新建一个 [`KeyboardEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent) 实例。

## [语法](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/KeyboardEvent#语法)

```
 event = new KeyboardEvent(typeArg, KeyboardEventInit);
```

### [值](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/KeyboardEvent#值)

#### *typeArg*

[`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 类型，表示事件名称。

#### *KeyboardEventInit* `可选`

`KeyboardEventInit` 字典，有以下几种值：

-   `"key"`, 可选，默认为 `""`, [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 类型，设置 [`KeyboardEvent.key`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/key) 的值。
-   `"code"`, 可选，默认为 `""`, [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 类型，设置[`KeyboardEvent.code`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/code) 的值。
-   `"location"`, 可选，默认为 `0`, `unsigned long`类型，设置 [`KeyboardEvent.location`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/location) 的值。
-   `"ctrlKey"`, 可选，默认为 `false`, [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean) 类型，设置 [`KeyboardEvent.ctrlKey`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/ctrlKey) 的值。
-   `"shiftKey"`, 可选，默认为 `false`, [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean) 类型，设置[`KeyboardEvent.shiftKey`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/shiftKey) 的值。
-   `"altKey"`, 可选，默认为 `false`, [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean) 类型，设置 [`KeyboardEvent.altKey`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/altKey) 的值。
-   `"metaKey"`, 可选，默认为 `false`, [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean) 类型，设置 [`KeyboardEvent.metaKey`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/metaKey) 的值。
-   `"repeat"`, 可选，默认为 `false`, [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean) 类型，设置 [`KeyboardEvent.repeat`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/repeat) 的值。
-   `"isComposing"`, 可选，默认为 `false`, [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean) 类型，设置 [`KeyboardEvent.isComposing`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/isComposing) 的值。
-   `"charCode"`, 可选，默认为 `0`, `unsigned long` 类型，设置 [`KeyboardEvent.charCode`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/charCode) (已废弃) 的值。
-   `"keyCode"`, 可选，默认为 `0`, `unsigned long` 类型，设置[`KeyboardEvent.keyCode`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/keyCode) (已废弃) 的值。
-   `"which"`, 可选，默认为 `0`, `unsigned long` 类型，设置[`KeyboardEvent.which`](https://developer.mozilla.org/zh-CN/docs/Web/API/UIEvent/which) (已废弃) 的值。

**备注：** `KeyboardEventInit` 字典也可以接受来自 [`UIEventInit`](https://developer.mozilla.org/zh-CN/docs/Web/API/UIEvent/UIEvent) 和 [`EventInit`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/Event) 的字典字段值。
