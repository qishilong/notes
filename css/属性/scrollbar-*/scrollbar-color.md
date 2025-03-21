# scrollbar-color

**实验性:** **这是一项[实验性技术](https://developer.mozilla.org/zh-CN/docs/MDN/Writing_guidelines/Experimental_deprecated_obsolete#实验性)**
在将其用于生产之前，请仔细检查[浏览器兼容性表格](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scrollbar-color#浏览器兼容性)。

**`scrollbar-color`**该[CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS)属性设置滚动条轨道和拇指的颜色

**track（轨道）**是指滚动条，其一般是固定的而不管滚动位置的背景。

**thumb**（**拇指**）是指滚动条通常漂浮在轨道的顶部上的移动部分。

| [初始值](https://developer.mozilla.org/zh-CN/docs/Web/CSS/initial_value) | `auto`                 |
| :----------------------------------------------------------- | ---------------------- |
| 适用元素                                                     | scrolling boxes        |
| [是否是继承属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Inheritance) | yes                    |
| [计算值](https://developer.mozilla.org/zh-CN/docs/Web/CSS/computed_value) | as specified           |
| Animation type                                               | by computed value type |

## 语法

```css
/* Keyword values */
scrollbar-color: auto;
scrollbar-color: dark;
scrollbar-color: light;

/* <color> values */
scrollbar-color: rebeccapurple green; /* Two valid colors.
The first applies to the thumb of the scrollbar, the second to the track. */

/* Global values */
scrollbar-color: inherit;
scrollbar-color: initial;
scrollbar-color: unset;
```

### 值

-   [``](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scrollbar-color#scrollbar-color)

    定义滚动条的颜色。值描述`auto`在没有任何其他相关滚动条颜色属性的情况下，滚动条的轨道部分默认平台渲染。`dark`显示黑色滚动条，可以是平台提供的滚动条的深色变体，也可以是带深色的自定义滚动条。`light`显示一个轻量滚动条，可以是平台提供的滚动条的轻微变体，也可以是带有浅色的自定义滚动条。`<color> <color>`将第一种颜色应用于滚动条拇指，第二种颜色应用于滚动条轨道。**备注：** 用户代理必须将`scrollbar-color`根元素上设置的任何值应用于视口。

### 形式语法

```
scrollbar-color = 
  auto        |
  <color>{2}  
```

## 示例

### CSS

```css
.scroller {
  width: 300px;
  height: 100px;
  overflow-y: scroll;
  scrollbar-color: rebeccapurple green;
}
```

### HTML

```html
<div class="scroller">
  Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion
  daikon amaranth tatsoi tomatillo melon azuki bean garlic. Gumbo beet greens
  corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts
  fava bean collard greens dandelion okra wakame tomato. Dandelion cucumber
  earthnut pea peanut soko zucchini.
</div>
```

### 结果

![image-20240223124402841](https://qiniucloud.qishilong.space/images/image-20240223124402841.png)

## 无障碍问题

使用`scrollbar-color`具有特定颜色值的属性时，作者应确保指定的颜色在它们之间具有足够的对比度。对于关键字值，UA 应确保其使用的颜色具有足够的对比度。参见[WCAG 2.0 的技术：G183：使用 3:1 的对比度](https://www.w3.org/TR/WCAG20-TECHS/G183.html)。