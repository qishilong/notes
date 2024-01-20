# Intl.NumberFormat

**`Intl.NumberFormat`** 对象能使数字在特定的语言环境下格式化。

## 尝试一下

<iframe class="interactive is-js-height" height="200" src="https://interactive-examples.mdn.mozilla.net/pages/js/intl-numberformat.html" title="MDN Web Docs Interactive Example" loading="lazy" data-readystate="complete" style="box-sizing: border-box; border: 0px; max-width: 100%; width: 765.719px; background-color: var(--background-secondary); border-radius: var(--elem-radius); color: var(--text-primary); height: 444px; margin: 1rem 0px; padding: 0px;"></iframe>

## 构造函数

-   [`Intl.NumberFormat()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat)

    创建一个新的 `NumberFormat` 对象。

## 静态方法

-   [`Intl.NumberFormat.supportedLocalesOf()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/supportedLocalesOf)

    返回一个数组，其包含着那些被提供的受支持的区域（locale），而运行时的默认的区域不会出现在该数组。

## 实例方法

-   [`Intl.NumberFormat.prototype.format()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/format)

    getter 函数，根据此 [`Intl.NumberFormat`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) 对象的区域设置和格式化选项格式化数字。

-   [`Intl.NumberFormat.prototype.formatToParts()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/formatToParts)

    返回一个对象[数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)，其中表示的是数字字符串的各个部分，可以用于自定义本地化格式。

-   [`Intl.NumberFormat.prototype.formatRange()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/formatRange)

    getter 函数，根据调用该方法的 [`Intl.NumberFormat`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) 对象的区域设置和格式化选项格式化一个数字的范围。

-   [`Intl.NumberFormat.prototype.formatRangeToParts()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/formatRangeToParts)

    返回一个对象[数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)，其中表示的是数字范围的字符串的各个部分，可以用于自定义本地化格式。

-   [`Intl.NumberFormat.prototype.resolvedOptions()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/resolvedOptions)

    返回一个新对象，其属性能够反映相应对象在初始化时计算所得的区域和格式化选项。

## 示例

### 基础用例

在不指定区域设置的基本用例中，返回默认区域和默认选项中的格式化字符串。

```js
const number = 3500;

console.log(new Intl.NumberFormat().format(number));
// 如果在美式英语区域 → '3,500'
```

### 使用 locales

此示例展示了本地数字格式化的一些变化。为了得到用户应用接口使用的语言格式，请确保使用 `locales` 参数指定该语言（可能还有一些备选语言）：

```js
const number = 123456.789;

// 德语使用逗号（,）作为小数点，使用句号（.）作为千位分隔符
console.log(new Intl.NumberFormat("de-DE").format(number));
// → 123.456,789

// 大多数阿拉伯语国家使用阿拉伯语数字
console.log(new Intl.NumberFormat("ar-EG").format(number));
// → ١٢٣٤٥٦٫٧٨٩

// India uses thousands/lakh/crore separators
console.log(new Intl.NumberFormat("en-IN").format(number));
// → 1,23,456.789

// 通过编号系统中的 nu 扩展键请求，例如：中文十进制数字
console.log(new Intl.NumberFormat("zh-Hans-CN-u-nu-hanidec").format(number));
// → 一二三,四五六.七八九

//当请求的语言不被支持，例如巴里，包含一个回滚语言印尼，这时候就会使用印尼语
console.log(new Intl.NumberFormat(["ban", "id"]).format(number));
// → 123.456,789
```

### 使用 options

可以使用 [`options` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat) 参数自定义结果：

```js
const number = 123456.789;

// 要求货币格式
console.log(
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(
    number,
  ),
);
// 123.456,79 €

// 日元不使用小数位
console.log(
  new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" }).format(
    number,
  ),
);
// ￥123,457

// 限制三位有效数字
console.log(
  new Intl.NumberFormat("en-IN", { maximumSignificantDigits: 3 }).format(
    number,
  ),
);
// 1,23,000

// 带有单位的格式化
console.log(
  new Intl.NumberFormat("pt-PT", {
    style: "unit",
    unit: "kilometer-per-hour",
  }).format(50),
);
// 50 km/h

console.log(
  (16).toLocaleString("en-GB", {
    style: "unit",
    unit: "liter",
    unitDisplay: "long",
  }),
);
// 16 litres
```

有关详尽的选项列表，参见 [`Intl.NumberFormat()` 构造函数 (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat)页面。