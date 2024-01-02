# Location.assign()

**`Location.assign()`** 方法会触发窗口加载并显示指定的 URL 的内容。

如果由于安全原因无法执行跳转，那么会抛出一个 `SECURITY_ERROR` 类型的 [`DOMException`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMException)。当调用此方法的脚本来源和页面的 [`Location`](https://developer.mozilla.org/zh-CN/docs/Web/API/Location) 对象中定义的来源隶属于不同域的时候，就会抛出上述错误。

如果传入了一个无效的 URL，则会抛出一个 `SYNTAX_ERROR` 类型的 [`DOMException`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMException)。

## 语法

```js
location.assign(url);
```

### 参数

-   [`url`](https://developer.mozilla.org/zh-CN/docs/Web/API/Location/assign#url)

    一个包含了要跳转到的链接的[`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)。

## 示例

```js
// 跳转到 Location.reload() 这篇文章
document.location.assign(
  "https://developer.mozilla.org/zh-CN/docs/Web/API/Location/reload",
);
```