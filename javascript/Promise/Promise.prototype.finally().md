# Promise.prototype.finally()

[`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 实例的 **`finally()`** 方法用于注册一个在 promise 敲定（兑现或拒绝）时调用的函数。它会立即返回一个等效的 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 对象，这可以允许你[链式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises#链式调用)调用其他 promise 方法。

这可以让你避免在 promise 的 [`then()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) 和 [`catch()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch) 处理器中重复编写代码。

## 尝试一下

<iframe class="interactive is-taller-height" height="200" src="https://interactive-examples.mdn.mozilla.net/pages/js/promise-finally.html" title="MDN Web Docs Interactive Example" loading="lazy" data-readystate="complete" style="box-sizing: border-box; border: 0px; max-width: 100%; width: 765.719px; background-color: var(--background-secondary); border-radius: var(--elem-radius); color: var(--text-primary); height: 654px; margin: 1rem 0px; padding: 0px;"></iframe>

## 语法

```
finally(onFinally)
```

### 参数

-   [`onFinally`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally#onfinally)

    一个当 promise 敲定时异步执行的函数。它的返回值将被忽略，除非返回一个被拒绝的 promise。调用该函数时不带任何参数。

### 返回值

返回等效的 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)。如果处理程序抛出错误或返回被拒绝的 promise，那么 `finally()` 返回的 promise 将以该值被拒绝。否则，处理程序的返回值不会影响原始 promise 的状态。

## 描述

如果你想在 promise 敲定时进行一些处理或者清理，无论其结果如何，那么 `finally()` 方法会很有用。

`finally()` 方法类似于调用 [`then(onFinally, onFinally)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)。然而，有几个不同之处：

-   创建内联函数时，你可以只将其传入一次，而不是强制声明两次或为其创建变量。
-   `onFinally` 回调函数不接收任何参数。这种情况恰好适用于你*不关心*拒绝原因或兑现值的情况，因此无需提供它。
-   `finally()` 调用通常是透明的，不会更改原始 promise 的状态。例如：
    -   与 `Promise.resolve(2).then(() => 77, () => {})` 不同，它返回一个最终会兑现为值 `77` 的 promise，而 `Promise.resolve(2).finally(() => 77)` 返回一个最终兑现为值 `2` 的 promise。
    -   类似地，与 `Promise.reject(3).then(() => {}, () => 88)` 不同，它返回一个最终兑现为值 `88` 的 promise，而 `Promise.reject(3).finally(() => 88)` 返回一个最终以原因 `3` 拒绝的 promise。

**备注：** 在 `finally` 回调函数中抛出错误（或返回被拒绝的 promise）仍会导致返回的 promise 被拒绝。例如，`Promise.reject(3).finally(() => { throw 99; })` 和 `Promise.reject(3).finally(() => Promise.reject(99))` 都以理由 `99` 拒绝返回的 promise。

与 [`catch()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch) 一样，`finally()` 在内部调用其调用对象上的 `then` 方法。如果 `onFinally` 不是函数，则调用 `then()` 时使用 `onFinally` 同时作为两个参数——对于 [`Promise.prototype.then()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)，这意味着没有附加有效的处理器。否则，`then()` 被调用时会使用两个内部创建的函数，其行为如下：

**警告：** 这只是为了演示，而不是一个 polyfill。

```
promise.then(
  (value) => Promise.resolve(onFinally()).then(() => value),
  (reason) =>
    Promise.resolve(onFinally()).then(() => {
      throw reason;
    }),
);
```

因为 `finally()` 调用 `then()`，所以它支持子类化。此外，请注意上面的 [`Promise.resolve()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve) 调用——实际上，`onFinally()` 的返回值是使用与 `Promise.resolve()` 相同的算法解决的，但用于构造解决的 promise 的实际构造函数将是子类。`finally()` 通过 [`promise.constructor[@@species\]`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/@@species) 获取构造函数。

## 示例

### 使用 finally()

```
let isLoading = true;

fetch(myRequest)
  .then((response) => {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    }
    throw new TypeError("Oops, we haven't got JSON!");
  })
  .then((json) => {
    /* 进一步处理 JSON */
  })
  .catch((error) => {
    console.error(error); // 这行代码也可能抛出错误，例如：when console = {}
  })
  .finally(() => {
    isLoading = false;
  });
```