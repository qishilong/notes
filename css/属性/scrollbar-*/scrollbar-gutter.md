# scrollbar-gutter

`scrollbar-gutter` CSS属性允许作者为滚动条保留空间，防止不必要的布局随着内容的增长而变化，同时也避免在不需要滚动时不必要的视觉效果。

元素的滚动条边线是内部边框边缘和外部填充边缘之间的空间，浏览器可以在其中显示滚动条。如果不存在滚动条，则将gutter绘制为填充的扩展。

浏览器确定是否使用经典滚动条或覆盖滚动条:

-   经典滚动条总是放在一个排水沟，消耗空间时存在。
-   覆盖滚动条放置在内容上，而不是在装订线中，并且通常是部分透明的。

## 语法

```css
/* Initial value */
scrollbar-gutter: auto;

/* "stable" keyword, with optional modifier */
scrollbar-gutter: stable;
scrollbar-gutter: stable both-edges;

/* Global values */
scrollbar-gutter: inherit;
scrollbar-gutter: initial;
scrollbar-gutter: revert;
scrollbar-gutter: revert-layer;
scrollbar-gutter: unset;
```

### 数值

-   [`auto`](https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-gutter#auto)

    初始值。当 `overflow` 为 `scroll` 时，或者当 `overflow` 为 `auto` 且框溢出时，经典滚动条会创建一个装订线。覆盖滚动条不消耗空间。

-   [`stable`](https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-gutter#stable)

    使用经典滚动条时，如果 `overflow` 为 `auto` 、 `scroll` 或 `hidden` ，则即使框未溢出，也会出现装订线。使用覆盖滚动条时，将不存在装订线。

-   [`both-edges`](https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-gutter#both-edges)

    如果装订线将出现在框的一个内联开始/结束边缘上，则另一个装订线也将出现在相对的边缘上。

## 正式定义

| [ 初始值](https://developer.mozilla.org/en-US/docs/Web/CSS/initial_value) | `auto` |
| :----------------------------------------------------------- | ------ |
| 适用于                                                       | 滚动框 |
| [ 继承](https://developer.mozilla.org/en-US/docs/Web/CSS/Inheritance) | no     |
| [ 计算值](https://developer.mozilla.org/en-US/docs/Web/CSS/computed_value) | 按规定 |
| 动画类型                                                     | 离散   |

## 形式语法

```
scrollbar-gutter = 
  auto                   |
  stable && both-edges?  
```

## 示例

下面的示例显示了 `scrollbar-gutter` 属性的不同值如何影响其中包含一个或多个段落的可滚动 `div` 元素 ( `.container` )。

注意: 在示例的图像中，用户的系统设置设置为经典滚动条 (始终显示)。

### 示例1

防止不必要的布局更改，因为内容的增长或收缩会导致滚动条出现/消失，为其保留一个空间。

```css
.container {
  scrollbar-gutter: stable;r
}
```

![A containing div element with a paragraph of text inside and a space to the right where the scrollbar is](https://qiniucloud.qishilong.space/images/stable-no-scroll.png)

### 示例2

在框的两侧添加对称间距，使内容居中:

```css
.container {
  scrollbar-gutter: stable both-edges;
}
```

![A containing div element with a paragraph of text inside, a space to the right where the scrollbar is and a matching empty space to the left](https://qiniucloud.qishilong.space/images/stable-both-edges.png)

### 示例3

对齐非滚动元素的内容和与之相邻的滚动元素: 此示例并排显示两个div。左边的一个没有滚动，但右边的一个。两者都应用了 `scrollbar-gutter` ，这也为左侧没有可滚动内容的div保留了空间。这是一种很好的技术，可以用来保持内容的宽度一致。

```css
.container1 {
  overflow: hidden;
  scrollbar-gutter: stable;
}

.container2 {
  scrollbar-gutter: stable;
}
```

![Two adjacent divs containing text, both with space for a scrollbar](https://qiniucloud.qishilong.space/images/side-by-side.png)

### 覆盖滚动条

作为参考，此图像显示与上述相同的div，但用户的系统设置设置为覆盖滚动条。注意这里的滚动条将只显示当用户滚动和顶部的内容，所以没有空间为它保留和 `scrollbar-gutter` 属性没有效果。

![One div with text, no visible scrollbar](https://qiniucloud.qishilong.space/images/for-ref-no-scroll.png)