# Element

**`Element`** 是一个通用性非常强的基类，所有 [`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) 对象下的对象都继承自它。这个接口描述了所有相同种类的元素所普遍具有的方法和属性。一些接口继承自 `Element` 并且增加了一些额外功能的接口描述了具体的行为。例如， [`HTMLElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement) 接口是所有 HTML 元素的基本接口，而 [`SVGElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/SVGElement) 接口是所有 SVG 元素的基础。大多数功能是在这个类的更深层级（hierarchy）的接口中被进一步制定的。

在 Web 平台的领域以外的语言，比如 XUL，通过 `XULElement` 接口，同样也实现了 `Element` 接口。

![image-20230603141226273](https://images-1305186932.cos.ap-beijing.myqcloud.com/images/202306031412335.png)

## [属性](https://developer.mozilla.org/zh-CN/docs/Web/API/Element#属性)

*所有属性继承自它的祖先接口 [`Node`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node)，并且扩展了 [`Node`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node) 的父接口 [`EventTarget`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget)，并且从以下部分继承了属性：`ParentNode`、`ChildNode`、[`NonDocumentTypeChildNode` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Element)，*和 `Animatable`。

-   [`Element.attributes`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/attributes) 只读

    返回一个与该元素相关的所有属性集合 [`NamedNodeMap`](https://developer.mozilla.org/zh-CN/docs/Web/API/NamedNodeMap)。

-   [`Element.classList`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/classList) 只读

    返回该元素包含的 class 属性，是一个 [`DOMTokenList`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMTokenList)。

-   [`Element.className`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/className)

    一个 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)，表示这个元素的 class。

-   [`Element.clientHeight`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/clientHeight) 只读

    返回[`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) 表示内部相对于外层元素的高度。

-   [`Element.clientLeft`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/clientLeft) 只读

    返回[`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number)表示该元素距离它左边界的宽度。

-   [`Element.clientTop`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/clientTop) 只读

    返回 [`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) 表示该元素距离它上边界的高度。

