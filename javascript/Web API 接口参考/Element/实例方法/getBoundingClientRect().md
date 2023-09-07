# Element.getBoundingClientRect()

**`Element.getBoundingClientRect()`** 方法返回一个 [`DOMRect`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMRect) 对象，其提供了元素的大小及其相对于[视口](https://developer.mozilla.org/zh-CN/docs/Glossary/Viewport)的位置。

## [语法](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect#语法)

```js
getBoundingClientRect()
```

### [参数](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect#参数)

无。

### [返回值](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect#返回值)

返回值是一个 [`DOMRect`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMRect) 对象，是包含整个元素的最小矩形（包括 `padding` 和 `border-width`）。该对象使用 `left`、`top`、`right`、`bottom`、`x`、`y`、`width` 和 `height` 这几个以像素为单位的只读属性描述整个矩形的位置和大小。除了 `width` 和 `height` 以外的属性是相对于视图窗口的左上角来计算的。

![img](https://images-1305186932.cos.ap-beijing.myqcloud.com/images/202306141432452.png)

该方法返回的 [`DOMRect`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMRect) 对象中的 `width` 和 `height` 属性是包含了 `padding` 和 `border-width` 的，而不仅仅是内容部分的宽度和高度。在标准盒子模型中，这两个属性值分别与元素的 `width`/`height` + `padding` + `border-width` 相等。而如果是 [`box-sizing: border-box`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-sizing)，两个属性则直接与元素的 `width` 或 `height` 相等。

这个对象是由该元素的 [`getClientRects()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getClientRects) 方法返回的一组矩形的集合，就是该元素的 CSS 边框大小。

空边框盒（译者注：没有内容的边框）会被忽略。如果所有的元素边框都是空边框，那么这个矩形给该元素返回的 `width`、`height` 值为 0，`left`、`top` 值为第一个 CSS 盒子（按内容顺序）的 top-left 值。

如果你需要获得边界矩形相对于整个网页左上角的位置，则可以将当前的滚动位置（可通过 [`window.scrollX`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/scrollX) 和 [`window.scrollY`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/scrollY) 获得）添加到 `top` 和 `left` 属性上。获得的边界矩形与当前的滚动位置无关。

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect#示例)

### [基础示例](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect#基础示例)

在这个简单的示例中，获得的 `DOMRect` 对象表示的是一个简单的 `<div>` 元素的边界客户端矩形，并将其属性值显示出来。

```html
<div></div>
```

```css
div {
  width: 400px;
  height: 200px;
  padding: 20px;
  margin: 50px auto;
  background: purple;
}
```

```js
let elem = document.querySelector('div');
let rect = elem.getBoundingClientRect();
for (var key in rect) {
  if(typeof rect[key] !== 'function') {
    let para = document.createElement('p');
    para.textContent  = `${ key } : ${ rect[key] }`;
    document.body.appendChild(para);
  }
}
```

<iframe class="sample-code-frame" title="基础示例 sample" id="frame_基础示例" width="100%" height="640" src="https://live-samples.mdn.mozilla.net/zh-CN/docs/Web/API/Element/getBoundingClientRect/_sample_.%E5%9F%BA%E7%A1%80%E7%A4%BA%E4%BE%8B.html" loading="lazy" style="box-sizing: content-box; border: 1px solid var(--border-primary); max-width: 100%; width: calc((100% - 2rem) - 2px); background: rgb(255, 255, 255); border-radius: var(--elem-radius); padding: 1rem;"></iframe>

注意：`width`/`height` 是与元素的 `width`/`height` + `padding` 相等的。

也同样注意 `x`/`left`、`y`/`top`、`right` 和 `bottom` 与视口边缘到元素对应的一侧的绝对距离相等。

### [滚动](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect#滚动)

这个示例演示了当网页滚动时，边界客户端矩形是如何变化的。

```html
<div id="example"></div>
<div id="controls"></div>
```

```css
div#example {
  width: 400px;
  height: 200px;
  padding: 20px;
  margin: 50px auto;
  background: purple;
}

body { padding-bottom: 1000px; }
p { margin: 0; }
```

```js
function update() {
  const container = document.getElementById("controls");
  const elem = document.getElementById("example");
  const rect = elem.getBoundingClientRect();

  container.innerHTML = '';
  for (let key in rect) {
    if(typeof rect[key] !== 'function') {
      let para = document.createElement('p');
      para.textContent  = `${ key } : ${ rect[key] }`;
      container.appendChild(para);
    }
  }
}

document.addEventListener('scroll', update);
update();
```

<iframe class="sample-code-frame" title="滚动 sample" id="frame_滚动" width="100%" height="640" src="https://live-samples.mdn.mozilla.net/zh-CN/docs/Web/API/Element/getBoundingClientRect/_sample_.%E6%BB%9A%E5%8A%A8.html" loading="lazy" style="box-sizing: content-box; border: 1px solid var(--border-primary); max-width: 100%; width: calc((100% - 2rem) - 2px); background: rgb(255, 255, 255); border-radius: var(--elem-radius); padding: 1rem;"></iframe>