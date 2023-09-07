# Function

每个 JavaScript 函数实际上都是一个 `Function` 对象。运行 `(function(){}).constructor === Function // true` 便可以得到这个结论。

## [构造函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function#构造函数)

-   [`Function()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/Function)

    创建一个新的 `Function` 对象。直接调用此构造函数可以动态创建函数，但会遇到和 [`eval()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval) 类似的的安全问题和（相对较小的）性能问题。然而，与 `eval()` 不同的是，`Function` 构造函数创建的函数只能在全局作用域中运行。

## [实例属性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function#实例属性)

-   [`Function.prototype.arguments`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/arguments) 已弃用

    对应传递给函数的参数数组，这个 [`Function`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function) 的属性已被弃用，请改用 [`arguments`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments) 对象（仅在函数范围内可用）。

-   [`Function.prototype.caller`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/caller) 已弃用

    表明调用当前函数执行的函数，此属性已被弃用，且仅对一些不严格的函数可用。

-   [`Function.prototype.displayName`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/displayName)

    函数的显示名称。

-   [`Function.prototype.length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/length)

    函数期望的参数数量。

-   [`Function.prototype.name`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/name)

    函数的名称。

## [实例方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function#实例方法)

-   [`Function.prototype.apply(thisArg [, argsArray\])`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)

    调用一个函数并将其 `this` 的值设置为提供的 `thisArg`。参数可用以通过[`数组`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)对象传递。

-   [`Function.prototype.bind(thisArg[, arg1[, arg2[, ...argN\]]])`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

    创建一个新的函数，该函数在调用时，会将 `this` 设置为提供的 `thisArg`。在调用新绑定的函数时，可选的参数序列（`[, arg1[, arg2[, ...argN]]]`）会被提前添加到参数序列中（译者注：即调用绑定创建的函数时，传递的参数会接续在可选参数序列后）。

-   [`Function.prototype.call(thisArg[, arg1, arg2, ...argN\])`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)

    调用一个函数，并将其 `this` 值设置为提供的值。也可以选择传输新参数。

-   [`Function.prototype.toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/toString)

    返回表示函数源码的字符串。覆盖了 [`Object.prototype.toString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) 方法。

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function#示例)

### [Function 构造函数与函数声明之间的不同](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function#function_构造函数与函数声明之间的不同)

由 `Function` 构造函数创建的函数不会创建当前环境的闭包，它们总是被创建于全局环境，因此在运行时它们只能访问全局变量和自己的局部变量，不能访问它们被 `Function` 构造函数创建时所在的作用域的变量。这一点与使用 [`eval()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval) 执行创建函数的代码不同。

```
var x = 10;

function createFunction1() {
  var x = 20;
  return new Function("return x;"); // 这里的 x 指向最上面全局作用域内的 x
}

function createFunction2() {
  var x = 20;
  function f() {
    return x; // 这里的 x 指向上方本地作用域内的 x
  }
  return f;
}

var f1 = createFunction1();
console.log(f1()); // 10
var f2 = createFunction2();
console.log(f2()); // 20
```

虽然这段代码可以在浏览器中正常运行，但在 Node.js 中 `f1()` 会产生一个“找不到变量 `x`”的 `ReferenceError`。这是因为在 Node 中顶级作用域不是全局作用域，而 `x` 其实是在当前模块的作用域之中。