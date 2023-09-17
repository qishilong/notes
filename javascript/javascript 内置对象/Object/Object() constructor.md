# Object() 构造函数

**`Object()`** 构造函数将输入转换为一个对象。它的行为取决于输入的类型。

## [语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/Object#语法)

```
new Object(value)
Object(value)
```

**备注：** `Object()` 可以在带有或者不带有 [`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new) 的情况下调用，但有时会产生不同的效果。参见[返回值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/Object#返回值)。

### [参数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/Object#参数)

-   `value`

    任意值。

### [返回值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/Object#返回值)

当调用或者构造 `Object()` 构造函数本身时，其返回值是一个对象：

-   如果该值是 [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/null) 或者 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)，它会生成并返回一个空对象。
-   如果该值已经是一个对象，则返回该值。
-   否则，它将返回与给定值对应的类型的对象。例如，传递 [`BigInt`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt) 基本类型会返回一个 `BigInt` 封装对象。

当通过[继承 `Object`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes/extends#扩展对象) 的类的构造函数中的 [`super()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/super) 隐式调用 `Object()` 时，它以 `new.target.prototype` 为原型初始化一个新对象。传递给 `super()` 的任意值都将被忽略——例如，即使你传递一个数字，构造函数中的 `this` 值也不会变成 [`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) 实例。

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/Object#示例)

### [创建一个新对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/Object#创建一个新对象)

```
const o = new Object();
o.foo = 42;

console.log(o);
// { foo: 42 }
```

### [使用 undefined 和 null 类型调用 Object](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/Object#使用_undefined_和_null_类型调用_object)

以下示例在 `o` 中存储一个空 `Object` 对象：

```
const o = new Object();
```

```
const o = new Object(undefined);
```

```
const o = new Object(null);
```

### [获取 BigInt 和 Symbol 的封装对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/Object#获取_bigint_和_symbol_的封装对象)

当用 `new` 调用 [`BigInt()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt/BigInt) 和 [`Symbol()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/Symbol) 构造函数时会抛出一个错误，以阻止创建封装对象而不是基本类型值的常见错误。为这些类型创建封装对象的唯一方法是使用它们调用 `Object()`：

```
const numberObj = new Number(1);
console.log(typeof numberObj); // "object"

const bigintObj = Object(1n);
console.log(typeof bigintObj); // "object"

const symbolObj = Object(Symbol("foo"));
console.log(typeof symbolObj); // "object"
```