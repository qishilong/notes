# go()

`go()`方法从会话历史记录中加载特定页面。你可以使用它在历史记录中前后移动，具体取决于`delta`参数的值。

## [语法](https://developer.mozilla.org/zh-CN/docs/Web/API/History/go#语法)

JSCopy to Clipboard

```
window.history.go(delta);
```

### [参数](https://developer.mozilla.org/zh-CN/docs/Web/API/History/go#参数)

-   `delta` 可选

    相对于当前页面你要去往历史页面的位置。负值表示向后移动，正值表示向前移动。因此，例如：`history.go(2)`向前移动两页，`history.go(-2)`则向后移动两页。如果未向该函数传参或`delta`相等于 0，则该函数与调用`location.reload()`具有相同的效果。**备注：** 相等于 0 是采用宽松相等进行比较的。另外，JavaScript 值古怪的隐式转换在这里也是可用的。

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/API/History/go#示例)

向后移动一页（等价于调用[`back()`](https://developer.mozilla.org/zh-CN/docs/Web/API/History/back)）：

```
window.history.go(-1);
```

向前移动一页，就像调用了[`forward()`：](https://developer.mozilla.org/zh-CN/docs/Web/API/History/forward)

```
window.history.go(1);
```

向前移动两页：

```
window.history.go(2);
```

向后移动两页：

```
window.history.go(-2);
```

最后，以下任意一条语句都会重新加载当前页面：

```
window.history.go();
window.history.go(0);
```