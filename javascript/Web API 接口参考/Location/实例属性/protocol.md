# Location: protocol

`protocol` 属性 `Location` 接口是一个字符串，表示 URL 的协议方案，包括最后的 `':'` 。

## 返回值

 一个字符串。

## 示例

```js
// Let's an <a id="myAnchor" href="https://developer.mozilla.org/en-US/Location.protocol"> element be in the document
const anchor = document.getElementById("myAnchor");
const result = anchor.protocol; // Returns:'https:'
```