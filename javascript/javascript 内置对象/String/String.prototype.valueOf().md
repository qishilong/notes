# String.prototype.valueOf()

**`valueOf()`** 方法返回 [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 对象的原始值

## 尝试一下

<iframe class="interactive is-js-height" height="200" src="https://interactive-examples.mdn.mozilla.net/pages/js/string-valueof.html" title="MDN Web Docs Interactive Example" loading="lazy" data-readystate="complete" style="box-sizing: border-box; border: 0px; max-width: 100%; width: 755px; background-color: var(--background-secondary); border-radius: var(--elem-radius); color: var(--text-primary); height: 444px; margin: 1rem 0px; padding: 0px;"></iframe>

## 语法

```js
str.valueOf()
```

### 返回结果

表示给定String对象的原始值的字符串。

## 描述

`String` 的 `valueOf()` 方法将 `String` 对象的原始值作为字符串数据类型返回。这个值相当于 [`String.prototype.toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/toString).

此方法通常由 JavaScript 在内部调用，而不是在代码中显式调用。

## 示例

### 使用 `valueOf()`

```js
var x = new String('Hello world');
console.log(x.valueOf()); // Displays 'Hello world'
```