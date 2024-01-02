# URLSearchParams.getAll()

[`URLSearchParams`](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams)接口的 **`getAll()`** 方法以数组的形式返回与指定搜索参数对应的所有值。

## 语法

```js
URLSearchParams.getAll(name)
```

### 参数

-   [name](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams/getAll#name)

    要返回的参数的名称。

### 返回值

一个[`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)数组。

## 例子

```js
let url = new URL('https://example.com?foo=1&bar=2');
let params = new URLSearchParams(url.search.slice(1));

//为 foo 参数添加第二个值
params.append('foo', 4);

console.log(params.getAll('foo')) //输出 ["1","4"].
```