# Element.clientHeight

>   注意：这个属性获取的视口高度不是实时的

只读属性 **`Element.clientHeight`** 对于没有定义 CSS 或者内联布局盒子的元素为 0；否则，它是元素内部的高度（以像素为单位），包含内边距，但不包括边框、外边距和水平滚动条（如果存在）。

`clientHeight` 可以通过 CSS `height` + CSS `padding` - 水平滚动条高度（如果存在）来计算。

在根元素（`<html>` 元素）或怪异模式下的 `<body>` 元素上使用 `clientHeight` 时，该属性将返回视口高度（不包含任何滚动条）。[这是一个 `clientHeight` 的特例](https://www.w3.org/TR/2016/WD-cssom-view-1-20160317/#dom-element-clientheight)。

**备注：** 此属性会将获取的值四舍五入取整数。如果你需要小数结果，请使用 [`element.getBoundingClientRect()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)。

## [值](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/clientHeight#值)

一个数字。

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/clientHeight#示例)

<img src="https://images-1305186932.cos.ap-beijing.myqcloud.com/images/202306141133686.png" alt="img"/>
