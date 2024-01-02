# Location.replace()

**`Location.replace()`** 方法以给定的 URL 来替换当前的资源。与 [`assign()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Location/assign) 方法 不同的是，调用 `replace()` 方法后，当前页面不会保存到会话历史中（session [`History`](https://developer.mozilla.org/zh-CN/docs/Web/API/History)），这样，用户点击*回退*按钮时，将不会再跳转到该页面。

因违反安全规则导致的赋值失败，浏览器将会抛出类型为 `SECURITY_ERROR` 的 [`DOMException`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMException) 异常。当调用该方法的脚本所属的源与拥有 [`Location`](https://developer.mozilla.org/zh-CN/docs/Web/API/Location) 对象所属源不同时，通常情况会发生这种异常，此时通常该脚本是存在不同的域下。

如果 URL 无效，浏览器也会抛出 `SYNTAX_ERROR` 类型的 [`DOMException`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMException) 异常。

## 语法

```
object.replace(url);
```

### 参数

-   [*url*](https://developer.mozilla.org/zh-CN/docs/Web/API/Location/replace#url)

    [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 类型，指定所导航到的页面的 URL 地址。

## 示例

```js
// Navigate to the Location.reload article by replacing this page
window.location.replace(
  "https://developer.mozilla.org/zh-CN/docs/Web/API/Location/reload",
);
```