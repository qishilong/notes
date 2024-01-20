# Intl.RelativeTimeFormat

**`Intl.RelativeTimeFormat`** 对象用于语言敏感的相对时间的格式化。

## 尝试一下

<iframe class="interactive is-js-height" height="200" src="https://interactive-examples.mdn.mozilla.net/pages/js/intl-relativetimeformat.html" title="MDN Web Docs Interactive Example" loading="lazy" data-readystate="complete" style="box-sizing: border-box; border: 0px; max-width: 100%; width: 765.719px; background-color: var(--background-secondary); border-radius: var(--elem-radius); color: var(--text-primary); height: 444px; margin: 1rem 0px; padding: 0px;"></iframe>

## 构造函数

-   [`Intl.RelativeTimeFormat()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat)

    创建一个新的 `Intl.RelativeTimeFormat` 对象。

## 静态方法

-   [`Intl.RelativeTimeFormat.supportedLocalesOf()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/supportedLocalesOf)

    返回一个数组，其中包含提供的区域（locale）中被运行时所支持的，而不必回退到运行时的默认区域。

## 实例方法

-   [`Intl.RelativeTimeFormat.prototype.format()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/format)

    根据给定的 `Intl.RelativeTimeFormat` 对象的区域和格式化选项来格式化值（`value`）和单位（`unit`）。

-   [`Intl.RelativeTimeFormat.prototype.formatToParts()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/formatToParts)

    返回一个对象[数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)，其中的对象表示的是相对事件格式字符串中的各个部分，可用于自定义本地化格式。

-   [`Intl.RelativeTimeFormat.prototype.resolvedOptions()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/resolvedOptions)

    返回一个新的对象，其属性反映了在对象初始化期间计算所得的区域和一系列选项。

## 示例

### 基本 format 用法

以下示例显示如何为英语创建相对时间格式化程序。

```js
// 在你的区域下创建相对时间格式化程序
// 显式传入默认值。
const rtf = new Intl.RelativeTimeFormat("en", {
  localeMatcher: "bestfit", // 其他值："lookup"
  numeric: "always", // 其他值："auto"
  style: "long", // 其他值："short"或"narrow"
});

// 使用负值（-1）格式化相对时间。
rtf.format(-1, "day"); // "1 day ago"

// 使用正值（1）格式化相对时间。
rtf.format(1, "day"); // "in 1 day"
```

### 使用 formatToParts

以下示例展示了如何创建一个用于返回格式化后的每一个部分的相对时间格式化程序。

```js
const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

// 使用日期单位格式化相对时间。
rtf.formatToParts(-1, "day");
// [{type: "literal", value: "yesterday"}]

rtf.formatToParts(100, "day");
// [
//   { type: "literal", value: "in " },
//   { type: "integer", value: "100", unit: "day" },
//   { type: "literal", value: " days" }
// ]
```