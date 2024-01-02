# URL.search

[`URL`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL) 接口的 **`search`** 属性是一个搜索字符串，也称为查询字符串，这是一个字符串包含一个 `'?'` 后面跟着 URL 的参数。

现代浏览器提供[`URL.searchParams`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/searchParams)属性，以便轻松解析查询字符串中的参数。

**备注：** 此特性在 [Web Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API) 中可用

## 语法

```js
string = object.search;
object.search = string;
```

### 值

一个 [`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String).

## 例子

```js
var url = new URL(
  "https://developer.mozilla.org/zh-CN/docs/Web/API/URL/search?q=123",
);
var queryString = url.search; // Returns:"?q=123"
```