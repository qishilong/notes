# state

返回在 history 栈顶的 `任意` 值的拷贝。通过这种方式可以查看 state 值，不必等待 [`popstate`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/popstate_event)事件发生后再查看。

## [语法](https://developer.mozilla.org/zh-CN/docs/Web/API/History/state#语法)

```
let currentState = history.state;
```

如果不进行下面两种类型的调用，state 的值将会是 null

[`pushState()`](https://developer.mozilla.org/zh-CN/docs/Web/API/History/pushState) or [`replaceState()`](https://developer.mozilla.org/zh-CN/docs/Web/API/History/replaceState).

## [例子](https://developer.mozilla.org/zh-CN/docs/Web/API/History/state#例子)

下面 log 例句输出 history.state 的值，首先是在没有执行 [`pushState()`](https://developer.mozilla.org/zh-CN/docs/Web/API/History/pushState) 语句进而将值 push 到 history 之前的 log。下面一行 log 语句再次输出 state 值，此时 history.state 已经有值。可以在脚本文件中执行下面语句，或者在控制台直接执行。

```
// 值为 null 因为我们还没有修改 history 栈
console.log(`History.state before pushState: ${history.state}`);

// 现在 push 一些数据到栈里
history.replaceState({ name: "Example" }, "pushState example", "page3.html");

// 现在 state 已经有值了
console.log(`History.state after pushState: ${history.state}`);
```