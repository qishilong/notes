# Location: host

[`Location`](https://developer.mozilla.org/zh-CN/docs/Web/API/Location) 接口的 **`host`** 属性是包含了主机的一段 [`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)，其中包含：主机名，如果 URL 的端口号是非空的，还会跟上一个 `':'` ，最后是 URL 的端口号。

## 语法

```js
string = object.host;
object.host = string;
```

## 示例

```js
var anchor = document.createElement("a");

anchor.href = "https://developer.mozilla.org/en-US/Location.host";
anchor.host == "developer.mozilla.org";

anchor.href = "https://developer.mozilla.org:443/en-US/Location.host";
anchor.host == "developer.mozilla.org";
// 这里 host 中没有包含端口号，因为 443 是 https 协议的默认端口号

anchor.href = "https://developer.mozilla.org:4097/en-US/Location.host";
anchor.host == "developer.mozilla.org:4097";
```