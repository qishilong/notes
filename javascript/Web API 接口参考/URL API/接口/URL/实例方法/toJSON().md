# URL.toJSON()

[`URL`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL)接口的 **toJSON()** 方法返回一个[`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)，其中包含一个序列化的 URL 版本，尽管在实践中它似乎与[`URL.toString()`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/toString)有相同的效果。

**备注：** 此特性在 [Web Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API) 中可用

## 语法

```js
const href = url.toJSON()
```

### 返回值

一个 [`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String).

## 例子

```
const url = new URL("https://developer.mozilla.org/zh-CN/docs/Web/API/URL/toString");
url.toJSON(); // 应该以字符串形式返回 URL
```