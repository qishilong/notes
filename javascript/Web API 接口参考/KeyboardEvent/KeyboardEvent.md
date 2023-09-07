# KeyboardEvent

**`KeyboardEvent`** 对象描述了用户与键盘的交互。每个事件都描述了用户与一个按键（或一个按键和修饰键的组合）的单个交互；事件类型`keydown`， `keypress` 与 `keyup` 用于识别不同的键盘活动类型。

**备注：** `KeyboardEvent` 只在低级别提示用户与一个键盘按键的交互是什么，不涉及这个交互的上下文含义。当你需要处理文本输入的时候，使用 [`input`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/input_event) 事件代替。用户使用其他方式输入文本时，如使用平板电脑的手写系统或绘图板，键盘事件可能不会触发。

## [构造函数](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent#构造函数)

-   [`KeyboardEvent()`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/KeyboardEvent)

    创建一个 `KeyboardEvent` 对象。

## [常量](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent#常量)

`KeyboardEvent` 接口定义了以下常量。

### [键盘定位](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent#键盘定位)

下述常量用于识别产生按键事件的键盘位置，以类似 `KeyboardEvent.DOM_KEY_LOCATION_STANDARD` 的形式来访问。

| 常量                        | 值   | 描述                                                         |
| :-------------------------- | :--- | :----------------------------------------------------------- |
| `DOM_KEY_LOCATION_STANDARD` | 0x00 | The key described by the event is not identified as being located in a particular area of the keyboard; it is not located on the numeric keypad (unless it's the NumLock key), and for keys that are duplicated on the left and right sides of the keyboard, the key is, for whatever reason, not to be associated with that location.Examples include alphanumeric keys on the standard PC 101 US keyboard, the NumLock key, and the space bar. |
| `DOM_KEY_LOCATION_LEFT`     | 0x01 | The key is one which may exist in multiple locations on the keyboard and, in this instance, is on the left side of the keyboard.Examples include the left Control key, the left Command key on a Macintosh keyboard, or the left Shift key. |
| `DOM_KEY_LOCATION_RIGHT`    | 0x02 | The key is one which may exist in multiple positions on the keyboard and, in this case, is located on the right side of the keyboard.Examples include the right Shift key and the right Alt key (Option on a Mac keyboard). |
| `DOM_KEY_LOCATION_NUMPAD`   | 0x03 | The key is located on the numeric keypad, or is a virtual key associated with the numeric keypad if there's more than one place the key could originate from. The NumLock key does not fall into this group and is always encoded with the location `DOM_KEY_LOCATION_STANDARD`.Examples include the digits on the numeric keypad, the keypad's Enter key, and the decimal point on the keypad. |

## [属性](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent#属性)

*此接口从 [`UIEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/UIEvent) 和 [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) 中继承属性。*

-   [`KeyboardEvent.altKey`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/altKey) 只读

    返回一个 [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean)，如果按键事件产生时，Alt（OS X 中是Option或⌥）键被按下，则该值为 `true` 。

-   [`KeyboardEvent.code`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/code) 只读

    返回一个 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)，其 code 值代表触发事件的物理按键。**警告：** 这个属性会忽略用户的键盘布局，所以如果用户在 QWERTY 布局的键盘上按下“Y”位置（第一行字母按键的中间）的按键时，这个属性会返回“KeyY”，即使用户使用 QWERTZ 布局的键盘（此时用户输入的就是“Z”，其他属性也会提示“Z”）或 Dvorak 键盘（此时用户输入的就是“F”）也是如此。

-   [`KeyboardEvent.ctrlKey`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/ctrlKey) 只读

    返回一个 [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean)，如果按键事件发生时 Ctrl 键被按下，则该值为 `true` 。

-   [`KeyboardEvent.isComposing`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/isComposing) 只读

    Returns a [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean) that is `true` if the event is fired between after `compositionstart` and before `compositionend`.

-   [`KeyboardEvent.key`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/key) 只读

    Returns a [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) representing the key value of the key represented by the event.

-   `KeyboardEvent.locale` 只读

    Returns a [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) representing a locale string indicating the locale the keyboard is configured for. This may be the empty string if the browser or device doesn't know the keyboard's locale.**备注：** This does not describe the locale of the data being entered. A user may be using one keyboard layout while typing text in a different language.

-   [`KeyboardEvent.location`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/location) 只读

    Returns a [`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) representing the location of the key on the keyboard or other input device. A list of the constants identifying the locations is shown above in [Keyboard locations](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent#键盘定位).

-   [`KeyboardEvent.metaKey`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/metaKey) 只读

    Returns a [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean) that is `true` if the Meta key (on Mac keyboards, the ⌘ Command key; on Windows keyboards, the Windows key (⊞)) was active when the key event was generated.

-   [`KeyboardEvent.repeat`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/repeat) 只读

    Returns a [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean) that is `true` if the key is being held down such that it is automatically repeating.

-   [`KeyboardEvent.shiftKey`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/shiftKey) 只读

    Returns a [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean) that is `true` if the Shift key was active when the key event was generated.

## [方法](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent#方法)

*此接口从 [`UIEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/UIEvent) 和 [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) 中继承方法。*

-   [`KeyboardEvent.getModifierState()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState)

    Returns a [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean) indicating if a modifier key such asAlt,Shift,Ctrl, orMeta, was pressed when the event was created.

## [过时方法](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent#过时方法)

-   [`KeyboardEvent.initKeyEvent()`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/initKeyEvent) 已弃用

    Initializes a `KeyboardEvent` object. This was implemented only by Firefox, and is no longer supported even there; instead, you should use the [`KeyboardEvent()`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/KeyboardEvent) constructor.

-   [`KeyboardEvent.initKeyboardEvent()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/initKeyboardEvent) 已弃用

    Initializes a `KeyboardEvent` object. This is now deprecated. You should instead use the [`KeyboardEvent()`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/KeyboardEvent) constructor.

## [过时属性](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent#过时属性)

-   `KeyboardEvent.char` 非标准已弃用只读

    Returns a [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) representing the character value of the key. If the key corresponds to a printable character, this value is a non-empty Unicode string containing that character. If the key doesn't have a printable representation, this is an empty string.**备注：** If the key is used as a macro that inserts multiple characters, this attribute's value is the entire string, not just the first character.

-   [`KeyboardEvent.charCode`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/charCode) 已弃用只读

    Returns a [`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) representing the Unicode reference number of the key; this attribute is used only by the `keypress` event. For keys whose `char` attribute contains multiple characters, this is the Unicode value of the first character in that attribute. In Firefox 26 this returns codes for printable characters.**警告：** This attribute is deprecated; you should use [`KeyboardEvent.key`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/key) instead, if available.

-   [`KeyboardEvent.keyCode`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/keyCode) 已弃用只读

    Returns a [`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) representing a system and implementation dependent numerical code identifying the unmodified value of the pressed key.**警告：** This attribute is deprecated; you should use [`KeyboardEvent.key`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/key) instead, if available.

-   [`KeyboardEvent.keyIdentifier` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyIdentifier) 非标准已弃用只读

    This property is non-standard and has been deprecated in favor of [`KeyboardEvent.key`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/key). It was part of an old version of DOM Level 3 Events.

-   `KeyboardEvent.keyLocation` 非标准已弃用只读

    This is a non-standard deprecated alias for [`KeyboardEvent.location`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/location). It was part of an old version of DOM Level 3 Events.

-   [`KeyboardEvent.which`](https://developer.mozilla.org/zh-CN/docs/Web/API/UIEvent/which) 已弃用 只读

    Returns a [`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) representing a system and implementation dependent numeric code identifying the unmodified value of the pressed key; this is usually the same as `keyCode`.**警告：** This attribute is deprecated; you should use [`KeyboardEvent.key`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/key) instead, if available.

## [事件](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent#事件)

The following events are based on the `KeyboardEvent` type. They can be delivered to any object which implements `GlobalEventHandlers`, including [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element), [`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document), and [`Window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window). In the list below, each event links to the documentation for the `Document` handler for the event, which applies generally to all of the recipients.

-   [`keydown` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event)

    A key has been pressed.

-   [`keyup` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Element/keyup_event)

    A key has been released.

### [过时事件](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent#过时事件)

-   [`keypress`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/keypress_event) 已弃用

    通常在一个按键被按下时触发，并产生一个字符串值，这个事件高度依赖硬件 (highly device-dependent ) 且废弃，您不应该使用它

## [用法说明](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent#用法说明)

There are three types of keyboard events: [`keydown`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/keydown_event), [`keypress`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/keypress_event), and [`keyup`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/keyup_event). For most keys, Gecko dispatches a sequence of key events like this:

1.  When the key is first pressed, the `keydown` event is sent.
2.  If the key is not a modifier key, the `keypress` event is sent.
3.  When the user releases the key, the `keyup` event is sent.

### [特殊情况](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent#特殊情况)

Some keys toggle the state of an indicator light; these include keys such as Caps Lock, Num Lock, and Scroll Lock. On Windows and Linux, these keys dispatch only the `keydown` and `keyup` events.

**备注：** On Linux, Firefox 12 and earlier also dispatched the `keypress` event for these keys.

However, a limitation of the macOS event model causes Caps Lock to dispatch only the `keydown` event. Num Lock was supported on some older laptop models (2007 models and older), but since then, macOS hasn't supported Num Lock even on external keyboards. On older MacBooks with a Num Lock key, that key doesn't generate any key events. Gecko does support the Scroll Lock key if an external keyboard which has an F14 key is connected. In certain older versions of Firefox, this key generated a `keypress` event; this inconsistent behavior was [Firefox bug 602812](https://bugzil.la/602812).

### [Auto-repeat handling](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent#auto-repeat_handling)

When a key is pressed and held down, it begins to auto-repeat. This results in a sequence of events similar to the following being dispatched:

1.  `keydown`
2.  `keypress`
3.  `keydown`
4.  `keypress`
5.  <<repeating until the user releases the key>>
6.  `keyup`

This is what the DOM Level 3 specification says should happen. There are some caveats, however, as described below.

#### Auto-repeat on some GTK environments such as Ubuntu 9.4

In some GTK-based environments, auto-repeat dispatches a native key-up event automatically during auto-repeat, and there's no way for Gecko to know the difference between a repeated series of keypresses and an auto-repeat. On those platforms, then, an auto-repeat key will generate the following sequence of events:

1.  `keydown`
2.  `keypress`
3.  `keyup`
4.  `keydown`
5.  `keypress`
6.  `keyup`
7.  <<repeating until the user releases the key>>
8.  `keyup`

In these environments, unfortunately, there's no way for web content to tell the difference between auto-repeating keys and keys that are just being pressed repeatedly.

#### Auto-repeat handling prior to Gecko 5.0

Before Gecko 5.0, keyboard handling was less consistent across platforms.

-   Windows

    Auto-repeat behavior is the same as in Gecko 4.0 and later.

-   Mac

    After the initial keydown event, only keypress events are sent until the keyup event occurs; the inter-spaced keydown events are not sent.

-   Linux

    The event behavior depends on the specific platform. It will either behave like Windows or Mac depending on what the native event model does.

**Note:** Manually firing an event does *not* generate the default action associated with that event. For example, manually firing a key event does not cause that letter to appear in a focused text input. In the case of UI events, this is important for security reasons, as it prevents scripts from simulating user actions that interact with the browser itself.

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent#示例)

```html
<!DOCTYPE html>
<html>
<head>
<script>
'use strict';

document.addEventListener('keydown', (event) => {
  const keyName = event.key;

  if (keyName === 'Control') {
    // do not alert when only Control key is pressed.
    return;
  }

  if (event.ctrlKey) {
    // Even though event.key is not 'Control' (e.g., 'a' is pressed),
    // event.ctrlKey may be true if Ctrl key is pressed at the same time.
    alert(`Combination of ctrlKey + ${keyName}`);
  } else {
    alert(`Key pressed ${keyName}`);
  }
}, false);

document.addEventListener('keyup', (event) => {
  const keyName = event.key;

  // As the user releases the Ctrl key, the key is no longer active,
  // so event.ctrlKey is false.
  if (keyName === 'Control') {
    alert('Control key was released');
  }
}, false);

</script>
</head>

<body>
</body>
</html>
```