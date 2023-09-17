# Element: keyup event

**`keyup`** 事件在按键被松开时触发。

| 冒泡             | 是                                                           |
| :--------------- | ------------------------------------------------------------ |
| 可取消           | 是                                                           |
| 接口             | [`KeyboardEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent) |
| 事件处理函数属性 | [`onkeyup`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/keyup_event) |

[`keydown`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/keydown_event) 和 `keyup` 事件提供指出哪个键被按下的代码，而 `keypress` 指出哪些字符被输入。例如，小写字母“a”在 `keydown` 和 `keyup` 时会被报告为 65，但在 `keypress` 时为 97。所有事件均将大写字母“A”报告为 65。

从 Firefox 65 开始，`keyup` 和 [`keydown`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/keydown_event) 事件在 IME 编辑时也会被触发，以提升 CJKT 用户的跨浏览器兼容性（[Firefox bug 354358](https://bugzil.la/354358)）。要忽略 IME 编辑时的所有 `keyup` 事件，请执行以下操作（229 是一个关于被 IME 加工过的事件的 `keyCode` 的特殊值）：

```js
eventTarget.addEventListener("keyup", event => {
  if (event.isComposing || event.keyCode === 229) {
    return;
  }
  // do something
});
```

## [例子](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/keyup_event#例子)

### [addEventListener keyup 例子](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/keyup_event#addeventlistener_keyup_例子)

在这个例子中，每当你在 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input) 元素里松开一个键，将会打印 [`KeyboardEvent.code`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/code) 的值。

```html
<input placeholder="Click here, then press and release a key." size="40">
<p id="log"></p>
```

```js
const input = document.querySelector('input');
const log = document.getElementById('log');

input.addEventListener('keyup', logKey);

function logKey(e) {
  log.textContent += ` ${e.code}`;
}
```

<iframe class="sample-code-frame" title="addEventListener keyup 例子 sample" id="frame_addeventlistener_keyup_例子" src="https://live-samples.mdn.mozilla.net/zh-CN/docs/Web/API/Element/keyup_event/_sample_.addeventlistener_keyup_%E4%BE%8B%E5%AD%90.html" loading="lazy" style="box-sizing: content-box; border: 1px solid var(--border-primary); max-width: 100%; width: calc((100% - 2rem) - 2px); background: rgb(255, 255, 255); border-radius: var(--elem-radius); padding: 1rem;"></iframe>

### [等效的 onkeyup](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/keyup_event#等效的_onkeyup)

```js
input.onkeyup = logKey;
```