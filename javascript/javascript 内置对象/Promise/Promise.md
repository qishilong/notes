# 概述

## 使用Promise

[`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 是一个对象，它代表了一个异步操作的最终完成或者失败。因为大多数人仅仅是使用已创建的 Promise 实例对象，所以本教程将首先说明怎样使用 Promise，再说明如何创建 Promise。

本质上 Promise 是一个函数返回的对象，我们可以在它上面绑定回调函数，这样我们就不需要在一开始把回调函数作为参数传入这个函数了。

假设现在有一个名为 `createAudioFileAsync()` 的函数，它接收一些配置和两个回调函数，然后异步地生成音频文件。一个回调函数在文件成功创建时被调用，另一个则在出现异常时被调用。

以下为使用 `createAudioFileAsync()` 的示例：

```js
// 成功的回调函数
function successCallback(result) {
  console.log("音频文件创建成功：" + result);
}

// 失败的回调函数
function failureCallback(error) {
  console.log("音频文件创建失败：" + error);
}

createAudioFileAsync(audioSettings, successCallback, failureCallback)
```

更现代的函数会返回一个 Promise 对象，使得你可以将你的回调函数绑定在该 Promise 上。

如果函数 `createAudioFileAsync()` 被重写为返回 Promise 的形式，那么我们可以像下面这样简单地调用它：

```js
const promise = createAudioFileAsync(audioSettings);
promise.then(successCallback, failureCallback);
```

或者简写为：

```js
createAudioFileAsync(audioSettings).then(successCallback, failureCallback);
```

我们把这个称为 异步函数调用，这种形式有若干优点，下面我们将会逐一讨论。

### 约定

不同于“老式”的传入回调，在使用 Promise 时，会有以下约定：

- 在本轮 [事件循环](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop#执行至完成) 运行完成之前，回调函数是不会被调用的。
- 即使异步操作已经完成（成功或失败），在这之后通过 [`then()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) 添加的回调函数也会被调用。
- 通过多次调用 [`then()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) 可以添加多个回调函数，它们会按照插入顺序进行执行。

Promise 很棒的一点就是**链式调用**（**chaining**）。

### 链式调用

连续执行两个或者多个异步操作是一个常见的需求，在上一个操作执行成功之后，开始下一个的操作，并带着上一步操作所返回的结果。我们可以通过创造一个 **Promise 链**来实现这种需求。

见证奇迹的时刻：`then()` 函数会返回一个和原来不同的**新的 Promise**：

```js
const promise = doSomething();
const promise2 = promise.then(successCallback, failureCallback);
```

或者

```js
const promise2 = doSomething().then(successCallback, failureCallback);
```

`promise2` 不仅表示 `doSomething()` 函数的完成，也代表了你传入的 `successCallback` 或者 `failureCallback` 的完成，这两个函数也可以返回一个 Promise 对象，从而形成另一个异步操作，这样的话，在 `promise2` 上新增的回调函数会排在这个 Promise 对象的后面。

基本上，每一个 Promise 都代表了链中另一个异步过程的完成。

在过去，要想做多重的异步操作，会导致经典的回调地狱：

```js
doSomething(function(result) {
  doSomethingElse(result, function(newResult) {
    doThirdThing(newResult, function(finalResult) {
      console.log('Got the final result: ' + finalResult);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);
```

现在，我们可以把回调绑定到返回的 Promise 上，形成一个 Promise 链：

```js
doSomething().then(function(result) {
  return doSomethingElse(result);
})
.then(function(newResult) {
  return doThirdThing(newResult);
})
.then(function(finalResult) {
  console.log('Got the final result: ' + finalResult);
})
.catch(failureCallback);
```

then 里的参数是可选的，`catch(failureCallback)` 是 `then(null, failureCallback)` 的缩略形式。如下所示，我们也可以用[箭头函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)来表示：

```js
doSomething()
.then(result => doSomethingElse(result))
.then(newResult => doThirdThing(newResult))
.then(finalResult => {
  console.log(`Got the final result: ${finalResult}`);
})
.catch(failureCallback);
```

> **注意：**
>
> 一定要有返回值，否则，callback 将无法获取上一个 Promise 的结果。(如果使用箭头函数，`() => x` 比 `() => { return x; }` 更简洁一些，但后一种保留 `return` 的写法才支持使用多个语句。）。

#### Catch 的后续链式操作

有可能会在一个回调失败之后继续使用链式操作，即，使用一个 `catch`，这对于在链式操作中抛出一个失败之后，再次进行新的操作会很有用。请阅读下面的例子：

```js
new Promise((resolve, reject) => {
    console.log('初始化');

    resolve();
})
.then(() => {
    throw new Error('有哪里不对了');

    console.log('执行「这个」”');
})
.catch(() => {
    console.log('执行「那个」');
})
.then(() => {
    console.log('执行「这个」，无论前面发生了什么');
});
```

输出结果如下：

```bash
初始化
执行“那个”
执行“这个”，无论前面发生了什么
```

**注意：**因为抛出了错误 **有哪里不对了**，所以前一个 **执行「这个」** 没有被输出。

### 错误传递

在之前的回调地狱示例中，你可能记得有 3 次 `failureCallback` 的调用，而在 Promise 链中只有尾部的一次调用。

```js
doSomething()
.then(result => doSomethingElse(result))
.then(newResult => doThirdThing(newResult))
.then(finalResult => console.log(`Got the final result: ${finalResult}`))
.catch(failureCallback);
```

通常，一遇到异常抛出，浏览器就会顺着 Promise 链寻找下一个 `onRejected` 失败回调函数或者由 `.catch()` 指定的回调函数。这和以下同步代码的工作原理（执行过程）非常相似。

```js
try {
  let result = syncDoSomething();
  let newResult = syncDoSomethingElse(result);
  let finalResult = syncDoThirdThing(newResult);
  console.log(`Got the final result: ${finalResult}`);
} catch(error) {
  failureCallback(error);
}
```

在 ECMAScript 2017 标准的 [`async/await`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function) 语法糖中，这种异步代码的对称性得到了极致的体现：

```js
async function foo() {
  try {
    const result = await doSomething();
    const newResult = await doSomethingElse(result);
    const finalResult = await doThirdThing(newResult);
    console.log(`Got the final result: ${finalResult}`);
  } catch(error) {
    failureCallback(error);
  }
}
```

这个例子是在 Promise 的基础上构建的，例如，`doSomething()` 与之前的函数是相同的。你可以在[这里](https://developers.google.com/web/fundamentals/getting-started/primers/async-functions)阅读更多的与此语法相关的文章。

通过捕获所有的错误，甚至抛出异常和程序错误，Promise 解决了回调地狱的基本缺陷。这对于构建异步操作的基础功能而言是很有必要的。

### Promise 拒绝事件

当 Promise 被拒绝时，会有下文所述的两个事件之一被派发到全局作用域（通常而言，就是[`window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window)；如果是在 web worker 中使用的话，就是 [`Worker`](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker) 或者其他 worker-based 接口）。这两个事件如下所示：

- [`rejectionhandled`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/rejectionhandled_event)

    当 Promise 被拒绝、并且在 `reject` 函数处理该 rejection 之后会派发此事件。

- [`unhandledrejection`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/unhandledrejection_event)

    当 Promise 被拒绝，但没有提供 `reject` 函数来处理该 rejection 时，会派发此事件。

以上两种情况中，[`PromiseRejectionEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/PromiseRejectionEvent) 事件都有两个属性，一个是 [`promise`](https://developer.mozilla.org/zh-CN/docs/Web/API/PromiseRejectionEvent/promise) 属性，该属性指向被驳回的 Promise，另一个是 [`reason` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/PromiseRejectionEvent/reason) 属性，该属性用来说明 Promise 被驳回的原因。

因此，我们可以通过以上事件为 Promise 失败时提供补偿处理，也有利于调试 Promise 相关的问题。在每一个上下文中，该处理都是全局的，因此不管源码如何，所有的错误都会在同一个处理函数中被捕捉并处理。

一个特别有用的例子：当你使用 [Node.js](https://developer.mozilla.org/zh-CN/docs/Glossary/Node.js) 时，有些依赖模块可能会有未被处理的 rejected promises，这些都会在运行时打印到控制台。你可以在自己的代码中捕捉这些信息，然后添加与 [`unhandledrejection`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/unhandledrejection_event) 相应的处理函数来做分析和处理，或只是为了让你的输出更整洁。举例如下：

```js
window.addEventListener("unhandledrejection", event => {
  /* 你可以在这里添加一些代码，以便检查
     event.promise 中的 promise 和
     event.reason 中的 rejection 原因 */

  event.preventDefault();
}, false);
```

调用 event 的 [`preventDefault()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/preventDefault) 方法是为了告诉 JavaScript 引擎当 Promise 被拒绝时不要执行默认操作，默认操作一般会包含把错误打印到控制台，Node 就是如此的。

理想情况下，在忽略这些事件之前，我们应该检查所有被拒绝的 Promise，来确认这不是代码中的 bug。

### 在旧式回调 API 中创建 Pormise

可以通过 Promise 的构造器从零开始创建 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)。这种方式（通过构造器的方式）应当只在封装旧 API 的时候用到。

理想状态下，所有的异步函数都已经返回 Promise 了。但有一些 API 仍然使用旧方式来传入的成功（或者失败）的回调。典型的例子就是 [`setTimeout()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout) 函数：

```js
setTimeout(() => saySomething("10 seconds passed"), 10000);
```

混用旧式回调和 Promise 可能会造成运行时序问题。如果 `saySomething` 函数失败了，或者包含了编程错误，那就没有办法捕获它了。这得怪 `setTimeout`。

幸运地是，我们可以用 Promise 来封装它。最好的做法是，将这些有问题的函数封装起来，留在底层，并且永远不要再直接调用它们：

```js
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

wait(10000).then(() => saySomething("10 seconds")).catch(failureCallback);
```

通常，Promise 的构造器接收一个执行函数 (executor)，我们可以在这个执行函数里手动地 resolve 和 reject 一个 Promise。既然 `setTimeout` 并不会真的执行失败，那么我们可以在这种情况下忽略 reject。

### 组合

[`Promise.resolve()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve) 和 [`Promise.reject()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject) 是手动创建一个已经 resolve 或者 reject 的 Promise 快捷方法。它们有时很有用。

[`Promise.all()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) 和 [`Promise.race()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/race) 是并行运行异步操作的两个组合式工具。

我们可以发起并行操作，然后等多个操作全部结束后进行下一步操作，如下：

```js
Promise.all([func1(), func2(), func3()])
.then(([result1, result2, result3]) => { /* use result1, result2 and result3 */ });
```

可以使用一些聪明的 JavaScript 写法实现时序组合：

```js
[func1, func2, func3].reduce((p, f) => p.then(f), Promise.resolve())
.then(result3 => { /* use result3 */ });
```

通常，我们递归调用一个由异步函数组成的数组时，相当于一个 Promise 链：

```js
Promise.resolve().then(func1).then(func2).then(func3);
```

我们也可以写成可复用的函数形式，这在函数式编程中极为普遍：

```js
const applyAsync = (acc,val) => acc.then(val);
const composeAsync = (...funcs) => x => funcs.reduce(applyAsync, Promise.resolve(x));
```

`composeAsync()` 函数将会接受任意数量的函数作为其参数，并返回一个新的函数，该函数接受一个通过 composition pipeline 传入的初始值。这对我们来说非常有益，因为任一函数可以是异步或同步的，它们能被保证按顺序执行：

```js
const transformData = composeAsync(func1, func2, func3);
const result3 = transformData(data);
```

在 ECMAScript 2017 标准中，时序组合可以通过使用 `async/await` 而变得更简单：

```js
let result;
for (const f of [func1, func2, func3]) {
  result = await f(result);
}
/* use last result (i.e. result3) */
```

### 时序

为了避免意外，即使是一个已经变成 resolve 状态的 Promise，传递给 [`then()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) 的函数也总是会被异步调用：

```js
Promise.resolve().then(() => console.log(2));
console.log(1); // 1, 2
```

传递到 `then()` 中的函数被置入到一个微任务队列中，而不是立即执行，这意味着它是在 JavaScript 事件队列的所有运行时结束了，且事件队列被清空之后，才开始执行：

```js
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

wait().then(() => console.log(4));
Promise.resolve().then(() => console.log(2)).then(() => console.log(3));
console.log(1); // 1, 2, 3, 4
```

### 嵌套

简便的 Promise 链式编程最好保持扁平化，不要嵌套 Promise，因为嵌套经常会是粗心导致的。可查阅下一节的[常见错误](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises#常见错误)中的例子。

嵌套 Promise 是一种可以限制 `catch` 语句的作用域的控制结构写法。明确来说，嵌套的 `catch` 仅捕捉在其之前同时还必须是其作用域的 failureres，而捕捉不到在其链式以外或者其嵌套域以外的 error。如果使用正确，那么可以实现高精度的错误修复。

```js
doSomethingCritical()
.then(result => doSomethingOptional()
  .then(optionalResult => doSomethingExtraNice(optionalResult))
  .catch(e => {console.log(e.message)})) // 即使有异常也会忽略，继续运行;(最后会输出)
.then(() => moreCriticalStuff())
.catch(e => console.log("Critical failure: " + e.message));// 没有输出
```

注意，有些代码步骤是嵌套的，而不是一个简单的纯链式，这些语句前与后都被括号 `()` 包裹着。

这个内部的 `catch` 语句仅能捕获到 `doSomethingOptional()` 和 `doSomethingExtraNice()` 的失败，`之后就恢复到 moreCriticalStuff()` 的运行。重要提醒：如果 `doSomethingCritical()` 失败，这个错误仅会被最后的（外部）`catch` 语句捕获到。

### 常见错误

在编写 Promise 链时，需要注意以下示例中展示的几个错误：

```js
// 错误示例，包含 3 个问题！

doSomething().then(function(result) {
  doSomethingElse(result) // 没有返回 Promise 以及没有必要的嵌套 Promise
  .then(newResult => doThirdThing(newResult));
}).then(() => doFourthThing());
// 最后，是没有使用 catch 终止 Promise 调用链，可能导致没有捕获的异常
```

第一个错误是没有正确地将事物相连接。当我们创建新 Promise 但忘记返回它时，会发生这种情况。因此，链条被打破，或者更确切地说，我们有两个独立的链条竞争（同时在执行两个异步而非一个一个的执行）。这意味着 `doFourthThing()` 不会等待 `doSomethingElse()` 或 `doThirdThing()` 完成，并且将与它们并行运行，可能是无意的。单独的链也有单独的错误处理，导致未捕获的错误。

第二个错误是不必要地嵌套，实现第一个错误。嵌套还限制了内部错误处理程序的范围，如果是非预期的，可能会导致未捕获的错误。其中一个变体是 [Promise 构造函数反模式](https://stackoverflow.com/questions/23803743/what-is-the-explicit-promise-construction-antipattern-and-how-do-i-avoid-it)，它结合了 Promise 构造函数的多余使用和嵌套。

第三个错误是忘记用 `catch` 终止链。这导致在大多数浏览器中不能终止的 Promise 链里的 rejection。

一个好的经验法则是总是返回或终止 Promise 链，并且一旦你得到一个新的 Promise，返回它。下面是修改后的平面化的代码：

```js
doSomething()
.then(function(result) {
  return doSomethingElse(result);
})
.then(newResult => doThirdThing(newResult))
.then(() => doFourthThing())
.catch(error => console.log(error));
```

注意：`() => x` 是 `() => { return x; }` 的简写。

上述代码的写法就是具有适当错误处理的简单明确的链式写法。

使用 [async/await](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function) 可以解决以上大多数错误，使用 `async/await` 时，最常见的语法错误就是忘记了 [`await`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await) 关键字。

# 详细

**`Promise`** 对象用于表示一个异步操作的最终完成（或失败）及其结果值。

> 备注：此特性在 [Web Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API) 中可用

## Promise

### 描述

一个 `Promise` 对象代表一个在这个 promise 被创建出来时不一定已知值的代理。它让你能够把异步操作最终的成功返回值或者失败原因和相应的处理程序关联起来。这样使得异步方法可以像同步方法那样返回值：异步方法并不会立即返回最终的值，而是会返回一个 *promise*，以便在未来某个时候把值交给使用者。

一个 `Promise` 必然处于以下几种状态之一：

- *待定（pending）*：初始状态，既没有被兑现，也没有被拒绝。
- *已兑现（fulfilled）*：意味着操作成功完成。
- *已拒绝（rejected）*：意味着操作失败。

待定状态的 Promise 对象要么会通过一个值*被兑现*，要么会通过一个原因（错误）*被拒绝*。当这些情况之一发生时，我们用 promise 的 `then` 方法排列起来的相关处理程序就会被调用。如果 promise 在一个相应的处理程序被绑定时就已经被兑现或被拒绝了，那么这个处理程序也同样会被调用，因此在完成异步操作和绑定处理方法之间不存在竞态条件。

因为 `Promise.prototype.then` 和 `Promise.prototype.catch` 方法返回的是 promise，所以它们可以被链式调用。

![img](https://images-1305186932.cos.ap-beijing.myqcloud.com/images/202302081518359.png)

> 备注：
>
>  有一些语言中有惰性求值和延迟计算的特性，它们也被称为“promise”，例如 Scheme。JavaScript 中的 promise 代表的是已经在发生的进程，而且可以通过回调函数实现链式调用。如果你想对一个表达式进行惰性求值，就考虑一下使用无参数的箭头函数，如 `f = () => expression` 来创建惰性求值的表达式，然后使用 `f()` 进行求值。
>
> 如果一个 promise 已经被兑现或被拒绝，那么我们也可以说它处于 *已敲定（settled）* 状态。你还会听到一个经常跟 promise 一起使用的术语：*已决议（resolved）*，它表示 promise 已经处于已敲定状态，或者为了匹配另一个 promise 的状态被“锁定”了。Domenic Denicola 的 [States and fates](https://github.com/domenic/promises-unwrapping/blob/master/docs/states-and-fates.md) 中有更多关于 promise 术语的细节可以供你参考。

#### Promise 的链式调用

我们可以用 `Promise.prototype.then()`、`Promise.prototype.catch()` 和 `Promise.prototype.finally()` 这些方法将进一步的操作与一个变为已敲定状态的 promise 关联起来。

例如 `.then()` 方法需要两个参数，第一个参数作为处理已兑现状态的回调函数，而第二个参数则作为处理已拒绝状态的回调函数。每一个 `.then()` 方法还会返回一个新生成的 promise 对象，这个对象可被用作链式调用，就像这样：

```js
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('foo');
  }, 300);
});

myPromise
  .then(handleResolvedA, handleRejectedA)
  .then(handleResolvedB, handleRejectedB)
  .then(handleResolvedC, handleRejectedC);
```

当 `.then()` 中缺少能够返回 promise 对象的函数时，链式调用就直接继续进行下一环操作。因此，链式调用可以在最后一个 `.catch()` 之前把所有的处理已拒绝状态的回调函数都省略掉。

过早地处理变为已拒绝状态的 promise 会对之后 promise 的链式调用造成影响。不过有时候我们因为需要马上处理一个错误也只能这样做。例如，外面必须抛出某种类型的错误以在链式调用中传递错误状态。另一方面，在没有迫切需要的情况下，可以在最后一个 `.catch()` 语句时再进行错误处理，这种做法更加简单。`.catch()` 其实只是没有给处理已兑现状态的回调函数预留参数位置的 `.then()` 而已。

```js
myPromise
  .then(handleResolvedA)
  .then(handleResolvedB)
  .then(handleResolvedC)
  .catch(handleRejectedAny);
```

使用[箭头函数表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)作为 promise 回调函数的示例如下：

```js
myPromise
  .then(value => { return value + ' and bar'; })
  .then(value => { return value + ' and bar again'; })
  .then(value => { return value + ' and again'; })
  .then(value => { return value + ' and again'; })
  .then(value => { console.log(value) })
  .catch(err => { console.log(err) });
```

这些函数的终止状态决定着链式调用中下一个 promise 的“已敲定”状态是什么。“已决议”状态意味着 promise 已经成功完成，而“已拒绝”则表示 promise 未成功完成。“已决议”状态的返回值会逐级传递到下一个 `.then()` 中，而“已拒绝”的理由则会被传递到链中的下一个已拒绝状态的处理函数。

链式调用中的 promise 们就像俄罗斯套娃一样，是嵌套起来的，但又像是一个栈，每个都必须从顶端被弹出。链式调用中的第一个 promise 是嵌套最深的一个，也将是第一个被弹出的。

```js
(promise D, (promise C, (promise B, (promise A) ) ) )
```

当存在一个 `nextValue` 是 promise 时，就会出现一种动态的替换效果。`return` 会导致一个 promise 被弹出，但这个 `nextValue` promise 则会被推入被弹出 promise 原来的位置。对于上面所示的嵌套场景，假设与 "promise B" 相关的 `.then()` 返回了一个值为 "promise X" 的 `nextValue` 。那么嵌套的结果看起来就会是这样：

```js
(promise D, (promise C, (promise X) ) )
```

一个 promise 可能会参与不止一次的嵌套。对于下面的代码，`promiseA` 向“已敲定”状态的过渡会导致两个实例的 `.then` 都被调用。

```js
const promiseA = new Promise(myExecutorFunc);
const promiseB = promiseA.then(handleFulfilled1, handleRejected1);
const promiseC = promiseA.then(handleFulfilled2, handleRejected2);
```

一个已经处于“已敲定”状态的 promise 也可以接收操作。在那种情况下，（如果没有问题的话）这个操作会被作为第一个异步操作被执行。注意，所有的 promise 都一定是异步的。因此，一个已经处于“已敲定”状态的 promise 中的操作只有 promise 链式调用的栈被清空且一个时间片段过去之后才会被执行。这种效果跟 `setTimeout(action, 10)` 特别相似。

```js
const promiseA = new Promise( (resolutionFunc,rejectionFunc) => {
    resolutionFunc(777);
});
// At this point, "promiseA" is already settled.
promiseA.then( (val) => console.log("asynchronous logging has val:",val) );
console.log("immediate logging");

// produces output in this order:
// immediate logging
// asynchronous logging has val: 777
```

#### 追踪现有设置对象

设置对象（settings object）是 JavaScript 代码运行时用于提供附加信息的[环境](https://html.spec.whatwg.org/multipage/webappapis.html#environment-settings-object)。它包含了领域（realm）和模块映射（module map），以及 HTML 的特定信息，如来源（origin）等。对现有设置对象的追踪保证了浏览器知道用户给定的哪些代码片段需要使用。

为了更好地说明这一点，我们在这里进一步探讨领域是如何引发问题的。我们可以粗略地认为**领域**是一个全局对象。其独特之处在于，它拥有运行 JavaScript 代码所需的所有信息。这包括像 [`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array) 和 [`Error`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error) 这样的对象。每一个设置对象都有自己的“副本”，而且它们与副本之间是不共享的。这可能会导致一些与 promise 相关的意外行为。为了解决这个问题，我们需要追踪**现有设置对象**（incumbent settings object）。它表示负责用户某个函数调用工作的特定信息。

我们可以尝试在文档中嵌入 <iframe>，并让其与父级上下文通信。由于所有的 web API 都有现有设置对象，下面的代码能够在所有的浏览器中运行：

```
<!DOCTYPE html>
<iframe></iframe> <!-- we have a realm here -->
<script> // we have a realm here as well
  const bound = frames[0].postMessage.bind(
    frames[0], "some data", "*");
    // bound is a built-in function -- there is no user
    // code on the stack, so which realm do we use?
  window.setTimeout(bound);
  // this still works, because we use the youngest
  // realm (the incumbent) on the stack
</script>
```

同样的概念也适用与 promise。如果我们稍加修改上面的示例，我们就能得到这个：

```js
<!DOCTYPE html>
<iframe></iframe> <!-- we have a realm here -->
<script> // we have a realm here as well
  const bound = frames[0].postMessage.bind(
    frames[0], "some data", "*");
    // bound is a built in function -- there is no user
    // code on the stack -- which realm do we use?
  Promise.resolve(undefined).then(bound);
  // this still works, because we use the youngest
  // realm (the incumbent) on the stack
</script>
```

如果我们修改代码，使用文档中的 `<iframe>` 来监听发送的消息，我们可以观察到现有设置对象的影响：

```js
<!-- y.html -->
<!DOCTYPE html>
<iframe src="x.html"></iframe>
<script>
  const bound = frames[0].postMessage.bind(frames[0], "some data", "*");
  Promise.resolve(undefined).then(bound);
</script>
```

```js
<!-- x.html -->
<!DOCTYPE html>
<script>
window.addEventListener("message", (event) => {
  document.querySelector("#text").textContent = "hello";
  // 这一部分代码仅在追踪现有设置对象的浏览器中会被运行
  console.log(event);
}, false);
</script>
```

在上面的示例中，`<iframe>` 仅在现有设置对象被追踪时才会被更新。这是因为在不追踪的情况下，我们可能会使用错误的环境发送消息。

> 备注：
>
>  目前，Firefox 完全实现了现有领域追踪，Chrome 和 Safari 仅部分实现。

### 构造函数

#### [`Promise()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise)

创建一个新的 `Promise` 对象。该构造函数主要用于包装还没有添加 promise 支持的函数。

### 静态方法

#### [`Promise.all(iterable)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

这个方法返回一个新的 promise 对象，等到所有的 promise 对象都成功或有任意一个 promise 失败。

如果所有的 promise 都成功了，它会把一个包含 iterable 里所有 promise 返回值的数组作为成功回调的返回值。顺序跟 iterable 的顺序保持一致。

一旦有任意一个 iterable 里面的 promise 对象失败则立即以该 promise 对象失败的理由来拒绝这个新的 promise。

#### [`Promise.allSettled(iterable)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)

等到所有 promise 都已敲定（每个 promise 都已兑现或已拒绝）。

返回一个 promise，该 promise 在所有 promise 都敲定后完成，并兑现一个对象数组，其中的对象对应每个 promise 的结果。

#### [`Promise.any(iterable)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/any)

接收一个 promise 对象的集合，当其中的任意一个 promise 成功，就返回那个成功的 promise 的值。

#### [`Promise.race(iterable)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)

等到任意一个 promise 的状态变为已敲定。

当 iterable 参数里的任意一个子 promise 成功或失败后，父 promise 马上也会用子 promise 的成功返回值或失败详情作为参数调用父 promise 绑定的相应处理函数，并返回该 promise 对象。

#### [`Promise.reject(reason)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject)

返回一个状态为已拒绝的 `Promise` 对象，并将给定的失败信息传递给对应的处理函数。

#### [`Promise.resolve(value)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve)

返回一个状态由给定 value 决定的 `Promise` 对象。如果该值是 thenable（即，带有 `then` 方法的对象），返回的 Promise 对象的最终状态由 then 方法执行结果决定；否则，返回的 Promise 对象状态为已兑现，并且将该 value 传递给对应的 then 方法。

通常而言，如果你不知道一个值是否是 promise 对象，使用 [`Promise.resolve(value)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve) 来返回一个 Promise 对象，这样就能将该 value 以 promise 对象形式使用。

### 实例方法

参阅[微任务指南](https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_DOM_API/Microtask_guide)以了解有关这些方法如何使用为任务队列和服务。

#### [`Promise.prototype.catch()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)

为 promise 添加一个被拒绝状态的回调函数，并返回一个新的 promise，若回调函数被调用，则兑现其返回值，否则兑现原来的 promise 兑现的值。

#### [`Promise.prototype.then()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)

为 promise 添加被兑现和被拒绝状态的回调函数，其以回调函数的返回值兑现 promise。若不处理已兑现或者已拒绝状态（例如，`onFulfilled` 或 `onRejected` 不是一个函数），则返回 promise 被敲定时的值。

#### [`Promise.prototype.finally()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally)

为 promise 添加一个回调函数，并返回一个新的 promise。这个新的 promise 将在原 promise 被兑现时兑现。而传入的回调函数将在原 promise 被敲定（无论被兑现还是被拒绝）时被调用。

### 示例

#### 基础示例

```js
let myFirstPromise = new Promise((resolve, reject) => {
  // We call resolve(...) when what we were doing asynchronously was successful, and reject(...) when it failed.
  // In this example, we use setTimeout(...) to simulate async code.
  // In reality, you will probably be using something like XHR or an HTML5 API.
  setTimeout( function() {
    resolve("Success!")  // Yay! Everything went well!
  }, 250)
})

myFirstPromise.then((successMessage) => {
  // successMessage is whatever we passed in the resolve(...) function above.
  // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
  console.log("Yay! " + successMessage)
});
Copy to ClipboardCopy to ClipboardCopy to ClipboardCopy to ClipboardCopy to ClipboardCopy to Clipboard
```

#### 不同场景的示例

此示例展示了使用 promise 的多种方法，以及其可能发生的多种情况。要理解这一点，首先滚动到代码块的底部，然后查看 promise 调用链。在创建初始的 primise 后，可以接上一条 promise 调用链。该调用链由 `.then()` 组成，通常（但不一定）在末尾会有一个 `.catch()`，并可能会接上一个 `.finnaly()`。在本示例中，promise 调用链是由一个自定义的 `new Promise()` 构造并发起的；但在实践中，promise 调用链通常由一个 API 函数（由其他人编写的）返回的 promise 开始。

示例函数 `tetheredGetNumber()` 会在设置同步调用或者函数内部抛出异常时调用 `reject()`。函数 `promiseGetWord()` 展示了如何在 API 函数内部创建并返回一个 promise。

请注意，函数 `troubleWithGetNumber()` 以 `throw()` 结束。这是强制的做法，因为 ES6 的 promsie 会遍历所有的 `.then` promise，在遇到错误时，如果不使用 `throw()`，这个错误会被当作“已修复”。这很麻烦，因此，通常会在 `.then()` promise 调用链中忽略 `rejectionFunc`，而仅在最后的 `.catch()` 中保留一个 `rejectionFunc`。另一种方法是抛出一个特殊值（本例使用了 `-999`，但使用自定义错误类型更合适）。

示例代码可以在 NodeJS 下运行。请通过查看实际发生的错误来理解代码。若要提高错误发生的概率，请该改变 `threshold` 的值。

```js
"use strict";

// To experiment with error handling, "threshold" values cause errors randomly
const THRESHOLD_A = 8; // can use zero 0 to guarantee error

function tetheredGetNumber(resolve, reject) {
  try {
    setTimeout(
      function() {
        const randomInt = Date.now();
        const value = randomInt % 10;
        try {
          if(value >= THRESHOLD_A) {
            throw new Error(`Too large: ${value}`);
          }
        } catch(msg) {
            reject(`Error in callback ${msg}`);
        }
      resolve(value);
      return;
    }, 500);
    // To experiment with error at set-up, uncomment the following 'throw'.
    // throw new Error("Bad setup");
  } catch(err) {
    reject(`Error during setup: ${err}`);
  }
  return;
}

function determineParity(value) {
  const isOdd = value % 2 ? true : false ;
  const parityInfo = { theNumber: value, isOdd: isOdd };
  return parityInfo;
}

function troubleWithGetNumber(reason) {
  console.error(`Trouble getting number: ${reason}`);
  throw -999; // must "throw" something, to maintain error state down the chain
}

function promiseGetWord(parityInfo) {
  // The "tetheredGetWord()" function gets "parityInfo" as closure variable.
  const tetheredGetWord = function(resolve,reject) {
    const theNumber = parityInfo.theNumber;
    const threshold_B = THRESHOLD_A - 1;
    if(theNumber >= threshold_B) {
      reject(`Still too large: ${theNumber}`);
    } else {
      parityInfo.wordEvenOdd = parityInfo.isOdd ? 'odd' : 'even';
      resolve(parityInfo);
    }
    return;
  }
  return new Promise(tetheredGetWord);
}

(new Promise(tetheredGetNumber))
  .then(determineParity,troubleWithGetNumber)
  .then(promiseGetWord)
  .then((info) => {
    console.log("Got: ",info.theNumber," , ", info.wordEvenOdd);
    return info;
  })
  .catch((reason) => {
    if(reason === -999) {
      console.error("Had previously handled error");
    }
    else {
      console.error(`Trouble with promiseGetWord(): ${reason}`);
    }
   })
  .finally((info) => console.log("All done"));
```

#### 高级示例

本例展示了 `Promise` 的一些机制。`testPromise()` 方法在每次点击 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/button) 按钮时被调用，该方法会创建一个 promise 对象，使用 [`setTimeout()`](https://developer.mozilla.org/zh-CN/docs/Web/API/setTimeout) 让 `Promise` 等待 1-3 秒不等的时间来兑现计数结果（从 1 开始的数字）。使用 `Promise` 构造函数来创建 promise。

promise 的值的兑现过程都被日志记录（logged，使用 [`p1.then()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)）下来。这些日志信息展示了方法中的同步代码和异步代码是如何通过 promise 完成解耦的。

通过在短时间内多次点击按钮，你可以看到不同的 promise 被一个接一个地兑现。

**HTML**

```js
<button id="make-promise">Make a promise!</button>
<div id="log"></div>
```

**Javascript**

```js
"use strict";
let promiseCount = 0;

function testPromise() {
  let thisPromiseCount = ++promiseCount;
  let log = document.getElementById('log');
  // begin
  log.insertAdjacentHTML('beforeend', thisPromiseCount + ') Started<br>');
  // We make a new promise: we promise a numeric count of this promise, starting from 1 (after waiting 3s)
  let p1 = new Promise((resolve, reject) => {
    // The executor function is called with the ability to resolve or reject the promise
    log.insertAdjacentHTML('beforeend', thisPromiseCount + ') Promise constructor<br>');
    // This is only an example to create asynchronism
    window.setTimeout(function() {
        // We fulfill the promise !
        resolve(thisPromiseCount);
    }, Math.random() * 2000 + 1000);
  });

  // We define what to do when the promise is resolved with the then() call,
  // and what to do when the promise is rejected with the catch() call
  p1.then(function(val) {
    // Log the fulfillment value
    log.insertAdjacentHTML('beforeend', val + ') Promise fulfilled<br>');
  }).catch((reason) => {
    // Log the rejection reason
    console.log(`Handle rejected promise (${reason}) here.`);
  });
  // end
  log.insertAdjacentHTML('beforeend', thisPromiseCount + ') Promise made<br>');
}

if ("Promise" in window) {
  let btn = document.getElementById("make-promise");
  btn.addEventListener("click",testPromise);
} else {
  log = document.getElementById('log');
  log.textContent = "Live example not available as your browser doesn't support the <code>Promise<code> interface.";
}
```



