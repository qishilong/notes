# URLSearchParams.set()

[`URLSearchParams`](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams)接口的 **`set()`** 方法用于设置和搜索参数相关联的值。如果设置前已经存在匹配的值，该方法会删除多余的，如果将要设置的值不存在，则创建它。

## 语法

```
URLSearchParams.set(name, value)
```

### 参数

-   [键名](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams/set#键名)

    将要设置的参数的健值名。

-   [参数值](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams/set#参数值)

    所要设置的参数值。

### 返回值

Void

## 例子

```js
let url = new URL("https://example.com?foo=1&bar=2");
let params = new URLSearchParams(url.search.slice(1));

//Add a third parameter.
params.set("baz", 3);
```