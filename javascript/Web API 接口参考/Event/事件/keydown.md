# Element: 键盘按下事件

**`keydown`**事件触发于键盘按键按下的时候。

与[`keypress`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/keypress_event) 事件不同的是，所有按键均会触发`keydown`事件，无论这些按键是否会产生字符值。

| Bubbles                | Yes                                                          |
| :--------------------- | ------------------------------------------------------------ |
| Cancelable             | Yes                                                          |
| Interface              | [`KeyboardEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent) |
| Event handler property | [`onkeydown`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/keydown_event) |

`keydown` 与 [`keyup`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/keyup_event) 事件捕获了键盘按键的操作，而 `keypress` 反映了具体输入某个字符的值。比如，小写"a" 在`keydown` 和 `keyup`事件中输出的是大写 A 的 Unicode 编码 65，但是在`keypress`中输出的就是小写"a"的 Unicode 编码 97。大写 "A"在这些事件中输出的都是 Unicode 编码 65。

键盘事件只能由 `<inputs>`, `<textarea>` 以及任何具有 `contentEditable` 或 `tabindex="-1"`属性的组件触发。

自 Firefox 65 起， `keydown` 与 [`keyup`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/keyup_event) 事件会在 IME（输入法编辑器）复合事件中被触发，目的是为了提升 CJKT（中日韩台地区）用户跨浏览器性能，([Firefox bug 354358](https://bugzil.la/354358)). 若要忽略复合事件中所有 `keydown` 事件，可以按照如下代码修改 (229 是某个在 IME 中触发的键盘事件对应的 `keyCode`):

```js
eventTarget.addEventListener("keydown", event => {
  if (event.isComposing || event.keyCode === 229) {
    return;
  }
  // do something
});
```

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/keydown_event#示例)

### [addEventListener keydown 示例](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/keydown_event#addeventlistener_keydown_示例)

这个例子展示了当你在[``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input)元素中按下一个按键时， [`KeyboardEvent.code`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/code) 的取值

```html
<input placeholder="Click here, then press down a key." size="40">
<p id="log"></p>
```

```js
const input = document.querySelector('input');
const log = document.getElementById('log');

input.addEventListener('keydown', logKey);

function logKey(e) {
  log.textContent += ` ${e.code}`;
}
```

<iframe class="sample-code-frame" title="addEventListener keydown 示例 sample" id="frame_addeventlistener_keydown_示例" src="https://live-samples.mdn.mozilla.net/zh-CN/docs/Web/API/Element/keydown_event/_sample_.addeventlistener_keydown_%E7%A4%BA%E4%BE%8B.html" loading="lazy" style="box-sizing: content-box; border: 1px solid var(--border-primary); max-width: 100%; width: calc((100% - 2rem) - 2px); background: rgb(255, 255, 255); border-radius: var(--elem-radius); padding: 1rem;"></iframe>

### [onkeydown 示例](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/keydown_event#onkeydown_示例)

```js
input.onkeydown = logKey;
```