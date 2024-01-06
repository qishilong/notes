# Boolean() 构造函数

**`Boolean()`** 构造函数可以创建 [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean) 对象或返回布尔类型的原始值。

## 尝试一下

<iframe class="interactive is-shorter-height" height="200" src="https://interactive-examples.mdn.mozilla.net/pages/js/boolean-constructor.html" title="MDN Web Docs Interactive Example" loading="lazy" data-readystate="complete" style="box-sizing: border-box; border: 0px; max-width: 100%; width: 765.719px; background-color: var(--background-secondary); border-radius: var(--elem-radius); color: var(--text-primary); height: 364px; margin: 1rem 0px; padding: 0px;"></iframe>

## 语法

```js
new Boolean(value)
Boolean(value)
```

**备注：** 调用 `Boolean()` 时可以使用或不使用 [`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)，但是效果不同。参见[返回值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean/Boolean#返回值)部分。

### 参数

-   [`value`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean/Boolean#value)

    `Boolean` 对象的初始值。

### 返回值

当 `Boolean()` 作为构造函数调用时（使用 [`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)），将创建 [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean) 对象，它**不是**一个原始值。

当 `Boolean()` 作为普通函数调用时（不使用 `new`），它将参数强制转换为布尔原始值。

**警告：** 你会发现你很少会使用到 `Boolean` 构造函数。

## 描述

作为第一个参数传递的值被[转换为布尔值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean#布尔值转换) 。如果该值被省略或为 `0`、`-0`、`0n`、[`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/null)、`false`、[`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN)、[`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined) 或空字符串（`""`），那么该对象的初始值为 `false`。所有其他的值，包括任何对象、空数组（`[]`）或字符串 `"false"`，都会创建一个初始值为 `true` 的对象。

**备注：** 当非标准属性 [`document.all`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/all) 被用作该构造函数的参数时，结果是一个值为 `false` 的 `Boolean` 对象。这个属性是遗留的和非标准的，不应该被使用。

## 示例

### 使用初始值 false 创建 Boolean 对象

```js
const bZero = new Boolean(0);
const bNull = new Boolean(null);
const bEmptyString = new Boolean("");
const bfalse = new Boolean(false);

typeof bfalse; // "object"
Boolean(bfalse); // true
```

请注意，用 `Boolean()` 将 `Boolean` 对象转换为原始值的结果总是 `true`，即使该对象的值为 `false`。因此，总是建议避免构造 `Boolean` 包装对象。

如果你需要从包装对象中取出原始值，不要使用 `Boolean()` 函数，而是使用对象的 [`valueOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean/valueOf) 方法。

```js
const bfalse = new Boolean(false);

bfalse.valueOf(); // false
```

### 使用初始值 true 创建 Boolean 对象

```js
const btrue = new Boolean(true);
const btrueString = new Boolean("true");
const bfalseString = new Boolean("false");
const bSuLin = new Boolean("Su Lin");
const bArrayProto = new Boolean([]);
const bObjProto = new Boolean({});
```