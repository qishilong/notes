# Intl.Segmenter

**`Intl.Segmenter`** 对象支持语言敏感的文本分割，允许你将一个字符串分割成有意义的片段（字、词、句）。

## 尝试一下

<iframe class="interactive is-js-height" height="200" src="https://interactive-examples.mdn.mozilla.net/pages/js/intl-segmenter.html" title="MDN Web Docs Interactive Example" loading="lazy" data-readystate="complete" style="box-sizing: border-box; border: 0px; max-width: 100%; width: 765.719px; background-color: var(--background-secondary); border-radius: var(--elem-radius); color: var(--text-primary); height: 444px; margin: 1rem 0px; padding: 0px;"></iframe>

## 构造函数

-   [`Intl.Segmenter()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter/Segmenter)

    创建一个新的 `Intl.Segmenter` 对象。

## 静态方法

-   [`Intl.Segmenter.supportedLocalesOf()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter/supportedLocalesOf)

    返回一个数组，其中包括了传入参数中的受支持的语言，而不必受限于运行时的默认语言环境。

## 实例方法

-   [`Intl.Segmenter.prototype.resolvedOptions()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter/resolvedOptions)

    返回一个新的对象，对象的属性反映了这个 `Intl.Segmenter` 实例初始化期间计算的语言环境和粒度选项。

-   [`Intl.Segmenter.prototype.segment()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter/segment)

    返回一个新的 [`Segments` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter/segment/Segments) 实例，它是一个可迭代对象，包含了根据当前 `Intl.Segmenter` 实例的语言环境和粒度选项生成的字符串片段。

## 示例

### 基础用法及与 String.prototype.split() 的区别

如果我们使用 [`String.prototype.split(" ")`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/split) 来将一段文本分割成词汇，如果这段文本的语言并不是使用空格来分割词汇的话，那我们就不能保证得到的是正确的结果（例如日语、中文、泰语、老挝语、高棉语、缅甸语等语言）。

```js
const str = "吾輩は猫である。名前はたぬき。";
console.table(str.split(" "));
// ['吾輩は猫である。名前はたぬき。']
// 这两个句子并没有得到正确的分割。
```

```js
const str = "吾輩は猫である。名前はたぬき。";
const segmenterJa = new Intl.Segmenter("ja-JP", { granularity: "word" });

const segments = segmenterJa.segment(str);
console.table(Array.from(segments));
// [{segment: '吾輩', index: 0, input: '吾輩は猫である。名前はたぬき。', isWordLike: true},
// etc.
// ]
```