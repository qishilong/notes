# <textarea>：文本区元素

**HTML `<textarea>` 元素**表示一个多行纯文本编辑控件，当你希望用户输入一段相当长的、不限格式的文本，例如评论或反馈表单中的一段意见时，这很有用。

## [尝试一下](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/textarea#尝试一下)

<iframe class="interactive is-tabbed-standard-height" height="200" src="https://interactive-examples.mdn.mozilla.net/pages/tabbed/textarea.html" title="MDN Web Docs Interactive Example" loading="lazy" data-readystate="complete" style="box-sizing: border-box; border: none; max-width: 100%; width: 765.719px; background-color: var(--background-secondary); border-radius: var(--elem-radius); color: var(--text-primary); height: 421px; margin: 1rem 0px; padding: 0px;"></iframe>

上述例子展示了 `<textarea>` 的几个特点：

-   为了提高无障碍（accessibility），用于将 `<textarea>`与一个 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/label) 关联的 `id` 属性。
-   `name` 属性，用于设置随表单一同提交到服务器的相关数据的名字。
-   `rows` 和 `cols` 属性，用于声明 `<textarea>` 的精确尺寸。这对于一致性非常有帮助，因为不同浏览器的默认值常常不一样。
-   位于开始标签和闭合标签之间的默认内容。`<textarea>` 不支持 `value` 属性。

`<textarea>` 还可以使用 `<input>` 中的一些常见属性，如`autocomplete`, `autofocus`, `disabled`, `placeholder`, `readonly`, 和 `required`。

## [属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/textarea#属性)

这个元素包含了[全局属性 (en-US)](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes)。

