# Document

**`Document`** 接口表示任何在浏览器中载入的网页，并作为网页内容的入口，也就是 [DOM 树 (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Document_object_model/Using_the_Document_Object_Model)。

DOM 树包含了像 [`<body>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/body)、[`<table>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/table) 这样的元素，以及[大量其他元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element)。它向网页文档本身提供了全局操作功能，能解决如何获取页面的 URL，如何在文档中创建一个新的元素这样的问题。

<img src="https://images-1305186932.cos.ap-beijing.myqcloud.com/images/202306131548241.png" alt="image-20230613154816379" style="zoom:50%;" />

`Document` 接口描述了任何类型的文档的通用属性与方法。根据不同的文档类型（例如 [HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML)、[XML (en-US)](https://developer.mozilla.org/en-US/docs/Web/XML)、[SVG](https://developer.mozilla.org/zh-CN/docs/Web/SVG)，...），还能使用更多 API：使用 `"text/html"` 作为内容类型（content type）的 HTML 文档，还实现了 [`HTMLDocument`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLDocument) 接口，而 XML 和 SVG 文档则（额外）实现了 [`XMLDocument`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLDocument) 接口。

## [构造函数](https://developer.mozilla.org/zh-CN/docs/Web/API/Document#构造函数)

-   [`Document()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/Document)

    创建一个新的 `Document` 对象。

## [属性](https://developer.mozilla.org/zh-CN/docs/Web/API/Document#属性)

*此接口也继承自 [`Node`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node) 和 [`EventTarget`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget) 接口。*

-   [`Document.activeElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/activeElement) 只读

    返回一个目前处于聚焦状态的 [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element)。

-   [`Document.adoptedStyleSheets` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Document/adoptedStyleSheets)

    设置用于构造文档样式表的数组。这些样式表也可与同一文档的 shadow DOM 子树共享。

-   [`Document.body`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/body)

    返回当前文档的 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/body) 或 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/frameset) 节点。

-   [`Document.characterSet`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/characterSet) 只读

    返回文档正在使用的字符集。

-   [`Document.childElementCount` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Document/childElementCount) 只读

    返回文档正在使用的子元素的数量。

-   [`Document.children` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Document/children) 只读

    返回当前文档的子元素。

-   [`Document.compatMode`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/compatMode) 只读

    指示文档是否以*怪异模式*（quirks）或*严格模式*（strict）渲染。

-   [`Document.contentType`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/contentType) 只读

    根据当前文档的 MIME 标头，返回它的 Content-Type。

-   [`Document.currentScript`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/currentScript) 只读

    返回目前正在处理且[不是 JavaScript 模块](https://github.com/whatwg/html/issues/997)的 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script) 元素。

-   [`Document.doctype`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/doctype) 只读

    返回当前文档的文档类型定义（Document Type Definition，DTD）。

-   [`Document.documentElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/documentElement) 只读

    返回当前文档的直接子节点。对于 HTML 文档，[`HTMLHtmlElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLHtmlElement) 对象一般代表该文档的[``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/html) 元素。

-   [`Document.documentURI`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/documentURI) 只读

    以字符串的类型，返回当前文档的路径。

-   [`Document.embeds`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/embeds) 只读

    返回一个包含当前文档的嵌入式的元素 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/embed) 的 [`HTMLCollection`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCollection)。

-   [`Document.firstElementChild` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Document/firstElementChild) 只读

    返回当前文档的第一个子元素。

-   [`Document.fonts`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/fonts)

    返回当前文档的 [`FontFaceSet`](https://developer.mozilla.org/zh-CN/docs/Web/API/FontFaceSet) 接口。

-   [`Document.forms`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/forms) 只读

    返回一个包含当前文档中所有表单元素 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/form) 的 [`HTMLCollection`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCollection)。

-   [`Document.fullscreenElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/fullscreenElement) 只读

    返回文档中正处于全屏模式的元素。

-   [`Document.head`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/head) 只读

    返回当前文档的 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/head) 元素。

-   [`Document.hidden`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/hidden) 只读

    返回一个布尔值，表明当前页面是否隐藏。

-   [`Document.images`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/images) 只读

    返回当前文档中所包含的图片的 [`HTMLCollection`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCollection)。

-   [`Document.implementation`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/implementation) 只读

    返回与当前文档相关联的 DOM 实现。

-   [`Document.lastElementChild` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Document/lastElementChild) 只读

    返回当前文档的最后一个子元素。

-   [`Document.links`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/links) 只读

    返回一个包含文档中所有超链接的 [`HTMLCollection`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCollection)。

-   [`Document.pictureInPictureElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/pictureInPictureElement) 只读

    返回文档中正处于画中画模式的 [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element)。

