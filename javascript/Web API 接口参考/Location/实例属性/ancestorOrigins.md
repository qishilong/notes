# Location: ancestorOrigins

[`Location`](https://developer.mozilla.org/zh-CN/docs/Web/API/Location)接口的 **`ancestorOrigins`** 只读属性是一个静态的[`DOMStringList`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMStringList)，倒序排列了此[`Location`](https://developer.mozilla.org/zh-CN/docs/Web/API/Location)对象所属文档先前所有浏览上下文的来源。

你可以在脚本中使用`location.ancestorOrigins`来检测你的网页是否被你不希望的对象嵌入了。你也可以使用它让网页在被特定站点嵌入时做出不同的表现。

## 语法

```js
const ancestors = location.ancestorOrigins;
```