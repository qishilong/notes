# URL.pathname

[`URL`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL)接口的 **`pathname`** 属性是一个[`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)，包含一个初始 `'/'` 和 URL 的路径 (如果没有路径，则为空字符串)

**备注：** 此特性在 [Web Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API) 中可用

## 语法

```js
string = object.pathname;
object.pathname = string;
```

### 值

一个[`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String).

## 例子

```js
var url = new URL(
  "https://developer.mozilla.org/zh-CN/docs/Web/API/URL/pathname",
);
var result = url.pathname; // Returns:"/zh-CN/docs/Web/API/URL/pathname"
```