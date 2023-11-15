# HTMLImageElement

**`HTMLImageElement`** 接口提供了特别的属性和方法 (在常规的 [`HTMLElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement)之外，它也能通过继承使用) 来操纵 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img) 元素的布局和图像。

## [Constructor](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLImageElement#constructor)

-   [`Image()`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLImageElement/Image)

    `Image()` 构造器，带有两个可选的参数，分别表示资源的宽度和高度，创建了一个尚未被插入 DOM 树中的 `HTMLImageElement` 实例。When called without parameters, `new Image()` is equivalent to calling [`document.createElement("img")`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createElement).

## [属性](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLImageElement#属性)

*从它的父元素 [`HTMLElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement) 继承的属性。*

-   [`HTMLImageElement.alt` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/alt)

    一个 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 表示 HTML 属性 [`alt`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#alt)，表明图像的后备描述内容，会在图像无法加载时显示。

-   [`HTMLImageElement.complete` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/complete) 只读

    返回一个 [`Boolean` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) 如果浏览器已经下载完毕，并且图像是[受支持的图片类型 (en-US)](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Img#image_format)、解码的过程中没有发生错误，则返回 `true`。That means this value is also `true` if the image has no [`src` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/src) value indicating an image to load.

-   [`HTMLImageElement.crossOrigin` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/crossOrigin)

    一个 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 表示这个 img 元素的 CORS 设置。参考 [CORS settings attributes (en-US)](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin)。This may be `null` if CORS is not used.

-   [`HTMLImageElement.currentSrc` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/currentSrc) 只读

    返回一个 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 表示加载当前显示的图像的 URL。 这可能会改变，因为图像是调整，由于不断变化的条件，由任何 [media queries](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_media_queries) 的地方。

-   [`HTMLImageElement.decoding`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLImageElement/decoding)

    An optional [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) representing a hint given to the browser on how it should decode the image. If this value is provided, it must be one of the possible permitted values: `sync` to decode the image synchronously, `async` to decode it asynchronously, or `auto` to indicate no preference (which is the default). Read the [`decoding`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLImageElement/decoding) page for details on the implications of this property's values.

-   [`HTMLImageElement.height` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/height)

    一个整数，表示 HTML 属性 [`height`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#height)，说明了图像在 CSS 像素中渲染的高度。

-   [`HTMLImageElement.isMap` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/isMap)

    一个 [`Boolean` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) 表示 HTML 属性 [`ismap`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#ismap)，说明了图像是某个服务器端图像映射的一部分。This is different from a client-side image map, specified using an `<img>` element and a corresponding [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/map) which contains [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/area) elements indicating the clickable areas in the image. The image *must* be contained within an [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a) element; see the `ismap` page for details.

-   [`HTMLImageElement.naturalHeight`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLImageElement/naturalHeight) 只读

    返回一个整数，如果可用的话，表明图像在 CSS 中固有的高度，单位为像素；否则返回 `0`。如果图片是以其原来的大小渲染，则此值等于图片的高度。

-   [`HTMLImageElement.naturalWidth` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/naturalWidth) 只读

    返回一个整数，如果可用的话，表明图像在 CSS 中固有的宽度，单位为像素；否则返回 `0`。如果图片是以其原来的大小渲染，则此值等于图片的宽度。

-   [`HTMLImageElement.referrerPolicy`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLImageElement/referrerPolicy)

    A [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) that reflects the [`referrerpolicy`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#referrerpolicy) HTML attribute, which tells the [user agent](https://developer.mozilla.org/zh-CN/docs/Glossary/User_agent) how to decide which referrer to use in order to fetch the image. Read this article for details on the possible values of this string.

-   [`HTMLImageElement.sizes` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/sizes) 实验性

    A [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) reflecting the [`sizes`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#sizes) HTML attribute. This string specifies a list of comma-separated conditional sizes for the image; that is, for a given viewport size, a particular image size is to be used. Read the documentation on the [`sizes` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/sizes) page for details on the format of this string.

-   [`HTMLImageElement.src` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/src)

    一个 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 表示 HTML 属性 [`src`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#src)，包含图像的完整的 URL，包含图像的基础 URL。

-   [`HTMLImageElement.srcset`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLImageElement/srcset) 实验性

    一个 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 表示 HTML 属性 [`srcset`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#srcset)，包含了候选图像列表，用逗号分隔（`',', U+002C COMMA`）。一个候选的图像是一个 URL 跟着一个 `'w'` 表示图像的宽度，或者一个 `'x'` 表示像素密度。

-   [`HTMLImageElement.useMap` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/useMap)

    一个 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 表示 HTML 属性 [`usemap`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#usemap)，包含一个 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/map) 元素的页面本地 URL。The page-local URL is a pound (hash) symbol (`#`) followed by the ID of the `<map>` element, such as `#my-map-element`. The `<map>` in turn contains [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/area) elements indicating the clickable areas in the image.

-   [`HTMLImageElement.width` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/width)

    一个整数，表示 HTML 属性 [`width`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#width)，说明图像在 CSS 像素中渲染的宽度。

-   [`HTMLImageElement.x` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/x) 只读 实验性

    An integer indicating the horizontal offset of the left border edge of the image's CSS layout box relative to the origin of the [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/html) element's containing block.

-   [`HTMLImageElement.y` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/y) 只读 实验性

    The integer vertical offset of the top border edge of the image's CSS layout box relative to the origin of the [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/html) element's containing block.

## [已废弃的属性](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLImageElement#已废弃的属性)

-   [`HTMLImageElement.align` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/align) 已弃用

    一个 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)，表示图像如何与它周围的内容对齐。The possible values are `"left"`, `"right"`, `"justify"`, and `"center"`. This is obsolete; you should instead use CSS (such as [`text-align`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-align), which works with images despite its name) to specify the alignment.

-   [`HTMLImageElement.border` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/border) 已弃用

    一个 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)，表示图像边框的宽度。此属性已被弃用，应该用 CSS [`border`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border) 属性来代替它。

-   [`HTMLImageElement.hspace` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/hspace) 已弃用

    一个整数值，指定图像左右的留白，单位为像素。

-   [`HTMLImageElement.longDesc` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/longDesc) 已弃用

    一个 [`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)，specifying the URL at which a long description of the image's contents may be found. This is used to turn the image into a hyperlink automatically. Modern HTML should instead simply place an `<img>` inside an [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a) element defining the hyperlink.

-   `HTMLImageElement.lowSrc` 已弃用

    一个 [`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)，specifying the URL of a low-quality (but faster to load) version of the same image. This was once used by browsers under constrained network conditions or on slow devices.

-   [`HTMLImageElement.name` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/name) 已弃用

    一个 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)，representing the name of the element.

-   [`HTMLImageElement.vspace` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/vspace) 已弃用

    一个整数值，指定图像上下的留白，单位为像素。

## [方法](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLImageElement#方法)

*从它的父元素 [`HTMLElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement) 继承的方法。*

-   [`HTMLImageElement.decode()`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLImageElement/decode)

    Returns a [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) that resolves when the image is decoded and it's safe to append the image to the DOM. This prevents rendering of the next frame from having to pause to decode the image, as would happen if an undecoded image were added to the DOM.

## [错误](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLImageElement#错误)

-   The [`src`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#src) attribute is empty or `null`.
-   The specified `src` URL is the same as the URL of the page the user is currently on.
-   The specified image is corrupted in some way that prevents it from being loaded.
-   The specified image's metadata is corrupted in such a way that it's impossible to retrieve its dimensions, and no dimensions were specified in the `<img>` element's attributes.
-   The specified image is in a format not supported by the [user agent](https://developer.mozilla.org/zh-CN/docs/Glossary/User_agent).

If an error occurs while trying to load or render the image, and an [`onerror`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes#onerror) event handler has been configured to handle the [`error`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/error_event) event, that event handler will get called. This can happen in a number of situations, including:

## [例子](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLImageElement#例子)

```
var img1 = new Image(); // Image 构造器
img1.src = "image1.png";
img1.alt = "alt";
document.body.appendChild(img1);

var img2 = document.createElement("img"); // 使用 DOM HTMLImageElement
img2.src = "image2.jpg";
img2.alt = "alt text";
document.body.appendChild(img2);

// 使用文档中的第一个 img
alert(document.images[0].src);
```