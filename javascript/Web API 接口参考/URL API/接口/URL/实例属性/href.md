# URL.href

[`URL`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL) 接口的 **`href`** 属性是一个包含完整 URL 的 [`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 值。

**备注：** 此特性在 [Web Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API) 中可用

## 语法

```
string = object.href;
object.href = string;
```

### 返回值

[`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String).

## 示例

```js
var url = new URL("https://developer.mozilla.org/zh-CN/docs/Web/API/URL/href");
var result = url.href; // Returns: 'https://developer.mozilla.org/zh-CN/docs/Web/API/URL/href'
```