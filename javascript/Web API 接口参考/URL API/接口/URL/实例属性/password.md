# URL.password 属性

[`URL`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL)接口的 **`password`** 属性为[`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)，其中包含在域名之前指定的密码。

如果在未设置[username](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/username)属性的情况下进行调用，默认失败。

**备注：** 此特性在 [Web Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API) 中可用

## 语法

```js
string = object.password;
object.password = string;
```

### 值

一个 [`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String).

## 示例

```js
var url = new URL(
  "https://anonymous:flabada@developer.mozilla.org/zh-CN/docs/Web/API/URL/password",
);
var result = url.password; // Returns:"flabada"
```