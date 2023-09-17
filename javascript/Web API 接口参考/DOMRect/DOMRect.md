# DOMRect

一个 **`DOMRect`** 代表一个矩形。

`DOMRect` 表示的盒子的类型由返回它的方法或属性指定。例如，WebVR API 的 [`VREyeParameters.renderRect` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/VREyeParameters) 指定了头戴式显示器的一只眼睛应该呈现的影像所在的 [canvas](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement) 的视口。

它继承自它的父类，[`DOMRectReadOnly`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMRectReadOnly)。

<img src="https://images-1305186932.cos.ap-beijing.myqcloud.com/images/202306142150179.png" alt="image-20230614215056144"  />

## [构造函数](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMRect#构造函数)

-   [`DOMRect()`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMRect/DOMRect)

    创建一个新的 `DOMRect` 对象。

## [属性](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMRect#属性)

`DOMRect` 从其父类 *[`DOMRectReadOnly`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMRectReadOnly)* 继承属性。不同之处在于它们不再是只读的。

-   [`DOMRectReadOnly.x` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/DOMRectReadOnly/x)

    `DOMRect` 原点的 x 坐标。

-   [`DOMRectReadOnly.y` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/DOMRectReadOnly/y)

    `DOMRect` 原点的 y 坐标。

-   [`DOMRectReadOnly.width` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/DOMRectReadOnly/width)

    `DOMRect` 的宽度。

-   [`DOMRectReadOnly.height` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/DOMRectReadOnly/height)

    `DOMRect` 的高度。

-   [`DOMRectReadOnly.top` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/DOMRectReadOnly/top)

    返回 `DOMRect` 的顶坐标值（与 `y` 具有相同的值，如果 `height` 为负值，则为 `y + height` 的值）。

-   [`DOMRectReadOnly.right` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/DOMRectReadOnly/right)

    返回 `DOMRect` 的右坐标值（与 `x + width` 具有相同的值，如果`width` 为负值，则为 `x` 的值）。

-   [`DOMRectReadOnly.bottom` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/DOMRectReadOnly/bottom)

    返回 `DOMRect` 的底坐标值（与 `y + height` 具有相同的值，如果 `height` 为负值，则为 `y` 的值）。

-   [`DOMRectReadOnly.left` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/DOMRectReadOnly/left)

    返回 `DOMRect` 的左坐标值（与 `x` 具有相同的值，如果 `width` 为负值，则为 `x + width` 的值）。

## [静态方法](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMRect#静态方法)

-   [`DOMRectReadOnly.fromRect()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/DOMRectReadOnly/fromRect_static)

    创建一个具有指定位置和尺寸的新 `DOMRect` 对象。