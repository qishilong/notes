# 在 JavaScript 中创建并填充任意长度的数组

创建数组最好的方式是通过字面量：

```js
const arr = [0, 0, 0];
```

当然，并不总是这一种选择，例如创建大型数组。这篇博客文章探讨怎样处理这些情况。

## 没有空白元素的数组性能更好

在大部分编程语言中，数组是值的连续数列。在 JavaScript 中，数组是映射指向元素的字典。指向零到数组长度中可以是空白，它们没有映射到元素（“缺失索引”）。举例来说，下面的数组在索引 1 有一个空白：

```js
Object.keys(['a', , 'c']);
// -> [ '0', '2' ]
```

没有空白元素的数组也叫做*密集数组*。密集数组往往性能更好，因为它们可以存储在连续的内存中。一旦它们有一个空白元素，内存存储就会发生改变。有两种选择：

-   字典存储，这样查找将花费更多时间，并且存储开销也更大。
-   连续的数据结构存储，带有空白的元素值。然后，检查值是否为空，将花费额外的时间。

任一情况下，如果引擎遇到空白值，它不能返回 `undefined`，它必须遍历原型链并检索谁的属性名指向这个空白值。这当然要花费更多的时间。

在一些引擎中，比如 V8，会永久切换到性能较低的数据结构。即使所有值都为空，它们也不会切换回去。

有关 V8 如何表示数组的更多信息，请参阅 Mathias Bynens 的“[V8 中的元素种类](https://v8.dev/blog/elements-kinds)”。

## 创建数组

### 数组构造函数

一个通用的创建指定长度数组方式是使用数组构造函数：

```js
const LEN = 3;
const arr = new Array(LEN);
console.log(arr.length === LEN); // true
// 数组中只有一些空白
console.log(Object.keys(arr)); // []
```

这种方法很方便，但是有两个缺点：

-   这些空白会使此 Array 稍慢一些，即使以后再用值完全填充它也是如此。
-   空白很少是元素的良好初始“值”。例如，零更加常见。

### 数组构造函数加 .fill() 方法

`.fill()` 方法使用指定值填充现有数组来改变它。帮助在通过 `new Array()` 创建数组后初始化数组：

```js
const LEN = 3;
const arr = new Array(LEN).fill(0);
console.log(arr); // -> [0, 0, 0]
```

**注意**：如果 `.fill()` 使用对象填充数组，所有的元素将指向相同的实例（例如没有被拷贝复制的对象）：

```js
const LEN = 3;
const obj = {};

const arr = new Array(LEN).fill(obj);
console.log(arr);
// -> [{}, {}, {}]

obj.prop = true;
console.log(arr);
// -> [ {prop:true}, {prop:true}, {prop:true} ]
```

接下来我们接触的填充方式（通过 `Array.from()`）没有这个问题。

### .push() 方法

```js
const LEN = 3;
const arr = [];
for (let i = 0; i < LEN; i++) {
  arr.push(0);
}
console.log(arr);
// -> [0, 0, 0]
```

这一次我们创建并填充了没有空白元素的数组。因此在创建数组后使用它比使用数组构造函数更快。创建数组很慢，因为随着元素数目的增长，引擎可能不得不多次重新分配连续内存存储形式。

### 使用 undefined 填充数组

`Array.from()` 能转换迭代器和类数组值为数组。它将空白作为 `undefined` 元素。我们可以使用 `Array.from()` 转换每一个空白为 `undefined`：

```js
Array.from({ length: 3 });
// -> [ undefined, undefined, undefined ]
```

参数 `{length: 3}` 是一个长度为 3 的仅包含空白的类数组对象。它也可以使用 `new Array(3)`，但这样通常创建了更大的对象。

扩展运算符产生数组仅作用于可迭代值，并有类似与 `Array.from()` 的效果：

```js
[...new Array(3)];
// -> [ undefined, undefined, undefined ]
```

注意，通过 `new Array()` 与 `Array.from()` 创建的结果依然是一个稀疏数组。

### Array.from() 映射

可以使用 `Array.from()` 映射，如果你提供一个映射函数作为它的第二参数。

#### 使用值填充数组

-   使用小整数创建数组

    ```js
    Array.from({ length: 3 }, () => 0);
    // -> [0, 0, 0]
    ```

-   使用独立(非共享)对象创建对象

    ```js
    Array.from({ length: 3 }, () => ({}));
    // -> [ {}, {}, {} ]
    ```

#### 创建整数数组

-   创建增长整数数组

    ```js
    Array.from({ length: 3 }, (x, i) => i);
    // -> [(0, 1, 2)];
    ```

-   创建任意范围的整数

    ```js
    const START = 2,
      END = 5;
    Array.from({ length: END - START }, (x, i) => i + START);
    // -> [ 2, 3, 4 ]
    ```

另外一种创建增产数组的方式是通过 `.key()`，`.key()` 方法也是使用 `undefined` 元素填充空白：

```js
[...new Array(3).keys()];
// -> [0, 2, 3]
```

## 创建数组的备忘录

使用空白或 `undefined` 填充：

-   `new Array(3)`
    → [ , , ,]
-   `Array.from({ length: 2 })`
    → `[undefined, undefined]`
-   `[...new Array(2)]`
    → `[undefined, undefined]`

使用任意值填充：

-   `const a = []; for (let i = 0; i < 3; i++) a.push(0);`
    → `[0, 0, 0]`
-   `new Array(3).fill(0)`
    → `[0, 0, 0]`
-   `Array.from({ length: 3 }, () => ({}))`
    → `[{}, {}, {}]` (unique objects)

使用整数：

-   `Array.from({ length: 3 }, (x, i) => i)`
    → `[0, 1, 2]`
-   `const START = 2, END = 5; Array.from({ length: END-START }, (x, i) => i + START)`
    → `[2, 3, 4]`
-   `[...new Array(3).keys()]`
    → `[0, 1, 2]`

### 推荐的方式

我更喜欢下面的方式。我的关注点是可读性，而不是性能。

-   是否需要创建不需要（或晚一点）填充的数组？

    ```js
    new Array(LEN);
    ```

-   是否需要创建使用基础类型数据初始化的数组？

    ```js
    new Array(LEN).fill(0);
    ```

-   是否需要创建使用对象初始化的数组？

    ```js
    Array.from({ length: LEN }, () => ({}));
    ```

-   是否需要创建整数数组？

    ```js
    Array.from({ length: END - START }, (x, i) => i + START);
    ```

如果要处理整数或浮点数组，请考虑为此目的而创建的[类型数组](http://exploringjs.com/es6/ch_typed-arrays.html)。它们不能有空白，并且总是用零初始化。

#### 提示：数组性能通常无关紧要

-   在大多数情况下，我不用必担心性能。甚至有空白元素的数组也非常快。担心代码易于理解更有意义。
-   此外，引擎如何优化以及在何处进行优化。因此，最快的是今天而不是明天。

------

## 延伸阅读

-   “Exploring ES6” 章节 “[类型数组](http://exploringjs.com/es6/ch_typed-arrays.html)”
-   “Exploring ES6” 章节 “[数组中的 ES6 和空白元素](http://exploringjs.com/es6/ch_arrays.html#sec_array-holes)”