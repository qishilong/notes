# String.prototype.toString()

字符串对象的 **`toString()`** 方法返回一个字符串，表示指定的字符串。

## 尝试一下

<iframe class="interactive is-js-height" height="200" src="https://interactive-examples.mdn.mozilla.net/pages/js/string-tostring.html" title="MDN Web Docs Interactive Example" loading="lazy" data-readystate="complete" style="box-sizing: border-box; border: 0px; max-width: 100%; width: 755px; background-color: var(--background-secondary); border-radius: var(--elem-radius); color: var(--text-primary); height: 444px; margin: 1rem 0px; padding: 0px;"></iframe>

## 语法

```js
toString()
```

### 返回值

`String` 包装对象的字符串值。

## 描述

[`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 对象覆盖了 [`Object`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object) 对象的 `toString()` 方法；并没有继承 [`Object.prototype.toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)。对于 [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 对象，`toString()` 方法返回一个字符串来表示这个对象，和 [`String.prototype.valueOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/valueOf) 方法的返回值相同。

## 示例

### 使用 toString()

以下示例输出一个 [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 对象的字符串值：

```js
const x = new String("Hello world");

console.log(x.toString()); // 输出 'Hello world'
```