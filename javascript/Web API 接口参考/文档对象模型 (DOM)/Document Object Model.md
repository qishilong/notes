# 文档对象模型 (DOM)

**文档对象模型 (\*DOM)\*** 将 web 页面与到脚本或编程语言连接起来。通常是指 JavaScript，但将 HTML、SVG 或 XML 文档建模为对象并不是 JavaScript 语言的一部分。DOM 模型用一个逻辑树来表示一个文档，树的每个分支的终点都是一个节点 (node)，每个节点都包含着对象 (objects)。DOM 的方法 (methods) 让你可以用特定方式操作这个树，用这些方法你可以改变文档的结构、样式或者内容。节点可以关联上事件处理器，一旦某一事件被触发了，那些事件处理器就会被执行。

这里还有一篇关于 DOM 的 [介绍](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model/Introduction) 。

## [DOM 接口](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model#dom_接口)

-   [`AbortController`](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController)
-   [`AbortSignal`](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortSignal)
-   [`AbstractRange` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/AbstractRange)
-   [`Attr`](https://developer.mozilla.org/zh-CN/docs/Web/API/Attr)
-   [`CDATASection`](https://developer.mozilla.org/zh-CN/docs/Web/API/CDATASection)
-   [`CharacterData`](https://developer.mozilla.org/zh-CN/docs/Web/API/CharacterData)
-   [`Comment`](https://developer.mozilla.org/zh-CN/docs/Web/API/Comment)
-   [`CustomEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomEvent)
-   [`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document)
-   [`DocumentFragment`](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment)
-   [`DocumentType`](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentType)
-   [`DOMError`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMError) 已弃用
-   [`DOMException`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMException)
-   [`DOMImplementation`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMImplementation)
-   [`DOMParser`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMParser)
-   [`DOMPoint`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMPoint)
-   [`DOMPointReadOnly` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/DOMPointReadOnly)
-   [`DOMRect`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMRect)
-   [`DOMTokenList`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMTokenList)
-   [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element)
-   [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event)
-   [`EventTarget`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget)
-   [`HTMLCollection`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCollection)
-   [`MutationObserver`](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)
-   [`MutationRecord`](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationRecord)
-   [`NamedNodeMap`](https://developer.mozilla.org/zh-CN/docs/Web/API/NamedNodeMap)
-   [`Node`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node)
-   [`NodeFilter`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createNodeIterator)
-   [`NodeIterator`](https://developer.mozilla.org/zh-CN/docs/Web/API/NodeIterator)
-   [`NodeList`](https://developer.mozilla.org/zh-CN/docs/Web/API/NodeList)
-   [`ProcessingInstruction` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/ProcessingInstruction)
-   [`Range`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range)
-   [`StaticRange` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/StaticRange)
-   [`Text`](https://developer.mozilla.org/zh-CN/docs/Web/API/Text)
-   [`TextDecoder`](https://developer.mozilla.org/zh-CN/docs/Web/API/TextDecoder)
-   [`TextEncoder`](https://developer.mozilla.org/zh-CN/docs/Web/API/TextEncoder)
-   [`TimeRanges`](https://developer.mozilla.org/zh-CN/docs/Web/API/TimeRanges)
-   [`TreeWalker`](https://developer.mozilla.org/zh-CN/docs/Web/API/TreeWalker)
-   [`XMLDocument`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLDocument)

### [过时的 DOM 接口](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model#过时的_dom_接口)

DOM 模型已经被高度简化了。为此，以下出现在 DOM level 3 或更早的规范里的接口已经被移除了。现在不是非常确定是否有一些会被重新引进，但是当前应该把它们看作废弃的，应当避免使用：

-   `DOMConfiguration`
-   `DOMErrorHandler`
-   `DOMImplementationList`
-   `DOMImplementationRegistry`
-   `DOMImplementationSource`
-   `DOMLocator`
-   `DOMObject`
-   `DOMSettableTokenList`
-   `DOMUserData`
-   `ElementTraversal`
-   `Entity`
-   `EntityReference`
-   `NameList`
-   `Notation`
-   `TypeInfo`
-   `UserDataHandler`

## [HTML DOM](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model#html_dom)

包含 HTML 的文档使用 [`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) 接口进行描述，该接口由 HTML 规范扩展，包含了各种特定于 HTML 的功能。特别是，[`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) 接口得到了增强，成为 [`HTMLElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement) 和各种子类，每个子类代表一个（或一系列密切相关的）元素。

HTML DOM API 提供对各种浏览器功能的访问，例如选项卡和窗口、CSS 样式和样式表、浏览器历史记录等。这些接口将在 [HTML DOM API](https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_DOM_API) 中进一步讨论。

## [SVG 接口](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model#svg_接口)

### [SVG 元素接口](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model#svg_元素接口)

-   [`SVGAElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/SVGAElement)
-   `SVGAltGlyphElement` 已弃用
-   `SVGAltGlyphDefElement` 已弃用
-   `SVGAltGlyphItemElement` 已弃用
-   [`SVGAnimationElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/SVGAnimationElement)
-   [`SVGAnimateElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/SVGAnimateElement)
-   [`SVGAnimateColorElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGAnimateColorElement) 已弃用
-   [`SVGAnimateMotionElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGAnimateMotionElement)
-   [`SVGAnimateTransformElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGAnimateTransformElement)
-   [`SVGCircleElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/SVGCircleElement)
-   [`SVGClipPathElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGClipPathElement)
-   [`SVGComponentTransferFunctionElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGComponentTransferFunctionElement)
-   [`SVGCursorElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGCursorElement)
-   [`SVGDefsElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGDefsElement)
-   [`SVGDescElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGDescElement)
-   [`SVGElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/SVGElement)
-   [`SVGEllipseElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGEllipseElement)
-   [`SVGFEBlendElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGFEBlendElement)
-   [`SVGFEColorMatrixElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGFEColorMatrixElement)
-   [`SVGFEComponentTransferElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGFEComponentTransferElement)
-   [`SVGFECompositeElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGFECompositeElement)
-   [`SVGFEConvolveMatrixElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGFEConvolveMatrixElement)
-   [`SVGFEDiffuseLightingElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGFEDiffuseLightingElement)
-   [`SVGFEDisplacementMapElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGFEDisplacementMapElement)
-   [`SVGFEDistantLightElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGFEDistantLightElement)
-   [`SVGFEDropShadowElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGFEDropShadowElement)
-   [`SVGFEFloodElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGFEFloodElement)
-   [`SVGFEFuncAElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGFEFuncAElement)
-   [`SVGFEFuncBElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGFEFuncBElement)
-   [`SVGFEFuncGElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGFEFuncGElement)
-   [`SVGFEFuncRElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGFEFuncRElement)
-   [`SVGFEGaussianBlurElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGFEGaussianBlurElement)
-   [`SVGFEImageElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGFEImageElement)
-   [`SVGFEMergeElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGFEMergeElement)
-   [`SVGFEMergeNodeElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGFEMergeNodeElement)
-   [`SVGFEMorphologyElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGFEMorphologyElement)
-   [`SVGFEOffsetElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGFEOffsetElement)
-   [`SVGFEPointLightElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGFEPointLightElement)
-   [`SVGFESpecularLightingElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGFESpecularLightingElement)
-   [`SVGFESpotLightElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGFESpotLightElement)
-   [`SVGFETileElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGFETileElement)
-   [`SVGFETurbulenceElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGFETurbulenceElement)
-   [`SVGFilterElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGFilterElement)
-   `SVGFilterPrimitiveStandardAttributes`
-   [`SVGFontElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGFontElement) 已弃用
-   [`SVGFontFaceElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGFontFaceElement) 已弃用
-   [`SVGFontFaceFormatElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGFontFaceFormatElement) 已弃用
-   [`SVGFontFaceNameElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGFontFaceNameElement) 已弃用
-   [`SVGFontFaceSrcElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGFontFaceSrcElement) 已弃用
-   [`SVGFontFaceUriElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGFontFaceUriElement) 已弃用
-   [`SVGForeignObjectElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGForeignObjectElement)
-   [`SVGGElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGGElement)
-   [`SVGGeometryElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/SVGGeometryElement)
-   [`SVGGlyphElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGGlyphElement) 已弃用
-   [`SVGGlyphRefElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGGlyphRefElement) 已弃用
-   [`SVGGradientElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGGradientElement)
-   [`SVGGraphicsElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/SVGGraphicsElement)
-   `SVGHatchElement` 实验性
-   `SVGHatchpathElement` 实验性
-   [`SVGHKernElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGHKernElement) 已弃用
-   [`SVGImageElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGImageElement)
-   [`SVGLinearGradientElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGLinearGradientElement)
-   [`SVGLineElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGLineElement)
-   [`SVGMarkerElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGMarkerElement) 实验性
-   [`SVGMaskElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGMaskElement)
-   [`SVGMetadataElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGMetadataElement)
-   [`SVGMissingGlyphElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGMissingGlyphElement) 已弃用
-   [`SVGMPathElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGMPathElement)
-   [`SVGPathElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/SVGPathElement)
-   [`SVGPatternElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGPatternElement)
-   [`SVGPolylineElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGPolylineElement)
-   [`SVGPolygonElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGPolygonElement)
-   [`SVGRadialGradientElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGRadialGradientElement)
-   [`SVGRectElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGRectElement)
-   [`SVGScriptElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGScriptElement)
-   [`SVGSetElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGSetElement)
-   [`SVGStopElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGStopElement)
-   [`SVGStyleElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGStyleElement)
-   [`SVGSVGElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/SVGSVGElement)
-   [`SVGSwitchElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGSwitchElement)
-   [`SVGSymbolElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGSymbolElement)
-   [`SVGTextContentElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGTextContentElement)
-   [`SVGTextElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGTextElement)
-   [`SVGTextPathElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGTextPathElement)
-   [`SVGTextPositioningElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGTextPositioningElement)
-   [`SVGTitleElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGTitleElement)
-   [`SVGTRefElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGTRefElement) 已弃用
-   [`SVGTSpanElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGTSpanElement)
-   [`SVGUseElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/SVGUseElement)
-   [`SVGViewElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGViewElement)
-   [`SVGVKernElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGVKernElement) 已弃用

### [SVG 数据类型接口](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model#svg_数据类型接口)

以下是 SVG 属性和属性定义中使用的数据类型的 DOM API。

#### 静态类型

-   [`SVGAngle` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGAngle)
-   `SVGColor` 已弃用
-   `SVGICCColor` 已弃用
-   `SVGElementInstance`
-   `SVGElementInstanceList`
-   [`SVGLength` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGLength)
-   [`SVGLengthList` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGLengthList)
-   `SVGNameList`
-   [`SVGNumber` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGNumber)
-   [`SVGNumberList` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGNumberList)
-   `SVGPaint`
-   `SVGPathSeg` 已弃用
-   `SVGPathSegClosePath` 已弃用
-   `SVGPathSegMovetoAbs` 已弃用
-   `SVGPathSegMovetoRel` 已弃用
-   `SVGPathSegLinetoAbs` 已弃用
-   `SVGPathSegLinetoRel` 已弃用
-   `SVGPathSegCurvetoCubicAbs` 已弃用
-   `SVGPathSegCurvetoCubicRel` 已弃用
-   `SVGPathSegCurvetoQuadraticAbs` 已弃用
-   `SVGPathSegCurvetoQuadraticRel` 已弃用
-   `SVGPathSegArcAbs` 已弃用
-   `SVGPathSegArcRel` 已弃用
-   `SVGPathSegLinetoHorizontalAbs` 已弃用
-   `SVGPathSegLinetoHorizontalRel` 已弃用
-   `SVGPathSegLinetoVerticalAbs` 已弃用
-   `SVGPathSegLinetoVerticalRel` 已弃用
-   `SVGPathSegCurvetoCubicSmoothAbs` 已弃用
-   `SVGPathSegCurvetoCubicSmoothRel` 已弃用
-   `SVGPathSegCurvetoQuadraticSmoothAbs` 已弃用
-   `SVGPathSegCurvetoQuadraticSmoothRel` 已弃用
-   `SVGPathSegList` 已弃用
-   [`SVGPoint` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGPoint) 已弃用
-   [`SVGPointList` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGPointList) 已弃用
-   [`SVGPreserveAspectRatio` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGPreserveAspectRatio)
-   [`SVGRect` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGRect) 已弃用
-   [`SVGStringList` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGStringList)
-   [`SVGTransform` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGTransform)
-   [`SVGTransformList` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGTransformList)

#### 动画类型

-   [`SVGAnimatedAngle`](https://developer.mozilla.org/zh-CN/docs/Web/API/SVGAnimatedAngle)
-   [`SVGAnimatedBoolean` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGAnimatedBoolean)
-   [`SVGAnimatedEnumeration` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGAnimatedEnumeration)
-   [`SVGAnimatedInteger` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGAnimatedInteger)
-   [`SVGAnimatedLength` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGAnimatedLength)
-   [`SVGAnimatedLengthList` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGAnimatedLengthList)
-   [`SVGAnimatedNumber` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGAnimatedNumber)
-   [`SVGAnimatedNumberList` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGAnimatedNumberList)
-   `SVGAnimatedPathData` 已弃用
-   [`SVGAnimatedPoints` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGPolygonElement)
-   [`SVGAnimatedPreserveAspectRatio` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGAnimatedPreserveAspectRatio)
-   [`SVGAnimatedRect` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGAnimatedRect)
-   [`SVGAnimatedString` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGAnimatedString)
-   [`SVGAnimatedTransformList` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGAnimatedTransformList)

### [SMIL 相关接口](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model#smil_相关接口)

-   `ElementTimeControl`
-   [`TimeEvent` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/TimeEvent)

### [其他的 SVG 接口](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model#其他的_svg_接口)

-   `GetSVGDocument`
-   `ShadowAnimation`
-   `SVGColorProfileRule` 已弃用
-   `SVGCSSRule` 已弃用
-   `SVGDocument`
-   `SVGException` 已弃用
-   `SVGFitToViewBox`
-   `SVGLocatable` 已弃用
-   [`SVGRenderingIntent` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGRenderingIntent) 已弃用
-   [`SVGUnitTypes` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGUnitTypes)
-   `SVGUseElementShadowRoot`
-   `SVGViewSpec` 已弃用
-   `SVGZoomEvent` 已弃用