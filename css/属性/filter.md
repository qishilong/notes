# filter

[CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) **`filter`** 属性将模糊或颜色偏移等图形效果应用于元素。滤镜通常用于调整图像、背景和边框的渲染。

有几个[函数](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter#函数)（例如 `blur()` 和 `contrast()`）可以帮助你实现预定义的效果。

## 尝试一下

<iframe class="interactive is-default-height" height="200" src="https://interactive-examples.mdn.mozilla.net/pages/css/filter.html" title="MDN Web Docs Interactive Example" loading="lazy" data-readystate="complete" style="box-sizing: border-box; border: none; max-width: 100%; width: 765.703px; background-color: var(--background-secondary); border-radius: var(--elem-radius); color: var(--text-primary); height: 375px; margin: 1rem 0px; padding: 0px;"></iframe>

## 语法

```css
/* <filter-function> 值 */
filter: blur(5px);
filter: brightness(0.4);
filter: contrast(200%);
filter: drop-shadow(16px 16px 20px blue);
filter: grayscale(50%);
filter: hue-rotate(90deg);
filter: invert(75%);
filter: opacity(25%);
filter: saturate(30%);
filter: sepia(60%);

/* URL */
filter: url("filters.svg#filter-id");

/* 多个滤镜 */
filter: contrast(175%) brightness(3%);
filter: drop-shadow(3px 3px red) sepia(100%) drop-shadow(-3px -3px blue);

/* 不使用滤镜 */
filter: none;

/* 全局值 */
filter: inherit;
filter: initial;
filter: revert;
filter: revert-layer;
filter: unset;
```

可以使用如下方法设置函数：

```css
filter: <filter-function> [<filter-function>]* | none;
```

你可以使用 `url()` 来引用 [SVG 滤镜元素](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/filter)。可以使用如下语法引用 SVG [``](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/filter) 元素：

```css
filter: url(file.svg#filter-element-id);
```

## 函数

`filter` 属性可设置为 `none` 或下面列出的一个或多个函数。如果任何函数的参数无效，则该函数返回 `none`。除特殊说明外，函数的值如果接受百分比值（如 `34%`），那么该函数也接受小数值（如 `0.34`）。

当单个 `filter` 属性具有多个函数时，滤镜将按顺序依次应用。

-   [`blur()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter-function/blur)

    将高斯模糊应用于输入图像。CSSCopy to Clipboard`filter: blur(5px); `

-   [`brightness()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter-function/brightness)

    将线性乘法器应用于输入图像，以调整其亮度。值为 `0%` 将创建全黑图像；值为 `100%` 会使输入保持不变，其他值是该效果的线性乘数。如果值大于 `100%` 将使图像更加明亮。CSSCopy to Clipboard`filter: brightness(2); `

-   [`contrast()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter-function/contrast)

    调整输入图像的对比度。值是 `0%` 将使图像变灰；值是 `100%`，则无影响；若值超过 `100%` 将增强对比度。CSSCopy to Clipboard`filter: contrast(200%); `

-   [`drop-shadow()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter-function/drop-shadow)

    使用 `<shadow>` 参数沿图像的轮廓生成阴影效果。阴影语法类似于 `<box-shadow>`（在 [CSS 背景和边框模块](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_backgrounds_and_borders)中定义），但不允许使用 `inset` 关键字以及 `spread` 参数。与所有 `filter` 属性值一样，任何在 `drop-shadow()` 后的滤镜同样会应用在阴影上。CSSCopy to Clipboard`filter: drop-shadow(16px 16px 10px black); `

-   [`grayscale()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter-function/grayscale)

    将图像转换为灰度图。值为 `100%` 则完全转为灰度图像，若为初始值 `0%` 则图像无变化。值在 `0%` 到 `100%` 之间，则是该效果的线性乘数。CSSCopy to Clipboard`filter: grayscale(100%); `

-   [`hue-rotate()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/hue-rotate)

    应用色相旋转。`<angle>` 值设定图像会被调整的色环角度值。值为 `0deg`，则图像无变化。CSSCopy to Clipboard`filter: hue-rotate(90deg); `

-   [`invert()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/invert)

    反转输入图像。值为 `100%` 则图像完全反转，值为 `0%` 则图像无变化。值在 `0%` 和 `100%` 之间，则是该效果的线性乘数。CSSCopy to Clipboard`filter: invert(100%); `

-   [`opacity()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter-function/opacity)

    应用透明度。值为 `0%` 则使图像完全透明，值为 `100%` 则图像无变化。CSSCopy to Clipboard`filter: opacity(50%); `

-   [`saturate()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/saturate)

    改变图像饱和度。值为 `0%` 则是完全不饱和，值为 `100%` 则图像无变化。超过 `100%` 则增加饱和度。CSSCopy to Clipboard`filter: saturate(200%); `

-   [`sepia()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/sepia)

    将图像转换为深褐色。值为 `100%` 则完全是深褐色的，值为 `0%` 图像无变化。CSSCopy to Clipboard`filter: sepia(100%); `

## 组合函数

你可以组合任意数量的函数来控制渲染。滤镜将按声明顺序依次应用。以下示例增强了图像的对比度和亮度。

```css
filter: contrast(175%) brightness(103%);
```

### 插值

在进行动画处理时，如果起始和结束滤镜都有一个不含 [`url()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/url) 的相同长度的函数列表，则会根据其指定的规则对其每个滤镜函数进行[插值 (en-US)](https://developer.mozilla.org/en-US/docs/Glossary/Interpolation)。

如果它们的长度不同，较长列表中缺少的等效滤镜函数将以其初始的、未被滤镜修改的值为参数被添加到较短列表的尾部，然后所有的滤镜函数根据其指定的规则插值。否则，将使用离散插值。

## 形式定义

| [初始值](https://developer.mozilla.org/zh-CN/docs/Web/CSS/initial_value) | `none`                                                       |
| :----------------------------------------------------------- | ------------------------------------------------------------ |
| 适用元素                                                     | all elements; In SVG, it applies to container elements excluding the [`defs`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/defs) element and all graphics elements |
| [是否是继承属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Inheritance) | 否                                                           |
| [计算值](https://developer.mozilla.org/zh-CN/docs/Web/CSS/computed_value) | as specified                                                 |
| Animation type                                               | a [filter function list](https://developer.mozilla.org/en-US/docs/Web/CSS/filter#interpolation) |

## 形式语法

```
filter = 
  none                 |
  <filter-value-list>  

<filter-value-list> = 
  [ <filter-function> | <url> ]+  

<filter-function> = 
  <blur()>         |
  <brightness()>   |
  <contrast()>     |
  <drop-shadow()>  |
  <grayscale()>    |
  <hue-rotate()>   |
  <invert()>       |
  <opacity()>      |
  <sepia()>        |
  <saturate()>     

<url> = 
  <url()>  |
  <src()>  

<blur()> = 
  blur( <length>? )  

<brightness()> = 
  brightness( [ <number> | <percentage> ]? )  

<contrast()> = 
  contrast( [ <number> | <percentage> ]? )  

<drop-shadow()> = 
  drop-shadow( [ <color>? && <length>{2,3} ] )  

<grayscale()> = 
  grayscale( [ <number> | <percentage> ]? )  

<hue-rotate()> = 
  hue-rotate( [ <angle> | <zero> ]? )  

<invert()> = 
  invert( [ <number> | <percentage> ]? )  

<opacity()> = 
  opacity( [ <number> | <percentage> ]? )  

<sepia()> = 
  sepia( [ <number> | <percentage> ]? )  

<saturate()> = 
  saturate( [ <number> | <percentage> ]? )  

<url()> = 
  url( <string> <url-modifier>* )  |
  <url-token>                      

<src()> = 
  src( <string> <url-modifier>* )  
```

## 示例

### 应用 filter 函数

`filter` 属性被应用于第二张图片，为其本身以及边框添加灰度和模糊效果。

```css
img {
  border: 5px solid yellow;
}
/* 为第二张图像应用 40% 灰度并以 5px 进行模糊 */
img:nth-of-type(2) {
  filter: grayscale(0.4) blur(5px);
}
```

```html
<img src="pencil.jpg" alt="原图清晰" />
<img src="pencil.jpg" alt="该图像及其边框被应用了模糊和灰度效果" />
```

![image-20240223124030435](https://qiniucloud.qishilong.space/images/image-20240223124030435.png)

### 重复滤镜函数

滤镜函数按出现顺序应用。可以重复相同的滤镜函数。

```css
#MDN-logo {
  border: 1px solid blue;
  filter: drop-shadow(5px 5px 0 red) hue-rotate(180deg) drop-shadow(5px 5px 0
        red);
}
```

![image-20240223124004089](https://qiniucloud.qishilong.space/images/image-20240223124004089.png)

滤镜函数按顺序应用。这就是阴影颜色不同的原因：第一个阴影的色调被 `hue-rotate()` 函数改变，而第二个阴影的色调没有被改变。