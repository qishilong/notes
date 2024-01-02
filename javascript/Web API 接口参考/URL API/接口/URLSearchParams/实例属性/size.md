# URLSearchParams: size 属性

`size` 接口的 `URLSearchParams` 只读属性指示搜索参数条目的总数。

注意：此功能在 Web Workers 中可用

##  值

一个数字，指示 `URLSearchParams` 对象中搜索参数条目的总数。

##  示例

### 获取搜索参数条目的数量

您可以像这样获取搜索参数条目的总数：

```js
const searchParams = new URLSearchParams("c=4&a=2&b=3&a=1");
searchParams.size; // 4
```

请注意， `a` 参数给出了两次，但 `size` 返回所有给定条目的数量 (4)，而不是 3。要获取唯一键的数量，您可以使用 `Set` ，例如：

```js
[...new Set(searchParams.keys())].length; // 3
```

### 检查搜索参数是否存在

`size` 属性可用于检查是否存在任何搜索参数：

```js
const url = new URL("https://example.com?foo=1&bar=2");

if (url.searchParams.size) {
  console.log("URL has search parameters!");
}
```