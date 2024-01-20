# Intl.Collator

**`Intl.Collator`** 对象用于语言敏感的字符串比较。

## 尝试一下

<iframe class="interactive is-js-height" height="200" src="https://interactive-examples.mdn.mozilla.net/pages/js/intl-collator.html" title="MDN Web Docs Interactive Example" loading="lazy" data-readystate="complete" style="box-sizing: border-box; border: 0px; max-width: 100%; width: 765.719px; background-color: var(--background-secondary); border-radius: var(--elem-radius); color: var(--text-primary); height: 444px; margin: 1rem 0px; padding: 0px;"></iframe>

## 构造函数

-   [`Intl.Collator()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator)

    创建一个新的 `Collator` 对象。

## 静态方法

-   [`Intl.Collator.supportedLocalesOf()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/supportedLocalesOf)

    返回一个数字，其中包含提供的区域（locale）中被运行时所支持的，而不必回退到运行时的默认区域。

## 实例方法

-   [`Intl.Collator.prototype.compare` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/compare)

    getter 函数，根据 [`Intl.Collator`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator) 对象的排序顺序来比较两个字符串。

-   [`Intl.Collator.prototype.resolvedOptions()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/resolvedOptions)

    返回一个新对象，其属性反映了在对象初始化期间计算所得的区域和一系列选项。

## 示例

### 使用 Collator

以下示例演示了一个字符串在另一个字符串之前、之后或与另一个字符串处于同一级别时可能出现的不同结果：

```js
console.log(new Intl.Collator().compare("a", "c")); // -1，或一些其他的负值
console.log(new Intl.Collator().compare("c", "a")); // 1，或一些其他的正值
console.log(new Intl.Collator().compare("a", "a")); // 0
```

请注意，上面代码中显示的结果可能因浏览器和浏览器版本而异。这是因为这些值是特定于实现的。即，规范仅要求在比较的字符串之前和之后分别对应负值和正值。

### 使用 locales

[`Collator.prototype.compare()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/compare) 提供的结果在不同语言之间有所不同。为了获得用于你的应用程序的用户界面的语言格式，请确保使用 `locales` 参数指定了语言（可能还有一些回退语言）：

```js
// 德语中，ä 使用 a 的排序
console.log(new Intl.Collator("de").compare("ä", "z"));
// -1，或一些其他的负值

// 在瑞典语中，ä 排在 z 之后
console.log(new Intl.Collator("sv").compare("ä", "z"));
// 1，或一些其他的正值
```

### 使用 options

[`Collator.prototype.compare()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/compare) 提供的结果可以使用 options 参数自定义：

```js
// 德语中，ä 使用 a 作为基本字母
console.log(new Intl.Collator("de", { sensitivity: "base" }).compare("ä", "a"));
// 0

// 瑞典语中，ä 和 a 是单独的基本字母
console.log(new Intl.Collator("sv", { sensitivity: "base" }).compare("ä", "a"));
// 1，或一些其他的正值
```