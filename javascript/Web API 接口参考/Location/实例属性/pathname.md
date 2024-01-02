# Location: pathname

`Location` 接口的 `pathname` 属性是一个字符串，其中包含该位置的 URL 的路径。如果没有路径，则为空：否则， `pathname` `pathname` 包含首字母“/”，后跟 URL 的路径，不包括查询字符串或片段。

## 返回值

 一个字符串。

## 示例

```js
// Let's say we are on the URL https://developer.mozilla.org/en-US/docs/Web/API/Location/pathname#examples
console.log(location.pathname); // '/en-US/docs/Web/API/Location/pathname'
```