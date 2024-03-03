# async 和 await

`async`和`await`是JavaScript中用于处理异步操作的新语法。它们使得异步代码的编写和理解更加简单和直观。下面我将详细介绍`async`和`await`。

### async 函数

`async`函数是异步函数的一种声明方式，它使函数总是返回一个Promise。使用`async`关键字声明的函数可以包含`await`表达式，这样在函数内部就可以等待异步操作的结果而不阻塞后续代码的执行。

下面是一个简单的`async`函数示例：

```js
javascriptCopy code
async function fetchData() {
    return 'Data fetched';
}

fetchData().then(data => {
    console.log(data); // 输出: Data fetched
});
```

在上面的示例中，`fetchData()`函数是一个`async`函数，它总是返回一个Promise对象。即使在函数内部没有显式地使用`return`关键字返回一个Promise，JavaScript也会隐式地将返回值封装成一个Promise。

### await 表达式

`await`表达式只能在`async`函数内部使用。它用于暂停`async`函数的执行，并等待Promise对象的解析（或拒绝）结果。在等待期间，JavaScript引擎会暂时释放控制权，允许其他代码继续执行。

下面是一个使用`await`的示例：

```js
javascriptCopy code
async function fetchData() {
    let response = await fetch('https://api.example.com/data');
    let data = await response.json();
    return data;
}

fetchData().then(data => {
    console.log(data);
}).catch(error => {
    console.error('Error:', error);
});
```

在上面的示例中，`fetchData()`函数内部使用了`await`表达式等待`fetch`请求的返回。当`fetch`请求执行完成并返回响应时，才会继续执行后续代码。

### 错误处理

`async`函数内部的错误可以通过`try...catch`语句来捕获和处理，就像同步代码一样。

```js
javascriptCopy code
async function fetchData() {
    try {
        let response = await fetch('https://api.example.com/data');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
```

### 总结

-   `async`函数声明了一个异步函数，它返回一个Promise对象。
-   `await`表达式用于暂停`async`函数的执行，等待Promise对象的解析结果。
-   `async`函数使得异步代码的编写和理解更加简单和直观。
-   错误处理可以使用`try...catch`语句捕获和处理`async`函数内部的错误。

`async`和`await`语法是现代JavaScript中处理异步操作的首选方法之一，它们极大地简化了异步代码的编写和维护。

当`await`表达式执行时，它会暂停`async`函数的执行，但不会阻塞整个JavaScript运行时。JavaScript引擎会继续执行后续的同步代码，同时允许其他异步任务或事件处理函数执行。

这意味着，即使`await`正在等待异步操作的结果，其他代码仍然可以被执行。这样可以充分利用JavaScript的非阻塞特性，提高了程序的并发性和性能。

下面是一个示例，演示了`await`表达式的执行不会阻塞后续代码的执行：

```js
javascriptCopy code
async function example() {
    console.log('Start');

    let promise = new Promise(resolve => {
        setTimeout(() => resolve('Promise resolved'), 2000);
    });

    console.log('Before await');

    let result = await promise;

    console.log('After await:', result);

    console.log('End');
}

example();

console.log('After calling example()');
```

输出将会是：

```js
mathematicaCopy code
Start
Before await
After calling example()
After await: Promise resolved
End
```

可以看到，`example()`函数中的`await`表达式会等待2秒钟，但在这段等待期间，后续的同步代码仍然被执行。这充分展示了`await`表达式不会阻塞整个JavaScript运行时的特性。

如果`example()`函数内部有更多的`await`表达式，它们会依次执行，但是每次执行`await`时，函数都会暂停执行，直到`await`后面的表达式返回的Promise对象解析为完成状态（或拒绝状态）。

在等待某个`await`表达式期间，JavaScript引擎会允许其他代码执行，包括其他`async`函数、定时器、事件处理函数等。这样可以保持程序的响应性，并允许并发执行多个任务。

下面是一个例子，演示了`example()`函数内部有多个`await`表达式的情况：

```js
async function example() {
    console.log('Start');

    let promise1 = new Promise(resolve => {
        setTimeout(() => resolve('Promise 1 resolved'), 2000);
    });

    let promise2 = new Promise(resolve => {
        setTimeout(() => resolve('Promise 2 resolved'), 1000);
    });

    console.log('Before await 1');
    let result1 = await promise1;
    console.log('After await 1:', result1);

    console.log('Before await 2');
    let result2 = await promise2;
    console.log('After await 2:', result2);

    console.log('End');
}

example();

console.log('After calling example()');
```

输出将会是：

```shell
Start
Before await 1
After calling example()
After await 1: Promise 1 resolved
Before await 2
After await 2: Promise 2 resolved
End
```

