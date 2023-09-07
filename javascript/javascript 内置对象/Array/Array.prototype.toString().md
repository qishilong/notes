# Array.prototype.toString()

**`toString()`** 方法返回一个字符串，表示指定的数组及其元素。

## 尝试一下

<iframe class="interactive is-shorter-height" height="200" src="https://interactive-examples.mdn.mozilla.net/pages/js/array-tostring.html" title="MDN Web Docs Interactive Example" loading="lazy" data-readystate="complete" style="box-sizing: border-box; border: 0px; max-width: 100%; width: 755px; background-color: var(--background-secondary); border-radius: var(--elem-radius); color: var(--text-primary); height: 364px; margin: 1rem 0px; padding: 0px;"></iframe>

## 语法

```js
toString()
```

### 返回值

一个表示数组所有元素的字符串。

## 描述

[`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array) 对象覆盖了 [`Object`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object) 的 `toString` 方法。对于数组对象，`toString` 方法在内部调用 [`join()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/join) 方法拼接数组中的元素并返回一个字符串，其中包含用逗号分隔的每个数组元素。如果 `join` 方法不可用，或者它不是一个函数，将使用 [`Object.prototype.toString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) 代替，返回 `[object Array]`。

```js
const arr = [];
arr.join = 1; // re-assign `join` with a non-function
console.log(arr.toString()); // Logs [object Array]

console.log(Array.prototype.toString.call({ join: () => 1 }));  // Logs 1
```

当一个数组被作为文本值或者进行字符串拼接操作时，将会自动调用其 `toString` 方法。

## 示例

### 使用 toString

```js
const array1 = [1, 2, 'a', '1a'];

console.log(array1.toString());
// expected output: "1,2,a,1a"
```