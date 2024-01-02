# URL.protocol

[`URL`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL)接口的 **`protocol`** 是一个包含 URL 协议的[`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)值，此值包含协议后的`':'`.

**备注：** 此特性在 [Web Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API) 中可用

## 语法

```js
string = object.protocol;
object.protocol = string;
```

### 参数

一个 [`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String).

## 示例

```js
var url = new URL(
  "https://developer.mozilla.org/zh-CN/docs/Web/API/URL/protocol",
);
var result = url.protocol; // Returns:"https:"
```