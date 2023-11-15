# Image()

**`Image()`**函数将会创建一个新的[`HTMLImageElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLImageElement)实例。

它的功能等价于 [`document.createElement('img')`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createElement)

## [语法](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLImageElement/Image#语法)

```
Image(width, height)
```

### [参数](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLImageElement/Image#参数)

-   [width](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLImageElement/Image#width)

    图片的宽度 (即 [`width`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#width) 属性).

-   [height](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLImageElement/Image#height)

    图片的高度 (即 [`height`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#height) 属性).

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLImageElement/Image#示例)

```
var myImage = new Image(100, 200);
myImage.src = "picture.jpg";
document.body.appendChild(myImage);
```

上面的代码相当于在 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/body)中定义了下面的 HTML:

```
<img width="100" height="200" src="picture.jpg" />
```

**备注：** 无论构造函数中指定的大小是多少，都会加载整个位图。如果在构造时指定了尺寸信息，那么将会反应在实例的 [`HTMLImageElement.width` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/width) 和 [`HTMLImageElement.height` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/height) 属性上。图像自身的 CSS 像素值将会反应在[`HTMLImageElement.naturalWidth` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/naturalWidth) 和 [`HTMLImageElement.naturalHeight`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLImageElement/naturalHeight)属性。如果没有指定值，那么两个属性的值相同