# Location: port

`port` 接口的 `Location` 属性是一个包含 URL 端口号的字符串。如果 URL 不包含显式端口号，则将其设置为 `''` 。

## 返回值

 一个字符串。

## 示例

```js
// Let's an <a id="myAnchor" href="https://developer.mozilla.org:443/en-US/docs/Location.port"> element be in the document
const anchor = document.getElementByID("myAnchor");
const result = anchor.port; // Returns:'443'
```