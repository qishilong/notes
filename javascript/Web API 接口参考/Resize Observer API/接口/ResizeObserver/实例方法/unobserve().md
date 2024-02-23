# ResizeObserver.unobserve()

[`ResizeObserver`](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver) 接口的 **`unobserve()`** 方法结束对指定的 [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) 或 [`SVGElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/SVGElement) 的监听。

## 语法

```js
unobserve(target)
```

### 参数

-   [`target`](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver/unobserve#target)

    对不要监听的 [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) 或 [`SVGElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/SVGElement) 的引用。

### 返回值

无（[`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)）。

### 异常

无。

## 示例

以下片段取自 [resize-observer-text.html](https://mdn.github.io/dom-examples/resize-observer/resize-observer-text.html)（[见源码](https://github.com/mdn/dom-examples/blob/main/resize-observer/resize-observer-text.html)）示例：

```js
const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    if (entry.contentBoxSize) {
      // Checking for chrome as using a non-standard array
      if (entry.contentBoxSize[0]) {
        h1Elem.style.fontSize = `${Math.max(
          1.5,
          entry.contentBoxSize[0].inlineSize / 200,
        )}rem`;
        pElem.style.fontSize = `${Math.max(
          1,
          entry.contentBoxSize[0].inlineSize / 600,
        )}rem`;
      } else {
        h1Elem.style.fontSize = `${Math.max(
          1.5,
          entry.contentBoxSize.inlineSize / 200,
        )}rem`;
        pElem.style.fontSize = `${Math.max(
          1,
          entry.contentBoxSize.inlineSize / 600,
        )}rem`;
      }
    } else {
      h1Elem.style.fontSize = `${Math.max(
        1.5,
        entry.contentRect.width / 200,
      )}rem`;
      pElem.style.fontSize = `${Math.max(1, entry.contentRect.width / 600)}rem`;
    }
  }
  console.log("Size changed");
});

resizeObserver.observe(divElem);

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    resizeObserver.observe(divElem);
  } else {
    resizeObserver.unobserve(divElem);
  }
});
```