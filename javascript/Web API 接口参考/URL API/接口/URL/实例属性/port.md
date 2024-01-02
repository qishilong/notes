# URL.port

[`URL`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL) 接口的端口属性是包含了 URL 的端口号信息的[`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)值，如果 URL 中不包含明确的端口号，这个属性将为`''`.

**备注：** 此特性在 [Web Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API) 中可用

## 语法

```js
string = object.port;
object.port = string;
```

### 参数

一个 [`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String).

## 示例

```js
var url = new URL("https://mydomain.com:80/svn/Repos/");
var result = url.port; // Returns:'80'
```