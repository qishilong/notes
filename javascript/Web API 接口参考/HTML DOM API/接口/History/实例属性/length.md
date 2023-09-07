# History.length

History.length 是一个只读属性，返回当前 session 中的 history 个数，包含当前页面在内。举个例子，对于新开一个 tab 加载的页面当前属性返回值 1。

## [语法](https://developer.mozilla.org/zh-CN/docs/Web/API/History/length#语法)

```
length = history.length;
```

## [例子](https://developer.mozilla.org/zh-CN/docs/Web/API/History/length#例子)

```
var result = window.history.length; // 返回当前 session 中的 history 个数
```