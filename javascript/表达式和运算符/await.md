# await

`await` 操作符用于等待一个 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 兑现并获取它兑现之后的值。它只能在[异步函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)或者[模块](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules)顶层中使用。

## [语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await#语法)

```
await expression;
```

### [参数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await#参数)

-   [`expression`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await#expression)

    要等待的 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 实例，Thenable 对象，或任意类型的值。

### [返回值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await#返回值)

返回从 `Promise` 实例或 thenable 对象取得的处理结果。如果等待的值不符合 thenable，则返回表达式本身的值。

### [异常](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await#异常)

拒绝（reject）的原因会被作为异常抛出。

## [描述](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await#描述)

`await` 通常用于拆开 promise 的包装，使用方法是传递一个 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 作为 `expression`。使用 `await` 总会暂停当前异步函数的执行，在该 `Promise` 敲定（settled，指兑现或拒绝）后继续执行。函数的执行恢复（resume）时，`await` 表达式的值已经变成了 `Promise` 兑现的值。

若该 `Promise` 被拒绝（rejected），`await` 表达式会把拒绝的原因（reason）抛出。当前函数（`await` 所在的函数）会出现在抛出的错误的[栈追踪](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await#改善栈追溯)（stack trace），否则当前函数就不会在栈追踪出现。

`await` 总会同步地对表达式求值并处理，处理的行为与 [`Promise.resolve()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve) 一致，不属于原生 `Promise` 的值全都会被隐式地转换为 `Promise` 实例后等待。处理的规则为，若表达式：

-   是一个原生 `Promise`（原生[`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 的实例或其派生类的实例，且满足 `expression.constructor === Promise`），会被直接用于等待，等待由原生代码实现，该对象的 `then()` 不会被调用。
-   是 thenable 对象（包括非原生的 `Promise` 实例、polyfill、Proxy、派生类等），会构造一个新 `Promise` 用于等待，构造时会调用该对象的 `then()` 方法。
-   不是 thenable 对象，会被包装进一个已兑现的 `Promise` 用于等待，其结果就是表达式的值。

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await#示例)

### [等待 Promise 的兑现](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await#等待_promise_的兑现)

当一个 `Promise` 被传递给 `await` 操作符，`await` 将等待该 `Promise` 兑现，并在兑现后返回该 `Promise` 兑现的值。

```
function resolveAfter2Seconds(x) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
}

async function f1() {
  let x = await resolveAfter2Seconds(10);
  console.log(x); // 10
}

f1();
```

### [转换为 promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await#转换为_promise)

若表达式的值不是 `Promise`，`await` 会把该值转换为已兑现的 `Promise`，然后返回其结果。

```
async function f3() {
  const y = await 20;
  console.log(y); // 20

  const obj = {};
  console.log((await obj) === obj); // true
}

f3();
```

### [promise 被拒绝](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await#promise_被拒绝)

如果 `Promise` 被拒绝，则抛出拒绝的原因。

```
async function f4() {
  try {
    const z = await Promise.reject(30);
  } catch (e) {
    console.error(e); // 30
  }
}

f4();
```

### [处理被拒绝的 promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await#处理被拒绝的_promise)

你可以链式调用 [`catch()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)（而不是使用 `try`）以在等待 promise 兑现之前处理被拒绝的 promise。

JSCopy to Clipboard

```
const response = await promisedFunction().catch((err) => {
  console.error(err);
  return "default response";
});
// response will be "default response" if the promise is rejected
```

### [在顶层使用 await](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await#在顶层使用_await)

在[模块](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules)的顶层，你可以单独使用关键字 `await`（异步函数的外面）。也就是说一个模块如果包含用了 `await` 的子模块，该模块就会等待该子模块，这一过程并不会阻塞其他子模块。

下面是一个在 [`export`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/export) 表达式中使用了 [Fetch API](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API) 的例子。任何文件只要导入这个模块，后面的代码就会等待，直到 fetch 完成。

```
// fetch request
const colors = fetch("../data/colors.json").then((response) => response.json());

export default await colors;
```

### [await 对执行过程的影响](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await#await_对执行过程的影响)

当函数执行到 `await` 时，被等待的表达式会立即执行，所有依赖该表达式的值的代码会被暂停，并推送进[微任务队列（microtask queue）](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Event_loop)。然后主线程被释放出来，用于事件循环中的下一个任务。即使等待的值是已经敲定的 promise 或不是 promise，也会发生这种情况。例如，考虑以下代码：

```
async function foo(name) {
  console.log(name, "start");
  console.log(name, "middle");
  console.log(name, "end");
}

foo("First");
foo("Second");

// First start
// First middle
// First end
// Second start
// Second middle
// Second end
```

对应到 `Promise` 的写法是：

```
function foo(name) {
  return new Promise((resolve) => {
    console.log(name, "start");
    console.log(name, "middle");
    console.log(name, "end");
    resolve();
  });
}
```

执行到 `await` 时，后面的代码就会整体被安排进一个新的微任务，此后的函数体变为异步执行。

```
async function foo(name) {
  console.log(name, "start");
  await console.log(name, "middle");
  console.log(name, "end");
}

foo("First");
foo("Second");

// First start
// First middle
// Second start
// Second middle
// First end
// Second end
```

对应的 `Promise` 写法是：

```
function foo(name) {
  return new Promise((resolve) => {
    console.log(name, "start");
    resolve(console.log(name, "middle"));
  }).then(() => {
    console.log(name, "end");
  });
}
```

**再来个例子：**

```js
async function foo(name) {
  console.log(name, "1");
  await console.log(name, "2");
  console.log(name, "3");
  console.log(name, "4");

  await console.log(name, "5");

  console.log(name, "6");
  console.log(name, "7");
  console.log(name, "8");
}

foo("First");
foo("Second");
```

**对应的 `Promise` 的写法：**

```js
function fooPromise(name) {
  return new Promise((resolve) => {
    console.log(name, "1");
    resolve(console.log(name, "2"));
  }).then(() => {
    console.log(name, "3");
    console.log(name, "4");
    new Promise((resolve) => {
      resolve(console.log(name, "5"));
    }).then(() => {
      console.log(name, "6");
      console.log(name, "7");
      console.log(name, "8");
    });
  });
}

fooPromise("First");
fooPromise("Second");
```

虽然这里的 `then()` 看起来很多余，其中的代码完全可以被合并到构造器的回调里，但不管该 `Promise` 的状态如何，`then()` 的回调**总会被异步执行**，`await` 的行为也一样。因此，只要情况不是必须或可能需要等待 `Promise` 的结果，就应该避免使用 `await`。

其他微任务能在函数执行恢复之前执行：

```
let i = 0;

queueMicrotask(function test() {
  i++;
  console.log("microtask", i);
  if (i < 3) {
    queueMicrotask(test);
  }
});

(async () => {
  console.log("async function start");
  for (let i = 1; i < 3; i++) {
    await null;
    console.log("async function resume", i);
  }
  await null;
  console.log("async function end");
})();

queueMicrotask(() => {
  console.log("queueMicrotask() after calling async function");
});

console.log("script sync part end");

// Logs:
// async function start
// script sync part end
// microtask 1
// async function resume 1
// queueMicrotask() after calling async function
// microtask 2
// async function resume 2
// microtask 3
// async function end
```

**代码分析：**

这段代码的执行流程可以分为以下步骤：

1. **初始化：**
   ```javascript
   let i = 0;
   ```
   初始化变量 `i` 为 `0`。

2. **微任务队列：**
   ```javascript
   queueMicrotask(function test() {
     i++;
     console.log("microtask", i);
     if (i < 3) {
       queueMicrotask(test);
     }
   });
   ```
   这段代码定义了一个名为 `test` 的函数，它会增加 `i` 并用 "microtask" 前缀记录该值。如果 `i` 小于 3，则会再次排队相同的微任务。最初，`i` 为 0，因此将首先执行第一个微任务。

3. **异步函数：**
   ```javascript
   (async () => {
     console.log("async function start");
     for (let i = 1; i < 3; i++) {
       await null;
       console.log("async function resume", i);
     }
     await null;
     console.log("async function end");
   })();
   ```
   定义了一个立即调用的异步函数。首先记录 "async function start"，然后进入循环，在循环中等待两次 `null`，记录 "async function resume" 分别为 1 和 2，最后在另一个等待之后记录 "async function end"。

4. **同步日志：**
   
   ```javascript
   console.log("script sync part end");
   ```
   同步记录 "script sync part end"。
   
5. **微任务执行：**
   微任务队列中的微任务将被执行。

   - 第一个微任务：将 `i` 增加到 1 并记录 "microtask 1"。
   - 第二个微任务：将 `i` 增加到 2 并记录 "microtask 2"。
   - 第三个微任务：将 `i` 增加到 3，但由于 `i` 不再小于 3，不再排队其他微任务。

6. **异步函数继续执行：**
   由于 `await null` 语句，异步函数继续执行。

   - 第一次继续：记录 "async function resume 1"。
   - 第二次继续：记录 "async function resume 2"。
   - 第三次继续：记录 "async function end"。

7. **最终微任务：**
   ```javascript
   queueMicrotask(() => {
     console.log("queueMicrotask() after calling async function");
   });
   ```
   排队一个微任务，记录 "queueMicrotask() after calling async function"。

8. **最终日志：**
   ```javascript
   console.log("script sync part end");
   ```
   记录 "script sync part end"。

**输出结果：**
```
async function start
script sync part end
microtask 1
async function resume 1
queueMicrotask() after calling async function
microtask 2
async function resume 2
microtask 3
async function end
```

**对 queueMicrotask() 创建微任务的分析：**

微任务（Microtask）是一种异步任务，其执行时机在当前任务结束之后、事件循环的下一个周期之前。在 JavaScript 中，微任务可以通过 `queueMicrotask` 函数来调度。

1. **第一个代码块:**
   ```javascript
   queueMicrotask(function test() {
     i++;
     console.log("microtask", i);
     if (i < 3) {
       queueMicrotask(test);
     }
   });
   ```
   这段代码定义了一个名为 `test` 的函数，并将它排入微任务队列中。当这个微任务执行时，它会递增 `i` 并记录 "microtask" 和当前的 `i` 值。然后，如果 `i` 仍然小于 3，它将再次排入微任务队列。这个过程会一直持续，直到 `i` 大于等于 3，不再排队微任务。

   这样设计是为了在微任务队列中创建一个递增的序列，通过递归调用 `queueMicrotask(test)` 来模拟异步逻辑。每次执行 `test` 微任务时，都会记录 `i` 的当前值。

2. **第二个代码块:**
   ```javascript
   queueMicrotask(() => {
     console.log("queueMicrotask() after calling async function");
   });
   ```
   这段代码直接将一个简单的函数排入微任务队列中。当执行时，它会记录 "queueMicrotask() after calling async function"。

   这种方式可以用来在事件循环的下一轮中执行一些代码，确保这些代码在其他任务（例如异步函数、定时器）执行完成之后执行。

总的来说，这两个代码块都使用 `queueMicrotask` 函数将一些逻辑排入微任务队列，以便在当前任务执行结束后、事件循环的下一个周期之前执行。

此案例中，`test()` 总会在异步函数恢复执行前被调用，呈现轮流的调度。微任务被执行的顺序通常就是入队的先后顺序，而 `console.log("queueMicrotask() after calling async function");` 比 `await` 晚入队，因此 `"queueMicrotask() after calling async function"` 在异步函数第一次恢复之后才输出。

### [改善栈追踪](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await#改善栈追踪)

有时，当异步函数直接返回一个 `Promise` 时我们会省略 `await`。

```
async function noAwait() {
  // Some actions...

  return /* await */ lastAsyncTask();
}
```

但是假如这个 `Promise` 的由来是调用了异步函数，且该异步函数的异步部分抛出了错误：

```
async function lastAsyncTask() {
  await null;
  throw new Error("failed");
}

async function noAwait() {
  return lastAsyncTask();
}

noAwait();

// Error: failed
//    at lastAsyncTask
```

栈追踪中只出现了 `lastAsyncTask`，这是因为抛出错误时 `noAwait` 已经返回——某种意义上该 `Promise` 已经与 `noAwait` 无关。若要改善栈追踪，你可以用 `await` 提前等待，错误就会在函数体结束前抛出，接着该错误会被包装进一个新的 `Promise`，因错误被 `await` 在主调函数的函数体抛出，主调函数将会出现在栈追踪。

```
async function lastAsyncTask() {
  await null;
  throw new Error("failed");
}

async function withAwait() {
  return await lastAsyncTask();
}

withAwait();

// Error: failed
//    at lastAsyncTask
//    at async withAwait
```

但是，这样会有一点性能牺牲，毕竟 `Promise` 会被拆装了又再次包装。