# scrollbar-width

**`scrollbar-width`** 属性允许开发者在元素显示滚动条时设置滚动条的最大宽度。

## 语法

```css
/* 关键字值 */
scrollbar-width: auto;
scrollbar-width: thin;
scrollbar-width: none;

/* 全局值 */
scrollbar-width: inherit;
scrollbar-width: initial;
scrollbar-width: revert;
scrollbar-width: revert-layer;
scrollbar-width: unset;
```

### 取值

-   [**](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scrollbar-width#scrollbar-width)

    将滚动条的宽度定义为数值宽度或者预定义宽度，当被定义为预定义宽度时，则必须为下列值之一：`auto`系统默认的滚动条宽度。`thin`系统提供的瘦滚动条宽度，或者比默认滚动条宽度更窄的宽度。`none`不显示滚动条，但是该元素依然可以滚动。**备注：** 用户代理必须将应用于根元素的任何 `scrollbar-width` 值应用于视口。

## 无障碍考虑

请注意使用此属性时需谨慎。如果开发者未提供替代的滚动机制，将 `scrollbar-width` 设置为 `thin` 或 `none` 可能会使内容难以或无法滚动。虽然在这种情况下，滑动手势或鼠标滚轮可以启用滚动，但某些设备没有滚动替代方案。

WCAG 标准 2.1.1（键盘）已经存在很长时间，以便为基本键盘可访问性提供建议，并且这应该包括内容区域的滚动。在 WCAG 2.1 中引入的标准 2.5.5（目标大小）建议触摸目标的宽度和高度至少为 44 像素（尽管在高分辨率屏幕上这个问题会更严重，建议进行全面测试）。

-   [MDN 理解 WCAG，指南 2.1 解释 (en-US)](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG/Operable)
-   [MDN 理解 WCAG，指南 2.5 解释 (en-US)](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG/Operable)
-   [理解成功标准 2.1.1 | W3C 理解 WCAG 2.1](https://www.w3.org/WAI/WCAG21/Understanding/keyboard)
-   [理解成功标准 2.5.5 | W3C 理解 WCAG 2.1](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html)

## 形式定义

| [初始值](https://developer.mozilla.org/zh-CN/docs/Web/CSS/initial_value) | `auto`                 |
| :----------------------------------------------------------- | ---------------------- |
| 适用元素                                                     | scrolling boxes        |
| [是否是继承属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Inheritance) | 否                     |
| [计算值](https://developer.mozilla.org/zh-CN/docs/Web/CSS/computed_value) | as specified           |
| Animation type                                               | by computed value type |

## 形式语法

```
scrollbar-width = 
  auto  |
  thin  |
  none  
```

## 示例

### 调整溢出滚动条的大小

#### CSS

```css
.scroller {
  width: 300px;
  height: 100px;
  overflow-y: scroll;
  scrollbar-width: thin;
}
```

#### HTML

```html
<div class="scroller">
  Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion
  daikon amaranth tatsoi tomatillo melon azuki bean garlic. Gumbo beet greens
  corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts
  fava bean collard greens dandelion okra wakame tomato. Dandelion cucumber
  earthnut pea peanut soko zucchini.
</div>
```

#### 结果

![image-20240223124253719](https://qiniucloud.qishilong.space/images/image-20240223124253719.png)