# 元素：keypress 事件

**已弃用:** 不再推荐使用该特性。虽然一些浏览器仍然支持它，但也许已从相关的 web 标准中移除，也许正准备移除或出于兼容性而保留。请尽量不要使用该特性，并更新现有的代码；参见本页面底部的[兼容性表格](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/keypress_event#浏览器兼容性)以指导你作出决定。请注意，该特性随时可能无法正常工作。

当按下产生字符或符号值的键时，将触发 `keypress` 事件。

产生字符值的键包括字母、数字和标点符号键。不产生字符值的键是修饰键，例如 Alt、Shift、Ctrl 或 Meta 键。

**警告：** 由于此事件已被弃用，你应该改用 [`beforeinput`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/beforeinput_event) 或 [`keydown`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/keydown_event)。

## [语法](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/keypress_event#语法)

在 [`addEventListener()`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener) 等方法中使用事件名称，或设置事件处理器属性。

```js
addEventListener("keypress", (event) => {});

onkeypress = (event) => {};
```

## [事件类型](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/keypress_event#事件类型)

[`KeyboardEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent)。继承自 [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event)。

EventUIEventKeyboardEvent

## [事件属性](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/keypress_event#事件属性)

*该接口还继承了其父接口 [`UIEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/UIEvent) 和 [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) 的属性。*

-   [`KeyboardEvent.altKey`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/altKey) 只读

    返回一个布尔值，如果在发生此事件时按下 Alt（macOS 上的 Option 或 ⌥）键，则返回 `true`。

-   [`KeyboardEvent.code`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/code) 只读

    返回一个字符串，其中包含由事件表示的物理键的代码值。**警告：** 此方法忽略用户的键盘布局，因此，如果用户按下 QWERTY 键盘布局中“Y”位置（在主键盘区域上方的一行中间），即使用户使用 QWERTZ 键盘（这意味着用户期望“Z”，而且所有其他属性都指示为“Z”）或 Dvorak 键盘布局（其中用户期望“F”），此方法仍将始终返回“KeyY”。如果你想向用户显示正确的按键信息，则可以使用 [`Keyboard.getLayoutMap()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Keyboard/getLayoutMap) 方法。

-   [`KeyboardEvent.ctrlKey`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/ctrlKey) 只读

    返回一个布尔值，如果生成键事件时 Ctrl 键处于激活状态，则为 `true`。

-   [`KeyboardEvent.isComposing`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/isComposing) 只读

    返回一个布尔值，如果事件在 `compositionstart` 之后、`compositionend` 之前触发，则为 `true`。

-   [`KeyboardEvent.key`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/key) 只读

    返回一个字符串，表示由事件表示的键的键值。

-   `KeyboardEvent.locale` 只读

    返回一个表示键盘配置的区域设置的语言环境字符串。如果浏览器或设备不知道键盘的语言环境，则可能是空字符串。**备注：** 这并不描述正在输入的数据的区域设置。用户可能在使用一种键盘布局时在输入不同语言的文本。

-   [`KeyboardEvent.location`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/location) 只读

    返回一个数字，表示键在键盘或其他输入设备上的位置。标识位置的常量列表如上面的键盘位置部分所示。

-   [`KeyboardEvent.metaKey`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/metaKey) 只读

    如果在生成按键事件时 Meta 键（在 Mac 键盘上是 ⌘ Command 键，在 Windows 键盘上是 Windows 键（⊞））处于活动状态，则返回一个布尔值，该布尔值为 `true`。

-   [`KeyboardEvent.repeat`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/repeat) 只读

    如果该按键被按住并且正在生成自动重复事件，则此函数返回一个布尔值 `true`。

-   [`KeyboardEvent.shiftKey`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/shiftKey) 只读

    如果在生成按键事件时 Shift 键处于激活状态，则返回一个布尔值，该布尔值为 `true`。

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/keypress_event#示例)

### [addEventListener 按键示例](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/keypress_event#addeventlistener_按键示例)

该示例在聚焦 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input) 元素后，每当你按下一个键时，记录 [`KeyboardEvent.code`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/code) 的值。

```html
<div>
  <label for="sample">请将光标放在 input 元素上并输入一些内容：</label>
  <input type="text" name="text" id="sample" />
</div>
<p id="log"></p>
```

```js
const log = document.getElementById("log");
const input = document.querySelector("input");

input.addEventListener("keypress", logKey);

function logKey(e) {
  log.textContent += ` ${e.code}`;
}
```

<iframe class="sample-code-frame" title="示例 sample" id="frame_示例" src="https://live-samples.mdn.mozilla.net/zh-CN/docs/Web/API/Element/keypress_event/_sample_.%E7%A4%BA%E4%BE%8B.html" loading="lazy" style="box-sizing: content-box; border: 1px solid var(--border-primary); max-width: 100%; width: calc((100% - 2rem) - 2px); background: rgb(255, 255, 255); border-radius: var(--elem-radius); padding: 1rem;"></iframe>

### [等同于 onkeypress](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/keypress_event#等同于_onkeypress)

```js
input.onkeypress = logKey;
```