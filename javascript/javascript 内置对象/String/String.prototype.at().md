# String.prototype.at()

**`at()`** 方法接受一个整数值，并返回一个新的 [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)，该字符串由位于指定偏移量处的单个 UTF-16 码元组成。该方法允许正整数和负整数。负整数从字符串中的最后一个字符开始倒数。

## 尝试一下

<iframe class="interactive is-js-height" height="200" src="https://interactive-examples.mdn.mozilla.net/pages/js/string-at.html" title="MDN Web Docs Interactive Example" loading="lazy" data-readystate="complete" style="box-sizing: border-box; border: 0px; max-width: 100%; width: 755px; background-color: var(--background-secondary); border-radius: var(--elem-radius); color: var(--text-primary); height: 444px; margin: 1rem 0px; padding: 0px;"></iframe>

## 语法

```js
at(index)
```

### 参数

- `index`

    要返回的字符串字符的索引（位置）。当传递负数时，支持从字符串末端开始的相对索引；也就是说，如果使用负数，返回的字符将从字符串的末端开始倒数。

### 返回值

由位于指定位置的单个 UTF-16 码元组成的 [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)。如果找不到指定的索引，则返回 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined) 。

## 示例

### 返回字符串的最后一个字符

以下示例提供了一个函数，该函数返回指定字符串中的最后一个字符。

```js
// A function which returns the last character of a given string
function returnLast(arr) {
  return arr.at(-1);
}

let invoiceRef = 'myinvoice01';

console.log( returnLast(invoiceRef) );
// Logs: '1'

invoiceRef = 'myinvoice02';

console.log( returnLast(invoiceRef) );
// Logs: '2'
```

### 方法对比

在这里，我们通过比较不同的方法来实现选择 [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 的倒数第二个字符。尽管以下所有方法都是有效的，但它突出了 `at()` 方法的简洁性和可读性。

```js
const myString = 'Every green bus drives fast.';

// Using length property and charAt() method
const lengthWay = myString.charAt(myString.length-2);
console.log(lengthWay); // Logs: 't'

// Using slice() method
const sliceWay = myString.slice(-2, -1);
console.log(sliceWay); // Logs: 't'

// Using at() method
const atWay = myString.at(-2);
console.log(atWay); // Logs: 't'
```