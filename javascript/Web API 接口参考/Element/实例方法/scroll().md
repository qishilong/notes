# Element.scroll()

**`scroll()`** 方法是用于在给定的元素中滚动到某个特定坐标的 [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) 接口。

## 语法

```js
scroll(x-coord, y-coord)
scroll(options)
```

### 参数

-   [`x-coord`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scroll#x-coord)

    你想要显示在左上角的元素沿水平轴的像素。

-   [`y-coord`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scroll#y-coord)

    你想要显示在左上角的元素沿垂直轴的像素。

\- 或者 -

-   [`options`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scroll#options)

    包含以下参数的对象：[`top`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scroll#top)指定沿 Y 轴滚动窗口或元素的像素数。[`left`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scroll#left)指定沿 X 轴滚动窗口或元素的像素数。[`behavior`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scroll#behavior)`smooth` 表示平滑滚动并产生过渡效果，`auto` 或缺省值会直接跳转到目标位置，没有过渡效果。

### 返回值

无 ([`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined))。

## 示例

```js
// 将元素沿垂直方向向下滚动 1000 个像素
element.scroll(0, 1000);
```

使用 `options`:

```js
element.scroll({
  top: 100,
  left: 100,
  behavior: "smooth",
});
```