-   [`autocapitalize`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/textarea#autocapitalize) 非标准

    iOS 的非标准属性（运行在 iOS 上的 Safari、Firefox、Chrome 都支持），文本是否自动首字母大写。在 iOS5 和之后的版本上有效。可能的值为：`none`: 禁用首字母大写。`sentences`: 句子的首字母大写。`words`: 单词或者字母的首字母大写。`characters`: 全部字母大写。`on`: 已弃用 自 iOS 5 废弃。`off`: 已弃用 自 iOS 5 废弃。

-   [`autocomplete`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/textarea#autocomplete)

    是否使用浏览器的记忆功能自动填充文本。可能的值有：`off`: 不使用浏览器的记忆自动填充，使用者必须输入他们想要输入的所有内容。或者网页提供了自己的自动填充方法。`on`: 浏览器根据用户之前输入的内容或者习惯，在用户输入的时候给出相应输入提示。如果不指明**autocomplete**属性，浏览器会从父级的表单元素上解析是不是开启这个属性。表单元素可以是 `textarea` 元素的父级[``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/form)或者 `textarea`有跟表单相同的 id（参见下面的 form 属性）。更多请查看[``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/form)的[`autocomplete`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/form#autocomplete) 属性。

-   [`autofocus`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/textarea#autofocus)

    页面加载完毕之后是否自动给本元素添加焦点。只有跟表格关联的才能使本属性生效。

-   [`cols`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/textarea#cols)

    文本域的可视宽度。必须为正数，默认为 20 (HTML5)。

-   [`disabled`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/textarea#disabled)

    禁用文本域。默认为 false。如果未指定，也可以从父级上如[``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/fieldset)继承而来。

-   [`form`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/textarea#form)

    指定跟自身相关联的表单。值必须为本文档内的表单的 ID，如果未指定，就是跟当前所在的表单元素相关联。这就允许你在文档的任意地方放置文本域元素。

-   [`maxlength`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/textarea#maxlength)

    允许用户输入的最大字符长度 (Unicode) 。未指定表示无限长度。

-   [`minlength`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/textarea#minlength)

    允许用户输入的最小字符长度 (Unicode)

-   [`name`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/textarea#name)

    元素的名称。

-   [`placeholder`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/textarea#placeholder)

    向用户提示可以在控件中输入的内容。在渲染提示时，占位符文本中的回车符 (\r) 或换行符 (\n) 一定会被作为行断（换行）处理。**备注：** Placeholders should only be used to show an example of the type of data that should be entered into a form; they are *not* a substitute for a proper [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/label) element tied to the input. See [`` labels](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#标签) for a full explanation.

-   [`readonly`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/textarea#readonly)

    不允许用户修改元素内文本。和 `disabled` 属性不同的是，这个能让用户点击和选择元素内的文本。如果在表单里，这个元素的值还是会跟随表单一起提交。

-   [`required`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/textarea#required)

    提示用户这个元素的内容必填。

-   [`rows`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/textarea#rows)

    元素的输入文本的行数（显示的高度）。

-   [`spellcheck`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/textarea#spellcheck)

    该属性设为 true 时，表明该元素会做拼写和语法检查。属性值为 default 时，表明元素有默认行为，可能会基于父元素的 spellcheck 值。属性值为 false 时，表明元素不做拼写和语法检查。

-   [`wrap`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/textarea#wrap)

    指定文本换行的方式。默认为 soft。可能的值为：hard: 在文本到达元素最大宽度的时候，浏览器自动插入换行符 (CR+LF) 。比如指定 `cols`值。soft: 在到达元素最大宽度的时候，不会自动插入换行符。

## [使用 CSS 样式](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/textarea#使用_css_样式)

`<textarea>` 是 [可被替换的元素 (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/Replaced_element)——其有自己的固有尺寸，像。默认情况下，其 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 值为 `block`。与其他表单元素相比，这个元素相对比较容易设置样式，使用常规的 CSS 就可以轻松设置它的盒模型、字体、颜色方案等。

[Styling HTML forms](https://developer.mozilla.org/zh-CN/docs/Learn/Forms/Styling_web_forms) 这个页面提供了一些关于 `<textarea>` 样式的有用提示。

### [基线不一致](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/textarea#基线不一致)

The HTML specification doesn't define where the baseline of a `<textarea>` is, so different browsers set it to different positions. For Gecko, the `<textarea>` baseline is set on the baseline of the first line of the textarea's first line, on another browser it may be set on the bottom of the `<textarea>` box. Don't use [`vertical-align`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/vertical-align)`: baseline` on it; the behavior is unpredictable.

### [控制文本区是否可调整大小](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/textarea#控制文本区是否可调整大小)

In most browsers, `<textarea>`s are resizable — you'll notice the drag handle in the right hand corner, which can be used to alter the size of the element on the page. This is controlled by the [`resize`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/resize) CSS property — resizing is enabled by default, but you can explicitly disable it using a `resize` value of `none`:

```
textarea {
  resize: none;
}
```

### [在样式中使用有效值和无效值](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/textarea#在样式中使用有效值和无效值)

Valid and invalid values of a `<textarea>` element (e.g. those within, and outside the bounds set by `minlength`, `maxlength`, or `required`) can be highlighted using the [`:valid`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:valid) and [`:invalid`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:invalid) pseudo-classes. For example, to give your textarea a different border depending on whether it is valid or invalid:

```
textarea:invalid {
  border: 2px dashed red;
}

textarea:valid {
  border: 2px solid lime;
}
```

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/textarea#示例)

### [HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/textarea#html)

```
<textarea name="textarea" rows="10" cols="50">Write something here</textarea>
```

<iframe class="sample-code-frame" title="HTML sample" id="frame_html" width="600" height="200" src="https://live.mdnplay.dev/zh-CN/docs/Web/HTML/Element/textarea/runner.html?id=html" loading="lazy" style="box-sizing: content-box; border-top: none; border-right-color: ; border-right-style: ; border-right-width: ; border-bottom-color: ; border-bottom-style: ; border-bottom-width: ; border-left-color: ; border-left-style: ; border-left-width: ; border-image-source: ; border-image-slice: ; border-image-width: ; border-image-outset: ; border-image-repeat: ; max-width: 100%; width: calc((100% - 2rem) - 2px); background: rgb(255, 255, 255); border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: ; border-bottom-left-radius: ; padding: 1rem; margin-top: 0px;"></iframe>

### [基本示例](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/textarea#基本示例)

The following example show a very simple textarea, with a set numbers of rows and columns and some default content.

```
<textarea name="textarea" rows="10" cols="50">Write something here</textarea>
```

<iframe class="sample-code-frame" title="基本示例 sample" id="frame_基本示例" width="600" height="150" src="https://live.mdnplay.dev/zh-CN/docs/Web/HTML/Element/textarea/runner.html?id=%E5%9F%BA%E6%9C%AC%E7%A4%BA%E4%BE%8B" loading="lazy" style="box-sizing: content-box; border-top: none; border-right-color: ; border-right-style: ; border-right-width: ; border-bottom-color: ; border-bottom-style: ; border-bottom-width: ; border-left-color: ; border-left-style: ; border-left-width: ; border-image-source: ; border-image-slice: ; border-image-width: ; border-image-outset: ; border-image-repeat: ; max-width: 100%; width: calc((100% - 2rem) - 2px); background: rgb(255, 255, 255); border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: ; border-bottom-left-radius: ; padding: 1rem; margin-top: 0px;"></iframe>

### [最小和最大长度](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/textarea#最小和最大长度)

This example has a minimum and maximum number of characters — of 10 and 20 respectively. Try it and see.

```
<textarea name="textarea" rows="5" cols="30" minlength="10" maxlength="20">
Write something here</textarea
>
```

<iframe class="sample-code-frame" title="最小和最大长度 sample" id="frame_最小和最大长度" width="600" height="80" src="https://live.mdnplay.dev/zh-CN/docs/Web/HTML/Element/textarea/runner.html?id=%E6%9C%80%E5%B0%8F%E5%92%8C%E6%9C%80%E5%A4%A7%E9%95%BF%E5%BA%A6" loading="lazy" style="box-sizing: content-box; border-top: none; border-right-color: ; border-right-style: ; border-right-width: ; border-bottom-color: ; border-bottom-style: ; border-bottom-width: ; border-left-color: ; border-left-style: ; border-left-width: ; border-image-source: ; border-image-slice: ; border-image-width: ; border-image-outset: ; border-image-repeat: ; max-width: 100%; width: calc((100% - 2rem) - 2px); background: rgb(255, 255, 255); border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: ; border-bottom-left-radius: ; padding: 1rem; margin-top: 0px;"></iframe>

Note that `minlength` doesn't stop the user from removing characters so that the number entered goes past the minimum, but it does make the value entered into the `<textarea>` invalid. Also note that even if you have a `minlength` value set (3, for example), an empty `<textarea>` is still considered valid unless you also have the `required` attribute set.

### [占位符](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/textarea#占位符)

This example has a placeholder set. Notice how it disappears when you start typing into the box.

```
<textarea
  name="textarea"
  rows="5"
  cols="30"
  placeholder="Comment text."></textarea>
```

<iframe class="sample-code-frame" title="占位符 sample" id="frame_占位符" width="600" height="80" src="https://live.mdnplay.dev/zh-CN/docs/Web/HTML/Element/textarea/runner.html?id=%E5%8D%A0%E4%BD%8D%E7%AC%A6" loading="lazy" style="box-sizing: content-box; border-top: none; border-right-color: ; border-right-style: ; border-right-width: ; border-bottom-color: ; border-bottom-style: ; border-bottom-width: ; border-left-color: ; border-left-style: ; border-left-width: ; border-image-source: ; border-image-slice: ; border-image-width: ; border-image-outset: ; border-image-repeat: ; max-width: 100%; width: calc((100% - 2rem) - 2px); background: rgb(255, 255, 255); border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: ; border-bottom-left-radius: ; padding: 1rem; margin-top: 0px;"></iframe>

**备注：** Placeholders should only be used to show an example of the type of data that should be entered into a form; they are *not* a substitute for a proper [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/label) element tied to the input. See [`` labels](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#标签) for a full explanation.

### [禁用和只读](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/textarea#禁用和只读)

This example shows two `<textarea>`s — one of which is `disabled`, and one of which is `readonly`. Have a play with both and you'll see the difference in behavior — the `disabled` element is not selectable in any way (and its value is not submitted), whereas the `readonly` element is selectable and its contents copyable (and its value is submitted); you just can't edit the contents.

**备注：** In browsers other than firefox, such as chrome, the `disabled` textarea content may be selectable and copyable.

```
<textarea name="textarea" rows="5" cols="30" disabled>
I am a disabled textarea</textarea
>
<textarea name="textarea" rows="5" cols="30" readonly>
I am a readonly textarea</textarea
>
```

<iframe class="sample-code-frame" title="禁用和只读 sample" id="frame_禁用和只读" width="600" height="80" src="https://live.mdnplay.dev/zh-CN/docs/Web/HTML/Element/textarea/runner.html?id=%E7%A6%81%E7%94%A8%E5%92%8C%E5%8F%AA%E8%AF%BB" loading="lazy" style="box-sizing: content-box; border-top: none; border-right-color: ; border-right-style: ; border-right-width: ; border-bottom-color: ; border-bottom-style: ; border-bottom-width: ; border-left-color: ; border-left-style: ; border-left-width: ; border-image-source: ; border-image-slice: ; border-image-width: ; border-image-outset: ; border-image-repeat: ; max-width: 100%; width: calc((100% - 2rem) - 2px); background: rgb(255, 255, 255); border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: ; border-bottom-left-radius: ; padding: 1rem; margin-top: 0px;"></iframe>