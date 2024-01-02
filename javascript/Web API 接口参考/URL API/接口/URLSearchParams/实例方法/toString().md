# URLSearchParams.toString()

[`URLSearchParams`](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams) 接口的 **`toString()`** 方法返回适用在 URL 中的查询字符串。

## 语法

```js
URLSearchParams.toString()
```

### 返回值

字符串

## 示例

```js
let url = new URL("https://example.com?foo=1&bar=2");
let params = new URLSearchParams(url.search.slice(1));

//Add a second foo parameter.
params.append("foo", 4);
console.log(params.toString());
//Prints 'foo=1&bar=2&foo=4'.
```