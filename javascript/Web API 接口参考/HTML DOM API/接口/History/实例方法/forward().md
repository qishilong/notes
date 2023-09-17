# forward()

在会话历史中向前移动一页。它与使用`delta`参数为 1 时调用 `history.go(delta)`的效果相同。

## [语法](https://developer.mozilla.org/zh-CN/docs/Web/API/History/forward#语法)

```
window.history.forward();
```

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/API/History/forward#示例)

下述例子创建了一个按钮，该按钮会在会话历史中向前移动一步。

### [HTML](https://developer.mozilla.org/zh-CN/docs/Web/API/History/forward#html)

```
<button id="go-forward">Go Forward!</button>
```

### [JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/API/History/forward#javascript)

```
window.onload = function (e) {
  document.getElementById("go-forward").addEventListener("click", (e) => {
    window.history.forward();
  });
};
```