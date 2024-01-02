# URLSearchParams.append()

**append()** 是 [`URLSearchParams`](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams) 接口的一个方法。可以插入一个新搜索参数。

## 语法

```js
URLSearchParams.append(name, value)
```

### 参数

-   [name](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams/append#name)

    需要插入搜索参数的键名。

-   [value](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams/append#value)

    需要插入搜索参数的值。

### 返回

无

## 例子

```js
let url = new URL("https://example.com?foo=1&bar=2");
let params = new URLSearchParams(url.search.slice(1));

//添加第二个 foo 搜索参数。
params.append("foo", 4);
//查询字符串变成：'foo=1&bar=2&foo=4'
```