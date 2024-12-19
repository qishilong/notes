# white-space

**`white-space`** [CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) 属性用于设置如何处理元素内的[空白字符](https://developer.mozilla.org/zh-CN/docs/Glossary/Whitespace)。

## 尝试一下

<iframe class="interactive is-default-height" height="200" src="https://interactive-examples.mdn.mozilla.net/pages/css/white-space.html" title="MDN Web Docs Interactive Example" allow="clipboard-write" loading="lazy" data-readystate="complete" style="box-sizing: border-box; border: none; max-width: 100%; width: 765.703px; background-color: var(--background-secondary); border-radius: var(--elem-radius); color: var(--text-primary); height: 375px; margin: 1rem 0px; padding: 0px;"></iframe>

这个属性指定了两件事：

- 空白字符是否[合并](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space#合并空白字符)，以及如何合并。
- 是否换行，以及如何换行。

**备注：** 要使单词可以在*其内部*被截断，请使用 [`overflow-wrap`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow-wrap)、[`word-break`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/word-break) 或 [`hyphens`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/hyphens) 代替。

## 语法

```
/* 单个关键字值 */
white-space: normal;
white-space: nowrap;
white-space: pre;
white-space: pre-wrap;
white-space: pre-line;
white-space: break-spaces;

/* white-space-collapse 和 text-wrap 简写值 */
white-space: collapse balance;
white-space: preserve nowrap;

/* 全局值 */
white-space: inherit;
white-space: initial;
white-space: revert;
white-space: revert-layer;
white-space: unset;
```

### 值

`white-space` 属性可以被指定为从下面的值列表中选择的单个关键字，或者是表示 [`white-space-collapse`](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space-collapse) 和 [`text-wrap`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap) 属性的简写的两个值。

- [`normal`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space#normal)

  连续的空白符会被[合并](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space#合并空白字符)。源码中的换行符会被当作空白符来处理。并根据填充行框盒子的需要来换行。

- [`nowrap`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space#nowrap)

  和 `normal` 一样[合并](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space#合并空白字符)空白符，但阻止源码中的文本换行。

- [`pre`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space#pre)

  连续的空白符会被保留。仅在遇到换行符或 [` `](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/br) 元素时才会换行。

- [`pre-wrap`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space#pre-wrap)

  连续的空白符会被保留。在遇到换行符或 [` `](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/br) 元素时，或者根据填充行框盒子的需要换行。

- [`pre-line`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space#pre-line)

  连续的空白符会被[合并](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space#合并空白字符)。在遇到换行符或 [` `](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/br) 元素时，或者根据填充行框盒子的需要换行。

- [`break-spaces`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space#break-spaces)

  与 `pre-wrap` 的行为相同，除了：任何保留的空白序列总是占用空间，包括行末的。每个保留的空白字符后（包括空白字符之间）都可以被截断。这样保留的空间占用空间而不会挂起，从而影响盒子的固有尺寸（[`min-content`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/min-content) 尺寸和 [`max-content`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/max-content) 尺寸）。

下面的表格总结了各种 `white-space` 关键字值的行为：

|                | 换行符 | 空格和制表符 | 文本换行 | 行末空格 | 行末的其他空白分隔符 |
| :------------- | :----- | :----------- | :------- | :------- | :------------------- |
| `normal`       | 合并   | 合并         | 换行     | 移除     | 挂起                 |
| `nowrap`       | 合并   | 合并         | 不换行   | 移除     | 挂起                 |
| `pre`          | 保留   | 保留         | 不换行   | 保留     | 不换行               |
| `pre-wrap`     | 保留   | 保留         | 换行     | 挂起     | 挂起                 |
| `pre-line`     | 保留   | 合并         | 换行     | 移除     | 挂起                 |
| `break-spaces` | 保留   | 保留         | 换行     | 换行     | 换行                 |

默认情况下，一个制表符等于 8 个空格，且可以使用 [`tab-size`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/tab-size) 属性。对于 `normal`、`nowrap` 和 `pre-line` 值，每个制表符都会被转化为一个空格（U+0020）字符。

**备注：** **空格**和**其他空白分隔符**之间存在区别。定义如下：

- [空格](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space#空格)

  空格（U+0020）、制表符（U+0009）和分段符（例如换行）

- [其他空白分隔符](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space#其他空白分隔符)

  Unicode 中定义的所有其他空格分隔符（已定义为空格的分隔符除外）。

如果空白字符被*挂起*，那么它可能会影响框的固有尺寸的测量结果。

## 合并空白字符

[`white-space-collapse`](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space-collapse) 属性的页面解释了[浏览器合并空白字符的算法](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space-collapse#合并空白字符)。

## 形式定义

| [初始值](https://developer.mozilla.org/zh-CN/docs/Web/CSS/initial_value) | `normal`     |
| :----------------------------------------------------------- | ------------ |
| 适用元素                                                     | 所有元素     |
| [是否是继承属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Inheritance) | 是           |
| [计算值](https://developer.mozilla.org/zh-CN/docs/Web/CSS/computed_value) | as specified |
| [动画类型](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_animated_properties) | 离散值       |

## 形式语法

```
white-space = 
  normal        |
  pre           |
  nowrap        |
  pre-wrap      |
  break-spaces  |
  pre-line      
```

## 示例

### 基础示例

```
code {
  white-space: pre;
}
```

###  元素内的换行

```
pre {
  white-space: pre-wrap;
}
```

### 试试看

<iframe class="sample-code-frame" title="试试看 sample" id="frame_试试看" width="100%" height="450" src="https://c29fe856841f622c47e54fa09a859fd3cac700cd.mdnplay.dev/zh-CN/docs/Web/CSS/white-space/runner.html?state=fVTLbhs5EPyVBvfiANKM89g9TGRfktyCxQJGsJe5tMiW1AnJpsmmLMfwvy%2BoGSVysvaFmOlHVXXx8WBsKWYw3VoO8DBGgDt2uhvg7Z%2BX6fC%2BBRI6x3E7wOu%2FjpHHMY7xD1vK0oqjqWmN9ts2S41uacVLHiBv1xdv3lwu4LS8OoJtJOqy8Hf6ATfHNhjY3w8QJEpJaOl3pkKerE6ET3o47iizvj%2BT%2F%2Fry8kxsplK9lhe1vm0y52XSKnvKGy93y8MAxWbxfmLYsdLyqHGAKDmg%2F220dydyszA7Dd4MZuV4D%2ByuRnMaaDRgPZZyNZq1HEZzfXQbHp4wtNhqmvyYB1hJUpZ4PVGv%2Bvn31%2BRdxvRMMmV6PrN8uXHpOT7Xvc6E3ybd5UnJqj%2Bb4HGMq97x%2FnqMPz2Zd%2Bh%2FLVmlmeezZArAqdQArm0dFFbAQLoAK7GQVdKaAR0nLpbjFsizLqCQAydAXEsQN4EphSQZOFp27GpUqAoe15IJSCd8goDbiICebyt28EWBIgdAB4Hbx54iY1hMiLeVC0QpmqsDOlC2rNg8gOo9BisTfCviwo3uiMsJ6ACEYCUEcTKBHee5ragdfGy4WJWAc800j84RMqVMO4qunf4W2IuvSVEJ9m1woFJohmPvT64RUIVN3TIqxCYNEmZGrbmDTwdLSak2a6OCWItkUcHWxA4VdYKLEiFlYUex2dvc4wi2%2BoTNBpDNhi0jOCqUWzaIb4KwmcYOqMxe19BNB6Tt8elYmIX52h6l5oGerv0VOLE1UNTutlK%2BvzmGJV%2BM5tcnYjTtAk%2Fdp6v%2FUvupJk2NE0iHzn3aU9TPXJQitUq7w7il0Szggl7B1fX0oMztXdF7T10h%2FSdLoqz3F6M5u8qtjTrFvCXt9ugrNbLHtpiFKdmawfTfd8sPf%2FdObOn%2FpXX%2F4eamP4PozeN%2F" data-live-path="/zh-CN/docs/Web/CSS/white-space/" data-live-id="试试看" sandbox="allow-same-origin allow-scripts" loading="lazy" style="box-sizing: initial; border-top: none; border-right-color: ; border-right-style: ; border-right-width: ; border-bottom-color: ; border-bottom-style: ; border-bottom-width: ; border-left-color: ; border-left-style: ; border-left-width: ; border-image-source: ; border-image-slice: ; border-image-width: ; border-image-outset: ; border-image-repeat: ; max-width: 100%; width: calc(100% - 2px - 2rem); background: rgb(255, 255, 255); border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: ; border-bottom-left-radius: ; padding: 1rem; margin-top: 0px;"></iframe>

### 控制表格中的换行

#### HTML

```
<table>
  <tr>
    <td></td>
    <td>拆分后非常长的内容</td>
    <td class="nw">未拆分非常长的内容</td>
  </tr>
  <tr>
    <td class="nw">white-space:</td>
    <td>normal</td>
    <td>nowrap</td>
  </tr>
</table>
```

#### CSS

```
table {
  border-collapse: collapse;
  border: solid black 1px;
  width: 250px;
  height: 150px;
}
td {
  border: solid 1px black;
  text-align: center;
}
.nw {
  white-space: nowrap;
}
```

#### 结果

<iframe class="sample-code-frame" title="控制表格中的换行 sample" id="frame_控制表格中的换行" width="100%" height="100%" src="https://718f838c04b55410a36ac2968ab7720b4a20a1fe.mdnplay.dev/zh-CN/docs/Web/CSS/white-space/runner.html?state=fVE9T8MwEP0r1s0JJkgsJmTpztKBJYtjW03AtSPbUiKqbhAhISEWFgT8AAbmMvFrUtR%2FUeVLJEVi8vndvffu6VbArAUCjiZSoFWsEEq04cL4TEtJcysIGqqz3y5BVsuMo0RSdo2CvGx7RcZdStDJ6XEPpCJbpI6goEfWsXJ87DLoBHnZabU0J0rnU5ktFEFMKCdMxz1SRUcu0swJ3%2BaUCYKULgzNuwnwIHVLCQTCNlHUTIfOtG9T8SjEjo%2B%2B24eqvq%2Fqp8fd23u92eyev39ebuvqrv78mk4iJqm15zGoIoZo%2B%2FrRMf%2Bhhbg3niww1RknOdhMabOk8g%2FYhD20CPGQFjy4au4JHljDgAC%2BSf3ZBeaaWXwpEjybz%2FHIFMN6Dw%3D%3D" data-live-path="/zh-CN/docs/Web/CSS/white-space/" data-live-id="控制表格中的换行" sandbox="allow-same-origin allow-scripts" loading="lazy" style="box-sizing: initial; border-top: none; border-right-color: ; border-right-style: ; border-right-width: ; border-bottom-color: ; border-bottom-style: ; border-bottom-width: ; border-left-color: ; border-left-style: ; border-left-width: ; border-image-source: ; border-image-slice: ; border-image-width: ; border-image-outset: ; border-image-repeat: ; max-width: 100%; width: calc(100% - 2px - 2rem); background: rgb(255, 255, 255); border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: ; border-bottom-left-radius: ; padding: 1rem; margin-top: 0px;"></iframe>

### SVG 文本元素的多行文本

`white-space` CSS 属性可用于在 [``](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/text) 元素中创建多行文本，该元素默认情况下不会换行。

#### HTML

`<text>` 元素内部的文本需要拆分成多行以便检测新行。从第二行开始，其余行的空白需要移除。

```
<svg viewBox="0 0 320 150">
  <text y="20" x="10">Here is an English paragraph
that is broken into multiple lines
in the source code so that it can
be more easily read and edited
in a text editor.
  </text>
</svg>
```

#### CSS

```
text {
  white-space: break-spaces;
}
```

#### 结果

<iframe class="sample-code-frame" title="SVG 文本元素的多行文本 sample" id="frame_svg_文本元素的多行文本" width="100%" height="350" src="https://b75b8973c1cdf9d24858f2931378af9f1789ee21.mdnplay.dev/zh-CN/docs/Web/CSS/white-space/runner.html?state=TVCxbsIwFPyV05uhDlRd0sBQVKlTF4YuXhznKTaE58g2AYr498ph6fbe3Xunu7uTTYlqynzNuGsBLs5nXqbRWK7RRjbH55LetTy00IJcPg1UU5OmHpPny0e4bjRVqPC6rrB6qzRti1Izi942mtaVJpSjVeG%2BODJ8ghF8Sj%2F45DCaaPpoRqclO5ML28ZwZIGXHHA6D9mPA2PwwkmLF2THSOEcLcOGrsx4fmZYI1paxilEBpvkhxsimw5GOnDnM3ezhMFssCAhvsyOVUG2WhqVpn47pz2UemhBKVqqSf265e5bdcEm9cOt2u336l9jih5%2F" data-live-path="/zh-CN/docs/Web/CSS/white-space/" data-live-id="svg_文本元素的多行文本" sandbox="allow-same-origin allow-scripts" loading="lazy" style="box-sizing: initial; border-top: none; border-right-color: ; border-right-style: ; border-right-width: ; border-bottom-color: ; border-bottom-style: ; border-bottom-width: ; border-left-color: ; border-left-style: ; border-left-width: ; border-image-source: ; border-image-slice: ; border-image-width: ; border-image-outset: ; border-image-repeat: ; max-width: 100%; width: calc(100% - 2px - 2rem); background: rgb(255, 255, 255); border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: ; border-bottom-left-radius: ; padding: 1rem; margin-top: 0px;"></iframe>