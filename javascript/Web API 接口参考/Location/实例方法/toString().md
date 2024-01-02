# Location: toString()

**`toString()`**[`Location`](https://developer.mozilla.org/zh-CN/docs/Web/API/Location)接口的 stringifier 方法返回包含整个 URL 的[`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)}。它是[`Location.href`](https://developer.mozilla.org/zh-CN/docs/Web/API/Location/href)的只读版本。

## 句法

```js
string = object.toString();
```

## 例子

```js
// Let's imagine an <a id="myAnchor" href="https://developer.mozilla.org/zh-CN/docs/Location/toString"> element is in the document
var anchor = document.getElementById("myAnchor");
var result = anchor.toString(); // Returns: 'https://developer.mozilla.org/zh-CN/docs/Location/toString'
```