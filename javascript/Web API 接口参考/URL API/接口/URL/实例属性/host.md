# URL.host

[`URL`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL) 接口的 **`host`** 属性是一个 [`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 值，包含了主机信息，也就是 *主机名（hostname）*，还有，如果 URL 接口不为空，也会包含冒号 `':'` 和 URL 的 *端口（port）*。

**备注：** 此特性在 [Web Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API) 中可用

## 语法

```js
string = object.host;
object.host = string;
```

### 返回值

[`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String).

## 示例

```js
var url = new URL("https://developer.mozilla.org/zh-CN/docs/Web/API/URL/host");
var result = url.host; // "developer.mozilla.org"

var url = new URL(
  "https://developer.mozilla.org:443/zh-CN/docs/Web/API/URL/host",
);
var result = url.host; // "developer.mozilla.org"
// The port number is not included because 443 is the scheme's default port

var url = new URL(
  "https://developer.mozilla.org:4097/zh-CN/docs/Web/API/URL/host",
);
var result = url.host; // "developer.mozilla.org:4097"
```