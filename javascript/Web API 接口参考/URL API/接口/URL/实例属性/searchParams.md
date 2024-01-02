# URL.searchParams

[`URL`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL) 接口的 **`searchParams`** 属性返回一个 [`URLSearchParams`](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams) 对象，这个对象包含当前 URL 中解码后的 [`GET`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/GET) 查询参数。

**备注：** 此特性在 [Web Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API) 中可用

## 值

一个 [`URLSearchParams`](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams) 对象。

## 示例

如果你的 URL 是 `https://example.com/?name=Jonathan%20Smith&age=18`，你可以这样解析 URL，然后得到 `name` 和 `age` 的值。

```js
let params = new URL(document.location).searchParams;
let name = params.get("name"); // is the string "Jonathan Smith".
let age = parseInt(params.get("age")); // is the number 18
```