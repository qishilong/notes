# URL.toString()

**`URL.toString()`** 字符串化方法返回一个包含完整 URL 的 [`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)。它的作用等同于只读的 [`URL.href`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/href)。

**备注：** 此特性在 [Web Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API) 中可用

## 语法

```
string = url.toString();
```

### 参数

无。

### 返回值

一个[`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)。

## 参考

```js
const url = new URL(
  "https://developer.mozilla.org/zh-CN/docs/Web/API/URL/toString",
);
url.toString(); // 应当返回字符串形式的 URL
```