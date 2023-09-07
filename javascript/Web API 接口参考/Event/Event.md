# Event

**`Event`** 接口表示在 DOM 中出现的事件。

一些事件是由用户触发的，例如鼠标或键盘事件；而其他事件常由 API 生成，例如指示动画已经完成运行的事件，视频已被暂停等等。事件也可以通过脚本代码触发，例如对元素调用 [`HTMLElement.click()`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/click) 方法，或者定义一些自定义事件，再使用 [`EventTarget.dispatchEvent()`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/dispatchEvent) 方法将自定义事件派发往指定的目标（target）。

有许多不同类型的事件，其中一些使用基于 `Event` 主接口的二次接口。`Event` 本身包含适用于所有事件的属性和方法。

很多 DOM 元素可以被设计接收 (或者监听) 这些事件，并且执行代码去响应（或者处理）它们。通过[`EventTarget.addEventListener()`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)方法可以将事件处理函数绑定到不同的[HTML elements](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element)上 (比如`<button>`, `<div>`, `<span>`等等) 。这种绑定事件处理函数的方式基本替换了老版本中使用 HTML [event handler attributes (en-US)](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes)来绑定事件处理函数的方式。除此之外，通过正确使用[`removeEventListener()`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/removeEventListener)方法，这些事件处理函数也能被移除。

**备注：** 一个元素可以绑定多个事件处理函数，甚至是同一种类型的事件。尤其是这种分离的，并且相互独立的代码模块对同一个元素绑定事件处理函数，每一个模块代码都有着独立的目的。（比如，一个网页同时有着广告模块和统计模块同时监听视频播放元素）

