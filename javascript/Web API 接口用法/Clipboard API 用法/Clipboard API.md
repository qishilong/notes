# Clipboard API

剪贴板 **Clipboard** **API** 提供了响应剪贴板命令（剪切、复制和粘贴）与异步读写系统剪贴板的能力。从权限 [Permissions API](https://developer.mozilla.org/zh-CN/docs/Web/API/Permissions_API) 获取权限之后，才能访问剪贴板内容；如果用户没有授予权限，则不允许读取或更改剪贴板内容。

该 API 被设计用来取代使用 [`document.execCommand()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/execCommand) 的剪贴板访问方式。

## [访问剪贴板](https://developer.mozilla.org/zh-CN/docs/Web/API/Clipboard_API#访问剪贴板)

除了在实例化中创建一个 `Clipboard` 对象，你还可以使用全局的 [`Navigator.clipboard`](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/clipboard) 来访问系统剪贴板。

```js
navigator.clipboard.readText().then(
  clipText => document.querySelector(".editor").innerText += clipText);
```

上述代码提取了剪贴板的文本并将其附在 class 为 `editor` 的第一个元素后面。因为当剪贴板中不是文本时， [`readText()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Clipboard/readText) (and [`read()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Clipboard/read), for that matter) 会返回一个空字符串，所以这段代码是安全的。

## [接口](https://developer.mozilla.org/zh-CN/docs/Web/API/Clipboard_API#接口)

- [`Clipboard`](https://developer.mozilla.org/zh-CN/docs/Web/API/Clipboard) 安全上下文

    提供了一个用于读写系统剪贴板上的文本和数据的接口。规范中被称为异步剪贴板 API（Async Clipboard API）。

- [`ClipboardEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/ClipboardEvent) 安全上下文

    表示提供了有关剪贴板修改的信息的事件，也就是 [`cut`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/cut_event)、[`copy`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/copy_event)，和 [`paste`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/paste_event)。规范中被称为剪贴板事件 API（Clipboard Event API）。