-   [`Element.clientWidth`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/clientWidth) 只读

    返回[`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) 表示该元素内部的宽度。

-   `Element.computedName` 只读

    Returns a [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) containing the label exposed to accessibility.

-   `Element.computedRole` 只读

    Returns a [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) containing the ARIA role that has been applied to a particular element.

-   [`Element.id`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/id)

    是一个[`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 表示这个元素的 id。

-   [`Element.innerHTML`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/innerHTML)

    是一个[`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 表示这个元素的内容文本。

-   [`Element.localName`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/localName) 只读

    是一个 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 表示这个元素名称本地化的部分。

-   [`Element.namespaceURI`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/namespaceURI) 只读

    元素对应的 namespace URI，如果没有则返回 `null`**备注：** In Firefox 3.5 and earlier, HTML elements are in no namespace. In later versions, HTML elements are in the [`http://www.w3.org/1999/xhtml`](https://www.w3.org/1999/xhtml) namespace in both HTML and XML trees.

-   [`NonDocumentTypeChildNode.nextElementSibling`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/nextElementSibling) 只读

    是一个[`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element), 该元素下一个兄弟节点，如果为 null 表示不存在..

-   [`Element.outerHTML`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/outerHTML)

    是一个 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)，获取该 DOM 元素及其后代的 HTML 文本。在设置它的时候，会从给定的字符串开始解析，替换自身。

-   [`Element.prefix`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/prefix) 只读

    A [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) representing the namespace prefix of the element, or `null` if no prefix is specified.

-   [`NonDocumentTypeChildNode.previousElementSibling`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/previousElementSibling) 只读

    是一个 [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element), 该元素上一个兄弟节点，如果为 null 表示不存在..

-   [`Element.scrollHeight`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollHeight) 只读

    返回类型为： [`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number)，表示元素的滚动视图高度。

-   [`Element.scrollLeft`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollLeft)

    返回类型为：[`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number)，表示该元素横向滚动条距离最左的位移。

-   [`Element.scrollLeftMax`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollLeftMax) 非标准 只读

    返回类型为： [`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number)，表示该元素横向滚动条可移动的最大值

-   [`Element.scrollTop`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollTop)

    返回类型为：[`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) ，表示该元素纵向滚动条距离

-   [`Element.scrollTopMax`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollTopMax) 非标准 只读

    返回类型为：[`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) ，表示该元素纵向滚动条可移动的最大值

-   [`Element.scrollWidth`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollWidth) 只读

    返回类型为： [`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) ，表示元素的滚动视图宽度。

-   [`Element.shadowRoot`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/shadowRoot)只读

    Returns the open shadow root that is hosted by the element, or null if no open shadow root is present.

-   [`Element.openOrClosedShadowRoot`](https://developer.mozilla.org/zh-CN/docs/Mozilla/Add-ons/WebExtensions/API/dom/openOrClosedShadowRoot) 非标准只读

    Returns the shadow root that is hosted by the element, regardless if its open or closed. **Available only to [WebExtensions](https://developer.mozilla.org/zh-CN/docs/Mozilla/Add-ons/WebExtensions).**

-   [`Element.slot`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/slot) 实验性

    Returns the name of the shadow DOM slot the element is inserted in.

-   [`Element.tabStop` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus) 非标准

    Is a [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean) indicating if the element can receive input focus via the tab key.

-   [`Element.tagName`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/tagName) 只读

    Returns a [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) with the name of the tag for the given element.

-   `Element.undoManager` 实验性 只读

    Returns the `UndoManager` associated with the element.

-   `Element.undoScope` 实验性

    Is a [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean) indicating if the element is an undo scope host, or not.

**备注：** DOM Level 3 defined `namespaceURI`, `localName` and `prefix` on the [`Node`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node) interface. In DOM4 they were moved to `Element`.

This change is implemented in Chrome since version 46.0 and Firefox since version 48.0.

### [Properties included from Slotable](https://developer.mozilla.org/zh-CN/docs/Web/API/Element#properties_included_from_slotable)

*The `Element` interface includes the following property, defined on the [`Slotable` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Element) mixin.*

-   [`Slotable.assignedSlot` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Element/assignedSlot)只读

    Returns a [`HTMLSlotElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLSlotElement) representing the [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/slot) the node is inserted in.

### [事件句柄](https://developer.mozilla.org/zh-CN/docs/Web/API/Element#事件句柄)

-   [`Element.onfullscreenchange`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/fullscreenchange_event)

    事件 [`fullscreenchange`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/fullscreenchange_event) 的回调方法，在元素进入或退出全屏模式时触发。不仅可用于观察（监听）可预期的过度变化，还可以观察（监听）未知的变化，如：当你的应用程序在后台运行。

-   [`Element.onfullscreenerror`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/fullscreenerror_event)

    事件 [`fullscreenerror`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/fullscreenerror_event) 的回调方法，在进入全屏模式过程中出现错误时触发。

## [方法](https://developer.mozilla.org/zh-CN/docs/Web/API/Element#方法)

*Inherits methods from its parents [`Node`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node), and its own parent, [`EventTarget`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget)*, and implements those of `ParentNode`, `ChildNode`*, [`NonDocumentTypeChildNode` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Element),* *and `Animatable`.*

-   [`EventTarget.addEventListener()`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)

    Registers an event handler to a specific event type on the element.

-   [`Element.attachShadow()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/attachShadow)

    Attatches a shadow DOM tree to the specified element and returns a reference to its [`ShadowRoot`](https://developer.mozilla.org/zh-CN/docs/Web/API/ShadowRoot).

-   [`Element.animate()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/animate) 实验性

    A shortcut method to create and run an animation on an element. Returns the created Animation object instance.

-   [`Element.closest()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/closest) 实验性

    Returns the [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) which is the closest ancestor of the current element (or the current element itself) which matches the selectors given in parameter.

-   [`Element.computedStyleMap()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Element/computedStyleMap) 实验性

    Returns a [`StylePropertyMapReadOnly` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/StylePropertyMapReadOnly) interface which provides a read-only representation of a CSS declaration block that is an alternative to [`CSSStyleDeclaration`](https://developer.mozilla.org/zh-CN/docs/Web/API/CSSStyleDeclaration).

-   [`EventTarget.dispatchEvent()`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/dispatchEvent)

    Dispatches an event to this node in the DOM and returns a [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean) that indicates whether no handler canceled the event.

-   [`Element.getAnimations()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Element/getAnimations) 实验性

    Returns an array of Animation objects currently active on the element.

-   [`Element.getAttribute()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getAttribute)

    Retrieves the value of the named attribute from the current node and returns it as an [`Object`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object).

-   [`Element.getAttributeNames()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getAttributeNames)

    Returns an array of attribute names from the current element.

-   [`Element.getAttributeNS()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttributeNS)

    Retrieves the value of the attribute with the specified name and namespace, from the current node and returns it as an [`Object`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object).

-   [`Element.getAttributeNode()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getAttributeNode) 已弃用

    Retrieves the node representation of the named attribute from the current node and returns it as an [`Attr`](https://developer.mozilla.org/zh-CN/docs/Web/API/Attr).

-   [`Element.getAttributeNodeNS()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getAttributeNodeNS) 已弃用

    Retrieves the node representation of the attribute with the specified name and namespace, from the current node and returns it as an [`Attr`](https://developer.mozilla.org/zh-CN/docs/Web/API/Attr).

-   [`Element.getBoundingClientRect()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)

    返回元素的大小及其相对于视口的位置。

-   [`Element.getClientRects()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getClientRects)

    Returns a collection of rectangles that indicate the bounding rectangles for each line of text in a client.

-   [`Element.getElementsByClassName()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getElementsByClassName)

    参数中给出类的列表，返回一个动态的 [`HTMLCollection`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCollection) ，包含了所有持有这些类的后代元素。

-   [`Element.getElementsByTagName()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getElementsByTagName)

    Returns a live [`HTMLCollection`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCollection) containing all descendant elements, of a particular tag name, from the current element.

-   [`Element.getElementsByTagNameNS()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getElementsByTagNameNS)

    Returns a live [`HTMLCollection`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCollection) containing all descendant elements, of a particular tag name and namespace, from the current element.

-   [`Element.hasAttribute()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/hasAttribute)

    Returns a [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean) indicating if the element has the specified attribute or not.

-   [`Element.hasAttributeNS()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/hasAttributeNS)

    Returns a [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean) indicating if the element has the specified attribute, in the specified namespace, or not.

-   [`Element.hasAttributes()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/hasAttributes)

    Returns a [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean) indicating if the element has one or more HTML attributes present.

-   [`Element.hasPointerCapture()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Element/hasPointerCapture)

    Indicates whether the element on which it is invoked has pointer capture for the pointer identified by the given pointer ID.

-   [`Element.insertAdjacentElement()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/insertAdjacentElement)

    Inserts a given element node at a given position relative to the element it is invoked upon.

-   [`Element.insertAdjacentHTML()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/insertAdjacentHTML)

    Parses the text as HTML or XML and inserts the resulting nodes into the tree in the position given.

-   [`Element.insertAdjacentText()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/insertAdjacentText)

    Inserts a given text node at a given position relative to the element it is invoked upon.

-   [`Element.matches()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/matches) 实验性

    Returns a [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean) indicating whether or not the element would be selected by the specified selector string.

-   `Element.pseudo()` 实验性

    Returns a [`CSSPseudoElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/CSSPseudoElement) representing the child pseudo-element matched by the specified pseudo-element selector.

-   [`Element.querySelector()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/querySelector)

    Returns the first [`Node`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node) which matches the specified selector string relative to the element.

-   [`Element.querySelectorAll()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/querySelectorAll)

    Returns a [`NodeList`](https://developer.mozilla.org/zh-CN/docs/Web/API/NodeList) of nodes which match the specified selector string relative to the element.

-   [`Element.releasePointerCapture()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Element/releasePointerCapture)

    Releases (stops) pointer capture that was previously set for a specific [`pointer event`](https://developer.mozilla.org/zh-CN/docs/Web/API/PointerEvent).

-   [`ChildNode.remove()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Element/remove) 实验性

    Removes the element from the children list of its parent.

-   [`Element.removeAttribute()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/removeAttribute)

    Removes the named attribute from the current node.

-   [`Element.removeAttributeNS()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/removeAttributeNS)

    Removes the attribute with the specified name and namespace, from the current node.

-   [`Element.removeAttributeNode()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/removeAttributeNode) 已弃用

    Removes the node representation of the named attribute from the current node.

-   [`EventTarget.removeEventListener()`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/removeEventListener)

    Removes an event listener from the element.

-   [`Element.requestFullscreen()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/requestFullscreen) 实验性

    Asynchronously asks the browser to make the element full-screen.

-   [`Element.requestPointerLock()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/requestPointerLock) 实验性

    Allows to asynchronously ask for the pointer to be locked on the given element.

-   [`Element.scroll()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scroll)

    Scrolls to a particular set of coordinates inside a given element.

-   [`Element.scrollBy()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollBy)

    Scrolls an element by the given amount.

-   [`Element.scrollIntoView()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView) 实验性

    Scrolls the page until the element gets into the view.

-   [`Element.scrollTo()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollTo)

    Scrolls to a particular set of coordinates inside a given element.

-   [`Element.setAttribute()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/setAttribute)

    Sets the value of a named attribute of the current node.

-   [`Element.setAttributeNS()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/setAttributeNS)

    Sets the value of the attribute with the specified name and namespace, from the current node.

-   [`Element.setAttributeNode()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/setAttributeNode) 已弃用

    Sets the node representation of the named attribute from the current node.

-   [`Element.setAttributeNodeNS()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/setAttributeNodeNS) 已弃用

    Sets the node representation of the attribute with the specified name and namespace, from the current node.

-   [`Element.setCapture()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/setCapture) 非标准

    Sets up mouse event capture, redirecting all mouse events to this element.

-   [`Element.setPointerCapture()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/setPointerCapture)

    Designates a specific element as the capture target of future [pointer events](https://developer.mozilla.org/zh-CN/docs/Web/API/Pointer_events).

-   [`Element.toggleAttribute()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/toggleAttribute)

    Toggles a boolean attribute, removing it if it is present and adding it if it is not present, on the specified element.

## [事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Element#事件)

Listen to these events using `addEventListener()` or by assigning an event listener to the `oneventname` property of this interface.

-   [`cancel` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/cancel_event)

    Fires on a [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/dialog) when the user instructs the browser that they wish to dismiss the current open dialog. For example, the browser might fire this event when the user presses theEsckey or clicks a "Close dialog" button which is part of the browser's UI. Also available via the `oncancel` property.

-   [`error`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/error_event)

    Fired when when a resource failed to load, or can't be used. For example, if a script has an execution error or an image can't be found or is invalid. Also available via the [`onerror`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/error_event) property.

-   [`scroll`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scroll_event)

    Fired when the document view or an element has been scrolled. Also available via the [`onscroll`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scroll_event) property.

-   [`select`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLInputElement/select_event)

    Fired when some text has been selected. Also available via the [`onselect`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLInputElement/select_event) property. Also available via the `onshow` property.

-   [`wheel`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/wheel_event)

    Fired when the user rotates a wheel button on a pointing device (typically a mouse). Also available via the [`onwheel`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/wheel_event) property.

### [剪贴板事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Element#剪贴板事件)

-   [`copy`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/copy_event)

    Fired when the user initiates a copy action through the browser's user interface. Also available via the [`oncopy`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/copy_event) property.

-   [`cut`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/cut_event)

    Fired when the user initiates a cut action through the browser's user interface. Also available via the [`oncut`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/cut_event) property.

-   [`paste`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/paste_event)

    Fired when the user initiates a paste action through the browser's user interface. Also available via the [`onpaste`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/paste_event) property.

### [Composition events](https://developer.mozilla.org/zh-CN/docs/Web/API/Element#composition_events)

-   [`compositionend`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/compositionend_event)

    Fired when a text composition system such as an [input method editor](https://developer.mozilla.org/zh-CN/docs/Glossary/Input_method_editor) completes or cancels the current composition session.

-   [`compositionstart`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/compositionstart_event)

    Fired when a text composition system such as an [input method editor](https://developer.mozilla.org/zh-CN/docs/Glossary/Input_method_editor) starts a new composition session.

-   [`compositionupdate`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/compositionupdate_event)

    Fired when a new character is received in the context of a text composition session controlled by a text composition system such as an [input method editor](https://developer.mozilla.org/zh-CN/docs/Glossary/Input_method_editor).

### [Focus events](https://developer.mozilla.org/zh-CN/docs/Web/API/Element#focus_events)

-   [`blur`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/blur_event)

    Fired when an element has lost focus. Also available via the [`onblur`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/blur_event) property.

-   [`focus`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/focus_event)

    Fired when an element has gained focus. Also available via the [`onfocus`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/focus_event) property

-   [`focusin` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Element/focusin_event)

    Fired when an element is about to gain focus.

-   [`focusout`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/focusout_event)

    Fired when an element is about to lose focus.

### [Fullscreen events](https://developer.mozilla.org/zh-CN/docs/Web/API/Element#fullscreen_events)

-   [`fullscreenchange`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/fullscreenchange_event)

    Sent to an [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) when it transitions into or out of [full-screen](https://developer.mozilla.org/zh-CN/docs/Web/API/Fullscreen_API/Guide) mode. Also available via the [`onfullscreenchange`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/fullscreenchange_event) property.

-   [`fullscreenerror`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/fullscreenerror_event)

    Sent to an `Element` if an error occurs while attempting to switch it into or out of [full-screen](https://developer.mozilla.org/zh-CN/docs/Web/API/Fullscreen_API/Guide) mode. Also available via the [`onfullscreenerror`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/fullscreenerror_event) property.

### [键盘事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Element#键盘事件)

-   [`keydown`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/keydown_event)

    Fired when a key is pressed. Also available via the [`onkeydown`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/keydown_event) property.

-   [`keypress`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/keypress_event)

    Fired when a key that produces a character value is pressed down. 已弃用 Also available via the [`onkeypress`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/keypress_event) property.

-   [`keyup`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/keyup_event)

    Fired when a key is released. Also available via the [`onkeyup`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/keyup_event) property.

### [鼠标事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Element#鼠标事件)

-   [`auxclick`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/auxclick_event)

    Fired when a non-primary pointing device button (e.g., any mouse button other than the left button) has been pressed and released on an element. Also available via the [`onauxclick`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/auxclick_event) property.

-   [`click`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/click_event)

    Fired when a pointing device button (e.g., a mouse's primary button) is pressed and released on a single element. Also available via the [`onclick`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/click_event) property.

-   [`contextmenu`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/contextmenu_event)

    Fired when the user attempts to open a context menu. Also available via the [`oncontextmenu`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/contextmenu_event) property.

-   [`dblclick`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/dblclick_event)

    Fired when a pointing device button (e.g., a mouse's primary button) is clicked twice on a single element. Also available via the [`ondblclick`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/dblclick_event) property.

-   [`DOMActivate`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/DOMActivate_event) 已弃用

    Occurs when an element is activated, for instance, through a mouse click or a keypress.

-   [`mousedown`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/mousedown_event)

    Fired when a pointing device button is pressed on an element. Also available via the [`onmousedown`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/mousedown_event) property.

-   [`mouseenter`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/mouseenter_event)

    Fired when a pointing device (usually a mouse) is moved over the element that has the listener attached. Also available via the [`onmouseenter`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/mouseenter_event) property.

-   [`mouseleave`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/mouseleave_event)

    Fired when the pointer of a pointing device (usually a mouse) is moved out of an element that has the listener attached to it. Also available via the [`onmouseleave`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/mouseleave_event) property.

-   [`mousemove`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/mousemove_event)

    Fired when a pointing device (usually a mouse) is moved while over an element. Also available via the [`onmousemove`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/mousemove_event) property.

-   [`mouseout`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/mouseout_event)

    Fired when a pointing device (usually a mouse) is moved off the element to which the listener is attached or off one of its children. Also available via the [`onmouseout`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/mouseout_event) property.

-   [`mouseover`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/mouseover_event)

    Fired when a pointing device is moved onto the element to which the listener is attached or onto one of its children. Also available via the [`onmouseover`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/mouseover_event) property.

-   [`mouseup`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/mouseup_event)

    Fired when a pointing device button is released on an element. Also available via the [`onmouseup`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/mouseup_event) property.

-   [`webkitmouseforcechanged` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Element/webkitmouseforcechanged_event)

    Fired each time the amount of pressure changes on the trackpadtouchscreen.

-   [`webkitmouseforcedown` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Element/webkitmouseforcedown_event)

    Fired after the mousedown event as soon as sufficient pressure has been applied to qualify as a "force click".

-   [`webkitmouseforcewillbegin` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Element/webkitmouseforcewillbegin_event)

    Fired before the [`mousedown`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/mousedown_event) event.

-   [`webkitmouseforceup` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Element/webkitmouseforceup_event)

    Fired after the [`webkitmouseforcedown` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Element/webkitmouseforcedown_event) event as soon as the pressure has been reduced sufficiently to end the "force click".

### [Touch events](https://developer.mozilla.org/zh-CN/docs/Web/API/Element#touch_events)

-   [`touchcancel`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/touchcancel_event)

    Fired when one or more touch points have been disrupted in an implementation-specific manner (for example, too many touch points are created). Also available via the [`ontouchcancel`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/touchcancel_event) property.

-   [`touchend`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/touchend_event)

    Fired when one or more touch points are removed from the touch surface. Also available via the [`ontouchend` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Element/touchend_event) property

-   [`touchmove`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/touchmove_event)

    Fired when one or more touch points are moved along the touch surface. Also available via the [`ontouchmove`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/touchmove_event) property

-   [`touchstart`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/touchstart_event)

    Fired when one or more touch points are placed on the touch surface. Also available via the [`ontouchstart`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/touchstart_event) property