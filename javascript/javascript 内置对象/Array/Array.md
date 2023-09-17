# Array

与其他编程语言中的数组一样，**`Array`** 对象支持[在单个变量名下存储多个元素](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Arrays)，并具有[执行常见数组操作](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array#示例)的成员。

## 描述

在 JavaScript 中，数组不是[基本类型](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive)，而是具有以下核心特征的 `Array` 对象：

- **JavaScript 数组是可调整大小的，并且可以包含不同的[数据类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures)**。（当不需要这些特征时，可以使用[类型化数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Typed_arrays)。）
- **JavaScript 数组不是关联数组**，因此，不能使用任意字符串作为索引访问数组元素，但必须使用非负整数（或它们各自的字符串形式）作为索引访问。
- **JavaScript 数组的[索引从 0 开始](https://zh.wikipedia.org/zh-cn/從零開始的編號)**：数组的第一个元素在索引 `0` 处，第二个在索引 `1` 处，以此类推，最后一个元素是数组的 [`length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length) 属性减去 `1` 的值。
- **JavaScript [数组复制操作](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array#复制数组)创建[浅拷贝](https://developer.mozilla.org/zh-CN/docs/Glossary/Shallow_copy)**。（*所有* JavaScript 对象的标准内置复制操作都会创建浅拷贝，而不是[深拷贝](https://developer.mozilla.org/zh-CN/docs/Glossary/Deep_copy)）。

### 数组下标

`Array` 对象不能使用任意字符串作为元素索引（如[关联数组](https://zh.wikipedia.org/wiki/关联数组)），必须使用非负整数（或它们的字符串形式）。通过非整数设置或访问不会设置或从数组列表本身检索元素， 但会设置或访问与该数组的[对象属性集合](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#属性)相关的变量。数组的对象属性和数组元素列表是分开的，数组的[遍历和修改操作](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Indexed_collections#数组的方法_array_methods)不能应用于这些命名属性。

数组元素是对象属性，就像 `toString` 是属性一样（具体来说，`toString()` 是一种方法）。然而，尝试按以下方式访问数组的元素会抛出语法错误，因为属性名无效：

```js
console.log(arr.0); // a syntax error
```

JavaScript 语法要求使用[方括号表示法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Working_with_Objects#对象和属性)而不是[点号表示法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Property_Accessors)来访问以数字开头的属性。也可以用引号包裹数组下标（例如，`years['2']` 而不是 `years[2]`），尽管通常没有必要。

JavaScript 引擎通过隐式的 `toString`，将 `years[2]` 中的 `2` 强制转换为字符串。因此，`'2'` 和 `'02'` 将指向 `years` 对象上的两个不同的槽位，下面的例子可能是 `true`：

```js
console.log(years['2'] !== years['02']);
```

只有 `years['2']` 是一个实际的数组索引。`years['02']` 是一个在数组迭代中不会被访问的任意字符串属性。

### 长度与数值属性的关系

JavaScript 数组的 [`length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length) 属性和数值属性是连接的。

一些内置数组方法（例如 [`join()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/join)、[`slice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)、[`indexOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) 等）在被调用时会考虑到数组的 [`length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length) 属性的值。

其他方法（例如，[`push()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push)、[`splice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) 等）也会更新数组的 [`length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length) 属性。

```js
const fruits = [];
fruits.push('banana', 'apple', 'peach');
console.log(fruits.length); // 3
```

当在 JavaScript 数组上设置一个属性时，如果该属性是一个有效的数组索引并且该索引在数组的当前边界之外，引擎将相应地更新数组的 [`length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length) 属性：

```js
fruits[5] = 'mango';
console.log(fruits[5]);            // 'mango'
console.log(Object.keys(fruits));  // ['0', '1', '2', '5']
console.log(fruits.length);        // 6
```

增加 [`length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length)。

```js
fruits.length = 10;
console.log(fruits);              // ['banana', 'apple', 'peach', empty x 2, 'mango', empty x 4]
console.log(Object.keys(fruits)); // ['0', '1', '2', '5']
console.log(fruits.length);       // 10
console.log(fruits[8]);           // undefined
```

但是，减少 [`length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length) 属性会删除元素。

```js
fruits.length = 2;
console.log(Object.keys(fruits)); // ['0', '1']
console.log(fruits.length);       // 2
```

这将在 [`Array/length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length) 页中进一步解释。

### 数组方法和空槽

[稀疏数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Indexed_collections#sparse_arrays)中的空槽在数组方法之间的行为不一致。通常，旧方法会跳过空槽，而新方法将它们视为 `undefined`。

在遍历多个元素的方法中，下面的方法在访问索引之前执行 [`in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/in) 检查，并且不将空槽与 `undefined` 合并：

- [`concat()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)
- [`copyWithin()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin)
- [`every()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
- [`filter()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [`flat()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)
- [`flatMap()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)
- [`forEach()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
- [`indexOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)
- [`lastIndexOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf)
- [`map()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [`reduce()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
- [`reduceRight()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/ReduceRight)
- [`reverse()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)
- [`slice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
- [`some()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
- [`sort()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
- [`splice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)

关于它们是如何处理空槽的，请参阅每个方法的页面。

这些方法将空槽视为 `undefined`：

- [`entries()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/entries)
- [`fill()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)
- [`find()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
- [`findIndex()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)
- [`findLast()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findLast)
- [`findLastIndex()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findLastIndex)
- [`group()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/group)
- [`groupToMap()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/groupToMap)
- [`includes()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)
- [`join()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/join)
- [`keys()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/keys)
- [`toLocaleString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString)
- [`values()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/values)

### 复制方法和修改方法

有些方法不改变调用该方法的现有数组，而是返回一个新数组。它们首先访问 [`this.constructor[Symbol.species\]`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/@@species) 来确定用于新数组的构造函数。然后用元素填充新构造的数组。复制总是触发[*浅拷贝*](https://developer.mozilla.org/zh-CN/docs/Glossary/Shallow_copy)——该方法从不复制初始创建数组以外的任何内容。原数组的元素按如下方式复制到新数组中：

- 对象：对象引用被复制到新数组中。原数组和新数组都引用同一个对象。也就是说，如果一个被引用的对象被修改，新数组和原数组都可以看到更改。
- 基本类型，如字符串，数字和布尔值（不是 [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)、[`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) 和 [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean) 对象）：它们的值被复制到新数组中。

其他方法会改变调用该方法的数组，在这种情况下，它们的返回值根据方法的不同而不同：有时是对相同数组的引用，有时是新数组的长度。

以下方法使用 `@@species` 创建新数组：

- [`concat()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)
- [`filter()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [`flat()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)
- [`flatMap()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)
- [`map()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [`slice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
- [`splice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)（构造返回的已删除元素数组）

注意，[`group()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/group) 和 [`groupToMap()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/groupToMap) 不使用 `@@species` 为每个组条目创建新数组，而是始终使用普通的 `Array` 构造函数。从概念上讲，它们也不是复制方法。

以下方法可以对原数组进行修改：

- [`copyWithin()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin)
- [`fill()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)
- [`pop()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)
- [`push()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
- [`reverse()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)
- [`shift()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)
- [`sort()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
- [`splice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
- [`unshift()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)

### 通用数组方法

数组方法总是通用的——它们不访问数组对象的任何内部数据。它们只通过 `length` 属性和索引访问数组元素。这意味着它们也可以在类数组对象上调用。

```js
const arrayLike = {
  0: "a",
  1: "b",
  length: 2,
};
console.log(Array.prototype.join.call(arrayLike, "+")); // 'a+b'
```

#### 长度属性的规范化

`length` 属性被[转换为一个数字](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number#number_强制转换)，被截断为一个整数，然后固定为 0 到 253 - 1 之间的范围。`NaN` 变成 `0`，所以即使 `length` 没有出现或 `undefined`，它也会表现得好像它的值是 `0`。

```js
Array.prototype.flat.call({}); // []
```

一些数组方法会设置数组对象的 `length` 属性。它们总是在规范化后设置值，因此 `length` 总是以整数结尾。

```js
const a = { length: 0.7 };
Array.prototype.push.call(a);
console.log(a.length); // 0
```

#### 类数组对象

术语[*类数组对象*](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Indexed_collections#working_with_array-like_objects)指的是在上面描述的 `length` 转换过程中不抛出的任何对象。在实践中，这样的对象应该实际具有 `length` 属性，并且索引元素的范围在 `0` 到 `length - 1` 之间。（如果它没有所有的索引，它将在功能上等同于[稀疏数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array#数组方法和空槽)。）

许多 DOM 对象都是类数组对象——例如 [`NodeList`](https://developer.mozilla.org/zh-CN/docs/Web/API/NodeList) 和 [`HTMLCollection`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCollection)。[`arguments`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments) 对象也是类数组对象。你可以在它们上调用数组方法，即使它们本身没有这些方法。

```js
function f() {
  console.log(Array.prototype.join.call(arguments, "+"));
}

f("a", "b"); // 'a+b'
```

## 构造函数

- [`Array()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Array)

    创建一个新的 `Array` 对象。

## 静态属性

- [`get Array[@@species\]`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/@@species)

    返回 `Array` 构造函数。

## 静态方法

- [`Array.from()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

    从数组类对象或可迭代对象创建一个新的 `Array` 实例。

- [`Array.isArray()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)

    如果参数是数组则返回 `true` ，否则返回 `false` 。

- [`Array.of()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/of)

    创建一个新的 `Array` 实例，具有可变数量的参数，而不管参数的数量或类型。

## 实例属性

- [`Array.prototype.length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length)

    反映数组中元素的数量。

- [`Array.prototype[@@unscopables\]`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/@@unscopables)

    包含 ES2015 版本之前 ECMAScript 标准中没有包含的属性名，在使用 [`with`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/with) 绑定语句时会被忽略。

## 实例方法

- [`Array.prototype.at()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/at)

    返回给定索引处的数组元素。接受从最后一项往回计算的负整数。

- [`Array.prototype.concat()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)

    返回一个新数组，该数组由被调用的数组与其它数组或值连接形成。

- [`Array.prototype.copyWithin()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin)

    在数组内复制数组元素序列。

- [`Array.prototype.entries()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/entries)

    返回一个新的[*数组迭代器*](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Iterators_and_Generators)对象，其中包含数组中每个索引的键/值对。

- [`Array.prototype.every()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

    如果调用数组中的每个元素都满足测试函数，则返回 `true`。

- [`Array.prototype.fill()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)

    用静态值填充数组中从开始索引到结束索引的所有元素。

- [`Array.prototype.filter()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

    返回一个新数组，其中包含调用所提供的筛选函数返回为 `true` 的所有数组元素。

- [`Array.prototype.find()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

    返回数组中满足提供的测试函数的第一个元素的值，如果没有找到合适的元素，则返回 `undefined`。

- [`Array.prototype.findIndex()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)

    返回数组中满足提供的测试函数的第一个元素的索引，如果没有找到合适的元素，则返回 `-1`。

- [`Array.prototype.findLast()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findLast)

    返回数组中满足提供的测试函数的最后一个元素的值，如果没有找到合适的元素，则返回 `undefined`。

- [`Array.prototype.findLastIndex()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findLastIndex)

    返回数组中满足所提供测试函数的最后一个元素的索引，如果没有找到合适的元素，则返回 `-1`。

- [`Array.prototype.flat()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)

    返回一个新数组，所有子数组元素递归地连接到其中，直到指定的深度。

- [`Array.prototype.flatMap()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)

    对调用数组的每个元素调用给定的回调函数，然后将结果平展一层，返回一个新数组。

- [`Array.prototype.forEach()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

    对调用数组中的每个元素调用函数。

- [`Array.prototype.group()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/group) 实验性

    根据测试函数返回的字符串，将数组的元素分组到一个对象中。

- [`Array.prototype.groupToMap()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/groupToMap) 实验性

    根据测试函数返回的值，将数组的元素分组到 [`Map`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map) 中。

- [`Array.prototype.includes()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)

    确定调用数组是否包含一个值，根据情况返回 `true` 或 `false`。

- [`Array.prototype.indexOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)

    返回在调用数组中可以找到给定元素的第一个（最小）索引。

- [`Array.prototype.join()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/join)

    将数组的所有元素连接为字符串。

- [`Array.prototype.keys()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/keys)

    返回一个新的[*数组迭代器*](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Iterators_and_Generators)，其中包含调用数组中每个索引的键。

- [`Array.prototype.lastIndexOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf)

    返回在调用数组中可以找到给定元素的最后一个（最大）索引，如果找不到则返回 `-1`。

- [`Array.prototype.map()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

    返回一个新数组，其中包含对调用数组中的每个元素调用函数的结果。

- [`Array.prototype.pop()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)

    从数组中移除最后一个元素并返回该元素。

- [`Array.prototype.push()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push)

    在数组末尾添加一个或多个元素，并返回数组新的 `length`。

- [`Array.prototype.reduce()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

    对数组的每个元素（从左到右）执行用户提供的 “reducer” 回调函数，将其简化为单个值。

- [`Array.prototype.reduceRight()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/ReduceRight)

    对数组的每个元素（从右到左）执行用户提供的 “reducer” 回调函数，将其简化为单个值。

- [`Array.prototype.reverse()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)

    反转数组中元素的顺序。（前面变成后面，后面变成前面。）

- [`Array.prototype.shift()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)

    从数组中移除第一个元素并返回该元素。

- [`Array.prototype.slice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

    提取调用数组的一部分并返回一个新数组。

- [`Array.prototype.some()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

    如果调用数组中至少有一个元素满足提供的测试函数，则返回 `true`。

- [`Array.prototype.sort()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

    对数组的元素进行排序并返回该数组。

- [`Array.prototype.splice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)

    从数组中添加和/或删除元素。

- [`Array.prototype.toLocaleString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString)

    返回一个表示调用数组及其元素的本地化字符串。重写 [`Object.prototype.toLocaleString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toLocaleString) 方法。

- [`Array.prototype.toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toString)

    返回一个表示调用数组及其元素的字符串。重写 [`Object.prototype.toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) 方法。

- [`Array.prototype.unshift()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)

    在数组的前面添加一个或多个元素，并返回数组新的 `length`。

- [`Array.prototype.values()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/values)

    返回一个新的[*数组迭代器*](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Iterators_and_Generators)对象，该对象包含数组中每个索引的值。

- [`Array.prototype[@@iterator]()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/@@iterator)

    默认情况下，该方法为 [`values()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/values) 方法的别名。

## 示例

本节提供一些 JavaScript 中常见的数组操作示例。

**备注：** 如果你还不熟悉数组的基础知识，可以考虑先读一下 [JavaScript 第一步：数组](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Arrays)，它解释了[数组是什么](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/zh-CN/docs/Learn/JavaScript/First_steps/Arrays#数组是什么？)，还包括其他常见的数组操作示例。

### 创建数组

下面的例子展示了三种创建新数组的方法：首先使用[数组字面量](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Array#数组字面量)，然后使用 [`Array()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Array) 构造函数，最后使用 [`String.prototype.split()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/split) 从字符串构建数组。

```js
// 'fruits' array created using array literal notation.
const fruits = ['Apple', 'Banana'];
console.log(fruits.length);
// 2

// 'fruits2' array created using the Array() constructor.
const fruits2 = new Array('Apple', 'Banana');
console.log(fruits2.length);
// 2

// 'fruits3' array created using String.prototype.split().
const fruits3 = 'Apple, Banana'.split(', ');
console.log(fruits3.length);
// 2
```

### 从数组中创建一个字符串

下面的例子使用 [`join()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/join) 方法从 `fruits` 数组中创建一个字符串。

```js
const fruits = ['Apple', 'Banana'];
const fruitsString = fruits.join(', ');
console.log(fruitsString);
// "Apple, Banana"
```

### 通过索引访问数组元素

下面的例子展示了如何通过指定它们在数组中的位置的索引号来访问 `fruits` 数组中的元素。

```js
const fruits = ['Apple', 'Banana'];

// The index of an array's first element is always 0.
fruits[0]; // Apple

// The index of an array's second element is always 1.
fruits[1]; // Banana

// The index of an array's last element is always one
// less than the length of the array.
fruits[fruits.length - 1]; // Banana

// Using a index number larger than the array's length
// returns 'undefined'.
fruits[99]; // undefined
```

### 在数组中查找元素的索引

下面的例子使用 [`indexOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) 方法查找字符串 `"Banana"` 在 `fruits` 数组中的位置（索引）。

```js
const fruits = ['Apple', 'Banana'];
console.log(fruits.indexOf('Banana'));
// 1
```

### 检查数组是否包含某个元素

下面的例子展示了两种检查 `fruits` 数组是否包含 `"Banana"` 和 `"Cherry"` 的方法：首先使用 [`includes()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) 方法，然后使用 [`indexOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) 方法来测试索引值不是 `-1`。

```js
const fruits = ['Apple', 'Banana'];

fruits.includes('Banana'); // true
fruits.includes('Cherry'); // false

// 如果 indexOf() 不返回 -1，则数组包含给定的元素。
fruits.indexOf('Banana') !== -1; // true
fruits.indexOf('Cherry') !== -1; // false
```

### 将元素添加到数组中

下面的例子使用 [`push()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push) 方法向 `fruits` 数组追加一个新字符串。

```js
const fruits = ['Apple', 'Banana'];
const newLength = fruits.push('Orange');
console.log(fruits);
// ["Apple", "Banana", "Orange"]
console.log(newLength);
// 3
```

### 移除数组中的最后一个元素

下面的例子使用 [`pop()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/pop) 方法从 `fruits` 数组中移除最后一个元素。

```js
const fruits = ['Apple', 'Banana', 'Orange'];
const removedItem = fruits.pop();
console.log(fruits);
// ["Apple", "Banana"]
console.log(removedItem);
// Orange
```

> **备注：** `pop()` 只能用于从数组中移除最后一个元素。若要从数组末尾移除多个元素，请参见下一个示例。

### 从数组末尾移除多个元素

下面的例子使用 [`splice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) 方法从 `fruits` 数组中移除最后 3 个元素。

```js
const fruits = ['Apple', 'Banana', 'Strawberry', 'Mango', 'Cherry'];
const start = -3;
const removedItems = fruits.splice(start);
console.log(fruits);
// ["Apple", "Banana"]
console.log(removedItems);
// ["Strawberry", "Mango", "Cherry"]
```

### 将数组截断为前 N 个元素

下面的例子使用 [`splice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) 方法将 `fruits` 数组截断到只剩下前 2 个元素。

```js
const fruits = ['Apple', 'Banana', 'Strawberry', 'Mango', 'Cherry'];
const start = 2;
const removedItems = fruits.splice(start);
console.log(fruits);
// ["Apple", "Banana"]
console.log(removedItems);
// ["Strawberry", "Mango", "Cherry"]
```

### 移除数组中的第一个元素

下面的例子使用 [`shift()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/shift) 方法从 `fruits` 数组中移除第一个元素。

```js
const fruits = ['Apple', 'Banana'];
const removedItem = fruits.shift();
console.log(fruits);
// ["Banana"]
console.log(removedItem);
// Apple
```

**备注：** `shift()` 只能用于从数组中移除第一个元素。若要从数组的开头移除多个元素，请参见下一个示例。

### 从数组开头移除多个元素

下面的例子使用 [`splice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) 方法从 `fruits` 数组中移除前 3 个元素。

```js
const fruits = ['Apple', 'Strawberry', 'Cherry', 'Banana', 'Mango'];
const start = 0;
const deleteCount = 3;
const removedItems = fruits.splice(start, deleteCount);
console.log(fruits);
// ["Banana", "Mango"]
console.log(removedItems);
// ["Apple", "Strawberry", "Cherry"]
```

### 向数组开头添加一个新的元素

下面的例子使用 [`unshift()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift) 方法在索引 `0` 处向 `fruits` 数组中添加一个新元素——使其成为数组中新的第一元素。

```js
const fruits = ['Banana', 'Mango'];
const newLength = fruits.unshift('Strawberry');
console.log(fruits);
// ["Strawberry", "Banana", "Mango"]
console.log(newLength);
// 3
```

### 按索引移除单个元素

下面的例子使用 [`splice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) 方法从 `fruits` 数组中删除字符串 `"Banana"`——通过指定 `"Banana"` 的索引位置。

```js
const fruits = ['Strawberry', 'Banana', 'Mango'];
const start = fruits.indexOf('Banana');
const deleteCount = 1;
const removedItems = fruits.splice(start, deleteCount);
console.log(fruits);
// ["Strawberry", "Mango"]
console.log(removedItems);
// ["Banana"]
```

### 按索引移除多个元素

下面的例子使用 [`splice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) 方法从 `fruits` 数组中删除字符串 `"Banana"` 和 `"Strawberry"`——通过指定 `"Banana"` 的索引位置，以及要移除的元素总数。

```js
const fruits = ['Apple', 'Banana', 'Strawberry', 'Mango'];
const start = 1;
const deleteCount = 2;
const removedItems = fruits.splice(start, deleteCount);
console.log(fruits);
// ["Apple", "Mango"]
console.log(removedItems);
// ["Banana", "Strawberry"]
```

### 替换数组中的多个元素

下面的例子使用 [`splice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) 方法将 `fruits` 数组中的最后两个元素替换为新元素。

```js
const fruits = ['Apple', 'Banana', 'Strawberry'];
const start = -2;
const deleteCount = 2;
const removedItems = fruits.splice(start, deleteCount, 'Mango', 'Cherry');
console.log(fruits);
// ["Apple", "Mango", "Cherry"]
console.log(removedItems);
// ["Banana", "Strawberry"]
```

### 遍历数组

下面的例子使用 [`for...of`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of) 循环遍历 `fruits` 数组，将每一个元素打印到控制台。

```js
const fruits = ['Apple', 'Mango', 'Cherry'];
for (const fruit of fruits) {
  console.log(fruit);
}
// Apple
// Mango
// Cherry
```

但 `for...of` 只是遍历任意数组的众多方法之一；更多方法，参见[循环与迭代](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Loops_and_iteration)，并查看 [`every()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every)、[`filter()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)、[`flatMap()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)、[`map()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)、[`reduce()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) 和 [`reduceRight()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/ReduceRight) 方法——并参见下一个示例，该示例使用 [`forEach()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) 方法。

### 对数组中的每个元素调用函数

下面的例子使用 [`forEach()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) 方法在 `fruits` 数组中的每个元素上调用一个函数；该函数将每个元素以及元素的索引号打印到控制台。

```js
const fruits = ['Apple', 'Mango', 'Cherry'];
fruits.forEach((item, index, array) => {
  console.log(item, index);
});
// Apple 0
// Mango 1
// Cherry 2
```

### 合并多个数组

下面的例子使用 [`concat()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) 方法将 `fruits` 数组与 `moreFruits` 数组合并，生成一个新的 `combinedFruits` 数组。注意，`fruits` 和 `moreFruits` 保持不变。

```js
const fruits = ['Apple', 'Banana', 'Strawberry'];
const moreFruits = ['Mango', 'Cherry'];
const combinedFruits = fruits.concat(moreFruits);
console.log(combinedFruits);
// ["Apple", "Banana", "Strawberry", "Mango", "Cherry"]

// The 'fruits' array remains unchanged.
console.log(fruits);
// ["Apple", "Banana", "Strawberry"]

// The 'moreFruits' array also remains unchanged.
console.log(moreFruits);
// ["Mango", "Cherry"]
```

### 复制数组

下面的例子展示了从现有的 `fruits` 数组创建新数组的三种方法：首先使用[展开语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)，然后使用 [`from()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from) 方法，然后使用 [`slice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) 方法。

```js
const fruits = ['Strawberry', 'Mango'];

// Create a copy using spread syntax.
const fruitsCopy = [...fruits];
// ["Strawberry", "Mango"]

// Create a copy using the from() method.
const fruitsCopy2 = Array.from(fruits);
// ["Strawberry", "Mango"]

// Create a copy using the slice() method.
const fruitsCopy3 = fruits.slice();
// ["Strawberry", "Mango"]
```

所有内置的数组复制操作（[展开语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)、[`Array.from()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)、[`Array.prototype.slice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) 和 [`Array.prototype.concat()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)）都会创建[浅拷贝](https://developer.mozilla.org/zh-CN/docs/Glossary/Shallow_copy)。如果你想要一个数组的[深拷贝](https://developer.mozilla.org/zh-CN/docs/Glossary/Deep_copy)，你可以使用 [`JSON.stringify()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) 将数组转换成一个 JSON 字符串，然后使用 [`JSON.parse()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) 将字符串转换回一个完全独立于原数组的新数组。

```js
const fruitsDeepCopy = JSON.parse(JSON.stringify(fruits));

const arr: number[] = [1, 2, 3, 4, 5];
const arr1 = JSON.stringify(arr);
console.log(Object.prototype.toString.call(arr), Object.prototype.toString.call(JSON.parse(arr1)));
// [object Array] [object Array]
console.log(JSON.parse(arr1) === arr)	// false
```

你还可以使用 [`structuredClone()`](https://developer.mozilla.org/zh-CN/docs/web/api/structuredClone) 方法创建深拷贝，该方法的优点是允许源代码中的[可转移对象](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Transferable_objects)被*转移*到新的副本，而不仅仅是克隆。

最后，重要的是要理解，将现有数组赋值给新变量并不会创建数组或其元素的副本。相反，新变量只是对原数组的引用或别名；也就是说，原来的数组名和新的变量名只是同一个对象的两个名称（因此总是被计算为[严格相等](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness#严格相等)）。因此，如果你对原数组的值或新变量的值做了任何改变，另一个也会改变：

```js
const fruits = ['Strawberry', 'Mango'];
const fruitsAlias = fruits;
// 'fruits' and 'fruitsAlias' are the same object, strictly equivalent.
fruits === fruitsAlias // true
// Any changes to the 'fruits' array change 'fruitsAlias' too.
fruits.unshift('Apple', 'Banana');
console.log(fruits);
// ['Apple', 'Banana', 'Strawberry', 'Mango']
console.log(fruitsAlias);
// ['Apple', 'Banana', 'Strawberry', 'Mango']
```

### 对数组的元素进行分组

[`Array.prototype.group()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/group) 方法可用于对数组的元素进行分组，使用测试函数返回指示当前元素组的字符串。

这里我们有一个简单的库存数组，它包含具有 `name` 和 `type` 的 `food` 对象。

```js
const inventory = [
  { name: 'asparagus', type: 'vegetables' },
  { name: 'bananas', type: 'fruit' },
  { name: 'goat', type: 'meat' },
  { name: 'cherries', type: 'fruit' },
  { name: 'fish', type: 'meat' },
];
```

要使用 `group()`，你需要提供一个回调函数，该回调函数与当前元素、可选的当前索引和数组一起调用，并返回指示元素组的字符串。

下面的例子使用一个箭头函数返回每个数组元素的 `type`（此处使用[函数参数的对象解构语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#从作为函数实参的对象中提取数据)从传递的对象中提取 `type` 元素)。结果是一个对象，其属性以回调返回的唯一字符串命名。为每个属性分配一个数组，其中包含数组中的元素。

```js
const result = inventory.group(({ type }) => type);
console.log(result.vegetables);
// expected output: Array [Object { name: "asparagus", type: "vegetables" }]
```

注意，返回的对象引用*相同*元素作为原数组（而不是[深拷贝](https://developer.mozilla.org/zh-CN/docs/Glossary/Deep_copy)）。改变这些元素的内部结构将反映在原始数组和返回对象中。

如果不能使用字符串作为键，例如，如果要分组的信息与可能更改的对象相关联，那么可以使用 [`Array.prototype.groupToMap()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/groupToMap)。这与 `group` 非常相似，只是它将数组的元素分组到 [`Map`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map) 中，可以使用任意值（[对象](https://developer.mozilla.org/zh-CN/docs/Glossary/Object)或[基本类型](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive)）作为键。

### 创建二维数组

下面的例子创建了一个代表棋盘的二维字符串数组。第一步是将 `board[6][4]` 中的 `'p'` 复制到 `board[4][4]`。原本的 `[6][4]` 位置则被设置为空格。

```js
const board = [
  ['R','N','B','Q','K','B','N','R'],
  ['P','P','P','P','P','P','P','P'],
  [' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' '],
  ['p','p','p','p','p','p','p','p'],
  ['r','n','b','q','k','b','n','r'] ];

console.log(`${board.join('\n')}\n\n`);

// Move King's Pawn forward 2
board[4][4] = board[6][4];
board[6][4] = ' ';
console.log(board.join('\n'));
```

下面是输出：

```bash
R,N,B,Q,K,B,N,R
P,P,P,P,P,P,P,P
 , , , , , , ,
 , , , , , , ,
 , , , , , , ,
 , , , , , , ,
p,p,p,p,p,p,p,p
r,n,b,q,k,b,n,r

R,N,B,Q,K,B,N,R
P,P,P,P,P,P,P,P
 , , , , , , ,
 , , , , , , ,
 , , , ,p, , ,
 , , , , , , ,
p,p,p,p, ,p,p,p
r,n,b,q,k,b,n,r
```

### 使用数组将一组值制成表格

```js
const values = [];
for (let x = 0; x < 10; x++) {
  values.push([
    2 ** x,
    2 * x ** 2,
  ]);
}
console.table(values);
```

结果为：

```bash
// The first column is the index
0  1    0
1  2    2
2  4    8
3  8    18
4  16   32
5  32   50
6  64   72
7  128  98
8  256  128
9  512  162
```

### 使用匹配的结果创建数组

[`RegExp`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp) 和字符串之间的匹配结果可以创建一个 JavaScript 数组，该数组具有匹配信息的属性和元素。这样的数组由 [`RegExp.prototype.exec()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec) 和 [`String.prototype.match()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/match) 返回。

例如：

```js
// Match one d followed by one or more b's followed by one d
// Remember matched b's and the following d
// Ignore case

const myRe = /d(b+)(d)/i;
const execResult = myRe.exec('cdbBdbsbz');

console.log(execResult.input); // 'cdbBdbsbz'
console.log(execResult.index); // 1
console.log(execResult); // [ "dbBd", "bB", "d" ]
```

有关匹配结果的更多信息，请参见 [`RegExp.prototype.exec()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec) 和 [`String.prototype.match()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/match) 页。