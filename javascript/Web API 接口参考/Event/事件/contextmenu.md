# Element: contextmenu event

**`contextmenu`** 事件会在用户尝试打开上下文菜单时被触发。该事件通常在鼠标点击右键或者按下键盘上的菜单键时被触发，如果使用菜单键，该上下文菜单会被展示 到所聚焦元素的左下角，但是如果该元素是一棵 DOM 树的话，上下文菜单便会展示在当前这一行的左下角。

任何没有被禁用的鼠标右击事件 (通过调用事件的 [`preventDefault()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/preventDefault) 方法) 将会使得 `contextmenu` 事件在目标元素上被触发。

| Bubbles（冒泡）                      | Yes                                                          |
| :----------------------------------- | ------------------------------------------------------------ |
| Cancelable（可撤销）                 | Yes                                                          |
| Interface（接口）                    | [`MouseEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent) |
| Event handler property（事件处理器） | [`oncontextmenu`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/contextmenu_event) |

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/contextmenu_event#示例)

在下面的例子中，第一段内容被触发的 `contextmenu` 事件的默认行为被 `preventDefault()` 取消了，因此，在第一段右击鼠标时什么也不会发生，但是右键单击第二段内容时，则会出现标准的菜单内容，与平时右击普通页面出现的菜单内容一致。

### [HTML](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/contextmenu_event#html)

```html
<p id="noContextMenu">这个段落右键菜单已被禁用。</p>
<p>但是这个段落没有被禁用。</p>
```

### [JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/contextmenu_event#javascript)

```js
noContext = document.getElementById('noContextMenu');

noContext.addEventListener('contextmenu', e => {
  e.preventDefault();
});
```

### [结果](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/contextmenu_event#结果)

<iframe class="sample-code-frame" title="示例 sample" id="frame_示例" src="https://live-samples.mdn.mozilla.net/zh-CN/docs/Web/API/Element/contextmenu_event/_sample_.%E7%A4%BA%E4%BE%8B.html" loading="lazy" style="box-sizing: content-box; border: 1px solid var(--border-primary); max-width: 100%; width: calc((100% - 2rem) - 2px); background: rgb(255, 255, 255); border-radius: var(--elem-radius); padding: 1rem;"></iframe>