# URL.hostname

[`URL`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL) 接口的 **`hostname`** 属性是一个 [`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 值，包含有 URL 中的域名。

**备注：** 此特性在 [Web Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API) 中可用

## 语法

```
string = object.hostname;
object.hostname = string;
```

### 返回值

[`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String).

## 示例

```js
var url = new URL(
  "https://developer.mozilla.org/zh-CN/docs/Web/API/URL/hostname",
);
var result = url.hostname; // Returns:'developer.mozilla.org'
```