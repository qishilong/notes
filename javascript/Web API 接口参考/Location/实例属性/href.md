# Location: href

[`Location`](https://developer.mozilla.org/zh-CN/docs/Web/API/Location) 接口的 **`href`** 属性是一个字符串化转换器 (stringifier), 返回一个包含了完整 URL 的 [`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 值，且允许 href 的更新。

## 语法

```js
string = object.href;
object.href = string;
```

## 示例

```js
// 假设文档中包含标签： <a id="myAnchor" href="https://developer.mozilla.org/en-US/Location/href">
var anchor = document.getElementById("myAnchor");
var result = anchor.href; // 返回：'https://developer.mozilla.org/en-US/Location/href'
```