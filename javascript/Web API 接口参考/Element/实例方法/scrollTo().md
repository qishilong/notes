# Element.scrollTo()

[`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) 的 **`scrollTo()`** 方法可以使界面滚动到给定元素的指定坐标位置。

## 语法

```js
scrollTo(x-coord, y-coord)
scrollTo(options)
```

### 参数

-   `x-coord` 是你想要显示在左上角的元素沿水平轴的像素。
-   `y-coord` 是你想要显示在左上角的元素沿垂直轴的像素。

\- 或者 -

-   [`options`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollTo#options)

    包含以下参数的对象：[`top`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollTo#top)指定沿 Y 轴滚动窗口或元素的像素数。[`left`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollTo#left)指定沿 X 轴滚动窗口或元素的像素数。[`behavior`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollTo#behavior)`smooth` 表示平滑滚动并产生过渡效果、`instant` 表示滚动会直接跳转到目标位置，没有过渡效果。`auto` 或缺省值表示浏览器会自动选择滚动时的过渡效果。

### 返回值

无 ([`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined))。

## 示例

```js
element.scrollTo(0, 1000);
```

使用 `options`:

```js
element.scrollTo({
  top: 100,
  left: 100,
  behavior: "smooth",
});
```