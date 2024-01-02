# URLSearchParams.forEach()

URLSearchParams 的实例对象上的方法 forEach 允许通过回调函数来遍历 URLSearchParams 实例对象上的键值对

**备注：** 此特性在 [Web Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API) 中可用

## 语法

```js
searchParams.forEach(callback(value,key,searchParams));
```

### 参数

-   [回调函数](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams/forEach#回调函数)

    该回调函数可以接收到 3 个参数 value,key,searchParams，我们可以在回调函数中对接收到的参数进行处理。而三个参数的含义如下：

-   [`value`](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams/forEach#value)

    当前遍历到的键值

-   [`key`](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams/forEach#key)

    当前遍历到的键名

-   [`searchParams`](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams/forEach#searchparams)

    当前调用 forEach 方法的实例对象

### 返回值

空

## 例子

```js
// 创建 URLSearchParams 对象的实例对象，用于测试
var searchParams = new URLSearchParams("key1=value1&key2=value2");

let returnValue = searchParams.forEach(function (value, key, searchParams) {
  // 打印值
  console.log(value, key, searchParams);
});

// 输出返回值
console.log(returnValue);
```

结果是：

```
value1 key1 当前调用 forEach 方法的实例对象 (也就是 searchParams)
value2 key2 当前调用 forEach 方法的实例对象 (也就是 searchParams)
undefined  // 即没有返回值
```