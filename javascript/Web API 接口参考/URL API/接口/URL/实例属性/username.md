# URL.username

[`URL`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL)接口的 username 属性是[`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) ，其中包含域名前指定的**`username`** 。

**备注：** 此特性在 [Web Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API) 中可用

## 语法

```js
string = object.username;
object.username = string;
```

### 值

一个 [`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String).

## 例子

```js
var url = new URL(
  "https://anonymous:flabada@developer.mozilla.org/zh-CN/docs/Web/API/URL/username",
);
var user = url.username; // 返回：“anonymous”
```