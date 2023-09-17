# back()

`back()`方法会在会话历史记录中向后移动一页。如果没有上一页，则此方法调用不执行任何操作。

## [语法](https://developer.mozilla.org/zh-CN/docs/Web/API/History/back#语法)

```
back()
```

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/API/History/back#示例)

下述简短示例使页面上的按钮导航页面至会话历史的后一项。

### [HTML](https://developer.mozilla.org/zh-CN/docs/Web/API/History/back#html)

```
<button id="go-back">Go back!</button>
```

### [JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/API/History/back#javascript)

```
window.onload = function (e) {
  document.getElementById("go-back").addEventListener("click", (e) => {
    window.history.back();
  });
};
```