# URLSearchParams.keys()

URLSearchParams.keys() 返回一个[`iterator`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols)，遍历器允许遍历对象中包含的所有键。这些键都是字符串对象。

**备注：** 该方法在 [Web Workers](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API)中也可使用

## 语法

```js
searchParams.keys();
```

### 返回值

返回一个[`iterator`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols).

## 例子

```js
// 建立一个测试用 URLSearchParams 对象
var searchParams = new URLSearchParams("key1=value1&key2=value2");

// 输出键值对
for (var key of searchParams.keys()) {
  console.log(key);
}
```

结果如下：

```
key1
key2
```