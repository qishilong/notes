# Intl.supportedValuesOf()

`Intl.supportedValuesOf()` 静态方法返回一个数组，其中包含实现支持的日历、排序规则、货币、编号系统或单位值。

省略重复项，数组按字典升序排序（或者更准确地说，与 `undefined` 比较函数一起使用 `Array.prototype.sort()` ）。

该方法可用于功能测试特定实现中是否支持值，并仅在必要时下载 polyfill。它还可用于构建允许用户选择其首选本地化值的 UI，例如，当 UI 是从 WebGL 或服务器端创建的时。

## 尝试一下

<iframe class="interactive is-taller-height" height="200" src="https://interactive-examples.mdn.mozilla.net/pages/js/intl-supportedvaluesof.html" title="MDN Web Docs Interactive Example" loading="lazy" data-readystate="complete" style="box-sizing: border-box; border: 0px; max-width: 100%; width: 765.719px; background-color: var(--background-secondary); border-radius: var(--elem-radius); color: var(--text-primary); height: 654px; margin: 1rem 0px; padding: 0px;"></iframe>

## 语法

```js
Intl.supportedValuesOf(key)
```

### 参数

-   [`key`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/supportedValuesOf#key)

    一个键字符串，指示要返回的值的类别。这是以下之一： `"calendar"` 、、、 `"currency"` `"numberingSystem"` 、 `"unit"` 、 `"timeZone"` `"collation"` 。

### 返回值

唯一字符串值的排序数组，指示给定键的实现支持的值。

### 异常

-   [`RangeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RangeError)

    如果将不支持的键作为参数传递，则引发。

## 例子

### 功能测试

您可以通过比较以下方法 `undefined` 来检查该方法是否受支持：

```js
if (typeof Intl.supportedValuesOf !== "undefined") {
  // method is supported
}
```

### 获取键的所有值

若要获取 calendar 支持的值，请使用键 `"calendar"` 调用该方法。然后，您可以遍历返回的数组，如下所示：

```js
Intl.supportedValuesOf("calendar").forEach((calendar) => {
  // "buddhist", "chinese", "coptic", "dangi", etc.
});
```

注意：为日历值返回的数组将始终包含值“gregory”（公历）。

其他值都以相同的方式获得：

```js
Intl.supportedValuesOf("collation").forEach((collation) => {
  // "compat", "dict", "emoji", etc.
});

Intl.supportedValuesOf("currency").forEach((currency) => {
  // "ADP", "AED", "AFA", "AFN", "ALK", "ALL", "AMD", etc.
});

Intl.supportedValuesOf("numberingSystem").forEach((numberingSystem) => {
  // "adlm", "ahom", "arab", "arabext", "bali", etc.
});

Intl.supportedValuesOf("timeZone").forEach((timeZone) => {
  // "Africa/Abidjan", "Africa/Accra", "Africa/Addis_Ababa", "Africa/Algiers", etc.
});

Intl.supportedValuesOf("unit").forEach((unit) => {
  // "acre", "bit", "byte", "celsius", "centimeter", etc.
});
```

### 无效键引发 RangeError

```js
try {
  Intl.supportedValuesOf("someInvalidKey");
} catch (err) {
  //Error: RangeError: invalid key: "someInvalidKey"
}
```