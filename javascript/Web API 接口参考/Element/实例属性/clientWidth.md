# Element.clientWidth

>   注意：这个属性获取的视口宽度不是实时的

只读属性 **`Element.clientWidth`** 对于内联元素以及没有 CSS 样式的元素为 0；否则，它是元素内部的宽度（以像素为单位）。该属性包括内边距（padding），但不包括边框（border）、外边距（margin）和垂直滚动条（如果存在）。

在根元素（`<html>` 元素）或怪异模式下的 `<body>` 元素上使用 `clientWidth` 时，该属性将返回视口宽度（不包含任何滚动条）。[这是一个 `clientWidth` 的特例](https://www.w3.org/TR/2016/WD-cssom-view-1-20160317/#dom-element-clientwidth)。

**备注：** 该属性值会被四舍五入为一个整数。如果你需要一个小数值，可使用 [`element.getBoundingClientRect()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)。

## [值](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/clientWidth#值)

一个数字。

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/clientWidth#示例)

![img](https://images-1305186932.cos.ap-beijing.myqcloud.com/images/202306141136177.png)
