# in

如果指定的属性在指定的对象或其原型链中，则 **`in`** **运算符**返回 `true`。

## 尝试一下

<iframe class="interactive is-js-height" height="200" src="https://interactive-examples.mdn.mozilla.net/pages/js/expressions-inoperator.html" title="MDN Web Docs Interactive Example" loading="lazy" data-readystate="complete" style="box-sizing: border-box; border: 0px; max-width: 100%; width: 755px; background-color: var(--background-secondary); border-radius: var(--elem-radius); color: var(--text-primary); height: 444px; margin: 1rem 0px; padding: 0px;"></iframe>

## 语法

```js
prop in object
```

### 参数

-   `prop`

    一个字符串类型或者 symbol 类型的属性名或者数组索引（非 symbol 类型将会强制转为字符串）。

-   `objectName`

    检查它（或其原型链）是否包含具有指定名称的属性的对象。

## 描述

下面的例子演示了一些 `in` 运算符的用法。

```js
// 数组
var trees = new Array("redwood", "bay", "cedar", "oak", "maple");
0 in trees        // 返回 true
3 in trees        // 返回 true
6 in trees        // 返回 false
"bay" in trees    // 返回 false (必须使用索引号，而不是数组元素的值)

"length" in trees // 返回 true (length 是一个数组属性)

Symbol.iterator in trees // 返回 true (数组可迭代，只在 ES2015+ 上有效)


// 内置对象
"PI" in Math          // 返回 true

// 自定义对象
var mycar = {make: "Honda", model: "Accord", year: 1998};
"make" in mycar  // 返回 true
"model" in mycar // 返回 true
```

`in`右操作数必须是一个对象值。例如，你可以指定使用`String`构造函数创建的字符串，但不能指定字符串文字。

```js
var color1 = new String("green");
"length" in color1 // 返回 true
var color2 = "coral";
"length" in color2 // 报错 (color2 不是对象)
```

### 对被删除或值为 undefined 的属性使用`in`

如果你使用 [`delete`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/delete) 运算符删除了一个属性，则 `in` 运算符对所删除属性返回 `false`。

```js
var mycar = {make: "Honda", model: "Accord", year: 1998};
delete mycar.make;
"make" in mycar;  // 返回 false

var trees = new Array("redwood", "bay", "cedar", "oak", "maple");
delete trees[3];
3 in trees; // 返回 false
```

如果你只是将一个属性的值赋值为[`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)，而没有删除它，则 `in` 运算仍然会返回`true`。

```js
var mycar = {make: "Honda", model: "Accord", year: 1998};
mycar.make = undefined;
"make" in mycar;  // 返回 true
```

```js
var trees = new Array("redwood", "bay", "cedar", "oak", "maple");
trees[3] = undefined;
3 in trees; // 返回 true
```

### 继承属性

如果一个属性是从原型链上继承来的，`in` 运算符也会返回 `true`。

```js
"toString" in {}; // 返回 true
```