# URLSearchParams.values()

URLSearchParams.values() 方法返回一个[`iterator`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols)，该遍历器允许遍历对象中包含的所有值。这些值都是[`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)对象。

**备注：** 该方法在[Web Workers](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API)中也可使用

## 语法

```js
searchParams.values();
```

### 返回值

返回一个[`iterator`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols).

## 示例

```js
// 创建一个测试用 URLSearchParams 对象
var searchParams = new URLSearchParams("key1=value1&key2=value2");

// 输出值
for (var value of searchParams.values()) {
  console.log(value);
}
```

结果如下：

```
value1
value2
```