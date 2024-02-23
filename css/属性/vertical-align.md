# vertical-align

[CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) 的属性 **`vertical-align`** 用来指定行内元素（inline）或表格单元格（table-cell）元素的垂直对齐方式。

## 尝试一下

<iframe class="interactive is-default-height" height="200" src="https://interactive-examples.mdn.mozilla.net/pages/css/vertical-align.html" title="MDN Web Docs Interactive Example" loading="lazy" data-readystate="complete" style="box-sizing: border-box; border: none; max-width: 100%; width: 765.703px; background-color: var(--background-secondary); border-radius: var(--elem-radius); color: var(--text-primary); height: 375px; margin: 1rem 0px; padding: 0px;"></iframe>

vertical-align 属性可被用于两种环境：

-   使行内元素盒模型与其行内元素容器垂直对齐。例如，用于垂直对齐一行文本内的图片[``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img)：
-   垂直对齐表格单元内容。

注意 `vertical-align` 只对行内元素、行内块元素和表格单元格元素生效：不能用它垂直对齐[块级元素](https://developer.mozilla.org/zh-CN/docs/Glossary/Block-level_content)。

## 语法

```css
/* Keyword values */
vertical-align: baseline;
vertical-align: sub;
vertical-align: super;
vertical-align: text-top;
vertical-align: text-bottom;
vertical-align: middle;
vertical-align: top;
vertical-align: bottom;

/* <length> values */
vertical-align: 10em;
vertical-align: 4px;

/* <percentage> values */
vertical-align: 20%;

/* Global values */
vertical-align: inherit;
vertical-align: initial;
vertical-align: unset;
```

`vertical-align` 属性指定为下面列出的值之一。

### 行内元素的值

#### 相对父元素的值

这些值使元素相对其父元素垂直对齐：

-   [`baseline`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/vertical-align#baseline)

    使元素的基线与父元素的基线对齐。HTML 规范没有详细说明部分[可替换元素](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Replaced_element)的基线，如[``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/textarea) ，这意味着这些元素使用此值的表现因浏览器而异。

-   [`sub`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/vertical-align#sub)

    使元素的基线与父元素的下标基线对齐。

-   [`super`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/vertical-align#super)

    使元素的基线与父元素的上标基线对齐。

-   [`text-top`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/vertical-align#text-top)

    使元素的顶部与父元素的字体顶部对齐。

-   [`text-bottom`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/vertical-align#text-bottom)

    使元素的底部与父元素的字体底部对齐。

-   [`middle`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/vertical-align#middle)

    使元素的中部与父元素的基线加上父元素 x-height（译注：[x 高度](https://www.zhangxinxu.com/wordpress/2015/06/about-letter-x-of-css/)）的一半对齐。

-   [``](https://developer.mozilla.org/zh-CN/docs/Web/CSS/length)

    使元素的基线对齐到父元素的基线之上的给定长度。可以是负数。

-   [``](https://developer.mozilla.org/zh-CN/docs/Web/CSS/percentage)

    使元素的基线对齐到父元素的基线之上的给定百分比，该百分比是[`line-height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/line-height)属性的百分比。可以是负数。

#### 相对行的值

下列值使元素相对整行垂直对齐：

-   [`top`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/vertical-align#top)

    使元素及其后代元素的顶部与整行的顶部对齐。

-   [`bottom`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/vertical-align#bottom)

    使元素及其后代元素的底部与整行的底部对齐。

没有基线的元素，使用外边距的下边缘替代。

### 表格单元格的值

-   [`baseline`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/vertical-align#baseline_2) (以及 `sub`, `super`, `text-top`, `text-bottom`, `<length>`, `<percentage>`)

    使单元格的基线，与该行中所有以基线对齐的其他单元格的基线对齐。

-   [`top`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/vertical-align#top_2)

    使单元格内边距的上边缘与该行顶部对齐。

-   [`middle`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/vertical-align#middle_2)

    使单元格内边距盒模型在该行内居中对齐。

-   [`bottom`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/vertical-align#bottom_2)

    使单元格内边距的下边缘与该行底部对齐。

可以是负数。

### 形式语法

```
vertical-align = 
  [ first | last ]        ||
  <'alignment-baseline'>  ||
  <'baseline-shift'>      
```

## 示例

### HTML

```html
<div>
  An <img src="frame_image.svg" alt="link" width="32" height="32" /> image with
  a default alignment.
</div>
<div>
  An
  <img class="top" src="frame_image.svg" alt="link" width="32" height="32" />
  image with a text-top alignment.
</div>
<div>
  An
  <img class="bottom" src="frame_image.svg" alt="link" width="32" height="32" />
  image with a text-bottom alignment.
</div>
<div>
  An
  <img class="middle" src="frame_image.svg" alt="link" width="32" height="32" />
  image with a middle alignment.
</div>
```

### CSS

```css
img.top {
  vertical-align: text-top;
}
img.bottom {
  vertical-align: text-bottom;
}
img.middle {
  vertical-align: middle;
}
```