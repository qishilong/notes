# Boolean.prototype.valueOf()

**`valueOf()`** 方法返回一个[`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean)对象的原始值。

## 尝试一下

<iframe class="interactive is-js-height" height="200" src="https://interactive-examples.mdn.mozilla.net/pages/js/boolean-valueof.html" title="MDN Web Docs Interactive Example" loading="lazy" data-readystate="complete" style="box-sizing: border-box; border: 0px; max-width: 100%; width: 765.719px; background-color: var(--background-secondary); border-radius: var(--elem-radius); color: var(--text-primary); height: 444px; margin: 1rem 0px; padding: 0px;"></iframe>

## 语法

```js
bool.valueOf()
```

### 返回值

给定[`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean)对象的原始值

## 描述

[`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean)的 `valueOf` 方法返回一个[`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean)对象或[`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean)字面量的原始值作为布尔数据类型。

该方法通常在 JavaScript 内部调用，而不是在代码中显式调用。

## 示例

### 使用 `valueOf`

```js
x = new Boolean();
myVar = x.valueOf(); // assigns false to myVar
```