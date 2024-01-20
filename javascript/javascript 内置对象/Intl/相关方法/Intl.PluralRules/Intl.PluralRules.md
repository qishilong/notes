# Intl.PluralRules

**`Intl.PluralRules`** 对象是用于复数敏感的格式化和复数相关的语言规则。

## 构造函数

-   [`Intl.PluralRules()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/PluralRules)

    创建一个新的 `Intl.PluralRules` 对象。

## 静态方法

-   [`Intl.PluralRules.supportedLocalesOf()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/supportedLocalesOf)

    返回一个数组，其中包含提供的区域（locale）中被运行时所支持的，而不必回退到运行时的默认区域。

## 实例方法

-   [`Intl.PluralRules.prototype.resolvedOptions()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/resolvedOptions)

    返回一个新的对象，其属性反映了在对象初始化期间计算所得的区域和一系列选项。

-   [`Intl.PluralRules.prototype.select()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/select)

    返回一个字符串，指示用于区域敏感的格式化的复数类别。

-   [`Intl.PluralRules.prototype.selectRange()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/selectRange)

    此方法接收两个值并返回一个字符串，指示用于区域敏感的格式化的复数类别。

## 示例

### 使用 locales

此示例显示本地化复数类别的一些值。为了获得应用程序用户界面中使用的语言格式，请确保使用 `locales` 参数指定了语言（可能还有一些回退语言）：

```js
// 阿拉伯语有不同的复数类别

new Intl.PluralRules("ar-EG").select(0);
// → 'zero'
new Intl.PluralRules("ar-EG").select(1);
// → 'one'
new Intl.PluralRules("ar-EG").select(2);
// → 'two'
new Intl.PluralRules("ar-EG").select(6);
// → 'few'
new Intl.PluralRules("ar-EG").select(18);
// → 'many'
```