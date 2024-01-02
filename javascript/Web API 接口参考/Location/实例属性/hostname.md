# Location: hostname

[`Location`](https://developer.mozilla.org/zh-CN/docs/Web/API/Location)的 **`hostname`** 属性是包含了域名的一段 [`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)。

## 语法

```js
string = object.hostname;
object.hostname = string;
```

## 示例

```js
// 在文档流中声明了一个元素： <a id="myAnchor" href="https://developer.mozilla.org/zh-CN/docs/Location.hostname">
var anchor = document.getElementById("myAnchor");
var result = anchor.hostname; // Returns:'developer.mozilla.org'
```