-   [`Document.pictureInPictureEnabled`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/pictureInPictureEnabled) 只读

    若画中画特性可用，则返回 `true`。

-   [`Document.plugins`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/plugins) 只读

    返回一个包含可用插件的 [`HTMLCollection`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCollection)。

-   [`Document.pointerLockElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/pointerLockElement) 只读

    当指针被锁定时，返回鼠标事件的目标的元素集合。若锁定正处于等待状态、指针已被解锁，或是目标正处于另一个文档中，则返回 `null`。

-   [`Document.featurePolicy` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Document/featurePolicy) 实验性 只读

    返回一个 [`FeaturePolicy` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/FeaturePolicy) 接口，该结构为应用于特定文档的特性策略提供了一个简单的 API。

-   [`Document.scripts`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/scripts) 只读

    返回包含文档中所有的 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script) 元素的 [`HTMLCollection`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCollection)。

-   [`Document.scrollingElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/scrollingElement) 只读

    返回对滚动文档的 [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) 的引用。

-   [`Document.styleSheets`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/styleSheets) 只读

    返回一个包含显式链接或嵌入到文档中的 [`CSSStyleSheet`](https://developer.mozilla.org/zh-CN/docs/Web/API/CSSStyleSheet) 对象的 [`StyleSheetList`](https://developer.mozilla.org/zh-CN/docs/Web/API/StyleSheetList)。

-   [`Document.timeline`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/timeline) 只读

    返回 [`DocumentTimeline` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/DocumentTimeline) 的一个实例，该实例是在页面加载时自动创建的。

-   [`Document.visibilityState`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/visibilityState) 只读

    返回一个 `string`，表明当前文档的可见性。可能的取值有 `visible`、`hidden`、`prerender` 和 `unloaded`。

### [HTMLDocument 的扩展](https://developer.mozilla.org/zh-CN/docs/Web/API/Document#htmldocument_的扩展)

*HTML 文件的 `Document` 接口继承自 [`HTMLDocument`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLDocument) 接口，或扩展了这些方法：*

-   [`Document.cookie`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie)

    返回一个使用分号分隔的 cookie 列表，或设置（写入）一个 cookie。

-   [`Document.defaultView`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/defaultView) 只读

    返回一个对 `window` 对象的引用。

-   [`Document.designMode`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/designMode)

    获取或设置编辑整个文档的能力。

-   [`Document.dir`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/dir)

    获取或设置文档的文字方向（rtl 或 ltr）。

-   [`Document.domain`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/domain) 已弃用

    获取或设置当前文档的域。

-   [`Document.lastModified`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/lastModified) 只读

    返回文档最后修改的时间。

-   [`Document.location`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/location) 只读

    返回当前文档的 URI。

-   [`Document.readyState`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/readyState) 只读

    返回当前文档的加载状态。

-   [`Document.referrer`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/referrer) 只读

    返回来源页面的 URI。

-   [`Document.title`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/title)

    获取或设置当前文档的标题。

-   [`Document.URL`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/URL) 只读

    以字符串形式返回文档的地址栏链接。

### [已弃用的属性](https://developer.mozilla.org/zh-CN/docs/Web/API/Document#已弃用的属性)

-   [`Document.alinkColor`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/alinkColor) 已弃用

    获取或设置文档正文部分启用的链接的颜色。

-   [`Document.all`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/all) 已弃用

    返回一个以文档节点为根节点的 `HTMLAllCollection` 集合，以访问文档中所有的元素。这是遗留的非标准属性，不应使用。

-   [`Document.anchors`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/anchors) 已弃用 只读

    返回文档中所有锚点元素的列表。

-   [`Document.applets`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/applets) 已弃用 只读

    返回文档中 `applet` 对象的有序列表。

-   [`Document.bgColor`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/bgColor) 已弃用

    获取或设置当前文档的背景颜色。

-   [`Document.charset`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/characterSet) 已弃用 只读

    [`Document.characterSet`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/characterSet) 的别名，请使用原始属性替换。

-   [`Document.fullscreen`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/fullscreen) 已弃用

    若文档处于[全屏模式](https://developer.mozilla.org/zh-CN/docs/Web/API/Fullscreen_API)，则返回 `true`。

-   [`Document.height`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/clientHeight) 非标准 已弃用

    获取或设置当前文档的高度。

-   [`Document.inputEncoding` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Document/characterSet) 只读 已弃用

    [`Document.characterSet`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/characterSet) 的别名，请使用原始属性替换。

-   [`Document.lastStyleSheetSet`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/lastStyleSheetSet) 已弃用 只读 非标准

    返回最后启用的样式表的名字。在设置 [`selectedStyleSheetSet`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/selectedStyleSheetSet) 前，其值都为 `null`。

-   [`Document.linkColor`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/linkColor) 已弃用

    获取或设置文档中超链接的颜色。

-   [`Document.preferredStyleSheetSet`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/preferredStyleSheetSet) 已弃用 只读 非标准

    返回文档作者首选的样式表。

-   [`Document.rootElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Document/rootElement) 已弃用

    类似于 [`Document.documentElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/documentElement)，但其仅用于 [``](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/svg) 根元素。请使用后者代替。

-   [`Document.selectedStyleSheetSet`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/selectedStyleSheetSet) 已弃用 只读

    返回当前正使用的样式表的集合。

-   [`Document.styleSheetSets`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/styleSheetSets) 已弃用 只读 非标准

    返回文档上可用样式表的集合。

-   [`Document.vlinkColor` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Document/vlinkColor) 已弃用

    获取或设置被访问的超链接的颜色。

-   [`Document.width`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/clientWidth) 非标准 已弃用

    返回当前文档的宽度。

-   [`Document.xmlEncoding` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Document/xmlEncoding) 已弃用

    返回由 XML 声明的编码类型。

-   `Document.xmlStandalone` 已弃用

    若 XML 声明指定的文档是独立的（例如：文档类型定义的外部内容会影响文档的内容），则返回 `true`，否则返回 `false`。

-   [`Document.xmlVersion` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Document/xmlVersion) 已弃用

    返回 XML 声明中指定的版本号，若声明不存在则为 `"1.0"`。

## [方法](https://developer.mozilla.org/zh-CN/docs/Web/API/Document#方法)

*该接口同样继承了 [`Node`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node) 和 [`EventTarget`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget) 接口。*

-   [`Document.adoptNode()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/adoptNode)

    从外部文档中采用的节点。

-   [`Document.append()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Document/append)

    在文档的最后一个子节点后插入一个 [`Node`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node) 对象或字符串对象的集合。

-   `Document.captureEvents()` 已弃用

    参见 [`Window.captureEvents` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Window/captureEvents)。

-   [`Document.caretPositionFromPoint()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/caretPositionFromPoint)

    返回一个包含 DOM 节点（包含插入符号以及该符号在节点中的字符偏移量）的 [`CaretPosition`](https://developer.mozilla.org/zh-CN/docs/Web/API/CaretPosition) 对象。

-   [`Document.caretRangeFromPoint()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/caretRangeFromPoint) 非标准

    获取一个 [`Range`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range) 对象，其为指定坐标下的文档片段。

-   [`Document.createAttribute()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createAttribute)

    创建一个新的 [`Attr`](https://developer.mozilla.org/zh-CN/docs/Web/API/Attr) 对象并返回。

-   [`Document.createAttributeNS()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Document/createAttributeNS)

    在给定命名空间创建一个新的属性节点并返回。

-   [`Document.createCDATASection()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createCDATASection)

    创建一个新的数据（CDATA）节点并返回。

-   [`Document.createComment()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createComment)

    创建一个新的注释节点并返回。

-   [`Document.createDocumentFragment()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createDocumentFragment)

    创建一个新的文档片段。

-   [`Document.createElement()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createElement)

    用给定标签名创建一个新的元素。

-   [`Document.createElementNS()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createElementNS)

    用给定标签名和命名空间创建一个新的元素。

-   [`Document.createEntityReference()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Document) 已弃用

    创建一个新的实体引用对象并返回。

-   [`Document.createEvent()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createEvent)

    创建一个事件对象。

-   [`Document.createNodeIterator()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createNodeIterator)

    创建一个 [`NodeIterator`](https://developer.mozilla.org/zh-CN/docs/Web/API/NodeIterator) 对象。

-   [`Document.createProcessingInstruction()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createProcessingInstruction)

    创建一个新的 [`ProcessingInstruction` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/ProcessingInstruction) 对象。

-   [`Document.createRange()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createRange)

    创建一个 [`Range`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range) 对象。

-   [`Document.createTextNode()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createTextNode)

    创建一个文本节点。

-   [`Document.createTouch()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Document/createTouch) 已弃用 非标准

    创建一个 [`Touch`](https://developer.mozilla.org/zh-CN/docs/Web/API/Touch) 对象。

-   [`Document.createTouchList()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Document/createTouchList) 已弃用 非标准

    创建一个 [`TouchList`](https://developer.mozilla.org/zh-CN/docs/Web/API/TouchList) 对象。

-   [`Document.createTreeWalker()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createTreeWalker)

    创建一个 [`TreeWalker`](https://developer.mozilla.org/zh-CN/docs/Web/API/TreeWalker) 对象。

-   [`Document.elementFromPoint()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/elementFromPoint)

    返回指定坐标最顶层的元素。

-   [`Document.elementsFromPoint()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/elementsFromPoint)

    返回包含指定坐标下所有元素的数组。

-   [`Document.enableStyleSheetsForSet()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Document/enableStyleSheetsForSet) 已弃用 非标准

    启用指定的样式表集合。

-   [`Document.exitPictureInPicture()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/exitPictureInPicture)

    从浮动的画中画窗口中移除视频，并返回到它的原始容器。

-   [`Document.exitPointerLock()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/exitPointerLock)

    释放指针锁。

-   [`Document.getAnimations()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Document/getAnimations)

    返回包含所有目前有效的 [`Animation`](https://developer.mozilla.org/zh-CN/docs/Web/API/Animation) 对象（其目标元素为 `document`）的数组。

-   `Document.getBoxQuads()` 实验性

    返回一个 [`DOMQuad`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMQuad) 对象（表示节点中的 CSS 片段）的列表。

-   [`Document.getElementById()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/getElementById)

    返回标识元素的引用对象。

-   [`Document.getElementsByClassName()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/getElementsByClassName)

    返回具有给定类名的元素列表。

-   [`Document.getElementsByTagName()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/getElementsByTagName)

    返回具有给定标签名的元素列表。

-   [`Document.getElementsByTagNameNS()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/getElementsByTagNameNS)

    返回具有给定标签名和命名空间的元素列表。

-   [`Document.getSelection()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/getSelection)

    返回一个 [`Selection`](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection) 对象，表示用户选择的文本范围或是插入符号当前的位置。

-   [`Document.hasStorageAccess()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/hasStorageAccess)

    返回一个 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)，会兑现一个布尔值，用于表示文档是否有访问第一方储存的权限。

-   [`Document.importNode()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/importNode)

    返回外部文档的节点的拷贝。

-   `Document.normalizeDocument()` 已弃用

    替换实体、规范化文本节点，等待。

-   [`Document.prepend()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Document/prepend)

    在文档的第一个子节点前插入一个 [`Node`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node) 对象或字符串对象的集合。

-   [`Document.querySelector()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/querySelector)

    返回文档中与指定的选择器匹配的第一个元素节点。

-   [`Document.querySelectorAll()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/querySelectorAll)

    返回包含文档中与指定的选择器匹配的所有元素节点的列表。

-   [`Document.releaseCapture()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/releaseCapture) 非标准

    若鼠标在当前文档的某一个元素之上，则释放当前的鼠标捕获。

-   `Document.releaseEvents()` 已弃用

    参见 [`Window.releaseEvents()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Window/releaseEvents)。

-   [`Document.replaceChildren()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Document/replaceChildren)

    用一哥指定的新的子节点集合替换替换文档中现有的子节点。

-   [`Document.requestStorageAccess()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Document/requestStorageAccess)

    返回一个 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)，若第一方存储权限可用，则兑现，否则拒绝。

-   [`Document.mozSetImageElement()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Document/mozSetImageElement) 非标准

    允许你使用具有给定 ID 的元素作为背景图片。

`Document` 接口使用 [`XPathEvaluator`](https://developer.mozilla.org/zh-CN/docs/Web/API/XPathEvaluator) 接口扩展：

-   [`Document.createExpression()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createExpression)

    编译一个 [`XPathExpression` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/XPathExpression)，以用于（重复）执行。

-   [`Document.createNSResolver()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createNSResolver)

    创建一个 [`XPathNSResolver` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/XPathNSResolver) 对象。

-   [`Document.evaluate()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/evaluate)

    执行一个 XPath 表达式。

### [HTML 文档的扩展](https://developer.mozilla.org/zh-CN/docs/Web/API/Document#html_文档的扩展)

HTML 文档的 `Document` 接口继承自 [`HTMLDocument`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLDocument) 接口，或扩展了这些方法：

-   [`Document.clear()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/clear) 已弃用

    在大多数现代浏览器中，包括最新版本的 Firefox 和 Internet Explorer，这个方法没有任何作用。

-   [`Document.close()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/close)

    关闭用于写入的文档流。

-   [`Document.execCommand()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/execCommand) 已弃用

    在可编辑文档中执行格式化命令。

-   [`Document.getElementsByName()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/getElementsByName)

    返回一个具有给定名称的元素的列表。

-   [`Document.hasFocus()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/hasFocus)

    若焦点目前位于给定的文档内，则返回 `true`。

-   [`Document.open()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/open)

    打开用于写入的文档流。

-   [`Document.queryCommandEnabled()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/queryCommandEnabled) 已弃用 非标准

    若可在当前范围内执行格式化命令，则返回 `true`。

-   `Document.queryCommandIndeterm()` 已弃用

    若格式化命令在当前范围内处于不确定的状态，则返回 `true`。

-   [`Document.queryCommandState()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/queryCommandState) 已弃用 非标准

    若格式化命令已在当前范围内执行，则返回 `true`。

-   [`Document.queryCommandSupported()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/queryCommandSupported) 已弃用 非标准

    若当前范围支持格式化命令，则返回 `true`。

-   `Document.queryCommandValue()` 已弃用

    返回格式化命令当前的范围。

-   [`Document.write()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/write)

    向文档写入文本。

-   [`Document.writeln()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/writeln)

    向文档写入一行文本。

## [事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Document#事件)

列出了使用 `addEventListener()` 或为接口的事件处理器属性 `oneventname` 赋值的方式来监听的事件。

-   [`afterscriptexecute`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/afterscriptexecute_event) 非标准

    在静态的 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script) 元素执行完其中的脚本时触发。

-   [`beforescriptexecute`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/beforescriptexecute_event)

    在静态的 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script) 开始执行脚本时触发。

-   [`scroll`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/scroll_event)

    在滚动文档视图或元素时触发。

-   [`visibilitychange`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/visibilitychange_event)

    在变前的内容变为可见、隐藏时触发。

-   [`wheel` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event)

    在用户在点击设备（通常为鼠标）上转动滚轮时触发。

### [动画事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Document#动画事件)

-   [`animationcancel` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Element/animationcancel_event)

    在动画意外中止时触发。

-   [`animationend` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Element/animationend_event)

    在动画正常完成时触发。

-   [`animationiteration` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Element/animationiteration_event)

    在动画迭代完成时触发。

-   [`animationstart` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Element/animationstart_event)

    在动画开始时触发。

### [剪切板事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Document#剪切板事件)

-   [`copy` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Document/copy_event)

    在用户通过浏览器的用户界面使用复制操作时触发。

-   [`cut` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Document/cut_event)

    在用户通过浏览器的用户界面使用剪切操作时触发。

-   [`paste` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Document/paste_event)

    在用户通过浏览器的用户界面使用粘贴操作时触发。

### [拖放事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Document#拖放事件)

-   [`drag`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/drag_event)

    在用户拖动元素或选择的文本时每几百毫秒触发一次。

-   [`dragend`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dragend_event)

    在拖动操作结束（通过释放鼠标按钮或按下退出键））时触发。

-   [`dragenter`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dragenter_event)

    在拖动的元素或选择的文本进入有效的放置目标时触发。

-   [`dragleave`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dragleave_event)

    在拖动的元素或选择的文本离开有效的放置目标时触发。

-   [`dragover`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dragover_event)

    在拖动的元素或选择的文本在有效的放置目标时触发（每几百毫秒）。

-   [`dragstart`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dragstart_event)

    在用户开始拖动元素或选择的文本时触发。

-   [`drop`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/drop_event)

    在元素或选择的文本被放置在有效的放置目标时触发。

### [全屏事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Document#全屏事件)

-   [`fullscreenchange`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/fullscreenchange_event)

    在 `Document` 进入或退出[全屏](https://developer.mozilla.org/zh-CN/docs/Web/API/Fullscreen_API/Guide)模式时触发。

-   [`fullscreenerror`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/fullscreenerror_event)

    在尝试进入或退出[全屏](https://developer.mozilla.org/zh-CN/docs/Web/API/Fullscreen_API/Guide)模式而发生错误时触发。

### [键盘事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Document#键盘事件)

-   [`keydown` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event)

    在某个键被按下时触发。

-   [`keypress`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/keypress_event) 已弃用

    在按下产生字符值的键时触发。

-   [`keyup` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Element/keyup_event)

    在释放按键时触发。

### [加载和卸载事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Document#加载和卸载事件)

-   [`DOMContentLoaded`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/DOMContentLoaded_event)

    在文档完全加载并解析后触发，无需等待样式表、图像和子框架完成加载。

-   [`readystatechange`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/readystatechange_event)

    在文档的 [`readyState`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/readyState) 属性发生变化时触发。

### [指针事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Document#指针事件)

-   [`gotpointercapture` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Element/gotpointercapture_event)

    在使用 [`setPointerCapture()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/setPointerCapture) 捕获元素时触发。

-   [`lostpointercapture` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Document/lostpointercapture_event)

    在[捕获指针](https://developer.mozilla.org/zh-CN/docs/Web/API/Pointer_events#pointer_capture)释放时触发。

-   [`pointercancel` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointercancel_event)

    在指针事件取消时触发。

-   [`pointerdown` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerdown_event)

    在指针变为活动状态时触发。

-   [`pointerenter` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerenter_event)

    在指针移入到元素或其子元素之一的命中测试边界时触发。

-   [`pointerleave` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerleave_event)

    在指针移出元素的命中测试边界时触发。

-   [`pointerlockchange`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/pointerlockchange_event)

    在指针被锁定或解锁时触发。

-   [`pointerlockerror` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Document/pointerlockerror_event)

    在指针锁定失败时触发。

-   [`pointermove` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointermove_event)

    在指针坐标改变时触发。

-   [`pointerout` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerout_event)

    在指正移除元素的*命中测试*边界（或其他原因）时触发。

-   [`pointerover` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerover_event)

    在指针移入元素的命中测试边界时触发。

-   [`pointerup` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerup_event)

    在指针不再活动时触发。

### [选择事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Document#选择事件)

-   [`selectionchange`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/selectionchange_event)

    在文档中的选中的文本发生改变时触发。

### [触摸事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Document#触摸事件)

-   [`touchcancel`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/touchcancel_event)

    在一个或多个接触点以特定于实现的方式中断（例如，创建了太多的接触点）时触发。

-   [`touchend`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/touchend_event)

    在从接触面移除一个或多个接触点时触发。

-   [`touchmove`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/touchmove_event)

    在一个或多个接触点沿接触面移动时触发。

-   [`touchstart`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/touchstart_event)

    在向接触面放置一个或多个接触点时触发。

### [过渡事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Document#过渡事件)

-   [`transitioncancel` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Element/transitioncancel_event)

    在 [CSS 过渡](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_transitions/Using_CSS_transitions)取消时触发。

-   [`transitionend` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Element/transitionend_event)

    在 [CSS 过渡](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_transitions/Using_CSS_transitions)完成时触发。

-   [`transitionrun` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Element/transitionrun_event)

    在 [CSS 过渡](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_transitions/Using_CSS_transitions)第一次创建时触发。

-   [`transitionstart` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Element/transitionstart_event)

    在 [CSS 过渡](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_transitions/Using_CSS_transitions)实际开始时触发。