当有很多嵌套的元素，并且每一个元素都有着自己的事件处理函数，事件处理过程会变得非常复杂。尤其当一个父元素和子元素绑定有相同类型的事件处理函数的时候。因为结构上的重叠，事件处理函数可能会依次被触发，触发的顺序取决于[事件冒泡和事件捕获](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Building_blocks/Events#event_bubbling_and_capture)在每一个元素上的设置情况。

## [基于 `Event` 的接口](https://developer.mozilla.org/zh-CN/docs/Web/API/Event#基于_event_的接口)

下面是主要基于`Event`接口的接口列表，每一个接口都设置了指向各自的 MDN API 说明的文档链接。

需要注意的是，所有的事件接口名称都是以“Event”结尾的。

- [`AnimationEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/AnimationEvent)
- [`AudioProcessingEvent` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/AudioProcessingEvent)
- `BeforeInputEvent`
- [`BeforeUnloadEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/BeforeUnloadEvent)
- [`BlobEvent` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/BlobEvent)
- [`ClipboardEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/ClipboardEvent)
- [`CloseEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/CloseEvent)
- [`CompositionEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/CompositionEvent)
- `CSSFontFaceLoadEvent`
- [`CustomEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomEvent)
- `DeviceLightEvent`
- [`DeviceMotionEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/DeviceMotionEvent)
- [`DeviceOrientationEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/DeviceOrientationEvent)
- [`DeviceProximityEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/DeviceProximityEvent)
- `DOMTransactionEvent`
- [`DragEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/DragEvent)
- `EditingBeforeInputEvent`
- [`ErrorEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/ErrorEvent)
- [`FetchEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/FetchEvent)
- [`FocusEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/FocusEvent)
- [`GamepadEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/GamepadEvent)
- [`HashChangeEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/HashChangeEvent)
- [`IDBVersionChangeEvent` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/IDBVersionChangeEvent)
- [`InputEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/InputEvent)
- [`KeyboardEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent)
- [`MediaStreamEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaStreamEvent)
- [`MessageEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageEvent)
- [`MouseEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent)
- [`MutationEvent` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/MutationEvent)
- [`OfflineAudioCompletionEvent` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioCompletionEvent)
- [`OverconstrainedError` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/OverconstrainedError)
- [`PageTransitionEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/PageTransitionEvent)
- [`PaymentRequestUpdateEvent` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/PaymentRequestUpdateEvent)
- [`PointerEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/PointerEvent)
- [`PopStateEvent` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/PopStateEvent)
- [`ProgressEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/ProgressEvent)
- `RelatedEvent`
- [`RTCDataChannelEvent` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/RTCDataChannelEvent)
- `RTCIdentityErrorEvent`
- `RTCIdentityEvent`
- [`RTCPeerConnectionIceEvent` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnectionIceEvent)
- `SensorEvent`
- [`StorageEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/StorageEvent)
- [`SVGEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/SVGEvent)
- `SVGZoomEvent`
- [`TimeEvent` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/TimeEvent)
- [`TouchEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/TouchEvent)
- [`TrackEvent` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/TrackEvent)
- [`TransitionEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/TransitionEvent)
- [`UIEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/UIEvent)
- [`UserProximityEvent` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/UserProximityEvent)
- [`WebGLContextEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLContextEvent)
- [`WheelEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/WheelEvent)

## [构造器](https://developer.mozilla.org/zh-CN/docs/Web/API/Event#构造器)

- [`Event()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/Event)

    创建并返回一个 `Event` 对象。

## [属性](https://developer.mozilla.org/zh-CN/docs/Web/API/Event#属性)

- [`Event.bubbles`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/bubbles) 只读

    一个布尔值，用来表示该事件是否会在 DOM 中冒泡。

- [`Event.cancelBubble`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/cancelBubble)

    [`Event.stopPropagation()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/stopPropagation) 的历史别名。在事件处理器函数返回之前，将此属性的值设置为 `true`，亦可阻止事件继续冒泡。

- [`Event.cancelable`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/cancelable) 只读

    一个布尔值，表示事件是否可以取消。

- [`Event.composed`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/composed) 只读

    一个布尔值，表示事件是否可以穿过 Shadow DOM 和常规 DOM 之间的隔阂进行冒泡。

- [`Event.currentTarget`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/currentTarget) 只读

    对事件当前注册的目标的引用。这是一个当前计划将事件发送到的对象。它是有可能在重定向的过程中被改变的。

- [`Event.deepPath` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Event/composedPath) 非标准

    一个由事件流所经过的 DOM [`节点`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node)组成的[`数组`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)。

- [`Event.defaultPrevented`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/defaultPrevented) 只读

    一个布尔值，表示 [`event.preventDefault()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/preventDefault) 方法是否取消了事件的默认行为。

- [`Event.eventPhase`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/eventPhase) 只读

    表示事件流正被处理到了哪个阶段。

- [`Event.explicitOriginalTarget` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Event/explicitOriginalTarget) 非标准 只读

    事件的明确（explicit）原始目标（Mozilla 专有属性）。

- [`Event.originalTarget`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/originalTarget) 非标准 只读

    重设目标前的事件原始目标（Mozilla 专有属性）。

- [`Event.returnValue`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/returnValue)

    旧版 Internet Explorer 引入的一个非标准历史属性，为保证依赖此属性的网页正常运作，此属性最终被收入规范。可用 [`Event.preventDefault()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/preventDefault) 与 [`Event.defaultPrevented`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/defaultPrevented) 代替，但由于已进入规范，也可以使用此属性。

- [`Event.srcElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/srcElement) 非标准

    旧版 Internet Explorer 对 [`Event.target`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/target) 的非标准别称。出于兼容原因，一些其他浏览器也支持此别称。

- [`Event.target`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/target) 只读

    对事件原始目标的引用，这里的原始目标指最初派发（dispatch）事件时指定的目标。

- [`Event.timeStamp`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/timeStamp) 只读

    事件创建时的时间戳（精度为毫秒）。按照规范，这个时间戳是 Unix 纪元起经过的毫秒数，但实际上，在不同的浏览器中，对此时间戳的定义也有所不同。另外，规范正在将其修改为 [`DOMHighResTimeStamp`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMHighResTimeStamp)。

- [`Event.type`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/type) 只读

    事件的类型，不区分大小写。

- [`Event.isTrusted`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/isTrusted) 只读

    表示事件是由浏览器（例如用户点击）发起的，还是由脚本（使用事件创建方法，例如 [`Event.initEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/initEvent)）发出的。

### [废弃属性](https://developer.mozilla.org/zh-CN/docs/Web/API/Event#废弃属性)

- [`Event.scoped` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Event/composed) 只读 已弃用

    已废弃，使用 [`Event.composed`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/composed) 代替此属性。 一个[`布尔值`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean)，表示给定的事件是否会穿过 Shadow DOM，进入到标准 DOM 中。

## [方法](https://developer.mozilla.org/zh-CN/docs/Web/API/Event#方法)

- [`Event.createEvent()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Document/createEvent) 已弃用

    创建一个新事件，如果使用此方法创建事件，则必须调用其自身的 `initEvent()` 方法，对其进行初始化。

- [`Event.composedPath()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/composedPath)

    返回事件的路径（将在该对象上调用监听器）。如果阴影根节点 (shadow root) 创建时 [`ShadowRoot.mode`](https://developer.mozilla.org/zh-CN/docs/Web/API/ShadowRoot/mode) 值为 closed，那么路径不会包括该根节点下阴影树 (shadow tree) 的节点。

- [`event.initEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/initEvent)已弃用

    为通过 [`Event.createEvent()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Document/createEvent) 创建的事件初始化。该方法对已经被派发的事件无效。

- [`event.preventDefault`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/preventDefault)

    取消事件（如果该事件可取消）。

- [`event.stopImmediatePropagation`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/stopImmediatePropagation)

    对这个特定的事件而言，没有其他监听器被调用。这个事件既不会添加到相同的元素上，也不会添加到以后将要遍历的元素上（例如在捕获阶段）。

- [`event.stopPropagation`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/stopPropagation)

    停止冒泡，阻止事件在 DOM 中继续冒泡。

### [废弃方法](https://developer.mozilla.org/zh-CN/docs/Web/API/Event#废弃方法)

- `Event.getPreventDefault()` 非标准

    非标准方法；使用 [`Event.defaultPrevented`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/defaultPrevented) 属性代替此方法。 返回 [`Event.defaultPrevented`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/defaultPrevented) 的值。

- `event.preventBubble` 已弃用

    已废弃；使用 [`event.stopPropagation`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/stopPropagation) 代替此方法。 阻止事件继续冒泡。

- `event.preventCapture` 已弃用

    已废弃；使用 [`event.stopPropagation`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/stopPropagation) 代替此方法。