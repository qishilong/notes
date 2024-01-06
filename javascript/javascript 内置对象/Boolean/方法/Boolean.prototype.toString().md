# Boolean.prototype.toString()

**`toString()`** 方法返回表示指定的布尔对象的字符串。

## 尝试一下

<iframe class="interactive is-js-height" height="200" src="https://interactive-examples.mdn.mozilla.net/pages/js/boolean-tostring.html" title="MDN Web Docs Interactive Example" loading="lazy" data-readystate="complete" style="box-sizing: border-box; border: 0px; max-width: 100%; width: 765.719px; background-color: var(--background-secondary); border-radius: var(--elem-radius); color: var(--text-primary); height: 444px; margin: 1rem 0px; padding: 0px;"></iframe>

## 语法

```js
toString()
```

### 返回值

一个表示特定 [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean) 对象的字符串。

## 描述

[`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean) 对象覆盖了 [`Object`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object) 对象的 `toString` 方法。并没有继承 [`Object.prototype.toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)。对于布尔对象，`toString` 方法返回一个表示该对象的字符串。

当一个 [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean) 对象作为文本值或进行字符串连接时，JavaScript 会自动调用其 `toString` 方法。

对于 [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean) 对象或值，内置的 `toString` 方法返回字符串 `"true"` 或 `"false"`，具体返回哪个取决于布尔对象的值。

## 示例

### 使用 toString()

下面的代码，`flag.toString()` 返回 `"true"`：

```js
const flag = new Boolean(true);
const myVar = flag.toString();
```